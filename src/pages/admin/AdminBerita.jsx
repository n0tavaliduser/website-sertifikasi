import SearchBar from "@/components/ui/Search";
import {
  FileUser,
  Hourglass,
  PencilLine,
  SquarePen,
  Users2,
} from "lucide-react";
import React from "react";
const taskData = [
  {
    id: 1,
    image: "j",
    title: "Adoddle",
    status: "Offtrack",
    statusColor: "red",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "05 APRIL 2023",
    issues: 14,
    users: [1, 2, 3, 4],
    extraUsers: 2,
  },
  {
    id: 2,
    title: "Taskflow",
    status: "On Track",
    statusColor: "green",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "12 MAY 2023",
    issues: 8,
    users: [1, 2, 3],
    extraUsers: 1,
  },
  {
    id: 3,
    title: "ProjectZen",
    status: "At Risk",
    statusColor: "yellow",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "25 JUNE 2023",
    issues: 5,
    users: [1, 2],
    extraUsers: 0,
  },
  {
    id: 4,
    title: "DevSuite",
    status: "Offtrack",
    statusColor: "red",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "10 JULY 2023",
    issues: 20,
    users: [1, 2, 3, 4],
    extraUsers: 3,
  },
];
export const AdminBerita = () => {
  return (
    <>
     <div className="flex items-center justify-end gap-4">

<SearchBar />
</div>
<div className="w-full max-w-7xl my-16">
  <h1 className="text-2xl font-bold text-gray-800">Berita</h1>
  <p className="text-sm text-gray-500">
  Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia
  </p>
</div>
    <div className="grid grid-cols-2 gap-6 p-4">
      
      {taskData.map((task) => (
        <div key={task.id} className="bg-none rounded-lg p-4  ">
          {/* Header */}
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{task.title}</h3>
              <SquarePen className="w-4 h-4 text-gray-500" />
            </div>
            <span
              className={`px-3 py-1 bg-[#c28383] bg-opacity-[20%] text-${task.statusColor}-500 text-sm rounded-md`}
              style={{ backgroundColor: `${task.statusColor}-50` }}
            >
              {task.status}
            </span>
          </div>
          <span className="bg-black h-[1px] flex w-full mb-3"></span>

          {/* Content */}
          <p className="text-gray-600 text-sm mb-6">{task.description}</p>

          {/* Footer */}
          <div className="flex flex-col justify-  items-center">
            {/* Date and Icons */}
            <div className="flex items-start justify-start w-full   gap-2">
              <Hourglass width={12} />
              <span className="text-sm text-gray-600"> {task.date}</span>
            </div>

            <div className="flex items-center w-full justify-between gap-4">
              {/* User Avatars */}
              <div className="flex -space-x-2">
                {task.users.map((user, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
                  />
                ))}
                {task.extraUsers > 0 && (
                  <div className="w-6 h-6 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-pink-500">
                      +{task.extraUsers}
                    </span>
                  </div>
                )}
              </div>

              {/* Issues Count */}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FileUser className="w-4 h-4" />
                <span>{task.issues} issues</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default AdminBerita;
