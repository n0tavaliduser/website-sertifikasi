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
  FiLayers
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
          isActive={isPathActive('/dashboard', pathname, true)}
        />
        
        {/* Reports Link */}
        <SidebarNavItem 
          to="/admin/partnership" 
          icon={<FiUsers />} 
          label="Partnership" 
          isActive={isPathActive('/partnership', pathname)}
        />
        
        {/* Notifications Link with Badge */}
        <SidebarNavItem 
          to="/admin/news" 
          icon={<FiFileText />} 
          label="News" 
          isActive={isPathActive('/news', pathname)}
        />

        <SidebarNavItem 
          to="/admin/tuks" 
          icon={<FiFileText />} 
          label="TUKS" 
          isActive={isPathActive("/tuks", pathname)}
        />
      </nav>
    </div>
  );
};

export default SidebarNav; 