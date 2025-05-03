import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiSave } from "react-icons/fi";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    role: "user",
  });

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetchingUser(true);
        const token = localStorage.getItem("token");
        
        const response = await axios.get(`${API_URL}/users/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          const user = response.data.data;
          setFormData({
            name: user.name || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
            address: user.address || "",
            role: user.role || "user",
          });
        } else {
          setError(response.data.message || "Failed to fetch user");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("An error occurred while fetching user details");
      } finally {
        setFetchingUser(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.put(`${API_URL}/users/${id}`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        navigate("/app/users");
      } else {
        setError(response.data.message || "Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors || 
                          "An error occurred while updating the user";
                          
      setError(typeof errorMessage === 'object' 
        ? Object.values(errorMessage).flat().join(', ') 
        : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/app/users")}
          className="flex items-center gap-2 mb-4"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to User List
        </Button>
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {fetchingUser ? (
        <div className="flex justify-center items-center h-60">
          <div className="flex flex-col items-center">
            <FiLoader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
            <p className="text-gray-500">Loading user data...</p>
          </div>
        </div>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit User Information</CardTitle>
            <CardDescription>Update user details. Fields marked with * are required.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">User Role *</Label>
                  <Select 
                    name="role" 
                    value={formData.role} 
                    onValueChange={(value) => handleSelectChange(value, "role")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/app/users")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <FiLoader className="h-4 w-4 animate-spin" /> Updating...
                  </>
                ) : (
                  <>
                    <FiSave className="h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default EditUser;
