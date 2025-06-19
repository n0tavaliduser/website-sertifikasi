import { useState, useEffect } from 'react';
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
import { FiSearch, FiLoader, FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AssessorList = () => {
  const navigate = useNavigate();
  const [assessors, setAssessors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'delete', 'view'
  const [selectedAssessor, setSelectedAssessor] = useState(null);

  const itemsPerPage = 10;

  // Fetch assessors from API
  const fetchAssessors = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Token tidak ditemukan. Silakan login kembali.');
        return;
      }

      const params = new URLSearchParams({
        page: page.toString(),
        per_page: itemsPerPage.toString(),
        ...(search && { search })
      });

      const response = await fetch(`${API_URL}/assessors?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Laravel pagination response format
      if (data.data) {
        setAssessors(data.data || []);
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.last_page || 1);
      } else {
        throw new Error('Format response tidak valid');
      }
    } catch (err) {
      console.error('Error fetching assessors:', err);
      setError(err.message || 'Terjadi kesalahan saat mengambil data assessor');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAssessors(1, searchTerm);
  }, []);

  // Handle search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchAssessors(1, searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchAssessors(newPage, searchTerm);
    }
  };

  // Handle modal
  const openModal = (type, assessor = null) => {
    setModalType(type);
    setSelectedAssessor(assessor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedAssessor(null);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedAssessor) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/assessors/${selectedAssessor.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Terjadi kesalahan saat menghapus data');
      }
      
      // Success
      closeModal();
      fetchAssessors(currentPage, searchTerm);
      
      // Show success message
      alert('Assessor berhasil dihapus!');
      
    } catch (err) {
      console.error('Error deleting assessor:', err);
      setError(err.message || 'Terjadi kesalahan saat menghapus data assessor');
    } finally {
      setLoading(false);
    }
  };

  // Get photo URL
  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}/storage/${photoPath}`;
  };

  // Pagination functions
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Kelola Assessor</h1>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari assessor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Button 
            onClick={() => navigate("/app/assessor/create")} 
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <FiPlus /> Tambah Assessor
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading && assessors.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : assessors.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada data assessor{searchTerm && " yang sesuai dengan pencarian"}.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/app/assessor/create")}
          >
            Tambah Assessor Baru
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700">Foto</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700">Kode</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700">Nama</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-gray-700 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessors.map((assessor) => (
                  <TableRow key={assessor.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        {assessor.photo ? (
                          <img
                            src={getPhotoUrl(assessor.photo)}
                            alt={assessor.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          {assessor.photo ? 'Error' : 'No Photo'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{assessor.code}</TableCell>
                    <TableCell>{assessor.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openModal('view', assessor)}
                          className="flex items-center gap-1"
                        >
                          <FiEye className="h-4 w-4" /> Detail
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => navigate(`/app/assessor/${assessor.id}/edit`)}
                          className="flex items-center gap-1 bg-blue-600"
                        >
                          <FiEdit className="h-4 w-4" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openModal('delete', assessor)}
                          className="flex items-center gap-1"
                        >
                          <FiTrash2 className="h-4 w-4" /> Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Halaman <span className="font-medium">{currentPage}</span> dari{' '}
                    <span className="font-medium">{totalPages}</span>
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
                        onClick={() => handlePageChange(i + 1)}
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

      {/* Modal Detail Assessor */}
      <Dialog open={showModal && modalType === 'view'} onOpenChange={closeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Assessor</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang assessor
            </DialogDescription>
          </DialogHeader>
          
          {selectedAssessor && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-200 mb-4">
                  {selectedAssessor.photo ? (
                    <img
                      src={getPhotoUrl(selectedAssessor.photo)}
                      alt={selectedAssessor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {selectedAssessor.photo ? 'Error' : 'No Photo'}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Kode Assessor</label>
                <p className="mt-1 text-sm text-gray-900">{selectedAssessor.code}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Assessor</label>
                <p className="mt-1 text-sm text-gray-900">{selectedAssessor.name}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={closeModal}
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Hapus Assessor */}
      <Dialog open={showModal && modalType === 'delete'} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Assessor</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus assessor ini?
            </DialogDescription>
          </DialogHeader>
          
          {selectedAssessor && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Assessor <strong>{selectedAssessor.name}</strong> dengan kode <strong>{selectedAssessor.code}</strong> akan dihapus secara permanen. 
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          )}
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={loading}
            >
              Batal
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2 h-4 w-4" />
                  Menghapus...
                </>
              ) : (
                <>Hapus</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessorList;
