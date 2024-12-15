import { Button } from "@/components/ui/button";
import Navbar from "../../components/Navbar";
import Graph from "@/components/Graph";
import CoverHome from "@/assets/cover-home.png";
import Slider from "@/components/Carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StrukturOrganisasi from "@/components/StrukturOrganisasi";
import DataAsesor from "@/components/DataAsesor";
import TUKS from "@/components/TUKS";
import BeritaHomepage from "@/components/DetailNews/NewsForHomepage";
import Footer from "@/components/Footer";
import GalleryForHomePage from "@/components/GalleryForHomePage";
import KontakForHomePage from "@/components/KontakForHomePage";
import SkemaSertifikasiForHomePage from "@/components/SkemaSertifikasiForHomePage";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section>
      <div className="md:container mx-auto md:mt-12 px-6 md:px-4 lg:px-0">
        <Navbar />
        <section className="h-screen grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center">
          <div className="mt-6 mb-12 md:mb-0 hidden md:grid">
            <img className="h-[75vh]" src={CoverHome} alt="" />
          </div>
          <div className="grid">
            <div className="grid grid-cols-2 place-content-center place-items-center">
              <div class="grid relative w-32 h-20">
                <div class="absolute -top-2 -right-2 w-full h-full bg-[#102640] rounded-2xl"></div>
                <div class="relative z-10 flex flex-col items-center justify-center w-full h-full bg-white rounded-2xl shadow-lg border">
                  <span class="text-xl font-bold bg-[#EB8317] p-2 rounded-2xl text-white">
                    8,400+
                  </span>
                  <span class="text-sm text-[#102640] font-bold">Asesi</span>
                </div>
              </div>
              <div class="grid relative w-32 h-20">
                <div class="absolute -top-2 -right-2 w-full h-full bg-[#102640] rounded-2xl"></div>
                <div class="relative z-10 flex flex-col items-center justify-center w-full h-full bg-white rounded-2xl shadow-lg border">
                  <span class="text-xl font-bold bg-[#EB8317] p-2 rounded-2xl text-white">
                    6,500+
                  </span>
                  <span class="text-sm text-[#102640] font-bold">Asesor</span>
                </div>
              </div>
            </div>
            <div className="my-12">
              <h1 className="text-center text-xl md:text-3xl lg:text-5xl font-bold">
                Selamat Datang di LSP AP-I
              </h1>
              <p className="text-center font-semibold md:font-bold">
                Berfokus pada sertifikasi administrasi perkantoran modern
              </p>
            </div>
            <div className="grid grid-cols-2 px-5 gap-2 md:px-10 md:gap-4 lg:px-20 lg:gap-6">
              <Button className="rounded-full text-lg md:text-xl lg:text-2xl bg-[#102640]">
                Selengkapnya
              </Button>
              <Button className="rounded-full text-lg md:text-xl lg:text-2xl bg-[#102640]">
                Sertifikasi
              </Button>
            </div>
            <span className="bg-[#102640] w-full h-[3px] rounded-full mt-6"></span>
            <div className="grid grid-cols-2 gap-4 place-content-center place-items-center mt-6">
              <div className="font-semibold md:font-bold">
                <h1>ADMINISTRASI PERKANTORAN</h1>
              </div>
              <div className="font-semibold md:font-bold">
                <h1>SEKRETARIS YUNIOR</h1>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Graph />
        </section>

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

        <section className="py-12">
          <div className="pb-6">
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">
              Tentang
            </h1>
            <h2 className="py-4 text-sm md:text-xl lg:text-2xl text-center font-semibold">
              LSP AP-I merupakan lembaga sertifikasi profesi yang diberikan
              kewenangan untuk melaksanakan kegiatan sertifikasi kompetensi yang
              terlisensi secara resmi oleh BNSP (Badan Nasional Sertifikasi
              Profesi) untuk bidang ADMINISTRASI PROFESSIONAL dengan skema
              Administrasi Kantor dan Sekretaris Yunior.
            </h2>
          </div>
          <div>
            <Accordion className="lg:container" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Sejarah
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  LSP AP-I merupakan lembaga sertifikasi profesi yang diberikan
                  kewenangan untuk melaksanakan kegiatan sertifikasi kompetensi
                  yang terlisensi secara resmi oleh BNSP (Badan Nasional
                  Sertifikasi Profesi) untuk bidang ADMINISTRASI PROFESSIONAL
                  dengan skema Administrasi Kantor dan Sekretaris Yunior.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Visi
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Misi
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Maksud
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Tujuan
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Manfaat Sertifikasi
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Legalitas
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">
                  Rencana Strategis
                </AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="lg:container lg:mx-auto">
          <div>
            <div className="pb-6">
              <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">
                Struktur Organisasi
              </h1>
              <h2 className="py-4 text-sm md:text-xl lg:text-2xl text-center font-semibold">
                Lemabaga Sertifikasi Profesi <br /> Administrasi Perkantoran
                Indonesia (LSP AP-I)
              </h2>
            </div>
            <StrukturOrganisasi />
          </div>
        </section>

        <section className="py-12 lg:container lg:mx-auto">
          <div>
            <div>
              <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">
                Data Asesor
              </h1>
            </div>
            <DataAsesor />
          </div>
        </section>

        <section className="lg:container lg:mx-auto">
          <div>
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold pb-4 md:pb-6 lg:pb-12">
              Skema Sertifikasi
            </h1>
          </div>
          <SkemaSertifikasiForHomePage />
        </section>

        <section className="lg:container lg:mx-auto">
          <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold pb-4 md:pb-6 lg:pb-12">
            Tempat Uji Kompetensi Sewaktu <br /> (TUKS)
          </h1>
          <TUKS />
          <div className="grid place-content-center place-items-center">
            <Link to="/tuks">
              <Button> Selengkapnya</Button>
            </Link>
          </div>
        </section>

        <section className="lg:container lg:mx-auto md:py-6 lg:py-12">
          <div></div>
          <GalleryForHomePage />
        </section>

        <section className="lg:container lg:mx-auto md:py-6 lg:py-12">
          <BeritaHomepage />
        </section>

        <section className="lg:container lg:mx-auto md:py-6 lg:py-12">
          <KontakForHomePage />
        </section>
      </div>
      <section>
        <Footer />
      </section>
    </section>
  );
};
