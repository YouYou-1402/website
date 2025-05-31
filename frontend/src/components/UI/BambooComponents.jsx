import React from 'react';

// Import hình ảnh
import bamboLeafPng from '../../assets/images/icons/bambo-leaf.png';
import bamboPng from '../../assets/images/backgrounds/bambo.png';
import bamboo1Jpg from '../../assets/images/backgrounds/bamboo-1.jpg';

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
      bambooImage: bamboo1Jpg
    },
    misty: {
      primary: '#f1f8e9',
      secondary: '#dcedc8',
      accent: '#c5e1a5',
      bambooImage: bamboPng
    },
    sunset: {
      primary: '#fff3e0',
      secondary: '#ffe0b2',
      accent: '#ffcc80',
      bambooImage: bamboo1Jpg
    },
    ancient: {
      primary: '#f5f5dc',
      secondary: '#f0e68c',
      accent: '#daa520',
      bambooImage: bamboo1Jpg
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
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${colors.bambooImage})`,
          opacity: opacity
        }}
      />

      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}80 0%, ${colors.secondary}60 50%, ${colors.accent}40 100%)`
        }}
      />

      {animated && (
        <>
          <div className="absolute left-0 top-0 h-full w-32 opacity-30">
            <div 
              className="h-full w-full bg-contain bg-repeat-y bg-left animate-pulse"
              style={{
                backgroundImage: `url(${bamboPng})`,
                animationDuration: '4s'
              }}
            />
          </div>

          <div className="absolute right-0 top-0 h-full w-32 opacity-20">
            <div 
              className="h-full w-full bg-contain bg-repeat-y bg-right animate-pulse"
              style={{
                backgroundImage: `url(${bamboPng})`,
                animationDuration: '6s',
                transform: 'scaleX(-1)'
              }}
            />
          </div>
        </>
      )}

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
              src={bamboPng}
              alt=""
              className="w-16 h-24 object-contain opacity-50"
              style={{
                transform: `rotate(${Math.random() * 30 - 15}deg) scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          </div>
        ))}
      </div>

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

const BambooCursor = ({ enabled = true, size = 'medium' }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [isClicking, setIsClicking] = React.useState(false);

  const sizeConfig = {
    small: { width: 20, height: 28 },
    medium: { width: 24, height: 32 },
    large: { width: 28, height: 36 }
  };

  const cursorSize = sizeConfig[size] || sizeConfig.medium;

  React.useEffect(() => {
    if (!enabled) return;

    const updateMousePosition = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (!e.target || typeof e.target.matches !== 'function') {
        return;
      }

      try {
        const isInteractive = e.target.matches('button, a, input, textarea, select, [role="button"], [data-interactive]') ||
                             (e.target.closest && e.target.closest('button, a, input, textarea, select, [role="button"], [data-interactive]'));
        setIsHovering(!!isInteractive);
      } catch (error) {
        console.warn('BambooCursor: Error in mouseover:', error);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePos.x - cursorSize.width / 2,
          top: mousePos.y - cursorSize.height / 2,
          transform: `scale(${isClicking ? 0.8 : isHovering ? 1.2 : 1}) rotate(${isHovering ? '15deg' : '0deg'})`,
          filter: isHovering ? 'brightness(1.2) saturate(1.3)' : 'none'
        }}
      >
        <img 
          src={bamboLeafPng}
          alt=""
          style={{
            width: cursorSize.width,
            height: cursorSize.height,
            objectFit: 'contain'
          }}
          className="drop-shadow-md"
        />
      </div>

      <div
        className="fixed pointer-events-none z-40 transition-all duration-300 ease-out opacity-30"
        style={{
          left: mousePos.x - cursorSize.width / 3,
          top: mousePos.y - cursorSize.height / 3,
          transform: `scale(0.6) rotate(-10deg)`,
          transitionDelay: '50ms'
        }}
      >
        <img 
          src={bamboLeafPng}
          alt=""
          style={{
            width: cursorSize.width * 0.8,
            height: cursorSize.height * 0.8,
            objectFit: 'contain'
          }}
          className="drop-shadow-sm"
        />
      </div>

      {isClicking && (
        <div
          className="fixed pointer-events-none z-45 animate-ping"
          style={{
            left: mousePos.x - 10,
            top: mousePos.y - 10,
          }}
        >
          <div className="w-5 h-5 bg-green-400 rounded-full opacity-75"></div>
        </div>
      )}

      {isHovering && (
        <div
          className="fixed pointer-events-none z-45 animate-pulse"
          style={{
            left: mousePos.x - 15,
            top: mousePos.y - 15,
          }}
        >
          <div className="w-8 h-8 border-2 border-green-400 rounded-full opacity-50"></div>
        </div>
      )}
    </>
  );
};

// BambooLeavesEffect - ULTRA SMOOTH VERSION
const BambooLeavesEffect = ({ intensity = 'medium', windDirection = 'right', enabled = true }) => {
  const [leaves, setLeaves] = React.useState([]);
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });
  const animationRef = React.useRef();
  const lastTimeRef = React.useRef(0);

  // Tăng số lượng lá đáng kể
  const intensityConfig = {
    light: { maxLeaves: 20, spawnRate: 1500 },
    medium: { maxLeaves: 35, spawnRate: 800 },
    heavy: { maxLeaves: 50, spawnRate: 500 }
  };

  const config = intensityConfig[intensity] || intensityConfig.medium;

  // Lấy kích thước window
  React.useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // Tạo lá mới với tần suất cao hơn
  React.useEffect(() => {
    if (!enabled || windowSize.width === 0) return;

    const createLeaf = () => {
      const newLeaf = {
        id: Date.now() + Math.random(),
        x: -50 + Math.random() * (windowSize.width + 100), // Spawn từ rộng hơn
        y: -100 - Math.random() * 200, // Spawn cao hơn
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.8, // Tăng kích thước 30-40%
        speed: 0.3 + Math.random() * 1.2, // Tốc độ rơi chậm hơn
        opacity: 0.4 + Math.random() * 0.5,
        swayAmount: 15 + Math.random() * 25,
        swaySpeed: 0.01 + Math.random() * 0.02, // Chậm hơn để mượt
        rotationSpeed: 0.5 + Math.random() * 1.5,
        windResistance: 0.3 + Math.random() * 0.4,
        time: 0 // Thời gian sống
      };

      setLeaves(prev => {
        if (prev.length >= config.maxLeaves) {
          return prev;
        }
        return [...prev, newLeaf];
      });
    };

    const interval = setInterval(createLeaf, config.spawnRate);
    return () => clearInterval(interval);
  }, [enabled, windowSize, config.maxLeaves, config.spawnRate]);

  // Animation mượt mà với requestAnimationFrame
  React.useEffect(() => {
    if (!enabled) return;

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      setLeaves(prevLeaves => {
        return prevLeaves
          .map(leaf => {
            // Tăng thời gian sống
            const newTime = leaf.time + deltaTime * 0.001;
            
            // Tính toán chuyển động mượt mà
            const swayX = Math.sin(newTime * leaf.swaySpeed * 10) * leaf.swayAmount;
            const swayY = Math.cos(newTime * leaf.swaySpeed * 8) * 2; // Thêm dao động Y nhẹ
            
            // Gió ảnh hưởng
            const windForce = windDirection === 'right' ? 0.3 : -0.3;
            const windEffect = windForce * leaf.windResistance;
            
            // Rotation mượt mà
            const rotationDelta = leaf.rotationSpeed * (deltaTime * 0.1);

            return {
              ...leaf,
              time: newTime,
              y: leaf.y + leaf.speed * (deltaTime * 0.1),
              x: leaf.x + windEffect + swayX * 0.05,
              rotation: leaf.rotation + rotationDelta
            };
          })
          .filter(leaf => 
            leaf.y < windowSize.height + 150 && 
            leaf.x > -150 && 
            leaf.x < windowSize.width + 150
          );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, windowSize, windDirection]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute will-change-transform" // Tối ưu GPU
          style={{
            left: leaf.x,
            top: leaf.y,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            opacity: leaf.opacity,
            transition: 'none',
            backfaceVisibility: 'hidden', // Tối ưu rendering
            perspective: '1000px'
          }}
        >
          <img
            src={bamboLeafPng}
            alt=""
            className="w-8 h-11 object-contain drop-shadow-sm" // Tăng kích thước từ w-6 h-8 lên w-8 h-11 (33% increase)
            style={{ 
              filter: 'sepia(20%) saturate(80%) hue-rotate(60deg)',
              imageRendering: 'auto',
              willChange: 'transform'
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Enhanced Test Component
const BambooLeavesTest = () => {
  const [intensity, setIntensity] = React.useState('medium');
  const [enabled, setEnabled] = React.useState(true);
  const [windDirection, setWindDirection] = React.useState('right');

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm">
      <h3 className="font-bold mb-3 text-green-800">🎋 Bamboo Leaves Control</h3>
      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Enable Leaves Effect</span>
        </label>
        
        <div>
          <label className="block text-sm font-medium mb-1">Intensity:</label>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="light">Light (20 leaves)</option>
            <option value="medium">Medium (35 leaves)</option>
            <option value="heavy">Heavy (50 leaves)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Wind Direction:</label>
          <select
            value={windDirection}
            onChange={(e) => setWindDirection(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="right">Right →</option>
            <option value="left">Left ←</option>
          </select>
        </div>

        <div className="text-xs text-gray-600 mt-2">
          Leaves size: +35% | Smooth animation with RAF
        </div>
      </div>
      
      <BambooLeavesEffect 
        intensity={intensity} 
        enabled={enabled} 
        windDirection={windDirection}
      />
    </div>
  );
};

export { BambooBackground, BambooCursor, BambooLeavesEffect, BambooLeavesTest };