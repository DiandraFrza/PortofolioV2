/** @format */

import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiMessageSquare, FiFolder, FiAward, FiFileText, FiLogOut, FiMenu, FiX, FiCode, FiMail, FiMessageCircle, FiSettings } from "react-icons/fi";
import { supabase } from "../../supabase/client";
import { logoutAdmin } from "../../supabase/auth";
import Login from "./Login";
import ManageProjects from "./ManageProjects";
import ManageSkills from "./ManageSkills";
import ManageCertificates from "./ManageCertificates";
import ManageMessages from "./ManageMessages";
import ManageComments from "./ManageComments";
import ManageSettings from "./ManageSettings";
import { fetchCollection } from "../../supabase/services";

function DashboardHome() {
  const [stats, setStats] = useState({
    projects: "-",
    messages: "-",
    comments: "-",
    certificates: "-",
  });

  useEffect(() => {
    const loadStats = async () => {
      const [proj, msg, comm, cert] = await Promise.all([fetchCollection("projects"), fetchCollection("messages"), fetchCollection("comments"), fetchCollection("certificates")]);
      setStats({
        projects: proj.length,
        messages: msg.length,
        comments: comm.length,
        certificates: cert.length,
      });
    };
    loadStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dynamic Stat Cards */}
        {[
          { title: "Total Projects", count: stats.projects, icon: <FiFolder size={24} /> },
          { title: "Messages", count: stats.messages, icon: <FiMail size={24} /> },
          { title: "Comments", count: stats.comments, icon: <FiMessageCircle size={24} /> },
          { title: "Certificates", count: stats.certificates, icon: <FiAward size={24} /> },
        ].map((stat, i) => (
          <div key={i} className="neo-card p-6 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-zinc-500 font-bold text-sm mb-1">{stat.title}</div>
              <div className="text-4xl font-black">{stat.count}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7] border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)]">{stat.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
  };

  if (isAuthChecking) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] dark:bg-[#121212] text-black dark:text-white font-black text-2xl">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: <FiHome /> },
    { path: "/admin/projects", label: "Projects", icon: <FiFolder /> },
    { path: "/admin/skills", label: "Skills", icon: <FiCode /> },
    { path: "/admin/certificates", label: "Certificates", icon: <FiAward /> },
    { path: "/admin/messages", label: "Messages", icon: <FiMail /> },
    { path: "/admin/comments", label: "Comments", icon: <FiMessageCircle /> },
    { path: "/admin/settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="min-h-screen flex bg-[#fdfdfd] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`flex flex-col fixed lg:static top-0 left-0 h-screen w-64 bg-white dark:bg-[#1e1e1e] border-r-4 border-black dark:border-white z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b-4 border-black dark:border-white flex justify-between items-center shrink-0">
          <h1 className="text-xl font-black uppercase tracking-tight">
            Admin<span className="text-[#a855f7]">Panel</span>.
          </h1>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 border-2 ${location.pathname === item.path || (item.path === "/admin" && location.pathname === "/admin/") ? "bg-[#a855f7] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "border-transparent hover:border-black dark:hover:border-white hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_rgba(255,255,255,1)]"}`}>
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 pb-4">
          <div className="rounded-2xl border-2 border-black dark:border-white p-4 bg-zinc-100 dark:bg-zinc-900 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-bold text-zinc-500 mb-1">ADMIN STATUS</p>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-black text-sm">System Online</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t-4 border-black dark:border-white shrink-0 bg-white dark:bg-[#1e1e1e]">
          <button onClick={() => navigate("/")} className="flex w-full items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
            <FiHome /> View Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b-4 border-black dark:border-white bg-white dark:bg-[#1e1e1e] flex items-center justify-between px-6 shrink-0">
          <button className="lg:hidden p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg border-2 border-black dark:border-white" onClick={() => setIsSidebarOpen(true)}>
            <FiMenu size={20} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors font-bold flex items-center gap-2" title="Logout">
              <FiLogOut /> <span className="hidden sm:inline">Logout</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#a855f7] border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-white">A</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#fdfdfd] dark:bg-[#121212] custom-scrollbar">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/projects" element={<ManageProjects />} />
            <Route path="/skills" element={<ManageSkills />} />
            <Route path="/certificates" element={<ManageCertificates />} />
            <Route path="/messages" element={<ManageMessages />} />
            <Route path="/comments" element={<ManageComments />} />
            <Route path="/settings" element={<ManageSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
