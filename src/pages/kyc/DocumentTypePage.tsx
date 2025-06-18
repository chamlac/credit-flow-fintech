
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, FileText, Car } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';

const DocumentTypePage: React.FC = () => {
  const navigate = useNavigate();

  const documentTypes = [
    {
      id: 'national-id',
      title: "Carte d'Identité Nationale (CIN)",
      icon: CreditCard,
      action: () => navigate('/kyc/document-photo')
    },
    {
      id: 'passport',
      title: 'Passeport',
      icon: FileText,
      action: () => navigate('/kyc/document-photo')
    },
    {
      id: 'driving-license',
      title: 'Permis de conduire',
      icon: Car,
      action: () => navigate('/kyc/document-photo')
    }
  ];

  return (
    <MobileLayout>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="" 
          showBackButton 
          onBack={() => navigate('/documents/upload')}
        />
        
        <div className="p-6 space-y-8">
          {/* Document Preview */}
          <div className="text-center mb-8">
            <div 
              className="mx-auto w-48 h-32 rounded-lg border-2 border-dashed flex items-center justify-center mb-6"
              style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/10 flex items-center justify-center">
                  <FileText size={24} className="text-white opacity-60" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-white/20 rounded mx-auto"></div>
                  <div className="h-2 w-12 bg-white/20 rounded mx-auto"></div>
                  <div className="h-2 w-20 bg-white/20 rounded mx-auto"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-white text-xl font-medium">
              Choisissez le document à renseigner.
            </h1>
          </div>

          {/* Document Options */}
          <div className="space-y-4">
            {documentTypes.map((docType) => {
              const IconComponent = docType.icon;
              return (
                <button
                  key={docType.id}
                  onClick={docType.action}
                  className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-white/5"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <span className="text-white font-medium">{docType.title}</span>
                  </div>
                  <ChevronRight size={20} className="text-white/60" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DocumentTypePage;
