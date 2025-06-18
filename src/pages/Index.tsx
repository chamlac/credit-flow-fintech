
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Shield, Zap, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building,
      title: 'Crédit entreprise',
      description: 'Financez vos projets professionnels rapidement'
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Vos données sont protégées avec les dernières technologies'
    },
    {
      icon: Zap,
      title: 'Rapide',
      description: 'Obtenez une réponse en quelques heures'
    },
    {
      icon: Users,
      title: 'Support dédié',
      description: 'Une équipe à votre disposition 7j/7'
    }
  ];

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80">
        {/* Hero Section */}
        <div className="px-6 pt-16 pb-12 text-center">
          <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-8 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-2xl"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Financez votre entreprise
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            Solution de crédit rapide et sécurisée pour les professionnels
          </p>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/register')}
              className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-semibold text-lg"
            >
              Commencer maintenant
            </Button>
            
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full h-12 rounded-2xl border-white/30 text-white hover:bg-white/10 font-medium"
            >
              J'ai déjà un compte
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-t-3xl px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Pourquoi nous choisir ?
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Déjà plus de 1000+ entreprises nous font confiance
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
