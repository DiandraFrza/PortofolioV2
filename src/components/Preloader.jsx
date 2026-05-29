/** @format */

import React, { useState, useEffect } from "react";

const thinkingPhrases = ["INITIALIZING COGNITIVE SERVICES...", "PROBING NEURAL PATHWAYS...", "COMPILING CREATIVE DRIVES...", "LOADING WEB INTERFACES...", "DECRYPTING EXPERIENCES...", "SYNAPSE_INIT: 0x8F9C...", "ESTABLISHING SECURE PROTOCOLS...", "OPTIMIZING LAYOUT CODES...", "AI_THINKING_ENGINE = ACTIVE", "INJECTING ELECTRO_PURPLE..."];

const symbols = "!@#$%^&*()_+-=[]{}|;':\",./<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Preloader() {
  const [currentPhrase, setCurrentPhrase] = useState(thinkingPhrases[0]);
  const [glitchText, setGlitchText] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase cycling
    let phraseIndex = 0;
    const phraseInterval = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % thinkingPhrases.length;
      setCurrentPhrase(thinkingPhrases[phraseIndex]);
    }, 600);

    // Glitch symbols cycling (AI thinking representation)
    const glitchInterval = setInterval(() => {
      let result = "";
      const length = 12 + Math.floor(Math.random() * 8);
      for (let i = 0; i < length; i++) {
        result += symbols.charAt(Math.floor(Math.random() * symbols.length));
      }
      setGlitchText(result);
    }, 50);

    // Smooth progress loading (goes from 0 to 100 over ~3.8s)
    const startTime = Date.now();
    const duration = 3600;
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculated = Math.min((elapsed / duration) * 100, 100);
      setProgress(calculated);
      if (calculated >= 100) {
        clearInterval(progressInterval);
      }
    }, 30);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(glitchInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <>
      <div id="preloader_screen" className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fcfbfa] dark:bg-[#121212] p-4 transition-colors duration-300">
        {/* Dotted drawing paper background */}
        <div className="absolute inset-0 cartoon-dots opacity-30 pointer-events-none"></div>

        {/* Cartoon styled console box */}
        <div className="relative w-full max-w-lg neo-border-thick bg-white dark:bg-[#1e1e1e] p-6 neo-shadow-lg rounded-2xl transition-all duration-300">
          {/* Console Header */}
          <div className="flex items-center justify-between border-b-3 border-black dark:border-white pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border-2 border-black dark:border-white"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border-2 border-black dark:border-white"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border-2 border-black dark:border-white"></span>
            </div>
            <span className="text-xs font-black font-mono text-black dark:text-white uppercase tracking-wider">CAI_Console.exe</span>
          </div>

          {/* Console Output Screen */}
          <div className="bg-[#202020] text-white p-4 rounded-xl font-mono text-xs sm:text-sm min-h-[140px] flex flex-col justify-between border-3 border-black dark:border-white shadow-[inner_3px_3px_0px_rgba(0,0,0,0.5)]">
            <div className="space-y-1.5">
              <p className="text-green-400 font-bold">[SYSTEM ONLINE]</p>
              <p className="text-slate-400">Loading modules...</p>
              <p className="text-[#a855f7] font-extrabold animate-pulse">{currentPhrase}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center text-[#a855f7] font-bold">
              <span className="text-slate-400 text-[10px]">RAW_GLITCH:</span>
              <span className="tracking-wider text-right block overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px]">{glitchText}</span>
            </div>
          </div>

          {/* Neobrutalist Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-black dark:text-white tracking-wide">THINKING PROCESS</span>
              <span className="text-sm font-black text-black dark:text-white">{Math.floor(progress)}%</span>
            </div>
            <div className="w-full h-8 neo-border bg-white dark:bg-zinc-800 rounded-lg overflow-hidden relative">
              <div className={`h-full bg-[#a855f7] transition-all duration-150 ease-out ${progress > 0 && progress < 100 ? "border-r-3 border-black dark:border-white" : ""}`} style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="absolute bottom-8 text-center">
          <p className="text-lg font-black text-black dark:text-white tracking-wide">
            Diandra<span className="bg-[#a855f7] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[2px_2px_0px_rgba(255,255,255,1)] px-2 py-0.5 ml-1.5 border-2 rounded-md">Frzaa.</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Preloader;
