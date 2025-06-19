import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { FiSave, FiArrowLeft, FiLoader, FiUser, FiFileText, FiCalendar, FiFile } from "react-icons/fi";

const EditAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [error, setError] = useState(null);
  const [instances, setInstances] = useState([]);
  const [schemas, setSchemas] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    // Data personal
    name: '',
    email: '',
    phone_number: '',
    address: '',
    identity_number: '',
    birth_date: '',
    birth_place: '',
    last_education_level: '',
    instance_id: '',
    
    // Data sertifikasi
    schema_id: '',
    method: '',
    assessment_date: '',
    
    // Status asesmen (tidak diedit)
    assessment_status: '',
    assessment_note: '',

    // Dokumen
    lastDiploma: null,
    idCard: null,
    familyCard: null,
    photo: null,
    instanceSupport: null,
    apl01: null,
    apl02: null,
    supportingDocuments: []
  });

  // API URL
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessment = async () => {
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
          setAssessment(result.data);
          setFormData({
            // Data personal
            name: result.data.name || '',
            email: result.data.email || '',
            phone_number: result.data.phone_number || '',
            address: result.data.address || '',
            identity_number: result.data.identity_number || '',
            birth_date: result.data.birth_date ? result.data.birth_date.split('T')[0] : '',
            birth_place: result.data.birth_place || '',
            last_education_level: result.data.last_education_level || '',
            instance_id: result.data.instance_id || '',
            
            // Data sertifikasi
            schema_id: result.data.schema_id || '',
            method: result.data.method || '',
            assessment_date: result.data.assessment_date ? result.data.assessment_date.split('T')[0] : '',
            
            // Status asesmen (tidak diedit tapi ditampilkan)
            assessment_status: result.data.assessment_status || '',
            assessment_note: result.data.assessment_note || '',

            // Dokumen (tampilkan jika ada)
            lastDiploma: result.data.lastDiploma || null,
            idCard: result.data.idCard || null,
            familyCard: result.data.familyCard || null,
            photo: result.data.photo || null,
            instanceSupport: result.data.instanceSupport || null,
            apl01: result.data.apl01 || null,
            apl02: result.data.apl02 || null,
            supportingDocuments: result.data.supportingDocuments || []
          });
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

    if (id) {
      fetchAssessment();
    }
  }, [id, API_URL]);

  // Fetch instances and schemas data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch instances
        const instancesResponse = await fetch(`${API_URL}/instances-reference`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (instancesResponse.ok) {
          const instancesResult = await instancesResponse.json();
          if (instancesResult.success && instancesResult.data) {
            setInstances(instancesResult.data);
          }
        }
        
        // Fetch schemas
        const schemasResponse = await fetch(`${API_URL}/schemas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (schemasResponse.ok) {
          const schemasResult = await schemasResponse.json();
          if (schemasResult.success && schemasResult.data) {
            setSchemas(schemasResult.data);
          }
        }
      } catch (err) {
        console.error("Error fetching reference data:", err);
      }
    };
    
    fetchData();
  }, [API_URL]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          // Handle file objects
          if (formData[key] instanceof File) {
            formDataToSend.append(key, formData[key]);
          }
          // Handle arrays (supporting documents)
          else if (Array.isArray(formData[key])) {
            formData[key].forEach((item, index) => {
              if (item instanceof File) {
                formDataToSend.append(`${key}[${index}]`, item);
              } else {
                formDataToSend.append(`${key}[${index}]`, item);
              }
            });
          }
          // Handle regular form fields
          else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });
      
      // Add _method for Laravel PUT request
      formDataToSend.append('_method', 'PUT');
      
      const response = await fetch(`${API_URL}/assessee/${id}`, {
        method: 'POST', // Use POST with _method=PUT for file uploads
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
          // Don't set Content-Type, let browser set it with boundary for multipart/form-data
        },
        body: formDataToSend
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        alert("Data asesmen berhasil diperbarui");
        navigate('/app/assessee');
      } else {
        throw new Error(result.message || "Gagal memperbarui data asesmen");
      }
    } catch (error) {
      console.error("Error updating assessment:", error);
      alert(error.message || "Terjadi kesalahan saat memperbarui data");
    } finally {
      setSaving(false);
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle supporting document add
  const handleSupportingDocumentAdd = (e) => {
    if (!e.target.files.length) return;
    
    const newFiles = Array.from(e.target.files);
    
    // Validasi tipe dan ukuran file
    let validFiles = true;
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    newFiles.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File "${file.name}" tidak didukung. Silakan unggah file dalam format PDF, JPG, JPEG, atau PNG.`);
        validFiles = false;
        return;
      }
      
      if (file.size > maxSize) {
        alert(`File "${file.name}" terlalu besar. Maksimal 5MB.`);
        validFiles = false;
        return;
      }
    });
    
    if (!validFiles) {
      e.target.value = '';
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      supportingDocuments: [...prev.supportingDocuments, ...newFiles]
    }));
    
    // Reset input
    e.target.value = '';
  };

  // Handle remove supporting document
  const handleRemoveSupportingDocument = (index) => {
    setFormData(prev => {
      const updatedFiles = [...prev.supportingDocuments];
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        supportingDocuments: updatedFiles
      };
    });
  };

  // Handle download template
  const handleDownloadTemplate = async (e, templateType) => {
    try {
      // Mencegah default behavior dan event propagation
      e.preventDefault();
      e.stopPropagation();
      
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // URL endpoint tergantung jenis template
      let endpoint = '';
      switch(templateType) {
        case 'apl01':
          endpoint = `/assessee/template/download/apl01`;
          break;
        case 'apl02': {
          // Default APL02 sesuai dengan metode yang dipilih
          const method = formData.method ? formData.method.toLowerCase() : '';
          let type = '';
          
          // Konversi nama metode sesuai dengan yang diharapkan backend
          if (method === 'observasi') {
            type = 'observation';
          } else if (method === 'portofolio') {
            type = 'portofolio';
          } else {
            throw new Error('Metode asesmen tidak valid. Pilih metode observasi atau portofolio.');
          }
          
          endpoint = `/assessee/template/download/apl02?type=${type}`;
          break;
        }
        default:
          throw new Error('Jenis template tidak valid');
      }
      
      console.log(`Downloading template from: ${API_URL}${endpoint}`);
      
      // Proses download template
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/octet-stream'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Mendapatkan nama file dari header
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'template.pdf';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }
      
      // Download file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert("Template " + templateType.toUpperCase() + " berhasil diunduh.");
    } catch (error) {
      console.error(`Error downloading ${templateType} template:`, error);
      alert({
        title: "Gagal",
        description: error.message || `Gagal mengunduh template ${templateType.toUpperCase()}.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Render status badge
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
        <Button onClick={() => navigate('/app/assessee')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
          Data asesmen tidak ditemukan
        </div>
        <Button onClick={() => navigate('/app/assessee')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Data Asesmen</h1>
        <Button onClick={() => navigate('/app/assessee')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <p className="text-sm font-medium">Status Asesmen:</p>
          {renderStatusBadge(assessment.assessment_status)}
        </div>

        {assessment.assessment_status === 'rejected' && assessment.assessment_note && (
          <div className="bg-red-50 p-3 rounded-md border border-red-200">
            <p className="text-sm font-medium text-red-800">Catatan Penolakan:</p>
            <p className="text-sm text-red-700">{assessment.assessment_note}</p>
          </div>
        )}

        {assessment.assessment_status === 'approved' && assessment.assessment_note && (
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
            <p className="text-sm font-medium text-blue-800">Catatan Persetujuan:</p>
            <p className="text-sm text-blue-700">{assessment.assessment_note}</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="personal" className="flex items-center">
              <FiUser className="mr-2" /> Data Pribadi
            </TabsTrigger>
            <TabsTrigger value="certification" className="flex items-center">
              <FiFileText className="mr-2" /> Data Sertifikasi
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center">
              <FiCalendar className="mr-2" /> Jadwal Asesmen
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <FiFile className="mr-2" /> Dokumen
            </TabsTrigger>
          </TabsList>
          
          {/* Tab Data Pribadi */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Data Pribadi</CardTitle>
                <CardDescription>Edit informasi pribadi asesi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Lengkap</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masukkan email"
                    />
                  </div>
                  
                  {/* Nomor Telepon */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nomor Telepon</label>
                    <Input
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>
                  
                  {/* NIK */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">NIK / No. KTP</label>
                    <Input
                      name="identity_number"
                      value={formData.identity_number}
                      onChange={handleInputChange}
                      placeholder="Masukkan 16 digit NIK"
                    />
                  </div>
                  
                  {/* Tempat Lahir */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tempat Lahir</label>
                    <Input
                      name="birth_place"
                      value={formData.birth_place}
                      onChange={handleInputChange}
                      placeholder="Masukkan tempat lahir"
                    />
                  </div>
                  
                  {/* Tanggal Lahir */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal Lahir</label>
                    <Input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  {/* Pendidikan Terakhir */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pendidikan Terakhir</label>
                    <Select 
                      value={formData.last_education_level} 
                      onValueChange={(value) => handleSelectChange('last_education_level', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih pendidikan terakhir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SD">SD</SelectItem>
                        <SelectItem value="SMP">SMP</SelectItem>
                        <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                        <SelectItem value="D1">D1</SelectItem>
                        <SelectItem value="D2">D2</SelectItem>
                        <SelectItem value="D3">D3</SelectItem>
                        <SelectItem value="D4">D4</SelectItem>
                        <SelectItem value="S1">S1</SelectItem>
                        <SelectItem value="S2">S2</SelectItem>
                        <SelectItem value="S3">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Instansi */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instansi</label>
                    <Select 
                      value={formData.instance_id ? formData.instance_id.toString() : ''} 
                      onValueChange={(value) => handleSelectChange('instance_id', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih instansi" />
                      </SelectTrigger>
                      <SelectContent>
                        {instances.map(instance => (
                          <SelectItem key={instance.id} value={instance.id.toString()}>
                            {instance.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Alamat */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alamat</label>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Data Sertifikasi */}
          <TabsContent value="certification">
            <Card>
              <CardHeader>
                <CardTitle>Data Sertifikasi</CardTitle>
                <CardDescription>Edit informasi skema dan metode sertifikasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skema Sertifikasi */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skema Sertifikasi</label>
                    <Select 
                      value={formData.schema_id ? formData.schema_id.toString() : ''} 
                      onValueChange={(value) => handleSelectChange('schema_id', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih skema sertifikasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {schemas.map(schema => (
                          <SelectItem key={schema.id} value={schema.id.toString()}>
                            {schema.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Metode Sertifikasi */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Metode Sertifikasi</label>
                    <Select 
                      value={formData.method} 
                      onValueChange={(value) => handleSelectChange('method', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih metode sertifikasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="observasi">Observasi</SelectItem>
                        <SelectItem value="portofolio">Portofolio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Jadwal Asesmen */}
          <TabsContent value="assessment">
            <Card>
              <CardHeader>
                <CardTitle>Jadwal Asesmen</CardTitle>
                <CardDescription>Edit jadwal pelaksanaan asesmen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tanggal Asesmen */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tanggal Asesmen</label>
                  <Input
                    type="date"
                    name="assessment_date"
                    value={formData.assessment_date}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Dokumen */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Dokumen Asesmen</CardTitle>
                <CardDescription>Kelola dokumen-dokumen asesmen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <h3 className="font-semibold text-blue-700 mb-2">Dokumen Asesmen</h3>
                  <p className="text-sm text-blue-800">
                    Kelola dokumen-dokumen pendukung asesmen seperti ijazah, KTP, kartu keluarga, foto, surat dukungan instansi, dan formulir APL.
                  </p>
                </div>

                {/* Formulir APL */}
                <div className="space-y-6">
                  <h3 className="font-medium text-lg mb-3">Formulir APL</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* APL 01 */}
                    <div className="p-4 border rounded-md space-y-4">
                      <h4 className="font-medium">APL 01 - Formulir Permohonan Sertifikasi</h4>
                      <p className="text-sm text-gray-500">
                        APL 01 adalah formulir permohonan sertifikasi kompetensi yang berisi data pribadi, data pekerjaan, dan tujuan asesmen.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="mt-1 flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={(e) => handleDownloadTemplate(e, 'apl01')}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none flex items-center"
                            disabled={!formData.schema_id}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Template
                          </button>
                          {!formData.schema_id && (
                            <span className="text-xs text-amber-600">Pilih skema sertifikasi terlebih dahulu</span>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload APL 01 yang Sudah Diisi <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center">
                            <input
                              type="file"
                              id="apl01"
                              name="apl01"
                              className="hidden"
                              onChange={(e) => handleFileChange({
                                target: {
                                  name: 'apl01',
                                  value: e.target.files[0]
                                }
                              })}
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById('apl01').click()}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                              {formData.apl01 ? 'Ganti File' : 'Upload File'}
                            </button>
                            {formData.apl01 && (
                              <span className="ml-2 text-sm text-gray-500">
                                {typeof formData.apl01 === 'string' 
                                  ? formData.apl01
                                  : formData.apl01.name}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Upload file APL 01 yang sudah diisi dan ditandatangani (PDF)
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* APL 02 */}
                    <div className="p-4 border rounded-md space-y-4">
                      <h4 className="font-medium">APL 02 - Asesmen Mandiri</h4>
                      <p className="text-sm text-gray-500">
                        APL 02 adalah dokumen asesmen mandiri di mana peserta menilai kemampuan dirinya terhadap unit kompetensi yang akan diujikan.
                      </p>
                      
                      {/* Tampilkan pesan jika status belum approved */}
                      {assessment.assessment_status !== 'approved' && (
                        <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <strong>Catatan:</strong> Upload APL02 hanya tersedia setelah pendaftaran disetujui oleh admin.
                          </p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <div className="mt-1 flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={(e) => handleDownloadTemplate(e, 'apl02')}
                            className={`px-4 py-2 rounded-md focus:outline-none flex items-center ${
                              !formData.schema_id || !formData.method || assessment.assessment_status !== 'approved'
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                            disabled={!formData.schema_id || !formData.method || assessment.assessment_status !== 'approved'}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Template
                          </button>
                          {assessment.assessment_status !== 'approved' && (
                            <span className="text-xs text-amber-600">Menunggu persetujuan admin</span>
                          )}
                          {assessment.assessment_status === 'approved' && !formData.method && (
                            <span className="text-xs text-amber-600">Pilih metode asesmen terlebih dahulu</span>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload APL 02 yang Sudah Diisi <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center">
                            <input
                              type="file"
                              id="apl02"
                              name="apl02"
                              className="hidden"
                              onChange={(e) => handleFileChange({
                                target: {
                                  name: 'apl02',
                                  value: e.target.files[0]
                                }
                              })}
                              accept=".pdf,.jpg,.jpeg,.png"
                              disabled={assessment.assessment_status !== 'approved'}
                            />
                            <button
                              type="button"
                              onClick={() => assessment.assessment_status === 'approved' && document.getElementById('apl02').click()}
                              className={`px-4 py-2 rounded-md focus:outline-none ${
                                assessment.assessment_status !== 'approved'
                                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                              disabled={assessment.assessment_status !== 'approved'}
                            >
                              {formData.apl02 ? 'Ganti File' : 'Upload File'}
                            </button>
                            {formData.apl02 && (
                              <span className="ml-2 text-sm text-gray-500">
                                {typeof formData.apl02 === 'string' 
                                  ? formData.apl02
                                  : formData.apl02.name}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {assessment.assessment_status === 'approved' 
                              ? 'Upload file APL 02 yang sudah diisi dan ditandatangani (PDF)'
                              : 'Upload APL02 akan tersedia setelah pendaftaran disetujui'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mt-8">
                  <h3 className="font-medium text-lg mb-3">Dokumen Wajib</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ijazah Terakhir */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Ijazah Terakhir <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="file"
                          id="lastDiploma"
                          name="lastDiploma"
                          className="hidden"
                          onChange={(e) => handleFileChange({
                            target: {
                              name: 'lastDiploma',
                              value: e.target.files[0]
                            }
                          })}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('lastDiploma').click()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                          {formData.lastDiploma ? 'Ganti File' : 'Upload File'}
                        </button>
                        {formData.lastDiploma && (
                          <span className="ml-2 text-sm text-gray-500">
                            {typeof formData.lastDiploma === 'string' 
                              ? formData.lastDiploma
                              : formData.lastDiploma.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* KTP */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        KTP <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="file"
                          id="idCard"
                          name="idCard"
                          className="hidden"
                          onChange={(e) => handleFileChange({
                            target: {
                              name: 'idCard',
                              value: e.target.files[0]
                            }
                          })}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('idCard').click()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                          {formData.idCard ? 'Ganti File' : 'Upload File'}
                        </button>
                        {formData.idCard && (
                          <span className="ml-2 text-sm text-gray-500">
                            {typeof formData.idCard === 'string' 
                              ? formData.idCard
                              : formData.idCard.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Kartu Keluarga */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Kartu Keluarga <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="file"
                          id="familyCard"
                          name="familyCard"
                          className="hidden"
                          onChange={(e) => handleFileChange({
                            target: {
                              name: 'familyCard',
                              value: e.target.files[0]
                            }
                          })}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('familyCard').click()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                          {formData.familyCard ? 'Ganti File' : 'Upload File'}
                        </button>
                        {formData.familyCard && (
                          <span className="ml-2 text-sm text-gray-500">
                            {typeof formData.familyCard === 'string' 
                              ? formData.familyCard
                              : formData.familyCard.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Pas Foto */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Pas Foto (Latar Belakang Merah) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          className="hidden"
                          onChange={(e) => handleFileChange({
                            target: {
                              name: 'photo',
                              value: e.target.files[0]
                            }
                          })}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('photo').click()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                          {formData.photo ? 'Ganti File' : 'Upload File'}
                        </button>
                        {formData.photo && (
                          <span className="ml-2 text-sm text-gray-500">
                            {typeof formData.photo === 'string' 
                              ? formData.photo
                              : formData.photo.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Surat Dukungan Instansi */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Surat Dukungan Instansi <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="file"
                          id="instanceSupport"
                          name="instanceSupport"
                          className="hidden"
                          onChange={(e) => handleFileChange({
                            target: {
                              name: 'instanceSupport',
                              value: e.target.files[0]
                            }
                          })}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('instanceSupport').click()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                          {formData.instanceSupport ? 'Ganti File' : 'Upload File'}
                        </button>
                        {formData.instanceSupport && (
                          <span className="ml-2 text-sm text-gray-500">
                            {typeof formData.instanceSupport === 'string' 
                              ? formData.instanceSupport
                              : formData.instanceSupport.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Dokumen Pendukung */}
                  <div className="mt-8">
                    <h3 className="font-medium mb-3">Dokumen Pendukung</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Upload dokumen tambahan yang mendukung proses asesmen (sertifikat, hasil kerja, foto kegiatan, dll)
                    </p>
                    
                    {/* Daftar Dokumen Pendukung */}
                    {formData.supportingDocuments && formData.supportingDocuments.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Dokumen Terunggah:</h4>
                        <div className="space-y-2">
                          {formData.supportingDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                              <div className="flex items-center">
                                <FiFile className="text-gray-400 mr-2" />
                                <span className="text-sm">{typeof doc === 'string' ? doc : doc.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveSupportingDocument(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FiArrowLeft />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Upload Dokumen Pendukung */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Tambah Dokumen Pendukung
                      </label>
                      <div className="flex items-center">
                        <label className="flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer border-gray-300">
                          <div className="space-y-1 text-center">
                            <FiFile className="mx-auto h-6 w-6 text-gray-400" />
                            <div className="text-sm text-gray-500">
                              <span className="font-medium text-blue-600 hover:underline">
                                Tambah Dokumen
                              </span>
                              <p className="text-xs">PDF, JPG, atau PNG (Maks. 5MB)</p>
                            </div>
                          </div>
                          <input
                            id="supportingDocuments"
                            name="supportingDocuments"
                            type="file"
                            className="hidden"
                            onChange={handleSupportingDocumentAdd}
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        Anda dapat mengunggah beberapa dokumen sekaligus
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            className="flex items-center" 
            disabled={saving}
          >
            {saving ? (
              <>
                <FiLoader className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
              </>
            ) : (
              <>
                <FiSave className="mr-2 h-4 w-4" /> Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAssessment;
