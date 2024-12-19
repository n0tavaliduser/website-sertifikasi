import SearchBar from "@/components/ui/Search";
import { Plus, SquarePen } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Write from "@/assets/Icon/Write.png";
import Icon from "@/assets/Icon/Icon.png";
import Sekretaris from "@/assets/Skema/sekretaris.png";
import Administrasi from "@/assets/Skema/administrasi.png";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SkemaForm from "@/components/Modal/AddSkema";
import EditSkemaForm from "@/components/Modal/EditSkema";
const CardItem = ({ imageUrl, title, unit, jenis, onClick }) => (
    <div
      onClick={onClick}
      className="relative group overflow-hidden rounded-lg bg-transparent transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
    >
      <div className="relative p-0 bg-none ">
        <img
          src={imageUrl}
          alt="Card image"
          className="w-full h-[337px] object-cover transition-all duration-300 group-hover:opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-[100%] transition-opacity duration-300 bg-[#EB8317] bg-opacity-50">
          <div className="text-white text-center">
            <p className="text-lg font-bold">{title}</p>
          
          </div>
        </div>
      </div>
        <Button className="w-full mt-11 bg-[#102640]">{title}</Button>
    </div>
  );
  
  export  const AdminSkema = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const cardData = [
        {
            imageUrl: Administrasi,
            title: "Manajer Keuangan",
            unit: "Unit Keuangan Jakarta",
            jenis: "Skema Profesional",
          },
      {
        imageUrl: Sekretaris,
        title: "Sekretaris Yunior",
        unit: "Unit Administrasi Bandung",
        jenis: "Skema Sertifikasi",
      },
     
     
    ];
  
    const openModal = (card) => {
      setSelectedCard(card);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setSelectedCard(null);
      setIsModalOpen(false);
    };
  
    return (
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-end gap-4">

        <SearchBar />
        </div>
        <div className="flex items-center">
        <div className="w-full max-w-7xl my-16">
          <h1 className="text-2xl font-bold text-gray-800">Skema</h1>
          <p className="text-sm text-gray-500">
            Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia
          </p>
        </div>

        {/* Top Section: Search and Total Skema */}
        <div className="w-full max-w-7xl flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
          <Dialog>
      <DialogTrigger asChild>
     
            <button className="bg-[#06113C]  text-center flex items-center justify-center text-white w-[181px] h-[68px] font-bold rounded-3xl hover:bg-blue-800">
              <Plus /> Tambah Skema
            </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
              <SkemaForm/>
            </DialogContent>
            </Dialog>
            <div class="grid relative  ">
              <div class="absolute -bottom-1 blur-[2px] right-15 w-[66px] h-[64px] bg-[#102640] rounded-xl"></div>
              <Dialog>
              <DialogTrigger asChild>
              <button class="relative bg-white h-[64px] flex items-center justify-center w-[66px] border border-gray-200 rounded-xl shadow-xl hover:bg-gray-50  focus:ring-offset-2 focus:ring-indigo-500">
                <img src={Write} alt="" class="" />
              </button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
              <EditSkemaForm/>
            </DialogContent>
            </Dialog>
            </div>
            <div class=" rounded-xl shadow w-[248px] h-[97px] flex items-center">
            <div class="flex-shrink-0 ml-3">
              <img src={Icon} alt="" />
            </div>
            <div class="ml-2">
              <p class="text-sm font-medium text-gray-900">Total Skema</p>
              <p class="text-[24px] font-bold text-black">02</p>
            </div>
          </div>
          </div>
         
        </div>
      </div>
  
        {/* Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cardData.map((card, index) => (
           
            <CardItem
              
              imageUrl={card.imageUrl}
              title={card.title}
              unit={card.unit}
              jenis={card.jenis}
              onClick={() => openModal(card)}
              />

           
              
          ))}
        </div>
  
        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedCard?.title}
          footer={
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          }
        >
          {selectedCard && (
            <div>
              <p className="text-gray-700 mb-2">
                <strong>Nama:</strong> {selectedCard.title}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Unit:</strong> {selectedCard.unit}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Jenis:</strong> {selectedCard.jenis}
              </p>
            </div>
          )}
        </Modal>
      </div>
    );
  };
  
  export default AdminSkema;