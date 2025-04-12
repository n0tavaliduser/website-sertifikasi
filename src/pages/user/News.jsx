import React from "react";
import { NewsData } from "@/components/DetailNews/NewsData";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export const Berita = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/Berita/${id}`);
  };

  return (
    <div className="min-h-screen">
      <div className="pb-24">
        <Navbar />
        <div className="bg-[#F6F3F3] flex justify-center items-start mt-20 py-6">
          <div className="lg:container lg:mx-auto mx-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <a href="/" className="hover:underline cursor-pointer">
                Beranda
              </a>
              <span className="mx-2 text-gray-400">›</span>
              <span className="font-bold">Berita</span>
            </nav>

            <div className="bg-[#F6F3F3] py-4 shadow-sm">
              <h1 className="text-2xl font-bold">Berita</h1>
              <p className="text-gray-600 mt-2">Berita Kegiatan Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center text-4xl font-extrabold text-[#1A2A3D] mb-10">Berita Kegiatan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-12">
        {NewsData.map((news) => (
          <div key={news.id} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 overflow-hidden">
            <img src={news.image} alt={news.title} className="w-full h-60 object-cover rounded-t-xl" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#333333] mb-4 hover:text-[#102640] transition">{news.title}</h2>
              <p className="text-gray-600 text-base mb-5">{news.description.substring(0, 120)}...</p>
              <button onClick={() => handleReadMore(news.id)} className="bg-[#102640] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#1A2A3D] transition ease-in-out">
                Selengkapnya
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Berita;
