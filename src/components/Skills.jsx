/** @format */

import React, { useState, useEffect } from "react";
import SkillCategoryCard from "./SkillCategoryCard";
import { fetchCollection } from "../supabase/services";
import { SiHtml5, SiCss3, SiJavascript, SiPhp, SiNodedotjs, SiReact, SiVuedotjs, SiLaravel, SiCodeigniter, SiGit, SiGithub, SiVercel, SiFigma, SiCanva, SiLaragon, SiXampp, SiGamemaker } from "react-icons/si";
import { FiDatabase, FiShare2, FiFileText, FiCode } from "react-icons/fi";

const defaultSkillCategories = [
  {
    title: "Languages & Databases",
    skills: [
      { name: "HTML", icon: <SiHtml5 size={18} /> },
      { name: "CSS", icon: <SiCss3 size={18} /> },
      { name: "JavaScript", icon: <SiJavascript size={18} /> },
      { name: "PHP", icon: <SiPhp size={18} /> },
      { name: "SQL", icon: <FiDatabase size={18} /> },
      { name: "PAWN Script", icon: <FiFileText size={18} /> },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Node JS", icon: <SiNodedotjs size={18} /> },
      { name: "React JS", icon: <SiReact size={18} /> },
      { name: "Vue JS", icon: <SiVuedotjs size={18} /> },
      { name: "Laravel", icon: <SiLaravel size={18} /> },
      { name: "CodeIgniter", icon: <SiCodeigniter size={18} /> },
      { name: "Rest API", icon: <FiShare2 size={18} /> },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: <SiGit size={18} /> },
      { name: "GitHub", icon: <SiGithub size={18} /> },
      { name: "GameMaker", icon: <SiGamemaker size={18} /> },
      { name: "Vercel", icon: <SiVercel size={18} /> },
      { name: "Figma", icon: <SiFigma size={18} /> },
      { name: "Canva", icon: <SiCanva size={18} /> },
      { name: "Laragon", icon: <SiLaragon size={18} /> },
      { name: "XAMPP", icon: <SiXampp size={18} /> },
    ],
  },
];

function Skills() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      setIsLoading(true);
      const data = await fetchCollection("skills");

      if (data.length > 0) {
        const newCategories = data
          .map((skill) => {
            // skill.items is an array of strings e.g. ["React", "Node.js"]
            const itemsArray = Array.isArray(skill.items) ? skill.items : [];

            return {
              title: skill.category,
              skills: itemsArray.map((itemName) => ({
                name: itemName,
                icon: <FiCode size={18} />,
              })),
            };
          })
          .filter((cat) => cat.skills.length > 0);

        setCategories(newCategories.length > 0 ? newCategories : defaultSkillCategories);
      } else {
        setCategories(defaultSkillCategories);
      }
      setIsLoading(false);
    };

    loadSkills();
  }, []);

  return (
    <div id="skills" className="mt-8">
      <div className="mb-12 text-center animate-fade-down" data-aos="fade-down">
        <h3 className="text-3xl sm:text-5xl font-[#202020] uppercase text-[#202020] dark:text-white tracking-tight">Skills & Abilities</h3>
        <p className="text-zinc-600 dark:text-zinc-400 font-bold max-w-md mx-auto mt-2">Perangkat teknologi dan keahlian yang saya gunakan untuk mewujudkan ide digital.</p>
      </div>

      {isLoading ? (
        <div className="text-center font-bold">Loading Skills...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-aos="zoom-out">
          {categories.map((category, index) => (
            <SkillCategoryCard key={category.title} title={category.title} skills={category.skills} isFeatured={index === 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;
