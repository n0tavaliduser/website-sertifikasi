import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiLoader, FiArrowLeft } from 'react-icons/fi';

const EditAssessor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [assessor, setAssessor] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    photo: null
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch assessor data
  useEffect(() => {
    const fetchAssessor = async () => {
      try {
        setLoadingData(true);
        setError(null);
        
        const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Token tidak ditemukan. Silakan login kembali.');
          return;
        }

        const response = await fetch(`${API_URL}/assessors/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Assessor tidak ditemukan');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Laravel model response format (langsung data model)
        if (data && data.id) {
          const assessorData = data;
          setAssessor(assessorData);
          setFormData({
            code: assessorData.code || '',
            name: assessorData.name || '',
            photo: null // Reset photo, akan diisi jika user upload baru
          });
        } else {
          throw new Error('Data assessor tidak ditemukan');
        }
      } catch (err) {
        console.error('Error fetching assessor:', err);
        setError(err.message || 'Terjadi kesalahan saat mengambil data assessor');
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchAssessor();
    }
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo' && files && files[0]) {
      // Validasi file
      const file = files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      
      if (file.size > maxSize) {
        setFormErrors(prev => ({
          ...prev,
          photo: 'Ukuran file terlalu besar. Maksimal 5MB.'
        }));
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        setFormErrors(prev => ({
          ...prev,
          photo: 'Format file tidak didukung. Gunakan JPEG, PNG, atau JPG.'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Clear error
      if (formErrors.photo) {
        setFormErrors(prev => ({
          ...prev,
          photo: null
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error
      if (formErrors[name]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: null
        }));
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.code.trim()) {
      errors.code = 'Kode assessor wajib diisi';
    }
    
    if (!formData.name.trim()) {
      errors.name = 'Nama assessor wajib diisi';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Token tidak ditemukan. Silakan login kembali.');
        return;
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('code', formData.code);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('_method', 'PUT'); // Laravel method spoofing
      
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }
      
      const response = await fetch(`${API_URL}/assessors/${id}`, {
        method: 'POST', // Laravel menggunakan POST dengan _method untuk PUT
        headers: {
          'Authorization': `Bearer ${token}`,
          // Jangan set Content-Type untuk FormData
        },
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (response.status === 422 && result.errors) {
          setFormErrors(result.errors);
          return;
        }
        throw new Error(result.message || 'Terjadi kesalahan saat memperbarui data');
      }
      
      // Success - redirect to assessor list
      alert('Assessor berhasil diperbarui!');
      navigate('/app/assessor');
      
    } catch (err) {
      console.error('Error updating assessor:', err);
      setError(err.message || 'Terjadi kesalahan saat memperbarui data assessor');
    } finally {
      setLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/app/assessor');
  };

  // Get photo URL
  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}/storage/${photoPath}`;
  };

  // Loading state
  if (loadingData) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <FiLoader className="animate-spin mr-2" />
            <span>Memuat data assessor...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !assessor) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <FiArrowLeft />
              Kembali ke Daftar Assessor
            </button>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <FiArrowLeft />
            Kembali ke Daftar Assessor
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Assessor</h1>
          <p className="text-gray-600">Perbarui informasi assessor dalam sistem sertifikasi</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Photo */}
            {assessor && assessor.photo && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Saat Ini
                </label>
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={getPhotoUrl(assessor.photo)}
                    alt={assessor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    Error
                  </div>
                </div>
              </div>
            )}

            {/* Kode Assessor */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Kode Assessor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.code ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan kode assessor (contoh: ASR001)"
              />
              {formErrors.code && (
                <p className="text-red-500 text-sm mt-1">{formErrors.code}</p>
              )}
            </div>

            {/* Nama Assessor */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Assessor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan nama lengkap assessor"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Foto Assessor Baru */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                Foto Assessor Baru (Opsional)
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleInputChange}
                accept="image/jpeg,image/png,image/jpg"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.photo ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.photo && (
                <p className="text-red-500 text-sm mt-1">{formErrors.photo}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Format yang didukung: JPEG, PNG, JPG. Maksimal ukuran file 5MB. Kosongkan jika tidak ingin mengubah foto.
              </p>
              
              {/* Preview foto baru jika ada */}
              {formData.photo && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">Preview Foto Baru:</p>
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 flex items-center"
              >
                {loading && <FiLoader className="animate-spin mr-2" />}
                {loading ? 'Memperbarui...' : 'Perbarui Assessor'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAssessor;
