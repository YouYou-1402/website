import React, { useEffect, useState } from 'react';

const BambooLeavesEffect = ({ intensity = 'medium', windDirection = 'right' }) => {
  const [leaves, setLeaves] = useState([]);

  // Cấu hình theo cường độ
  const intensityConfig = {
    light: { maxLeaves: 12, spawnRate: 4000, windStrength: 0.3 },
    medium: { maxLeaves: 20, spawnRate: 2500, windStrength: 0.5 },
    heavy: { maxLeaves: 35, spawnRate: 1800, windStrength: 0.8 }
  };

  const config = intensityConfig[intensity] || intensityConfig.medium;

  // Danh sách hình ảnh lá tre thực
  const leafImages = [
    '././assets/images/icons/bambo-leaf.png',
    '././assets/images/icons/bamboo-leaf.jpg'
  ];

  useEffect(() => {
    const createLeaf = () => {
      const leafImage = leafImages[Math.floor(Math.random() * leafImages.length)];
      
      const newLeaf = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.7,
        speed: 1 + Math.random() * 2,
        swayAmplitude: 20 + Math.random() * 30,
        swayFrequency: 0.02 + Math.random() * 0.03,
        opacity: 0.4 + Math.random() * 0.6,
        windResistance: Math.random(),
        image: leafImage,
        rotationSpeed: (Math.random() - 0.5) * 4
      };

      setLeaves(prev => {
        const filtered = prev.filter(leaf => leaf.y < window.innerHeight + 100);
        if (filtered.length >= config.maxLeaves) {
          return [...filtered.slice(1), newLeaf];
        }
        return [...filtered, newLeaf];
      });
    };

    const interval = setInterval(createLeaf, config.spawnRate);
    return () => clearInterval(interval);
  }, [config.maxLeaves, config.spawnRate]);

  useEffect(() => {
    const animateLeaves = () => {
      setLeaves(prevLeaves => 
        prevLeaves.map(leaf => {
          const windEffect = windDirection === 'right' ? 
            config.windStrength * leaf.windResistance : 
            -config.windStrength * leaf.windResistance;

          const sway = Math.sin(leaf.y * leaf.swayFrequency) * leaf.swayAmplitude;
          
          return {
            ...leaf,
            y: leaf.y + leaf.speed,
            x: leaf.x + windEffect + sway * 0.1,
            rotation: leaf.rotation + leaf.rotationSpeed
          };
        }).filter(leaf => leaf.y < window.innerHeight + 100 && leaf.x > -100 && leaf.x < window.innerWidth + 100)
      );
    };

    const animationFrame = setInterval(animateLeaves, 50);
    return () => clearInterval(animationFrame);
  }, [config.windStrength, windDirection]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute transition-transform duration-100 ease-linear"
          style={{
            left: `${leaf.x}px`,
            top: `${leaf.y}px`,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            opacity: leaf.opacity
          }}
        >
          <img 
            src={leaf.image}
            alt=""
            className="w-8 h-12 object-contain drop-shadow-sm"
            style={{
              filter: `hue-rotate(${Math.random() * 30 - 15}deg) brightness(${0.8 + Math.random() * 0.4})`
            }}
          />
        </div>
      ))}

      {/* Gió nhẹ effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent animate-pulse"
            style={{
              top: `${20 + i * 30}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '8s'
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-green-300 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BambooLeavesEffect;