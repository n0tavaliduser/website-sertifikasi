import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";
import TUKS from "@/components/TUKS";
export const Tuks = () => {
  return (
    <div>
      <div className="md:container mt-24">
        <Navbar />
        <div>
          <TUKS />
        </div>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};
