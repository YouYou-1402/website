import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import { BambooBackground, BambooCursor, BambooLeavesEffect } from '../../components/UI/BambooComponents';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ general: result.message || 'Đăng nhập thất bại' });
      }
    } catch (error) {
      setErrors({ general: 'Có lỗi xảy ra, vui lòng thử lại' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-green-50">
      {/* Bamboo Components */}
      <BambooBackground variant="ancient" animated={true} />
      <BambooCursor enabled={true} size="small" />
      <BambooLeavesEffect intensity="light" windDirection="left" />

      {/* Ancient Paper Texture */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-amber-100/30 via-transparent to-green-100/30"></div>

      {/* Floating Bamboo Leaves */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-8 bg-green-400/20 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
              transform: `rotate(${i * 45}deg)`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
        <div className={`w-full max-w-md transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Header Section */}
          <div className="text-center mb-8">
                        <Link 
                            to="/" 
                            className="inline-block group cursor-pointer transition-all duration-300 hover:scale-105"
                          >
            {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-white/30 backdrop-blur-md rounded-full mb-6 shadow-lg border border-green-200/50">
              <span className="text-3xl text-green-700">🎋</span>
            </div> */}
            
            <h1 className="text-4xl font-bold text-green-800 mb-2" style={{ fontFamily: '"Ma Shan Zheng", serif' }}>
              竹亭
            </h1>
            <h2 className="text-xl text-green-600 mb-2" style={{ fontFamily: '"Lora", serif' }}>
              Trúc Đình
            </h2>
            {/* <p className="text-green-500 text-sm">
              Chào mừng trở lại không gian tĩnh lặng
            </p> */}
            </Link>
          </div>

          {/* Login Card */}
          <Card className="bg-white/40 backdrop-blur-md border-green-200/50 shadow-xl">
            <div className="p-8">
              {/* Decorative Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-green-800 mb-2">Đăng Nhập</h3>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                  <div className="mx-3 text-green-400">❋</div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                </div>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-700 text-sm">{errors.general}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`pl-10 bg-white/50 backdrop-blur-sm border-green-200 focus:border-green-400 focus:ring-green-400/20 ${errors.email ? 'border-red-300 focus:border-red-400' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`pl-10 pr-10 bg-white/50 backdrop-blur-sm border-green-200 focus:border-green-400 focus:ring-green-400/20 ${errors.password ? 'border-red-300 focus:border-red-400' : ''}`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-green-400 hover:text-green-600 transition-colors" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-green-400 hover:text-green-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-green-600">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang đăng nhập...
                    </div>
                  ) : (
                    'Vào Trúc Đình'
                  )}
                </Button>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-green-600">
                  Chưa có tài khoản?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>

              {/* Decorative Quote
              <div className="mt-8 pt-6 border-t border-green-200/50">
                <blockquote className="text-center text-sm text-green-500 italic">
                  "Tâm tĩnh tự nhiên lương, thủy thanh tự nhiên trong"
                </blockquote>
                <p className="text-center text-xs text-green-400 mt-1">
                  Tâm tĩnh thì tự nhiên mát mẻ, nước trong thì tự nhiên sạch
                </p>
              </div> */}
            </div>
          </Card>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;