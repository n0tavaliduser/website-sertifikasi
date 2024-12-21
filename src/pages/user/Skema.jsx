import { Link } from "react-router-dom";
import { skemaData } from "@/components/SkemaSertifikasi/SkemaData";
import CardItem from "@/components/SkemaSertifikasi/index";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Skema = () => {
  return (
    <section>
      <Navbar />
      <div className="bg-[#F6F3F3] flex justify-center items-start mt-20 py-6">
        <div className="lg:container lg:mx-auto mx-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-5002">
            <span className="hover:underline cursor-pointer">Beranda</span>
            <span className="mx-2 text-gray-400">›</span>
            <span className="font-bold">Skema</span>
          </nav>

          <div className="bg-[#F6F3F3] py-4 shadow-sm">
            <h1 className="text-2xl font-bold">Skema Sertifikasi</h1>
            <p className="text-gray-600 mt-2">
              Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-10 mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-start place-items-center">
          {skemaData.map((item) => (
            <>
              <Link
                to={`/category/${item.kodeUnit}`}
                key={item.id}
                className="transform transition duration-300 ease-in-out hover:scale-105"
              >
                <CardItem
                  id={item.id}
                  subtitle={item.namaUnitKompetensi}
                  imageUrl={item.imageUrl}
                />
                <h1 className="w-full mt-6 bg-[#102640] flex justify-center items-center p-3 rounded-lg text-white">
                  {item.kodeUnit}
                </h1>
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
