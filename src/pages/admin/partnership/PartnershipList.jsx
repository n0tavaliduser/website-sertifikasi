import React, { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

const PartnershipList = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPartnership, setCurrentPartnership] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Mengambil data partnership dari API
  const fetchPartnerships = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/partnerships`, {
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
        setPartnerships(result.data);
      } else {
        setError(result.message || "Gagal mendapatkan data partnership");
      }
    } catch (err) {
      console.error("Error fetching partnership data:", err);
      setError("Terjadi kesalahan saat mengambil data partnership");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerships();
  }, [API_URL]);

  // Fungsi untuk handle upload gambar dengan dropzone
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setImageFile(file);
    
    // Preview gambar
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    // Clean up URL object on unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.gif']
    },
    maxFiles: 1,
    maxSize: 2097152 // 2MB
  });

  // Membuka modal tambah data baru
  const handleAddNew = () => {
    setImageFile(null);
    setImagePreview(null);
    setShowAddModal(true);
  };

  // Membuka modal edit data
  const handleEdit = (partnership) => {
    setCurrentPartnership(partnership);
    setImagePreview(partnership.image_url ? `${API_BASE_URL}/${partnership.image_url}` : null);
    setImageFile(null);
    setShowEditModal(true);
  };

  // Membuka modal konfirmasi hapus
  const handleDelete = (partnership) => {
    setCurrentPartnership(partnership);
    setShowDeleteModal(true);
  };

  // Menambah partnership baru
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error("Silakan upload gambar logo partnership");
      return;
    }
    
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/partnerships`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal menambahkan partnership");
      }
      
      toast.success("Partnership berhasil ditambahkan");
      setShowAddModal(false);
      fetchPartnerships();
    } catch (err) {
      console.error("Error adding partnership:", err);
      toast.error(err.message || "Terjadi kesalahan saat menambahkan partnership");
    } finally {
      setLoading(false);
    }
  };

  // Mengupdate partnership
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error("Silakan upload gambar baru");
      return;
    }
    
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('_method', 'PUT');
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/partnerships/${currentPartnership.id}`, {
        method: 'POST', // Using POST with _method=PUT for file upload
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengupdate partnership");
      }
      
      toast.success("Partnership berhasil diupdate");
      setShowEditModal(false);
      fetchPartnerships();
    } catch (err) {
      console.error("Error updating partnership:", err);
      toast.error(err.message || "Terjadi kesalahan saat mengupdate partnership");
    } finally {
      setLoading(false);
    }
  };

  // Menghapus partnership
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/partnerships/${currentPartnership.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal menghapus partnership");
      }
      
      toast.success("Partnership berhasil dihapus");
      setShowDeleteModal(false);
      fetchPartnerships();
    } catch (err) {
      console.error("Error deleting partnership:", err);
      toast.error(err.message || "Terjadi kesalahan saat menghapus partnership");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Partnership</h1>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <FiPlus /> Tambah Partnership
        </Button>
      </div>

      {loading && partnerships.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : partnerships.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada data partnership.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {partnerships.map((partnership) => (
            <Card key={partnership.id} className="overflow-hidden">
              <div className="p-2 bg-gray-50 aspect-square flex items-center justify-center">
                <img
                  src={partnership.image_url ? `${API_BASE_URL}/${partnership.image_url}` : 'src/assets/placeholder.jpg'}
                  alt="Logo Partnership"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'src/assets/placeholder.jpg';
                  }}
                />
              </div>
              <CardContent className="p-2">
                <div className="flex justify-center gap-2 mt-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(partnership)}
                    className="flex items-center gap-1 p-1 h-8"
                  >
                    <FiEdit2 className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(partnership)}
                    className="flex items-center gap-1 p-1 h-8"
                  >
                    <FiTrash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Tambah Partnership */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Partnership Baru</DialogTitle>
            <DialogDescription>
              Upload logo partnership dengan ukuran maksimal 2MB.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd}>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <div className="text-sm font-medium text-gray-700">Logo Partnership</div>
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  
                  {imagePreview ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-40 max-w-full mb-4 object-contain" 
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="flex items-center"
                      >
                        <FiX className="mr-1" /> Hapus Gambar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiPlus className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Klik atau drag & drop untuk upload gambar
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, JPEG, GIF hingga 2MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !imageFile}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Partnership */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Partnership</DialogTitle>
            <DialogDescription>
              Upload logo baru untuk mengganti logo partnership ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit}>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <div className="text-sm font-medium text-gray-700">Logo Partnership</div>
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  
                  {imagePreview ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-40 max-w-full mb-4 object-contain" 
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="flex items-center"
                      >
                        <FiX className="mr-1" /> Hapus Gambar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiPlus className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Klik atau drag & drop untuk upload gambar baru
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, JPEG, GIF hingga 2MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEditModal(false)}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !imageFile}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi Hapus */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus partnership ini? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Batal
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnershipList;
