import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import Header from '../../components/common/Header';
import FileUploadZone from '../../components/common/FileUploadZone';
import SpinningDots from '../../components/common/SpinningDots';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface FileUploadState {
  companyRegistration: File | null;
  bankStatements: {
    january: File | null;
    february: File | null;
    march: File | null;
  };
  ribNumber: string;
  uploadProgress: Record<string, number>;
}

type UploadState = 'idle' | 'uploading' | 'processing' | 'analyzing' | 'success' | 'error';

const DocumentUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadState>({
    companyRegistration: null,
    bankStatements: { january: null, february: null, march: null },
    ribNumber: '012 - 345 - 1300005800018000 - 67',
    uploadProgress: {}
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simulate existing uploads for demo
  useEffect(() => {
    // Pre-populate with uploaded files as shown in mockup
    setUploadedFiles(prev => ({
      ...prev,
      companyRegistration: new File([''], 'RC.pdf', { type: 'application/pdf' }),
      bankStatements: {
        january: new File([''], 'releve-janvier.pdf', { type: 'application/pdf' }),
        february: new File([''], 'releve-fevrier.pdf', { type: 'application/pdf' }),
        march: new File([''], 'releve-mars.pdf', { type: 'application/pdf' })
      },
      uploadProgress: {
        companyRegistration: 100,
        january: 100,
        february: 100,
        march: 100
      }
    }));
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.size > 10 * 1024 * 1024) {
      return 'Le fichier ne doit pas dépasser 10MB';
    }
    
    if (!file.type.includes('pdf')) {
      return 'Seuls les fichiers PDF sont acceptés';
    }
    
    return null;
  };

  const validateRIB = (rib: string): boolean => {
    const ribPattern = /^\d{3}\s*-\s*\d{3}\s*-\s*\d{16}\s*-\s*\d{2}$/;
    return ribPattern.test(rib);
  };

  const simulateUpload = (file: File, documentType: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadedFiles(prev => ({
          ...prev,
          uploadProgress: {
            ...prev.uploadProgress,
            [documentType]: progress
          }
        }));
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  const handleFileUpload = async (file: File, documentType: 'companyRegistration' | 'january' | 'february' | 'march') => {
    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({ ...prev, [documentType]: error }));
      return;
    }

    setErrors(prev => ({ ...prev, [documentType]: '' }));
    
    if (documentType === 'companyRegistration') {
      setUploadedFiles(prev => ({ ...prev, companyRegistration: file }));
    } else {
      setUploadedFiles(prev => ({
        ...prev,
        bankStatements: {
          ...prev.bankStatements,
          [documentType]: file
        }
      }));
    }

    await simulateUpload(file, documentType);
  };

  const isFormComplete = (): boolean => {
    return !!(
      uploadedFiles.companyRegistration &&
      uploadedFiles.bankStatements.january &&
      uploadedFiles.bankStatements.february &&
      uploadedFiles.bankStatements.march &&
      uploadedFiles.ribNumber &&
      validateRIB(uploadedFiles.ribNumber) &&
      uploadedFiles.uploadProgress.companyRegistration === 100 &&
      uploadedFiles.uploadProgress.january === 100 &&
      uploadedFiles.uploadProgress.february === 100 &&
      uploadedFiles.uploadProgress.march === 100
    );
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) return;
    
    setUploadState('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      setUploadState('analyzing');
    }, 2000);

    setTimeout(() => {
      setUploadState('success');
    }, 4000);

    setTimeout(() => {
      navigate('/kyc/document-type');
    }, 6000);
  };

  // Render different states
  if (uploadState === 'processing') {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#1a3b47' }}>
          <div className="text-center px-6">
            <div className="mb-8">
              <SpinningDots />
            </div>
            <h1 className="text-white text-xl font-medium">
              Vérification des documents...
            </h1>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (uploadState === 'analyzing') {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#1a3b47' }}>
          <div className="text-center px-6">
            <div className="mb-8">
              <SpinningDots />
            </div>
            <h1 className="text-white text-xl font-medium">
              Nous analysons votre dossier...
            </h1>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (uploadState === 'success') {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#1a3b47' }}>
          <div className="text-center px-6">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-white" />
              </div>
              <h1 className="text-white text-2xl font-medium leading-relaxed">
                Identité vérifiée{'\n'}
                avec succès !
              </h1>
            </div>
            <Button
              className="w-full max-w-sm h-14 text-lg font-medium rounded-full"
              style={{ background: '#87ceeb', color: '#1a3b47' }}
            >
              CONTINUER
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen" style={{ background: '#1a3b47' }}>
        <Header 
          title="Téléchargez vos documents." 
          showBackButton 
          onBack={() => navigate('/dashboard')}
          darkMode={true}
        />
        
        <div className="p-6 space-y-8 pb-24">
          {/* Commerce Registry */}
          <div>
            <h2 className="text-white text-lg font-medium mb-4">
              Registre de Commerce (Modèle J)
            </h2>
            <FileUploadZone
              label="Registre de Commerce"
              accept=".pdf"
              onFileSelect={(file) => handleFileUpload(file, 'companyRegistration')}
              uploadProgress={uploadedFiles.uploadProgress.companyRegistration}
              uploadedFile={uploadedFiles.companyRegistration}
              required={true}
              error={errors.companyRegistration}
            />
          </div>

          {/* Bank Statements */}
          <div>
            <h2 className="text-white text-lg font-medium mb-4">
              Relevés bancaires
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: 'january' as const, label: 'janvier 2025' },
                { key: 'february' as const, label: 'février 2025' },
                { key: 'march' as const, label: 'mars 2025' }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <FileUploadZone
                    label={item.label}
                    accept=".pdf"
                    onFileSelect={(file) => handleFileUpload(file, item.key)}
                    uploadProgress={uploadedFiles.uploadProgress[item.key]}
                    uploadedFile={uploadedFiles.bankStatements[item.key]}
                    required={true}
                    error={errors[item.key]}
                    className="h-32"
                  />
                  <p className="text-gray-300 text-xs text-center">{item.label}</p>
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
                value={uploadedFiles.ribNumber}
                onChange={(e) => setUploadedFiles(prev => ({ 
                  ...prev, 
                  ribNumber: e.target.value 
                }))}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 h-14 text-lg"
                placeholder="000 - 000 - 0000000000000000 - 00"
                maxLength={34}
              />
              {uploadedFiles.ribNumber && !validateRIB(uploadedFiles.ribNumber) && (
                <p className="text-red-400 text-sm">Format RIB invalide</p>
              )}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6">
          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete() || uploadState === 'processing'}
            className="w-full h-14 text-lg font-medium rounded-full disabled:opacity-50"
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
