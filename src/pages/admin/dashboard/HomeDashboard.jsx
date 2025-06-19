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
const TopSchemes = ({ schemaData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Skema Sertifikasi Teratas</h2>
        <button className="text-blue-500 text-sm hover:text-blue-700">Lihat Semua</button>
      </div>
      <div className="space-y-4">
        {schemaData.slice(0, 4).map((scheme) => (
          <div key={scheme.schema_id} className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{scheme.schema_name}</span>
              <span className="text-sm text-gray-500">{scheme.completion_rate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${scheme.completion_rate}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{scheme.total_participants} Peserta</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Komponen Jadwal Mendatang
 */
const UpcomingSchedule = ({ monthlyData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Jadwal Mendatang</h2>
      </div>
      <div className="space-y-4">
        {monthlyData.slice(0, 3).map((event, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <FiCalendar />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">{event.schema_name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">{event.date_range}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-xs text-gray-500">{event.total_participants} Peserta</span>
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
    monthlyData: [],
    schemaData: [],
    loading: true,
    error: null
  });

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Fungsi untuk mengambil data statistik
  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Mengambil data statistik detail
      const detailResponse = await fetch(`${API_URL}/statistics/detail`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!detailResponse.ok) {
        throw new Error(`Error: ${detailResponse.status}`);
      }
      
      const detailResult = await detailResponse.json();
      
      // Mengambil data statistik skema
      const schemaResponse = await fetch(`${API_URL}/statistics/schema`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!schemaResponse.ok) {
        throw new Error(`Error: ${schemaResponse.status}`);
      }
      
      const schemaResult = await schemaResponse.json();
      
      // Mengambil data statistik bulanan
      const monthlyResponse = await fetch(`${API_URL}/statistics/monthly`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!monthlyResponse.ok) {
        throw new Error(`Error: ${monthlyResponse.status}`);
      }
      
      const monthlyResult = await monthlyResponse.json();
      
      if (detailResult.success && detailResult.data) {
        const yearlyStats = detailResult.data.yearly_statistics;
        const monthlyDetails = detailResult.data.monthly_details;
        
        setStatistics({
          totalAssessees: yearlyStats.total_assessees || 0,
          totalByInstance: yearlyStats.total_by_instance || 0,
          totalBySchema: yearlyStats.total_by_schema || 0,
          requested: yearlyStats.status_counts?.pending || 0,
          approved: yearlyStats.status_counts?.approved || 0,
          completed: yearlyStats.status_counts?.completed || 0,
          monthlyData: monthlyDetails || [],
          schemaData: schemaResult.data || [],
          loading: false,
          error: null
        });
      } else {
        setStatistics(prev => ({
          ...prev,
          loading: false,
          error: detailResult.message || "Gagal mendapatkan data statistik"
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
            />
            <StatCard 
              title="Skema Aktif" 
              value={statistics.totalBySchema.toString()} 
              icon={<FiList size={24} />} 
              color="green"
            />
            <StatCard 
              title="Sertifikat Terbit" 
              value={statistics.completed.toString()} 
              icon={<FiFileText size={24} />} 
              color="purple"
            />
            <StatCard 
              title="Asesmen Selesai" 
              value={statistics.approved.toString()} 
              icon={<FiCheckSquare size={24} />} 
              color="orange"
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

          {/* Skema dan Jadwal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopSchemes schemaData={statistics.schemaData || []} />
            <UpcomingSchedule monthlyData={statistics.monthlyData || []} />
          </div>
        </>
      )}
    </div>
  );
};
