import React from 'react';
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
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
  
  // Default user data if not provided
  const defaultUser = {
    name: user.name || 'Guest User',
    email: user.email || 'guest@example.com',
    role: user.role || 'Guest',
    avatar: user.avatar || null
  };
  
  return (
    <div className="border-t border-slate-700 pt-2">
      {/* User Info Section */}
      <div className="px-4 py-3">
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
            <div className="ml-3">
              <p className="text-sm font-medium text-white truncate">
                {defaultUser.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {defaultUser.role}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className={`px-3 pb-3 ${isSidebarOpen ? 'flex justify-between' : ''}`}>
        {/* Settings Button */}
        <button 
          type="button" 
          className="p-2 text-gray-400 rounded-md hover:bg-slate-700 hover:text-white transition-colors"
          title={!isSidebarOpen ? 'Settings' : ''}
        >
          <FiSettings size={18} />
        </button>
        
        {/* Logout Button */}
        <button 
          type="button" 
          className="p-2 text-gray-400 rounded-md hover:bg-slate-700 hover:text-white transition-colors"
          onClick={onLogout}
          title={!isSidebarOpen ? 'Logout' : ''}
        >
          <FiLogOut size={18} />
        </button>
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
