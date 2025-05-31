import React, { useEffect, useState } from 'react';

const BambooCursor = ({ enabled = true, size = 'medium' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const sizeConfig = {
    small: { width: 20, height: 28 },
    medium: { width: 24, height: 32 },
    large: { width: 28, height: 36 }
  };

  const cursorSize = sizeConfig[size] || sizeConfig.medium;

  useEffect(() => {
    if (!enabled) return;

    const updateMousePosition = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const isInteractive = e.target.closest('button, a, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractive);
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

    // Event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Main Cursor - Bamboo Leaf */}
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
          src="././assets/images/icons/bambo-leaf.png" 
          alt=""
          style={{
            width: cursorSize.width,
            height: cursorSize.height,
            objectFit: 'contain'
          }}
          className="drop-shadow-md"
        />
      </div>

      {/* Trail Effect */}
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
          src="././assets/images/icons/bamboo-leaf.jpg" 
          alt=""
          style={{
            width: cursorSize.width * 0.8,
            height: cursorSize.height * 0.8,
            objectFit: 'contain'
          }}
          className="drop-shadow-sm"
        />
      </div>

      {/* Click Effect */}
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

      {/* Hover Ring Effect */}
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

export default BambooCursor;