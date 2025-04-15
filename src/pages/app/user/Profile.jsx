import React, { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMapPin, FiSave, FiHome } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address: "",
    instance_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [instances, setInstances] = useState([]);
  const [instancesLoading, setInstancesLoading] = useState(false);

  // Mendapatkan API URL dari variabel lingkungan
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Mengambil data instansi
  useEffect(() => {
    const fetchInstances = async () => {
      setInstancesLoading(true);
      try {
        const response = await fetch(`${API_URL}/instances-reference`);
        if (!response.ok) {
          throw new Error('Gagal memuat data instansi');
        }
        const data = await response.json();
        setInstances(data.data || []);
      } catch (error) {
        console.error("Error fetching instances:", error);
        toast.error("Gagal memuat data instansi");
      } finally {
        setInstancesLoading(false);
      }
    };

    fetchInstances();
  }, [API_URL]);

  // Mengambil data user dari API saat komponen dimuat
  useEffect(() => {
    const fetchUserProfile = async () => {
      setFetchLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Token tidak ditemukan');
        }
        
        const response = await fetch(`${API_URL}/user-details`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Gagal memuat data profil');
        }
        
        const result = await response.json();
        
        if (result.data) {
          // Update localStorage dengan data user terbaru
          localStorage.setItem('user', JSON.stringify(result.data));
          
          setFormData({
            name: result.data.name || "",
            phone_number: result.data.phone_number || "",
            address: result.data.address || "",
            instance_id: result.data.instance_id ? result.data.instance_id.toString() : ""
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error(error.message || "Gagal memuat data profil");
        
        // Fallback ke localStorage jika API gagal
        try {
          const userData = JSON.parse(localStorage.getItem('user'));
          if (userData) {
            setFormData({
              name: userData.name || "",
              phone_number: userData.phone_number || "",
              address: userData.address || "",
              instance_id: userData.instance_id ? userData.instance_id.toString() : ""
            });
          }
        } catch (localStorageError) {
          console.error("Error parsing user data from localStorage:", localStorageError);
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUserProfile();
  }, [API_URL]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Hapus error untuk field yang diubah
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle perubahan select
  const handleSelectChange = (value) => {
    // Jika nilai adalah "0", kita set instance_id menjadi string kosong
    setFormData(prev => ({ ...prev, instance_id: value === "0" ? "" : value }));
    
    // Hapus error untuk field instance_id
    if (errors.instance_id) {
      setErrors(prev => ({ ...prev, instance_id: null }));
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Nomor telepon wajib diisi";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Alamat wajib diisi";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/update-profile`, {
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
          setErrors(result.errors);
        }
        throw new Error(result.message || "Gagal mengupdate profil");
      }
      
      // Update localStorage dengan data user yang baru
      if (result.data) {
        localStorage.setItem('user', JSON.stringify(result.data));
      }
      
      toast.success("Profil berhasil diperbarui");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message || "Terjadi kesalahan saat memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Profil Pengguna</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
          <CardDescription>
            Perbarui informasi profil Anda di sini. Data ini akan ditampilkan secara publik.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                <div className="flex items-center gap-2">
                  <FiUser className="text-gray-500" />
                  <span>Nama Lengkap</span>
                </div>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone_number">
                <div className="flex items-center gap-2">
                  <FiPhone className="text-gray-500" />
                  <span>Nomor Telepon</span>
                </div>
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Masukkan nomor telepon"
                className={errors.phone_number ? "border-red-500" : ""}
              />
              {errors.phone_number && (
                <p className="text-sm text-red-500">{errors.phone_number}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-gray-500" />
                  <span>Alamat</span>
                </div>
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                className={errors.address ? "border-red-500" : ""}
                rows={4}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instance_id">
                <div className="flex items-center gap-2">
                  <FiHome className="text-gray-500" />
                  <span>Instansi</span>
                </div>
              </Label>
              <Select 
                value={formData.instance_id || "0"} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger 
                  id="instance_id"
                  className={errors.instance_id ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Pilih instansi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">-- Pilih Instansi --</SelectItem>
                  {instancesLoading ? (
                    <SelectItem value="loading" disabled>
                      <div className="flex items-center gap-2">
                        <Spinner size="sm" /> Memuat data...
                      </div>
                    </SelectItem>
                  ) : (
                    instances.map((instance) => (
                      <SelectItem key={instance.id} value={instance.id.toString()}>
                        {instance.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.instance_id && (
                <p className="text-sm text-red-500">{errors.instance_id}</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> Menyimpan...
                </>
              ) : (
                <>
                  <FiSave /> Simpan Perubahan
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Profile;

