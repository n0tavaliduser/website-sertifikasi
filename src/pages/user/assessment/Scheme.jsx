import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaSpinner } from 'react-icons/fa';

const Scheme = ({ formData, formErrors, handleChange }) => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/schemas`);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data skema sertifikasi');
        }
        
        const result = await response.json();
        setSchemes(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching schemas:', err);
        setError('Terjadi kesalahan saat mengambil data skema sertifikasi');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [API_URL]);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Pilih Skema Sertifikasi</h2>
        <p className="text-sm text-gray-600">Silakan pilih skema sertifikasi yang Anda inginkan</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          <span className="ml-2 text-gray-600">Memuat data skema...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaInfoCircle className="text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Terjadi kesalahan</h3>
              <p className="text-sm text-red-700 mt-2">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Skema Sertifikasi */}
          <div className="space-y-2">
            <label htmlFor="schema_id" className="block text-sm font-medium text-gray-700">
              Skema Sertifikasi <span className="text-red-500">*</span>
            </label>
            <select
              id="schema_id"
              name="schema_id"
              value={formData.schema_id}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                formErrors.schema_id ? 'border-red-300' : 'border-gray-300'
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
            >
              <option value="">Pilih Skema Sertifikasi</option>
              {schemes.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.title}
                </option>
              ))}
            </select>
            {formErrors.schema_id && (
              <p className="text-red-500 text-xs italic flex items-center mt-1">
                <FaInfoCircle className="mr-1" /> {formErrors.schema_id}
              </p>
            )}
          </div>

          {/* Tujuan Asesmen */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tujuan Asesmen <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="purpose-sertifikasi"
                  name="assessment_purpose"
                  type="radio"
                  value="sertifikasi"
                  checked={formData.assessment_purpose === 'sertifikasi'}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="purpose-sertifikasi" className="ml-2 block text-sm text-gray-700">
                  Sertifikasi
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="purpose-resertifikasi"
                  name="assessment_purpose"
                  type="radio"
                  value="resertifikasi"
                  checked={formData.assessment_purpose === 'resertifikasi'}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="purpose-resertifikasi" className="ml-2 block text-sm text-gray-700">
                  Re-Sertifikasi
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="purpose-pengakuan"
                  name="assessment_purpose"
                  type="radio"
                  value="pengakuan_kompetensi_terkini"
                  checked={formData.assessment_purpose === 'pengakuan_kompetensi_terkini'}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="purpose-pengakuan" className="ml-2 block text-sm text-gray-700">
                  Pengakuan Kompetensi Terkini (PKT)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="purpose-lainnya"
                  name="assessment_purpose"
                  type="radio"
                  value="lainnya"
                  checked={formData.assessment_purpose === 'lainnya'}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="purpose-lainnya" className="ml-2 block text-sm text-gray-700">
                  Lainnya
                </label>
              </div>
            </div>
            {formErrors.assessment_purpose && (
              <p className="text-red-500 text-xs italic flex items-center mt-1">
                <FaInfoCircle className="mr-1" /> {formErrors.assessment_purpose}
              </p>
            )}
          </div>

          {/* Tulis Alasan */}
          <div className="space-y-2">
            <label htmlFor="assessment_note" className="block text-sm font-medium text-gray-700">
              Alasan/Catatan Tambahan
            </label>
            <textarea
              id="assessment_note"
              name="assessment_note"
              rows="3"
              value={formData.assessment_note}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                formErrors.assessment_note ? 'border-red-300' : 'border-gray-300'
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
              placeholder="Silakan tuliskan alasan atau catatan tambahan jika ada..."
            ></textarea>
            {formErrors.assessment_note && (
              <p className="text-red-500 text-xs italic flex items-center mt-1">
                <FaInfoCircle className="mr-1" /> {formErrors.assessment_note}
              </p>
            )}
          </div>

          {/* Agreement */}
          <div className="pt-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agree_terms"
                  name="agree_terms"
                  type="checkbox"
                  checked={formData.agree_terms || false}
                  onChange={(e) => handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked
                    }
                  })}
                  className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agree_terms" className="font-medium text-gray-700">
                  Persetujuan
                </label>
                <p className="text-gray-500">
                  Saya menyatakan bahwa data yang saya isi adalah benar dan saya bersedia 
                  mengikuti proses asesmen sesuai dengan prosedur LSP.
                </p>
                {formErrors.agree_terms && (
                  <p className="text-red-500 text-xs italic flex items-center mt-1">
                    <FaInfoCircle className="mr-1" /> {formErrors.agree_terms}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheme; 