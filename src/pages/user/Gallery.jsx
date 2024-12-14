import Navbar from "@/components/Navbar";
import React, { useState } from "react";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 5",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 1",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 2",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 3",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 4",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 5",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 5",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 5",
  },
];

export const Gallery = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="p-5 min-h-screen">
      <div className="pb-20">
        <Navbar />
      </div>
      <h1 className="text-center text-2xl font-bold mb-5">Galeri Kegiatan</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="cursor-pointer rounded-lg shadow-md hover:shadow-lg transition duration-300"
            onClick={() => openModal(image)}
          />
        ))}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden max-w-3xl mx-auto"
            onClick={(e) => e.stopPropagation()} // Mencegah close saat modal diklik
          >
            <button
              className="absolute top-3 right-3 text-white bg-red-500 rounded-full p-2 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
