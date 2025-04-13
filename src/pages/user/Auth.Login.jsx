import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // Simpan token dan data user di localStorage
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirect berdasarkan role user (jika ada) atau langsung ke admin
      if (data.user && data.user.role === "user") {
        navigate("/");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat login");
      console.error("Login error:", err);
      
      // Fallback ke login statis jika API tidak tersedia (untuk development)
      if (email === "admin@gmail.com" && password === "passwordadmin") {
        localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
        navigate("/admin");
      } else if (email === "user@gmail.com" && password === "passworduser") {
        localStorage.setItem("user", JSON.stringify({ name: "User", role: "user" }));
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-[#8C8C8C] text-2xl font-semibold mb-6">
            Masuk dengan akun anda
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4 relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password Input */}
            <div className="mb-4 relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mb-6">
              <a href="#" className="text-sm hover:underline">
                Lupa kata sandi?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00002F] text-white py-2 rounded-2xl transition flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
