import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoImage from '../../assets/images/icons/logo-0.png';
import { 
  Bars3Icon, 
  XMarkIcon,
  BookOpenIcon,
  FilmIcon,
  MusicalNoteIcon,
  PencilSquareIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Trang Chủ', href: '/', icon: HomeIcon },
    { name: 'Văn Học', href: '/books', icon: BookOpenIcon },
    { name: 'Điện Ảnh', href: '/movies', icon: FilmIcon },
    { name: 'Âm Nhạc', href: '/music', icon: MusicalNoteIcon },
    { name: 'Blog', href: '/blog', icon: PencilSquareIcon },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              {/* Logo Image */}
              <div className="relative">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300 shadow-md border-2 border-green-100 group-hover:border-green-200">
                  <img 
                    src={logoImage}
                    alt="Trúc Đình Logo"
                    className="w-12 h-12 lg:w-14 lg:h-14 object-contain transition-all duration-300 scale-150 group-hover:scale-110"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-12 h-12 lg:w-14 lg:h-14 bg-green-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-md"></div>
              </div>
              
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                  Trúc Đình
                </h1>
                <p className="text-xs text-green-600 -mt-1 font-medium">
                  Khách quan xin dừng bước
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-green-50 text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'
                  }`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Search & User */}
          <div className="flex items-center space-x-3">
            
            {/* Search Button */}
            <button
              onClick={() => navigate('/search')}
              className="p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
              aria-label="Tìm kiếm"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>Hồ Sơ</span>
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span>Đăng Xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
                >
                  Đăng Nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Đăng Ký
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-green-100 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-green-600' : 'text-gray-500'
                    }`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;