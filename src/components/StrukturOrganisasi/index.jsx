import React from "react";
import Pengurus from "@/assets/Organisasi/Pengurus.jpg";

export const StrukturOrganisasi = () => {
  const members = [
    {
      name: "Dewan Pengarah",
      role: "",
      image: Pengurus,
    },
    {
      name: "Ir. Agus Sumeru",
      role: "Komite skema",
      image: Pengurus,
    },
    {
      name: "Mohamad Ilyas S.T.,M.M",
      role: "Direktur",
      image: Pengurus,
    },
    {
      name: "Ir. Syahrizal Mustafa  ",
      role: "Manajer Sertifikasi",
      image: Pengurus,
    },
    {
      name: "Ir. Agus Sumeru",
      role: "Manajer Administrasi dan Keuangan",
      image: Pengurus,
    },
    {
      name: "Ir. Dedi Nurdadi",
      role: "Manajer Manajemen Mutu",
      image: Pengurus,
    },

    {
      name: "Rahmat",
      role: "Staff Admin",
      image: Pengurus,
    },
  ];

  return (
    <div className="grid gap-6 p-6">
      {/* Row 1 */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-center">
          <img src={members[0].image} alt={members[0].name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-300" />
          <h3 className="mt-4 text-sm font-semibold text-gray-800">{members[0].name}</h3>
          <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">{members[0].role}</p>
        </div>
      </div>

      {/* Row 2 and beyond */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {members.slice(1).map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-300" />
            <h3 className="mt-4 text-sm font-semibold text-gray-800">{member.name}</h3>
            <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
