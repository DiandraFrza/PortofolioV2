/** @format */

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// import components
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      AOS.init({
        duration: 800,
        once: true,
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="relative min-h-screen bg-[#fdfdfd] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      {/* Dynamic background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.025] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "25px 25px",
        }}
      ></div>

      <main className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default LandingPage;
