import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAppLayout } from '../../../../layouts/app/context/AppLayoutContext';

/**
 * SidebarHeader component for displaying logo and toggle button
 */
const SidebarHeader = () => {
  const { 
    isSidebarOpen, 
    toggleSidebar,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    currentBreakpoint
  } = useAppLayout();
  
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';
  
  return (
    <div className={`flex items-center h-16 px-4 border-b border-slate-700 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
      {/* Logo/Brand */}
      {isSidebarOpen && (
        <div className="flex items-center">
          {/* App Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-8 w-8"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/32?text=Logo';
              }}
            /> */}
            
            <span className="ml-2 text-white text-lg font-semibold">
              SertifikasiApp
            </span>
          </div>
        </div>
      )}
      
      {/* Toggle Button - Show different icons based on state */}
      <button
        type="button"
        className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none"
        onClick={isMobile ? toggleMobileSidebar : toggleSidebar}
      >
        <span className="sr-only">
          {isMobile 
            ? (isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar') 
            : (isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar')}
        </span>
        {isMobile 
          ? (isMobileSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />) 
          : (isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />)}
      </button>
    </div>
  );
};

export default SidebarHeader;
