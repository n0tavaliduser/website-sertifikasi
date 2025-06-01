import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FiSave, FiArrowLeft, FiLoader, FiUpload, FiFile } from "react-icons/fi";

const AssignAssesseeCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assessee, setAssessee] = useState(null);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    certificate_number: '',
    certificate_file: null
  });
  
  // Form errors
  const [formErrors, setFormErrors] = useState({});

  // API URL
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Fetch assessee data
  useEffect(() => {
    const fetchAssessee = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/assessee/${id}`, {
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
          // Memastikan assessee memiliki status approved
          if (!['approved', 'completed'].includes(result.data.assessment_status)) {
            setError("Asesi belum disetujui untuk mendapatkan sertifikat");
            setLoading(false);
            return;
          }
          
          setAssessee(result.data);
        } else {
          setError(result.message || "Gagal mendapatkan data asesi");
        }
      } catch (err) {
        console.error("Error fetching assessee data:", err);
        setError("Terjadi kesalahan saat mengambil data asesi");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssessee();
    }
  }, [id, API_URL]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors(prev => ({
          ...prev,
          certificate_file: "Ukuran file terlalu besar. Maksimal 5MB"
        }));
        return;
      }
      
      // Validasi tipe file
      const validTypes = ['application/pdf'];
      if (!validTypes.includes(file.type)) {
        setFormErrors(prev => ({
          ...prev,
          certificate_file: "Format file tidak didukung. Gunakan PDF"
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        certificate_file: file
      }));
      
      // Clear error for this field
      if (formErrors.certificate_file) {
        setFormErrors(prev => ({
          ...prev,
          certificate_file: null
        }));
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Validate form before submit
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    if (!formData.certificate_number.trim()) {
      errors.certificate_number = "Nomor sertifikat wajib diisi";
      isValid = false;
    }
    
    if (!formData.certificate_file) {
      errors.certificate_file = "File sertifikat wajib diunggah";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      const formDataToSend = new FormData();
      formDataToSend.append('assessee_id', id);
      formDataToSend.append('certificate_number', formData.certificate_number);
      formDataToSend.append('certificate_file', formData.certificate_file);
      
      const response = await fetch(`${API_URL}/certificates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        alert("Sertifikat berhasil ditambahkan untuk asesi");
        navigate('/app/certificate');
      } else {
        throw new Error(result.message || "Gagal menambahkan sertifikat");
      }
    } catch (error) {
      console.error("Error assigning certificate:", error);
      setError(error.message || "Terjadi kesalahan saat menambahkan sertifikat");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
        <Button onClick={() => navigate('/app/certificate')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
    );
  }

  if (!assessee) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
          Data asesi tidak ditemukan
        </div>
        <Button onClick={() => navigate('/app/certificate')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tambah Sertifikat</h1>
        <Button onClick={() => navigate('/app/certificate')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Form Sertifikat</CardTitle>
              <CardDescription>Tambahkan sertifikat untuk asesi</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Certificate Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nomor Sertifikat</label>
                  <Input
                    type="text"
                    name="certificate_number"
                    value={formData.certificate_number}
                    onChange={handleInputChange}
                    placeholder="Masukkan nomor sertifikat"
                    className={formErrors.certificate_number ? "border-red-500" : ""}
                  />
                  {formErrors.certificate_number && (
                    <p className="text-sm text-red-500">{formErrors.certificate_number}</p>
                  )}
                </div>
                
                {/* Certificate File */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">File Sertifikat (PDF)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      id="certificate_file"
                      name="certificate_file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label 
                      htmlFor="certificate_file"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      {formData.certificate_file ? (
                        <>
                          <FiFile className="h-10 w-10 text-green-600 mb-2" />
                          <span className="text-sm text-green-600 font-medium">
                            {formData.certificate_file.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {(formData.certificate_file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </>
                      ) : (
                        <>
                          <FiUpload className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            Klik untuk mengunggah file PDF
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            Maksimal 5MB
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                  {formErrors.certificate_file && (
                    <p className="text-sm text-red-500">{formErrors.certificate_file}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FiLoader className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2 h-4 w-4" /> Simpan Sertifikat
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Assessee Info Card */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Asesi</CardTitle>
              <CardDescription>Detail asesi yang akan mendapatkan sertifikat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Profil Peserta</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nama Lengkap</p>
                      <p className="font-medium">{assessee.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{assessee.email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium">{assessee.phone_number || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">NIK</p>
                      <p className="font-medium">{assessee.identity_number || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pendidikan Terakhir</p>
                      <p className="font-medium">{assessee.last_education_level || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alamat</p>
                      <p className="font-medium">{assessee.address || '-'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Schema Info */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Detail Sertifikasi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Skema Sertifikasi</p>
                      <p className="font-medium">{assessee.schema?.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Metode</p>
                      <p className="font-medium capitalize">{assessee.method || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Disetujui
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Asesmen</p>
                      <p className="font-medium">{formatDate(assessee.assessment_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Pendaftaran</p>
                      <p className="font-medium">{formatDate(assessee.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Terakhir Diperbarui</p>
                      <p className="font-medium">{formatDate(assessee.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignAssesseeCertificate;
