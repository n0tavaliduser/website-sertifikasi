import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

const GalleryList = () => {
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Mengambil data galeri dari API
  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/galleries`, {
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
        setGalleries(result.data);
      } else {
        setError(result.message || "Gagal mendapatkan data galeri");
      }
    } catch (err) {
      console.error("Error fetching gallery data:", err);
      setError("Terjadi kesalahan saat mengambil data galeri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [API_URL]);

  // Fungsi untuk dropzone - tambah
  const onDropAdd = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Validasi ukuran file (maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }
    
    setImageFile(file);
    
    // Preview gambar
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    // Clean up URL object on unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const {
    getRootProps: getAddRootProps,
    getInputProps: getAddInputProps,
    isDragActive: isAddDragActive
  } = useDropzone({
    onDrop: onDropAdd,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  // Fungsi untuk dropzone - edit
  const onDropEdit = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Validasi ukuran file (maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }
    
    setImageFile(file);
    
    // Preview gambar
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    // Clean up URL object on unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const {
    getRootProps: getEditRootProps,
    getInputProps: getEditInputProps,
    isDragActive: isEditDragActive
  } = useDropzone({
    onDrop: onDropEdit,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  // Filter galeri berdasarkan pencarian (berdasarkan nama file)
  const filteredGalleries = galleries.filter(item => {
    // Cek jika image_url ada
    if (!item.image_url) return false;
    
    // Ekstrak nama file dari path
    const fileName = item.image_url.split('/').pop() || "";
    return fileName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Fungsi untuk membuka modal tambah
  const handleAdd = () => {
    setImageFile(null);
    setImagePreview(null);
    setShowAddModal(true);
  };

  // Fungsi untuk membuka modal edit
  const handleEdit = (galleryItem) => {
    setCurrentGallery(galleryItem);
    setImageFile(null);
    setImagePreview(galleryItem.image_url ? `${API_BASE_URL}/${galleryItem.image_url}` : null);
    setShowEditModal(true);
  };

  // Membuka dialog konfirmasi hapus
  const handleDelete = (galleryItem) => {
    setCurrentGallery(galleryItem);
    setShowDeleteModal(true);
  };

  // Menghapus galeri
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/galleries/${currentGallery.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal menghapus galeri");
      }
      
      toast.success("Gambar berhasil dihapus");
      setShowDeleteModal(false);
      fetchGalleries();
    } catch (err) {
      console.error("Error deleting gallery:", err);
      toast.error(err.message || "Terjadi kesalahan saat menghapus galeri");
    } finally {
      setLoading(false);
    }
  };

  // Handle submit tambah gambar
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error("Silakan pilih file gambar terlebih dahulu");
      return;
    }
    
    try {
      setUploadLoading(true);
      
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/galleries`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengunggah gambar");
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Gambar berhasil diunggah");
        setShowAddModal(false);
        setImageFile(null);
        setImagePreview(null);
        fetchGalleries();
      } else {
        throw new Error(result.message || "Gagal mengunggah gambar");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error(err.message || "Terjadi kesalahan saat mengunggah gambar");
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle submit edit gambar
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    if (!imageFile && !currentGallery.image_url) {
      toast.error("Silakan pilih file gambar terlebih dahulu");
      return;
    }
    
    try {
      setUploadLoading(true);
      
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      formData.append('_method', 'PUT');
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/galleries/${currentGallery.id}`, {
        method: 'POST', // Menggunakan POST dengan _method: PUT untuk form-data
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal memperbarui galeri");
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Galeri berhasil diperbarui");
        setShowEditModal(false);
        setImageFile(null);
        setImagePreview(null);
        setCurrentGallery(null);
        fetchGalleries();
      } else {
        throw new Error(result.message || "Gagal memperbarui galeri");
      }
    } catch (err) {
      console.error("Error updating gallery:", err);
      toast.error(err.message || "Terjadi kesalahan saat memperbarui galeri");
    } finally {
      setUploadLoading(false);
    }
  };

  // Ekstrak nama file dari path
  const getFileName = (path) => {
    if (!path) return "Unknown file";
    return path.split('/').pop() || "Unknown file";
  };

  // Reset gambar yang dipilih untuk edit
  const handleResetEditImage = () => {
    setImageFile(null);
    if (currentGallery && currentGallery.image_url) {
      setImagePreview(`${API_BASE_URL}/${currentGallery.image_url}`);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Galeri</h1>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari gambar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Button 
            onClick={handleAdd} 
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <FiPlus /> Tambah Gambar
          </Button>
        </div>
      </div>

      {loading && galleries.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : filteredGalleries.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada data galeri{searchQuery && " yang sesuai dengan pencarian"}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGalleries.map((item) => (
            <Card key={item.id} className="overflow-hidden group relative">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {item.image_url ? (
                  <img
                    src={`${API_BASE_URL}/${item.image_url}`}
                    alt={getFileName(item.image_url)}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'src/assets/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">Tidak ada gambar</span>
                  </div>
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1"
                    >
                      <FiEdit2 className="h-4 w-4" /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      className="flex items-center gap-1"
                    >
                      <FiTrash2 className="h-4 w-4" /> Hapus
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-3 text-center">
                <p className="text-sm text-gray-500 truncate">{getFileName(item.image_url)}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Tambah Gambar */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Gambar Galeri</DialogTitle>
            <DialogDescription>
              Unggah gambar baru untuk galeri website.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Gambar</Label>
              <div 
                {...getAddRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                  isAddDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"
                }`}
              >
                <input {...getAddInputProps()} />
                
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-40 mx-auto object-contain" 
                    />
                    <p className="text-sm text-gray-500">
                      {imageFile?.name} ({(imageFile?.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >
                      Ganti Gambar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FiUpload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Klik atau tarik dan letakkan file gambar di sini
                    </p>
                    <p className="text-xs text-gray-400">
                      Format: JPG, PNG, GIF (Maks. 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  setImageFile(null);
                  setImagePreview(null);
                }}
                disabled={uploadLoading}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                disabled={uploadLoading || !imageFile}
              >
                {uploadLoading ? (
                  <>
                    <Spinner className="mr-2" size="sm" />
                    Mengunggah...
                  </>
                ) : (
                  "Unggah Gambar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Gambar */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Gambar Galeri</DialogTitle>
            <DialogDescription>
              Perbarui gambar galeri yang sudah ada.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-edit">Gambar</Label>
              <div 
                {...getEditRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                  isEditDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"
                }`}
              >
                <input {...getEditInputProps()} />
                
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-40 mx-auto object-contain" 
                    />
                    {imageFile && (
                      <p className="text-sm text-gray-500">
                        {imageFile?.name} ({(imageFile?.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                    <div className="flex justify-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Ganti Gambar
                      </Button>
                      {imageFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetEditImage();
                          }}
                        >
                          Kembali ke Asli
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FiUpload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Klik atau tarik dan letakkan file gambar di sini
                    </p>
                    <p className="text-xs text-gray-400">
                      Format: JPG, PNG, GIF (Maks. 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setImageFile(null);
                  setImagePreview(null);
                  setCurrentGallery(null);
                }}
                disabled={uploadLoading}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                disabled={uploadLoading}
              >
                {uploadLoading ? (
                  <>
                    <Spinner className="mr-2" size="sm" />
                    Memperbarui...
                  </>
                ) : (
                  "Perbarui Gambar"
                )}
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
              Apakah Anda yakin ingin menghapus gambar ini? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          {currentGallery && currentGallery.image_url && (
            <div className="flex justify-center my-4">
              <img 
                src={`${API_BASE_URL}/${currentGallery.image_url}`} 
                alt="Preview" 
                className="max-h-40 max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'src/assets/placeholder.jpg';
                }}
              />
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="mr-2" size="sm" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryList; 