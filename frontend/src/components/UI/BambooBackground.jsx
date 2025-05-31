import React from 'react';

const BambooBackground = ({ 
  variant = 'forest', 
  opacity = 0.8, 
  animated = true,
  overlay = 'gradient' 
}) => {
  
  const backgroundVariants = {
    forest: {
      primary: '#e8f5e8',
      secondary: '#c8e6c9',
      accent: '#a5d6a7',
      bambooImage: '././assets/images/backgrounds/bamboo-1.jpg'
    },
    misty: {
      primary: '#f1f8e9',
      secondary: '#dcedc8',
      accent: '#c5e1a5',
      bambooImage: '././assets/images/backgrounds/bambo.png'
    },
    sunset: {
      primary: '#fff3e0',
      secondary: '#ffe0b2',
      accent: '#ffcc80',
      bambooImage: '././assets/images/backgrounds/bamboo-1.jpg'
    }
  };

  const colors = backgroundVariants[variant] || backgroundVariants.forest;

  const overlayStyles = {
    gradient: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
    mist: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    none: 'none'
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Base Background with Real Bamboo Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${colors.bambooImage})`,
          opacity: opacity
        }}
      />

      {/* Color Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}80 0%, ${colors.secondary}60 50%, ${colors.accent}40 100%)`
        }}
      />

      {/* Animated Bamboo Stalks */}
      {animated && (
        <>
          {/* Left Side Bamboo */}
          <div className="absolute left-0 top-0 h-full w-32 opacity-30">
            <div 
              className="h-full w-full bg-contain bg-repeat-y bg-left animate-pulse"
              style={{
                backgroundImage: `url(././assets/images/background/bambo.png)`,
                animationDuration: '4s'
              }}
            />
          </div>

          {/* Right Side Bamboo */}
          <div className="absolute right-0 top-0 h-full w-32 opacity-20">
            <div 
              className="h-full w-full bg-contain bg-repeat-y bg-right animate-pulse"
              style={{
                backgroundImage: `url(././assets/images/background/bambo.png)`,
                animationDuration: '6s',
                transform: 'scaleX(-1)'
              }}
            />
          </div>
        </>
      )}

      {/* Floating Bamboo Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute opacity-10 ${animated ? 'animate-bounce' : ''}`}
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          >
            <img 
              src="././assets/images/backgrounds/bambo.png" 
              alt=""
              className="w-16 h-24 object-contain opacity-50"
              style={{
                transform: `rotate(${Math.random() * 30 - 15}deg) scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          </div>
        ))}
      </div>

      {/* Final Overlay */}
      {overlay !== 'none' && (
        <div 
          className="absolute inset-0"
          style={{
            background: overlayStyles[overlay] || overlayStyles.gradient
          }}
        />
      )}
    </div>
  );
};

export default BambooBackground;