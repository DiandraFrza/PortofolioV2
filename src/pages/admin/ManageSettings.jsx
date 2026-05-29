/** @format */

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";

function ManageSettings() {
  const [projectsPerPage, setProjectsPerPage] = useState(4);

  useEffect(() => {
    const saved = localStorage.getItem("projectsPerPage");
    if (saved) {
      setProjectsPerPage(parseInt(saved));
    }
  }, []);

  const handleSave = () => {
    if (projectsPerPage < 1) {
      toast.error("Minimal 1 project per page!");
      return;
    }
    localStorage.setItem("projectsPerPage", projectsPerPage.toString());
    toast.success("Pengaturan berhasil disimpan!");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-2xl font-black uppercase tracking-tight">Settings</h2>

      <div className="neo-card p-6 rounded-xl space-y-6">
        <div>
          <h3 className="font-bold mb-4 text-lg">Projects Display</h3>
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-4">Atur berapa banyak project yang ditampilkan sebelum tombol "Show More" muncul.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase mb-2">Project Per Page (sebelum Show More)</label>
              <div className="flex items-center gap-4">
                <input type="number" min="1" max="20" value={projectsPerPage} onChange={(e) => setProjectsPerPage(Math.max(1, parseInt(e.target.value) || 1))} className="w-32 neo-input rounded-lg p-3 text-lg font-bold text-center" />
                <div className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{projectsPerPage === 1 ? "1 project" : `${projectsPerPage} projects`} akan ditampilkan pertama kali</div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4 text-sm font-bold text-blue-900 dark:text-blue-200">
              💡 <strong>Tips:</strong> Jika user scroll dan mengklik "Show More", akan menambah {projectsPerPage} project lagi.
            </div>
          </div>
        </div>

        <div className="border-t-2 border-zinc-200 dark:border-zinc-700 pt-6">
          <h3 className="font-bold mb-4 text-lg">About</h3>
          <div className="space-y-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
            <p>
              <strong>Versi:</strong> 1.0
            </p>
            <p>
              <strong>Last Updated:</strong> May 29, 2026
            </p>
            <p>
              <strong>Database:</strong> Supabase
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button onClick={handleSave} className="neo-btn flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold">
            <FiSave /> Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageSettings;
