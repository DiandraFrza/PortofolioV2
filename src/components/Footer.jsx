/** @format */

// src/components/Footer.jsx
import githubIcon from "../assets/img/icon/github.svg";
import linkedinIcon from "../assets/img/icon/in.svg";
import instagramIcon from "../assets/img/icon/instagram.svg";

function Footer() {
  return (
    <footer className="w-full py-8 bg-white dark:bg-[#202020] border-t-4 border-black dark:border-white transition-colors duration-300">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-[#202020] dark:text-zinc-300 mb-4 sm:mb-0">© 2026 Diandra Firza.</p>

          <div className="flex gap-4">
            {/* GitHub */}
            <a href="https://github.com/DiandraFrza" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-black bg-white dark:bg-zinc-800 flex items-center justify-center transition-all duration-150 hover:bg-[#a855f7] hover:text-white dark:hover:bg-[#a855f7] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]">
              <img src={githubIcon} alt="GitHub" className="w-5 h-5 dark:invert" />
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/in/diandra-firza-nasywan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-black bg-white dark:bg-zinc-800 flex items-center justify-center transition-all duration-150 hover:bg-[#a855f7] hover:text-white dark:hover:bg-[#a855f7] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]">
              <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 dark:invert" />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/frzzaaw/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-black bg-white dark:bg-zinc-800 flex items-center justify-center transition-all duration-150 hover:bg-[#a855f7] hover:text-white dark:hover:bg-[#a855f7] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]">
              <img src={instagramIcon} alt="Instagram" className="w-5 h-5 dark:invert" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
