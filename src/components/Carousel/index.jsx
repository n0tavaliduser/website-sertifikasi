import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaSpinner } from "react-icons/fa";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 364 },
    items: 2,
    slidesToSlide: 1,
  },
};

const Slider = () => {
  const [partnershipData, setPartnershipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    // Fungsi untuk mengambil data partnership dari API
    const fetchPartnershipData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/partnerships-references`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setPartnershipData(result.data);
        } else {
          setError(result.message || "Gagal mendapatkan data partnership");
          // Jika tidak ada data, tetap tampilkan UI kosong
          setPartnershipData([]);
        }
      } catch (err) {
        console.error("Error fetching partnership data:", err);
        setError("Terjadi kesalahan saat mengambil data partnership");
        // Jika error, tetap tampilkan UI kosong
        setPartnershipData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnershipData();
  }, [API_URL]);

  // Menampilkan loading spinner selama data dimuat
  if (loading) {
    return (
      <div className="lg:parent lg:container mx-auto flex justify-center items-center py-10">
        <FaSpinner className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  }

  // Jika tidak ada data partnership, tampilkan pesan
  if (partnershipData.length === 0) {
    return (
      <div className="lg:parent lg:container mx-auto text-center py-10">
        <p className="text-gray-500">Tidak ada data partnership tersedia saat ini.</p>
      </div>
    );
  }

  return (
    <div className="lg:parent lg:container mx-auto">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1000}
        transitionDuration={1000}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
        arrows={false}
        dotListClass="custom-dot-list-style"
      >
        {partnershipData.map((partner, index) => (
          <div className="slider" key={partner.id || index}>
            <img
              src={import.meta.env.VITE_API_BASE_URL + '/' + partner.image_url || 'src/assets/placeholder.jpg'}
              alt={partner.name || `Partnership ${index + 1}`}
              className="w-full h-auto object-cover"
              style={{
                width: "100%",
                height: "auto",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'src/assets/placeholder.jpg';
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
