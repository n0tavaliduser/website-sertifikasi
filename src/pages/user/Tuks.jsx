import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";
import TUKS from "@/components/TUKS";
export const Tuks = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div className="bg-[#F6F3F3] flex justify-center items-start mt-20 py-6">
          <div className="lg:container lg:mx-auto mx-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <a href="/" className="hover:underline cursor-pointer">
                Beranda
              </a>
              <span className="mx-2 text-gray-400">›</span>
              <span className="font-bold">TUKS</span>
            </nav>

            <div className="bg-[#F6F3F3] py-4 shadow-sm">
              <h1 className="text-2xl font-bold">Tempat Uji Kompetensi Sewaktu (TUKS)</h1>
              <p className="text-gray-600 mt-2">Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
            </div>
          </div>
        </div>
        <div className="lg:container lg:mx-auto mx-4">
          <TUKS />
        </div>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};
