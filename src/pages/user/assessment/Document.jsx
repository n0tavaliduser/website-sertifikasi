import React, { useState } from 'react';
import { FaInfoCircle, FaUpload, FaFile, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const Document = ({ formData, formErrors, handleChange, handleFileChange }) => {
  const [fileUploading, setFileUploading] = useState({
    identity_card: false,
    latest_photo: false,
    certificate: false,
    work_experience: false,
    education_certificate: false
  });

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update the UI
    setFileUploading(prev => ({ ...prev, [fieldName]: true }));

    // Handle file change (this would be passed from parent)
    if (handleFileChange) {
      await handleFileChange(fieldName, file);
    }

    // Simulate upload completion
    setFileUploading(prev => ({ ...prev, [fieldName]: false }));
  };

  const removeFile = (fieldName) => {
    if (handleFileChange) {
      handleFileChange(fieldName, null);
    }
  };

  const renderFileInput = (fieldName, label, required = false, accept = ".pdf,.jpg,.jpeg,.png") => {
    const fileValue = formData[fieldName];
    const hasError = formErrors[fieldName];
    const isUploading = fileUploading[fieldName];

    return (
      <div className="space-y-2">
        <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {!fileValue ? (
          <div className="relative">
            <input
              type="file"
              id={fieldName}
              name={fieldName}
              onChange={(e) => handleFileUpload(e, fieldName)}
              className="sr-only"
              accept={accept}
              disabled={isUploading}
            />
            <label
              htmlFor={fieldName}
              className={`flex justify-center items-center px-4 py-2 border-2 border-dashed rounded-md ${
                hasError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
              } cursor-pointer hover:bg-gray-100 w-full`}
            >
              {isUploading ? (
                <div className="flex items-center">
                  <FaSpinner className="animate-spin mr-2 text-gray-500" />
                  <span className="text-sm text-gray-500">Mengunggah...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FaUpload className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Klik untuk mengunggah atau drag & drop file di sini
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Format: PDF, JPG, JPEG, PNG (Maks. 5MB)
                  </span>
                </div>
              )}
            </label>
          </div>
        ) : (
          <div className={`flex items-center justify-between p-3 border rounded-md ${
            hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center">
              <FaFile className="text-blue-500 mr-2" />
              <span className="text-sm truncate" style={{ maxWidth: '200px' }}>
                {typeof fileValue === 'string' 
                  ? fileValue.split('/').pop() 
                  : fileValue.name || 'File terunggah'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeFile(fieldName)}
              className="text-gray-400 hover:text-red-500"
              title="Hapus file"
            >
              <FaTimesCircle />
            </button>
          </div>
        )}
        
        {hasError && (
          <p className="text-red-500 text-xs italic flex items-center mt-1">
            <FaInfoCircle className="mr-1" /> {formErrors[fieldName]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Dokumen Persyaratan</h2>
        <p className="text-sm text-gray-600">
          Silakan unggah dokumen yang diperlukan untuk proses asesmen
        </p>
      </div>

      <div className="space-y-6">
        {/* KTP/Identitas */}
        {renderFileInput(
          'identity_card',
          'KTP/Kartu Identitas',
          true,
          '.jpg,.jpeg,.png,.pdf'
        )}

        {/* Pas Foto */}
        {renderFileInput(
          'latest_photo',
          'Pas Foto Terbaru (3x4)',
          true,
          '.jpg,.jpeg,.png'
        )}

        {/* Ijazah */}
        {renderFileInput(
          'education_certificate',
          'Ijazah Pendidikan Terakhir',
          true,
          '.jpg,.jpeg,.png,.pdf'
        )}

        {/* Sertifikat (opsional) */}
        {renderFileInput(
          'certificate',
          'Sertifikat Kompetensi/Pelatihan (jika ada)',
          false,
          '.jpg,.jpeg,.png,.pdf'
        )}

        {/* Pengalaman Kerja (opsional) */}
        {renderFileInput(
          'work_experience',
          'Bukti Pengalaman Kerja (jika ada)',
          false,
          '.jpg,.jpeg,.png,.pdf'
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-md mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaInfoCircle className="text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Informasi Penting</h3>
            <div className="mt-2 text-sm text-blue-700 space-y-1">
              <p>• Pastikan dokumen yang diunggah jelas dan lengkap</p>
              <p>• Ukuran file maksimal 5MB per dokumen</p>
              <p>• Format file yang diterima: PDF, JPG, JPEG, PNG</p>
              <p>• Semua dokumen wajib (bertanda *) harus dilengkapi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document; 