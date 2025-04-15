import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
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
  const [formData, setFormData] = useState({ name: "" });
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
    setFormData({ name: "" });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Fungsi untuk membuka modal edit
  const handleEdit = (instance) => {
    setCurrentInstance(instance);
    setFormData({ name: instance.name });
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

  // Validasi form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Nama instance wajib diisi";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      const response = await fetch(`${API_URL}/instances`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
      const response = await fetch(`${API_URL}/instances/${currentInstance.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-center">No</TableHead>
                <TableHead>Nama Instance</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-[120px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstances.map((instance, index) => (
                <TableRow key={instance.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{instance.name}</TableCell>
                  <TableCell>{instance.slug}</TableCell>
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
        <DialogContent>
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
        <DialogContent>
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
              Apakah Anda yakin ingin menghapus instance "{currentInstance?.name}"? 
              Tindakan ini tidak dapat dibatalkan.
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
