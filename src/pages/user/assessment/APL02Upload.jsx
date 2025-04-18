import React, { useState, useEffect } from 'react';
import { FaFileUpload, FaFileDownload, FaTrash, FaPlus, FaExclamationCircle, FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';

const APL02Upload = ({ 
  formData, 
  formErrors, 
  handleFileChange, 
  handleDownloadTemplate,
  handleSupportingDocumentAdd,
  handleRemoveSupportingDocument
}) => {
  const [localFormData, setLocalFormData] = useState({
    apl01: null,
    apl02: null
  });

  // Update state lokal saat formData berubah
  useEffect(() => {
    if (formData) {
      setLocalFormData({
        apl01: formData.apl01 || null,
        apl02: formData.apl02 || null
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
    if (typeof handleFileChange === 'function') {
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
    if (typeof handleFileChange === 'function') {
      // Alternatif jika handleChange tidak tersedia
      handleFileChange({
        target: {
          name: fieldName,
          value: null
        }
      });
    }
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
      <h2 className="text-xl font-semibold">Dokumen APL</h2>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-blue-700 mb-2">Petunjuk Pengisian Dokumen APL</h3>
        <ul className="list-disc pl-5 text-sm text-blue-800">
          <li>APL 01 adalah Formulir Permohonan Sertifikasi Kompetensi</li>
          <li>APL 02 adalah dokumen Asesmen Mandiri sesuai dengan skema yang dipilih</li>
          <li>Unduh template yang disediakan, isi sesuai dengan instruksi</li>
          <li>Lengkapi dengan tanda tangan dan tanggal pada bagian akhir</li>
          <li>Upload kembali dokumen yang sudah diisi</li>
        </ul>
      </div>
      
      <div className="space-y-6">
        <h3 className="font-medium mb-3">Template APL</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Template APL 01 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              APL 01 - Formulir Permohonan
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Mencegah form submit
                  e.stopPropagation(); // Mencegah event bubbling
                  handleDownloadTemplate('apl01');
                }}
                className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaFileDownload className="mr-2" />
                Unduh Template
              </button>
            </div>
          </div>
          
          {/* Template APL 02 Metode Observasi */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              APL 02 - Metode Observasi
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Mencegah form submit
                  e.stopPropagation(); // Mencegah event bubbling
                  handleDownloadTemplate('apl02', 'observation');
                }}
                className={`flex items-center px-4 py-2 rounded-md ${
                  formData.certificationMethod === 'observasi'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={formData.certificationMethod !== 'observasi'}
              >
                <FaFileDownload className="mr-2" />
                Unduh Template
              </button>
            </div>
            {formData.certificationMethod !== 'observasi' && (
              <p className="text-xs text-amber-600">
                Template ini hanya tersedia jika Anda memilih metode Observasi
              </p>
            )}
          </div>
          
          {/* Template APL 02 Metode Portofolio */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              APL 02 - Metode Portofolio
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Mencegah form submit
                  e.stopPropagation(); // Mencegah event bubbling
                  handleDownloadTemplate('apl02', 'portofolio');
                }}
                className={`flex items-center px-4 py-2 rounded-md ${
                  formData.certificationMethod === 'portofolio'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={formData.certificationMethod !== 'portofolio'}
              >
                <FaFileDownload className="mr-2" />
                Unduh Template
              </button>
            </div>
            {formData.certificationMethod !== 'portofolio' && (
              <p className="text-xs text-amber-600">
                Template ini hanya tersedia jika Anda memilih metode Portofolio
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-6 mt-8">
        <h3 className="font-medium mb-3">Upload Dokumen APL</h3>
        
        <div className="space-y-4">
          {renderDocument('apl01', 'APL 01 (Formulir Permohonan Sertifikasi Kompetensi)')}
          {renderDocument('apl02', 'APL 02 (Asesmen Mandiri)')}
        </div>
      </div>
      
      <div className="space-y-6 mt-8">
        <h3 className="font-medium mb-3">Dokumen Pendukung</h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload dokumen tambahan yang mendukung proses asesmen Anda (sertifikat, hasil kerja, foto kegiatan, dll)
        </p>
        
        <div className="space-y-4">
          {/* Daftar Dokumen Pendukung */}
          {formData.supportingDocuments && formData.supportingDocuments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Dokumen Terunggah:</h4>
              <div className="space-y-2">
                {formData.supportingDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <FaFileUpload className="text-gray-400 mr-2" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSupportingDocument(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
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
                  <FaPlus className="mx-auto h-6 w-6 text-gray-400" />
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
    </div>
  );
};

export default APL02Upload; 