import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiPhone } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

const TuksList = () => {
  const navigate = useNavigate();
  const [tuksList, setTuksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTuks, setCurrentTuks] = useState(null);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Mengambil data TUKS dari API
  const fetchTuks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/tuks`, {
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
        setTuksList(result.data);
      } else {
        setError(result.message || "Gagal mendapatkan data TUKS");
      }
    } catch (err) {
      console.error("Error fetching TUKS data:", err);
      setError("Terjadi kesalahan saat mengambil data TUKS");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuks();
  }, [API_URL]);

  // Filter TUKS berdasarkan pencarian
  const filteredTuks = tuksList.filter(item => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Membuka dialog konfirmasi hapus
  const handleDelete = (tuksItem) => {
    setCurrentTuks(tuksItem);
    setShowDeleteModal(true);
  };

  // Menghapus TUKS
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/tuks/${currentTuks.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal menghapus TUKS");
      }
      
      toast.success("TUKS berhasil dihapus");
      setShowDeleteModal(false);
      fetchTuks();
    } catch (err) {
      console.error("Error deleting TUKS:", err);
      toast.error(err.message || "Terjadi kesalahan saat menghapus TUKS");
    } finally {
      setLoading(false);
    }
  };

  // Truncate text dengan jumlah karakter tertentu
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Badge untuk tipe TUKS
  const TuksBadge = ({ type }) => {
    let color;
    switch (type?.toLowerCase()) {
      case 'mandiri':
        color = 'bg-blue-100 text-blue-800';
        break;
      case 'sewaktu':
        color = 'bg-green-100 text-green-800';
        break;
      case 'jaringan':
        color = 'bg-purple-100 text-purple-800';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {type || "Tidak ada tipe"}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Daftar Tempat Uji Kompetensi</h1>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari TUKS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Button 
            onClick={() => navigate("create")} 
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <FiPlus /> Tambah TUKS
          </Button>
        </div>
      </div>

      {loading && tuksList.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : filteredTuks.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada data TUKS{searchQuery && " yang sesuai dengan pencarian"}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTuks.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {item.image_url ? (
                  <img
                    src={`${API_BASE_URL}/${item.image_url}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'src/assets/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">Tidak ada gambar</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <TuksBadge type={item.type} />
                </div>
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <FiMapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.address || "Tidak ada alamat"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="h-4 w-4 text-gray-500" />
                    <p className="text-gray-600 text-sm">
                      {item.phone || "Tidak ada nomor telepon"}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(`${item.id}/edit`)}
                    className="flex items-center gap-1"
                  >
                    <FiEdit2 className="h-4 w-4" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(item)}
                    className="flex items-center gap-1"
                  >
                    <FiTrash2 className="h-4 w-4" /> Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus TUKS "{currentTuks?.name}"? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Batal
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TuksList;
