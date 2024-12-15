import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Image imports
import AMAInstitute from "@/assets/Partnership/AMA Institute.png";
import AlfaBank from "@/assets/Partnership/Alfa Bank.png";
import AuliLearningCentre from "@/assets/Partnership/Auli Learning Centre.png";
import BPKH from "@/assets/Partnership/BPKH.png";
import BalaiBesarBahanBarangTeknik from "@/assets/Partnership/Balai Besar Bahan Barang Teknik.png";
import BalaiBesarTekstil from "@/assets/Partnership/Balai Besar Tekstil.png";
import ButterflyConsulingIndonesia from "@/assets/Partnership/Butterfly Consuling Indonesia.jpg";
import CentragamaIndovisi from "@/assets/Partnership/Centragama Indovisi.png";
import Disnaker from "@/assets/Partnership/Disnaker.jpeg";
import DisperkitmanKabBekasi from "@/assets/Partnership/Disperkitman Kab. Bekasi.png";
import EltasaPrimaKonsulta from "@/assets/Partnership/Eltasa Prima Konsulta.png";
import LPKCahayaBangsa from "@/assets/Partnership/LPK Cahaya Bangsa.png";
import LPKIABandung from "@/assets/Partnership/LPKIA Bandung.png";
import LogoKadin from "@/assets/Partnership/Logo Kadin.png";
import P2KPTK2 from "@/assets/Partnership/P2KPTK2.png";
import PNM from "@/assets/Partnership/PNM (Permodalan Nasional Madani).png";
import POLNEP from "@/assets/Partnership/POLNEP.jpeg";
import PTExpertindo from "@/assets/Partnership/PT.Expertindo.png";
import PemkabBandung from "@/assets/Partnership/Pemkab. Bandung.png";
import PoliteknikNegeriBandung from "@/assets/Partnership/Politeknik Negeri Bandung.png";
import STPNHIBandung from "@/assets/Partnership/STP NHI Bandung.png";
import STTTBandung from "@/assets/Partnership/STTT Bandung.png";
import SekolahTinggiIlmuKesehatanBudiLuhurCimahi from "@/assets/Partnership/Sekolah Tinggi Ilmu Kesehatan Budi Luhur Cimahi.png";
import SekretariatDewanDPRDJABAR from "@/assets/Partnership/Sekretariat Dewan DPRD JABAR.png";
import TenagaKerjaKompetenIndonesia from "@/assets/Partnership/Tenaga Kerja Kompeten Indonesia.png";
import UNWIM from "@/assets/Partnership/UNWIM.jpeg";
import UniversitasIslamBandung from "@/assets/Partnership/Universitas Islam Bandung.png";
import UniversitasIslamNegeriSGJ from "@/assets/Partnership/Universitas Islam Negeri SGJ.png";
import UniversitasNegeriJakarta from "@/assets/Partnership/Universitas Negeri Jakarta.png";
import UniversitasNegeriJendralSoedirman from "@/assets/Partnership/Universitas Negeri Jendral Soedirman.png";
import UniversitasNegeriSemarang from "@/assets/Partnership/Universitas Negeri Semarang.png";
import UniversitasPakuan from "@/assets/Partnership/Universitas Pakuan.png";
import UniversitasTelkom from "@/assets/Partnership/Universitas Telkom.png";
import isi from "@/assets/Partnership/isi.png";
import setwanKota from "@/assets/Partnership/setwan kota.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 364 },
    items: 2,
    slidesToSlide: 1,
  },
};

const sliderImageUrl = [
  AMAInstitute,
  AlfaBank,
  AuliLearningCentre,
  BPKH,
  BalaiBesarBahanBarangTeknik,
  BalaiBesarTekstil,
  ButterflyConsulingIndonesia,
  CentragamaIndovisi,
  Disnaker,
  DisperkitmanKabBekasi,
  EltasaPrimaKonsulta,
  LPKCahayaBangsa,
  LPKIABandung,
  LogoKadin,
  P2KPTK2,
  PNM,
  POLNEP,
  PTExpertindo,
  PemkabBandung,
  PoliteknikNegeriBandung,
  STPNHIBandung,
  STTTBandung,
  SekolahTinggiIlmuKesehatanBudiLuhurCimahi,
  SekretariatDewanDPRDJABAR,
  TenagaKerjaKompetenIndonesia,
  UNWIM,
  UniversitasIslamBandung,
  UniversitasIslamNegeriSGJ,
  UniversitasNegeriJakarta,
  UniversitasNegeriJendralSoedirman,
  UniversitasNegeriSemarang,
  UniversitasPakuan,
  UniversitasTelkom,
  isi,
  setwanKota,
];

const Slider = () => {
  return (
    <div className="lg:parent lg:container mx-auto">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1000}
        transitionDuration={1000}
        swipeable={true}
        draggable={true}
        // showDots={true}
        infinite={true}
        partialVisible={false}
        arrows={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => (
          <div className="slider" key={index}>
            <img
              src={imageUrl}
              alt={`Partnership ${index + 1}`}
              className="w-full h-auto object-cover"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
