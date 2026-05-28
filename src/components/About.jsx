/** @format */

import React, { useState, useEffect } from "react";
import iconfile from "../assets/img/icon/file.svg";
import iconproject from "../assets/img/icon/multimodal_handeye.svg";
import Portofolio from "./Portofolio";
import StatCard from "./StatCard";
import { GoProjectSymlink, GoShieldCheck, GoTrophy, GoTerminal, GoDatabase, GoGear } from "react-icons/go";
import { fetchCollection } from "../supabase/services";

function About() {
  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [stats, setStats] = useState({
    projects: "0",
    certificates: "0",
    skills: "0",
  });

  useEffect(() => {
    const loadStats = async () => {
      const [proj, cert, skillData] = await Promise.all([fetchCollection("projects"), fetchCollection("certificates"), fetchCollection("skills")]);

      let totalSkills = 0;
      if (skillData && skillData.length > 0) {
        skillData.forEach((s) => {
          if (Array.isArray(s.items)) {
            totalSkills += s.items.length;
          }
        });
      }

      setStats({
        projects: proj.length > 0 ? proj.length.toString() : "0",
        certificates: cert.length > 0 ? cert.length.toString() : "0",
        skills: totalSkills > 0 ? totalSkills.toString() : "0",
      });
    };
    loadStats();
  }, []);

  const statsData = [
    {
      icon: <GoProjectSymlink size={24} />,
      number: stats.projects,
      title: "Total Projects",
      description: "Innovative web solutions crafted",
      aosDelay: "100",
      href: "#portofolio",
    },
    {
      icon: <GoShieldCheck size={24} />,
      number: stats.certificates,
      title: "Certificates",
      description: "Professional skills validated",
      aosDelay: "200",
      href: "#portofolio",
    },
    {
      icon: <GoTrophy size={24} />,
      number: stats.skills,
      title: "Tech Skills Mastered",
      description: "Tools, Languages, & Frameworks",
      aosDelay: "300",
      href: "#skills",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="w-full text-left">
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-[#202020] text-[#202020] dark:text-white sm:text-5xl uppercase tracking-tight" data-aos="fade-up">
              About Me
            </h2>
            <div className="flex-grow h-1.5 rounded-full bg-[#202020] dark:bg-white" data-aos="fade-left" data-aos-delay="200"></div>
          </div>

          {/* Description Paragraph */}
          <p className="font-bold text-lg text-zinc-800 dark:text-zinc-200 mb-6 leading-relaxed" data-aos="fade-right">
            Hello! I'm <span className="py-1 px-2.5 rounded-lg bg-[#a855f7] text-white border-2 border-[#202020] font-extrabold inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)]">Diandra Firza Nasywan</span>, Web developer dengan ketertarikan pada Full-Stack Development dan UI Design. Saya suka membangun website modern yang clean, interaktif, dan nyaman digunakan, baik dari sisi tampilan maupun fungsionalitas.
          </p>

          {/* Cartoon Quote Callout */}
          <div className="p-4 border-3 border-[#202020] dark:border-white/90 bg-[#a855f7]/30 rounded-xl mb-8 border-dashed max-w-2xl relative" data-aos="fade-left">
            <div className="absolute -top-3 -right-3 bg-yellow-300 border-2 border-[#202020] dark:border-white/90 rounded-full p-2 rotate-12 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <span className="text-[#202020] font-black text-xs">READY!</span>
            </div>
            <p className="text-base font-[#202020] italic text-[#202020] dark:text-white">"Code is how I express ideas. Tech is how I shape them."</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="https://drive.google.com/file/d/1xWjonCkjaJOZqL9CCGlfNremdmTDw8ne/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3.5 rounded-xl neo-btn text-center text-sm" data-aos="fade-up">
              <img src={iconfile} alt="Download Icon" className="w-5 h-5 invert inline-block mr-2 ml-1 brightness-0" />
              <span>Download CV</span>
            </a>

            <a href="#portofolio" onClick={(e) => handleScrollClick(e, 'portofolio')} className="w-full sm:w-auto px-6 py-3.5 rounded-xl neo-btn-white text-center text-sm" data-aos="fade-up" data-aos-delay="100">
              <img src={iconproject} alt="Project Icon" className="w-5 h-5 inline-block mr-2 ml-1 brightness-0" />
              <span>Lihat Proyek</span>
            </a>
          </div>

          {/* Core Capabilities Section */}
          <div className="mb-16" data-aos="fade-up">
            <h3 className="text-xl font-[#202020] uppercase tracking-wider text-[#202020] dark:text-white mb-6">Core Capabilities (Why Hire Me?)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="neo-card rounded-2xl p-6 bg-white dark:bg-zinc-800 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl border-2 border-[#202020] bg-[#a855f7] text-white flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">
                  <GoTerminal size={24} />
                </div>
                <h4 className="text-lg font-[#202020] uppercase tracking-wide mb-2 text-[#202020] dark:text-white">Software Development</h4>
                <p className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">Membangun website modern dengan fokus pada performa, interaktivitas, dan pengalaman pengguna.</p>
              </div>

              <div className="neo-card rounded-2xl p-6 bg-white dark:bg-zinc-800 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl border-2 border-[#202020] bg-[#a855f7] text-white flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">
                  <GoDatabase size={24} />
                </div>
                <h4 className="text-lg font-[#202020] uppercase tracking-wide mb-2 text-[#202020] dark:text-white">Database & Systems</h4>
                <p className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">Merancang dan mengelola database MySQL, optimasi query, serta deployment aplikasi pada server lokal maupun cloud. Mengelola Search Engine Optimization dan Google Console</p>
              </div>

              <div className="neo-card rounded-2xl p-6 bg-white dark:bg-zinc-800 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl border-2 border-[#202020] bg-[#a855f7] text-white flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">
                  <GoGear size={24} />
                </div>
                <h4 className="text-lg font-[#202020] uppercase tracking-wide mb-2 text-[#202020] dark:text-white">Operations & Admin</h4>
                <p className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">Menangani troubleshooting perangkat, administrasi sistem, serta membantu otomatisasi pekerjaan operasional.</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch lg:mb-10">
            {statsData.map((stat, index) => (
              <StatCard key={index} icon={stat.icon} number={stat.number} title={stat.title} description={stat.description} aosDelay={stat.aosDelay} href={stat.href} />
            ))}
          </div>
        </div>

        {/* Portfolio Tabs Sub-section */}
        <div className="w-full">
          <Portofolio />
        </div>
      </div>
    </section>
  );
}

export default About;
