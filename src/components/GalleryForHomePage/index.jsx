import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const GalleryForHomePage = () => {
  const imageUrls = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
  ];

  // Membagi array menjadi 4 grup gambar (masing-masing 3 gambar)
  const chunkedImages = [];
  const chunkSize = 3;

  for (let i = 0; i < imageUrls.length; i += chunkSize) {
    chunkedImages.push(imageUrls.slice(i, i + chunkSize));
  }

  return (
    <section>
      <Navbar />
      <div className="pb-6 pt-24">
        <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">
          Galeri Kegiatan
        </h1>
        <div>
          <h2 className="text-sm md:text-xl lg:text-2xl flex justify-center items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#8f621c"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M5 7h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2" />
                <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
              </g>
            </svg>
            <p>Foto</p>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {chunkedImages.map((group, index) => (
          <div key={index} className="grid gap-4">
            {group.map((url, idx) => (
              <div key={idx}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={url}
                  alt={`Image ${idx}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryForHomePage;
