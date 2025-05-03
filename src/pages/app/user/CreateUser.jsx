import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "password", // Default password as per controller
    password_confirmation: "password", // Default password confirmation
    phone_number: "",
    address: "",
    role: "user", // Default role
  });

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || window.ENV_API_URL || "http://localhost:8000/api";

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
      
      const response = await axios.post(`${API_URL}/users`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        navigate("/app/users");
      } else {
        setError(response.data.message || "Failed to create user");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors || 
                          "An error occurred while creating the user";
                          
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
        <h1 className="text-2xl font-bold">Create New User</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Enter the details for the new user. Default password will be "password" if left empty.</CardDescription>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password or leave default"
                />
                <p className="text-sm text-gray-500">Leave as is for default password</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateUser;
