import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaTrash, FaExclamationCircle, FaPlus } from 'react-icons/fa';

const DocumentUpload = ({ formData, formErrors, handleChange }) => {
  const [draggedFile, setDraggedFile] = useState(null);
  
  const handleDragEnter = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedFile(fieldName);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedFile(null);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleFileDrop = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedFile(null);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files[0], fieldName);
    }
  };
  
  const handleSupportingDocumentDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedFile(null);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      const newFiles = Array.from(files);
      const updatedFiles = [...formData.supportingDocuments, ...newFiles];
      
      handleChange({
        target: {
          name: 'supportingDocuments',
          value: updatedFiles
        }
      });
    }
  };
  
  const handleFileUpload = (file, fieldName) => {
    // Validasi tipe file (PDF, JPG, JPEG, PNG)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Tipe file tidak didukung. Silakan unggah file dalam format PDF, JPG, JPEG, atau PNG.');
      return;
    }
    
    // Validasi ukuran file (maksimal 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }
    
    handleChange({
      target: {
        name: fieldName,
        value: file
      }
    });
  };
  
  const removeFile = (fieldName) => {
    handleChange({
      target: {
        name: fieldName,
        value: null
      }
    });
  };
  
  const removeSupportingDocument = (index) => {
    const updatedFiles = [...formData.supportingDocuments];
    updatedFiles.splice(index, 1);
    
    handleChange({
      target: {
        name: 'supportingDocuments',
        value: updatedFiles
      }
    });
  };
  
  const renderDocumentUpload = (fieldName, label, isRequired = true) => {
    const file = formData[fieldName];
    const error = formErrors[fieldName];
    
    return (
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        
        {!file ? (
          <div 
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md 
              ${draggedFile === fieldName ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'} 
              ${error ? 'border-red-300' : ''}`}
            onDragEnter={(e) => handleDragEnter(e, fieldName)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleFileDrop(e, fieldName)}
          >
            <div className="space-y-1 text-center">
              <FaCloudUploadAlt className="mx-auto h-10 w-10 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor={fieldName} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Unggah file</span>
                  <input
                    id={fieldName}
                    name={fieldName}
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files.length) {
                        handleFileUpload(e.target.files[0], fieldName);
                      }
                    }}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
                <p className="pl-1">atau tarik dan letakkan</p>
              </div>
              <p className="text-xs text-gray-500">PDF, JPG, JPEG, PNG hingga 5MB</p>
            </div>
          </div>
        ) : (
          <div className="mt-1 flex items-center p-4 border rounded-md bg-gray-50">
            <FaFileAlt className="text-blue-500 w-6 h-6 mr-3" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button
              type="button"
              onClick={() => removeFile(fieldName)}
              className="ml-4 flex-shrink-0 text-red-500 hover:text-red-700"
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
          
          {renderDocumentUpload('lastDiploma', 'Ijazah Terakhir')}
          {renderDocumentUpload('idCard', 'KTP')}
          {renderDocumentUpload('familyCard', 'Kartu Keluarga')}
          {renderDocumentUpload('photo', 'Pas Foto (Latar Belakang Merah)')}
          {renderDocumentUpload('instanceSupport', 'Surat Dukungan Instansi')}
          {renderDocumentUpload('apl01', 'APL 01 (Formulir Permohonan Sertifikasi Kompetensi)')}
          {renderDocumentUpload('apl02', 'APL 02 (Asesmen Mandiri)')}
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium">Dokumen Pendukung</h3>
          <p className="text-sm text-gray-500 mt-1">Unggah dokumen pendukung (opsional)</p>
          
          <div 
            className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md 
              ${draggedFile === 'supportingDocuments' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            onDragEnter={(e) => handleDragEnter(e, 'supportingDocuments')}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleSupportingDocumentDrop}
          >
            <div className="space-y-1 text-center">
              <FaCloudUploadAlt className="mx-auto h-10 w-10 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="supportingDocuments" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Unggah dokumen pendukung</span>
                  <input
                    id="supportingDocuments"
                    name="supportingDocuments"
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files.length) {
                        const newFiles = Array.from(e.target.files);
                        const updatedFiles = [...formData.supportingDocuments, ...newFiles];
                        
                        handleChange({
                          target: {
                            name: 'supportingDocuments',
                            value: updatedFiles
                          }
                        });
                      }
                    }}
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                  />
                </label>
                <p className="pl-1">atau tarik dan letakkan</p>
              </div>
              <p className="text-xs text-gray-500">PDF, JPG, JPEG, PNG hingga 5MB per file</p>
            </div>
          </div>
          
          {formData.supportingDocuments.length > 0 && (
            <div className="mt-4 border rounded-md divide-y">
              {formData.supportingDocuments.map((file, index) => (
                <div key={index} className="flex items-center p-3">
                  <FaFileAlt className="text-blue-500 w-5 h-5 mr-3" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSupportingDocument(index)}
                    className="ml-4 flex-shrink-0 text-red-500 hover:text-red-700"
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