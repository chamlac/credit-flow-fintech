
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  onBack?: () => void;
  darkMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  showNotifications = false,
  onBack,
  darkMode = false 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const bgClass = darkMode ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const buttonClass = darkMode ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100';

  return (
    <header className={`sticky top-0 z-40 ${bgClass}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={handleBack}
              className={`mr-3 p-2 -ml-2 rounded-full transition-colors ${buttonClass}`}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className={`text-lg font-semibold ${textClass}`}>{title}</h1>
        </div>
        
        {showNotifications && (
          <button className={`p-2 rounded-full transition-colors relative ${buttonClass}`}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
