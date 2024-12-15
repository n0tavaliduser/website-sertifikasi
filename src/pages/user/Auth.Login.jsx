import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons

export const Login = () => {
  return (
    <section>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-[#8C8C8C] text-2xl font-semibold mb-6">
            Masuk dengan akun anda
          </h2>
          <form>
            {/* Email Input */}
            <div className="mb-4 relative">
              <FaEnvelope className="absolute left-3 top-3" />
              <input
                type="email"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Email"
              />
            </div>
            {/* Password Input */}
            <div className="mb-4 relative">
              <FaLock className="absolute left-3 top-3" />
              <input
                type="password"
                className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-end mb-6">
              <a href="#" className="text-sm hover:underline">
                Lupa kata sandi?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00002F] text-white py-2 rounded-2xl transition"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
