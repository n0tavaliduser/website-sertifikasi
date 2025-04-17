import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiList } from "react-icons/fi";
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
import { useNavigate } from "react-router-dom";

const SchemaList = () => {
  const [schemas, setSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSchema, setCurrentSchema] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "",
    type: "",
    image: null,
    imagePreview: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);

  const navigate = useNavigate();

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Mengambil data skema dari API
  const fetchSchemas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/schemas`, {
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
        setSchemas(result.data);
      } else {
        setError(result.message || "Gagal mendapatkan data skema");
      }
    } catch (err) {
      console.error("Error fetching schema data:", err);
      setError("Terjadi kesalahan saat mengambil data skema");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemas();
  }, [API_URL]);

  // Filter skema berdasarkan pencarian
  const filteredSchemas = schemas.filter(item => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        setFormErrors({
          ...formErrors,
          image: "Format file tidak didukung. Gunakan JPEG, PNG, JPG, GIF, atau SVG."
        });
        return;
      }

      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          image: "Ukuran file terlalu besar. Maksimal 2MB."
        });
        return;
      }

      // Preview gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);

      // Clear error
      if (formErrors.image) {
        setFormErrors({
          ...formErrors,
          image: null
        });
      }
    }
  };

  // Fungsi untuk membuka modal tambah
  const handleAdd = () => {
    setFormData({ 
      name: "",
      type: "",
      image: null,
      imagePreview: null
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Fungsi untuk membuka modal edit
  const handleEdit = (schema) => {
    setCurrentSchema(schema);
    setFormData({ 
      name: schema.name,
      type: schema.type,
      image: null,
      imagePreview: schema.image_url ? `${API_URL}/../${schema.image_url}` : null
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Fungsi untuk membuka modal hapus
  const handleDelete = (schema) => {
    setCurrentSchema(schema);
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

  // Fungsi untuk melihat detail unit skema
  const handleViewUnits = (schemaId) => {
    navigate(`/admin/schema/${schemaId}/units`);
  };

  // Validasi form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Nama skema wajib diisi";
    }
    
    if (!formData.type.trim()) {
      errors.type = "Tipe skema wajib diisi";
    }
    
    // Jika tambah baru, image wajib. Jika edit, image opsional
    if (!formData.image && !formData.imagePreview && showAddModal) {
      errors.image = "Gambar skema wajib diisi";
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
      
      // Buat FormData untuk mengirim file
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('type', formData.type);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const response = await fetch(`${API_URL}/schemas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (result.errors) {
          setFormErrors(result.errors);
        }
        throw new Error(result.message || "Gagal menambahkan skema");
      }
      
      toast.success("Skema berhasil ditambahkan");
      setShowAddModal(false);
      fetchSchemas();
    } catch (err) {
      console.error("Error adding schema:", err);
      toast.error(err.message || "Terjadi kesalahan saat menambahkan skema");
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
      
      // Buat FormData untuk mengirim file
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('type', formData.type);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      // Jika ini edit, tambahkan _method=PUT untuk Laravel
      formDataToSend.append('_method', 'PUT');
      
      const response = await fetch(`${API_URL}/schemas/${currentSchema.id}`, {
        method: 'POST', // Tetap POST untuk FormData dengan _method=PUT
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (result.errors) {
          setFormErrors(result.errors);
        }
        throw new Error(result.message || "Gagal mengubah skema");
      }
      
      toast.success("Skema berhasil diubah");
      setShowEditModal(false);
      fetchSchemas();
    } catch (err) {
      console.error("Error updating schema:", err);
      toast.error(err.message || "Terjadi kesalahan saat mengubah skema");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle hapus skema
  const handleConfirmDelete = async () => {
    try {
      setActionLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/schemas/${currentSchema.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal menghapus skema");
      }
      
      toast.success("Skema berhasil dihapus");
      setShowDeleteModal(false);
      fetchSchemas();
    } catch (err) {
      console.error("Error deleting schema:", err);
      toast.error(err.message || "Terjadi kesalahan saat menghapus skema");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Daftar Skema Sertifikasi</h1>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari skema..."
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
            <FiPlus /> Tambah Skema
          </Button>
        </div>
      </div>

      {loading && schemas.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : filteredSchemas.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada data skema{searchQuery && " yang sesuai dengan pencarian"}.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table className="bg-white">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[60px] text-center font-bold text-gray-500">No</TableHead>
                <TableHead className="font-bold text-gray-500">Nama Skema</TableHead>
                <TableHead className="font-bold text-gray-500">Tipe</TableHead>
                <TableHead className="font-bold text-gray-500">Gambar</TableHead>
                <TableHead className="w-[180px] text-right font-bold text-gray-500">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchemas.map((schema, index) => (
                <TableRow key={schema.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{schema.name}</TableCell>
                  <TableCell>{schema.type}</TableCell>
                  <TableCell>
                    {schema.image_url ? (
                      <img 
                        src={`${API_URL}/../${schema.image_url}`} 
                        alt={schema.name} 
                        className="h-10 w-auto object-contain" 
                      />
                    ) : (
                      <span className="text-gray-400">Tidak ada gambar</span>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewUnits(schema.id)}
                      className="flex items-center gap-1"
                    >
                      <FiList className="h-4 w-4" /> Unit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(schema)}
                      className="flex items-center gap-1"
                    >
                      <FiEdit2 className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(schema)}
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

      {/* Modal Tambah Skema */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Skema</DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk menambahkan skema baru.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Skema</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Masukkan nama skema"
                value={formData.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipe Skema</Label>
              <Input 
                id="type"
                name="type"
                placeholder="Masukkan tipe skema"
                value={formData.type}
                onChange={handleInputChange}
                className={formErrors.type ? "border-red-500" : ""}
              />
              {formErrors.type && (
                <p className="text-sm text-red-500">{formErrors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Gambar Skema</Label>
              <Input 
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={formErrors.image ? "border-red-500" : ""}
              />
              {formErrors.image && (
                <p className="text-sm text-red-500">{formErrors.image}</p>
              )}
              {formData.imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="h-32 w-auto object-contain border rounded-md" 
                  />
                </div>
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

      {/* Modal Edit Skema */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Skema</DialogTitle>
            <DialogDescription>
              Perbarui informasi skema yang dipilih.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Skema</Label>
              <Input 
                id="edit-name"
                name="name"
                placeholder="Masukkan nama skema"
                value={formData.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipe Skema</Label>
              <Input 
                id="edit-type"
                name="type"
                placeholder="Masukkan tipe skema"
                value={formData.type}
                onChange={handleInputChange}
                className={formErrors.type ? "border-red-500" : ""}
              />
              {formErrors.type && (
                <p className="text-sm text-red-500">{formErrors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image">Gambar Skema</Label>
              <Input 
                id="edit-image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={formErrors.image ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah gambar</p>
              {formErrors.image && (
                <p className="text-sm text-red-500">{formErrors.image}</p>
              )}
              {formData.imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="h-32 w-auto object-contain border rounded-md" 
                  />
                </div>
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
              Apakah Anda yakin ingin menghapus skema "{currentSchema?.name}"? 
              Tindakan ini tidak dapat dibatalkan dan akan menghapus seluruh unit kompetensi yang terkait.
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

export default SchemaList;
