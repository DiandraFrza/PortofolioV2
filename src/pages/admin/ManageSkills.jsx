/** @format */

import React, { useState, useEffect } from "react";
import { fetchCollection, addDocument, deleteDocument, updateDocument } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus, FiEdit2, FiCheck, FiX } from "react-icons/fi";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [itemsStr, setItemsStr] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editItemsStr, setEditItemsStr] = useState("");

  const loadSkills = async () => {
    setIsLoading(true);
    const data = await fetchCollection("skills");
    setSkills(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!category || !itemsStr) return;
    const itemsArray = itemsStr.split(",").map((item) => item.trim()).filter((item) => item !== "");
    const addRes = await addDocument("skills", { category, items: itemsArray });
    if (addRes.success) {
      toast.success("Skill berhasil ditambahkan!");
      setCategory("");
      setItemsStr("");
      loadSkills();
    } else {
      toast.error("Gagal menambahkan skill!");
    }
  };

  const handleDelete = (id) => {
    confirmDeleteToast(async () => {
      const res = await deleteDocument("skills", id);
      if (res.success) {
        toast.success("Skill berhasil dihapus!");
        loadSkills();
      } else {
        toast.error("Gagal menghapus skill!");
      }
    });
  };

  const startEdit = (skill) => {
    setEditingId(skill.id);
    setEditCategory(skill.category);
    setEditItemsStr(Array.isArray(skill.items) ? skill.items.join(", ") : skill.items);
  };

  const saveEdit = async (id) => {
    if (!editCategory.trim() || !editItemsStr.trim()) {
      toast.error("Kategori dan items tidak boleh kosong!");
      return;
    }
    const itemsArray = editItemsStr.split(",").map((item) => item.trim()).filter((item) => item !== "");
    await updateDocument("skills", id, { category: editCategory, items: itemsArray });
    toast.success("Skill berhasil diupdate!");
    setEditingId(null);
    loadSkills();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCategory("");
    setEditItemsStr("");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">Manage Skills</h2>
      <div className="neo-card p-6 rounded-xl">
        <h3 className="font-bold mb-4 flex items-center gap-2"><FiPlus /> Tambah Skill</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="w-full">
            <label className="block text-[11px] font-black uppercase mb-1">Kategori</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Frontend, Backend..." required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div className="w-full">
            <label className="block text-[11px] font-black uppercase mb-1">Skills (pisahkan dengan koma)</label>
            <input type="text" value={itemsStr} onChange={(e) => setItemsStr(e.target.value)} placeholder="React, Vue, Tailwind..." required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="neo-btn px-6 py-2 rounded-lg text-sm font-bold">Simpan Skill</button>
          </div>
        </form>
      </div>

      <div className="neo-card p-6 rounded-xl overflow-x-auto">
        <h3 className="font-bold mb-4">Daftar Skill</h3>
        {isLoading ? (
          <p className="text-sm font-bold text-zinc-500">Loading...</p>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-black dark:border-white">
                <th className="p-3 font-black">Kategori</th>
                <th className="p-3 font-black">Skills</th>
                <th className="p-3 font-black text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {skills.length === 0 ? (
                <tr><td colSpan="3" className="p-4 text-center font-bold text-zinc-500">Belum ada skill</td></tr>
              ) : skills.map((s) => (
                editingId === s.id ? (
                  <tr key={s.id} className="border-b border-zinc-200 dark:border-zinc-800 bg-blue-50 dark:bg-blue-900/20">
                    <td className="p-3"><input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-full neo-input rounded p-1 text-xs font-bold" /></td>
                    <td className="p-3"><input type="text" value={editItemsStr} onChange={(e) => setEditItemsStr(e.target.value)} className="w-full neo-input rounded p-1 text-xs font-bold" /></td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => saveEdit(s.id)} className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded" title="Simpan"><FiCheck size={16} /></button>
                      <button onClick={cancelEdit} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded" title="Batal"><FiX size={16} /></button>
                    </td>
                  </tr>
                ) : (
                  <tr key={s.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="p-3 font-bold">{s.category}</td>
                    <td className="p-3">{Array.isArray(s.items) ? s.items.join(", ") : "-"}</td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => startEdit(s)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded" title="Edit"><FiEdit2 size={16} /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded" title="Hapus"><FiTrash2 size={16} /></button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageSkills;
