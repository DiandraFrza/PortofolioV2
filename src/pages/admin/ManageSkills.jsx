import React, { useState, useEffect } from "react";
import { fetchCollection, addDocument, deleteDocument } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus } from "react-icons/fi";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [category, setCategory] = useState("");
  const [itemsStr, setItemsStr] = useState("");

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
    
    // Split by comma and clean whitespace
    const itemsArray = itemsStr.split(",").map(item => item.trim()).filter(item => item !== "");

    const addRes = await addDocument("skills", { 
      category, 
      items: itemsArray 
    });

    if (addRes.success) {
      toast.success("Skill berhasil ditambahkan!");
      setCategory("");
      setItemsStr("");
      loadSkills();
    } else {
      toast.error("Gagal menambahkan skill! Pastikan kolom category dan items ada.");
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

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">Manage Skills</h2>
      
      <div className="neo-card p-6 rounded-xl">
        <h3 className="font-bold mb-4 flex items-center gap-2"><FiPlus /> Tambah Kategori Skill</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="w-full">
            <label className="block text-[11px] font-black uppercase mb-1">Kategori (Misal: Frontend, Backend)</label>
            <input type="text" value={category} onChange={e=>setCategory(e.target.value)} required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div className="w-full">
            <label className="block text-[11px] font-black uppercase mb-1">Daftar Skill (Pisahkan dengan koma)</label>
            <input type="text" value={itemsStr} onChange={e=>setItemsStr(e.target.value)} placeholder="React, Node.js, Tailwind..." required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div className="md:col-span-2 flex justify-end">
             <button type="submit" className="neo-btn px-6 py-2 rounded-lg text-sm font-bold">Simpan Skill</button>
          </div>
        </form>
      </div>

      <div className="neo-card p-6 rounded-xl overflow-x-auto">
        <h3 className="font-bold mb-4">Daftar Skill</h3>
        {isLoading ? <p className="text-sm font-bold text-zinc-500">Loading...</p> : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black dark:border-white">
                <th className="p-3 font-black text-sm">Kategori</th>
                <th className="p-3 font-black text-sm">Skills</th>
                <th className="p-3 font-black text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {skills.length === 0 ? (
                <tr><td colSpan="3" className="p-4 text-center text-sm font-bold text-zinc-500">Belum ada data skill.</td></tr>
              ) : skills.map((s) => (
                <tr key={s.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="p-3 font-bold text-sm">{s.category}</td>
                  <td className="p-3 text-sm">
                    {Array.isArray(s.items) ? s.items.join(", ") : "-"}
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageSkills;
