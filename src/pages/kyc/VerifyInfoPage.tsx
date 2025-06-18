
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const VerifyInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Mouhcine',
    lastName: 'TEMSAMANI',
    companyName: '',
    businessSector: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    navigate('/kyc/identity-verification');
  };

  return (
    <MobileLayout>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="" 
          showBackButton 
          onBack={() => navigate('/kyc/nfc-scan')}
        />
        
        <div className="p-6 space-y-8">
          <div className="mb-8">
            <h1 className="text-white text-xl font-medium leading-relaxed">
              Vérifiez que vos informations sont correctes...
            </h1>
          </div>

          <div className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-white/60 text-sm mb-2">Prénom</label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 h-14 text-lg rounded-xl"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-white/60 text-sm mb-2">Nom</label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 h-14 text-lg rounded-xl"
              />
            </div>

            {/* Company Name */}
            <div>
              <Input
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Raison sociale de l'entreprise"
                className="bg-white/10 border-white/20 text-white placeholder-white/50 h-14 text-lg rounded-xl"
              />
            </div>

            {/* Business Sector */}
            <div>
              <Input
                value={formData.businessSector}
                onChange={(e) => handleInputChange('businessSector', e.target.value)}
                placeholder="Secteur d'activité"
                className="bg-white/10 border-white/20 text-white placeholder-white/50 h-14 text-lg rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6">
          <Button
            onClick={handleContinue}
            className="w-full h-14 text-lg font-medium rounded-full"
            style={{ background: '#87ceeb', color: '#1a3b47' }}
          >
            CONTINUER <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default VerifyInfoPage;
