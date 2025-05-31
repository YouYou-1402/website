import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import { BambooBackground, BambooCursor, BambooLeavesEffect } from '../../components/UI/BambooComponents';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon, IdentificationIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form

  const { register } = useAuth();
  const navigate = useNavigate();

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

    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tên người dùng';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới';
    }

    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    return newErrors;
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.fullName) {
        newErrors.fullName = 'Vui lòng nhập họ tên';
      } else if (formData.fullName.length < 2) {
        newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
      }

      if (!formData.username) {
        newErrors.username = 'Vui lòng nhập tên người dùng';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới';
      }
    }

    if (currentStep === 2) {
      if (!formData.email) {
        newErrors.email = 'Vui lòng nhập email';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }

      if (!formData.password) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep(step);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
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
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        navigate('/login', { 
          state: { 
            message: 'Đăng ký thành công! Vui lòng đăng nhập.' 
          }
        });
      } else {
        setErrors({ general: result.message || 'Đăng ký thất bại' });
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
      <BambooLeavesEffect intensity="light" windDirection="right" />

      {/* Ancient Paper Texture */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-amber-100/30 via-transparent to-green-100/30"></div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-6 bg-green-400/15 rounded-full animate-float"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 5) * 18}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${5 + i * 0.3}s`,
              transform: `rotate(${i * 30}deg)`
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
              <span className="text-3xl text-green-700">🌱</span>
            </div> */}

              <h1 className="text-4xl font-bold text-green-800 mb-2" style={{ fontFamily: '"Ma Shan Zheng", serif' }}>
                竹亭
              </h1>
              <h2 className="text-xl text-green-600 mb-2" style={{ fontFamily: '"Lora", serif' }}>
                Trúc Đình
              </h2>
            {/* <p className="text-green-500 text-sm">
              Tạo tài khoản để bước vào không gian tĩnh lặng
            </p> */}
                    </Link>
          </div>

          {/* Register Card */}
          <Card className="bg-white/40 backdrop-blur-md border-green-200/50 shadow-xl">
            <div className="p-8">
              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-600">Bước {step} / 2</span>
                  <span className="text-sm text-green-500">
                    {step === 1 ? 'Thông tin cá nhân' : 'Tài khoản & Mật khẩu'}
                  </span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(step / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Decorative Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-green-800 mb-2">Đăng Ký</h3>
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

              {/* Multi-step Form */}
              <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
                
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Full Name Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Họ và tên
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IdentificationIcon className="h-5 w-5 text-green-400" />
                        </div>
                        <Input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          className={`pl-10 bg-white/50 backdrop-blur-sm border-green-200 focus:border-green-400 focus:ring-green-400/20 ${errors.fullName ? 'border-red-300 focus:border-red-400' : ''}`}
                          disabled={loading}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Username Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Tên người dùng
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-green-400" />
                        </div>
                        <Input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="username123"
                          className={`pl-10 bg-white/50 backdrop-blur-sm border-green-200 focus:border-green-400 focus:ring-green-400/20 ${errors.username ? 'border-red-300 focus:border-red-400' : ''}`}
                          disabled={loading}
                        />
                      </div>
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                      )}
                      <p className="mt-1 text-xs text-green-500">
                        Chỉ được sử dụng chữ cái, số và dấu gạch dưới (_)
                      </p>
                    </div>

                    {/* Next Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Tiếp theo
                      <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                )}

                {/* Step 2: Account & Password */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-green-400" />
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

                    {/* Confirm Password Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Xác nhận mật khẩu
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LockClosedIcon className="h-5 w-5 text-green-400" />
                        </div>
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className={`pl-10 pr-10 bg-white/50 backdrop-blur-sm border-green-200 focus:border-green-400 focus:ring-green-400/20 ${errors.confirmPassword ? 'border-red-300 focus:border-red-400' : ''}`}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-green-400 hover:text-green-600 transition-colors" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-green-400 hover:text-green-600 transition-colors" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded mt-1"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-green-600">
                        Tôi đồng ý với{' '}
                        <Link to="/terms" className="text-green-700 hover:text-green-800 underline">
                          Điều khoản sử dụng
                        </Link>{' '}
                        và{' '}
                        <Link to="/privacy" className="text-green-700 hover:text-green-800 underline">
                          Chính sách bảo mật
                        </Link>
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-white/70 backdrop-blur-sm border border-green-300 text-green-700 hover:bg-green-50 font-medium py-3 px-4 rounded-lg transition-all duration-300"
                      >
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Quay lại
                      </Button>
                      
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang tạo...
                          </div>
                        ) : (
                          'Tạo tài khoản'
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-green-600">
                  Đã có tài khoản?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>

              {/* Decorative Quote */}
              {/* <div className="mt-8 pt-6 border-t border-green-200/50">
                <blockquote className="text-center text-sm text-green-500 italic">
                  "Thiên hạ nan sự, tất tác ư dị; thiên hạ đại sự, tất tác ư tế"
                </blockquote>
                <p className="text-center text-xs text-green-400 mt-1">
                  Việc khó trên đời phải bắt đầu từ dễ, việc lớn phải bắt đầu từ nhỏ
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
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Register;