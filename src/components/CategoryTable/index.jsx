import { useParams } from "react-router-dom"; // Import useParams for accessing route parameters
import { dataSekretarisYunior, dataAdministrasiPerkantoran, dataDesainGrafis, dataPemasaranDigital } from "@/components/Table/TableData"; // Import the data
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import table components
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Button } from "../ui/button";

const CategoryTable = () => {
  const { category } = useParams(); // Get the category from the URL parameter

  // Determine which data to display based on the category
  let data = [];
  if (category === "Sekretaris Yunior") {
    data = dataSekretarisYunior;
  } else if (category === "Administrasi Perkantoran") {
    data = dataAdministrasiPerkantoran;
  } else if (category === "Sekretaris Korporat") {
    data = dataDesainGrafis;
  } else if (category === "Sekretaris Board of Director") {
    data = dataPemasaranDigital;
  }

  return (
    <section>
      <Navbar />
      <div className="bg-[#F6F3F3] flex justify-left items-start mt-20 py-6">
        <div className="lg:container lg:mx-auto mx-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <a href="/Skema" className="hover:underline cursor-pointer">
              Skema
            </a>
            <span className="mx-2 text-gray-400">›</span>
            <span className="font-bold">Unit Kompetensi</span>
          </nav>

          <div className="bg-[#F6F3F3] py-4 shadow-sm">
            <h1 className="text-2xl font-bold">Skema </h1>
            <p className="text-gray-600 mt-2">Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{category} Data</h2>

        {/* Table */}
        <div className="container mx-auto overflow-x-auto rounded-lg">
          <Table className="w-full text-sm text-left text-gray-600">
            {/* Caption */}
            <TableCaption className="text-gray-500 italic py-3">A list of {category}.</TableCaption>

            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-[#102640] text-white">
                <TableHead className="px-4 py-3 w-[120px]">ID</TableHead>
                <TableHead className="px-4 py-3">Kode Unit</TableHead>
                <TableHead className="px-4 py-3 text-center">Nama Unit Kompetensi</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="transition">
                  {/* ID Cell */}
                  <TableCell className="px-4 py-3 font-medium text-gray-800">{item.id}</TableCell>

                  {/* Title Cell */}
                  <TableCell className="px-4 py-3 text-gray-800">{item.title}</TableCell>

                  {/* Subtitle Cell */}
                  <TableCell className="px-4 py-3 text-center text-gray-600">{item.subtitle}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <section className="container mx-auto">
        <div className="px-6 pb-4">
          <h1 className="mb-2">Unduh Panduan</h1>
          <Button className="rounded-2xl">Unduh File</Button>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default CategoryTable;
