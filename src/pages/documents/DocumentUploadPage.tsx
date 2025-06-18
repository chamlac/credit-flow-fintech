
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileText, Upload } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const DocumentUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [ribNumber, setRibNumber] = useState('012 - 345 - 1300005800018000 - 67');
  const [uploads, setUploads] = useState({
    commerceRegistry: { uploaded: true, progress: 100, filename: 'RC.pdf' },
    january: { uploaded: true, progress: 100, filename: 'releve-janvier.pdf' },
    february: { uploaded: true, progress: 100, filename: 'releve-fevrier.pdf' },
    march: { uploaded: true, progress: 100, filename: 'releve-mars.pdf' }
  });

  const handleContinue = () => {
    navigate('/kyc/document-type');
  };

  return (
    <MobileLayout>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="Téléchargez vos documents." 
          showBackButton 
          onBack={() => navigate('/dashboard')}
        />
        
        <div className="p-6 space-y-8">
          {/* Commerce Registry */}
          <div>
            <h2 className="text-white text-lg font-medium mb-4">
              Registre de Commerce (Modèle J)
            </h2>
            <div 
              className="rounded-2xl p-6 border-2 border-dashed"
              style={{ borderColor: 'rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText size={48} className="text-white opacity-80" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm mb-2">{uploads.commerceRegistry.filename}</p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        background: '#87ceeb',
                        width: `${uploads.commerceRegistry.progress}%` 
                      }}
                    />
                  </div>
                  <p className="text-white text-xs mt-1">{uploads.commerceRegistry.progress}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Statements */}
          <div>
            <h2 className="text-white text-lg font-medium mb-4">
              Relevés bancaires
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: 'january', filename: 'releve-janvier.pdf', month: 'janvier 2025' },
                { key: 'february', filename: 'releve-fevrier.pdf', month: 'février 2025' },
                { key: 'march', filename: 'releve-mars.pdf', month: 'mars 2025' }
              ].map((item) => (
                <div 
                  key={item.key}
                  className="rounded-xl p-4 border"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                    background: 'rgba(255, 255, 255, 0.05)' 
                  }}
                >
                  <div className="text-center">
                    <FileText size={32} className="text-white opacity-80 mx-auto mb-2" />
                    <p className="text-white text-xs mb-2">{uploads[item.key as keyof typeof uploads].filename}</p>
                    <div className="w-full bg-gray-600 rounded-full h-1.5 mb-1">
                      <div 
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{ 
                          background: '#87ceeb',
                          width: `${uploads[item.key as keyof typeof uploads].progress}%` 
                        }}
                      />
                    </div>
                    <p className="text-white text-xs">{uploads[item.key as keyof typeof uploads].progress}%</p>
                    <p className="text-gray-300 text-xs mt-1">{item.month}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIB Input */}
          <div>
            <h2 className="text-white text-lg font-medium mb-4">
              Votre RIB (24 caractères)
            </h2>
            <div className="space-y-4">
              <Input
                value={ribNumber}
                onChange={(e) => setRibNumber(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 h-14 text-lg"
                placeholder="000 - 000 - 0000000000000000 - 00"
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

export default DocumentUploadPage;
