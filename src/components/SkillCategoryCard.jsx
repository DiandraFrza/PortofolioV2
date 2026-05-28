/** @format */

import React from "react";
import SkillBadge from "./SkillBadge";

function SkillCategoryCard({ title, skills, isFeatured }) {
  const cardClasses = `
    p-6 rounded-2xl h-full
    ${isFeatured ? "neo-card-purple" : "neo-card"}
  `;

  return (
    <div className={cardClasses} data-aos="fade-up">
      <h4 className="text-lg font-[#202020] uppercase tracking-wide text-[#202020] dark:text-white mb-6 text-center">{title}</h4>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {skills.map((skill) => (
          <SkillBadge key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </div>
  );
}

export default SkillCategoryCard;
