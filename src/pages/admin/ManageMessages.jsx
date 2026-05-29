/** @format */

import React, { useState, useEffect } from "react";
import { fetchCollection, deleteDocument, updateDocument } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiMail, FiEdit2, FiCheck, FiX } from "react-icons/fi";

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const loadMessages = async () => {
    setIsLoading(true);
    const data = await fetchCollection("messages");
    setMessages(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = (id) => {
    confirmDeleteToast(async () => {
      const res = await deleteDocument("messages", id);
      if (res.success) {
        toast.success("Pesan berhasil dihapus!");
        loadMessages();
      } else {
        toast.error("Gagal menghapus pesan!");
      }
    });
  };

  const startEdit = (message) => {
    setEditingId(message.id);
    setEditMessage(message.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage("");
  };

  const saveEdit = async (id) => {
    if (!editMessage.trim()) {
      toast.error("Pesan tidak boleh kosong!");
      return;
    }
    await updateDocument("messages", id, { message: editMessage });
    toast.success("Pesan berhasil diupdate!");
    setEditingId(null);
    loadMessages();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">Manage Messages</h2>

      <div className="neo-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black dark:border-white">
          <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center border-2 border-[#a855f7]">
            <FiMail size={20} className="text-[#a855f7]" />
          </div>
          <h3 className="text-xl font-black tracking-tight">
            Pesan Masuk <span className="text-[#a855f7]">({messages.length})</span>
          </h3>
        </div>

        {isLoading ? (
          <p className="text-sm font-bold text-zinc-500">Memuat pesan...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm font-bold text-zinc-500 text-center py-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">Belum ada pesan masuk.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`neo-card p-4 rounded-xl ${editingId === m.id ? "bg-blue-50 dark:bg-blue-900/20" : "bg-zinc-50 dark:bg-zinc-800/50"}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-black text-sm">{m.name}</h4>
                    <p className="text-xs font-bold text-zinc-500">{m.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold text-zinc-500">{m.createdAt ? new Date(m.createdAt).toLocaleString("id-ID") : "Baru saja"}</span>
                    {editingId === m.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(m.id)} className="p-1.5 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded" title="Simpan">
                          <FiCheck size={16} />
                        </button>
                        <button onClick={cancelEdit} className="p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded" title="Batal">
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(m)} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded" title="Edit">
                          <FiEdit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(m.id)} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded" title="Hapus">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {editingId === m.id ? <textarea value={editMessage} onChange={(e) => setEditMessage(e.target.value)} className="w-full neo-input rounded-lg p-2 text-sm font-bold resize-none" rows="3" /> : <div className="mt-3 p-3 bg-white dark:bg-[#1e1e1e] border-2 border-black dark:border-white rounded-lg text-sm font-bold">{m.message}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMessages;
