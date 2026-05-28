/** @format */

// src/components/Header.jsx
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback if not on home page
      window.location.href = "/" + href;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "portofolio", "contact"];
      let newActiveSection = "";

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140) {
            newActiveSection = `#${id}`;
          }
        }
      }

      if (window.scrollY < 200) {
        newActiveSection = "#home";
      }

      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#portofolio", label: "Portofolio" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl rounded-2xl border-2 border-black dark:border-white bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-md px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.7)] transition-all duration-300">
      <div className="flex items-center justify-between relative">
        <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="text-lg font-black text-black dark:text-white uppercase tracking-tight flex items-center">
          Diandra
          <span className="bg-[#a855f7] text-white px-2 py-0.5 ml-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md text-xs">Frzaa.</span>
        </a>

        {/* Tombol Hamburger */}
        <div className="flex items-center lg:hidden gap-3">
          <button onClick={toggleTheme} className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {isDarkMode ? <FiSun size={18} className="text-white" /> : <FiMoon size={18} className="text-black" />}
          </button>
          <button id="hamburger" type="button" onClick={handleHamburgerClick} className={`relative group p-1.5 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] ${isMenuOpen ? "hamburger-active" : ""}`}>
            <span className="hamburger-line block w-5 h-0.5 bg-black dark:bg-white my-1 transition duration-300"></span>
            <span className="hamburger-line block w-5 h-0.5 bg-black dark:bg-white my-1 transition duration-300"></span>
            <span className="hamburger-line block w-5 h-0.5 bg-black dark:bg-white my-1 transition duration-300"></span>
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav id="nav-menu" className={`absolute top-full mt-3 right-0 w-[180px] rounded-xl border-2 p-3 lg:static lg:flex lg:items-center lg:w-auto lg:border-none lg:shadow-none lg:bg-transparent lg:p-0 ${!isMenuOpen ? "hidden" : ""}`}>
          <ul className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full lg:w-auto flex items-center">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block lg:inline-block whitespace-nowrap text-lg font-black uppercase tracking-tight transition-all duration-150
                  ${activeSection === link.href ? "text-[#a855f7] border-b-2 border-[#a855f7]" : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-b-2 hover:border-transparent dark:hover:border-transparent"}`}
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* Theme Toggle Desktop */}
            <li className="hidden lg:block ml-2">
              <button onClick={toggleTheme} className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
                {isDarkMode ? <FiSun size={18} className="text-white" /> : <FiMoon size={18} className="text-black" />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
