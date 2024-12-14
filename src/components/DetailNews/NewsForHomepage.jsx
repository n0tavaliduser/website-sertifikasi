import React from "react";
import { NewsData } from "@/components/DetailNews/NewsData";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export const BeritaHomepage = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/Berita/${id}`);
  };

  // Only get the first 3 news articles
  const limitedNewsData = NewsData.slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="pb-24">
        <Navbar />
      </div>
      <h1 className="text-center text-4xl font-extrabold text-[#1A2A3D] mb-10">
        Berita Kegiatan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-12">
        {limitedNewsData.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-xl shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 overflow-hidden"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-60 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#333333] mb-4 hover:text-[#102640] transition">
                {news.title}
              </h2>
              <p className="text-gray-600 text-base mb-5">
                {news.description.substring(0, 120)}...
              </p>
              <button
                onClick={() => handleReadMore(news.id)}
                className="bg-[#102640] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#1A2A3D] transition ease-in-out"
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

export default BeritaHomepage;
