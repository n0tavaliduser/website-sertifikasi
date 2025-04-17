import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Personal = ({ formData, formErrors, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
        Data Pribadi
      </h2>
      
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan nama lengkap"
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.fullName}
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.idNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan nomor KTP"
          />
          {formErrors.idNumber && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.idNumber}
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.birthPlace ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan tempat lahir"
          />
          {formErrors.birthPlace && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.birthPlace}
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.birthDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.birthDate && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.birthDate}
            </p>
          )}
        </div>
        
        {/* Jenis Kelamin */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Laki-laki</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Perempuan</span>
            </label>
          </div>
          {formErrors.gender && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.gender}
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.nationality ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan kewarganegaraan"
          />
          {formErrors.nationality && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.nationality}
            </p>
          )}
        </div>
        
        {/* Alamat - Kolom penuh */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Alamat <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan alamat lengkap"
          ></textarea>
          {formErrors.address && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.address}
            </p>
          )}
        </div>
        
        {/* Kode Pos */}
        <div className="space-y-2">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Kode Pos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.postalCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan kode pos"
          />
          {formErrors.postalCode && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.postalCode}
            </p>
          )}
        </div>
        
        {/* Nomor Telepon */}
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan nomor telepon"
          />
          {formErrors.phoneNumber && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.phoneNumber}
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan alamat email"
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.email}
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.education ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Pilih Pendidikan Terakhir --</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA/SMK</option>
            <option value="D1">D1</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
            <option value="D4">D4</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
          {formErrors.education && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.education}
            </p>
          )}
        </div>
        
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.position ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan jabatan"
          />
          {formErrors.position && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.position}
            </p>
          )}
        </div>
        
        {/* Nama Instansi */}
        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Nama Instansi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan nama instansi"
          />
          {formErrors.companyName && (
            <p className="text-red-500 text-xs flex items-center mt-1">
              <FaExclamationCircle className="mr-1" /> {formErrors.companyName}
            </p>
          )}
        </div>
      </div>
      
      <div className="pt-4 text-sm text-gray-500">
        <p><span className="text-red-500">*</span> Wajib diisi</p>
      </div>
    </div>
  );
};

export default Personal; 