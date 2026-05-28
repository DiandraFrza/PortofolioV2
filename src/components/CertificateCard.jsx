/** @format */

import React from "react";
import { FiArrowUpRight, FiAward } from "react-icons/fi";

function CertificateCard({ imgSrc, title, issuer, credentialUrl, aosDelay, orientation, onImageClick }) {
  const imageContainerClasses = "overflow-hidden aspect-video bg-zinc-50 border-b-3 border-black dark:border-white";

  const imageClasses = `
    w-full h-full group-hover:scale-105 transition-transform duration-300
    ${orientation === "portrait" ? "object-contain" : "object-cover"}
  `;

  return (
    <div className="group block rounded-2xl overflow-hidden neo-card bg-white dark:bg-zinc-800" data-aos="fade-up" data-aos-delay={aosDelay}>
      <div className={`${imageContainerClasses} cursor-pointer`} onClick={onImageClick}>
        <img src={imgSrc} alt={`Certificate for ${title}`} className={imageClasses} />
      </div>

      <div className="p-5 flex flex-col justify-between min-h-[140px]">
        <h4 className="text-base font-black uppercase tracking-tight text-[#202020] dark:text-white leading-snug line-clamp-2">{title}</h4>
        <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-dashed border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-800">
            <FiAward size={16} className="text-[#a855f7] dark:text-[#862add] stroke-[2.5]" />
            <span className="line-clamp-1 text-[#202020] dark:text-white">{issuer}</span>
          </div>
          <a href={credentialUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex-shrink-0 rounded-full border-2 border-black bg-white text-[#202020] group-hover:bg-[#a855f7] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
            <FiArrowUpRight size={14} className="stroke-[2.5]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
