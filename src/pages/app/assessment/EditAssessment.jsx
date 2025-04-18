import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FiSave, FiArrowLeft, FiLoader } from "react-icons/fi";

const EditAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    assessment_status: '',
    assessment_date: '',
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
            assessment_status: result.data.assessment_status || '',
            assessment_date: result.data.assessment_date || '',
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

  // Handle form field changes
  const handleStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      assessment_status: value
    }));
  };

  const handleDateChange = (e) => {
    setFormData(prev => ({
      ...prev,
      assessment_date: e.target.value
    }));
  };

  const handleNoteChange = (e) => {
    setFormData(prev => ({
      ...prev,
      assessment_note: e.target.value
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
        <Button onClick={() => navigate('/admin/assessment')} variant="outline">
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
        <Button onClick={() => navigate('/admin/assessment')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Status Asesmen</h1>
        <Button onClick={() => navigate('/admin/assessment')} variant="outline">
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Perbarui status dan jadwal asesmen</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status Asesmen</label>
                  <Select 
                    value={formData.assessment_status} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Menunggu Verifikasi</SelectItem>
                      <SelectItem value="rejected">Ditolak</SelectItem>
                      <SelectItem value="approved">Disetujui</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="py-1">
                    {formData.assessment_status && (
                      <div className="mt-1">
                        Status: {renderStatusBadge(formData.assessment_status)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tanggal Asesmen</label>
                  <Input
                    type="date"
                    value={formData.assessment_date ? formData.assessment_date.split('T')[0] : ''}
                    onChange={handleDateChange}
                    className="w-full"
                  />
                </div>
                
                {/* Notes Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catatan</label>
                  <textarea
                    rows={4}
                    value={formData.assessment_note}
                    onChange={handleNoteChange}
                    placeholder="Tambahkan catatan jika diperlukan"
                    className="w-full px-3 py-2 border rounded-md"
                  />
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
                      <FiSave className="mr-2 h-4 w-4" /> Simpan Perubahan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Assessment Info Card */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Asesmen</CardTitle>
              <CardDescription>Detail pengajuan asesmen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Profil Peserta</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nama Lengkap</p>
                      <p className="font-medium">{assessment.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{assessment.email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium">{assessment.phone_number || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">NIK</p>
                      <p className="font-medium">{assessment.identity_number || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pendidikan Terakhir</p>
                      <p className="font-medium">{assessment.last_education_level || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alamat</p>
                      <p className="font-medium">{assessment.address || '-'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Schema Info */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Detail Sertifikasi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Skema Sertifikasi</p>
                      <p className="font-medium">{assessment.schema?.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Metode</p>
                      <p className="font-medium capitalize">{assessment.method || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status Saat Ini</p>
                      <p className="font-medium">{renderStatusBadge(assessment.assessment_status)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Asesmen Saat Ini</p>
                      <p className="font-medium">{formatDate(assessment.assessment_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Pendaftaran</p>
                      <p className="font-medium">{formatDate(assessment.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Terakhir Diperbarui</p>
                      <p className="font-medium">{formatDate(assessment.updated_at)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Document Status */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Status Dokumen</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${assessment.identity_card_path ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-sm">KTP: {assessment.identity_card_path ? 'Tersedia' : 'Belum Diunggah'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${assessment.self_photo_path ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-sm">Pas Foto: {assessment.self_photo_path ? 'Tersedia' : 'Belum Diunggah'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${assessment.last_education_certificate_path ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-sm">Ijazah: {assessment.last_education_certificate_path ? 'Tersedia' : 'Belum Diunggah'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${assessment.family_card_path ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-sm">Kartu Keluarga: {assessment.family_card_path ? 'Tersedia' : 'Belum Diunggah'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${assessment.apl01_path ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-sm">APL 01: {assessment.apl01_path ? 'Tersedia' : 'Belum Diunggah'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${assessment.apl02_path ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-sm">APL 02: {assessment.apl02_path ? 'Tersedia' : 'Belum Diunggah'}</p>
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

export default EditAssessment;
