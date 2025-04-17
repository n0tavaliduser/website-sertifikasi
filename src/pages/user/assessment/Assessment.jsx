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

const Assessment = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL;
  
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
    nationality: '',
    address: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    education: '',
    position: '',
    companyName: '',
    
    // Scheme data
    schemaId: '',
    assessmentMethod: '',
    assessmentDate: '',
    
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
        phoneNumber: user.phone || ''
      }));
    }
  }, [isLoggedIn, user, navigate]);
  
  // Handler untuk perubahan data form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Hapus error untuk field yang diubah
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };
  
  // Validasi form berdasarkan langkah
  const validateForm = () => {
    const errors = {};
    
    if (currentStep === 1) {
      // Validasi data personal
      if (!formData.fullName) errors.fullName = 'Nama lengkap harus diisi';
      if (!formData.idNumber) errors.idNumber = 'Nomor KTP harus diisi';
      if (!formData.birthPlace) errors.birthPlace = 'Tempat lahir harus diisi';
      if (!formData.birthDate) errors.birthDate = 'Tanggal lahir harus diisi';
      if (!formData.gender) errors.gender = 'Jenis kelamin harus dipilih';
      if (!formData.nationality) errors.nationality = 'Kewarganegaraan harus diisi';
      if (!formData.address) errors.address = 'Alamat harus diisi';
      if (!formData.postalCode) errors.postalCode = 'Kode pos harus diisi';
      if (!formData.phoneNumber) errors.phoneNumber = 'Nomor telepon harus diisi';
      if (!formData.email) errors.email = 'Email harus diisi';
      if (!formData.education) errors.education = 'Pendidikan terakhir harus dipilih';
      if (!formData.position) errors.position = 'Jabatan harus diisi';
      if (!formData.companyName) errors.companyName = 'Nama instansi harus diisi';
    } else if (currentStep === 2) {
      // Validasi data skema
      if (!formData.schemaId) errors.schemaId = 'Skema sertifikasi harus dipilih';
      if (!formData.assessmentMethod) errors.assessmentMethod = 'Metode asesmen harus dipilih';
      if (!formData.assessmentDate) errors.assessmentDate = 'Tanggal asesmen harus dipilih';
    } else if (currentStep === 3) {
      // Validasi dokumen
      if (!formData.lastDiploma) errors.lastDiploma = 'Ijazah terakhir harus diunggah';
      if (!formData.idCard) errors.idCard = 'KTP harus diunggah';
      if (!formData.familyCard) errors.familyCard = 'Kartu keluarga harus diunggah';
      if (!formData.photo) errors.photo = 'Pas foto harus diunggah';
      if (!formData.instanceSupport) errors.instanceSupport = 'Surat dukungan instansi harus diunggah';
      if (!formData.apl01) errors.apl01 = 'APL 01 harus diunggah';
      if (!formData.apl02) errors.apl02 = 'APL 02 harus diunggah';
    } else if (currentStep === 4) {
      // Validasi konfirmasi
      if (!formData.dataCorrect) errors.dataCorrect = 'Anda harus menyetujui kebenaran data';
      if (!formData.requestCertificate) errors.requestCertificate = 'Anda harus mengajukan permohonan sertifikat';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Pindah ke langkah berikutnya
  const goToNextStep = () => {
    if (validateForm()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };
  
  // Kembali ke langkah sebelumnya
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Submit data asesmen
  const handleSubmit = async () => {
    if (validateForm()) {
      setSubmitting(true);
      
      try {
        // Buat FormData untuk mengirim file
        const assessmentData = new FormData();
        
        // Tambahkan data personal
        assessmentData.append('fullName', formData.fullName);
        assessmentData.append('idNumber', formData.idNumber);
        assessmentData.append('birthPlace', formData.birthPlace);
        assessmentData.append('birthDate', formData.birthDate);
        assessmentData.append('gender', formData.gender);
        assessmentData.append('nationality', formData.nationality);
        assessmentData.append('address', formData.address);
        assessmentData.append('postalCode', formData.postalCode);
        assessmentData.append('phoneNumber', formData.phoneNumber);
        assessmentData.append('email', formData.email);
        assessmentData.append('education', formData.education);
        assessmentData.append('position', formData.position);
        assessmentData.append('companyName', formData.companyName);
        
        // Tambahkan data skema
        assessmentData.append('schemaId', formData.schemaId);
        assessmentData.append('assessmentMethod', formData.assessmentMethod);
        assessmentData.append('assessmentDate', formData.assessmentDate);
        
        // Tambahkan dokumen wajib
        assessmentData.append('lastDiploma', formData.lastDiploma);
        assessmentData.append('idCard', formData.idCard);
        assessmentData.append('familyCard', formData.familyCard);
        assessmentData.append('photo', formData.photo);
        assessmentData.append('instanceSupport', formData.instanceSupport);
        assessmentData.append('apl01', formData.apl01);
        assessmentData.append('apl02', formData.apl02);
        
        // Tambahkan dokumen pendukung (jika ada)
        if (formData.supportingDocuments.length > 0) {
          formData.supportingDocuments.forEach((file, index) => {
            assessmentData.append(`supportingDocuments[${index}]`, file);
          });
        }
        
        // Tambahkan data konfirmasi
        assessmentData.append('dataCorrect', formData.dataCorrect);
        assessmentData.append('requestCertificate', formData.requestCertificate);
        
        // Kirim data ke API
        const response = await fetch(`${API_URL}/assessments`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: assessmentData
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Terjadi kesalahan saat mengirim data asesmen');
        }
        
        // Jika berhasil, redirect ke halaman sukses
        toast.success('Pendaftaran asesmen berhasil dikirim');
        navigate('/assessment/success', { replace: true });
      } catch (error) {
        toast.error(error.message || 'Terjadi kesalahan, silakan coba lagi');
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };
  
  // Render berbeda berdasarkan langkah saat ini
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <Personal 
          formData={formData} 
          formErrors={formErrors} 
          handleChange={handleChange} 
        />;
      case 2:
        return <Scheme 
          formData={formData} 
          formErrors={formErrors} 
          handleChange={handleChange} 
        />;
      case 3:
        return <DocumentUpload 
          formData={formData} 
          formErrors={formErrors} 
          handleChange={handleChange} 
        />;
      case 4:
        return <Confirmation 
          formData={formData} 
          formErrors={formErrors} 
          handleChange={handleChange} 
        />;
      default:
        return <Personal 
          formData={formData} 
          formErrors={formErrors} 
          handleChange={handleChange} 
        />;
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
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md my-8">
      {/* Judul dan Petunjuk */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Asesmen</h1>
        <p className="text-gray-600">Silakan lengkapi formulir pendaftaran asesmen berikut</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div 
              key={i}
              className={`flex items-center justify-center w-8 h-8 rounded-full border 
                ${i + 1 === currentStep 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : i + 1 < currentStep 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-white text-gray-400 border-gray-300'}`}
            >
              {i + 1 < currentStep ? (
                <FaCheck className="text-sm" />
              ) : (
                i + 1
              )}
            </div>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute top-0 h-1 bg-gray-200 w-full rounded"></div>
          <div 
            className="absolute top-0 h-1 bg-blue-600 rounded transition-all duration-300" 
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2">
          <div className="text-xs font-medium text-gray-700">Data Pribadi</div>
          <div className="text-xs font-medium text-gray-700">Skema Sertifikasi</div>
          <div className="text-xs font-medium text-gray-700">Dokumen</div>
          <div className="text-xs font-medium text-gray-700">Konfirmasi</div>
        </div>
      </div>
      
      {/* Form Content */}
      <div className="mb-8">
        {renderFormStep()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={goToPrevStep}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={submitting}
          >
            <FaChevronLeft className="mr-2" /> Sebelumnya
          </button>
        ) : (
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <FaChevronLeft className="mr-2" /> Kembali ke Beranda
          </Link>
        )}
        
        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={goToNextStep}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Selanjutnya <FaChevronRight className="ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Memproses...
              </>
            ) : (
              <>
                <FaCheck className="mr-2" /> Kirim Pendaftaran
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment; 