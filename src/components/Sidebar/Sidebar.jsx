import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
    UserIcon, 
    UserGroupIcon, 
    InfoIcon, 
    DocumentIcon,
    LocationIcon,
    ImageIcon,
    NewsIcon,
    LogOutIcon 
} from '../../assets/Icon/iconSidebar';

const SidebarItem = ({ icon, label, children, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === path; // Menentukan apakah menu aktif
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (children) {
    return (
      <div className="w-full">
        <button 
          onClick={handleClick}
          className={`flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${isActive ? 'bg-[#06113C] text-white' : ''}`}
        >
          <span className={`mr-3 ${isActive ? 'text-orange-500' : ''}`}>{icon}</span>
          <span className={`flex-1 text-left ${isActive ? 'text-white' : ''}`}>{label}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isOpen && (
          <div className="ml-8 mt-2 space-y-2">
            {children.map((child, index) => (
              <Link
                key={index}
                to={child.path}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={path}
      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${isActive ? 'bg-[#06113C] text-white' : ''}`}
    >
      <span className={`mr-3 ${isActive ? 'text-orange-500' : ''}`}>{icon}</span>
      <span className={isActive ? 'text-white' : ''}>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 sticky top-0 h-screen bg-white border-r shadow-sm">
      {/* Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center flex-col space-x-3">
          <img 
            src="/path/to/profile.jpg" 
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">Admin Name</h3>
            <p className="text-sm text-gray-500">Admin Role</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 text space-y-2">
        <SidebarItem
          icon={<UserIcon />}
          label="Partnership"
          children={[
            { label: 'View All', path: '/partnership' },
            { label: 'Add New', path: '/partnership/add' },
          ]}
        />
        <SidebarItem
          icon={<UserGroupIcon />}
          label="Penyuluhan"
          path="/admin/penyuluhan"
        />
        <SidebarItem
          icon={<InfoIcon />}
          label="Tentang"
          path="/admin/tentang"
        />
        <SidebarItem
          icon={<DocumentIcon />}
          label="Skema"
          path="/admin/skema"
        />
        <SidebarItem
          icon={<LocationIcon />}
          label="TUK"
          path="/admin/tuk"
        />
        <SidebarItem
          icon={<ImageIcon />}
          label="Galeri"
          path="/admin/galeri"
        />
        <SidebarItem
          icon={<NewsIcon />}
          label="Berita"
          path="/admin/berita"
        />
      </nav>

      {/* Sign Out Button */}
      <div className="absolute bottom-4 w-full px-4">
        <button 
          onClick={() => {/* handle sign out */}}
          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOutIcon className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
