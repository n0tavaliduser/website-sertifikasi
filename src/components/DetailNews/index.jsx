import React from "react";
import { useParams } from "react-router-dom";
import { newsData } from "./newsData";
import Navbar from "../Navbar";

const NewsDetail = () => {
  const { id } = useParams(); // Mengambil id dari parameter URL
  const news = newsData.find((item) => item.id === parseInt(id)); // Cari berita berdasarkan id

  // Fungsi untuk mendapatkan dua berita acak selain berita yang sedang ditampilkan
  const getRandomBerita = () => {
    const filteredBerita = newsData.filter((item) => item.id !== parseInt(id)); // Filter berita yang sedang dibaca
    const shuffled = filteredBerita.sort(() => 0.5 - Math.random()); // Acak urutan berita
    return shuffled.slice(0, 2); // Ambil dua berita acak
  };

  const randomBerita = getRandomBerita();

  if (!news) {
    return (
      <div className="text-center text-gray-600 mt-10">
        <h1 className="text-3xl font-bold">Berita Tidak Ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5 ">
      <div className="pb-20">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-5 rounded-lg shadow-lg">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-64 object-cover mb-5 rounded"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{news.title}</h1>
        <p className="text-gray-600">{news.description}</p>
      </div>

      {/* Berita Terkait */}
      <div className="mt-8 container mx-auto">
        <h2 className="text-xl font-semibold mb-4">Berita Terkait</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {randomBerita.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
