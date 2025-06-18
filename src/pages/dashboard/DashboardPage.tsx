
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ChevronRight, Clock, Users, Building } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';
import ProgressBar from '../../components/common/ProgressBar';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const profileSteps = [
    {
      id: 'email',
      label: 'Vérification de votre adresse e-mail',
      completed: user?.emailVerified || false,
      icon: Check
    },
    {
      id: 'phone',
      label: 'Vérification de votre numéro de téléphone',
      completed: user?.phoneVerified || false,
      icon: Check
    },
    {
      id: 'business',
      label: 'Informations sur votre entreprise',
      completed: false,
      icon: Building
    }
  ];

  const creditApplicationSteps = [
    {
      id: 'bank',
      label: 'Connexion avec votre banque',
      completed: true
    },
    {
      id: 'analysis',
      label: 'Analyse de vos données financières',
      completed: true
    },
    {
      id: 'kyc',
      label: 'Vérification de votre identité (KYC)',
      completed: false,
      current: true
    },
    {
      id: 'documents',
      label: 'Ajout de documents additionnels',
      completed: false
    }
  ];

  const handleCompleteProfile = () => {
    navigate('/profile/complete');
  };

  const handleContinueApplication = () => {
    navigate('/kyc/document-type');
  };

  return (
    <MobileLayout>
      <Header 
        title={`Bonjour ${user?.firstName}`}
        showNotifications={true}
      />
      
      <div className="p-4 space-y-6">
        {/* Welcome Message */}
        <div className="text-center py-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bonjour {user?.firstName}, prêt à booster votre activité ?
          </h2>
        </div>

        {/* Profile Completion Card */}
        <Card className="p-6 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Mon compte</h3>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Votre profil est incomplet.</span>
              <span className="text-sm font-semibold text-primary">{user?.profileCompletion || 40}%</span>
            </div>
            <ProgressBar 
              progress={user?.profileCompletion || 40} 
              showPercentage={false}
              className="mb-4"
            />
          </div>

          <div className="space-y-3 mb-6">
            {profileSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                    step.completed 
                      ? 'bg-success text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.completed ? (
                      <Check size={12} />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-sm ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <Button 
            onClick={handleCompleteProfile}
            className="w-full rounded-xl bg-primary hover:bg-primary/90"
          >
            Compléter mes informations
          </Button>
        </Card>

        {/* Credit Application Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes demandes</h3>
          
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Vous avez <span className="font-semibold text-primary">1 demande</span> de crédit en cours.
              </p>
              <ProgressBar 
                progress={90} 
                showPercentage={true}
                color="success"
                className="mb-4"
              />
            </div>

            <div className="space-y-3 mb-6">
              {creditApplicationSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                    step.completed 
                      ? 'bg-success text-white' 
                      : step.current
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.completed ? (
                      <Check size={12} />
                    ) : step.current ? (
                      <Clock size={12} />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-sm ${
                    step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleContinueApplication}
              className="w-full rounded-xl bg-success hover:bg-success/90"
            >
              Poursuivre la demande
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users size={20} className="text-primary" />
              </div>
              <p className="text-sm font-medium text-gray-900">Support</p>
              <p className="text-xs text-gray-500">Besoin d'aide ?</p>
            </div>
          </Card>

          <Card className="p-4 rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building size={20} className="text-secondary" />
              </div>
              <p className="text-sm font-medium text-gray-900">Mon entreprise</p>
              <p className="text-xs text-gray-500">Gérer mes infos</p>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DashboardPage;
