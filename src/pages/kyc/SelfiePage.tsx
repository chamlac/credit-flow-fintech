
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, HelpCircle } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';

const SelfiePage: React.FC = () => {
  const navigate = useNavigate();
  const [flashOn, setFlashOn] = useState(false);

  const handleCapture = () => {
    navigate('/kyc/selfie-success');
  };

  const handleClose = () => {
    navigate('/kyc/identity');
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

        {/* Camera Viewfinder with Face Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          {/* Face Frame */}
          <div className="relative z-10">
            <div 
              className="w-72 h-96 border-2 border-white rounded-full relative"
              style={{ boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)' }}
            >
              {/* Face alignment guide */}
              <div className="absolute inset-4 border border-white/50 rounded-full"></div>
              
              {/* Corner guides for face positioning */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded"></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded"></div>
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-white rounded"></div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-white rounded"></div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-32 left-0 right-0 text-center px-6">
          <h2 className="text-white text-xl font-medium mb-2">
            Alignez votre visage au centre.
          </h2>
          <p className="text-white/80 text-sm">
            Assurez-vous que votre visage est à{'\n'}
            l'intérieur du cadre et prenez une photo.
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

export default SelfiePage;
