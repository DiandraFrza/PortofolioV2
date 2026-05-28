/** @format */

// src/components/StatCard.jsx
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

function StatCard({ icon, number, title, description, href, aosDelay }) {
  return (
    <a
      href={href}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      className="
        neo-card
        rounded-2xl
        p-6
        bg-white
        dark:bg-zinc-800
        flex
        flex-col
        items-start
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <div className="w-12 h-12 rounded-xl border-2 border-[#202020] bg-[#a855f7] text-white flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">{icon}</div>

      <h3 className="text-4xl font-black text-[#202020] dark:text-white mb-2">{number}</h3>

      <h4 className="text-lg font-[#202020] uppercase tracking-wide mb-2 text-[#202020] dark:text-white">{title}</h4>

      <p className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">{description}</p>
    </a>
  );
}

export default StatCard;
