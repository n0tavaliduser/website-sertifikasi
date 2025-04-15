import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiUser, FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useAppLayout } from '../context/AppLayoutContext';
import { getUser } from '@/utils/auth';

/**
 * Header component for the dashboard
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {Object} props.user - User information
 * @param {Function} props.onLogout - Logout handler function
 */
const Header = ({ 
  title = 'Dashboard', 
  user = {},
  onLogout = () => {}
}) => {
  const { 
    isSidebarOpen, 
    isHeaderFixed,
    toggleMobileSidebar,
    currentBreakpoint 
  } = useAppLayout();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState(user);
  
  // Ambil data user dari auth utils jika tidak ada yang diberikan melalui props
  useEffect(() => {
    if (!user || !user.name) {
      const authUser = getUser();
      if (authUser) {
        setUserData(authUser);
      }
    }
  }, [user]);
  
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';
  
  // Header position classes based on fixed/not fixed
  const positionClasses = isHeaderFixed 
    ? 'sticky top-0 z-10' 
    : 'relative';
  
  // Calculate left margin based on sidebar state (for desktop only)
  const marginLeftStyle = !isMobile && isSidebarOpen 
    ? { marginLeft: '0' } 
    : { marginLeft: '0' };
  
  // Menutup dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };
  
  return (
    <header 
      className={`bg-white shadow-sm ${positionClasses}`}
      style={marginLeftStyle}
    >
      <div className="px-4 py-3 lg:px-6 flex items-center justify-between">
        {/* Left side - Mobile menu toggle and page title */}
        <div className="flex items-center">
          {/* Mobile menu toggle button - only on mobile */}
          {isMobile && (
            <button
              type="button"
              className="p-1 mr-3 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMobileSidebar}
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>
          )}
          
          {/* Page title */}
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        
        {/* Right side - User dropdown */}
        <div className="flex items-center">
          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
              onClick={toggleDropdown}
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {userData.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt={userData.name || 'User'} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="text-gray-600" />
                )}
              </div>
              
              {/* User name - hidden on small screens */}
              <div className="hidden md:flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  {userData.name || 'User'}
                </span>
                <FiChevronDown 
                  size={16} 
                  className={`ml-1 text-gray-500 transition-transform duration-200 ${showDropdown ? 'transform rotate-180' : ''}`}
                />
              </div>
            </div>
            
            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                {/* profile */}
                <Link to="/admin/profile" className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FiUser className="mr-2" size={16} />
                  Profile
                </Link>
                
                <button 
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={onLogout}
                >
                  <FiLogOut className="mr-2" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 