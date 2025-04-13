import React from 'react';
import { useAppLayout } from '../context/AppLayoutContext';

/**
 * Footer component for the dashboard
 */
const Footer = () => {
  const { isFooterVisible } = useAppLayout();
  
  // If footer is not visible, don't render anything
  if (!isFooterVisible) {
    return null;
  }
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Sertifikasi App. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-sm text-gray-400">
              Version 1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 