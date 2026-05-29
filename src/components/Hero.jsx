// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import profilePicture from "../assets/diandra.png";
import { TypeAnimation } from "react-type-animation";
import iconSign from "../assets/img/icon/up_sign.svg";
import iconHi from "../assets/img/icon/hi.svg";

// Custom Scramble Text Component for AI thinking reveal effect
const ScrambleText = ({ text, delay = 0, duration = 1000 }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!@#$%^&*()_+~}{[]:;?><,./-=";

  useEffect(() => {
    let timer;
    let frame = 0;
    const totalFrames = Math.floor(duration / 30);
    const textLength = text.length;

    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        let scrambled = "";
        for (let i = 0; i < textLength; i++) {
          if (text[i] === " ") {
            scrambled += " ";
            continue;
          }
          if (i / textLength < progress) {
            scrambled += text[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayText(scrambled);
        
        if (frame >= totalFrames) {
          setDisplayText(text);
          clearInterval(timer);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, [text, delay, duration]);

  return <span>{displayText}</span>;
};

function Hero() {
  // Parallax mouse position tracker
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="pt-32 pb-16 min-h-[90vh] flex items-center relative">
      
      {/* Parallax Cartoon Glitch Elements */}
      <div 
        className="absolute left-[5%] top-[25%] z-0 hidden md:block select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * -0.7}px, ${mousePos.y * -0.7}px)` }}
      >
        <div className="bg-red-400 text-[#121212] border-3 border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[-4deg]">
          [ERROR: 0x80070005]
        </div>
      </div>

      <div 
        className="absolute right-[12%] top-[20%] z-0 hidden md:block select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * 1.3}px, ${mousePos.y * 1.3}px)` }}
      >
        <div className="bg-yellow-300 text-[#121212] border-3 border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[5deg]">
          glitch_detected: true
        </div>
      </div>

      <div 
        className="absolute left-[20%] bottom-[20%] z-0 hidden md:block select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * 1.1}px, ${mousePos.y * -0.9}px)` }}
      >
        <div className="bg-[#a855f7] text-white border-3 border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[3deg]">
          SYNAPSE_OVERFLOW_99%
        </div>
      </div>

      <div 
        className="absolute right-[22%] bottom-[15%] z-0 hidden md:block select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * 0.8}px)` }}
      >
        <div className="bg-white dark:bg-zinc-800 text-[#121212] dark:text-white border-3 border-black dark:border-white px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[-6deg]">
          system_status: OK
        </div>
      </div>
      
      {/* Scroll Parallax Elements */}
      <div 
        className="absolute left-[10%] bottom-[-5%] z-0 hidden md:block select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * -1.5}px)` }}
      >
        <div className="bg-green-400 text-[#121212] border-3 border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[2deg]">
          > TERMINAL_READY
        </div>
      </div>
      
      <div 
        className="absolute right-[5%] bottom-[-15%] z-0 hidden md:block select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * 1.2}px)` }}
      >
        <div className="bg-black text-[#a855f7] border-3 border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_rgba(#a855f7,1)] rotate-[-4deg]">
          404_LIMIT_NOT_FOUND
        </div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* === KOLOM KIRI (Teks) === */}
          <div className="w-full lg:w-1/2 text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7.5xl font-black leading-none mb-6 text-[#121212] dark:text-white uppercase tracking-tight relative">
              <span className="absolute -top-6 left-0 bg-yellow-300 text-[#121212] px-3 py-1 border-2 border-black rounded-lg text-xs font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-[-2deg] z-20">
                🚀 OPEN TO WORK
              </span>
              <span className="bg-[#a855f7] text-white px-4 py-1.5 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-2xl inline-block mr-2 mb-2 rotate-[-1deg] mt-4">
                <ScrambleText text="Web" delay={300} />
              </span>
              <br />
              <span className="inline-block text-[#121212] dark:text-white border-b-6 border-black dark:border-white pb-1 mt-2">
                <ScrambleText text="Developer" delay={900} />
              </span>
            </h1>
            
            <p
              className="text-base md:text-lg font-bold text-zinc-700 dark:text-zinc-300 mb-6 max-w-lg"
              data-aos="fade-right"
              data-aos-delay="1300"
            >
              Menghadirkan solusi digital yang andal, mulai dari pengelolaan data, sistem server, hingga antarmuka interaktif.
            </p>

            {/* Animasi Typing */}
            <div className="mb-8 min-h-[60px]" data-aos="fade-right" data-aos-delay="1500">
              <TypeAnimation
                sequence={[
                  "Solving Problems with Technology.",
                  1000,
                  "Adaptable to IT Challenges.",
                  1000,
                  "Building Reliable Digital Solutions.",
                  1000,
                ]}
                wrapper="div"
                speed={50}
                className="text-xl md:text-2xl font-extrabold text-[#a855f7] dark:text-[#c084fc]"
                repeat={Infinity}
              />
            </div>

            {/* Tombol Show Skills Badges */}
            <div className="flex flex-wrap gap-2 mb-8" data-aos="fade-right" data-aos-delay="1700">
              <span className="neo-badge px-4 py-1.5 rounded-lg text-xs">Design</span>
              <span className="neo-badge px-4 py-1.5 rounded-lg text-xs">Web Dev</span>
              <span className="neo-badge px-4 py-1.5 rounded-lg text-xs">Database</span>
              <span className="neo-badge px-4 py-1.5 rounded-lg text-xs">IT Support</span>
            </div>

            {/* Tombol Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#portofolio"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl neo-btn text-center"
                data-aos="fade-up"
                data-aos-delay="1900"
              >
                <span>Projects</span>
                <img src={iconSign} alt="Projects Link" className="w-5 h-5 invert inline-block ml-1" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl neo-btn-white text-center"
                data-aos="fade-up"
                data-aos-delay="2100"
              >
                <span>Message</span>
                <img
  src={iconHi}
  alt="Hi Icon"
  className="w-5 h-5 inline-block ml-1 brightness-0"
 />
              </a>
            </div>
          </div>

          {/* === KOLOM KANAN (Foto Profil) === */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]" data-aos="zoom-in" data-aos-delay="600">
              {/* Offset flat purple cartoon shadow */}
              <div className="absolute inset-0 bg-[#a855f7] border-4 border-black rounded-3xl translate-x-4 translate-y-4"></div>
              {/* Main image container */}
              <div className="relative z-10 bg-white dark:bg-zinc-800 border-4 border-black dark:border-white rounded-3xl p-3 shadow-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                <img
                  src={profilePicture}
                  alt="Diandra Firza"
                  className="w-full aspect-square object-cover rounded-2xl bg-zinc-50 border-2 border-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
