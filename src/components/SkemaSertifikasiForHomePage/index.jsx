import { skemaData } from "@/components/SkemaSertifikasi/SkemaData";
import { Link } from "react-router-dom";
import CardItem from "@/components/SkemaSertifikasi/index";
export const SkemaSertifikasiForHomePage = () => {
  return (
    <section>
      <div className="pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-start place-items-center">
          {skemaData.map((item) => (
            <Link
              to={`/category/${item.kodeUnit}`}
              key={item.id}
              className="transform transition duration-300 ease-in-out hover:scale-105"
            >
              <CardItem
                id={item.id}
                imageUrl={item.imageUrl}
                subtitle={item.namaUnitKompetensi}
              />
              <h1 className="w-full mt-6 bg-[#102640] flex justify-center items-center p-3 rounded-lg text-white">
                {item.kodeUnit}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkemaSertifikasiForHomePage;
