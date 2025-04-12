import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import IG from "@/assets/Icon/IG.png";
import whatsapp from "@/assets/Icon/whatsapp.png";
import email from "@/assets/Icon/email.png";

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

    // Create the mailto link
    const mailtoLink = `mailto:lsp.ap.indonesia57@gamil.com?subject=Pesan dari ${formData.name}&body=Nama: ${formData.name}%0ANo Hp: ${formData.phone}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;

    // Redirect to mailto link
    window.location.href = mailtoLink;

    // Clear form data
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="bg-[#F6F3F3] flex justify-center items-start mt-20 py-6">
          <div className="lg:container lg:mx-auto mx-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <a href="/" className="hover:underline cursor-pointer">
                Beranda
              </a>
              <span className="mx-2 text-gray-400">›</span>
              <span className="font-bold">Kontak</span>
            </nav>

            <div className="bg-[#F6F3F3] py-4 shadow-sm">
              <h1 className="text-2xl font-bold">Kontak</h1>
              <p className="text-gray-600 mt-2">Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative rounded-md w-full max-w-md">
          {/* Form */}
          <h1 className="text-2xl font-bold text-center mb-6">Hubungi</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Nama" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950" />
            <input type="text" name="phone" placeholder="No Hp" value={formData.phone} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950" />
            <textarea
              name="message"
              rows="5"
              placeholder="Tambahkan Pesan..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slatebg-slate-950"
            ></textarea>
            <div className="flex justify-center items-center">
              <Button type="submit" className="bg-[#102640] text-white py-3 px-5 rounded-md hover:bg-slate-950">
                Kirim
              </Button>
            </div>
          </form>

          {/* Icons */}
          <div className="absolute top-1/2 right-[-5rem] transform -translate-y-1/2 flex flex-col space-y-2">
            {/* WhatsApp Icon */}
            <a href="https://wa.me/6282220787857" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
              <img src={whatsapp} alt="WhatsApp" className="w-6 h-6" />
            </a>
            {/* Instagram Icon */}
            <a href="https://instagram.com/lsp_api_p3" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
              <img src={IG} alt="Instagram" className="w-6 h-6" />
            </a>
            {/* Email Icon */}
            <a href="mailto:lsp.ap.indonesia57@gamil.com" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
              <img src={email} alt="Email" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Kontak;
