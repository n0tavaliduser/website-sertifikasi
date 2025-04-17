import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiBarChart2, 
  FiSettings, 
  FiBell,
  FiShield,
  FiLayers,
  FiImage,
  FiUser
} from 'react-icons/fi';

import SidebarNavItem from './SidebarNavItem';
import SidebarNavGroup from './SidebarNavGroup';

/**
 * Helper to check if a path matches current location
 * 
 * @param {string} path - Path to check
 * @param {string} pathname - Current location pathname
 * @param {boolean} exact - Whether match should be exact
 * @returns {boolean} Whether path is active
 */
const isPathActive = (path, pathname, exact = false) => {
  if (exact) {
    return path === pathname;
  }
  return pathname.startsWith(path);
};

/**
 * SidebarNav component for managing navigation structure
 */
const SidebarNav = () => {
  const location = useLocation();
  const { pathname } = location;
  
  return (
    <div className="py-4 flex-grow overflow-y-auto">
      <nav className="px-3 space-y-1">
        {/* Dashboard Link */}
        <SidebarNavItem 
          to="/admin/dashboard" 
          icon={<FiHome />} 
          label="Dashboard" 
          roleAccess={['admin']}
          isActive={isPathActive('/dashboard', pathname, true)}
        />
        
        {/* Partnership Link */}
        <SidebarNavItem 
          to="/admin/partnership" 
          icon={<FiUsers />} 
          label="Partnership" 
          roleAccess={['admin']}
          isActive={isPathActive('/partnership', pathname)}
        />
        
        {/* News Link */}
        <SidebarNavItem 
          to="/admin/news" 
          icon={<FiFileText />} 
          label="News" 
          roleAccess={['admin']}
          isActive={isPathActive('/news', pathname)}
        />

        {/* TUKS Link */}
        <SidebarNavItem 
          to="/admin/tuks" 
          icon={<FiFileText />} 
          label="TUKS" 
          roleAccess={['admin']}
          isActive={isPathActive("/tuks", pathname)}
        />

        {/* Gallery Link */}
        <SidebarNavItem 
          to="/admin/gallery" 
          icon={<FiImage />} 
          label="Gallery" 
          roleAccess={['admin']}
          isActive={isPathActive("/gallery", pathname)}
        />

        {/* Instance Link */}
        <SidebarNavItem 
          to="/admin/instance" 
          icon={<FiShield />} 
          label="Instance" 
          roleAccess={['admin']}
          isActive={isPathActive("/instance", pathname)}
        />

        {/* Schema Link */}
        <SidebarNavItem 
          to="/admin/schema" 
          icon={<FiFileText />} 
          label="Schema" 
          roleAccess={['admin']}
          isActive={isPathActive("/schema", pathname)}
        />

        {/* User Link */}
        <SidebarNavItem 
          to="/user/assessment" 
          icon={<FiFileText />} 
          label="Assessment" 
          roleAccess={['user']} 
          isActive={isPathActive("/user/assessment", pathname)}
        />
      </nav>
    </div>
  );
};

export default SidebarNav; 