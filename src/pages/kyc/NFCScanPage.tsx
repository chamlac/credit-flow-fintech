
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';

const NFCScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    // Simulate NFC scanning process
    const timer = setTimeout(() => {
      setScanning(false);
      navigate('/kyc/verify-info');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="" 
          showBackButton 
          onBack={() => navigate('/kyc/document-photo')}
        />
        
        <div className="flex flex-col items-center justify-center h-full px-6 text-center">
          {/* NFC Animation */}
          <div className="relative mb-12">
            <div 
              className={`w-32 h-56 rounded-2xl border-2 border-white/30 bg-white/5 flex items-center justify-center ${
                scanning ? 'animate-pulse' : ''
              }`}
            >
              <Wifi size={48} className="text-white/60" />
            </div>
            
            {/* ID Card illustration */}
            <div 
              className="absolute -bottom-8 -left-8 w-24 h-16 rounded-lg border border-white/30 bg-white/10 transform rotate-12"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}
            >
              <div className="p-2">
                <div className="w-full h-1 bg-white/20 rounded mb-1"></div>
                <div className="w-2/3 h-1 bg-white/20 rounded mb-2"></div>
                <div className="flex space-x-1">
                  <div className="w-3 h-4 bg-white/20 rounded"></div>
                  <div className="flex-1 space-y-0.5">
                    <div className="w-full h-0.5 bg-white/20 rounded"></div>
                    <div className="w-2/3 h-0.5 bg-white/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title and Instructions */}
          <h1 className="text-white text-2xl font-medium mb-4">
            Scannez votre puce NFC.
          </h1>
          
          <p className="text-white/80 text-lg leading-relaxed">
            Collez votre téléphone au dessus de votre{'\n'}
            pièce d'identité pour vérifier votre document.
          </p>

          {/* Scanning indicator */}
          {scanning && (
            <div className="mt-8">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default NFCScanPage;
