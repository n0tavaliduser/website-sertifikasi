import React from 'react';
import { 
  FiUsers, 
  FiFileText, 
  FiCheckSquare, 
  FiTrendingUp, 
  FiCalendar,
  FiActivity,
  FiList,
  FiPlus
} from 'react-icons/fi';

/**
 * Komponen Card Statistik
 */
const StatCard = ({ title, value, icon, color, change }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center mt-2">
          <span className={`text-${change.type === 'up' ? 'green' : 'red'}-500 flex items-center text-sm`}>
            <FiTrendingUp className={`${change.type === 'down' ? 'transform rotate-180' : ''} mr-1`} />
            {change.value}%
          </span>
          <span className="text-gray-400 text-xs ml-2">dibanding bulan lalu</span>
        </div>
      )}
    </div>
  );
};

/**
 * Komponen Tabel Aktivitas Terbaru
 */
const RecentActivities = () => {
  const activities = [
    { id: 1, user: 'Budi Santoso', action: 'Mendaftar skema sertifikasi baru', time: '2 jam yang lalu' },
    { id: 2, user: 'Siti Aminah', action: 'Menyelesaikan asesmen', time: '3 jam yang lalu' },
    { id: 3, user: 'Ahmad Rizki', action: 'Menerima sertifikat', time: '5 jam yang lalu' },
    { id: 4, user: 'Dian Wahyuni', action: 'Mengupload dokumen persyaratan', time: '1 hari yang lalu' },
    { id: 5, user: 'Rudi Hermawan', action: 'Mendaftar sebagai asesor', time: '1 hari yang lalu' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h2>
        <button className="text-blue-500 text-sm hover:text-blue-700">Lihat Semua</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengguna
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktivitas
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waktu
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {activity.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {activity.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Komponen Skema Sertifikasi Teratas
 */
const TopSchemes = () => {
  const schemes = [
    { id: 1, name: 'Junior Web Developer', participants: 125, completion: 85 },
    { id: 2, name: 'Digital Marketing Specialist', participants: 98, completion: 72 },
    { id: 3, name: 'Network Administrator', participants: 76, completion: 64 },
    { id: 4, name: 'System Analyst', participants: 52, completion: 56 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Skema Sertifikasi Teratas</h2>
        <button className="text-blue-500 text-sm hover:text-blue-700">Lihat Semua</button>
      </div>
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{scheme.name}</span>
              <span className="text-sm text-gray-500">{scheme.completion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${scheme.completion}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{scheme.participants} Peserta</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Komponen Jadwal Mendatang
 */
const UpcomingSchedule = () => {
  const events = [
    { id: 1, title: 'Sesi Asesmen Junior Web Developer', date: '15 Nov 2023', time: '09:00 - 12:00' },
    { id: 2, title: 'Workshop Persiapan Sertifikasi', date: '18 Nov 2023', time: '13:00 - 16:00' },
    { id: 3, title: 'Pembahasan Materi Uji Kompetensi', date: '22 Nov 2023', time: '10:00 - 12:00' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Jadwal Mendatang</h2>
        <button className="flex items-center text-blue-500 text-sm hover:text-blue-700">
          <FiPlus className="mr-1" size={14} />
          Tambah
        </button>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start">
            <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <FiCalendar />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">{event.title}</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">{event.date}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-xs text-gray-500">{event.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Halaman Dashboard Utama
 */
export const HomeDashboard = () => {
  return (
    <div>
      {/* Judul Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Selamat datang kembali, Admin!</p>
      </div>
      
      {/* Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Peserta" 
          value="1,248" 
          icon={<FiUsers size={24} />} 
          color="blue" 
          change={{ type: 'up', value: 12 }}
        />
        <StatCard 
          title="Skema Aktif" 
          value="24" 
          icon={<FiList size={24} />} 
          color="green" 
          change={{ type: 'up', value: 4 }}
        />
        <StatCard 
          title="Sertifikat Terbit" 
          value="856" 
          icon={<FiFileText size={24} />} 
          color="purple" 
          change={{ type: 'up', value: 8 }}
        />
        <StatCard 
          title="Asesmen Selesai" 
          value="736" 
          icon={<FiCheckSquare size={24} />} 
          color="orange" 
          change={{ type: 'down', value: 2 }}
        />
      </div>
      
      {/* Grafik & Tabel Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Aktivitas Terbaru - 2/3 lebar */}
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        
        {/* Skema Teratas - 1/3 lebar */}
        <div className="lg:col-span-1">
          <TopSchemes />
        </div>
      </div>
      
      {/* Jadwal Mendatang */}
      <div className="mb-8">
        <UpcomingSchedule />
      </div>
    </div>
  );
};
