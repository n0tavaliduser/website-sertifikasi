import { Button } from "@/components/ui/button";
import Navbar from "../../components/Navbar";
import Graph from "@/components/Graph";
import CoverHome from "@/assets/cover-home.png";
import Slider from "@/components/Carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      <div className="md:container lg:mx-auto md:mt-12 md:px-4 lg:px-0">
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
                  <span class="text-xl font-bold bg-[#EB8317] p-2 rounded-2xl text-white">8,400+</span>
                  <span class="text-sm text-[#102640] font-bold">Asesi</span>
                </div>
              </div>
              <div class="grid relative w-32 h-20">
                <div class="absolute -top-2 -right-2 w-full h-full bg-[#102640] rounded-2xl"></div>
                <div class="relative z-10 flex flex-col items-center justify-center w-full h-full bg-white rounded-2xl shadow-lg border">
                  <span class="text-xl font-bold bg-[#EB8317] p-2 rounded-2xl text-white">6,500+</span>
                  <span class="text-sm text-[#102640] font-bold">Asesor</span>
                </div>
              </div>
            </div>
            <div className="my-12">
              <h1 className="text-center text-xl md:text-3xl lg:text-5xl font-bold">Selamat Datang di LSP AP-I</h1>
              <p className="text-center font-semibold md:font-bold">Berfokus pada sertifikasi administrasi perkantoran modern</p>
            </div>
            <div className="grid grid-cols-2 px-5 gap-2 md:px-10 md:gap-4 lg:px-20 lg:gap-6">
              <Button className="rounded-full text-lg md:text-xl lg:text-2xl bg-[#102640]">Selengkapnya</Button>
              <Button className="rounded-full text-lg md:text-xl lg:text-2xl bg-[#102640]">Sertifikasi</Button>
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

        <section className="lg:py-12 py-6">
          <div className="container mx-auto">
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">Partnership</h1>
            <h2 className="text-sm md:text-xl lg:text-2xl text-center font-semibold">Instansi yang bekerja sama dengan LSP AP-I</h2>
          </div>
          <div>
            <br></br>
            <br></br>
            <Slider />
          </div>
        </section>

        <section className="lg:py-12 py-6 mx-4">
          <div className="pb-6">
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">Tentang</h1>
            <h2 className="py-4 text-sm md:text-xl lg:text-2xl text-center font-semibold">
              LSP AP-I merupakan lembaga sertifikasi profesi yang diberikan kewenangan untuk melaksanakan kegiatan sertifikasi kompetensi yang terlisensi secara resmi oleh BNSP (Badan Nasional Sertifikasi Profesi) untuk bidang ADMINISTRASI
              PROFESSIONAL dengan skema Administrasi Kantor dan Sekretaris Yunior.
            </h2>
          </div>
          <div>
            <Accordion className="lg:container" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Sejarah</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  LSP AP-I merupakan lembaga pelaksana sertifikasi kompetensi yang terlisensi oleh BNSP dan bertanggung jawab melaksanakan sertifikasi kompetensi dibidang Administrasi Kantor dan Sekretaris Yunior. LSP Administrasi
                  Perkantoran Indonesia didirikan dengan Akta Notaris No. 01 tanggal 27 juli 2016, berfungsi dan mempunyai tugas melaksanakan uji kompetensi Administrasi Perkantoran, menerbitkan sertifikat kompetensi Administrasi
                  Perkantoran dengan merekomendasikan hasil uji kompetensi peserta kepada BNSP. LSP Administrasi Perkantoran Indonesia pendiriannya diinisiasi oleh Kadin Kota Bandung dan ASPAPI (Asosiasi Praktisi dan Ahli Perkantoran
                  Indonesia) dan di dukung oleh Dinas Perindag Kota Bandung, Dinas Tenaga Kerja Kota Bandung, dan Bagian Ekonomi Kota Bandung. .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Visi</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">
                  “Mewujudkan Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia sebagai lembaga professional yang independen, akuntabel, transparan dan terpercaya”.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Misi</AccordionTrigger>
                <AccordionContent className="text-justify text-sm md:text-lg lg:text-xl font-semibold">
                  1. Mendukung pengembangan dan pembangunan profesi yang kompeten dan Profesional. <br></br>2. Mendukung pengembangan profesi sebagai satu pilar dalam membangun sumber daya manusia Indonesia. <br></br>3. Mengembangkan
                  jejaringan dan kerjasama yang sinergis dengan pemangku kepentingan. <br></br>4. Menyediakan sarana pengembangan Sumber Daya Manusia (SDM), sesuai dengan kebutuhan ketenagakerjaan
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Maksud</AccordionTrigger>
                <AccordionContent className="text-justify text-sm md:text-lg lg:text-xl font-semibold">
                  1. Memfasilitasi pengakuan akan kompetensi kerja <br></br>2. Memastikan standar kerja kompetensi pada tenaga kerja di bidang administrasi perkantoran melalui sertifikasi yang sesuai dengan Standar <br></br>3. Kompetensi
                  Kerja Nasional (SKKNI). <br></br>4. Memastikan pengembangan tenaga kerja administrasi perkantoran yang profesional dan sesuai kebutuhan industri.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Tujuan</AccordionTrigger>
                <AccordionContent className="text-justify text-sm md:text-lg lg:text-xl font-semibold">
                  1. Meningkatkan kualitas dan daya saing tenaga kerja di bidang administrasi perkantoran.
                  <br></br>2. Mendukung pencapaian kebutuhan industri akan tenaga kerja yang kompeten dan tersertifikasi.
                  <br></br>3. Mendorong pengakuan kompetensi tenaga kerja secara nasional dan internasional.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Manfaat Sertifikasi</AccordionTrigger>
                <AccordionContent className="text-justify text-sm md:text-lg lg:text-xl font-semibold">
                  a. Membantu tenaga profesi meyakinkan kepada organisasi/ Industri/ kliennya bahwa dirinya kompeten dalam bekerja atau menghasilkan produk atau jasa dan meningkatkan percaya diri tenaga profesi. <br></br>b. Membantu tenaga
                  profesi dalam merencanakan karirnya dan mengukur tingkat pencapaian kompetensi dalam proses belajar di lembaga formal maupun secara mandiri. <br></br>c. Membantu tenaga profesi dalam memenuhi persyaratan regulasi.{" "}
                  <br></br>d. Membantu pengakuan kompetensi lintas sektor dan lintas Negara . <br></br>e. Membantu tenaga profesi dalam promosi profesinya dipasar tenaga kerja
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="lg:container lg:mx-auto">
          <div>
            <div className="pb-6">
              <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">Struktur Organisasi</h1>
              <h2 className="py-4 text-sm md:text-xl lg:text-2xl text-center font-semibold">
                Lembaga Sertifikasi Profesi <br /> Administrasi Perkantoran Indonesia (LSP AP-I)
              </h2>
            </div>
            <StrukturOrganisasi />
          </div>
        </section>

        <section className="py-12 lg:container lg:mx-auto">
          <div>
            <div>
              <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold">Data Asesor</h1>
            </div>
            <DataAsesor />
          </div>
        </section>

        <section className="lg:container lg:mx-auto">
          <div>
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold pb-4 md:pb-6 lg:pb-12">Skema Sertifikasi</h1>
          </div>
          <SkemaSertifikasiForHomePage />
        </section>

        <section className="lg:container lg:mx-auto mx-4">
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

        <section className="lg:container lg:mx-auto mx-4 md:py-6 lg:py-12">
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
