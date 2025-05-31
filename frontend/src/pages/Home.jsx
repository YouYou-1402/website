import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BambooBackground, BambooCursor, BambooLeavesEffect } from './../components/UI/BambooComponents';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: 'Thi Văn Nhã Tập',
      description: 'Thưởng thức những vần thơ bất hủ, cảm nhận vẻ đẹp của ngôn từ',
      icon: '📜',
      href: '/poetry',
      element: '詩'
    },
    {
      title: 'Thư Hương Mặc Vận',
      description: 'Khám phá kho tàng tri thức qua từng trang sách quý',
      icon: '📚',
      href: '/books',
      element: '書'
    },
    {
      title: 'Cầm Vận Du Dương',
      description: 'Lắng nghe những giai điệu thanh tao, tĩnh tâm dưỡng tính',
      icon: '🎵',
      href: '/music',
      element: '樂'
    },
    {
      title: 'Thiền Tâm Ngộ Đạo',
      description: 'Suy tư về cuộc sống, tìm kiếm sự an nhiên trong tâm hồn',
      icon: '🧘',
      href: '/blog',
      element: '禪'
    }
  ];

  const quotes = [
    {
      text: "Hoa sẽ không vì bị bạn lạnh nhạt mà sang năm không nở nữa, nhưng người có thể vì sự bỏ lỡ của bạn mà chớp mắt trở thành người lạ.",
      translation: "Năm tháng tĩnh lặng, kiếp này bình yên",
      author: "Bạch Lạc Mai"
    },
    {
      text: "Tâm ý không phải hành lý, bởi vì không có trọng lượng, cho nên khó nhấc lên, càng khó buông xuống.",
      translation: "Trạch Thiên Ký",
      author: "Miêu nị"
    },
    {
      text: "Ta thích thế giới này, bởi vì có người ở đó.",
      translation: "Cuộc đời này đáng yêu vì có em",
      author: "Vô danh"
    }
  ];

  // Enhanced quote management with 7-second auto-advance
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNextQuote();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentQuote, isPaused]);

  const handleNextQuote = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevQuote = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleQuoteSelect = (index) => {
    if (index === currentQuote) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuote(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-stone-100 via-amber-50 to-green-50">
      {/* Bamboo Components */}
      <BambooBackground variant="ancient" animated={true} />
      <BambooCursor enabled={true} size="medium" />
      <BambooLeavesEffect intensity="light" windDirection="right" />

      {/* Ancient Paper Texture Overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-amber-100/30 via-transparent to-green-100/30"></div>
      
      {/* Subtle Ancient Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="ancientPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
              <path d="M35 35 Q50 25 65 35 Q75 50 65 65 Q50 75 35 65 Q25 50 35 35" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ancientPattern)" className="text-green-700"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            {/* Main Title */}
            <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-7xl md:text-9xl font-bold mb-6 relative">
                <span 
                  className="text-green-800 drop-shadow-lg"
                  style={{ fontFamily: '"Ma Shan Zheng", "Noto Serif CJK SC", serif' }}
                >
                  竹亭
                </span>
              </h1>
              <h2 className="text-4xl md:text-5xl text-green-700 mb-4 drop-shadow-md" style={{ fontFamily: '"Lora", serif' }}>
                Trúc Đình
              </h2>
            </div>

            {/* Subtitle */}
            <div className={`transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* <p className="text-xl md:text-2xl text-green-600 mb-8 leading-relaxed drop-shadow-sm" style={{ fontFamily: '"Lora", serif' }}>
                Nghỉ ngơi một chút
              </p> */}
              <p className="text-lg text-green-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                Dù là từ bỏ hay kiên trì, cũng đều cần dũng khí
              </p>
            </div>

            {/* Decorative Element */}
            <div className={`transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex justify-center items-center mb-12">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                <div className="mx-4 text-2xl text-green-500">❋</div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to="/blog" 
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-green-800 bg-white/70 backdrop-blur-sm border-2 border-green-300 rounded-full hover:bg-amber-50/80 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Khám phá bài viết</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/30 to-yellow-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  to="/about" 
                  className="group inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-green-700 bg-transparent border-2 border-green-200 rounded-full hover:border-green-300 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
                >
                  <span>Về Trúc Đình</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6" style={{ fontFamily: '"Lora", serif' }}>
                Khám Phá Không Gian
              </h2>
              <p className="text-xl text-green-600 max-w-2xl mx-auto leading-relaxed">
                Mỗi góc của Trúc Đình đều mang trong mình một câu chuyện, một cảm xúc riêng biệt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.href}
                  className="group relative bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-green-200/50 hover:bg-white/60 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                >
                  {/* Chinese Character Background */}
                  <div className="absolute top-4 right-4 text-6xl text-green-100 font-bold opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    {feature.element}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-green-800 mb-3 group-hover:text-green-900 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-green-600 leading-relaxed group-hover:text-green-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100/20 to-green-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

        {/* Enhanced Quote Section */}
        <section className="py-20 bg-gradient-to-r from-green-50/30 via-white/20 to-green-50/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div 
              className="relative bg-white/30 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-green-200/50 overflow-hidden group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-float"
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${20 + (i % 3) * 30}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + i * 0.5}s`
                    }}
                  />
                ))}
              </div>

              {/* Decorative corners with glow effect */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-400/60 rounded-tl-lg transition-all duration-500 group-hover:border-green-500/80 group-hover:shadow-lg group-hover:shadow-green-400/20"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-green-400/60 rounded-tr-lg transition-all duration-500 group-hover:border-green-500/80 group-hover:shadow-lg group-hover:shadow-green-400/20"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-400/60 rounded-bl-lg transition-all duration-500 group-hover:border-green-500/80 group-hover:shadow-lg group-hover:shadow-green-400/20"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-400/60 rounded-br-lg transition-all duration-500 group-hover:border-green-500/80 group-hover:shadow-lg group-hover:shadow-green-400/20"></div>
              
              {/* Navigation arrows */}
              <button
                onClick={handlePrevQuote}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn opacity-0 group-hover:opacity-100"
                aria-label="Previous quote"
              >
                <svg className="w-5 h-5 text-green-600 group-hover/btn:text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNextQuote}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn opacity-0 group-hover:opacity-100"
                aria-label="Next quote"
              >
                <svg className="w-5 h-5 text-green-600 group-hover/btn:text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Quote content with enhanced animations */}
              <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 transform scale-95 blur-sm' : 'opacity-100 transform scale-100 blur-0'}`}>
                {/* Large decorative quotes */}
                <div className="absolute top-8 left-8 text-6xl text-green-200/40 font-serif leading-none select-none">"</div>
                <div className="absolute bottom-8 right-8 text-6xl text-green-200/40 font-serif leading-none select-none rotate-180">"</div>
                
                {/* Quote text with typewriter effect */}
                <blockquote className="relative text-2xl md:text-3xl text-green-800 mb-6 leading-relaxed drop-shadow-sm z-10" style={{ fontFamily: '"Lora", serif' }}>
                  <span className="inline-block animate-fade-in-up">
                    "{quotes[currentQuote]?.text}"
                  </span>
                </blockquote>
                
                {/* Translation with slide effect */}
                <p className="text-lg md:text-xl text-green-600 mb-6 italic transform transition-all duration-700 delay-200">
                  <span className="inline-block animate-fade-in-up animation-delay-200">
                    {quotes[currentQuote]?.translation}
                  </span>
                </p>
                
                {/* Author with elegant entrance */}
                <cite className="text-green-500 font-medium transform transition-all duration-700 delay-400">
                  <span className="inline-block animate-fade-in-up animation-delay-400">
                    — {quotes[currentQuote]?.author}
                  </span>
                </cite>
              </div>

              {/* Enhanced quote indicators with progress */}
              <div className="flex justify-center mt-8 space-x-3">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuoteSelect(index)}
                    className={`relative overflow-hidden rounded-full transition-all duration-500 hover:scale-125 group/indicator ${
                      index === currentQuote 
                        ? 'w-12 h-3 bg-gradient-to-r from-green-400 to-green-600 shadow-lg' 
                        : 'w-3 h-3 bg-green-300 hover:bg-green-400'
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  >
                    {/* Progress bar for current quote */}
                    {index === currentQuote && !isPaused && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 animate-progress-bar origin-left"></div>
                    )}
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/indicator:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>

              {/* Pause indicator */}
              {isPaused && (
                <div className="absolute top-6 right-6 flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Paused</span>
                </div>
              )}
            </div>
          </div>
        </section>



      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }
        
        @keyframes progress-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-progress-bar {
          animation: progress-bar 5s linear;
        }
      `}</style>
    </div>
  );
};

export default Home;