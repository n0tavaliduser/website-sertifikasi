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
              to={`/category/${item.title}`}
              key={item.id}
              className="transform transition duration-300 ease-in-out hover:scale-105"
            >
              <CardItem
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                imageUrl={item.imageUrl}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkemaSertifikasiForHomePage;
