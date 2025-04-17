import React from 'react';
import { FaFileUpload, FaFileDownload, FaTrash, FaPlus } from 'react-icons/fa';

const APL02Upload = ({ 
  formData, 
  formErrors, 
  handleFileChange, 
  handleDownloadTemplate,
  handleSupportingDocumentAdd,
  handleRemoveSupportingDocument
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">APL 02 (Asesmen Mandiri)</h2>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-blue-700 mb-2">Petunjuk Pengisian APL 02</h3>
        <ul className="list-disc pl-5 text-sm text-blue-800">
          <li>Unduh template APL 02 sesuai metode yang Anda pilih (Observasi/Portofolio)</li>
          <li>Isi formulir sesuai dengan instruksi dan pengalaman Anda</li>
          <li>Lengkapi dengan tanda tangan dan tanggal pada bagian akhir</li>
          <li>Upload kembali dokumen yang sudah diisi</li>
          <li>Tambahkan dokumen pendukung yang relevan</li>
        </ul>
      </div>
      
      <div className="space-y-6">
        <h3 className="font-medium mb-3">Template APL 02</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Template APL 02 Metode Observasi */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              APL 02 - Metode Observasi
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleDownloadTemplate('apl02_observasi')}
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
                onClick={() => handleDownloadTemplate('apl02_portofolio')}
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
        <h3 className="font-medium mb-3">Upload APL 02</h3>
        
        <div className="space-y-4">
          {/* Upload APL 02 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload APL 02 Terisi <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.apl02 ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.apl02 ? (
                      <p className="text-xs">{formData.apl02.name}</p>
                    ) : (
                      <p className="text-xs">PDF (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="apl02"
                  name="apl02"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
              </label>
            </div>
            {formErrors.apl02 && (
              <p className="text-sm text-red-500">{formErrors.apl02}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-6 mt-8">
        <h3 className="font-medium mb-3">Dokumen Pendukung</h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload dokumen tambahan yang mendukung proses asesmen Anda (sertifikat, hasil kerja, foto kegiatan, dll)
        </p>
        
        <div className="space-y-4">
          {/* Daftar Dokumen Pendukung */}
          {formData.supportingDocuments.length > 0 && (
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