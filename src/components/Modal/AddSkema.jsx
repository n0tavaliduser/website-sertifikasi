import { useState, useRef } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

const SkemaForm = () => {
  const [rows, setRows] = useState([{ id: 1 }, { id: 2 }]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const addRow = () => {
    const newRow = { id: rows.length + 1 };
    setRows([...rows, newRow]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full  p-4">
      {/* Image Upload Section */}
      <div className="mb-6">
        <div className="relative w-40 h-40 bg-gray-100 rounded-lg  mb-4">
          {selectedImage ? (
            <div className="relative w-full h-full">
              <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
              <button onClick={removeImage} className="absolute top-2 right-2 bg-gray-800 rounded-full p-1">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <Button variant="outline" className="mb-2" onClick={() => imageInputRef.current?.click()}>
                Select Image
              </Button>
            </div>
          )}
        </div>
        <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Skema :</label>
          <Input type="text" placeholder="Enter nama siswa" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jenis Skema :</label>
          <Input type="text" placeholder="Enter jenis siswa" className="w-full" />s
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unit Kompetensi :</label>
          <Input type="text" placeholder="Enter unit kompetensi" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unggah Panduan</label>
          <div className="flex items-center gap-2">
            <Button variant="outline" className=" text-white hover:text-white bg-blue-700 hover:bg-blue-800" onClick={() => fileInputRef.current?.click()}>
              Unggah File
            </Button>
            {selectedFile && <span className="text-sm text-gray-600 truncate max-w-[150px]">{selectedFile.name}</span>}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
      </div>

      <Card className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="py-2 px-4 text-left w-16">No</th>
                <th className="py-2 px-4 text-left">Kode Unit</th>
                <th className="py-2 px-4 text-left">Nama Unit Kompetensi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-[2px] border-b-black shadow-none">
                  <td className="py-2 px-4">{row.id}</td>
                  <td className="py-2 px-4">
                    <Input type="text" className="w-full" />
                  </td>
                  <td className="py-2 px-4">
                    <Input type="text" className="w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button onClick={addRow} variant="outline" className="border-2 border-gray-300 p-2 rounded-full w-8 h-8 flex items-center justify-center">
          +
        </Button>

        <Button className="bg-slate-900 text-white hover:bg-slate-800">Save</Button>
      </div>
    </div>
  );
};

export default SkemaForm;
