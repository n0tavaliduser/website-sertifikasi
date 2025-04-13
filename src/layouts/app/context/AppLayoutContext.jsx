import { createContext, useContext, useState, useEffect } from 'react';

// Default values for the layout context
const defaultContextValue = {
  // States
  isSidebarOpen: true,
  isMobileSidebarOpen: false,
  sidebarWidth: 240,
  isHeaderFixed: true,
  isFooterVisible: true,
  layoutMode: 'full-width',
  contentMaxWidth: '1200px',
  currentBreakpoint: 'lg',
  
  // Functions
  toggleSidebar: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleMobileSidebar: () => {},
  openMobileSidebar: () => {},
  closeMobileSidebar: () => {},
  setSidebarWidth: () => {},
  toggleHeaderFixed: () => {},
  toggleFooterVisible: () => {},
  setLayoutMode: () => {},
  setContentMaxWidth: () => {},
  resetLayout: () => {},
};

// Create context
const AppLayoutContext = createContext(defaultContextValue);

/**
 * Custom hook to use the app layout context
 * @returns {Object} Layout context object
 */
export const useAppLayout = () => {
  const context = useContext(AppLayoutContext);
  
  if (!context) {
    throw new Error('useAppLayout must be used within an AppLayoutProvider');
  }
  
  return context;
};

/**
 * Get stored layout preferences from localStorage
 * @returns {Object} Stored layout preferences or empty object
 */
const getStoredLayoutPreferences = () => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('appLayoutPreferences');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading layout preferences from localStorage', error);
    return {};
  }
};

/**
 * Save layout preferences to localStorage
 * @param {Object} preferences - Layout preferences to save
 */
const saveLayoutPreferences = (preferences) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('appLayoutPreferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving layout preferences to localStorage', error);
  }
};

/**
 * Detect current breakpoint based on window width
 * @returns {string} Current breakpoint (xs, sm, md, lg, xl)
 */
const detectBreakpoint = () => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width < 576) return 'xs';
  if (width < 768) return 'sm';
  if (width < 992) return 'md';
  if (width < 1200) return 'lg';
  return 'xl';
};

/**
 * App Layout Provider Component
 * Manages all layout-related state and functions
 */
const AppLayoutProvider = ({ children }) => {
  // Get stored preferences
  const storedPreferences = getStoredLayoutPreferences();
  
  // Initialize states with stored preferences or defaults
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    storedPreferences.isSidebarOpen ?? defaultContextValue.isSidebarOpen
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(
    storedPreferences.isMobileSidebarOpen ?? defaultContextValue.isMobileSidebarOpen
  );
  const [sidebarWidth, setSidebarWidth] = useState(
    storedPreferences.sidebarWidth ?? defaultContextValue.sidebarWidth
  );
  const [isHeaderFixed, setIsHeaderFixed] = useState(
    storedPreferences.isHeaderFixed ?? defaultContextValue.isHeaderFixed
  );
  const [isFooterVisible, setIsFooterVisible] = useState(
    storedPreferences.isFooterVisible ?? defaultContextValue.isFooterVisible
  );
  const [layoutMode, setLayoutMode] = useState(
    storedPreferences.layoutMode ?? defaultContextValue.layoutMode
  );
  const [contentMaxWidth, setContentMaxWidth] = useState(
    storedPreferences.contentMaxWidth ?? defaultContextValue.contentMaxWidth
  );
  const [currentBreakpoint, setCurrentBreakpoint] = useState(detectBreakpoint());

  // Update stored preferences when states change
  useEffect(() => {
    const preferences = {
      isSidebarOpen,
      isMobileSidebarOpen,
      sidebarWidth,
      isHeaderFixed,
      isFooterVisible,
      layoutMode,
      contentMaxWidth,
    };
    
    saveLayoutPreferences(preferences);
  }, [
    isSidebarOpen,
    isMobileSidebarOpen,
    sidebarWidth,
    isHeaderFixed,
    isFooterVisible,
    layoutMode,
    contentMaxWidth,
  ]);

  // Handle window resize to update current breakpoint
  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = detectBreakpoint();
      setCurrentBreakpoint(newBreakpoint);
      
      // Auto close sidebar on mobile view
      if (newBreakpoint === 'xs' || newBreakpoint === 'sm') {
        setIsSidebarOpen(false);
      }
    };
    
    // Set initial breakpoint
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Sidebar functions
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  
  // Mobile sidebar functions
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev);
  const openMobileSidebar = () => setIsMobileSidebarOpen(true);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
  
  // Header functions
  const toggleHeaderFixed = () => setIsHeaderFixed(prev => !prev);
  
  // Footer functions
  const toggleFooterVisible = () => setIsFooterVisible(prev => !prev);
  
  // Layout mode function
  const handleSetLayoutMode = (mode) => {
    if (['boxed', 'full-width', 'contained'].includes(mode)) {
      setLayoutMode(mode);
    } else {
      console.error('Invalid layout mode. Use: boxed, full-width, or contained');
    }
  };
  
  // Content width function
  const handleSetContentMaxWidth = (width) => {
    setContentMaxWidth(width);
  };
  
  // Reset layout to defaults
  const resetLayout = () => {
    setIsSidebarOpen(defaultContextValue.isSidebarOpen);
    setIsMobileSidebarOpen(defaultContextValue.isMobileSidebarOpen);
    setSidebarWidth(defaultContextValue.sidebarWidth);
    setIsHeaderFixed(defaultContextValue.isHeaderFixed);
    setIsFooterVisible(defaultContextValue.isFooterVisible);
    setLayoutMode(defaultContextValue.layoutMode);
    setContentMaxWidth(defaultContextValue.contentMaxWidth);
  };

  // Create the context value object
  const contextValue = {
    // States
    isSidebarOpen,
    isMobileSidebarOpen,
    sidebarWidth,
    isHeaderFixed,
    isFooterVisible,
    layoutMode,
    contentMaxWidth,
    currentBreakpoint,
    
    // Functions
    toggleSidebar,
    openSidebar,
    closeSidebar,
    toggleMobileSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    setSidebarWidth,
    toggleHeaderFixed,
    toggleFooterVisible,
    setLayoutMode: handleSetLayoutMode,
    setContentMaxWidth: handleSetContentMaxWidth,
    resetLayout,
  };

  return (
    <AppLayoutContext.Provider value={contextValue}>
      {children}
    </AppLayoutContext.Provider>
  );
};

export default AppLayoutProvider;
