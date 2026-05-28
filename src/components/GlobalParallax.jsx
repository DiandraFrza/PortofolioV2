/** @format */

// src/components/GlobalParallax.jsx
import React, { useState, useEffect } from "react";

function FloatingTerminal({ top, left, rot, speed, mousePos, scrollY }) {
  const [logs, setLogs] = useState([]);
  const allLogs = [
    { text: "> [FATAL] CORE COMPROMISED!", type: "error" },
    { text: "> Running diagnostic tests...", type: "info" },
    { text: "> ERR_SECTOR_404: Corrupted HTML", type: "error" },
    { text: "> Attempting memory allocation...", type: "info" },
    { text: "> [WARN] Stack limit approaching 98%", type: "warn" },
    { text: "> Recompiling React nodes...", type: "info" },
    { text: "> Resolving border overlapping...", type: "info" },
    { text: "> Injecting purple electro-shield...", type: "success" },
    { text: "> [SUCCESS] Port 3000 Secured!", type: "success" },
    { text: "> Cleaning memory cache...", type: "info" },
    { text: "> Subsystem status: STABLE", type: "success" },
  ];

  useEffect(() => {
    let logIndex = 0;
    setLogs([allLogs[0]]);

    const interval = setInterval(() => {
      logIndex = (logIndex + 1) % allLogs.length;
      if (logIndex === 0) {
        setLogs([allLogs[0]]);
      } else {
        setLogs((prev) => [...prev.slice(-3), allLogs[logIndex]]); // Keep last 4 logs
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const parallaxY = scrollY * (speed * 0.1) + mousePos.y * speed;
  const parallaxX = mousePos.x * speed;

  return (
    <div
      className="absolute transition-transform duration-100 ease-out z-0"
      style={{
        top: top,
        left: left,
        transform: `translate(${parallaxX}px, ${parallaxY}px) rotate(${rot})`,
      }}
    >
      <div className="bg-zinc-950 text-green-400 border-2 border-black rounded-xl p-3 w-52 sm:w-60 shadow-[4px_4px_0px_rgba(0,0,0,1)] font-mono text-[9px] leading-tight origin-center scale-[0.65] sm:scale-80 md:scale-100">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2 select-none">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"></span>
        </div>
        <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-black font-sans">
          PATCH_CORE.exe
        </span>
      </div>
      <div className="h-24 overflow-hidden space-y-1">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={
              log.type === "error"
                ? "text-red-400 font-extrabold"
                : log.type === "warn"
                ? "text-yellow-300"
                : log.type === "success"
                ? "text-[#a855f7] font-bold"
                : "text-zinc-300"
            }
          >
            {log.text}
          </div>
        ))}
        <div className="w-1 h-3.5 bg-green-400 animate-pulse inline-block align-middle ml-1"></div>
      </div>
      </div>
    </div>
  );
}

function GlobalParallax() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Random glitch items below Hero (starting > 100% top)
  const items = [
    { top: "125%", left: "3%", text: "ERR_CONNECTION_REFUSED", color: "bg-red-400", textCol: "text-[#202020]", rot: "-3deg", speed: 0.8 },
    { top: "145%", left: "82%", text: "undefined is not a function", color: "bg-yellow-300", textCol: "text-[#202020]", rot: "4deg", speed: -0.6 },
    { top: "195%", left: "12%", text: "while(true){}", color: "bg-zinc-900", textCol: "text-green-400", rot: "2deg", speed: 1.2 },
    { top: "245%", left: "84%", text: "NULL_POINTER", color: "bg-[#a855f7]", textCol: "text-white", rot: "-5deg", speed: -0.9 },
    { top: "285%", left: "4%", text: "C:\\> format C:", color: "bg-zinc-900", textCol: "text-white", rot: "6deg", speed: 0.5 },
    { top: "335%", left: "81%", text: "STACK_OVERFLOW", color: "bg-blue-400", textCol: "text-[#202020]", rot: "-2deg", speed: 1.1 },
    { top: "375%", left: "10%", text: "418 I'm a teapot", color: "bg-white", textCol: "text-[#202020]", rot: "3deg", speed: -0.7 },
    { top: "425%", left: "83%", text: "system.out.println", color: "bg-orange-400", textCol: "text-[#202020]", rot: "-4deg", speed: 0.9 },
    { top: "465%", left: "6%", text: "segmentation_fault", color: "bg-pink-400", textCol: "text-[#202020]", rot: "5deg", speed: -1.2 },
  ];

  return (
    // Changed z-0 to z-20 to display on top of absolute layout backgrounds, but under Header (z-40)
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      {items.map((item, idx) => {
        const parallaxY = scrollY * (item.speed * 0.1) + mousePos.y * item.speed;
        const parallaxX = mousePos.x * item.speed;

        return (
          <div
            key={idx}
            className="absolute transition-transform duration-100 ease-out z-0"
            style={{
              top: item.top,
              left: item.left,
              transform: `translate(${parallaxX}px, ${parallaxY}px) rotate(${item.rot})`,
            }}
          >
            <div className={`${item.color} ${item.textCol} border-2 border-black dark:border-white px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] origin-center scale-[0.7] sm:scale-85 md:scale-100 whitespace-nowrap`}>
              {item.text}
            </div>
          </div>
        );
      })}

      {/* Floating terminal patching bugs dynamically */}
      <FloatingTerminal
        top="165%"
        left="6%"
        rot="-2deg"
        speed={1.0}
        mousePos={mousePos}
        scrollY={scrollY}
      />

      <FloatingTerminal
        top="305%"
        left="82%"
        rot="3deg"
        speed={-0.8}
        mousePos={mousePos}
        scrollY={scrollY}
      />

      <FloatingTerminal
        top="445%"
        left="8%"
        rot="-4deg"
        speed={1.3}
        mousePos={mousePos}
        scrollY={scrollY}
      />
    </div>
  );
}

export default GlobalParallax;
