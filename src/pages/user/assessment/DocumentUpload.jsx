import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaTrash, FaExclamationCircle } from 'react-icons/fa';

// Komponen sederhana tanpa ketergantungan pada props handleChange dari parent
const DocumentUpload = ({ formData, formErrors, handleChange, handleFileChange, handleDownloadTemplate }) => {
  // State lokal untuk menyimpan file yang dipilih
  const [localFormData, setLocalFormData] = useState({
    lastDiploma: null,
    idCard: null,
    familyCard: null,
    photo: null,
    instanceSupport: null,
    supportingDocuments: []
  });

  // Update state lokal saat formData berubah
  useEffect(() => {
    if (formData) {
      // Log data yang diterima dari parent
      console.log("formData received in DocumentUpload:", formData);
      
      setLocalFormData({
        lastDiploma: formData.lastDiploma || null,
        idCard: formData.idCard || null,
        familyCard: formData.familyCard || null,
        photo: formData.photo || null,
        instanceSupport: formData.instanceSupport || null,
        supportingDocuments: formData.supportingDocuments || []
      });
    }
  }, [formData]);

  // Fungsi untuk menangani upload file
  const handleLocalFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validasi tipe file (PDF, JPG, JPEG, PNG)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Tipe file tidak didukung. Silakan unggah file dalam format PDF, JPG, JPEG, atau PNG.');
      e.target.value = ''; // Reset input
      return;
    }
    
    // Validasi ukuran file (maksimal 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      e.target.value = ''; // Reset input
      return;
    }
    
    // Tambahkan properti lastModified jika tidak ada
    if (!file.lastModified) {
      Object.defineProperty(file, 'lastModified', {
        value: Date.now(),
        writable: false
      });
    }
    
    // Update ke state lokal
    setLocalFormData(prevData => ({
      ...prevData,
      [fieldName]: file
    }));

    // Debug
    console.log(`File uploaded for ${fieldName}:`, file);
    
    // Update langsung ke parent component
    if (typeof handleChange === 'function') {
      const eventObj = {
        target: {
          name: fieldName,
          value: file
        }
      };
      handleChange(eventObj);
    } else if (typeof handleFileChange === 'function') {
      // Alternatif jika handleChange tidak tersedia
      handleFileChange({
        target: {
          name: fieldName,
          value: file
        }
      });
    }
  };
  
  // Fungsi untuk menghapus file
  const removeFile = (fieldName) => {
    setLocalFormData(prevData => ({
      ...prevData,
      [fieldName]: null
    }));
    
    // Update ke parent component
    if (typeof handleChange === 'function') {
      const eventObj = {
        target: {
          name: fieldName,
          value: null
        }
      };
      handleChange(eventObj);
    } else if (typeof handleFileChange === 'function') {
      // Alternatif jika handleChange tidak tersedia
      handleFileChange({
        target: {
          name: fieldName,
          value: null
        }
      });
    }
  };
  
  // Fungsi untuk menambah dokumen pendukung
  const addSupportingDocuments = (e) => {
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
    
    setLocalFormData(prevData => ({
      ...prevData,
      supportingDocuments: [...prevData.supportingDocuments, ...newFiles]
    }));
    
    // Reset input
    e.target.value = '';
  };
  
  // Fungsi untuk menghapus dokumen pendukung
  const removeSupportingDocument = (index) => {
    setLocalFormData(prevData => {
      const updatedFiles = [...prevData.supportingDocuments];
      updatedFiles.splice(index, 1);
      return {
        ...prevData,
        supportingDocuments: updatedFiles
      };
    });
  };
  
  // Render dokumen
  const renderDocument = (fieldName, label, isRequired = true) => {
    // Gunakan data dari state lokal
    const file = localFormData[fieldName];
    const error = formErrors && formErrors[fieldName];
    
    return (
      <div className="mt-4">
        <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        
        {!file ? (
          <div className="relative flex flex-col items-center mt-1 p-4 border-2 border-dashed rounded-md border-gray-300 bg-gray-50">
            <FaCloudUploadAlt className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">Klik tombol di bawah untuk memilih file</p>
            <input
              type="file"
              id={fieldName}
              name={fieldName}
              className="hidden"
              onChange={(e) => handleLocalFileChange(e, fieldName)}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <button
              type="button"
              onClick={() => document.getElementById(fieldName).click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Pilih File
            </button>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG, PNG hingga 5MB</p>
          </div>
        ) : (
          <div className="mt-1 flex items-center p-4 border rounded-md bg-gray-50">
            <FaFileAlt className="text-blue-500 w-6 h-6 mr-3" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name || (typeof file === 'string' ? file : 'File terpilih')}
              </p>
              <p className="text-xs text-gray-500">
                {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeFile(fieldName)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <FaExclamationCircle className="w-3 h-3 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Unggah Dokumen</h2>
      
      <div className="bg-yellow-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-yellow-700 mb-2">Persyaratan Dokumen</h3>
        <p className="text-sm text-yellow-800">
          Unggah dokumen-dokumen yang diperlukan untuk pendaftaran sertifikasi. Pastikan file dalam format PDF, JPG, JPEG, atau PNG dengan ukuran maksimal 5MB.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Dokumen Wajib</h3>
          <p className="text-sm text-gray-500 mt-1">Semua dokumen berikut harus diunggah</p>
          
          {renderDocument('lastDiploma', 'Ijazah Terakhir')}
          {renderDocument('idCard', 'KTP')}
          {renderDocument('familyCard', 'Kartu Keluarga')}
          {renderDocument('photo', 'Pas Foto (Latar Belakang Merah)')}
          {renderDocument('instanceSupport', 'Surat Dukungan Instansi')}
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium">Dokumen Pendukung</h3>
          <p className="text-sm text-gray-500 mt-1">Unggah dokumen pendukung (opsional)</p>
          
          <div className="mt-4 p-4 border-2 border-dashed rounded-md border-gray-300 bg-gray-50">
            <div className="flex flex-col items-center">
              <FaCloudUploadAlt className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Klik tombol di bawah untuk memilih dokumen pendukung</p>
              <input
                type="file"
                id="supportingDocuments"
                name="supportingDocuments"
                className="hidden"
                onChange={addSupportingDocuments}
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
              />
              <button
                type="button"
                onClick={() => document.getElementById('supportingDocuments').click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Pilih Dokumen Pendukung
              </button>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG, PNG hingga 5MB per file</p>
            </div>
          </div>
          
          {localFormData.supportingDocuments.length > 0 && (
            <div className="mt-4 border rounded-md divide-y">
              {localFormData.supportingDocuments.map((file, index) => (
                <div key={index} className="flex items-center p-3">
                  <FaFileAlt className="text-blue-500 w-5 h-5 mr-3" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSupportingDocument(index)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload; 