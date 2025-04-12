import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Modal from "@/components/Modal";
import { useLocation } from "react-router-dom";

// Import images
import BPKH from "@/assets/TUKS/BPKH.jpg";
import P2KPTK2JAKARTA from "@/assets/TUKS/P2KPTK2JAKARTA.jpeg";
import Balai_Besar_Keramik from "@/assets/TUKS/Balai Besar Keramik.jpeg";
import Piksi_Megatama_Bandung from "@/assets/TUKS/Piksi Megatama Bandung.jpeg";
import Bexpert_Indoprima from "@/assets/TUKS/Bexpert Indoprima.png";
import Politeknik_Negeri_Pontianak from "@/assets/TUKS/Politeknik Negeri Pontianak.jpg";
import California_Hotel_Bandung from "@/assets/TUKS/California Hotel Bandung.jpg";
import SMKN_1_TASIK from "@/assets/TUKS/SMKN 1 TASIK.jpg";
import Graha_Kadin_Bandung from "@/assets/TUKS/Graha Kadin Bandung.jpg";
import SMKS_PGRI_31_Legok from "@/assets/TUKS/SMKS PGRI 31 Legok Kab. Tangerang.webp";
import Grand_Tebu_Hotel_Bandung from "@/assets/TUKS/Grand Tebu Hotel Bandung.webp";
import ST3_Bandung from "@/assets/TUKS/ST3 Bandung.jpg";
import Hotel_Cordela from "@/assets/TUKS/Hotel Cordela.jpeg";
import STIE_Ekuitas_Bandung from "@/assets/TUKS/STIE Ekuitas Bandung.jpg";
import IDE_LPKIA from "@/assets/TUKS/IDE LPKIA.jpg";
import Setwan_jabar from "@/assets/TUKS/Setwan jabar.jpg";
import LPK_Pelita_Cahaya_Bangsa from "@/assets/TUKS/LPK Pelita Cahaya Bangsa.png";
import TIRTA_GANGGA from "@/assets/TUKS/TIRTA GANGGA.jpg";

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
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // Get current location

  const cardData = [
    {
      imageUrl: BPKH,
      namaTUKS: "BPKH",
      jenisTUKS: "Sewaktu",
      alamat: "Jakarta, Indonesia",
      noTelp: "7272580",
    },
    {
      imageUrl: P2KPTK2JAKARTA,
      namaTUKS: "P2KPTK2 Jakarta",
      jenisTUKS: "Sewaktu",
      alamat: "Jakarta, Indonesia",
      noTelp: "021-8611975",
    },
    {
      imageUrl: Balai_Besar_Keramik,
      namaTUKS: "Balai Besar Keramik",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "(022) 7206221",
    },
    {
      imageUrl: Piksi_Megatama_Bandung,
      namaTUKS: "Piksi Megatama Bandung",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "089648303005",
    },
    {
      imageUrl: Bexpert_Indoprima,
      namaTUKS: "Bexpert Indoprima",
      jenisTUKS: "Sewaktu",
      alamat: "Jakarta, Indonesia",
      noTelp: "0274-419936",
    },
    {
      imageUrl: Politeknik_Negeri_Pontianak,
      namaTUKS: "Politeknik Negeri Pontianak",
      jenisTUKS: "Sewaktu",
      alamat: "Pontianak, Kalimantan Barat",
      noTelp: "0561-736180",
    },
    {
      imageUrl: California_Hotel_Bandung,
      namaTUKS: "California Hotel Bandung",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "(022)4268588",
    },
    {
      imageUrl: SMKN_1_TASIK,
      namaTUKS: "SMKN 1 TASIK",
      jenisTUKS: "Sewaktu",
      alamat: "Tasikmalaya, Indonesia",
      noTelp: "0265 - 331359",
    },
    {
      imageUrl: Graha_Kadin_Bandung,
      namaTUKS: "Graha Kadin Bandung",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "022-7300703",
    },
    {
      imageUrl: SMKS_PGRI_31_Legok,
      namaTUKS: "SMKS PGRI 31 Legok Kab. Tangerang",
      jenisTUKS: "Sewaktu",
      alamat: "Tangerang, Indonesia",
      noTelp: "02154211623",
    },
    {
      imageUrl: Grand_Tebu_Hotel_Bandung,
      namaTUKS: "Grand Tebu Hotel Bandung",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "(022)20521000",
    },
    {
      imageUrl: ST3_Bandung,
      namaTUKS: "ST3 Bandung",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "7272580",
    },
    {
      imageUrl: Hotel_Cordela,
      namaTUKS: "Hotel Cordela",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "(0274) 5304222",
    },
    {
      imageUrl: STIE_Ekuitas_Bandung,
      namaTUKS: "STIE Ekuitas Bandung",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "(022) 7276323",
    },
    {
      imageUrl: IDE_LPKIA,
      namaTUKS: "IDE LPKIA",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "0812-2090-7680",
    },
    {
      imageUrl: Setwan_jabar,
      namaTUKS: "Setwan Jabar",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "(022) 87831045",
    },
    {
      imageUrl: LPK_Pelita_Cahaya_Bangsa,
      namaTUKS: "LPK Pelita Cahaya Bangsa",
      jenisTUKS: "Sewaktu",
      alamat: "Bandung, Indonesia",
      noTelp: "081380222192",
    },
    {
      imageUrl: TIRTA_GANGGA,
      namaTUKS: "TIRTA GANGGA",
      jenisTUKS: "Sewaktu",
      alamat: "Bali, Indonesia",
      noTelp: "0262-232549",
    },
  ];

  const isTuksPage = location.pathname === "/";
  const displayedCards = isTuksPage ? cardData.slice(0, 3) : cardData;

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
        {displayedCards.map((card, index) => (
          <div key={index}>
            <CardItem imageUrl={card.imageUrl} alamat={card.alamat} onClick={() => openModal(card)} />
            <h1 className="w-full mt-6 bg-[#102640] flex justify-center items-center p-3 rounded-lg text-white">{card.namaTUKS}</h1>
          </div>
        ))}
      </div>

      {/* Reusable Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="grid place-content-center place-items-start">
          <h1 className="text-black font-bold text-lg">Lihat Detail Uji Kompetensi</h1>
          <p className="text-lg">
            Nama TUKS <span className="ml-4">: {selectedCard?.namaTUKS}</span>
          </p>
          <p className="text-lg">
            Jenis TUKS <span className="ml-6">: {selectedCard?.jenisTUKS}</span>
          </p>
          <p className="text-lg">
            Alamat<span className="p-14">: {selectedCard?.alamat}</span>
          </p>
          <p className="text-lg">
            No Telepon <span className="pl-4">: {selectedCard?.noTelp}</span>
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default TUKS;
