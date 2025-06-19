
import React, { useRef, useState } from 'react';
import { Upload, FileText, X, Check } from 'lucide-react';

interface FileUploadZoneProps {
  label: string;
  accept?: string;
  onFileSelect: (file: File) => void;
  uploadProgress?: number;
  uploadedFile?: File | null;
  required?: boolean;
  error?: string;
  className?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  label,
  accept = '.pdf',
  onFileSelect,
  uploadProgress = 0,
  uploadedFile,
  required = false,
  error,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const isUploaded = uploadedFile && uploadProgress === 100;
  const isUploading = uploadProgress > 0 && uploadProgress < 100;

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          rounded-2xl p-6 border-2 border-dashed cursor-pointer transition-all duration-200
          ${isDragOver 
            ? 'border-white/50 bg-white/10' 
            : 'border-white/30 bg-white/5'
          }
          ${error ? 'border-red-400 bg-red-400/10' : ''}
          ${isUploaded ? 'border-green-400 bg-green-400/10' : ''}
        `}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {isUploaded ? (
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={24} className="text-white" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                {uploadedFile ? (
                  <FileText size={24} className="text-white" />
                ) : (
                  <Upload size={24} className="text-white" />
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            {uploadedFile ? (
              <>
                <p className="text-white text-sm mb-2">{uploadedFile.name}</p>
                {isUploading && (
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-1">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        background: '#87ceeb',
                        width: `${uploadProgress}%` 
                      }}
                    />
                  </div>
                )}
                <p className="text-white text-xs">{uploadProgress}%</p>
              </>
            ) : (
              <>
                <p className="text-white text-sm mb-1">{label}</p>
                <p className="text-white/60 text-xs">Cliquez ou glissez pour télécharger</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default FileUploadZone;
