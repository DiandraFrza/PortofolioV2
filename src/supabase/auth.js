import { supabase } from "./client";

export const loginAdmin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    console.error("Login Error:", error.message);
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error.message);
    return { success: false, error: error.message };
  }
};
