import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Modal from "@/components/Modal";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CardItem = ({ imageUrl, namaTUKS, jenisTUKS, alamat, noTelp, onClick }) => (
  <Card onClick={onClick} className="relative group overflow-hidden shadow-lg rounded-lg bg-white transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
    <CardContent className="relative p-0">
      <img src={imageUrl} alt="Card image" className="w-full h-64 object-cover transition-all duration-300 group-hover:opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-500 bg-opacity-50">
        <div className="text-white text-center">
          <p className="text-sm md:text-lg lg:text-xl font-bold text-[#102640]">{namaTUKS}</p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">{jenisTUKS}</p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">{alamat}</p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">{noTelp}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent text-white py-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-lg font-semibold">{namaTUKS}</p>
    </CardFooter>
  </Card>
);

export const TUKS = () => {
  const [tuksData, setTuksData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchTuksData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tuks-references`);
        if (response.data.success) {
          setTuksData(response.data.data);
        } else {
          console.error("Failed to fetch TUKS data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching TUKS data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTuksData();
  }, []);

  const isTuksPage = location.pathname === "/";
  const displayedCards = isTuksPage ? tuksData.slice(0, 3) : tuksData;

  const openModal = async (card) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tuks/${card.id}/details`);
      if (response.data.success) {
        setSelectedCard(response.data.data);
      } else {
        setSelectedCard(card);
      }
    } catch (error) {
      console.error("Error fetching TUKS details:", error);
      setSelectedCard(card);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center py-20">Loading TUKS data...</div>;
  }

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCards.map((card, index) => (
          <div key={card.id || index}>
            <CardItem 
              imageUrl={card.image_url ? `${import.meta.env.VITE_API_BASE_URL}/${card.image_url}` : "src/assets/placeholder.jpg"}
              namaTUKS={card.name}
              jenisTUKS={card.type}
              alamat={card.address}
              noTelp={card.phone}
              onClick={() => openModal(card)}
            />
            <h1 className="w-full mt-6 bg-[#102640] flex justify-center items-center p-3 rounded-lg text-white">{card.name}</h1>
          </div>
        ))}
      </div>

      {/* Reusable Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="grid place-content-center place-items-start">
          <h1 className="text-black font-bold text-lg">Lihat Detail Uji Kompetensi</h1>
          <p className="text-lg">
            Nama TUKS <span className="ml-4">: {selectedCard?.name}</span>
          </p>
          <p className="text-lg">
            Jenis TUKS <span className="ml-6">: {selectedCard?.type}</span>
          </p>
          <p className="text-lg">
            Alamat<span className="p-14">: {selectedCard?.address}</span>
          </p>
          <p className="text-lg">
            No Telepon <span className="pl-4">: {selectedCard?.phone}</span>
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default TUKS;
