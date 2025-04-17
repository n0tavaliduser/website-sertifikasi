import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaSpinner, FaExclamationCircle, FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

// Import komponen form
import Personal from './Personal';
import Scheme from './Scheme';
import DocumentUpload from './DocumentUpload';
import Confirmation from './Confirmation';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Assessment = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  // State untuk melacak langkah form
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // State loading dan error
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Data form terpusat
  const [formData, setFormData] = useState({
    // Personal data
    fullName: '',
    idNumber: '',
    birthPlace: '',
    birthDate: '',
    gender: '',
    nationality: 'Indonesia',
    address: '',
    postalCode: '',
    phone: '',
    email: '',
    education: '',
    position: '',
    companyName: '',
    
    // Scheme data
    schemaId: '',
    assessmentPurpose: 'sertifikasi',
    certificateNumber: '',
    
    // Document data
    lastDiploma: null,
    idCard: null,
    familyCard: null,
    photo: null,
    instanceSupport: null,
    apl01: null,
    apl02: null,
    supportingDocuments: [],
    
    // Confirmation
    dataCorrect: false,
    requestCertificate: false
  });
  
  // State untuk error form
  const [formErrors, setFormErrors] = useState({});
  
  // Cek autentikasi
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    } else if (user && user.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
    
    // Jika pengguna sudah login, pra-isi data dari profil
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [isLoggedIn, user, navigate]);
  
  // Handler untuk perubahan data form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for the field being changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Validasi form berdasarkan langkah
  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      // Validate personal data
      if (!formData.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi';
      if (!formData.idNumber.trim()) errors.idNumber = 'Nomor KTP wajib diisi';
      if (!formData.birthPlace.trim()) errors.birthPlace = 'Tempat lahir wajib diisi';
      if (!formData.birthDate) errors.birthDate = 'Tanggal lahir wajib diisi';
      if (!formData.gender) errors.gender = 'Jenis kelamin wajib dipilih';
      if (!formData.address.trim()) errors.address = 'Alamat wajib diisi';
      if (!formData.phone.trim()) errors.phone = 'Nomor telepon wajib diisi';
      if (!formData.email.trim()) {
        errors.email = 'Email wajib diisi';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Format email tidak valid';
      }
      if (!formData.education) errors.education = 'Pendidikan terakhir wajib dipilih';
    } else if (step === 2) {
      // Validate scheme data
      if (!formData.schemaId) errors.schemaId = 'Skema sertifikasi wajib dipilih';
      if (!formData.assessmentPurpose) errors.assessmentPurpose = 'Tujuan asesmen wajib dipilih';
      if (formData.assessmentPurpose === 'resertifikasi' && !formData.certificateNumber.trim()) {
        errors.certificateNumber = 'Nomor sertifikat sebelumnya wajib diisi';
      }
    } else if (step === 3) {
      // Validasi dokumen
      if (!formData.lastDiploma) errors.lastDiploma = 'Ijazah terakhir harus diunggah';
      if (!formData.idCard) errors.idCard = 'KTP harus diunggah';
      if (!formData.familyCard) errors.familyCard = 'Kartu keluarga harus diunggah';
      if (!formData.photo) errors.photo = 'Pas foto harus diunggah';
      if (!formData.instanceSupport) errors.instanceSupport = 'Surat dukungan instansi harus diunggah';
      if (!formData.apl01) errors.apl01 = 'APL 01 harus diunggah';
      if (!formData.apl02) errors.apl02 = 'APL 02 harus diunggah';
    } else if (step === 4) {
      // Validasi konfirmasi
      if (!formData.dataCorrect) errors.dataCorrect = 'Anda harus menyetujui kebenaran data';
      if (!formData.requestCertificate) errors.requestCertificate = 'Anda harus mengajukan permohonan sertifikat';
    }
    
    return errors;
  };
  
  // Pindah ke langkah berikutnya
  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length === 0) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setFormErrors(errors);
    }
  };
  
  // Kembali ke langkah sebelumnya
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Submit data asesmen
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Anda harus login terlebih dahulu');
        navigate('/login');
        return;
      }
      
      const response = await fetch(`${API_URL}/api/assessments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Terjadi kesalahan saat mengirim data');
      }
      
      toast.success('Pendaftaran asesmen berhasil dikirimkan');
      navigate('/dashboard/assessments');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error(error.message || 'Terjadi kesalahan saat mengirim pendaftaran asesmen');
    } finally {
      setLoading(false);
    }
  };
  
  // Render berbeda berdasarkan langkah saat ini
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Personal formData={formData} formErrors={formErrors} handleChange={handleChange} />;
      case 2:
        return <Scheme formData={formData} formErrors={formErrors} handleChange={handleChange} />;
      case 3:
        return <DocumentUpload formData={formData} formErrors={formErrors} handleChange={handleChange} />;
      case 4:
        return <Confirmation formData={formData} formErrors={formErrors} handleChange={handleChange} />;
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-600 text-4xl mb-4" />
        <p className="text-gray-600">Memuat formulir asesmen...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaChevronLeft className="mr-2" /> Kembali ke Beranda
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-white text-xl font-bold">Pendaftaran Asesmen</h1>
        </div>
        
        <div className="p-6">
          {/* Step indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > 1 ? <FaCheck /> : 1}
                </div>
                <div className="text-sm font-medium ml-2">Data Pribadi</div>
              </div>
              
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <div className="text-sm font-medium ml-2">Pilihan Skema</div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  <FaChevronLeft className="mr-2" /> Sebelumnya
                </button>
              )}
              
              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  Selanjutnya <FaChevronRight className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto px-6 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Memproses...
                    </>
                  ) : (
                    <>
                      Kirim Pendaftaran <FaCheck className="ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Assessment; 