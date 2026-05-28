import React, { useState, useEffect } from "react";
import { fetchCollection, addDocument, deleteDocument, uploadFile } from "../../supabase/services";
import { confirmDeleteToast } from "../../utils/toastHelpers";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus, FiUpload } from "react-icons/fi";

function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [credentialUrl, setCredentialUrl] = useState("");

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

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">Manage Certificates</h2>
      
      <div className="neo-card p-6 rounded-xl">
        <h3 className="font-bold mb-4 flex items-center gap-2"><FiPlus /> Tambah Sertifikat</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Judul Sertifikat</label>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Penerbit (Issuer)</label>
            <input type="text" value={issuer} onChange={e=>setIssuer(e.target.value)} required className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">Gambar Sertifikat</label>
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={e=>setImageFile(e.target.files[0])} 
                className="w-full neo-input rounded-lg p-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-2 file:border-black file:text-sm file:font-bold file:bg-[#a855f7] file:text-black hover:file:bg-[#c084fc] transition-all cursor-pointer" 
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1">URL Kredensial (Opsional)</label>
            <input type="text" value={credentialUrl} onChange={e=>setCredentialUrl(e.target.value)} placeholder="https://..." className="w-full neo-input rounded-lg p-2 text-sm font-bold" />
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button type="submit" disabled={isUploading} className={`neo-btn flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isUploading ? "Mengupload..." : <><FiUpload /> Simpan</>}
            </button>
          </div>
        </form>
      </div>

      <div className="neo-card p-6 rounded-xl overflow-x-auto">
        <h3 className="font-bold mb-4">Daftar Sertifikat</h3>
        {isLoading ? <p className="font-bold text-zinc-500">Loading...</p> : certificates.length === 0 ? <p className="font-bold text-zinc-500">Belum ada data sertifikat.</p> : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black dark:border-white">
                <th className="p-3 font-black text-sm">Sertifikat</th>
                <th className="p-3 font-black text-sm">Penerbit</th>
                <th className="p-3 font-black text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) => (
                <tr key={c.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-3 font-bold text-sm flex items-center gap-3">
                    <img src={c.imgSrc} alt="cert" className="w-16 h-10 object-cover border-2 border-black dark:border-white rounded-md" />
                    {c.title}
                  </td>
                  <td className="p-3 text-sm font-bold">{c.issuer}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleDelete(c.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors" title="Hapus">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageCertificates;
