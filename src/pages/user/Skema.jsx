import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardItem from "@/components/SkemaSertifikasi/index";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaSpinner } from "react-icons/fa";

export const Skema = () => {
  const [skemaData, setSkemaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    // Fungsi untuk mengambil data skema dari API
    const fetchSkemaData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/schemas-references`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setSkemaData(result.data);
        } else {
          setError(result.message || "Gagal mendapatkan data skema");
        }
      } catch (err) {
        console.error("Error fetching skema data:", err);
        setError("Terjadi kesalahan saat mengambil data skema");
      } finally {
        setLoading(false);
      }
    };

    fetchSkemaData();
  }, [API_URL]);

  console.log(skemaData);

  return (
    <section>
      <Navbar />
      <div className="bg-[#F6F3F3] flex justify-center items-start mt-20 py-6">
        <div className="lg:container lg:mx-auto mx-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <a href="/" className="hover:underline cursor-pointer">
              Beranda
            </a>
            <span className="mx-2 text-gray-400">›</span>
            <span className="font-bold">Skema</span>
          </nav>

          <div className="bg-[#F6F3F3] py-4 shadow-sm">
            <h1 className="text-2xl font-bold">Skema</h1>
            <p className="text-gray-600 mt-2">Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-10 mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-start place-items-center">
          {skemaData.map((item) => (
            <>
              <Link to={`/category/${item.id}`} key={item.id} className="transform transition duration-300 ease-in-out hover:scale-105">
                <CardItem id={item.id} subtitle={item.type} imageUrl={import.meta.env.VITE_API_BASE_URL + '/' + item.image_url} />
                <h1 className="w-full mt-6 bg-[#102640] flex justify-center items-center p-3 rounded-lg text-white">{item.name}</h1>
              </Link>
            </>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Skema;
