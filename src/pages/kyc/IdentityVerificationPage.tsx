
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Camera, User } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';

const IdentityVerificationPage: React.FC = () => {
  const navigate = useNavigate();

  const verificationSteps = [
    {
      id: 'document-photo',
      title: 'Photographiez votre pièce d\'identité',
      subtitle: 'Pour vérifier que vos informations sont correctes.',
      icon: Camera,
      action: () => navigate('/kyc/document-photo')
    },
    {
      id: 'selfie',
      title: 'Prenez un selfie de vous-même',
      subtitle: 'Pour vérifier que vous correspondez bien à la photo de votre pièce d\'identité.',
      icon: User,
      action: () => navigate('/kyc/selfie')
    }
  ];

  return (
    <MobileLayout>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="" 
          showBackButton 
          onBack={() => navigate('/kyc/verify-info')}
        />
        
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-xl font-medium leading-relaxed mb-6">
              Pour protéger votre sécurité{'\n'}
              et celle de votre entreprise,{'\n'}
              <span className="font-semibold">vérifions votre identité.</span>
            </h1>
            
            {/* Face verification illustration */}
            <div 
              className="mx-auto w-32 h-32 rounded-2xl border-2 border-dashed mb-6 flex items-center justify-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <User size={32} className="text-white/60" />
              </div>
            </div>
            
            <p className="text-white/60 text-sm">
              Vos données sont sécurisées et jamais{'\n'}
              partagées sans consentement.
            </p>
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            {verificationSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={step.action}
                  className="w-full p-4 rounded-xl transition-all duration-200 hover:bg-white/5 text-left"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mt-1">
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">{step.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{step.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-white/60 mt-2" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default IdentityVerificationPage;
