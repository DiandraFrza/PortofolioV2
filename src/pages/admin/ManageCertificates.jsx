/** @format */

import React, { useState, useEffect } from "react";
import { fetchCollection, addDocument, deleteDocument, uploadFile, updateDocument } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus, FiUpload, FiEdit2, FiCheck, FiX } from "react-icons/fi";

function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [credentialUrl, setCredentialUrl] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editIssuer, setEditIssuer] = useState("");
  const [editCredentialUrl, setEditCredentialUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);

  const loadCerts = async () => {
    setIsLoading(true);
    const data = await fetchCollection("certificates");
    setCertificates(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCerts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !issuer) return;

    setIsUploading(true);
    let finalImgSrc = "https://placehold.co/600x400/1e1e1e/FFF?text=Certificate";

    if (imageFile) {
      const uploadRes = await uploadFile("certificates", imageFile);
      if (uploadRes.success) {
        finalImgSrc = uploadRes.url;
      } else {
        toast.error("Gagal mengupload gambar: " + (uploadRes.error?.message || JSON.stringify(uploadRes.error)));
        setIsUploading(false);
        return;
      }
    }

    const addRes = await addDocument("certificates", {
      title,
      issuer,
      credentialUrl,
      imgSrc: finalImgSrc,
    });

    if (addRes.success) {
      toast.success("Sertifikat berhasil ditambahkan!");
      setTitle("");
      setIssuer("");
      setCredentialUrl("");
      setImageFile(null);
    } else {
      toast.error("Gagal menambahkan sertifikat!");
    }

    setIsUploading(false);
    loadCerts();
  };

  const handleDelete = (id) => {
    confirmDeleteToast(async () => {
      const res = await deleteDocument("certificates", id);
      if (res.success) {
        toast.success("Sertifikat berhasil dihapus!");
        loadCerts();
      } else {
        toast.error("Gagal menghapus sertifikat!");
      }
    });
  };

  const startEdit = (cert) => {
    setEditingId(cert.id);
    setEditTitle(cert.title);
    setEditIssuer(cert.issuer);
    setEditCredentialUrl(cert.credentialUrl);
    setEditImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditIssuer("");
    setEditCredentialUrl("");
    setEditImageFile(null);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim() || !editIssuer.trim()) {
      toast.error("Judul dan penerbit tidak boleh kosong!");
      return;
    }

    let imgSrcToUse = certificates.find((c) => c.id === id)?.imgSrc || "https://placehold.co/600x400/1e1e1e/FFF?text=Certificate";

    if (editImageFile) {
      const uploadRes = await uploadFile("certificates", editImageFile);
      if (uploadRes.success) {
        imgSrcToUse = uploadRes.url;
      } else {
        toast.error("Gagal mengupload gambar: " + (uploadRes.error?.message || JSON.stringify(uploadRes.error)));
        return;
      }
    }

    const updateRes = await updateDocument("certificates", id, {
      title: editTitle,
      issuer: editIssuer,
      credentialUrl: editCredentialUrl,
      imgSrc: imgSrcToUse,
    });

    if (updateRes.success) {
      toast.success("Sertifikat berhasil diupdate!");
      cancelEdit();
      loadCerts();
    } else {
      toast.error("Gagal mengupdate sertifikat!");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">Manage Certificates</h2>

      <div className="neo-card p-6 rounded-xl">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <FiPlus /> Tambah Sertifikat
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Judul Sertifikat</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Penerbit (Issuer)</label>
            <input type="text" value={issuer} onChange={(e) => setIssuer(e.target.value)} required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Gambar Sertifikat</label>
            <div className="relative">
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full neo-input rounded-lg p-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-2 file:border-black file:text-sm file:font-bold file:bg-[#a855f7] file:text-black hover:file:bg-[#c084fc] transition-all cursor-pointer" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">URL Kredensial (Opsional)</label>
            <input type="text" value={credentialUrl} onChange={(e) => setCredentialUrl(e.target.value)} placeholder="https://..." className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button type="submit" disabled={isUploading} className={`neo-btn flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
              {isUploading ? (
                "Mengupload..."
              ) : (
                <>
                  <FiUpload /> Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="neo-card p-6 rounded-xl overflow-x-auto">
        <h3 className="font-bold mb-4">Daftar Sertifikat</h3>
        {isLoading ? (
          <p className="font-bold text-zinc-500">Loading...</p>
        ) : certificates.length === 0 ? (
          <p className="font-bold text-zinc-500">Belum ada data sertifikat.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black dark:border-white">
                <th className="p-3 font-black text-sm">Sertifikat</th>
                <th className="p-3 font-black text-sm">Penerbit</th>
                <th className="p-3 font-black text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) =>
                editingId === c.id ? (
                  <tr key={c.id} className="border-b border-zinc-200 dark:border-zinc-800 bg-blue-50 dark:bg-blue-900/20">
                    <td colSpan="3" className="p-3">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-black uppercase mb-1">Judul</label>
                            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase mb-1">Penerbit</label>
                            <input type="text" value={editIssuer} onChange={(e) => setEditIssuer(e.target.value)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-black uppercase mb-1">URL Kredensial (Opsional)</label>
                            <input type="text" value={editCredentialUrl} onChange={(e) => setEditCredentialUrl(e.target.value)} className="w-full neo-input rounded p-1.5 text-xs font-bold" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-black uppercase mb-1">Gambar (Opsional)</label>
                            <input type="file" accept="image/*" onChange={(e) => setEditImageFile(e.target.files[0])} className="w-full neo-input rounded p-1.5 text-xs file:mr-4 file:py-1 file:px-2 file:rounded file:border-2 file:border-black file:text-[10px] file:font-bold file:bg-[#a855f7] file:text-black" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <button onClick={() => saveEdit(c.id)} className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded" title="Simpan">
                            <FiCheck size={16} />
                          </button>
                          <button onClick={cancelEdit} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded" title="Batal">
                            <FiX size={16} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={c.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="p-3 font-bold text-sm flex items-center gap-3">
                      <img src={c.imgSrc} alt="cert" className="w-16 h-10 object-cover border-2 border-black dark:border-white rounded-md" />
                      {c.title}
                    </td>
                    <td className="p-3 text-sm font-bold">{c.issuer}</td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => startEdit(c)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded" title="Edit">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded" title="Hapus">
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageCertificates;
