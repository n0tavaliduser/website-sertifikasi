import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AppLayoutProvider from './context/AppLayoutContext';
import { useAppLayout } from './context/AppLayoutContext';
import Sidebar from '../../components/App/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { isAuthenticated, getUser, logout } from '../../utils/auth';

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
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Cek autentikasi ketika komponen dimuat
  useEffect(() => {
    const checkAuth = () => {
      // Periksa jika user sudah login
      if (!isAuthenticated()) {
        // Redirect ke halaman login jika tidak terotentikasi
        navigate('/auth/login', { 
          replace: true,
          state: { from: location.pathname }
        });
        return false;
      }
      
      // Ambil data user dari localStorage
      const userData = getUser();
      if (userData) {
        setUser(userData);
        return true;
      } else {
        // Jika ada token tapi tidak ada data user, redirect ke login
        console.error("Token ditemukan tetapi tidak ada data user");
        localStorage.removeItem('token'); // Hapus token yang tidak valid
        navigate('/auth/login', { 
          replace: true,
          state: { from: location.pathname }
        });
        return false;
      }
    };
    
    const authResult = checkAuth();
    setIsLoading(!authResult);
  }, [navigate, location.pathname]);
  
  // Menampilkan loading jika masih memeriksa autentikasi
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }
  
  // Jika belum login atau tidak ada user, jangan render layout
  if (!user) {
    return null;
  }
  
  // Handle logout
  const handleLogout = () => {
    // Hapus data autentikasi
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigasi ke halaman login via React Router untuk menghindari refresh
    navigate('/auth/login', { replace: true });
  };
  
  // The actual layout implementation using AppLayoutProvider
  return (
    <AppLayoutProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <Sidebar user={user} onLogout={handleLogout} />
        
        {/* Main Content Area with Header, Content and Footer */}
        <MainContentWithContext user={user} onLogout={handleLogout} />
      </div>
    </AppLayoutProvider>
  );
};

/**
 * Main content with context awareness
 * This is separated because it needs to use the context
 * which is only available inside AppLayoutProvider
 */
const MainContentWithContext = ({ user, onLogout }) => {
  return (
    <MainContent>
      {/* Header */}
      <Header title="Dashboard" user={user} onLogout={onLogout} />
      
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
