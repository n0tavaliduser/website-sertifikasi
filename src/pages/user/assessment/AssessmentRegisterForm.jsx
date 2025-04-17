import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle
} from "react-icons/fa";

const AssessmentRegisterForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instances, setInstances] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [assessmentDates, setAssessmentDates] = useState([]);
  
  // State untuk data formulir
  const [formData, setFormData] = useState({
    // Step 1: Profil & Pendaftaran
    fullName: "",
    idNumber: "",
    birthPlace: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
    address: "",
    education: "",
    instanceId: "",
    
    // Step 2: Skema & Metode
    schemaId: "",
    certificationMethod: "", // "observasi" atau "portofolio"
    assessmentDate: "",
    
    // Step 3: Upload Dokumen
    lastDiploma: null,
    idCard: null,
    familyCard: null,
    photo: null,
    instanceSupport: null,
    statement: null,
    apl01: null,
    
    // Step 4: APL 02
    apl02: null,
    supportingDocuments: [],
    
    // Step 5: Konfirmasi
    hasCompletedAssessment: false,
    requestCertificate: false
  });
  
  // State untuk validasi form
  const [formErrors, setFormErrors] = useState({});
  
  // Ambil data instances dari API
  useEffect(() => {
    const fetchInstances = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_URL}/instances-reference`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch instances');
        }
        
        const data = await response.json();
        setInstances(data.data || []);
      } catch (err) {
        console.error('Error fetching instances:', err);
        setError('Gagal memuat data instansi. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInstances();
  }, []);
  
  // Ambil data schemas dari API
  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_URL}/schemas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch schemas');
        }
        
        const data = await response.json();
        setSchemas(data.data || []);
      } catch (err) {
        console.error('Error fetching schemas:', err);
        setError('Gagal memuat data skema. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSchemas();
  }, []);
  
  // Generate dummy assessment dates (sebagai contoh)
  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      const currentDate = new Date();
      
      for (let i = 1; i <= 5; i++) {
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + (i * 7)); // Add weeks
        dates.push({
          id: i,
          date: futureDate.toISOString().split('T')[0]
        });
      }
      
      setAssessmentDates(dates);
    };
    
    generateDates();
  }, []);
  
  // Handle input text/select change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (files && files[0]) {
      // Validasi ukuran file (max 5MB)
      if (files[0].size > 5 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          [name]: "Ukuran file terlalu besar. Maksimal 5MB"
        });
        return;
      }
      
      // Validasi tipe file
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(files[0].type)) {
        setFormErrors({
          ...formErrors,
          [name]: "Format file tidak didukung. Gunakan PDF, JPEG, atau PNG"
        });
        return;
      }
      
      setFormData({
        ...formData,
        [name]: files[0]
      });
      
      // Clear error for this field if it exists
      if (formErrors[name]) {
        setFormErrors({
          ...formErrors,
          [name]: null
        });
      }
    }
  };
  
  // Handle supporting document file additions
  const handleSupportingDocumentAdd = (e) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      // Validate each file
      const newFiles = Array.from(files).filter(file => {
        // Check size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`File ${file.name} terlalu besar. Maksimal 5MB`);
          return false;
        }
        
        // Check type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          setError(`File ${file.name} tidak didukung. Gunakan PDF, JPEG, atau PNG`);
          return false;
        }
        
        return true;
      });
      
      if (newFiles.length > 0) {
        setFormData({
          ...formData,
          supportingDocuments: [...formData.supportingDocuments, ...newFiles]
        });
      }
    }
  };
  
  // Remove a supporting document
  const handleRemoveSupportingDocument = (index) => {
    const updatedDocs = [...formData.supportingDocuments];
    updatedDocs.splice(index, 1);
    setFormData({
      ...formData,
      supportingDocuments: updatedDocs
    });
  };
  
  // Validation for each step
  const validateStep = (step) => {
    let errors = {};
    let isValid = true;
    
    switch (step) {
      case 1:
        // Validate Profil & Pendaftaran
        if (!formData.fullName.trim()) {
          errors.fullName = "Nama lengkap wajib diisi";
          isValid = false;
        }
        
        if (!formData.idNumber.trim()) {
          errors.idNumber = "NIK/No KTP wajib diisi";
          isValid = false;
        } else if (!/^\d{16}$/.test(formData.idNumber)) {
          errors.idNumber = "NIK harus 16 digit angka";
          isValid = false;
        }
        
        if (!formData.birthPlace.trim()) {
          errors.birthPlace = "Tempat lahir wajib diisi";
          isValid = false;
        }
        
        if (!formData.birthDate) {
          errors.birthDate = "Tanggal lahir wajib diisi";
          isValid = false;
        }
        
        if (!formData.email.trim()) {
          errors.email = "Email wajib diisi";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = "Format email tidak valid";
          isValid = false;
        }
        
        if (!formData.phoneNumber.trim()) {
          errors.phoneNumber = "Nomor HP wajib diisi";
          isValid = false;
        } else if (!/^[0-9]{10,13}$/.test(formData.phoneNumber)) {
          errors.phoneNumber = "Nomor HP harus 10-13 digit angka";
          isValid = false;
        }
        
        if (!formData.address.trim()) {
          errors.address = "Alamat wajib diisi";
          isValid = false;
        }
        
        if (!formData.education) {
          errors.education = "Pendidikan terakhir wajib diisi";
          isValid = false;
        }
        
        if (!formData.instanceId) {
          errors.instanceId = "Instansi wajib dipilih";
          isValid = false;
        }
        break;
        
      case 2:
        // Validate Skema & Metode
        if (!formData.schemaId) {
          errors.schemaId = "Skema sertifikasi wajib dipilih";
          isValid = false;
        }
        
        if (!formData.certificationMethod) {
          errors.certificationMethod = "Metode sertifikasi wajib dipilih";
          isValid = false;
        }
        
        if (!formData.assessmentDate) {
          errors.assessmentDate = "Tanggal pelaksanaan wajib dipilih";
          isValid = false;
        }
        break;
      
      // Validasi untuk step lainnya akan ditambahkan kemudian
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Render form based on current step
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Profil & Pendaftaran</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan nama lengkap"
                />
                {formErrors.fullName && (
                  <p className="text-sm text-red-500">{formErrors.fullName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                  NIK / No KTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.idNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan 16 digit NIK"
                />
                {formErrors.idNumber && (
                  <p className="text-sm text-red-500">{formErrors.idNumber}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.birthPlace ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan tempat lahir"
                />
                {formErrors.birthPlace && (
                  <p className="text-sm text-red-500">{formErrors.birthPlace}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.birthDate && (
                  <p className="text-sm text-red-500">{formErrors.birthDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan email"
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  No HP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan nomor HP"
                />
                {formErrors.phoneNumber && (
                  <p className="text-sm text-red-500">{formErrors.phoneNumber}</p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan alamat lengkap"
                ></textarea>
                {formErrors.address && (
                  <p className="text-sm text-red-500">{formErrors.address}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Pendidikan Terakhir <span className="text-red-500">*</span>
                </label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.education ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih Pendidikan Terakhir</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D1">D1</option>
                  <option value="D2">D2</option>
                  <option value="D3">D3</option>
                  <option value="D4">D4</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
                {formErrors.education && (
                  <p className="text-sm text-red-500">{formErrors.education}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="instanceId" className="block text-sm font-medium text-gray-700">
                  Nama Instansi <span className="text-red-500">*</span>
                </label>
                <select
                  id="instanceId"
                  name="instanceId"
                  value={formData.instanceId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.instanceId ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih Instansi</option>
                  {instances.map(instance => (
                    <option key={instance.id} value={instance.id}>
                      {instance.name}
                    </option>
                  ))}
                </select>
                {formErrors.instanceId && (
                  <p className="text-sm text-red-500">{formErrors.instanceId}</p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Skema & Metode Sertifikasi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="schemaId" className="block text-sm font-medium text-gray-700">
                  Pilih Skema Sertifikasi <span className="text-red-500">*</span>
                </label>
                <select
                  id="schemaId"
                  name="schemaId"
                  value={formData.schemaId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.schemaId ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih Skema Sertifikasi</option>
                  {schemas.map(schema => (
                    <option key={schema.id} value={schema.id}>
                      {schema.name}
                    </option>
                  ))}
                </select>
                {formErrors.schemaId && (
                  <p className="text-sm text-red-500">{formErrors.schemaId}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="certificationMethod" className="block text-sm font-medium text-gray-700">
                  Pilih Metode Sertifikasi <span className="text-red-500">*</span>
                </label>
                <select
                  id="certificationMethod"
                  name="certificationMethod"
                  value={formData.certificationMethod}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.certificationMethod ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih Metode Sertifikasi</option>
                  <option value="observasi">Observasi</option>
                  <option value="portofolio">Portofolio</option>
                </select>
                {formErrors.certificationMethod && (
                  <p className="text-sm text-red-500">{formErrors.certificationMethod}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="assessmentDate" className="block text-sm font-medium text-gray-700">
                  Pilih Tanggal Pelaksanaan <span className="text-red-500">*</span>
                </label>
                <select
                  id="assessmentDate"
                  name="assessmentDate"
                  value={formData.assessmentDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.assessmentDate ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih Tanggal Pelaksanaan</option>
                  {assessmentDates.map(date => (
                    <option key={date.id} value={date.date}>
                      {new Date(date.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </option>
                  ))}
                </select>
                {formErrors.assessmentDate && (
                  <p className="text-sm text-red-500">{formErrors.assessmentDate}</p>
                )}
              </div>
            </div>
          </div>
        );
      
      // Step lain akan dilanjutkan di komponen berikutnya
      default:
        return null;
    }
  };
  
  // Render stepper
  const renderStepper = () => {
    const steps = [
      { number: 1, title: "Profil & Pendaftaran" },
      { number: 2, title: "Skema & Metode" },
      { number: 3, title: "Upload Dokumen" },
      { number: 4, title: "APL 02" },
      { number: 5, title: "Konfirmasi" }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep === step.number 
                      ? 'bg-blue-600 text-white' 
                      : currentStep > step.number 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {currentStep > step.number ? (
                    <FaCheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="mt-2 text-xs text-center">{step.title}</span>
              </div>
              
              {step.number < steps.length && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Pendaftaran Asesmen
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {renderStepper()}
        
        <div className="mb-8">
          {renderForm()}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-md ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Sebelumnya
          </button>
          
          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {currentStep === 5 ? 'Selesai' : 'Selanjutnya'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentRegisterForm;
