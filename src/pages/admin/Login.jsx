import React, { useState } from "react";
import { loginAdmin } from "../../supabase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await loginAdmin(email, password);
    
    if (!result.success) {
      if (result.error && result.error.includes("URL is required")) {
        setError("Supabase belum diatur! Silakan isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env");
      } else {
        setError(result.error || "Email atau Password salah!");
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] dark:bg-[#121212] p-4 text-black dark:text-white transition-colors duration-300">
      <div className="neo-card p-8 rounded-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight">Admin<span className="text-[#a855f7]">Panel</span>.</h1>
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mt-2">Login untuk mengelola portofolio</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-bold mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-black uppercase mb-1.5">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com" 
              required 
              className="w-full rounded-xl neo-input p-3 text-sm font-bold" 
            />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              className="w-full rounded-xl neo-input p-3 text-sm font-bold" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full neo-btn py-3.5 rounded-xl text-sm font-black uppercase tracking-wider mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
