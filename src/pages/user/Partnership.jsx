import Slider from "@/components/Carousel";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
export const Partnership = () => {
  return (
    <div>
      <div className="md:container mt-24">
        <Navbar />
        <section className="py-12">
          <div className="container mx-auto">
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">
              Partnership
            </h1>
            <h2 className="text-sm md:text-xl lg:text-2xl text-center font-semibold">
              Instansi yang bekerja sama dengan LSP AP-I
            </h2>
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
