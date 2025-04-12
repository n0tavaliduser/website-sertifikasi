import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import IG from "@/assets/Icon/IG.png";
import whatsapp from "@/assets/Icon/whatsapp.png";
import email from "@/assets/Icon/email.png";

export const KontakForHomePage = () => {
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
    <div>
      <div>
        <Navbar />
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
              <Button type="submit" className=" bg-[#102640] text-white py-3 px-5 rounded-md hover:bg-slate-950">
                Kirim
              </Button>
            </div>
          </form>

          {/* Icons */}
          <div className="absolute top-1/2 right-[-5rem] transform -translate-y-1/2 flex flex-col space-y-2">
            <a href="https://wa.me/6282220787857" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
              <img src={whatsapp} alt="WhatsApp" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/lsp_api_p3" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
              <img src={IG} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="mailto:lsp.api.indonesia57@gmail.com" className="flex items-center justify-center w-12 h-12 bg-[#102640] text-white rounded-full hover:bg-[#EB8317]">
              <img src={email} alt="Email" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontakForHomePage;
