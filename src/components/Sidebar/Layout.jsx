import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 min-h-screen">
        <Outlet /> {/* Tempat untuk merender children routes */}
      </main>
    </div>
  );
};

export default AdminLayout;
