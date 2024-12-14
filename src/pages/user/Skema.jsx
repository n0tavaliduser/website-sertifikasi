import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";
export const Skema = () => {
  return (
    <div>
      <div className="md:container mt-24">
        <Navbar />
        <h1 className="flex justify-center text-red-500 text-5xl">INI SKEMA</h1>
        <img
          src="https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};
