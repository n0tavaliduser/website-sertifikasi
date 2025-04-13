import React, { useState, useRef, useEffect } from 'react';
import { FiLogOut, FiUser, FiChevronUp } from 'react-icons/fi';
import { useAppLayout } from '../../../../layouts/app/context/AppLayoutContext';

/**
 * SidebarFooter component for displaying user info and logout button
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User information
 * @param {Function} props.onLogout - Logout handler function
 */
const SidebarFooter = ({ user = {}, onLogout = () => {} }) => {
  const { isSidebarOpen } = useAppLayout();
  const [showLogout, setShowLogout] = useState(false);
  const menuRef = useRef(null);
  
  // Default user data if not provided
  const defaultUser = {
    name: user.name || 'John Doe',
    email: user.email || 'john.doe@example.com',
    role: user.role || 'Administrator',
    avatar: user.avatar || null
  };
  
  // Menutup dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Toggle dropdown
  const toggleLogout = () => {
    setShowLogout(prev => !prev);
  };
  
  return (
    <div className="border-t border-slate-700 pt-2 relative" ref={menuRef}>
      {/* Logout dropdown - arah ke atas */}
      {showLogout && (
        <div className="absolute bottom-full left-0 w-full mb-2 bg-slate-800 rounded-md shadow-lg py-2 z-10">
          <button 
            className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
            onClick={onLogout}
          >
            <FiLogOut className="mr-2" size={16} />
            Logout
          </button>
        </div>
      )}
      
      {/* User Info Section */}
      <div 
        className="px-4 py-3 cursor-pointer hover:bg-slate-700 rounded-md transition-colors"
        onClick={toggleLogout}
      >
        <div className="flex items-center">
          {/* User Avatar */}
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-white overflow-hidden">
            {defaultUser.avatar ? (
              <img 
                src={defaultUser.avatar} 
                alt={defaultUser.name} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = null;
                  e.target.parentNode.innerHTML = '<FiUser size={20} />';
                }}
              />
            ) : (
              <FiUser size={20} />
            )}
          </div>
          
          {/* User Details - shown only when sidebar is open */}
          {isSidebarOpen && (
            <div className="ml-3 flex-grow">
              <p className="text-sm font-medium text-white truncate">
                {defaultUser.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {defaultUser.role}
              </p>
            </div>
          )}
          
          {/* Dropdown indicator - shown only when sidebar is open */}
          {isSidebarOpen && (
            <FiChevronUp 
              size={16} 
              className={`text-gray-400 transform transition-transform ${showLogout ? '' : 'rotate-180'}`}
            />
          )}
        </div>
      </div>
      
      {/* Version Info - shown only when sidebar is open */}
      {isSidebarOpen && (
        <div className="px-4 py-2 text-xs text-center text-gray-500">
          Version 1.0.0
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
