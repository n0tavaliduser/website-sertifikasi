import Navbar from "@/components/Navbar";
import React from "react";
import { Plus, X } from "lucide-react";
// Image imports
import IMG_20241209_WA0056 from "@/assets/galeri/IMG-20241209-WA0056.jpg";
import IMG_20241214_WA0001 from "@/assets/galeri/IMG-20241214-WA0001.jpg";
import IMG_20241214_WA0002 from "@/assets/galeri/IMG-20241214-WA0002.jpg";
import IMG_20241214_WA0003 from "@/assets/galeri/IMG-20241214-WA0003.jpg";
import IMG_20241214_WA0004 from "@/assets/galeri/IMG-20241214-WA0004.jpg";
import IMG_20241214_WA0005 from "@/assets/galeri/IMG-20241214-WA0005.jpg";
import IMG_20241214_WA0006 from "@/assets/galeri/IMG-20241214-WA0006.jpg";
import IMG_20241214_WA0007 from "@/assets/galeri/IMG-20241214-WA0007.jpg";
import IMG_20241214_WA0008 from "@/assets/galeri/IMG-20241214-WA0008.jpg";
import IMG_20241214_WA0009 from "@/assets/galeri/IMG-20241214-WA0009.jpg";
import IMG_20241214_WA0010 from "@/assets/galeri/IMG-20241214-WA0010.jpg";
import IMG_20241214_WA0011 from "@/assets/galeri/IMG-20241214-WA0011.jpg";
import IMG_20241214_WA0012 from "@/assets/galeri/IMG-20241214-WA0012.jpg";
import SearchBar from "@/components/ui/Search";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AdminGalery = () => {
  const imageUrls = [
    IMG_20241209_WA0056,
    IMG_20241214_WA0001,
    IMG_20241214_WA0002,
    IMG_20241214_WA0003,
    IMG_20241214_WA0004,
    IMG_20241214_WA0005,
    IMG_20241214_WA0006,
    IMG_20241214_WA0007,
    IMG_20241214_WA0008,
    IMG_20241214_WA0009,
    IMG_20241214_WA0010,
    IMG_20241214_WA0011,
    IMG_20241214_WA0012,
  ];
  const handleDelete = (index) => {
    // Fungsi untuk menangani penghapusan gambar
    console.log("Delete image at index:", index);
  };

  // Membagi array menjadi 4 grup gambar (masing-masing 3 gambar)
  const chunkedImages = [];
  const chunkSize = 3;

  for (let i = 0; i < imageUrls.length; i += chunkSize) {
    chunkedImages.push(imageUrls.slice(i, i + chunkSize));
  }

  return (
    <section>
      <div className="pb-6 ">
        <div className="flex items-center justify-end gap-4 py-5">
          <SearchBar />
        </div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Galery</h1>
            <p className="text-sm text-gray-500">
              Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia
            </p>
          </div>
          <button className="bg-[#06113C] mr-12 text-center flex items-center justify-center text-white w-[181px] h-[68px] font-bold rounded-3xl hover:bg-blue-800">
            <Plus /> Tambah Galeri
          </button>
        </div>
      </div>
      <ScrollArea className="h-[600px] p-4">
        {" "}
        {/* Atur tinggi area scroll */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {chunkedImages.map((group, groupIndex) => (
            <div key={groupIndex} className="grid gap-2">
              {group.map((url, idx) => (
                <div key={idx} className="relative m-2">
                  {/* Tombol X */}
                  <button
                    onClick={() => handleDelete(groupIndex * chunkSize + idx)}
                    className="absolute -top-2 -right-2 z-10 border-[1px] border-black bg-none rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X size={16} className="text-black" />
                  </button>
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
      </ScrollArea>
    </section>
  );
};

export default AdminGalery;
