import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import StrukturOrganisasi from "@/components/StrukturOrganisasi";
import DataAsesor from "@/components/DataAsesor";
export const Tentang = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div className="bg-[#F6F3F3] flex justify-center items-start mt-20 py-6">
          <div className="lg:container lg:mx-auto mx-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <a href="/" className="hover:underline cursor-pointer">
                Beranda
              </a>
              <span className="mx-2 text-gray-400">›</span>
              <span className="font-bold">Tentang</span>
            </nav>

            <div className="bg-[#F6F3F3] py-4 shadow-sm">
              <h1 className="text-2xl font-bold">Tentang</h1>
              <p className="text-gray-600 mt-2">Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
            </div>
          </div>
        </div>

        <section className="py-12 lg:container lg:mx-auto mx-4">
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
                  LSP AP-I merupakan lembaga sertifikasi profesi yang diberikan kewenangan untuk melaksanakan kegiatan sertifikasi kompetensi yang terlisensi secara resmi oleh BNSP (Badan Nasional Sertifikasi Profesi) untuk bidang
                  ADMINISTRASI PROFESSIONAL dengan skema Administrasi Kantor dan Sekretaris Yunior.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Visi</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Misi</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Maksud</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Tujuan</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Manfaat Sertifikasi</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Legalitas</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="bg-[#102640] text-white p-2 md:p-4 text-sm md:text-lg lg:text-xl font-bold">Rencana Strategis</AccordionTrigger>
                <AccordionContent className="text-center text-sm md:text-lg lg:text-xl font-semibold">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
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
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};
