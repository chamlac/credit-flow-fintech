
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, showBottomNav = true }) => {
  const location = useLocation();
  
  // Don't show bottom nav on auth pages or during onboarding flows
  const hideBottomNavRoutes = ['/login', '/register', '/verify-phone', '/kyc', '/documents/upload'];
  const shouldShowBottomNav = showBottomNav && !hideBottomNavRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <div className="mobile-container">
      <main className={`flex-1 ${shouldShowBottomNav ? 'pb-24' : ''}`}>
        {children}
      </main>
      {shouldShowBottomNav && <BottomNavigation />}
    </div>
  );
};

export default MobileLayout;
