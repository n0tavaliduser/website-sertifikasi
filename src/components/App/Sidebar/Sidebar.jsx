import React, { useEffect } from 'react';
import { useAppLayout } from '../../../layouts/app/context/AppLayoutContext';

// Import sub-components
import SidebarHeader from './components/SidebarHeader';
import SidebarNav from './components/SidebarNav';
import SidebarFooter from './components/SidebarFooter';

/**
 * Main Sidebar component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User information
 * @param {Function} props.onLogout - Logout handler function
 */
const Sidebar = ({ user = {}, onLogout }) => {
  const { 
    isSidebarOpen, 
    sidebarWidth, 
    isMobileSidebarOpen,
    closeMobileSidebar,
    currentBreakpoint 
  } = useAppLayout();
  
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';
  
  // Determine which sidebar state to use based on screen size
  const isOpen = isMobile ? isMobileSidebarOpen : isSidebarOpen;
  
  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only for mobile
      if (!isMobile || !isMobileSidebarOpen) return;
      
      // Check if the click was outside the sidebar
      const sidebar = document.getElementById('mobile-sidebar');
      if (sidebar && !sidebar.contains(event.target)) {
        closeMobileSidebar();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isMobileSidebarOpen, closeMobileSidebar]);
  
  // Calculate sidebar width
  const width = isSidebarOpen ? `${sidebarWidth}px` : '80px';
  
  // Mobile overlay styles
  const mobileStyles = isMobile ? {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 40,
    transform: isMobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    width: `${sidebarWidth}px`, // Always full width on mobile
    transition: 'transform 0.3s ease-in-out'
  } : {};
  
  // Desktop sidebar styles
  const desktopStyles = !isMobile ? {
    width,
    minWidth: width,
    transition: 'width 0.3s ease-in-out, min-width 0.3s ease-in-out'
  } : {};
  
  // Combine styles
  const sidebarStyles = {
    ...desktopStyles,
    ...mobileStyles
  };
  
  // Mobile overlay backdrop
  const renderMobileBackdrop = () => {
    if (!isMobile || !isMobileSidebarOpen) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-gray-800 bg-opacity-75 z-30"
        aria-hidden="true"
      />
    );
  };
  
  return (
    <>
      {/* Mobile backdrop overlay */}
      {renderMobileBackdrop()}
      
      {/* Sidebar */}
      <div
        id={isMobile ? 'mobile-sidebar' : 'sidebar'}
        className="bg-slate-800 text-white flex flex-col h-full"
        style={sidebarStyles}
        aria-label="Sidebar"
      >
        {/* Sidebar Header with Logo */}
        <SidebarHeader />
        
        {/* Navigation Menu */}
        <SidebarNav />
        
        {/* Footer with User Profile */}
        <SidebarFooter user={user} onLogout={onLogout} />
      </div>
    </>
  );
};

export default Sidebar;
