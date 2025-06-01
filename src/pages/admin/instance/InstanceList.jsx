import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiClock } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

const InstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentInstance, setCurrentInstance] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "",
    assessment_times: [new Date().toISOString().slice(0, 16)] // Default ke datetime sekarang
  });
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Mengambil data instance dari API
  const fetchInstances = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/instances`, {
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
        setInstances(result.data);
      } else {
        setError(result.message || "Gagal mendapatkan data instance");
      }
    } catch (err) {
      console.error("Error fetching instance data:", err);
      setError("Terjadi kesalahan saat mengambil data instance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstances();
  }, [API_URL]);

  // Filter instance berdasarkan pencarian
  const filteredInstances = instances.filter(item => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi untuk membuka modal tambah
  const handleAdd = () => {
    setFormData({ 
      name: "",
      assessment_times: [new Date().toISOString().slice(0, 16)] // Default ke datetime sekarang
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Fungsi untuk membuka modal edit
  const handleEdit = (instance) => {
    setCurrentInstance(instance);
    
    // Ambil assessment times dari instance atau set default
    const assessmentTimes = instance.instance_assessment_times && instance.instance_assessment_times.length > 0
      ? instance.instance_assessment_times.map(time => {
          try {
            // Jika format SQL datetime (YYYY-MM-DD HH:MM:SS), convert ke datetime-local
            if (time.assessment_time.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
              // Anggap waktu dari backend adalah waktu Jakarta, konversi langsung ke format datetime-local
              // tanpa perubahan timezone karena user input dan display harus konsisten
              const [datePart, timePart] = time.assessment_time.split(' ');
              const [hour, minute] = timePart.split(':');
              
              // Format langsung ke datetime-local tanpa konversi timezone
              return `${datePart}T${hour}:${minute}`;
            }
            // Jika sudah dalam format datetime-local, gunakan langsung
            else if (time.assessment_time.includes('T') || time.assessment_time.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
              return time.assessment_time.slice(0, 16);
            }
            // Jika format lama (text), convert ke datetime hari ini
            else {
              const today = new Date().toISOString().slice(0, 10);
              return `${today}T09:00`; // Default jam 9 pagi
            }
          } catch {
            // Jika gagal convert, gunakan default
            const today = new Date().toISOString().slice(0, 10);
            return `${today}T09:00`;
          }
        })
      : [new Date().toISOString().slice(0, 16)];
    
    setFormData({ 
      name: instance.name,
      assessment_times: assessmentTimes
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Fungsi untuk membuka modal hapus
  const handleDelete = (instance) => {
    setCurrentInstance(instance);
    setShowDeleteModal(true);
  };

  // Handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Bersihkan error untuk field yang diubah
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  // Handle perubahan assessment time
  const handleAssessmentTimeChange = (index, value) => {
    const newAssessmentTimes = [...formData.assessment_times];
    newAssessmentTimes[index] = value;
    setFormData({ ...formData, assessment_times: newAssessmentTimes });
    
    // Bersihkan error untuk assessment times
    if (formErrors.assessment_times) {
      setFormErrors({ ...formErrors, assessment_times: null });
    }
  };

  // Tambah row assessment time
  const addAssessmentTime = () => {
    const newDateTime = new Date();
    newDateTime.setHours(newDateTime.getHours() + 1); // Tambah 1 jam dari waktu sekarang
    
    setFormData({
      ...formData,
      assessment_times: [...formData.assessment_times, newDateTime.toISOString().slice(0, 16)]
    });
  };

  // Hapus row assessment time
  const removeAssessmentTime = (index) => {
    if (formData.assessment_times.length > 1) {
      const newAssessmentTimes = formData.assessment_times.filter((_, i) => i !== index);
      setFormData({ ...formData, assessment_times: newAssessmentTimes });
    }
  };

  // Validasi form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Nama instance wajib diisi";
    }

    // Validasi assessment times
    const validAssessmentTimes = formData.assessment_times.filter(time => time.trim() !== "");
    if (validAssessmentTimes.length === 0) {
      errors.assessment_times = "Minimal satu waktu asesmen harus diisi";
    } else {
      // Validasi bahwa waktu tidak boleh di masa lalu
      const now = new Date();
      const hasInvalidTime = validAssessmentTimes.some(time => {
        const selectedTime = new Date(time);
        return selectedTime <= now;
      });
      
      if (hasInvalidTime) {
        errors.assessment_times = "Waktu asesmen tidak boleh di masa lalu";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Prepare data untuk dikirim ke API
  const prepareFormData = () => {
    const dataToSend = {
      name: formData.name.trim()
    };

    // Filter assessment times yang tidak kosong dan format ke datetime SQL dengan timezone Asia/Jakarta
    const validAssessmentTimes = formData.assessment_times
      .filter(time => time.trim() !== "")
      .map(time => {
        // Buat date object dari input datetime-local
        const inputDate = new Date(time);
        
        // Konversi ke timezone Asia/Jakarta menggunakan toLocaleString
        const jakartaTime = inputDate.toLocaleString('sv-SE', {
          timeZone: 'Asia/Jakarta'
        });
        
        // Format sudah YYYY-MM-DD HH:MM:SS, tinggal ganti T dengan spasi jika ada
        return jakartaTime.replace('T', ' ');
      });

    if (validAssessmentTimes.length > 0) {
      dataToSend.assessment_times = validAssessmentTimes;
    }

    return dataToSend;
  };

  // Handle submit form tambah
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setActionLoading(true);
      
      const token = localStorage.getItem('token');
      const dataToSend = prepareFormData();
      
      const response = await fetch(`${API_URL}/instances`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (result.errors) {
          setFormErrors(result.errors);
        }
        throw new Error(result.message || "Gagal menambahkan instance");
      }
      
      toast.success("Instance berhasil ditambahkan");
      setShowAddModal(false);
      fetchInstances();
    } catch (err) {
      console.error("Error adding instance:", err);
      toast.error(err.message || "Terjadi kesalahan saat menambahkan instance");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle submit form edit
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setActionLoading(true);
      
      const token = localStorage.getItem('token');
      const dataToSend = prepareFormData();
      
      const response = await fetch(`${API_URL}/instances/${currentInstance.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (result.errors) {
          setFormErrors(result.errors);
        }
        throw new Error(result.message || "Gagal mengubah instance");
      }
      
      toast.success("Instance berhasil diubah");
      setShowEditModal(false);
      fetchInstances();
    } catch (err) {
      console.error("Error updating instance:", err);
      toast.error(err.message || "Terjadi kesalahan saat mengubah instance");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle hapus instance
  const handleConfirmDelete = async () => {
    try {
      setActionLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/instances/${currentInstance.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal menghapus instance");
      }
      
      toast.success("Instance berhasil dihapus");
      setShowDeleteModal(false);
      fetchInstances();
    } catch (err) {
      console.error("Error deleting instance:", err);
      toast.error(err.message || "Terjadi kesalahan saat menghapus instance");
    } finally {
      setActionLoading(false);
    }
  };

  // Render assessment times untuk tampilan tabel
  const renderAssessmentTimes = (instance) => {
    if (!instance.instance_assessment_times || instance.instance_assessment_times.length === 0) {
      return <span className="text-gray-400 italic">Belum ada waktu asesmen</span>;
    }

    return (
      <div className="space-y-1">
        {instance.instance_assessment_times.map((time) => {
          // Format datetime untuk display yang readable
          let displayTime = time.assessment_time;
          
          try {
            // Jika format SQL datetime (YYYY-MM-DD HH:MM:SS), convert ke readable
            if (time.assessment_time.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
              // Parse waktu sebagai waktu Jakarta dan format untuk display
              const [datePart, timePart] = time.assessment_time.split(' ');
              const [year, month, day] = datePart.split('-');
              const [hour, minute] = timePart.split(':');
              
              // Buat date object untuk display
              const displayDate = new Date();
              displayDate.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day));
              displayDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
              
              // Format untuk display dalam bahasa Indonesia
              const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              };
              displayTime = displayDate.toLocaleDateString('id-ID', options);
            }
          } catch {
            // Jika gagal convert, gunakan format asli
            displayTime = time.assessment_time;
          }
          
          return (
            <div key={time.id} className="flex items-center text-sm">
              <FiClock className="mr-1 h-3 w-3 text-gray-400" />
              <span className="text-xs">{displayTime}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Daftar Instance</h1>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari instance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Button 
            onClick={handleAdd} 
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <FiPlus /> Tambah Instance
          </Button>
        </div>
      </div>

      {loading && instances.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : filteredInstances.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada data instance{searchQuery && " yang sesuai dengan pencarian"}.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table className="bg-white">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[60px] text-center font-bold text-gray-500">No</TableHead>
                <TableHead className="font-bold text-gray-500">Nama Instance</TableHead>
                <TableHead className="font-bold text-gray-500">Slug</TableHead>
                <TableHead className="font-bold text-gray-500">Waktu Asesmen</TableHead>
                <TableHead className="w-[120px] text-right font-bold text-gray-500">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstances.map((instance, index) => (
                <TableRow key={instance.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{instance.name}</TableCell>
                  <TableCell>{instance.slug}</TableCell>
                  <TableCell>{renderAssessmentTimes(instance)}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(instance)}
                      className="flex items-center gap-1"
                    >
                      <FiEdit2 className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(instance)}
                      className="flex items-center gap-1"
                    >
                      <FiTrash2 className="h-4 w-4" /> Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal Tambah Instance */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Instance</DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk menambahkan instance baru.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Instance</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Masukkan nama instance"
                value={formData.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Waktu Asesmen</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAssessmentTime}
                  className="flex items-center gap-1"
                >
                  <FiPlus className="h-3 w-3" /> Tambah
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.assessment_times.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="datetime-local"
                      value={time}
                      onChange={(e) => handleAssessmentTimeChange(index, e.target.value)}
                      className="flex-1"
                      min={new Date().toISOString().slice(0, 16)} // Tidak bisa pilih waktu yang sudah lewat
                    />
                    {formData.assessment_times.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAssessmentTime(index)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700"
                      >
                        <FiX className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {formErrors.assessment_times && (
                <p className="text-sm text-red-500">{formErrors.assessment_times}</p>
              )}
              
              <p className="text-xs text-gray-500">
                Pilih tanggal dan waktu asesmen. Waktu yang dipilih tidak boleh di masa lalu.
              </p>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
                disabled={actionLoading}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" /> Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Instance */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Instance</DialogTitle>
            <DialogDescription>
              Perbarui informasi instance yang dipilih.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Instance</Label>
              <Input 
                id="edit-name"
                name="name"
                placeholder="Masukkan nama instance"
                value={formData.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Waktu Asesmen</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAssessmentTime}
                  className="flex items-center gap-1"
                >
                  <FiPlus className="h-3 w-3" /> Tambah
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.assessment_times.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="datetime-local"
                      value={time}
                      onChange={(e) => handleAssessmentTimeChange(index, e.target.value)}
                      className="flex-1"
                      min={new Date().toISOString().slice(0, 16)} // Tidak bisa pilih waktu yang sudah lewat
                    />
                    {formData.assessment_times.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAssessmentTime(index)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700"
                      >
                        <FiX className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {formErrors.assessment_times && (
                <p className="text-sm text-red-500">{formErrors.assessment_times}</p>
              )}
              
              <p className="text-xs text-gray-500">
                Pilih tanggal dan waktu asesmen. Waktu yang dipilih tidak boleh di masa lalu.
              </p>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEditModal(false)}
                disabled={actionLoading}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" /> Memperbarui...
                  </>
                ) : (
                  "Perbarui"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi Hapus */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus instance &ldquo;{currentInstance?.name}&rdquo;? 
              Tindakan ini tidak dapat dibatalkan dan akan menghapus semua waktu asesmen terkait.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
              disabled={actionLoading}
            >
              Batal
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleConfirmDelete}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstanceList;
