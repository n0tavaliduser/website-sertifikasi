import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiArrowLeft } from "react-icons/fi";
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

const SchemaUnitList = () => {
  const { schemaId } = useParams();
  const navigate = useNavigate();
  
  const [schema, setSchema] = useState(null);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(null);
  const [formData, setFormData] = useState({ 
    code: "",
    name: "",
    schema_id: schemaId
  });
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Mengambil data schema dan unit-unitnya dari API
  const fetchSchemaDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/schemas/${schemaId}`, {
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
        setSchema(result.data);
        setUnits(result.data.units || []);
      } else {
        setError(result.message || "Gagal mendapatkan data skema");
      }
    } catch (err) {
      console.error("Error fetching schema details:", err);
      setError("Terjadi kesalahan saat mengambil data skema");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemaDetails();
  }, [API_URL, schemaId]);

  // Filter unit berdasarkan pencarian
  const filteredUnits = units.filter(item => 
    item.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi untuk kembali ke halaman daftar skema
  const handleBack = () => {
    navigate("/admin/schema");
  };

  // Fungsi untuk membuka modal tambah
  const handleAdd = () => {
    setFormData({ 
      code: "",
      name: "",
      schema_id: schemaId
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Fungsi untuk membuka modal edit
  const handleEdit = (unit) => {
    setCurrentUnit(unit);
    setFormData({ 
      code: unit.code,
      name: unit.name,
      schema_id: schemaId
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Fungsi untuk membuka modal hapus
  const handleDelete = (unit) => {
    setCurrentUnit(unit);
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
    
    if (!formData.code.trim()) {
      errors.code = "Kode unit wajib diisi";
    }
    
    if (!formData.name.trim()) {
      errors.name = "Nama unit wajib diisi";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validasi apakah kode unit sudah ada
  const isCodeDuplicate = (codeToCheck) => {
    const existingCodes = units
      .filter(unit => currentUnit ? unit.id !== currentUnit.id : true)
      .map(unit => unit.code);
    
    return existingCodes.includes(codeToCheck);
  };

  // Handle submit form tambah
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Periksa apakah kode sudah ada
    if (isCodeDuplicate(formData.code)) {
      setFormErrors({
        ...formErrors,
        code: "Kode unit sudah digunakan dalam skema ini"
      });
      return;
    }
    
    try {
      setActionLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/schema-units`, {
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
        throw new Error(result.message || "Gagal menambahkan unit");
      }
      
      toast.success("Unit berhasil ditambahkan");
      setShowAddModal(false);
      fetchSchemaDetails(); // Refresh data
    } catch (err) {
      console.error("Error adding unit:", err);
      toast.error(err.message || "Terjadi kesalahan saat menambahkan unit");
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
    
    // Periksa apakah kode sudah ada (kecuali kode unit yang sedang diedit)
    if (formData.code !== currentUnit.code && isCodeDuplicate(formData.code)) {
      setFormErrors({
        ...formErrors,
        code: "Kode unit sudah digunakan dalam skema ini"
      });
      return;
    }
    
    try {
      setActionLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/schema-units/${currentUnit.id}`, {
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
        throw new Error(result.message || "Gagal mengubah unit");
      }
      
      toast.success("Unit berhasil diubah");
      setShowEditModal(false);
      fetchSchemaDetails(); // Refresh data
    } catch (err) {
      console.error("Error updating unit:", err);
      toast.error(err.message || "Terjadi kesalahan saat mengubah unit");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle hapus unit
  const handleConfirmDelete = async () => {
    try {
      setActionLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/schema-units/${currentUnit.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal menghapus unit");
      }
      
      toast.success("Unit berhasil dihapus");
      setShowDeleteModal(false);
      fetchSchemaDetails(); // Refresh data
    } catch (err) {
      console.error("Error deleting unit:", err);
      toast.error(err.message || "Terjadi kesalahan saat menghapus unit");
    } finally {
      setActionLoading(false);
    }
  };

  // Tampilan saat loading
  if (loading && !schema) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spinner size="lg" />
      </div>
    );
  }

  // Tampilan jika terjadi error
  if (error && !schema) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="mr-4"
          >
            <FiArrowLeft className="mr-2" /> Kembali
          </Button>
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
        </div>
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mr-4"
        >
          <FiArrowLeft className="mr-2" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Unit Kompetensi: {schema?.name}</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-2">Detail Skema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Nama Skema</p>
            <p className="font-medium">{schema?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Tipe</p>
            <p className="font-medium">{schema?.type}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Daftar Unit Kompetensi</h2>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <Input
              type="text"
              placeholder="Cari unit kompetensi..."
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
            <FiPlus /> Tambah Unit
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size="lg" />
        </div>
      ) : filteredUnits.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Belum ada data unit kompetensi{searchQuery && " yang sesuai dengan pencarian"}.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table className="bg-white">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[60px] text-center font-bold text-gray-500">No</TableHead>
                <TableHead className="w-[150px] font-bold text-gray-500">Kode Unit</TableHead>
                <TableHead className="font-bold text-gray-500">Nama Unit</TableHead>
                <TableHead className="w-[120px] text-right font-bold text-gray-500">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.map((unit, index) => (
                <TableRow key={unit.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{unit.code}</TableCell>
                  <TableCell>{unit.name}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(unit)}
                      className="flex items-center gap-1"
                    >
                      <FiEdit2 className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(unit)}
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

      {/* Modal Tambah Unit */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Unit Kompetensi</DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk menambahkan unit baru ke skema {schema?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Kode Unit</Label>
              <Input 
                id="code"
                name="code"
                placeholder="Masukkan kode unit, contoh: J.611000.001.01"
                value={formData.code}
                onChange={handleInputChange}
                className={formErrors.code ? "border-red-500" : ""}
              />
              {formErrors.code && (
                <p className="text-sm text-red-500">{formErrors.code}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nama Unit</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Masukkan nama unit kompetensi"
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

      {/* Modal Edit Unit */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Unit Kompetensi</DialogTitle>
            <DialogDescription>
              Perbarui informasi unit kompetensi yang dipilih.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-code">Kode Unit</Label>
              <Input 
                id="edit-code"
                name="code"
                placeholder="Masukkan kode unit, contoh: J.611000.001.01"
                value={formData.code}
                onChange={handleInputChange}
                className={formErrors.code ? "border-red-500" : ""}
              />
              {formErrors.code && (
                <p className="text-sm text-red-500">{formErrors.code}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Unit</Label>
              <Input 
                id="edit-name"
                name="name"
                placeholder="Masukkan nama unit kompetensi"
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
              Apakah Anda yakin ingin menghapus unit "{currentUnit?.name}" dengan kode {currentUnit?.code}? 
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

export default SchemaUnitList; 