import Navbar from "@/components/Navbar";
import React, { useState } from "react";

export const Kontak = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Pesan berhasil dikirim!");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="relative shadow-lg rounded-md w-full max-w-md">
        {/* Form */}
        <h1 className="text-2xl font-bold text-center mb-6">Hubungi</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950"
          />
          <input
            type="text"
            name="phone"
            placeholder="No Hp"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Tambahkan Pesan..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#102640] text-white py-3 rounded-md hover:bg-slate-950"
          >
            Kirim
          </button>
        </form>

        {/* Icons */}
        <div className="absolute top-1/2 right-[-5rem] transform -translate-y-1/2 flex flex-col space-y-2">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-slate-950"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-slate-950"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
          <a
            href="mailto:example@example.com"
            className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-slate-950"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              alt="Email"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
