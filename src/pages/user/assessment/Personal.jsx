import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const Personal = ({ formData, formErrors, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Data Pribadi</h2>
        <p className="text-sm text-gray-600">Silakan lengkapi informasi pribadi Anda</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nama Lengkap */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.fullName ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.fullName}
            </p>
          )}
        </div>
        
        {/* Nomor KTP */}
        <div className="space-y-2">
          <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
            Nomor KTP <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.idNumber ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.idNumber && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.idNumber}
            </p>
          )}
        </div>
        
        {/* Tempat Lahir */}
        <div className="space-y-2">
          <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700">
            Tempat Lahir <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="birthPlace"
            name="birthPlace"
            value={formData.birthPlace}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.birthPlace ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.birthPlace && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.birthPlace}
            </p>
          )}
        </div>
        
        {/* Tanggal Lahir */}
        <div className="space-y-2">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            Tanggal Lahir <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.birthDate ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.birthDate && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.birthDate}
            </p>
          )}
        </div>
        
        {/* Jenis Kelamin */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4 mt-1">
            <div className="flex items-center">
              <input
                id="gender-male"
                name="gender"
                type="radio"
                value="laki-laki"
                checked={formData.gender === 'laki-laki'}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-700">
                Laki-laki
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="gender-female"
                name="gender"
                type="radio"
                value="perempuan"
                checked={formData.gender === 'perempuan'}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-700">
                Perempuan
              </label>
            </div>
          </div>
          {formErrors.gender && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.gender}
            </p>
          )}
        </div>
        
        {/* Kewarganegaraan */}
        <div className="space-y-2">
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
            Kewarganegaraan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.nationality ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.nationality && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.nationality}
            </p>
          )}
        </div>
      </div>
      
      {/* Alamat */}
      <div className="space-y-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Alamat <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows="3"
          value={formData.address}
          onChange={handleChange}
          className={`block w-full rounded-md border ${
            formErrors.address ? 'border-red-300' : 'border-gray-300'
          } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
        ></textarea>
        {formErrors.address && (
          <p className="text-red-500 text-xs italic flex items-center mt-1">
            <FaInfoCircle className="mr-1" /> {formErrors.address}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kode Pos */}
        <div className="space-y-2">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Kode Pos
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.postalCode ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.postalCode && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.postalCode}
            </p>
          )}
        </div>
        
        {/* Nomor Telepon */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.phone ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.phone}
            </p>
          )}
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.email ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.email}
            </p>
          )}
        </div>
        
        {/* Pendidikan Terakhir */}
        <div className="space-y-2">
          <label htmlFor="education" className="block text-sm font-medium text-gray-700">
            Pendidikan Terakhir <span className="text-red-500">*</span>
          </label>
          <select
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.education ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
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
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.education}
            </p>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-medium text-gray-900">Informasi Pekerjaan</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Jabatan */}
        <div className="space-y-2">
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Jabatan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.position ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.position && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.position}
            </p>
          )}
        </div>
        
        {/* Nama Instansi/Perusahaan */}
        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Nama Instansi/Perusahaan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              formErrors.companyName ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
          />
          {formErrors.companyName && (
            <p className="text-red-500 text-xs italic flex items-center mt-1">
              <FaInfoCircle className="mr-1" /> {formErrors.companyName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Personal; 