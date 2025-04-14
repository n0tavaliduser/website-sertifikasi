import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateNews = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: ""
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [authorImageFile, setAuthorImageFile] = useState(null);
  const [authorImagePreview, setAuthorImagePreview] = useState(null);
  
  // Rich text editor modules dan formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link',
  ];

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Handle untuk upload gambar berita
  const onDropImage = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setImageFile(file);
    
    // Preview gambar
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    // Clean up URL object on unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive
  } = useDropzone({
    onDrop: onDropImage,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
    },
    maxFiles: 1,
    maxSize: 2097152 // 2MB
  });

  // Handle untuk upload gambar penulis
  const onDropAuthorImage = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setAuthorImageFile(file);
    
    // Preview gambar
    const objectUrl = URL.createObjectURL(file);
    setAuthorImagePreview(objectUrl);
    
    // Clean up URL object on unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const {
    getRootProps: getAuthorImageRootProps,
    getInputProps: getAuthorImageInputProps,
    isDragActive: isAuthorImageDragActive
  } = useDropzone({
    onDrop: onDropAuthorImage,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
    },
    maxFiles: 1,
    maxSize: 2097152 // 2MB
  });

  // Handle input perubahan form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle perubahan deskripsi (rich text)
  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
    
    // Clear error for description when user types
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: null }));
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Judul berita wajib diisi";
    } else if (formData.title.length > 255) {
      newErrors.title = "Judul berita maksimal 255 karakter";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Konten berita wajib diisi";
    }
    
    if (!formData.author.trim()) {
      newErrors.author = "Nama penulis wajib diisi";
    } else if (formData.author.length > 255) {
      newErrors.author = "Nama penulis maksimal 255 karakter";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Mohon periksa kembali form Anda");
      return;
    }
    
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('author', formData.author);
      
      if (imageFile) {
        formDataToSend.append('image_url', imageFile);
      }
      
      if (authorImageFile) {
        formDataToSend.append('author_image', authorImageFile);
      }
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (result.errors) {
          // Map backend validation errors to our format
          const backendErrors = {};
          Object.keys(result.errors).forEach(key => {
            backendErrors[key] = result.errors[key][0];
          });
          setErrors(backendErrors);
          throw new Error("Validasi gagal");
        } else {
          throw new Error(result.message || "Gagal menambahkan berita");
        }
      }
      
      toast.success("Berita berhasil ditambahkan");
      navigate("/admin/news");
    } catch (err) {
      console.error("Error adding news:", err);
      toast.error(err.message || "Terjadi kesalahan saat menambahkan berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/news")}
          className="mr-4"
        >
          <FiArrowLeft className="mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold">Tambah Berita Baru</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Judul Berita */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Berita <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Masukkan judul berita"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            {/* Konten Berita */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konten Berita <span className="text-red-500">*</span>
              </label>
              <div className={`${errors.description ? "border border-red-500 rounded-md" : ""}`}>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  modules={modules}
                  formats={formats}
                  placeholder="Tulis konten berita di sini..."
                  className="min-h-[200px]"
                />
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            
            {/* Gambar Berita */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar Berita
              </label>
              <div 
                {...getImageRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isImageDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getImageInputProps()} />
                
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
                    <FiUpload className="h-10 w-10 text-gray-400 mb-2" />
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
            
            {/* Nama Penulis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Penulis <span className="text-red-500">*</span>
              </label>
              <Input
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Masukkan nama penulis"
                className={errors.author ? "border-red-500" : ""}
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-500">{errors.author}</p>
              )}
            </div>
            
            {/* Foto Penulis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto Penulis
              </label>
              <div 
                {...getAuthorImageRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isAuthorImageDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getAuthorImageInputProps()} />
                
                {authorImagePreview ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                      <img 
                        src={authorImagePreview} 
                        alt="Author Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAuthorImageFile(null);
                        setAuthorImagePreview(null);
                      }}
                      className="flex items-center"
                    >
                      <FiX className="mr-1" /> Hapus Foto
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Klik atau drag & drop untuk upload foto penulis
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, JPEG, GIF hingga 2MB
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tombol Submit */}
            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/news")}
                className="mr-2"
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan Berita"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
