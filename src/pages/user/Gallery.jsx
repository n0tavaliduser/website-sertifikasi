import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/galleries-references`);
        if (response.data.success) {
          setImages(response.data.data);
        } else {
          console.error("Failed to fetch gallery images:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Membagi array menjadi 4 grup gambar
  const chunkedImages = [];
  const chunkSize = 3;

  for (let i = 0; i < images.length; i += chunkSize) {
    chunkedImages.push(images.slice(i, i + chunkSize));
  }

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
            <span className="font-bold">Galeri</span>
          </nav>

          <div className="bg-[#F6F3F3] py-4 shadow-sm">
            <h1 className="text-2xl font-bold">Galeri</h1>
            <p className="text-gray-600 mt-2">Galeri Kegiatan Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
          </div>
        </div>
      </div>
      <div className="pb-6 pt-10">
        <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">Galeri Kegiatan</h1>
        <div>
          <h2 className="text-sm md:text-xl lg:text-2xl flex justify-center items-center gap-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="#8f621c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M5 7h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2" />
                <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
              </g>
            </svg>
            <p>Foto</p>
          </h2>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">Loading gallery images...</div>
      ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mx-2 md:mx-4 lg:container lg:mx-auto">
        {chunkedImages.map((group, index) => (
          <div key={index} className="grid gap-4">
            {group.map((image, idx) => (
              <div key={idx}>
                <img className="h-auto max-w-full rounded-lg" src={image.image_url ? `${import.meta.env.VITE_API_BASE_URL}/${image.image_url}` : "src/assets/placeholder.jpg"} alt={`Image ${idx}`} />
              </div>
            ))}
          </div>
        ))}
        </div>
      )}

      <section>
        <Footer />
      </section>
    </section>
  );
};

export default Gallery;
