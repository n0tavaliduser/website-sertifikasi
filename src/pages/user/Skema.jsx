import { Link } from "react-router-dom";
import { skemaData } from "@/components/SkemaSertifikasi/SkemaData";
import CardItem from "@/components/SkemaSertifikasi/index";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Skema = () => {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto pb-10 mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-start place-items-center">
          {skemaData.map((item) => (
            <>
            <Link
              to={`/category/${item.title}`}
              key={item.id}
              className="transform transition duration-300 ease-in-out hover:scale-105"
              >
              <CardItem
                id={item.id}
                subtitle={item.subtitle}
                imageUrl={item.imageUrl}
                />
            <h1 className="w-full mt-6 bg-[#102640] flex justify-center items-center p-3 rounded-lg text-white">{item.title}</h1>
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
