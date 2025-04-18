import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export const Berita = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/news-references`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setNews(result.data);
        } else {
          setError(result.message || "Gagal mendapatkan data berita");
        }
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError("Terjadi kesalahan saat mengambil data berita");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_URL]);

  const handleReadMore = (slug) => {
    navigate(`/berita/${slug}`);
  };

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Truncate text dengan jumlah karakter tertentu
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    // Menghapus tag HTML
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substr(0, maxLength) + '...';
  };

  // Filter berita berdasarkan pencarian jika ada input search
  const filteredNews = news.filter(item => 
    !searchQuery || 
    (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
      
      <div className="px-6 md:px-12 mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cari berita..."
            className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102640]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-center text-4xl font-extrabold text-[#1A2A3D] mb-10">Berita Kegiatan</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1A2A3D]"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4">
          {error}
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          {searchQuery ? "Tidak ada berita yang sesuai dengan pencarian Anda." : "Belum ada berita yang tersedia."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-12">
          {filteredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 overflow-hidden">
              <div className="h-60 overflow-hidden">
                {news.image_url ? (
                  <img 
                    src={`${API_BASE_URL}/${news.image_url}`} 
                    alt={news.title} 
                    className="w-full h-60 object-cover rounded-t-xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-60 flex items-center justify-center bg-gray-200 rounded-t-xl">
                    <span className="text-gray-400">Tidak ada gambar</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <p className="text-xs text-gray-500">
                    {formatDate(news.created_at)}
                  </p>
                </div>
                <h2 className="text-xl font-semibold text-[#333333] mb-4 hover:text-[#102640] transition line-clamp-2">{news.title}</h2>
                <p className="text-gray-600 text-base mb-5">{truncateText(news.description, 120)}</p>
                <button onClick={() => handleReadMore(news.slug)} className="bg-[#102640] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#1A2A3D] transition ease-in-out">
                  Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Berita;
