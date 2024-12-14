import { useParams } from "react-router-dom"; // Import useParams for accessing route parameters
import {
  dataSekretarisYunior,
  dataAdministrasiPerkantoran,
  dataDesainGrafis,
  dataPemasaranDigital,
} from "@/components/Table/TableData"; // Import the data
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import table components
import Navbar from "../Navbar";
import Footer from "../Footer";

const CategoryTable = () => {
  const { category } = useParams(); // Get the category from the URL parameter

  // Determine which data to display based on the category
  let data = [];
  if (category === "Sekretaris Yunior") {
    data = dataSekretarisYunior;
  } else if (category === "Administrasi Perkantoran") {
    data = dataAdministrasiPerkantoran;
  } else if (category === "Design Grafis") {
    data = dataDesainGrafis;
  } else if (category === "Pemasaran Digital") {
    data = dataPemasaranDigital;
  }

  return (
    <section>
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {category} Data
        </h2>

        {/* Table */}
        <div className="container mx-auto overflow-x-auto rounded-lg">
          <Table className="w-full text-sm text-left text-gray-600">
            {/* Caption */}
            <TableCaption className="text-gray-500 italic py-3">
              A list of {category}.
            </TableCaption>

            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-[#102640] text-white">
                <TableHead className="px-4 py-3 w-[120px]">ID</TableHead>
                <TableHead className="px-4 py-3">Title</TableHead>
                <TableHead className="px-4 py-3 text-center">
                  Subtitle
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="transition">
                  {/* ID Cell */}
                  <TableCell className="px-4 py-3 font-medium text-gray-800">
                    {item.id}
                  </TableCell>

                  {/* Title Cell */}
                  <TableCell className="px-4 py-3 text-gray-800">
                    {item.title}
                  </TableCell>

                  {/* Subtitle Cell */}
                  <TableCell className="px-4 py-3 text-center text-gray-600">
                    {item.subtitle}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default CategoryTable;
