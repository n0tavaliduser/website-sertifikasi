import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiBell, FiUser, FiChevronDown, FiSearch } from 'react-icons/fi';
import { useAppLayout } from '../context/AppLayoutContext';

/**
 * Header component for the dashboard
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {Object} props.user - User information
 */
const Header = ({ title = 'Dashboard', user = {} }) => {
  const { 
    isSidebarOpen, 
    isHeaderFixed,
    toggleMobileSidebar,
    currentBreakpoint 
  } = useAppLayout();
  
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';
  
  // Header position classes based on fixed/not fixed
  const positionClasses = isHeaderFixed 
    ? 'sticky top-0 z-10' 
    : 'relative';
  
  // Calculate left margin based on sidebar state (for desktop only)
  const marginLeftStyle = !isMobile && isSidebarOpen 
    ? { marginLeft: '0' } 
    : { marginLeft: '0' };
  
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
        
        {/* Right side - Search, notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Search button - hidden on small screens */}
          <div className="hidden md:block relative">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
              <FiSearch className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-sm w-40 lg:w-56"
              />
            </div>
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Notifications"
            >
              <FiBell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
          
          {/* User dropdown */}
          <div className="relative">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name || 'User'} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="text-gray-600" />
                )}
              </div>
              
              {/* User name - hidden on small screens */}
              <div className="hidden md:flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  {user.name || 'User'}
                </span>
                <FiChevronDown size={16} className="ml-1 text-gray-500" />
              </div>
            </div>
            
            {/* Dropdown menu would be here (can be implemented with state) */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 