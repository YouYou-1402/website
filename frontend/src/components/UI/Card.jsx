import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'p-6'
}) => {
  return (
    <div 
      className={`
        vintage-card 
        ${padding} 
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
