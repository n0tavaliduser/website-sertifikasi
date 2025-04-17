import React from 'react';
import { FaFileUpload, FaFileDownload, FaTrash } from 'react-icons/fa';

const DocumentUpload = ({ formData, formErrors, handleFileChange, handleDownloadTemplate }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Upload Dokumen</h2>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-blue-700 mb-2">Petunjuk Upload Dokumen</h3>
        <ul className="list-disc pl-5 text-sm text-blue-800">
          <li>Format file yang diperbolehkan: PDF, JPG, PNG</li>
          <li>Ukuran maksimal file: 5MB</li>
          <li>Pastikan dokumen dapat dibaca dengan jelas</li>
          <li>Untuk dokumen KTP dan foto, pastikan masih berlaku</li>
        </ul>
      </div>
      
      <div className="space-y-6">
        <h3 className="font-medium mb-3">Berkas Wajib</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ijazah Terakhir */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ijazah Terakhir <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.lastDiploma ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.lastDiploma ? (
                      <p className="text-xs">{formData.lastDiploma.name}</p>
                    ) : (
                      <p className="text-xs">PDF, JPG, atau PNG (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="lastDiploma"
                  name="lastDiploma"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            {formErrors.lastDiploma && (
              <p className="text-sm text-red-500">{formErrors.lastDiploma}</p>
            )}
          </div>
          
          {/* KTP */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              KTP <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.idCard ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.idCard ? (
                      <p className="text-xs">{formData.idCard.name}</p>
                    ) : (
                      <p className="text-xs">PDF, JPG, atau PNG (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="idCard"
                  name="idCard"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            {formErrors.idCard && (
              <p className="text-sm text-red-500">{formErrors.idCard}</p>
            )}
          </div>
          
          {/* KK */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Kartu Keluarga <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.familyCard ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.familyCard ? (
                      <p className="text-xs">{formData.familyCard.name}</p>
                    ) : (
                      <p className="text-xs">PDF, JPG, atau PNG (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="familyCard"
                  name="familyCard"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            {formErrors.familyCard && (
              <p className="text-sm text-red-500">{formErrors.familyCard}</p>
            )}
          </div>
          
          {/* Pas Foto */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Pas Foto 3x4 (Latar Merah) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.photo ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.photo ? (
                      <p className="text-xs">{formData.photo.name}</p>
                    ) : (
                      <p className="text-xs">JPG atau PNG (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                />
              </label>
            </div>
            {formErrors.photo && (
              <p className="text-sm text-red-500">{formErrors.photo}</p>
            )}
          </div>
          
          {/* Surat Dukungan Instansi */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Surat Dukungan Instansi <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.instanceSupport ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.instanceSupport ? (
                      <p className="text-xs">{formData.instanceSupport.name}</p>
                    ) : (
                      <p className="text-xs">PDF, JPG, atau PNG (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="instanceSupport"
                  name="instanceSupport"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            {formErrors.instanceSupport && (
              <p className="text-sm text-red-500">{formErrors.instanceSupport}</p>
            )}
          </div>
          
          {/* Surat Pernyataan (Opsional) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Surat Pernyataan (Opsional)
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.statement ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.statement ? (
                      <p className="text-xs">{formData.statement.name}</p>
                    ) : (
                      <p className="text-xs">PDF, JPG, atau PNG (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="statement"
                  name="statement"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            {formErrors.statement && (
              <p className="text-sm text-red-500">{formErrors.statement}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-6 mt-8">
        <h3 className="font-medium mb-3">Template Dokumen</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unduh Template APL 01 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              APL 01 (Formulir Permohonan)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleDownloadTemplate('apl01')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FaFileDownload className="mr-2" />
                Unduh Template
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Download, isi, dan upload kembali dokumen ini
            </p>
          </div>
          
          {/* Upload APL 01 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload APL 01 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className={`flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-md cursor-pointer ${formErrors.apl01 ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600 hover:underline">
                      Pilih file
                    </span>
                    {formData.apl01 ? (
                      <p className="text-xs">{formData.apl01.name}</p>
                    ) : (
                      <p className="text-xs">PDF (Maks. 5MB)</p>
                    )}
                  </div>
                </div>
                <input
                  id="apl01"
                  name="apl01"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
              </label>
            </div>
            {formErrors.apl01 && (
              <p className="text-sm text-red-500">{formErrors.apl01}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload; 