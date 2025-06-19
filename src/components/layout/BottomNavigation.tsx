
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, MessageCircle, User, Plus } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'accueil',
      label: 'Accueil',
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'credits',
      label: 'Mes crédits',
      icon: FileText,
      path: '/credits'
    },
    {
      id: 'plus',
      label: '',
      icon: Plus,
      path: '/new-application',
      isCenter: true
    },
    {
      id: 'support',
      label: 'Support',
      icon: MessageCircle,
      path: '/support'
    },
    {
      id: 'profil',
      label: 'Profil',
      icon: User,
      path: '/profile'
    }
  ];

  const handleNavigation = (path: string) => {
    if (path === '/new-application') {
      // Handle new application flow
      navigate('/documents/upload');
    } else {
      navigate(path);
    }
  };

  return (
    <nav 
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md border-t border-gray-200 z-50"
      style={{ background: '#1a3b47' }}
    >
      <div className="flex items-center justify-around py-2 px-4 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className="flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-6"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: '#87ceeb' }}
                >
                  <Icon size={24} style={{ color: '#1a3b47' }} />
                </div>
              </button>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="flex flex-col items-center justify-center py-2 px-3 transition-colors flex-1"
            >
              <Icon 
                size={20} 
                className={`mb-1 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400'
                }`}
                style={{ color: isActive ? '#87ceeb' : '#94a3b8' }}
              />
              <span 
                className={`text-xs font-medium ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400'
                }`}
                style={{ color: isActive ? '#87ceeb' : '#94a3b8' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
