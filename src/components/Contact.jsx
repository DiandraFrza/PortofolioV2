/** @format */

import React, { useState, useEffect, useRef, memo } from "react";
import { FiSend, FiMessageSquare, FiLinkedin, FiInstagram, FiYoutube, FiGithub } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { addDocument, subscribeToComments } from "../supabase/services";
import toast from "react-hot-toast";

/* =========================
   TERMINAL COMPONENT
========================= */

const DeletingTerminal = memo(({ scrollY, mousePos }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count++;

      const files = ["system32/config.sys", "react/dom.js", "neo-brutalism/shadows.css", "user/memories.dat", "database/comments.db"];

      const file = files[Math.floor(Math.random() * files.length)];

      const newLog = `> rm -rf /${file} ... [DELETED]`;

      setLogs((prev) => {
        const next = [...prev, newLog];

        if (next.length > 5) next.shift();

        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const parallaxY = scrollY * -0.1 + mousePos.y * 2;
  const parallaxX = mousePos.x * 2;

  return (
    <div
      className="absolute right-[80%] top-[20%] pointer-events-none z-20 hidden lg:block w-72 will-change-transform"
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) rotate(3deg)`,
      }}
    >
      <div className="bg-zinc-950 text-red-500 font-mono text-[10px] border-3 border-black dark:border-white rounded-xl shadow-[6px_6px_0px_rgba(239,68,68,1)] overflow-hidden">
        <div className="bg-zinc-800 px-3 py-1.5 flex items-center border-b-2 border-black dark:border-white gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>

          <span className="text-zinc-400 text-[9px] font-bold ml-2">TERMINATOR.exe</span>
        </div>

        <div className="p-3 h-32 flex flex-col justify-end">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 font-bold">
              {log}
            </div>
          ))}

          <div className="text-white mt-1">
            <span className="text-red-500 font-bold">{"> "}</span>

            <span className="animate-pulse bg-white w-2 h-3 inline-block align-middle"></span>
          </div>
        </div>
      </div>
    </div>
  );
});

DeletingTerminal.displayName = "DeletingTerminal";

/* =========================
   MAIN COMPONENT
========================= */

function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const animationFrameRef = useRef(null);

  /* =========================
     FORM STATES
  ========================= */

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isContactSending, setIsContactSending] = useState(false);

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isCommentSending, setIsCommentSending] = useState(false);

  const [comments, setComments] = useState([]);

  /* =========================
     EFFECTS
  ========================= */

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (animationFrameRef.current) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX - window.innerWidth / 2) / 40,
          y: (e.clientY - window.innerHeight / 2) / 40,
        });

        animationFrameRef.current = null;
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    const unsubscribe = subscribeToComments((data) => {
      setComments(data);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      unsubscribe();
    };
  }, []);

  /* =========================
     CONTACT SUBMIT
  ========================= */

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setIsContactSending(true);

    const result = await addDocument("messages", {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    });

    if (result.success) {
      toast.success("Pesan berhasil dikirim!");

      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } else {
      toast.error("Gagal mengirim pesan. Error: " + (result.error?.message || JSON.stringify(result.error)));
    }

    setIsContactSending(false);
  };

  /* =========================
     COMMENT SUBMIT
  ========================= */

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    setIsCommentSending(true);

    const result = await addDocument("comments", {
      name: commentName,
      text: commentText,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${commentName}`,
    });

    if (result.success) {
      toast.success("Komentar berhasil diposting!");

      setCommentName("");
      setCommentText("");
    } else {
      toast.error("Gagal memposting komentar. Error: " + (result.error?.message || JSON.stringify(result.error)));
    }

    setIsCommentSending(false);
  };

  return (
    <section id="contact" className="relative w-full py-20 bg-[#fdfdfd] dark:bg-[#121212] border-t-4 border-black dark:border-white overflow-visible">
      <DeletingTerminal scrollY={scrollY} mousePos={mousePos} />

      <div className="container mx-auto relative z-10 px-4 sm:px-8 max-w-6xl">
        {/* HEADER */}

        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#121212] dark:text-white">CONTACT ME</h2>

          <p className="mt-4 text-sm sm:text-base font-bold text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT */}

          <div className="flex flex-col gap-8">
            {/* CONTACT FORM */}

            <div className="neo-card p-6 sm:p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-black text-[#121212] dark:text-white uppercase tracking-tight">Hubungi</h3>

                <FiSend size={24} className="text-[#a855f7]" />
              </div>

              <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-6">Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.</p>

              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Nama Anda" required className="w-full rounded-xl neo-input p-3.5 text-sm font-bold" />
                </div>

                <div className="mb-4">
                  <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email Anda" required className="w-full rounded-xl neo-input p-3.5 text-sm font-bold" />
                </div>

                <div className="mb-6">
                  <textarea rows="4" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Pesan Anda" required className="w-full rounded-xl neo-input p-3.5 text-sm font-bold resize-none"></textarea>
                </div>

                <button type="submit" disabled={isContactSending} className={`w-full neo-btn py-3.5 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 ${isContactSending ? "opacity-70" : ""}`}>
                  <FiSend size={18} />

                  {isContactSending ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>

            {/* SOCIALS */}

            <div className="neo-card p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1.5 w-8 bg-[#a855f7] rounded-full"></div>

                <h3 className="text-xl font-black text-[#121212] dark:text-white uppercase tracking-tight">Connect With Me</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SocialCard href="https://github.com/DiandraFrza" title="Github" username="@DiandraFrza" icon={<FiGithub size={20} />} />

                <SocialCard href="https://www.instagram.com/frzzaaw/" title="Instagram" username="@frzzaw" icon={<FiInstagram size={20} />} />

                <SocialCard href="https://www.linkedin.com/in/diandra-firza-nasywan/" title="LinkedIn" username="@diandra_firza_nasywan" icon={<FiLinkedin size={20} />} />

                <SocialCard href="https://www.youtube.com/@Avenatic" title="Youtube" username="@Avenatic" icon={<FiYoutube size={20} />} />

                <a href="https://www.tiktok.com/@frzansyi" className="neo-card-purple p-3 rounded-xl flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 col-span-2">
                  <div className="w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center">
                    <FaTiktok size={20} />
                  </div>

                  <div>
                    <div className="text-sm font-black text-[#121212] dark:text-white">Tiktok</div>

                    <div className="text-[10px] font-bold text-zinc-500">@frzansyi</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="neo-card p-6 sm:p-8 rounded-2xl flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-3 border-black dark:border-white">
              <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center border-2 border-[#a855f7]">
                <FiMessageSquare size={20} className="text-[#a855f7]" />
              </div>

              <h3 className="text-2xl font-black text-[#121212] dark:text-white tracking-tight">
                Comments <span className="text-[#a855f7]">({comments.length})</span>
              </h3>
            </div>

            {/* FORM */}

            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="mb-4">
                <label className="block text-[11px] font-black uppercase text-[#121212] dark:text-white mb-1.5">Name</label>

                <input type="text" value={commentName} onChange={(e) => setCommentName(e.target.value)} placeholder="Enter your name" required className="w-full rounded-lg neo-input p-2.5 text-sm font-bold" />
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-black uppercase text-[#121212] dark:text-white mb-1.5">Message</label>

                <textarea rows="3" value={commentText} onChange={(e) => setCommentText(e.target.value)} maxLength={500} placeholder="Write your message here..." required className="w-full rounded-lg neo-input p-2.5 text-sm font-bold resize-none"></textarea>

                <div className="text-right mt-1 text-[10px] font-bold text-zinc-500">{commentText.length}/500 karakter</div>
              </div>

              <button type="submit" disabled={isCommentSending} className={`w-full neo-btn py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 ${isCommentSending ? "opacity-70" : ""}`}>
                <FiSend size={16} />

                {isCommentSending ? "Posting..." : "Post Comment"}
              </button>
            </form>

            {/* COMMENTS */}

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px] custom-scrollbar">
              {comments.length === 0 && <div className="text-center text-sm font-bold text-zinc-500 py-8">Belum ada komentar.</div>}

              {comments.map((comment) => (
                <div key={comment.id} className="neo-card-purple p-4 rounded-xl flex gap-4 bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="w-10 h-10 rounded-full border-2 border-black dark:border-white overflow-hidden bg-white shrink-0">
                    <img src={comment.avatar} alt={comment.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-black text-sm text-[#121212] dark:text-white">{comment.name}</h4>

                      <span className="text-[10px] font-bold text-zinc-500">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Baru saja"}</span>
                    </div>

                    <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   SOCIAL CARD
========================= */

function SocialCard({ href, title, username, icon }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="neo-card-purple p-3 rounded-xl flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">{icon}</div>

      <div>
        <div className="text-sm font-black text-[#121212] dark:text-white">{title}</div>

        <div className="text-[10px] font-bold text-zinc-500">{username}</div>
      </div>
    </a>
  );
}

export default Contact;
