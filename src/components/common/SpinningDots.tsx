
import React from 'react';

const SpinningDots: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="absolute w-3 h-3 rounded-full animate-pulse"
            style={{
              background: index < 4 ? '#87ceeb' : 'rgba(135, 206, 235, 0.4)',
              left: '50%',
              top: '50%',
              transformOrigin: '6px 32px',
              transform: `translateX(-50%) translateY(-50%) rotate(${index * 45}deg)`,
              animationDelay: `${index * 0.15}s`,
              animationDuration: '1.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpinningDots;
