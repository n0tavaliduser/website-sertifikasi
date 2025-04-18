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
  CardFooter, 
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
import { FiSave, FiArrowLeft, FiLoader, FiUser, FiFileText, FiCalendar } from "react-icons/fi";

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
    assessment_note: ''
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
            assessment_note: result.data.assessment_note || ''
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
      
      const response = await fetch(`${API_URL}/assessee/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
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
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="personal" className="flex items-center">
              <FiUser className="mr-2" /> Data Pribadi
            </TabsTrigger>
            <TabsTrigger value="certification" className="flex items-center">
              <FiFileText className="mr-2" /> Data Sertifikasi
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center">
              <FiCalendar className="mr-2" /> Jadwal Asesmen
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
