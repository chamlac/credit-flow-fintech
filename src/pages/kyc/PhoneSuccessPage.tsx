
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';

const PhoneSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1a3b47' }}>
        <div className="text-center px-6">
          <div className="mb-8">
            <CheckCircle size={80} className="mx-auto mb-6" style={{ color: '#22c55e' }} />
            <h1 className="text-white text-2xl font-medium leading-relaxed">
              Numéro de téléphone{'\n'}
              vérifié avec succès !
            </h1>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PhoneSuccessPage;
