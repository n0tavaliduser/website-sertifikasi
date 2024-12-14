import React from "react";

export const DataAsesor = () => {
  const members = [
    {
      name: "Graha Kadin Kota Bandung",
      role: "Dewan Pengarah",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Siapaya ?",
      role: "Dewan Pengarah",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Mohamad Ilyas",
      role: "MET.000.0003627.2013\nDirektur",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Agus Sumeru",
      role: "Manajer Administrasi dan Keuangan",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Dedi Nurdadi",
      role: "Manajer Sertifikasi",
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
    <div className="container mx-auto grid gap-6 p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {members.slice(0).map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAsesor;
