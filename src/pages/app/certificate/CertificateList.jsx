import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FiSearch, FiAward, FiCheck, FiLoader, FiChevronLeft, FiChevronRight, FiDownload, FiEdit } from "react-icons/fi";

const CertificateList = () => {
  const navigate = useNavigate();
  const [assessees, setAssessees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userRole, setUserRole] = useState('');
  const itemsPerPage = 10;

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  
  useEffect(() => {
    // Mendapatkan role user dari localStorage
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUserRole(userData.role);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  // Mengambil data asesi dengan status 'approved' dari API
  const fetchApprovedAssessees = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/assessee/reference-by-status/approved`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setAssessees(result.data);
      } else {
        setError(result.message || "Gagal mendapatkan data asesi");
      }
    } catch (err) {
      console.error("Error fetching assessees data:", err);
      setError("Terjadi kesalahan saat mengambil data asesi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedAssessees();
  }, [API_URL]);

  // Filter assessees berdasarkan pencarian
  const filteredAssessees = assessees.filter(item => 
    (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.schema && item.schema.name && item.schema.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAssessees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssessees.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset ke halaman pertama ketika pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Mengarahkan ke halaman assign sertifikat
  const handleAssignCertificate = (assesseeId) => {
    navigate(`/app/certificate/assign/${assesseeId}`);
  };

  // Mendownload sertifikat
  const handleDownloadCertificate = async (certificate) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Membuat URL untuk mengunduh sertifikat
      const downloadUrl = `${API_URL}/certificates/${certificate.id}/download`;
      
      // Membuat request dengan token autentikasi, respons sebagai blob
      const response = await fetch(downloadUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // Tidak menggunakan 'Accept': 'application/json' karena mengharapkan respons file
        }
      });
      
      // Periksa contentType pada respons
      const contentType = response.headers.get('content-type');
      
      // Jika respons adalah JSON, berarti terjadi error
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengunduh sertifikat');
      }
      
      if (!response.ok) {
        throw new Error('Gagal mengunduh sertifikat');
      }
      
      // Konversi response ke blob
      const blob = await response.blob();
      
      // Buat URL objek untuk blob
      const url = window.URL.createObjectURL(blob);
      
      // Buat elemen <a> untuk mendownload
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // Tentukan nama file download dan pastikan tidak ada karakter / atau \
      const sanitizedCertNumber = certificate.certificate_number 
        ? certificate.certificate_number.replace(/[\/\\]/g, '_') 
        : 'sertifikat';
      const fileName = `Sertifikat_${sanitizedCertNumber}.pdf`;
      a.download = fileName;
      
      // Tambahkan ke DOM, klik, dan hapus
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Tidak menampilkan alert berhasil karena membingungkan user jika IDM mengambil alih
      
    } catch (err) {
      console.error("Error downloading certificate:", err);
      
      // Tidak menampilkan alert error karena jika IDM mengambil alih, download tetap berhasil
      // meskipun JavaScript mendapatkan NetworkError
      
      // Cek apakah error adalah NetworkError (biasanya terjadi karena download manager mengambil alih)
      if (err.message && (err.message.includes('NetworkError') || err.message.includes('network'))) {
        console.log('Download mungkin berhasil melalui download manager eksternal');
        // Tidak perlu menampilkan error
      } else if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('fetch'))) {
        console.log('Download mungkin berhasil melalui download manager eksternal');
        // Tidak perlu menampilkan error
      } else {
        // Hanya tampilkan alert jika bukan NetworkError atau fetch error
        alert("Gagal mengunduh sertifikat: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Daftar Asesi Siap Sertifikasi</h1>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari asesi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="flex flex-col items-center">
            <FiLoader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
            <p className="text-gray-500">Memuat data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : filteredAssessees.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Tidak ada asesi yang disetujui{searchQuery && " yang sesuai dengan pencarian"}.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700">Nama</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700">Skema Sertifikasi</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700 hidden md:table-cell">Metode</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700 hidden md:table-cell">Tanggal Asesmen</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700">Status Sertifikat</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium">{item.name || 'Tanpa Nama'}</p>
                        <p className="text-sm text-gray-500">{item.email || '-'}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">
                        {item.schema?.name || '-'}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize hidden md:table-cell">{item.method || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(item.assessment_date)}</TableCell>
                    <TableCell>
                      {item.certificate ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          <FiCheck className="mr-1" /> Tersertifikasi
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          <FiCheck className="mr-1" /> Disetujui
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right flex items-center gap-2">
                      {item.certificate ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownloadCertificate(item.certificate)}
                          className="flex items-center gap-1 text-blue-600"
                        >
                          <FiDownload className="h-4 w-4" /> Download Sertifikat
                        </Button>
                      ) : (
                        userRole === 'admin' && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleAssignCertificate(item.id)}
                            className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                          >
                            <FiAward className="h-4 w-4" /> Assign Sertifikat
                          </Button>
                        )
                      )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/app/assessee/${item.id}/edit`)}
                      className="flex items-center gap-1 text-yellow-600"
                    >
                      <FiEdit className="h-4 w-4" /> Edit
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> sampai{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredAssessees.length)}
                    </span>{' '}
                    dari <span className="font-medium">{filteredAssessees.length}</span> data
                  </p>
                </div>
                <div>
                  <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-l-md px-2"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      <FiChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        className="px-3"
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    )).slice(
                      Math.max(0, currentPage - 3),
                      Math.min(totalPages, currentPage + 2)
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-r-md px-2"
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              </div>
              <div className="flex sm:hidden justify-between items-center w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft className="h-4 w-4 mr-1" /> Sebelumnya
                </Button>
                <span className="text-sm">
                  {currentPage} dari {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Selanjutnya <FiChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateList;
