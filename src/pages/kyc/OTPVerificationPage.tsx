
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';
import { Button } from '../../components/ui/button';

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    navigate('/kyc/phone-success');
  };

  const handleResendCode = () => {
    // Reset OTP and show resend feedback
    setOtpCode(['', '', '', '', '', '']);
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="" 
          showBackButton 
          onBack={() => navigate('/verify-phone')}
        />
        
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="mt-8">
            <h1 className="text-white text-xl font-medium leading-relaxed mb-4">
              Vérifiez votre numéro de téléphone...
            </h1>
            
            <p className="text-white/80 text-base leading-relaxed mb-8">
              Veuillez renseigner le code envoyé par{'\n'}
              SMS au +212 6 65 85 85 85
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center space-x-3 mt-12">
            {otpCode.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-16 text-center text-xl font-semibold bg-white/10 border-2 border-white/30 rounded-xl text-white focus:border-white/60 focus:outline-none transition-colors"
                maxLength={1}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm mb-2">
              Vous n'avez rien reçu ?{' '}
              <button 
                onClick={handleResendCode}
                className="text-white underline"
              >
                Renvoyer le code.
              </button>
            </p>
          </div>
        </div>

        {/* Send Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6">
          <Button
            onClick={handleSubmit}
            className="w-full h-14 text-lg font-medium rounded-full"
            style={{ background: '#87ceeb', color: '#1a3b47' }}
            disabled={otpCode.some(digit => !digit)}
          >
            ENVOYER <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default OTPVerificationPage;
