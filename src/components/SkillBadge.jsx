/** @format */

import React from "react";

function SkillBadge({ icon, name }) {
  return (
    <div className="group flex items-center gap-2.5 rounded-xl neo-badge px-4 py-2.5 text-sm font-[#202020] cursor-default">
      <span className="text-[#a855f7] transition-colors duration-150 group-hover:text-white">{icon}</span>
      <span>{name}</span>
    </div>
  );
}

export default SkillBadge;
