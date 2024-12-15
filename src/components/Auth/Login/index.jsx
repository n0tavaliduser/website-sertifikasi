import React from "react";

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Masuk dengan akun anda
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">
              Nama pengguna atau email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Nama pengguna atau email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Kata sandi</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Kata sandi"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Lupa kata sandi?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
