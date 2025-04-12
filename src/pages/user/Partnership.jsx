import Slider from "@/components/Carousel";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
export const Partnership = () => {
  return (
    <div>
      <div className="md:container mt-24">
        <Navbar />
        <div className="bg-[#F6F3F3] flex justify-center items-start mt-20 py-6">
          <div className="lg:container lg:mx-auto mx-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <a href="/" className="hover:underline cursor-pointer">
                Beranda
              </a>
              <span className="mx-2 text-gray-400">›</span>
              <span className="font-bold">Partnership</span>
            </nav>

            <div className="bg-[#F6F3F3] py-4 shadow-sm">
              <h1 className="text-2xl font-bold">Partnership</h1>
              <p className="text-gray-600 mt-2">Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
            </div>
          </div>
        </div>
        <section className="py-12">
          <div className="container mx-auto">
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">Partnership</h1>
            <h2 className="text-sm md:text-xl lg:text-2xl text-center font-semibold">Instansi yang bekerja sama dengan LSP AP-I</h2>
          </div>
          <div>
            <Slider />
          </div>
        </section>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};
