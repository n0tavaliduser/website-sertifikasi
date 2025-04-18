import React, { useEffect, useState } from 'react';
import { 
  FiUsers, 
  FiFileText, 
  FiCheckSquare, 
  FiTrendingUp, 
  FiCalendar,
  FiActivity,
  FiList,
  FiPlus,
  FiBarChart2,
  FiCheck,
  FiClock,
  FiSend,
  FiClipboard,
  FiThumbsUp
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
 * Komponen Statistik Jumlah Asesi
 */
const AssesseeStats = ({ totalBySchema, totalByInstance }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Statistik Asesi</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Per Skema</h3>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiBarChart2 size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalBySchema}</p>
              <p className="text-sm text-gray-500">Skema Aktif</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Per Instansi</h3>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiBarChart2 size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalByInstance}</p>
              <p className="text-sm text-gray-500">Instansi Aktif</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Komponen Status Progres Asesmen
 */
const AssessmentProgress = ({ requested, approved, completed }) => {
  // Menghitung total untuk persentase
  const total = requested + approved + completed;
  
  // Menghitung persentase masing-masing status
  const requestedPercent = total ? Math.round((requested / total) * 100) : 0;
  const approvedPercent = total ? Math.round((approved / total) * 100) : 0;
  const completedPercent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Status Progres</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium flex items-center gap-2">
              <FiClock className="text-yellow-500" /> Asesi Aktif
            </span>
            <span className="text-sm text-gray-500">{requested} ({requestedPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${requestedPercent}%` }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium flex items-center gap-2">
              <FiCheck className="text-blue-500" /> Asesmen Berjalan
            </span>
            <span className="text-sm text-gray-500">{approved} ({approvedPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${approvedPercent}%` }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium flex items-center gap-2">
              <FiSend className="text-green-500" /> Sertifikat Terkirim
            </span>
            <span className="text-sm text-gray-500">{completed} ({completedPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completedPercent}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Komponen Shortcut Fitur Penting
 */
const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Akses Cepat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/admin/verifikasi" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
            <FiClipboard size={20} />
          </div>
          <span className="text-sm font-medium text-gray-700">Verifikasi</span>
        </a>
        
        <a href="/admin/jadwal" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
            <FiCalendar size={20} />
          </div>
          <span className="text-sm font-medium text-gray-700">Jadwal</span>
        </a>
        
        <a href="/admin/konfirmasi" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-2">
            <FiThumbsUp size={20} />
          </div>
          <span className="text-sm font-medium text-gray-700">Konfirmasi</span>
        </a>
      </div>
    </div>
  );
};

/**
 * Halaman Dashboard Utama
 */
export const HomeDashboard = () => {
  // State untuk menyimpan data statistik
  const [statistics, setStatistics] = useState({
    totalAssessees: 0,
    totalByInstance: 0,
    totalBySchema: 0,
    requested: 0,
    approved: 0,
    completed: 0,
    loading: true,
    error: null
  });

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Fungsi untuk mengambil data statistik
  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/assessee/statistic-detail`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setStatistics({
          totalAssessees: result.data.total_assessees || 0,
          totalByInstance: result.data.total_assessees_by_instance || 0,
          totalBySchema: result.data.total_assessees_by_schema || 0,
          requested: result.data.total_requested_assessees || 0,
          approved: result.data.total_approved_assessees || 0,
          completed: result.data.total_completed_assessees || 0,
          loading: false,
          error: null
        });
      } else {
        setStatistics(prev => ({
          ...prev,
          loading: false,
          error: result.message || "Gagal mendapatkan data statistik"
        }));
      }
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setStatistics(prev => ({
        ...prev,
        loading: false,
        error: "Terjadi kesalahan saat mengambil data statistik"
      }));
    }
  };

  // Memanggil fungsi fetchStatistics saat komponen dimuat
  useEffect(() => {
    fetchStatistics();
  }, [API_URL]);

  return (
    <div>
      {/* Judul Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Selamat datang kembali!</p>
      </div>
      
      {/* Tampilkan loading state atau error jika ada */}
      {statistics.loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : statistics.error ? (
        <div className="bg-red-100 text-red-700 p-6 rounded-lg mb-8">
          {statistics.error}
        </div>
      ) : (
        <>
          {/* Statistik Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Peserta" 
              value={statistics.totalAssessees.toString()} 
              icon={<FiUsers size={24} />} 
              color="blue" 
              change={{ type: 'up', value: 12 }}
            />
            <StatCard 
              title="Skema Aktif" 
              value={statistics.totalBySchema.toString()} 
              icon={<FiList size={24} />} 
              color="green" 
              change={{ type: 'up', value: 4 }}
            />
            <StatCard 
              title="Sertifikat Terbit" 
              value={statistics.completed.toString()} 
              icon={<FiFileText size={24} />} 
              color="purple" 
              change={{ type: 'up', value: 8 }}
            />
            <StatCard 
              title="Asesmen Selesai" 
              value={statistics.approved.toString()} 
              icon={<FiCheckSquare size={24} />} 
              color="orange" 
              change={{ type: 'down', value: 2 }}
            />
          </div>
          
          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>
          
          {/* Progress dan Statistik */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Progress Status */}
            <AssessmentProgress 
              requested={statistics.requested} 
              approved={statistics.approved} 
              completed={statistics.completed} 
            />
            
            {/* Statistik Asesi */}
            <AssesseeStats 
              totalBySchema={statistics.totalBySchema} 
              totalByInstance={statistics.totalByInstance} 
            />
          </div>
        </>
      )}
    </div>
  );
};
