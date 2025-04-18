import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        // Fetch news detail by slug
        const response = await fetch(`${API_URL}/news-reference/${slug}`, {
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
          
          // Fetch related news after getting the current news
          fetchRelatedNews(result.data.id);
        } else {
          setError(result.message || "Berita tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError("Terjadi kesalahan saat mengambil detail berita");
      }
    };

    const fetchRelatedNews = async (currentNewsId) => {
      try {
        // Fetch all news to filter out related ones
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
          // Filter out current news and get random 3
          const filtered = result.data.filter(item => item.id !== currentNewsId);
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          setRelatedNews(shuffled.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching related news:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNewsDetail();
    }
  }, [slug, API_URL]);

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Handle related news click
  const handleReadMore = (newsSlug) => {
    navigate(`/berita/${newsSlug}`);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-5">
        <div className="pb-20">
          <Navbar />
        </div>
        <div className="text-center text-gray-600 mt-10">
          <h1 className="text-3xl font-bold">Berita Tidak Ditemukan</h1>
          <p className="mt-4">{error || "Berita yang Anda cari tidak tersedia"}</p>
          <button 
            onClick={() => navigate('/berita')}
            className="mt-6 bg-[#102640] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#1A2A3D] transition ease-in-out"
          >
            Kembali ke Halaman Berita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="pb-20">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Image */}
        {news.image_url ? (
          <img
            src={`${API_BASE_URL}/${news.image_url}`}
            alt={news.title}
            className="w-full h-64 object-cover mb-5 rounded-lg shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/placeholder.jpg';
            }}
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg shadow-md mb-5">
            <span className="text-gray-400">Tidak ada gambar</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{news.title}</h1>

        {/* Date and Time */}
        <p className="text-sm text-gray-500 mb-4">
          Posted on {formatDate(news.created_at)}
        </p>

        {/* Author Info if available */}
        {news.author && (
          <div className="flex items-center mb-5">
            <div className="w-12 h-12 rounded-full mr-3 bg-gray-300 flex items-center justify-center text-gray-600">
              {news.author.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm text-gray-600">Oleh: {news.author}</p>
          </div>
        )}

        {/* Content */}
        <div className="text-lg text-gray-700 mb-8 prose max-w-none" dangerouslySetInnerHTML={{ __html: news.description }}></div>
      </div>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <div className="mt-12 container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Berita Terkait
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleReadMore(item.slug)}
              >
                {item.image_url ? (
                  <img
                    src={`${API_BASE_URL}/${item.image_url}`}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg">
                    <span className="text-gray-400">Tidak ada gambar</span>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  {/* Truncate description and remove HTML tags */}
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.description.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                  </p>
                </div>
                <div className="px-5 pb-4">
                  <p className="text-xs text-gray-500">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
