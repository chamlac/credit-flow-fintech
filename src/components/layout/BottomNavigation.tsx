
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, CreditCard, MessageCircle, User } from 'lucide-react';

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
      icon: CreditCard,
      path: '/credits'
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

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
