import { FaInfoCircle } from 'react-icons/fa';

const Confirmation = ({ formData, formErrors, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Konfirmasi dan Permohonan Sertifikat</h2>
      
      <div className="bg-green-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-green-700 mb-2">
          <FaInfoCircle className="inline-block mr-2" />
          Tahap Akhir Pendaftaran
        </h3>
        <p className="text-sm text-green-800">
          Setelah Anda mengisi semua data dan mengunggah dokumen yang diperlukan, silakan periksa kembali semua informasi yang telah dimasukkan. Pastikan semua data sudah benar dan lengkap sebelum mengajukan permohonan sertifikat.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-4">Data Pendaftaran</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
              <p className="font-medium">{formData.fullName}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">NIK / No KTP</p>
              <p className="font-medium">{formData.idNumber}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Tempat, Tanggal Lahir</p>
              <p className="font-medium">
                {formData.birthPlace}, {formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('id-ID') : '-'}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Email & No HP</p>
              <p className="font-medium">{formData.email} / {formData.phoneNumber}</p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Alamat</p>
              <p className="font-medium">{formData.address}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Pendidikan Terakhir</p>
              <p className="font-medium">{formData.education}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Instansi</p>
              <p className="font-medium">{formData.instanceName || '-'}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-3">Informasi Sertifikasi</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Skema Sertifikasi</p>
                <p className="font-medium">{formData.schemaName || '-'}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Metode Sertifikasi</p>
                <p className="font-medium">
                  {formData.certificationMethod === 'observasi' ? 'Observasi' : 
                   formData.certificationMethod === 'portofolio' ? 'Portofolio' : '-'}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Tanggal Pelaksanaan</p>
                <p className="font-medium">
                  {formData.assessmentDate ? new Date(formData.assessmentDate).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : '-'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-3">Dokumen</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-sm">
                <span className={formData.lastDiploma ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {formData.lastDiploma ? '✓' : '✗'} Ijazah Terakhir
                </span>
              </li>
              <li className="text-sm">
                <span className={formData.idCard ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {formData.idCard ? '✓' : '✗'} KTP
                </span>
              </li>
              <li className="text-sm">
                <span className={formData.familyCard ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {formData.familyCard ? '✓' : '✗'} Kartu Keluarga
                </span>
              </li>
              <li className="text-sm">
                <span className={formData.photo ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {formData.photo ? '✓' : '✗'} Pas Foto
                </span>
              </li>
              <li className="text-sm">
                <span className={formData.instanceSupport ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {formData.instanceSupport ? '✓' : '✗'} Surat Dukungan Instansi
                </span>
              </li>
              <li className="text-sm">
                <span className={formData.apl01 ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {formData.apl01 ? '✓' : '✗'} APL 01
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mt-6">
        <h3 className="font-medium">Permohonan Sertifikat</h3>
        
        <div className="p-4 bg-gray-50 rounded-md space-y-4">
          <div className="flex items-start space-x-2">
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="hasCompletedAssessment"
                name="hasCompletedAssessment"
                type="checkbox"
                checked={formData.hasCompletedAssessment}
                onChange={(e) => handleChange({
                  target: {
                    name: e.target.name,
                    value: e.target.checked
                  }
                })}
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  formErrors.hasCompletedAssessment ? 'border-red-500' : ''
                }`}
              />
            </div>
            <label htmlFor="hasCompletedAssessment" className="text-sm font-medium text-gray-700">
              Saya menyatakan telah mengisi seluruh data dan dokumen dengan sebenar-benarnya dan sesuai dengan ketentuan yang berlaku.
            </label>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="requestCertificate"
                name="requestCertificate"
                type="checkbox"
                checked={formData.requestCertificate}
                onChange={(e) => handleChange({
                  target: {
                    name: e.target.name,
                    value: e.target.checked
                  }
                })}
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  formErrors.requestCertificate ? 'border-red-500' : ''
                }`}
                disabled={!formData.hasCompletedAssessment}
              />
            </div>
            <label 
              htmlFor="requestCertificate" 
              className={`text-sm font-medium ${
                !formData.hasCompletedAssessment ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              Saya mengajukan permohonan penerbitan sertifikat kompetensi dan sanggup mengikuti asesmen sesuai dengan jadwal yang telah ditentukan.
            </label>
          </div>
          
          {(formErrors.hasCompletedAssessment || formErrors.requestCertificate) && (
            <p className="text-sm text-red-500 mt-2">
              {formErrors.hasCompletedAssessment || formErrors.requestCertificate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 