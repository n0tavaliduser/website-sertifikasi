import React, { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useAppLayout } from '../../../../layouts/app/context/AppLayoutContext';

/**
 * SidebarNavGroup component for rendering a collapsible group of navigation items
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Group title
 * @param {ReactNode} props.icon - Icon element
 * @param {ReactNode} props.children - Child navigation items
 * @param {boolean} props.defaultExpanded - Whether the group is expanded by default
 */
const SidebarNavGroup = ({ 
  title, 
  icon, 
  children, 
  defaultExpanded = false 
}) => {
  const { isSidebarOpen } = useAppLayout();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };
  
  // Jika sidebar tertutup, jangan tampilkan parent menu sama sekali
  if (!isSidebarOpen) {
    return (
      <div className="mb-2">
        {/* Children container saat sidebar di-hide */}
        <div className="mt-1 space-y-1">
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-2">
      {/* Group header - hanya ditampilkan jika sidebar terbuka */}
      <div 
        className="flex items-center py-3 px-4 text-gray-400 hover:bg-slate-800 rounded-md cursor-pointer transition-colors duration-200"
        onClick={toggleExpand}
      >
        {/* Icon */}
        {icon && (
          <span className="flex-shrink-0 text-xl">
            {icon}
          </span>
        )}
        
        <span className="ml-3 text-sm font-medium">{title}</span>
        
        {/* Expand/collapse icon */}
        <span className="ml-auto">
          {isExpanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
        </span>
      </div>
      
      {/* Children container - hanya render jika expanded */}
      {isExpanded && (
        <div className="pl-6 pr-2 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarNavGroup; 