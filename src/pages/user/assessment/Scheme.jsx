import React, { useState, useEffect } from 'react';
import { FaExclamationCircle, FaSpinner } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Scheme = ({ formData, formErrors, handleChange }) => {
  const [schemas, setSchemas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/schemas`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data skema');
        }
        const data = await response.json();
        setSchemas(data?.data || []);
      } catch (error) {
        console.error('Error fetching schemas:', error);
        setError('Terjadi kesalahan saat mengambil data skema sertifikasi. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemas();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
        Pilihan Skema Sertifikasi
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <FaSpinner className="animate-spin text-blue-500 mr-2" />
          <span>Memuat data skema...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          <p className="flex items-center">
            <FaExclamationCircle className="mr-2" />
            {error}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Skema Sertifikasi <span className="text-red-500">*</span>
              </label>
              <select
                id="schemaId"
                name="schemaId"
                value={formData.schemaId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.schemaId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Pilih Skema Sertifikasi --</option>
                {schemas.map((schema) => (
                  <option key={schema.id} value={schema.id}>
                    {schema.name}
                  </option>
                ))}
              </select>
              {formErrors.schemaId && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" /> {formErrors.schemaId}
                </p>
              )}
            </div>

            {formData.schemaId && (
              <div className="bg-blue-50 p-4 rounded-md">
                {schemas.find(schema => schema.id == formData.schemaId) && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-blue-800">
                      {schemas.find(schema => schema.id == formData.schemaId).name}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {schemas.find(schema => schema.id == formData.schemaId).description || 'Tidak ada deskripsi'}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2 mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Tujuan Asesmen <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="inline-flex items-center w-full p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="assessmentPurpose"
                    value="sertifikasi"
                    checked={formData.assessmentPurpose === 'sertifikasi'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block font-medium text-gray-700">Sertifikasi</span>
                    <span className="block text-xs text-gray-500">
                      Untuk mendapatkan sertifikat kompetensi baru
                    </span>
                  </div>
                </label>

                <label className="inline-flex items-center w-full p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="assessmentPurpose"
                    value="resertifikasi"
                    checked={formData.assessmentPurpose === 'resertifikasi'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block font-medium text-gray-700">Re-Sertifikasi</span>
                    <span className="block text-xs text-gray-500">
                      Untuk memperpanjang sertifikat kompetensi yang sudah dimiliki
                    </span>
                  </div>
                </label>

                <label className="inline-flex items-center w-full p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="assessmentPurpose"
                    value="rpl"
                    checked={formData.assessmentPurpose === 'rpl'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block font-medium text-gray-700">RPL</span>
                    <span className="block text-xs text-gray-500">
                      Rekognisi Pembelajaran Lampau
                    </span>
                  </div>
                </label>
              </div>
              {formErrors.assessmentPurpose && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" /> {formErrors.assessmentPurpose}
                </p>
              )}
            </div>

            {formData.assessmentPurpose === 'resertifikasi' && (
              <div className="space-y-2 mt-4">
                <label htmlFor="certificateNumber" className="block text-sm font-medium text-gray-700">
                  Nomor Sertifikat Sebelumnya <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="certificateNumber"
                  name="certificateNumber"
                  value={formData.certificateNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.certificateNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nomor sertifikat sebelumnya"
                />
                {formErrors.certificateNumber && (
                  <p className="text-red-500 text-xs flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" /> {formErrors.certificateNumber}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="pt-4 text-sm text-gray-500">
            <p><span className="text-red-500">*</span> Wajib diisi</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Scheme; 