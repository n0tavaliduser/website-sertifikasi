import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaSpinner, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Cek jika sudah login saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        // Hapus data yang rusak
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validasi password konfirmasi
    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak sesuai");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      // Registrasi berhasil
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: ""
      });
      
      // Auto redirect ke halaman login setelah 3 detik
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat registrasi");
      console.error("Register error:", err);
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
            Daftar Akun Baru
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              Registrasi berhasil! Anda akan dialihkan ke halaman login...
            </div>
          )}
          
          <form onSubmit={handleRegister}>
            {/* Nama Input */}
            <div className="mb-4 relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="name"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Email Input */}
            <div className="mb-4 relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="email"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Phone Input */}
            <div className="mb-4 relative">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="phone_number"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Nomor Telepon"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="mb-4 relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="password"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
            </div>
            
            {/* Password Confirmation Input */}
            <div className="mb-6 relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="password_confirmation"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Konfirmasi Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                minLength="8"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00002F] text-white py-2 rounded-2xl transition flex items-center justify-center mb-4"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Memproses...
                </>
              ) : (
                "Daftar"
              )}
            </button>
            
            <div className="text-center text-sm">
              Sudah memiliki akun?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Masuk disini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
