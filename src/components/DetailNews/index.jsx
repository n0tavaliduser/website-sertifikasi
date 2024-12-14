import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar";
import { NewsData } from "./NewsData";

const NewsDetail = () => {
  const { id } = useParams();
  const news = NewsData.find((item) => item.id === parseInt(id));

  // Function to get 3 random related news
  const getRandomBerita = () => {
    const filteredBerita = NewsData.filter((item) => item.id !== parseInt(id));
    const shuffled = filteredBerita.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
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
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="pb-20">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Image */}
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-64 object-cover mb-5 rounded-lg shadow-md"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{news.title}</h1>

        {/* Date and Time */}
        <p className="text-sm text-gray-500 mb-4">
          Posted on {new Date().toLocaleString()}
        </p>

        {/* Penulis Info */}
        <div className="flex items-center mb-5">
          <img
            src={news.authorImage}
            alt={news.author}
            className="w-12 h-12 rounded-full mr-3"
          />
          <p className="text-sm text-gray-600">Oleh: {news.author}</p>
        </div>

        {/* Content */}
        <div className="text-lg text-gray-700 mb-8">
          <p>{news.description}</p>
        </div>
      </div>

      {/* Related News Section */}
      <div className="mt-12 container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Berita Terkait
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomBerita.map((item) => (
            <Link
              key={item.id}
              to={`/Berita/${item.id}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                {/* Truncate description to 3 lines */}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center mb-5 pl-3">
                <img
                  src={news.authorImage}
                  alt={news.author}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <p className="text-sm text-gray-600">Oleh: {news.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
