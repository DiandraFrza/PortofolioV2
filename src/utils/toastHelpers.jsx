import React from 'react';
import toast from 'react-hot-toast';

export const confirmDeleteToast = (onConfirm) => {
  toast((t) => (
    <div className="flex flex-col gap-3 font-bold text-sm">
      <span>Yakin ingin menghapus data ini?</span>
      <div className="flex gap-2 justify-end">
        <button 
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors"
        >
          Hapus
        </button>
        <button 
          onClick={() => toast.dismiss(t.id)}
          className="bg-zinc-200 text-black px-3 py-1.5 rounded-md hover:bg-zinc-300 transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  ), {
    duration: 5000,
  });
};
