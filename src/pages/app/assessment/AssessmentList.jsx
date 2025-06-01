import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { FiCheck, FiEye, FiFileText, FiSearch, FiX, FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const AssessmentList = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userRole, setUserRole] = useState('');
  const itemsPerPage = 10;

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

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

  // Pagination logic
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssessments.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset ke halaman pertama ketika pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Membuka dialog detail asesmen
  const handleViewDetail = (assessment) => {
    setCurrentAssessment(assessment);
    setShowDetailModal(true);
  };

  // Membuka dialog update status
  const handleOpenStatusModal = (assessment) => {
    setCurrentAssessment(assessment);
    setNewStatus(assessment.assessment_status || "");
    setShowStatusModal(true);
  };

  // Update status asesmen
  const handleUpdateStatus = async () => {
    if (!currentAssessment) return;
    
    try {
      setUpdatingStatus(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/assessee/${currentAssessment.id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        alert("Status asesmen berhasil diperbarui");
        
        // Update data lokal
        setAssessments(assessments.map(item => 
          item.id === currentAssessment.id 
            ? { ...item, assessment_status: newStatus } 
            : item
        ));
        
        // Tutup modal
        setShowStatusModal(false);
      } else {
        throw new Error(result.message || "Gagal memperbarui status asesmen");
      }
    } catch (err) {
      console.error("Error updating assessment status:", err);
      alert(err.message || "Terjadi kesalahan saat memperbarui status asesmen");
    } finally {
      setUpdatingStatus(false);
    }
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
            onClick={() => navigate("/user/assessment")} 
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
            onClick={() => navigate("/user/assessment")}
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
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetail(item)}
                          className="flex items-center gap-1"
                        >
                          <FiEye className="h-4 w-4" /> Detail
                        </Button>
                        {userRole == 'admin' && item.assessment_status != 'approved' && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => navigate(`/app/assessee/${item.id}/edit`)}
                            className="flex items-center gap-1 bg-blue-600"
                          >
                            <FiEdit className="h-4 w-4" /> Edit
                          </Button>
                        )}
                      </div>
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
                      {Math.min(indexOfLastItem, filteredAssessments.length)}
                    </span>{' '}
                    dari <span className="font-medium">{filteredAssessments.length}</span> data
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
            {userRole === 'admin' && currentAssessment && currentAssessment.assessment_status !== 'completed' && (
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  onClick={() => navigate(`/app/assessment/edit/${currentAssessment.id}`)}
                  className="bg-blue-600"
                >
                  <FiEdit className="mr-2 h-4 w-4" /> Edit Asesmen
                </Button>
                <Button 
                  type="button" 
                  onClick={() => handleOpenStatusModal(currentAssessment)}
                  className="bg-green-600"
                >
                  <FiCheck className="mr-2 h-4 w-4" /> Update Status
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Update Status */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Status Asesmen</DialogTitle>
            <DialogDescription>
              Ubah status asesmen untuk {currentAssessment?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status Asesmen</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Pilih Status</option>
                <option value="pending">Menunggu Verifikasi</option>
                <option value="approved">Disetujui</option>
                <option value="rejected">Ditolak</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowStatusModal(false)}
              disabled={updatingStatus}
            >
              Batal
            </Button>
            <Button 
              type="button" 
              onClick={handleUpdateStatus}
              disabled={!newStatus || updatingStatus}
              className={!newStatus ? "opacity-50 cursor-not-allowed" : ""}
            >
              {updatingStatus ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                <>Simpan</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentList;
