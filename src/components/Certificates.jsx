/** @format */

// src/components/Certificates.jsx
import React, { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";
import { fetchCollection } from "../supabase/services";

import certSpektrum from "../assets/certificate/spektrum.jpeg";
import certCyberlabs from "../assets/certificate/cyberlabs.jpeg";
import certDicoding from "../assets/certificate/webinardicoding.jpeg";
import certJarvis from "../assets/certificate/webinarjarvis.jpeg";
import certMediasosial from "../assets/certificate/webinarmediasosial.jpeg";

const defaultCertificates = [
  {
    imgSrc: certSpektrum,
    title: "Praktek Kerja Lapangan (Internship)",
    issuer: "PT Spektrum Kreasi Pratama",
    credentialUrl: "#",
    aosDelay: "100",
    orientation: "portrait",
  },
  {
    imgSrc: certCyberlabs,
    title: "Exploring Passion in Your Dream Tech Companies",
    issuer: "CyberLabs",
    credentialUrl: "#",
    aosDelay: "200",
  },
  {
    imgSrc: certDicoding,
    title: "Webinar Express JS & Programmer WFH",
    issuer: "ID Koding",
    credentialUrl: "#",
    aosDelay: "200",
  },
  {
    imgSrc: certJarvis,
    title: "Kreativita Tanpa Batas",
    issuer: "Jarvis",
    credentialUrl: "#",
    aosDelay: "200",
  },
  {
    imgSrc: certMediasosial,
    title: "Literasi & Cakap Bermedia Sosial",
    issuer: "SMK Citra Negara",
    credentialUrl: "#",
    aosDelay: "200",
  },
];

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      setIsLoading(true);
      const data = await fetchCollection("certificates");
      if (data.length > 0) {
        setCertificates(data);
      } else {
        setCertificates(defaultCertificates);
      }
      setIsLoading(false);
    };
    
    loadCertificates();
  }, []);

  return (
    <div id="certificates" className="mt-8" data-aos="fade-up">
      <div className="mb-12 text-center" data-aos="fade-down">
        <h3 className="text-3xl sm:text-5xl font-[#202020] uppercase text-[#202020] dark:text-white tracking-tight">My Certificates</h3>
        <p className="text-zinc-600 dark:text-zinc-400 font-bold max-w-md mx-auto mt-2">Bukti sertifikasi formal dan pelatihan profesional yang telah saya selesaikan.</p>
      </div>

      {isLoading ? (
        <div className="text-center font-bold">Loading Certificates...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertificateCard 
              key={cert.id || index} 
              imgSrc={cert.imgSrc} 
              title={cert.title} 
              issuer={cert.issuer} 
              credentialUrl={cert.credentialUrl} 
              aosDelay={cert.aosDelay || "100"} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Certificates;
