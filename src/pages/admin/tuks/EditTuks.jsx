import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

const EditTuks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    type: "",
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch data TUKS yang akan diedit
  useEffect(() => {
    const fetchTuksData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/tuks/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error("Gagal memuat data TUKS");
        }
        
        const result = await response.json();
        
        if (!result.success || !result.data) {
          throw new Error(result.message || "Data TUKS tidak ditemukan");
        }
        
        const data = result.data;
        
        // Set form data dari response
        setFormData({
          name: data.name || "",
          address: data.address || "",
          phone: data.phone || "",
          type: data.type || "",
        });
        
        // Set preview gambar jika ada
        if (data.image_url) {
          setCurrentImage(data.image_url);
          // Tambahkan API_BASE_URL jika path gambar tidak absolute
          const imageUrl = data.image_url.startsWith('http') 
            ? data.image_url 
            : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/${data.image_url}`;
          setImagePreview(imageUrl);
        }
        
        setFetchLoading(false);
      } catch (err) {
        console.error("Error fetching TUKS data:", err);
        setFetchError(err.message || "Terjadi kesalahan saat memuat data TUKS");
        setFetchLoading(false);
        toast.error(err.message || "Gagal memuat data TUKS");
      }
    };
    
    fetchTuksData();
  }, [id, API_URL]);

  // Konfigurasi Dropzone untuk upload gambar
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setImageFile(file);
        
        // Membuat preview gambar
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles[0]?.errors[0]?.code === "file-too-large") {
        toast.error("Ukuran gambar terlalu besar (maks. 5MB)");
      } else {
        toast.error("Format file tidak didukung. Gunakan JPG, PNG, atau GIF");
      }
    }
  });

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Bersihkan error untuk field yang diubah
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Handle perubahan select type
  const handleTypeChange = (value) => {
    setFormData({ ...formData, type: value });
    
    // Bersihkan error untuk field type
    if (errors.type) {
      setErrors({ ...errors, type: null });
    }
  };

  // Reset gambar yang dipilih
  const handleClearImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(currentImage); // Kembalikan ke gambar saat ini
  };

  // Validasi form sebelum submit
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nama TUKS wajib diisi";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Alamat wajib diisi";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = "Nomor telepon hanya boleh berisi angka, +, - atau spasi";
    }
    
    if (!formData.type) {
      newErrors.type = "Tipe TUKS wajib dipilih";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Kirim data ke API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Mohon perbaiki kesalahan pada formulir");
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const formDataObj = new FormData();
      
      // Tambahkan semua field ke FormData
      formDataObj.append('name', formData.name);
      formDataObj.append('address', formData.address);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('type', formData.type);
      
      // Tambahkan gambar jika ada yang baru diupload
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }
      
      // Tambahkan _method untuk simulasi PUT dengan FormData
      formDataObj.append('_method', 'PUT');
      
      const response = await fetch(`${API_URL}/tuks/${id}`, {
        method: 'POST', // Tetap gunakan POST karena kita menggunakan FormData dengan _method: PUT
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          // Tidak perlu Content-Type, FormData akan menetapkannya secara otomatis
        },
        body: formDataObj,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Jika server mengembalikan error validasi
        if (response.status === 422 && result.errors) {
          setErrors(result.errors);
          throw new Error(result.message || "Validasi gagal");
        } else {
          throw new Error(result.message || "Gagal mengupdate TUKS");
        }
      }
      
      toast.success("TUKS berhasil diperbarui");
      navigate(-1); // Kembali ke halaman sebelumnya
    } catch (err) {
      console.error("Error updating TUKS:", err);
      toast.error(err.message || "Terjadi kesalahan saat memperbarui TUKS");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          <span className="ml-2">Memuat data...</span>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{fetchError}</p>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <FiArrowLeft /> Kembali
        </Button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Tempat Uji Kompetensi</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Nama TUKS */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama TUKS <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama TUKS"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            
            {/* Alamat */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            
            {/* Nomor Telepon */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            
            {/* Tipe TUKS */}
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Tipe TUKS <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Pilih tipe TUKS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mandiri">Mandiri</SelectItem>
                  <SelectItem value="Sewaktu">Sewaktu</SelectItem>
                  <SelectItem value="Jaringan">Jaringan</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
            </div>
            
            {/* Upload Gambar */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar TUKS
              </label>
              
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-6 cursor-pointer text-center
                  transition-colors hover:border-gray-400
                  ${imagePreview ? "border-green-500 bg-green-50" : errors.image ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"}
                `}
              >
                <input {...getInputProps()} />
                
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded"
                    />
                    {imageFile && (
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">
                      Klik atau seret gambar ke area ini untuk mengunggah
                    </p>
                    <p className="text-xs text-gray-500">
                      Format yang didukung: JPG, PNG, GIF (Maks. 5MB)
                    </p>
                  </div>
                )}
              </div>
              
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}
              
              {currentImage && !imageFile && (
                <p className="text-sm text-gray-500 mt-1">
                  *Biarkan kosong jika tidak ingin mengubah gambar
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTuks;
