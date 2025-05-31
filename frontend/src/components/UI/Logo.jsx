import React from 'react';
import logoImage from '../../assets/images/icons/logo-0.png';

const Logo = ({ 
  size = 'medium',
  variant = 'default',
  clickable = true,
  showText = true,
  className = '',
  onClick,
  href = '/'
}) => {
  
  // Cấu hình kích thước
  const sizeConfig = {
    small: {
      image: 'w-8 h-8',
      text: 'text-sm',
      container: 'gap-2'
    },
    medium: {
      image: 'w-12 h-12',
      text: 'text-lg',
      container: 'gap-3'
    },
    large: {
      image: 'w-16 h-16',
      text: 'text-xl',
      container: 'gap-4'
    },
    xlarge: {
      image: 'w-20 h-20',
      text: 'text-2xl',
      container: 'gap-5'
    }
  };

  // Cấu hình variant
  const variantConfig = {
    default: {
      container: 'text-gray-800 hover:text-green-600',
      image: 'filter-none hover:brightness-110',
      text: 'font-bold'
    },
    white: {
      container: 'text-white hover:text-green-200',
      image: 'brightness-0 invert hover:brightness-110',
      text: 'font-bold'
    },
    green: {
      container: 'text-green-600 hover:text-green-700',
      image: 'filter-none hover:brightness-110 hover:saturate-150',
      text: 'font-bold'
    },
    minimal: {
      container: 'text-gray-600 hover:text-gray-800',
      image: 'opacity-80 hover:opacity-100',
      text: 'font-medium'
    }
  };

  const sizeClasses = sizeConfig[size] || sizeConfig.medium;
  const variantClasses = variantConfig[variant] || variantConfig.default;

  // Component chính
  const LogoContent = () => (
    <div className={`flex items-center ${sizeClasses.container} ${variantClasses.container} ${className}`}>
      {/* Logo Image */}
      <div className="relative">
        <img 
          src={logoImage}
          alt="Logo"
          className={`${sizeClasses.image} ${variantClasses.image} object-contain transition-all duration-300 ease-in-out`}
        />
        
        {/* Hiệu ứng glow khi hover */}
        <div className="absolute inset-0 bg-green-400 opacity-0 hover:opacity-20 rounded-full blur-md transition-opacity duration-300"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizeClasses.text} ${variantClasses.text} leading-tight transition-colors duration-300`}>
            VietCulture
          </span>
          {size !== 'small' && (
            <span className="text-xs text-gray-500 font-normal">
              Văn hóa Việt Nam
            </span>
          )}
        </div>
      )}
    </div>
  );

  // Nếu có onClick handler
  if (onClick && clickable) {
    return (
      <button
        onClick={onClick}
        className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg p-1 transition-all duration-200 hover:scale-105 active:scale-95"
        type="button"
      >
        <LogoContent />
      </button>
    );
  }

  // Nếu có href (link)
  if (href && clickable) {
    return (
      <a
        href={href}
        className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg p-1 transition-all duration-200 hover:scale-105 active:scale-95 no-underline"
      >
        <LogoContent />
      </a>
    );
  }

  // Chỉ hiển thị logo
  return <LogoContent />;
};

// Logo variants cho các trường hợp sử dụng khác nhau
const LogoIcon = ({ size = 'medium', className = '', onClick }) => (
  <Logo 
    size={size}
    showText={false}
    className={className}
    onClick={onClick}
  />
);

const LogoText = ({ size = 'medium', variant = 'default', className = '' }) => (
  <div className={`flex flex-col ${className}`}>
    <span className={`font-bold ${
      size === 'small' ? 'text-sm' : 
      size === 'large' ? 'text-xl' : 
      size === 'xlarge' ? 'text-2xl' : 'text-lg'
    } ${
      variant === 'white' ? 'text-white' :
      variant === 'green' ? 'text-green-600' :
      variant === 'minimal' ? 'text-gray-600' : 'text-gray-800'
    }`}>
      VietCulture
    </span>
    {size !== 'small' && (
      <span className="text-xs text-gray-500 font-normal">
        Văn hóa Việt Nam
      </span>
    )}
  </div>
);

// Logo với animation
const AnimatedLogo = ({ 
  size = 'medium', 
  variant = 'default',
  animation = 'pulse',
  className = ''
}) => {
  const animationClasses = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    ping: 'animate-ping',
    float: 'hover:animate-bounce',
    glow: 'hover:drop-shadow-lg hover:filter hover:brightness-110'
  };

  return (
    <div className={`${animationClasses[animation]} ${className}`}>
      <Logo size={size} variant={variant} clickable={false} />
    </div>
  );
};

// Logo cho header/navbar
const HeaderLogo = ({ variant = 'default', onClick, href = '/' }) => (
  <Logo 
    size="medium"
    variant={variant}
    onClick={onClick}
    href={href}
    className="transition-transform duration-200 hover:scale-105"
  />
);

// Logo cho footer
const FooterLogo = ({ variant = 'white' }) => (
  <Logo 
    size="large"
    variant={variant}
    clickable={false}
    className="mb-4"
  />
);

// Logo loading state
const LoadingLogo = ({ size = 'large' }) => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin">
      <LogoIcon size={size} />
    </div>
    <div className="ml-3">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </div>
);

export default Logo;
export { 
  LogoIcon, 
  LogoText, 
  AnimatedLogo, 
  HeaderLogo, 
  FooterLogo, 
  LoadingLogo 
};