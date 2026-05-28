import { supabase } from "./client";

// --- GENERIC CRUD HELPERS ---

export const fetchCollection = async (collectionName, orderByField = "createdAt", orderDirection = "desc") => {
  try {
    let orderCol = orderByField;
    if (collectionName === "projects" || collectionName === "certificates") orderCol = "title";
    if (collectionName === "skills") orderCol = "category";

    const { data, error } = await supabase
      .from(collectionName)
      .select("*")
      .order(orderCol, { ascending: orderDirection === "asc" });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error.message || error);
    return [];
  }
};

export const addDocument = async (collectionName, data) => {
  try {
    let insertData = { ...data };
    if (collectionName === "comments" || collectionName === "messages") {
      insertData.createdAt = new Date();
    }

    const { data: insertedData, error } = await supabase
      .from(collectionName)
      .insert([insertData])
      .select();

    if (error) throw error;
    return { success: true, id: insertedData[0].id };
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
    return { success: false, error };
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    const { error } = await supabase
      .from(collectionName)
      .delete()
      .eq("id", docId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error(`Error deleting from ${collectionName}:`, error);
    return { success: false, error };
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  try {
    const { error } = await supabase
      .from(collectionName)
      .update(data)
      .eq("id", docId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error(`Error updating ${collectionName}:`, error);
    return { success: false, error };
  }
};

// --- SPECIFIC SERVICES ---

// Storage: Upload file and get URL
export const uploadFile = async (folderPath, file) => {
  try {
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const filePath = `${folderPath}/${fileName}`;

    const { error } = await supabase.storage
      .from("portfolio-uploads")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("portfolio-uploads")
      .getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error };
  }
};

// Subscribe to Comments (Realtime)
export const subscribeToComments = (callback) => {
  const fetchComments = async () => {
    const data = await fetchCollection("comments");
    callback(data);
  };

  const channel = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "comments" },
      () => {
        fetchComments();
      }
    )
    .subscribe();

  // Initial fetch
  fetchComments();

  return () => {
    supabase.removeChannel(channel);
  };
};
