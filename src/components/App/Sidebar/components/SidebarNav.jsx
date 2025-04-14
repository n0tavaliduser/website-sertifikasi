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
        
        {/* User Management Group */}
        <SidebarNavGroup
          title="User Management"
          icon={<FiUsers />}
          defaultExpanded={isPathActive('/users', pathname)}
        >
          <SidebarNavItem 
            to="/users" 
            icon={<FiUsers />} 
            label="All Users" 
            isActive={isPathActive('/users', pathname, true)}
          />
          <SidebarNavItem 
            to="/users/roles" 
            icon={<FiShield />} 
            label="Roles & Permissions" 
            isActive={isPathActive('/users/roles', pathname)}
          />
        </SidebarNavGroup>
        
        {/* Content Management */}
        <SidebarNavGroup
          title="Content"
          icon={<FiFileText />}
          defaultExpanded={isPathActive('/content', pathname)}
        >
          <SidebarNavItem 
            to="/content/skema" 
            icon={<FiLayers />} 
            label="Skema Sertifikasi" 
            isActive={isPathActive('/content/skema', pathname)}
          />
          <SidebarNavItem 
            to="/content/berita" 
            icon={<FiFileText />} 
            label="Berita" 
            isActive={isPathActive('/content/berita', pathname)}
          />
        </SidebarNavGroup>
        
        {/* Reports Link */}
        <SidebarNavItem 
          to="/reports" 
          icon={<FiBarChart2 />} 
          label="Reports & Analytics" 
          isActive={isPathActive('/reports', pathname)}
        />
        
        {/* Notifications Link with Badge */}
        <SidebarNavItem 
          to="/notifications" 
          icon={<FiBell />} 
          label="Notifications" 
          badge="5"
          isActive={isPathActive('/notifications', pathname)}
        />
        
        {/* Settings Link */}
        <SidebarNavItem 
          to="/settings" 
          icon={<FiSettings />} 
          label="Settings" 
          isActive={isPathActive('/settings', pathname)}
        />
      </nav>
    </div>
  );
};

export default SidebarNav; 