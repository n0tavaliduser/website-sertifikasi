import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppLayout } from '../../../../layouts/app/context/AppLayoutContext';

/**
 * SidebarNavItem component for rendering individual navigation items
 * 
 * @param {Object} props - Component props
 * @param {string} props.to - Link destination
 * @param {ReactNode} props.icon - Icon element
 * @param {string} props.label - Menu item label
 * @param {boolean} props.isActive - Whether this item is active
 * @param {string|number} props.badge - Optional badge content
 * @param {function} props.onClick - Optional click handler
 * @param {Array} props.roleAccess - Array of roles that can access this menu item
 */
const SidebarNavItem = ({ 
  to, 
  icon, 
  label, 
  isActive = false, 
  badge, 
  onClick,
  roleAccess = [] 
}) => {
  const { isSidebarOpen } = useAppLayout();
  const [hasAccess, setHasAccess] = useState(true);
  
  // Cek apakah pengguna memiliki akses ke menu ini
  useEffect(() => {
    const checkAccess = () => {
      // Jika tidak ada batasan akses, semua peran bisa akses
      if (!roleAccess || roleAccess.length === 0) {
        setHasAccess(true);
        return;
      }
      
      try {
        // Cek role dari data user yang disimpan di localStorage
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          setHasAccess(false);
          return;
        }
        
        const userData = JSON.parse(userStr);
        const userRole = userData.role;
        
        // Periksa apakah peran pengguna ada dalam daftar peran yang diizinkan
        setHasAccess(roleAccess.includes(userRole));
      } catch (error) {
        console.error('Error checking role access:', error);
        setHasAccess(false);
      }
    };
    
    checkAccess();
  }, [roleAccess]);
  
  // Jika pengguna tidak memiliki akses, jangan render menu item
  if (!hasAccess) {
    return null;
  }
  
  // Base classes berbeda saat sidebar terbuka/tertutup
  let baseClasses;
  if (isSidebarOpen) {
    baseClasses = 'flex items-center py-3 px-4 text-gray-300 hover:bg-slate-700 rounded-md transition-all duration-200 ease-in-out';
  } else {
    baseClasses = 'flex justify-center items-center py-3 text-gray-300 hover:bg-slate-700 rounded-md transition-all duration-200 ease-in-out';
  }
  
  const activeClasses = isSidebarOpen 
    ? 'bg-slate-700 text-white border-l-4 border-blue-500 pl-3' 
    : 'bg-slate-700 text-white';
  
  const classes = `${baseClasses} ${isActive ? activeClasses : ''}`;
  
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <Link 
      to={to} 
      className={classes}
      onClick={handleClick}
      title={!isSidebarOpen ? label : ''}
    >
      {/* Icon */}
      <span className={isSidebarOpen ? "flex-shrink-0 text-xl" : "text-xl"}>
        {icon}
      </span>
      
      {/* Label - hidden when sidebar is collapsed */}
      {isSidebarOpen && (
        <span className="ml-3 text-sm font-medium">{label}</span>
      )}
      
      {/* Badge - shown only if provided and sidebar is open */}
      {badge && isSidebarOpen && (
        <span className="ml-auto bg-blue-600 text-xs font-semibold rounded-full px-2 py-1">
          {badge}
        </span>
      )}
    </Link>
  );
};

export default SidebarNavItem; 