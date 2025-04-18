import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle
} from "react-icons/fa";
import DocumentUpload from "./DocumentUpload";
import APL02Upload from "./APL02Upload";
import Confirmation from "./Confirmation";

const AssessmentRegisterForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instances, setInstances] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [assessmentDates, setAssessmentDates] = useState([]);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  
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
  
  // State untuk menyimpan data file sementara
  const [tempFiles, setTempFiles] = useState({
    lastDiploma: null,
    idCard: null,
    familyCard: null,
    photo: null,
    instanceSupport: null,
    apl01: null,
    apl02: null
  });
  
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
  
  // Ambil data pengguna dari API
  useEffect(() => {
    const fetchUserData = async () => {
      if (userDataLoaded) return; // Hindari pengambilan berulang

      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('Token tidak ditemukan');
          return;
        }
        
        const response = await fetch(`${API_URL}/user-details`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data pengguna');
        }
        
        const data = await response.json();
        console.log('Data pengguna berhasil diambil:', data);
        
        // Auto-fill data formulir dengan data pengguna
        if (data && data.data) {
          const userData = data.data;
          setFormData(prevData => ({
            ...prevData,
            fullName: userData.name || prevData.fullName,
            email: userData.email || prevData.email,
            phoneNumber: userData.phone_number || prevData.phoneNumber,
            address: userData.address || prevData.address
          }));
          setUserDataLoaded(true);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Gagal memuat data pengguna. Data akan diisi manual.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userDataLoaded]);
  
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
    // Cek apakah parameter adalah event atau object dari DocumentUpload.jsx
    if (e && e.target) {
      const { name, files, value } = e.target;
      
      // Jika ada value yang dikirim langsung (dari DocumentUpload)
      if (value !== undefined) {
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
        
        return;
      }
      
      // Case normal di mana files tersedia
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
    } else if (typeof e === 'object') {
      // Handle case dimana objek dikirim langsung
      const { fieldName, file } = e;
      if (fieldName) {
        setFormData({
          ...formData,
          [fieldName]: file
        });
        
        // Clear error for this field if it exists
        if (formErrors[fieldName]) {
          setFormErrors({
            ...formErrors,
            [fieldName]: null
          });
        }
      }
    }
  };
  
  // Update tempFiles ketika handleFileChange dipanggil
  const handleFileChangeWithTempStorage = (e) => {
    // Panggil handleFileChange asli
    handleFileChange(e);
    
    // Simpan juga ke tempFiles
    if (e && e.target) {
      const { name, value, files } = e.target;
      // Jika files tersedia, gunakan itu
      if (files && files[0]) {
        setTempFiles(prev => ({
          ...prev,
          [name]: files[0]
        }));
      }
      // Jika value tersedia, gunakan itu
      else if (value !== undefined) {
        setTempFiles(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };
  
  // Gabungkan data formData dan tempFiles sebelum validasi
  const mergeFilesBeforeValidation = () => {
    // Untuk setiap field di tempFiles
    Object.entries(tempFiles).forEach(([field, value]) => {
      // Jika field ini null di formData tapi ada di tempFiles
      if (!formData[field] && value) {
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));
      }
    });
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

    // Fungsi helper untuk memeriksa apakah file valid
    const isValidFile = (file) => {
      // Debug informasi file
      console.log(`Validasi file:`, file);
      
      // File dianggap valid jika:
      // 1. Bukan null/undefined
      if (!file) return false;
      
      // 2. Jika string dan tidak kosong (URL atau identifier)
      if (typeof file === 'string' && file.trim().length > 0) return true;
      
      // 3. Jika object File atau Blob
      if (file instanceof File || file instanceof Blob) return true;
      
      // 4. Jika object dengan property name atau size
      if (typeof file === 'object' && (file.name || file.size)) return true;
      
      // 5. Jika object dengan property type yang menunjukkan tipe file
      if (typeof file === 'object' && 
         (file.type === 'application/pdf' || 
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png')) return true;
      
      // Kalau semua kondisi di atas tidak terpenuhi, berarti tidak valid
      return false;
    };

    console.log('Form Data : ', formData)
    
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
      
      case 3:
        // Validate document uploads
        const checkFile = (fieldName, errorMessage) => {
          // Cek di formData dulu
          if (isValidFile(formData[fieldName])) return true;
          
          // Jika tidak ada di formData, cek di tempFiles
          if (isValidFile(tempFiles[fieldName])) {
            // Update formData dengan nilai dari tempFiles
            setFormData(prev => ({
              ...prev,
              [fieldName]: tempFiles[fieldName]
            }));
            return true;
          }
          
          // Jika tidak ditemukan file yang valid, set error
          errors[fieldName] = errorMessage;
          isValid = false;
          return false;
        };
        
        // Periksa semua dokumen wajib
        checkFile('lastDiploma', "Ijazah terakhir wajib diunggah");
        checkFile('idCard', "KTP wajib diunggah");
        checkFile('familyCard', "Kartu Keluarga wajib diunggah");
        checkFile('photo', "Pas Foto wajib diunggah");
        checkFile('instanceSupport', "Surat Dukungan Instansi wajib diunggah");
        
        // Debug info
        console.log("Validasi dokumen:", {
          formData: {
            lastDiploma: formData.lastDiploma,
            idCard: formData.idCard,
            familyCard: formData.familyCard,
            photo: formData.photo,
            instanceSupport: formData.instanceSupport,
          },
          tempFiles,
          errors
        });
        break;
      
      case 4:
        // Validate APL 02
        if (!isValidFile(formData.apl02) && !isValidFile(tempFiles.apl02)) {
          errors.apl02 = "Dokumen APL 02 wajib diunggah";
          isValid = false;
        } else if (isValidFile(tempFiles.apl02) && !isValidFile(formData.apl02)) {
          // Update formData dengan nilai dari tempFiles
          setFormData(prev => ({
            ...prev,
            apl02: tempFiles.apl02
          }));
        }
        
        // Debug info
        console.log("Validasi APL 02:", {
          apl02: formData.apl02,
          errors: errors
        });
        break;
      
      case 5:
        // Validate confirmations
        if (!formData.hasCompletedAssessment) {
          errors.hasCompletedAssessment = "Anda harus menyetujui pernyataan ini untuk melanjutkan";
          isValid = false;
        }
        
        if (!formData.requestCertificate) {
          errors.requestCertificate = "Anda harus menyetujui untuk mengajukan permohonan";
          isValid = false;
        }
        break;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Handle template download
  const handleDownloadTemplate = async (templateType, apl02Type) => {
    try {
      setLoading(true);
      
      const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Anda harus login terlebih dahulu');
        navigate('/auth/login');
        return;
      }
      
      // URL endpoint tergantung jenis template
      let endpoint = '';
      switch(templateType) {
        case 'apl01':
          endpoint = `/assessee/template/download/apl01`;
          break;
        case 'apl02':
          // Jika apl02Type diberikan, gunakan itu
          const type = apl02Type || (formData.certificationMethod === 'observasi' ? 'observation' : 
                                    formData.certificationMethod === 'portofolio' ? 'portofolio' : '');
          
          if (!type) {
            throw new Error('Metode asesmen tidak valid. Pilih metode observasi atau portofolio.');
          }
          
          endpoint = `/assessee/template/download/apl02?type=${type}`;
          break;
        case 'apl02_observasi':
          endpoint = `/assessee/template/download/apl02?type=observation`;
          break;
        case 'apl02_portofolio':
          endpoint = `/assessee/template/download/apl02?type=portofolio`;
          break;
        default:
          throw new Error('Template tidak tersedia');
      }
      
      console.log(`Downloading template from: ${API_URL}${endpoint}`);
      
      // Proses download template dari API
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
      
    } catch (err) {
      console.error('Error downloading template:', err);
      setError(err.message || 'Gagal mengunduh template. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle next step
  const handleNextStep = () => {
    // Debug dokumen sebelum validasi
    if (currentStep === 3) {
      console.log("Data dokumen sebelum validasi:", {
        lastDiploma: formData.lastDiploma,
        idCard: formData.idCard,
        familyCard: formData.familyCard,
        photo: formData.photo,
        instanceSupport: formData.instanceSupport,
        apl01: formData.apl01
      });
      
      // Gabungkan data sebelum validasi
      mergeFilesBeforeValidation();
      
      console.log("Temporary files:", tempFiles);
    }
    
    if (validateStep(currentStep)) {
      if (currentStep === 5) {
        // Jika ini adalah langkah terakhir, lakukan submit form
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  // Cek apakah file adalah mock file dari localStorage
  const isMockFile = (file) => {
    return file && typeof file === 'object' && file._savedFromLocalStorage === true;
  };
  
  // Create a dummy file untuk mock file dari localStorage
  const createDummyFile = (mockFile) => {
    // Buat empty file dengan nama dan tipe yang sama
    const fileData = new Blob([''], { type: mockFile.type || 'application/octet-stream' });
    return new File([fileData], mockFile.name || 'file.pdf', {
      type: mockFile.type || 'application/octet-stream',
      lastModified: mockFile.lastModified || Date.now()
    });
  };
  
  // Submit form ke API
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Gabungkan data sebelum submit
      mergeFilesBeforeValidation();
      
      const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Anda harus login terlebih dahulu');
        navigate('/auth/login');
        return;
      }

      // Persiapkan FormData untuk upload file
      const formDataToSend = new FormData();
      
      // 1. Data personal
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phoneNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('identity_number', formData.idNumber);
      formDataToSend.append('birth_date', formData.birthDate);
      formDataToSend.append('birth_place', formData.birthPlace);
      formDataToSend.append('last_education_level', formData.education);
      formDataToSend.append('instance_id', formData.instanceId);
      
      // 2. Data skema
      formDataToSend.append('schema_id', formData.schemaId);
      formDataToSend.append('method', formData.certificationMethod);
      formDataToSend.append('assessment_date', formData.assessmentDate);
      
      // 3. Dokumen-dokumen
      if (formData.lastDiploma) {
        const file = isMockFile(formData.lastDiploma) ? createDummyFile(formData.lastDiploma) : formData.lastDiploma;
        formDataToSend.append('last_education_certificate', file);
      }
      if (formData.idCard) {
        const file = isMockFile(formData.idCard) ? createDummyFile(formData.idCard) : formData.idCard;
        formDataToSend.append('identity_card', file);
      }
      if (formData.familyCard) {
        const file = isMockFile(formData.familyCard) ? createDummyFile(formData.familyCard) : formData.familyCard;
        formDataToSend.append('family_card', file);
      }
      if (formData.photo) {
        const file = isMockFile(formData.photo) ? createDummyFile(formData.photo) : formData.photo;
        formDataToSend.append('self_photo', file);
      }
      if (formData.instanceSupport) {
        const file = isMockFile(formData.instanceSupport) ? createDummyFile(formData.instanceSupport) : formData.instanceSupport;
        formDataToSend.append('instance_support', file);
      }
      if (formData.apl01) {
        const file = isMockFile(formData.apl01) ? createDummyFile(formData.apl01) : formData.apl01;
        formDataToSend.append('apl01', file);
      }
      if (formData.apl02) {
        const file = isMockFile(formData.apl02) ? createDummyFile(formData.apl02) : formData.apl02;
        formDataToSend.append('apl02', file);
      }
      
      // 4. Dokumen pendukung (jika ada)
      if (formData.supportingDocuments && formData.supportingDocuments.length > 0) {
        // Kirim sebagai array files
        formData.supportingDocuments.forEach((doc, index) => {
          const file = isMockFile(doc) ? createDummyFile(doc) : doc;
          formDataToSend.append(`supporting_documents[${index}]`, file);
        });
      }
      
      // Log data yang akan dikirim
      console.log("Mengirim data ke API:", Object.fromEntries(formDataToSend));
      
      const response = await fetch(`${API_URL}/assessee`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Jangan set Content-Type karena browser akan otomatis menambahkan boundary untuk FormData
        },
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error('API Error Response:', result);
        
        // Handle validation errors
        if (response.status === 422 && result.errors) {
          const errorMessages = [];
          // Gabungkan semua pesan error validasi
          Object.entries(result.errors).forEach(([field, messages]) => {
            errorMessages.push(`${field}: ${messages.join(', ')}`);
          });
          throw new Error(`Validasi gagal: ${errorMessages.join('; ')}`);
        }
        
        throw new Error(result.message || 'Terjadi kesalahan saat mengirim data asesmen');
      }
      
      // Bersihkan data di localStorage
      localStorage.removeItem('assessmentFiles');
      
      // Tampilkan pesan sukses
      alert('Pendaftaran asesmen berhasil dikirim. Anda akan diarahkan kembali ke halaman utama.');
      
      // Redirect ke halaman utama assessee
      navigate('/user/assessment');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setError(error.message || 'Terjadi kesalahan saat mengirim pendaftaran asesmen. Silakan coba lagi nanti.');
      
      // Gulir ke atas agar pesan error terlihat
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
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
      
      case 3:
        // Integrasikan komponen DocumentUpload
        return (
          <div>
            <DocumentUpload 
              formData={formData}
              formErrors={formErrors}
              handleFileChange={handleFileChangeWithTempStorage}
              handleDownloadTemplate={handleDownloadTemplate}
            />
          </div>
        );
      
      case 4:
        // APL 02 Upload component
        return (
          <div>
            <APL02Upload
              formData={formData}
              formErrors={formErrors}
              handleFileChange={handleFileChangeWithTempStorage}
              handleDownloadTemplate={handleDownloadTemplate}
              handleSupportingDocumentAdd={handleSupportingDocumentAdd}
              handleRemoveSupportingDocument={handleRemoveSupportingDocument}
            />
          </div>
        );
        
      case 5:
        // Confirmation component
        return (
          <div>
            <Confirmation
              formData={formData}
              formErrors={formErrors}
              handleChange={handleInputChange}
            />
          </div>
        );
      
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
  
  useEffect(() => {
    // Coba ambil data file dari localStorage saat komponen dimuat
    try {
      const savedFileInfo = JSON.parse(localStorage.getItem('assessmentFiles'));
      if (savedFileInfo) {
        console.log("Menemukan info file tersimpan:", savedFileInfo);
        
        // Update tempFiles state
        setTempFiles(prev => ({
          ...prev,
          ...Object.fromEntries(
            Object.entries(savedFileInfo).map(([key, info]) => {
              // Hanya ambil informasi penting seperti name, type, dan lastModified
              return [key, info ? { 
                name: info.name, 
                type: info.type,
                size: info.size,
                lastModified: info.lastModified,
                _savedFromLocalStorage: true
              } : null];
            })
          )
        }));
      }
    } catch (err) {
      console.error("Error membaca info file dari localStorage:", err);
    }
  }, []);
  
  // Simpan informasi file ke localStorage setiap kali tempFiles berubah
  useEffect(() => {
    try {
      // Simpan informasi penting saja (tidak bisa menyimpan File object)
      const fileInfo = Object.fromEntries(
        Object.entries(tempFiles).map(([key, file]) => {
          return [key, file ? { 
            name: file.name, 
            type: file.type,
            size: file.size,
            lastModified: file.lastModified
          } : null];
        })
      );
      
      localStorage.setItem('assessmentFiles', JSON.stringify(fileInfo));
    } catch (err) {
      console.error("Error menyimpan info file ke localStorage:", err);
    }
  }, [tempFiles]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Pendaftaran Asesmen
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {loading && currentStep === 5 && (
          <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-md flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sedang mengirim pendaftaran asesmen Anda...</span>
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
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </>
            ) : currentStep === 5 ? (
              'Kirim Pendaftaran'
            ) : (
              'Selanjutnya'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentRegisterForm;
