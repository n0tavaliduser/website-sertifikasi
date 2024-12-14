import React from "react";
import { newsData } from "@/components/DetailNews/NewsData";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export const Berita = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/berita/${id}`);
  };

  return (
    <div className="min-h-screen container mx-auto">
      <div className="pb-24">
        <Navbar />
      </div>
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Berita Kegiatan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                {news.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {news.description.substring(0, 100)}...
              </p>
              <button
                onClick={() => handleReadMore(news.id)}
                className="bg-[#102640] text-white px-4 py-2 rounded hover:bg-slate-950 transition"
              >
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
