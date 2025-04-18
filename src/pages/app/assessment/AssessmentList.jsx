import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { FiCheck, FiEye, FiFileText, FiSearch, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const AssessmentList = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Mengambil data asesmen dari API
  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/assessee`, {
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
        setAssessments(result.data);
      } else {
        setError(result.message || "Gagal mendapatkan data asesmen");
      }
    } catch (err) {
      console.error("Error fetching assessment data:", err);
      setError("Terjadi kesalahan saat mengambil data asesmen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, [API_URL]);

  // Filter asesmen berdasarkan pencarian
  const filteredAssessments = assessments.filter(item => 
    (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.phone_number && item.phone_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.schema && item.schema.name && item.schema.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Membuka dialog detail asesmen
  const handleViewDetail = (assessment) => {
    setCurrentAssessment(assessment);
    setShowDetailModal(true);
  };

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Menampilkan status asesmen dengan badge
  const renderStatusBadge = (status) => {
    if (!status) return <Badge variant="outline">Belum Diproses</Badge>;
    
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Menunggu Verifikasi</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Disetujui</Badge>;
      case 'completed':
        return <Badge variant="success" className="bg-green-100 text-green-800">Selesai</Badge>;
      default:
        return <Badge variant="outline">Belum Diproses</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Daftar Pengajuan Asesmen</h1>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari pengajuan asesmen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Button 
            onClick={() => navigate("/user/assessment/register")} 
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <FiFileText /> Ajukan Asesmen Baru
          </Button>
        </div>
      </div>

      {loading && assessments.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : filteredAssessments.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada pengajuan asesmen{searchQuery && " yang sesuai dengan pencarian"}.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/user/assessment/register")}
          >
            Ajukan Asesmen Baru
          </Button>
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
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700 hidden lg:table-cell">Status Dokumen</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700">Status Asesmen</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((item) => (
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
                    <TableCell className="hidden lg:table-cell">
                      {item.hasCompletedDocuments ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <FiCheck className="h-4 w-4" /> Lengkap
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <FiX className="h-4 w-4" /> Belum Lengkap
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{renderStatusBadge(item.assessment_status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetail(item)}
                        className="flex items-center gap-1"
                      >
                        <FiEye className="h-4 w-4" /> Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Modal Detail Asesmen */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detail Pengajuan Asesmen</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang pengajuan asesmen
            </DialogDescription>
          </DialogHeader>
          
          {currentAssessment && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{currentAssessment.name}</h3>
                {renderStatusBadge(currentAssessment.assessment_status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Informasi Pribadi</h4>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">Email:</span> {currentAssessment.email || '-'}</p>
                    <p className="text-sm"><span className="font-medium">No. HP:</span> {currentAssessment.phone_number || '-'}</p>
                    <p className="text-sm"><span className="font-medium">NIK:</span> {currentAssessment.identity_number || '-'}</p>
                    <p className="text-sm"><span className="font-medium">Tempat Lahir:</span> {currentAssessment.birth_place || '-'}</p>
                    <p className="text-sm"><span className="font-medium">Tanggal Lahir:</span> {formatDate(currentAssessment.birth_date)}</p>
                    <p className="text-sm"><span className="font-medium">Alamat:</span> {currentAssessment.address || '-'}</p>
                    <p className="text-sm"><span className="font-medium">Pendidikan Terakhir:</span> {currentAssessment.last_education_level || '-'}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Informasi Asesmen</h4>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">Skema Sertifikasi:</span> {currentAssessment.schema?.name || '-'}</p>
                    <p className="text-sm"><span className="font-medium">Metode Asesmen:</span> <span className="capitalize">{currentAssessment.method || '-'}</span></p>
                    <p className="text-sm"><span className="font-medium">Tanggal Asesmen:</span> {formatDate(currentAssessment.assessment_date)}</p>
                    <p className="text-sm"><span className="font-medium">Tanggal Pengajuan:</span> {formatDate(currentAssessment.created_at)}</p>
                    <p className="text-sm"><span className="font-medium">Status:</span> <span className="capitalize">{currentAssessment.assessment_status || 'Belum Diproses'}</span></p>
                    {currentAssessment.assessment_result && (
                      <p className="text-sm"><span className="font-medium">Hasil Asesmen:</span> {currentAssessment.assessment_result}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Dokumen</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">Ijazah Terakhir:</span>
                    {currentAssessment.last_education_certificate_path ? (
                      <Link 
                        to={`${API_BASE_URL}/${currentAssessment.last_education_certificate_path}`} 
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Dokumen
                      </Link>
                    ) : (
                      <span className="text-red-500">Belum Diunggah</span>
                    )}
                  </p>
                  
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">KTP:</span>
                    {currentAssessment.identity_card_path ? (
                      <Link 
                        to={`${API_BASE_URL}/${currentAssessment.identity_card_path}`} 
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Dokumen
                      </Link>
                    ) : (
                      <span className="text-red-500">Belum Diunggah</span>
                    )}
                  </p>
                  
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">Kartu Keluarga:</span>
                    {currentAssessment.family_card_path ? (
                      <Link 
                        to={`${API_BASE_URL}/${currentAssessment.family_card_path}`} 
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Dokumen
                      </Link>
                    ) : (
                      <span className="text-red-500">Belum Diunggah</span>
                    )}
                  </p>
                  
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">Pas Foto:</span>
                    {currentAssessment.self_photo_path ? (
                      <Link 
                        to={`${API_BASE_URL}/${currentAssessment.self_photo_path}`} 
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Dokumen
                      </Link>
                    ) : (
                      <span className="text-red-500">Belum Diunggah</span>
                    )}
                  </p>
                  
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">APL 01:</span>
                    {currentAssessment.apl01_path ? (
                      <Link 
                        to={`${API_BASE_URL}/${currentAssessment.apl01_path}`} 
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Dokumen
                      </Link>
                    ) : (
                      <span className="text-red-500">Belum Diunggah</span>
                    )}
                  </p>
                  
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">APL 02:</span>
                    {currentAssessment.apl02_path ? (
                      <Link 
                        to={`${API_BASE_URL}/${currentAssessment.apl02_path}`} 
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Dokumen
                      </Link>
                    ) : (
                      <span className="text-red-500">Belum Diunggah</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowDetailModal(false)}
            >
              Tutup
            </Button>
            {currentAssessment && currentAssessment.assessment_status !== 'completed' && (
              <Button 
                type="button" 
                onClick={() => navigate(`/user/assessment/edit/${currentAssessment.id}`)}
              >
                Edit Pengajuan
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentList;
