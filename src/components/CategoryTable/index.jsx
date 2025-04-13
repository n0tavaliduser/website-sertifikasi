import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for accessing route parameters
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import table components
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Button } from "../ui/button";
import { FaSpinner } from "react-icons/fa";

const CategoryTable = () => {
  const { id } = useParams(); // Get the id from the URL parameter
  const [schemaData, setSchemaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    // Fungsi untuk mengambil data detail skema dari API
    const fetchSchemaDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/schemas/${id}/details`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setSchemaData(result.data);
        } else {
          setError(result.message || "Gagal mendapatkan data detail skema");
        }
      } catch (err) {
        console.error("Error fetching schema details:", err);
        setError("Terjadi kesalahan saat mengambil data detail skema");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchemaDetails();
    }
  }, [id, API_URL]);

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
      
      {loading ? (
        <div className="container mx-auto py-10 px-6 flex justify-center items-center min-h-[300px]">
          <FaSpinner className="animate-spin text-4xl text-gray-600" />
        </div>
      ) : error ? (
        <div className="container mx-auto py-10 px-6 text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2 text-sm">Mohon coba kembali nanti</p>
        </div>
      ) : schemaData ? (
        <div className="container mx-auto py-10 px-6">
         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{schemaData.name} Data</h2>

          {/* Table */}
          <div className="container mx-auto overflow-x-auto rounded-lg">
            <Table className="w-full text-sm text-left text-gray-600">
              {/* Caption */}
              <TableCaption className="text-gray-500 italic py-3">A list of {schemaData.name}.</TableCaption>

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
                {schemaData.units && schemaData.units.map((unit, index) => (
                  <TableRow key={unit.id || index} className="transition">
                    {/* ID Cell */}
                    <TableCell className="px-4 py-3 font-medium text-gray-800">{index + 1}</TableCell>

                    {/* Title Cell */}
                    <TableCell className="px-4 py-3 text-gray-800">{unit.code}</TableCell>

                    {/* Subtitle Cell */}
                    <TableCell className="px-4 py-3 text-center text-gray-600">{unit.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-10 px-6 text-center">
          <p>Tidak ada data yang tersedia</p>
        </div>
      )}

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
