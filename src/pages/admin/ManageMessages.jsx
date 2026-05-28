import React, { useState, useEffect } from "react";
import { fetchCollection, deleteDocument } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiMail } from "react-icons/fi";

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
              <div key={m.id} className="neo-card p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-black text-sm">{m.name}</h4>
                    <p className="text-xs font-bold text-zinc-500">{m.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold text-zinc-500">
                      {m.createdAt ? new Date(m.createdAt).toLocaleString('id-ID') : 'Baru saja'}
                    </span>
                    <button onClick={() => handleDelete(m.id)} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors" title="Hapus Pesan">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white dark:bg-[#1e1e1e] border-2 border-black dark:border-white rounded-lg text-sm font-bold">
                  {m.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMessages;
