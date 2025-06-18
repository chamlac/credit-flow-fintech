
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const PhoneVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('+212 6 65 85 85 85');

  const handleSendCode = () => {
    navigate('/verify-phone/otp');
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="" 
          showBackButton 
          onBack={() => navigate('/kyc/identity')}
        />
        
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="mt-8">
            <h1 className="text-white text-xl font-medium leading-relaxed mb-4">
              Vérifiez votre numéro de téléphone...
            </h1>
            
            <p className="text-white/80 text-base leading-relaxed">
              Nous vous enverrons un code de sécurité pour{'\n'}
              confirmer que c'est bien vous.
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="mt-12">
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-white/10 border-white/30 text-white placeholder-white/50 h-16 text-lg rounded-xl"
              placeholder="+212 6 65 85 85 85"
            />
          </div>
        </div>

        {/* Send Code Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6">
          <Button
            onClick={handleSendCode}
            className="w-full h-14 text-lg font-medium rounded-full"
            style={{ background: '#87ceeb', color: '#1a3b47' }}
          >
            RECEVOIR LE CODE <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PhoneVerificationPage;
