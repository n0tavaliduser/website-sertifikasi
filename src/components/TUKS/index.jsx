import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Modal from "@/components/Modal"; // Reusable Modal Component

const CardItem = ({
  imageUrl,
  namaTUKS,
  jenisTUKS,
  alamat,
  noTelp,
  onClick,
}) => (
  <Card
    onClick={onClick} // Trigger the modal open event
    className="relative group overflow-hidden shadow-lg rounded-lg bg-white transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
  >
    <CardContent className="relative p-0">
      <img
        src={imageUrl}
        alt="Card image"
        className="w-full h-64 object-cover transition-all duration-300 group-hover:opacity-60"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-500 bg-opacity-50">
        <div className="text-white text-center">
          <p className="text-sm md:text-lg lg:text-xl font-bold text-[#102640]">
            {namaTUKS}
          </p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">
            {jenisTUKS}
          </p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">
            {alamat}
          </p>
          <p className="text-sm md:text-lg lg:text-xl font-bold mt-2">
            {noTelp}
          </p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent text-white py-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-lg font-semibold">{namaTUKS}</p>
    </CardFooter>
  </Card>
);

export const TUKS = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardData = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      namaTUKS: "Politeknik Negeri Pontianak",
      jenisTUKS: "Sewaktu",
      alamat: "Kota Pontianak Kalimantan Barat",
      noTelp: "0823154892348",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      namaTUKS: "Politeknik Negeri Jakarta",
      jenisTUKS: "Sewaktu",
      alamat: "Kota Jakarta Kalimantan Barat",
      noTelp: "0823154892348",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1733992030462-7585b182f98b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      namaTUKS: "Politeknik Negeri Bandung",
      jenisTUKS: "Sewaktu",
      alamat: "Kota Bandung Kalimantan Barat",
      noTelp: "0823154892348",
    },
  ];

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <div key={index}>
            <CardItem
              imageUrl={card.imageUrl}
              namaTUKS={card.namaTUKS}
              alamat={card.alamat}
              onClick={() => openModal(card)}
            />
          </div>
        ))}
      </div>

      {/* Reusable Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedCard?.footerText}
        footer={
          <button
            onClick={closeModal}
            className="text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2"
          >
            Close
          </button>
        }
      >
        <p className="text-gray-700 text-lg">{selectedCard?.namaTUKS}</p>
        <p className="text-gray-700 text-lg">{selectedCard?.jenisTUKS}</p>
        <p className="text-gray-700 text-lg">{selectedCard?.alamat}</p>
        <p className="text-gray-700 text-lg">{selectedCard?.noTelp}</p>
      </Modal>
    </section>
  );
};

export default TUKS;
