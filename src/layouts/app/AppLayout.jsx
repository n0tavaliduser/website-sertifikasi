import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppLayoutProvider from './context/AppLayoutContext';
import { useAppLayout } from './context/AppLayoutContext';
import Sidebar from '../../components/App/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * Main content wrapper that adapts to sidebar state
 */
const MainContent = ({ children }) => {
  const { 
    isSidebarOpen, 
    sidebarWidth, 
    currentBreakpoint,
    isHeaderFixed
  } = useAppLayout();
  
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';
  
  // Calculate main content margin based on sidebar state
  const marginLeft = !isMobile && isSidebarOpen 
    ? `${sidebarWidth}px` 
    : isMobile ? '0' : '80px'; // 80px is collapsed sidebar width
  
  // Transition for smooth sidebar open/close
  const style = {
    marginLeft,
    transition: 'margin-left 0.3s ease-in-out'
  };
  
  return (
    <div 
      className="flex-1 flex flex-col min-h-screen bg-gray-50"
    //   style={style}
    >
      {children}
    </div>
  );
};

/**
 * App Layout Component - Main layout for the dashboard
 */
const AppLayout = () => {
  // Example user data - in a real app, this would come from auth context
  const [user, setUser] = useState({
    name: 'John Doe',
    role: 'Administrator',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });
  
  // Mock logout function
  const handleLogout = () => {
    console.log('Logging out...');
    // Implement actual logout logic here
  };
  
  // The actual layout implementation using AppLayoutProvider
  return (
    <AppLayoutProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <Sidebar user={user} onLogout={handleLogout} />
        
        {/* Main Content Area with Header, Content and Footer */}
        <MainContentWithContext user={user} />
      </div>
    </AppLayoutProvider>
  );
};

/**
 * Main content with context awareness
 * This is separated because it needs to use the context
 * which is only available inside AppLayoutProvider
 */
const MainContentWithContext = ({ user }) => {
  return (
    <MainContent>
      {/* Header */}
      <Header title="Dashboard" user={user} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {/* Page content from router */}
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </MainContent>
  );
};

export default AppLayout;
