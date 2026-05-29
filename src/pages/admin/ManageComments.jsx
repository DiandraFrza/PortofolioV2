/** @format */

import React, { useState, useEffect } from "react";
import { fetchCollection, deleteDocument, subscribeToComments, updateDocument } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiMessageCircle, FiEdit2, FiCheck, FiX, FiMapPin } from "react-icons/fi";

function ManageComments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToComments((data) => {
      setComments(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    confirmDeleteToast(async () => {
      const res = await deleteDocument("comments", id);
      if (res.success) {
        toast.success("Komentar berhasil dihapus!");
        const data = await fetchCollection("comments");
        setComments(data);
      } else {
        toast.error("Gagal menghapus komentar!");
      }
    });
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditText(c.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    await updateDocument("comments", id, { text: editText });
    setEditingId(null);
    setEditText("");
  };

  const handlePin = async (id, isPinned) => {
    if (!isPinned) {
      const pinnedCount = comments.filter((c) => c.pinned).length;
      if (pinnedCount >= 2) {
        toast.error("Maksimal hanya 2 komentar yang bisa di-pin!");
        return;
      }
    }
    
    const res = await updateDocument("comments", id, { pinned: !isPinned });
    if (res.success) {
      toast.success(!isPinned ? "Komentar di-pin!" : "Komentar di-unpin!");
    } else {
      toast.error("Gagal melakukan pin/unpin!");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">Manage Comments</h2>

      <div className="neo-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black dark:border-white">
          <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center border-2 border-[#a855f7]">
            <FiMessageCircle size={20} className="text-[#a855f7]" />
          </div>
          <h3 className="text-xl font-black tracking-tight">
            Semua Komentar <span className="text-[#a855f7]">({comments.length})</span>
          </h3>
        </div>

        {isLoading ? (
          <p className="text-sm font-bold text-zinc-500">Memuat komentar...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm font-bold text-zinc-500 text-center py-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">Belum ada komentar.</p>
        ) : (
          <div className="space-y-4">
            {comments
              .sort((a, b) => {
                // Pinned comments first, then by date (newest first)
                if (a.pinned === b.pinned) {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return a.pinned ? -1 : 1;
              })
              .map((c) => (
                <div key={c.id} className={`neo-card-purple p-4 rounded-xl flex gap-4 ${c.pinned ? "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400" : "bg-zinc-50 dark:bg-zinc-800/50"}`}>
                  <div className="w-10 h-10 rounded-full border-2 border-black dark:border-white overflow-hidden bg-white shrink-0">
                    <img src={c.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm">{c.name}</h4>
                        {c.pinned && <FiMapPin size={14} className="text-yellow-500 fill-yellow-500" />}
                      </div>
                      <div className="flex gap-2">
                        {editingId === c.id ? (
                          <>
                            <button onClick={() => saveEdit(c.id)} className="p-1.5 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md transition-colors" title="Simpan">
                              <FiCheck size={16} />
                            </button>
                            <button onClick={cancelEdit} className="p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors" title="Batal">
                              <FiX size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handlePin(c.id, c.pinned)} className={`p-1.5 rounded-md transition-colors ${c.pinned ? "text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/30" : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"}`} title={c.pinned ? "Unpin" : "Pin"}>
                              <FiMapPin size={16} />
                            </button>
                            <button onClick={() => startEdit(c)} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors" title="Edit Komentar">
                              <FiEdit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(c.id)} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors" title="Hapus Komentar">
                              <FiTrash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingId === c.id ? (
                      <div className="mt-2">
                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full neo-input rounded-lg p-2 text-sm resize-none font-bold" rows="3" />
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mt-2">{c.text}</p>
                    )}
                    <span className="text-[10px] font-bold text-zinc-500 mt-2 block">{c.createdAt ? new Date(c.createdAt).toLocaleString("id-ID") : "Baru saja"}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageComments;
