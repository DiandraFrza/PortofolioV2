/** @format */

// src/components/AlertPopup.jsx
import React, { useEffect, useState } from "react";
import { FiX, FiInfo } from "react-icons/fi";

const AlertPopup = ({ isOpen, message, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 50);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`} onClick={onClose}>
      <div className={`relative w-full max-w-sm m-4 bg-white dark:bg-zinc-800 border-3 border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.8)] transition-all duration-300 transform ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black bg-white hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors duration-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#202020]">
          <FiX size={18} className="stroke-[3]" />
        </button>
        <div className="p-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl border-3 border-black bg-[#a855f7] shadow-[3px_3px_0px_rgba(0,0,0,1)] text-white">
              <FiInfo size={32} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-xl font-black uppercase text-[#202020] dark:text-white mb-2">Informasi</h3>
          <p className="text-zinc-700 dark:text-zinc-700 font-bold text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
