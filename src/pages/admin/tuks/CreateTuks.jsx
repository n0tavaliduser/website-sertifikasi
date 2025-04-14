import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateTuks = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    type: "",
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    setImagePreview(null);
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
    
    if (!imageFile) {
      newErrors.image = "Gambar TUKS wajib diunggah";
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
      
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }
      
      const response = await fetch(`${API_URL}/tuks`, {
        method: 'POST',
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
          throw new Error(result.message || "Gagal menambahkan TUKS");
        }
      }
      
      toast.success("TUKS berhasil ditambahkan");
      navigate(-1); // Kembali ke halaman sebelumnya
    } catch (err) {
      console.error("Error adding TUKS:", err);
      toast.error(err.message || "Terjadi kesalahan saat menambahkan TUKS");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold mb-6">Tambah Tempat Uji Kompetensi</h1>
        
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
                Gambar TUKS <span className="text-red-500">*</span>
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
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
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
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTuks;
