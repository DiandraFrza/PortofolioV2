/** @format */

import React from "react";
import { FiX } from "react-icons/fi";

const ImageModal = ({ isOpen, imageUrl, title, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center animate-fade-down" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 md:-right-12 p-2 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors z-10">
          <FiX size={24} />
        </button>
        <div className="border-4 border-white rounded-xl overflow-hidden shadow-[8px_8px_0px_rgba(255,255,255,1)] bg-zinc-900">
          <img src={imageUrl} alt={title} className="w-full h-auto max-h-[85vh] object-contain" />
        </div>
        {title && <div className="mt-4 bg-black/50 px-4 py-2 rounded-lg text-white font-bold backdrop-blur-md">{title}</div>}
      </div>
    </div>
  );
};

export default ImageModal;
