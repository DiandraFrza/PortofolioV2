/** @format */
import { useState, useEffect } from "react";
import Projects from "./Projects";
import Skills from "./Skills";
import Certificates from "./Certificates";

import ProjectIcon from "../assets/img/icon/project.svg";
import SkillsIcon from "../assets/img/icon/skill-5.svg";
import CertificateIcon from "../assets/img/icon/certificate.svg";

function ParallaxRobot() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("Glitching...");

  const prompts = ["RE-CALIBRATING PURPLE SHIELD...", "FIXING COGNITIVE JOINT... [OK]", "PATCHING REACTION ENGINE...", "OPTIMIZING MEMORY CHIPS...", "COMPILING MECHANISM_V1.9.sh", "CLEARING FAULTY CACHE BLOCKS...", "RESOLVING DEEP LOGIC LOOPS..."];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    let idx = 0;
    setPrompt(prompts[0]);
    const timer = setInterval(() => {
      idx = (idx + 1) % prompts.length;
      setPrompt(prompts[idx]);
      setStatus(Math.random() > 0.5 ? "Fixing..." : "Calibrating...");
    }, 2500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const parallaxY = scrollY * -0.05 + mousePos.y * 1.2;
  const parallaxX = mousePos.x * 1.2;

  return (
    <div className="absolute right-[-2%] top-[10%] -rotate-12 pointer-events-none z-20 transition-transform duration-200 ease-out hidden xl:block w-64 pointer-events-none z-20 transition-transform duration-200 ease-out hidden xl:block w-64" style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}>
      <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-white rounded-3xl p-5 shadow-[5px_5px_0px_rgba(168,85,247,1)] flex flex-col items-center select-none relative">
        {/* Robot head antenna */}
        <div className="w-1.5 h-6 bg-black dark:bg-white mb-[-3px] relative z-0">
          <div className="w-4 h-4 rounded-full bg-[#a855f7] border-2 border-black absolute -top-3.5 -left-1 animate-ping"></div>
          <div className="w-4 h-4 rounded-full bg-[#a855f7] border-2 border-black absolute -top-3.5 -left-1"></div>
        </div>

        {/* Robot head/face */}
        <div className="w-24 h-20 bg-zinc-100 dark:bg-zinc-800 border-3 border-black dark:border-white rounded-2xl p-2 relative z-10 flex flex-col justify-center items-center shadow-[inset_3px_3px_0px_rgba(0,0,0,0.1)]">
          {/* Eyes */}
          <div className="flex gap-4 mb-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#a855f7] border-2 border-black flex items-center justify-center relative">
              <span className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5 animate-pulse"></span>
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#a855f7] border-2 border-black flex items-center justify-center relative">
              <span className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5 animate-pulse"></span>
            </div>
          </div>

          {/* Glitching mouth */}
          <div className="w-12 h-2 bg-black rounded-full flex items-center justify-around overflow-hidden p-0.5">
            <span className="w-0.5 h-full bg-[#a855f7] animate-pulse"></span>
            <span className="w-0.5 h-full bg-[#a855f7] animate-bounce"></span>
            <span className="w-0.5 h-full bg-[#a855f7] animate-pulse"></span>
          </div>
        </div>

        {/* speech bubble for logs */}
        <div className="mt-4 bg-zinc-950 text-green-400 font-mono text-[9px] border-2 border-black rounded-lg p-2.5 w-full relative">
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950 border-t-2 border-l-2 border-black rotate-45"></div>

          <div className="flex justify-between border-b border-zinc-800 pb-1 mb-1.5 font-bold">
            <span className="text-red-400 font-black">🤖 BOT_SYSTEM:</span>
            <span className="text-[#a855f7]">{status}</span>
          </div>
          <div className="font-extrabold break-words">{prompt}</div>
        </div>
      </div>
    </div>
  );
}

function Portofolio() {
  const [activeTab, setActiveTab] = useState("projects");

  const getButtonClass = (tabName) => {
    return `
      flex-1 py-4 px-3 md:px-6 font-[#202020] uppercase text-xs md:text-sm tracking-wider transition-all duration-150 flex items-center justify-center gap-2 border-r-3 border-[#202020] dark:border-white last:border-r-0 focus:outline-none
      ${activeTab === tabName ? "bg-[#a855f7] text-white" : "bg-white dark:bg-zinc-800 text-[#202020] dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"}
    `;
  };

  return (
    <section id="portofolio" className="py-8 relative overflow-visible">
      {/* Robot floating parallax widget */}
      <ParallaxRobot />

      <div className="container mx-auto">
        {/* Cartoon Tab bar */}
        <div className="relative mb-12 flex justify-center" data-aos="zoom-in">
          <div className="w-full max-w-xl flex border-3 border-[#202020] dark:border-white rounded-2xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.8)]">
            <button onClick={() => setActiveTab("projects")} className={getButtonClass("projects")}>
              <img src={ProjectIcon} alt="Project Icon" className="w-5 h-5 dark:invert" />
              <span>Projects</span>
            </button>

            <button onClick={() => setActiveTab("skills")} className={getButtonClass("skills")}>
              <img src={SkillsIcon} alt="Skills Icon" className="w-5 h-5 dark:invert" />
              <span>Skills</span>
            </button>

            <button onClick={() => setActiveTab("certificates")} className={getButtonClass("certificates")}>
              <img src={CertificateIcon} alt="Certificate Icon" className="w-5 h-5 dark:invert" />
              <span>Certificates</span>
            </button>
          </div>
        </div>

        {/* Tab Content rendering */}
        <div className="mt-10">
          {activeTab === "projects" && <Projects />}
          {activeTab === "skills" && <Skills />}
          {activeTab === "certificates" && <Certificates />}
        </div>
      </div>
    </section>
  );
}

export default Portofolio;
