/** @format */

import React, { useState, useEffect } from "react";
import { fetchCollection, addDocument, deleteDocument, uploadFile, updateDocument } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus, FiUpload, FiEdit2, FiCheck, FiX } from "react-icons/fi";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [starred, setStarred] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTech, setEditTech] = useState("");
  const [editDemoLink, setEditDemoLink] = useState("");
  const [editGithubLink, setEditGithubLink] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editStarred, setEditStarred] = useState(false);
  const [editDisplayOrder, setEditDisplayOrder] = useState(0);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await fetchCollection("projects");
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsUploading(true);
    let finalImgSrc = "https://placehold.co/600x400/1e1e1e/FFF?text=No+Image";

    if (imageFile) {
      const uploadRes = await uploadFile("projects", imageFile);
      if (uploadRes.success) {
        finalImgSrc = uploadRes.url;
      } else {
        toast.error("Gagal mengupload gambar project: " + (uploadRes.error?.message || JSON.stringify(uploadRes.error)));
        setIsUploading(false);
        return;
      }
    }

    const addRes = await addDocument("projects", {
      title,
      description,
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""), // Save as JSON array
      demoLink,
      githubLink,
      imgSrc: finalImgSrc,
      starred: starred,
      displayOrder: parseInt(displayOrder) || 0,
    });

    if (addRes.success) {
      toast.success("Project berhasil ditambahkan!");
      setTitle("");
      setDescription("");
      setTech("");
      setDemoLink("");
      setGithubLink("");
      setImageFile(null);
      setStarred(false);
      setDisplayOrder(0);
    } else {
      toast.error("Gagal menambahkan project!");
    }

    setIsUploading(false);
    loadProjects();
  };

  const handleDelete = (id) => {
    confirmDeleteToast(async () => {
      const res = await deleteDocument("projects", id);
      if (res.success) {
        toast.success("Project berhasil dihapus!");
        loadProjects();
      } else {
        toast.error("Gagal menghapus project!");
      }
    });
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditTech(Array.isArray(project.tech) ? project.tech.join(", ") : project.tech);
    setEditDemoLink(project.demoLink);
    setEditGithubLink(project.githubLink);
    setEditImageFile(null);
    setEditStarred(project.starred || false);
    setEditDisplayOrder(parseInt(project.displayOrder) || 0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditTech("");
    setEditDemoLink("");
    setEditGithubLink("");
    setEditImageFile(null);
    setEditStarred(false);
    setEditDisplayOrder(0);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim() || !editDescription.trim() || !editTech.trim()) {
      toast.error("Judul, deskripsi, dan tech tidak boleh kosong!");
      return;
    }

    let imgSrcToUse = projects.find((p) => p.id === id)?.imgSrc || "https://placehold.co/600x400/1e1e1e/FFF?text=No+Image";

    if (editImageFile) {
      const uploadRes = await uploadFile("projects", editImageFile);
      if (uploadRes.success) {
        imgSrcToUse = uploadRes.url;
      } else {
        toast.error("Gagal mengupload gambar project: " + (uploadRes.error?.message || JSON.stringify(uploadRes.error)));
        return;
      }
    }

    const updateRes = await updateDocument("projects", id, {
      title: editTitle,
      description: editDescription,
      tech: editTech
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      demoLink: editDemoLink,
      githubLink: editGithubLink,
      imgSrc: imgSrcToUse,
      starred: editStarred,
      displayOrder: parseInt(editDisplayOrder) || 0,
    });

    if (updateRes.success) {
      toast.success("Project berhasil diupdate!");
      cancelEdit();
      loadProjects();
    } else {
      toast.error("Gagal mengupdate project!");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">Manage Projects</h2>

      {/* Add Form */}
      <div className="neo-card p-6 rounded-xl">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <FiPlus /> Tambah Project Baru
        </h3>
        <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Judul Project</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Gambar Project</label>
            <div className="relative">
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full neo-input rounded-lg p-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-2 file:border-black file:text-sm file:font-bold file:bg-[#a855f7] file:text-black hover:file:bg-[#c084fc] transition-all cursor-pointer" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-[11px] font-black uppercase mb-1">Tech Stack (Pisahkan dengan koma)</label>
            <input type="text" value={tech} onChange={(e) => setTech(e.target.value)} placeholder="React, Tailwind, Node.js..." required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Demo Link</label>
            <input type="text" value={demoLink} onChange={(e) => setDemoLink(e.target.value)} placeholder="https://..." className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Github Link</label>
            <input type="text" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} placeholder="https://..." className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Display Order</label>
            <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)} placeholder="0" className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="starredCheckAdd" checked={starred} onChange={(e) => setStarred(e.target.checked)} className="w-4 h-4 cursor-pointer" />
            <label htmlFor="starredCheckAdd" className="text-[11px] font-black uppercase cursor-pointer">
              ⭐ Starred (Tampil di Atas)
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="block text-[11px] font-black uppercase mb-1">Deskripsi Singkat</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="2" className="w-full neo-input rounded-lg p-2 text-sm font-bold"></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button type="submit" disabled={isUploading} className={`neo-btn flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
              {isUploading ? (
                "Mengupload..."
              ) : (
                <>
                  <FiUpload /> Simpan Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="neo-card p-6 rounded-xl overflow-x-auto">
        <h3 className="font-bold mb-4">Daftar Project</h3>
        {isLoading ? (
          <p className="text-sm font-bold text-zinc-500">Loading...</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black dark:border-white">
                <th className="p-3 font-black text-sm">Gambar</th>
                <th className="p-3 font-black text-sm">Judul</th>
                <th className="p-3 font-black text-sm">Link</th>
                <th className="p-3 font-black text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-sm font-bold text-zinc-500">
                    Belum ada data project.
                  </td>
                </tr>
              ) : (
                projects.map((p) =>
                  editingId === p.id ? (
                    <tr key={p.id} className="border-b border-zinc-200 dark:border-zinc-800 bg-blue-50 dark:bg-blue-900/20">
                      <td className="p-3" colSpan="4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-black uppercase mb-1">Judul</label>
                              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black uppercase mb-1">Tech Stack</label>
                              <input type="text" value={editTech} onChange={(e) => setEditTech(e.target.value)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black uppercase mb-1">Demo Link</label>
                              <input type="text" value={editDemoLink} onChange={(e) => setEditDemoLink(e.target.value)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black uppercase mb-1">Github Link</label>
                              <input type="text" value={editGithubLink} onChange={(e) => setEditGithubLink(e.target.value)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-[10px] font-black uppercase mb-1">Deskripsi</label>
                              <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows="2" className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-[10px] font-black uppercase mb-1">Gambar (Opsional)</label>
                              <input type="file" accept="image/*" onChange={(e) => setEditImageFile(e.target.files[0])} className="w-full neo-input rounded p-1.5 text-xs file:mr-4 file:py-1 file:px-2 file:rounded file:border-2 file:border-black file:text-[10px] file:font-bold file:bg-[#a855f7] file:text-black" />
                            </div>{" "}
                            <div>
                              <label className="block text-[10px] font-black uppercase mb-1">Display Order</label>
                              <input type="number" value={editDisplayOrder} onChange={(e) => setEditDisplayOrder(parseInt(e.target.value) || 0)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="starredCheck" checked={editStarred} onChange={(e) => setEditStarred(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                              <label htmlFor="starredCheck" className="text-[10px] font-black uppercase cursor-pointer">
                                ⭐ Starred (Tampil di Atas)
                              </label>
                            </div>{" "}
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <button onClick={() => saveEdit(p.id)} className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded" title="Simpan">
                              <FiCheck size={16} />
                            </button>
                            <button onClick={cancelEdit} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded" title="Batal">
                              <FiX size={16} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={p.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="p-3">
                        <img src={p.imgSrc} alt={p.title} className="w-16 h-12 object-cover border-2 border-black dark:border-white rounded-md" />
                      </td>
                      <td className="p-3 font-bold text-sm">{p.title}</td>
                      <td className="p-3 text-xs flex gap-2">
                        {p.demoLink ? (
                          <a href={p.demoLink} target="_blank" rel="noreferrer" className="text-[#a855f7] hover:underline font-bold">
                            Demo
                          </a>
                        ) : (
                          "-"
                        )}
                        {p.githubLink ? (
                          <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-[#121212] dark:text-white hover:underline font-bold">
                            Github
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => startEdit(p)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded" title="Edit">
                          <FiEdit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded" title="Hapus">
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageProjects;
