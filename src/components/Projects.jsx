/** @format */

import React, { useState, useEffect } from "react";
import { FiGithub, FiExternalLink, FiPlusCircle } from "react-icons/fi";
import AlertPopup from "./AlertPopup";
import { fetchCollection } from "../supabase/services";
import ImageModal from "./ImageModal";

import donghubCloneImg from "../assets/project/donghubclone.png";
import laundryAppImg from "../assets/project/laundryapp.png";
import APITaskImg from "../assets/project/create_task.png";
import portofolio3DImg from "../assets/project/3DPortofolio.png";
import aventuraArcanaImg from "../assets/project/AventuraArcana.png";
import angkringanImg from "../assets/project/landingPageAngkringan.png";
import gameJsImg from "../assets/project/lobbyGameJS.png";
import ppdbCNImg from "../assets/project/nativePPDBCN.png";
import spektrumImg from "../assets/project/wmsSpektrum.png";
import TFaceAPIImg from "../assets/img/31343C.svg";
import wmsImg from "../assets/img/31343C.svg";

const ProjectCard = ({ imageUrl, title, description, tech, githubUrl, onDemoClick, onImageClick }) => {
  return (
    <div className="neo-card rounded-2xl p-5 flex flex-col h-full bg-white dark:bg-zinc-800 text-[#202020] dark:text-white" data-aos="fade-up">
      <div className="border-3 border-[#202020] dark:border-white rounded-xl mb-4 overflow-hidden h-48 w-full shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={onImageClick}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found";
          }}
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-[#202020] uppercase tracking-tight text-[#202020] dark:text-white">{title}</h3>
        <p className="mt-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 flex-grow leading-relaxed">{description}</p>
        <div className="mt-4 pt-2 border-t-2 border-dashed border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-zinc-100 flex flex-wrap gap-1.5 items-center">
          <span className="bg-[#984be0]/10 text-[#8754b6] dark:text-[#9660cc] border border-[#202020] dark:border-white px-2 py-0.5 rounded-md font-[#202020] uppercase text-[10px]">Tech</span>
          <span className="font-bold text-zinc-600 dark:text-zinc-200">{Array.isArray(tech) ? tech.join(", ") : tech}</span>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button onClick={onDemoClick} className="flex-1 neo-btn rounded-xl py-2.5 sm:text-base text-sm font-extrabold">
          <FiExternalLink className="stroke-[2.5]" />
          <span>Live Demo</span>
        </button>

        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 neo-btn-white rounded-xl py-2.5 sm:text-base text-sm font-extrabold text-center">
          <FiGithub className="stroke-[2.5]" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

const defaultProjects = [
  {
    imgSrc: donghubCloneImg,
    title: "Donghub UI Clone",
    description: "Kloning UI yang responsif dan interaktif dari sebuah website streaming, dibuat sebagai bagian dari technical test untuk posisi Frontend Developer. Project ini dibangun dari nol menggunakan React (Vite) dan Tailwind CSS, dengan fokus utama pada arsitektur berbasis komponen yang reusable dan detail UI yang presisi sesuai desain Figma.",
    tech: "React.js, Vite, Tailwind CSS, React Router, React Icons",
    link: "https://donghubclone.netlify.app/",
    githubUrl: "https://github.com/DiandraFrza/donghubClone",
  },
  {
    imgSrc: APITaskImg,
    title: "Laravel RBAC API",
    description: "RESTful API berbasis Laravel 12 dengan implementasi Role-Based Access Control (RBAC) dan frontend sederhana menggunakan Vanilla JS + Bootstrap.",
    tech: "Sanctum, MySQL, Bootstrap, Vanilla JavaScript (Fetch API), Laravel Scheduler & Policy, PHPUnit (Testing)",
    link: "#",
    githubUrl: "https://github.com/DiandraFrza/laravel-rbac-dashboard",
  },
  {
    imgSrc: spektrumImg,
    title: "WMS Spektrum Kreasi Pratama",
    description: "Membantu mengembangkan fitur di Website Resmi Spektrum.",
    tech: "Boostrap, Codeigniter 4, MySQL",
    link: "#",
    githubUrl: "https://github.com/DiandraFrza/BarangKeluarMasuk-Spektrum",
  },
  {
    imgSrc: laundryAppImg,
    title: "Laundry App",
    description: "Aplikasi laundry berbasis web dengan 3 role (Admin, Owner, Member). Untuk membantu UMKM Laundry.",
    tech: "Laravel 11, Breeze, Tailwind, MySQL",
    link: "https://laundryfrzaa.publicvm.com/",
    githubUrl: "https://github.com/DiandraFrza/Laundryza.git",
  },
  {
    imgSrc: angkringanImg,
    title: "UMKM Angkringan",
    description: "Sebuah Aplikasi landing page untuk membantu penjualan UMKM Angkringan di Depok.",
    tech: "PHP Native, HTML, CSS, JS, MySQL",
    link: "https://angkringankita.vercel.app/",
    githubUrl: "https://github.com/DiandraFrza/UMKMAngkringan-Native",
  },
  {
    imgSrc: aventuraArcanaImg,
    title: "Aventura Arcana",
    description: "Sebuah game petualangan RPG Platformer 2D Pixel Art. Game ini masih dalam tahap pengembangan.",
    tech: "Engine Game Maker Studio 2, GML",
    link: "#",
    githubUrl: "https://github.com/DiandraFrza/AventuraArcanaV0.8",
  },
  {
    imgSrc: gameJsImg,
    title: "Fighting Game 2 Player",
    description: "Game fighting 2D pixel art sederhana, yang dibuat pake JavaScript OOP.",
    tech: "HTML, CSS, JavaScript, Framework KaboomJS",
    link: "#",
    githubUrl: "https://github.com/DiandraFrza/fightingJs",
  },
  {
    imgSrc: ppdbCNImg,
    title: "PPDB Citra Negara",
    description: "Aplikasi PPDB Citra Negara. Yang di lengkapi Multi Auth. Masih dalam tahap pengembangan.",
    tech: "Laravel 11, HTML, CSS, JavaScript, MySQL",
    link: "#",
    githubUrl: "https://github.com/DiandraFrza/PPDBCitraNegara",
  },
  {
    imgSrc: portofolio3DImg,
    title: "3D Interactive Portfolio",
    description: "Portofolio interaktif dalam bentuk 3D yang keren, dibangun pake Three.js.",
    tech: "Three.js, TailwindCSS",
    link: "https://firza-3dportfolio.vercel.app/",
    githubUrl: "https://github.com/DiandraFrza/3D-Interactive-Portfolio",
  },
  {
    imgSrc: TFaceAPIImg,
    title: "TensorFlow Face API",
    description: "Aplikasi pendeteksi wajah seperti umur, reaksi, mimik wajah. Yang menggunakan Tiny AI.",
    tech: "TensorFlow JS, API",
    link: "#",
    githubUrl: "https://github.com/DiandraFrza/TensorFlowAPI-Face",
  },
  {
    imgSrc: wmsImg,
    title: "WMS System Beta Test",
    description: "Warehouse Management System (WMS). Sederhana, sudah multi Auth.",
    tech: "Codeigniter 3, MySQL, Boostrap",
    link: "#",
    githubUrl: "https://github.com/DiandraFrza/WMSystem",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [popupMessage, setPopupMessage] = useState("");
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      const data = await fetchCollection("projects");
      if (data.length > 0) {
        setProjects(data);
      } else {
        setProjects(defaultProjects); // Fallback if Firestore is empty or unconfigured
      }
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleDemoClick = (url) => {
    if (!url || url === "#") {
      setPopupMessage("Live demo untuk project ini belum tersedia atau sedang dalam pengembangan.");
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="projects" className="mt-8">
      <AlertPopup isOpen={!!popupMessage} message={popupMessage} onClose={() => setPopupMessage("")} />
      
      <ImageModal 
        isOpen={!!modalImage} 
        imageUrl={modalImage?.url} 
        title={modalImage?.title} 
        onClose={() => setModalImage(null)} 
      />

      <div className="mb-12 text-center animate-fade-down" data-aos="fade-down">
        <h3 className="text-3xl sm:text-5xl font-[#202020] uppercase text-[#202020] dark:text-white tracking-tight">Projects Made</h3>
        <p className="text-zinc-600 dark:text-zinc-300 font-bold max-w-md mx-auto mt-2">Koleksi karya digital yang saya bangun dari baris kode kasar.</p>
      </div>

      {isLoading ? (
        <div className="text-center font-bold">Loading Projects...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, visibleCount).map((project, index) => (
              <ProjectCard 
                key={project.id || index} 
                imageUrl={project.imgSrc || project.imageUrl} 
                title={project.title} 
                description={project.description} 
                tech={project.tech || "Various"} 
                githubUrl={project.githubLink || project.githubUrl || "#"} 
                onDemoClick={() => handleDemoClick(project.demoLink || project.link || project.demoUrl)} 
                onImageClick={() => setModalImage({ url: project.imgSrc || project.imageUrl, title: project.title })}
              />
            ))}
          </div>

          {visibleCount < projects.length && (
            <div className="mt-12 text-center">
              <button onClick={handleShowMore} className="group neo-btn px-8 py-3.5 rounded-full text-base font-extrabold" data-aos="fade-up">
                <FiPlusCircle className="transition-transform duration-300 group-hover:rotate-90 stroke-[2.5]" />
                <span>Show More</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Projects;
