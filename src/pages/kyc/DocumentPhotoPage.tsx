
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, HelpCircle } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import { Button } from '../../components/ui/button';

const DocumentPhotoPage: React.FC = () => {
  const navigate = useNavigate();
  const [flashOn, setFlashOn] = useState(false);

  const handleCapture = () => {
    // Simulate photo capture
    navigate('/kyc/nfc-scan');
  };

  const handleClose = () => {
    navigate('/kyc/document-type');
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen bg-black relative">
        {/* Camera Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-12">
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
          >
            <X size={24} className="text-white" />
          </button>
          <button className="flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full">
            <HelpCircle size={16} className="text-white" />
            <span className="text-white text-sm">Aide</span>
          </button>
        </div>

        {/* Camera Viewfinder */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          {/* Document Frame */}
          <div className="relative z-10">
            <div 
              className="w-80 h-52 border-2 border-white rounded-lg relative"
              style={{ boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)' }}
            >
              {/* Sample ID Card */}
              <div className="absolute inset-2 bg-white rounded-md overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-200 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-xs font-bold text-blue-900">ROYAUME DU MAROC</div>
                    <div className="w-8 h-8 bg-red-600 rounded"></div>
                  </div>
                  <div className="text-xs text-blue-800 mb-2">CARTE NATIONALE D'IDENTITÉ</div>
                  <div className="flex space-x-3">
                    <div className="w-16 h-20 bg-gray-300 rounded"></div>
                    <div className="flex-1 space-y-1">
                      <div className="text-xs font-semibold">MOUHCINE</div>
                      <div className="text-xs font-semibold">TEMSAMANI</div>
                      <div className="text-xs">29.11.1988</div>
                      <div className="text-xs">TANGER ASSILAH - TANGER</div>
                    </div>
                    <div className="w-12 h-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="mt-2 text-xs">K01234567</div>
                </div>
              </div>
              
              {/* Corner guides */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-white"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-white"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-white"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-32 left-0 right-0 text-center px-6">
          <h2 className="text-white text-xl font-medium mb-2">
            Centrez correctement.
          </h2>
          <p className="text-white/80 text-sm">
            Placez la pièce d'identité sur une surface plane.{'\n'}
            Assurez-vous que l'ensemble de la pièce{'\n'}
            d'identité soit visible et lisible.
          </p>
        </div>

        {/* Camera Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-12">
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              flashOn ? 'bg-yellow-500' : 'bg-white/20'
            }`}
          >
            <Zap size={24} className={flashOn ? 'text-black' : 'text-white'} />
          </button>
          
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-white"></div>
          </button>
          
          <div className="w-12 h-12"></div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DocumentPhotoPage;
