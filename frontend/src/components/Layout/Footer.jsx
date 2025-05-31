import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon,
  HeartIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  FilmIcon,
  MusicalNoteIcon,
  PencilSquareIcon,
  UserGroupIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import logoImage from '../../assets/images/icons/logo-0.png';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Văn Học', href: '/books', icon: BookOpenIcon },
      { name: 'Điện Ảnh', href: '/movies', icon: FilmIcon },
      { name: 'Âm Nhạc', href: '/music', icon: MusicalNoteIcon },
      { name: 'Blog', href: '/blog', icon: PencilSquareIcon },
    ],
    company: [
      { name: 'Giới Thiệu', href: '/gioi-thieu', icon: InformationCircleIcon },
      { name: 'Liên Hệ', href: '/lien-he', icon: EnvelopeIcon },
      { name: 'Chính Sách Bảo Mật', href: '/chinh-sach', icon: ShieldCheckIcon },
      { name: 'Điều Khoản Sử Dụng', href: '/dieu-khoan', icon: DocumentTextIcon },
    ],
    connect: [
      { name: 'Đăng Ký Nhận Tin', href: '/newsletter', icon: EnvelopeIcon },
      { name: 'Cộng Đồng', href: '/cong-dong', icon: UserGroupIcon },
      { name: 'Hỗ Trợ', href: '/ho-tro', icon: HeartIcon },
      { name: 'Câu Hỏi Thường Gặp', href: '/faq', icon: InformationCircleIcon },
    ]
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Zalo',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.224-.487-.32-.711-.32-.063 0-.127 0-.169.032-.127.063-.19.159-.19.287 0 .063.032.127.063.159l.711.711c.032.032.063.063.063.127 0 .063-.032.095-.063.127l-.711.711c-.032.032-.063.095-.063.159 0 .127.063.224.19.287.042.032.106.032.169.032.224 0 .542-.095.711-.32l1.422-1.422c.127-.127.127-.351 0-.478L17.568 8.16z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-amber-50 via-green-50 to-emerald-100 text-gray-800">
      {/* Decorative bamboo pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="bambooPattern" x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
              <rect x="18" y="0" width="4" height="60" fill="currentColor" opacity="0.3"/>
              <rect x="18" y="15" width="4" height="2" fill="currentColor" opacity="0.5"/>
              <rect x="18" y="30" width="4" height="2" fill="currentColor" opacity="0.5"/>
              <rect x="18" y="45" width="4" height="2" fill="currentColor" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bambooPattern)"/>
        </svg>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-green-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Đăng Ký Nhận Tin
            </h3>
            <p className="text-green-600 mb-6">
              Nhận thông báo về những bài viết mới và sự kiện văn hóa đặc sắc từ Trúc Đình
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 px-4 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-green-300 text-gray-800 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 shadow-sm"
              />
              <button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section với Logo */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200">
                  <img 
                    src={logoImage}
                    alt="Trúc Đình Logo"
                    className="w-full h-full object-contain scale-150 transform"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-800">Trúc Đình</h2>
                  <p className="text-sm text-green-600">Văn hóa & Nghệ thuật</p>
                </div>
              </div>
              <p className="text-green-700 mb-4 leading-relaxed">
                Nơi cùng nhau đọc sách, nghe nhạc, xem phim và chia sẻ câu chuyện của bạn.
              </p>
              <div className="space-y-2 text-sm text-green-600">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>Hà Nội, Việt Nam</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="w-4 h-4" />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>info@trucdinh.vn</span>
                </div>
              </div>
            </div>

            {/* Khám Phá */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Khám Phá</h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors duration-200 group"
                      >
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Công Ty */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Công Ty</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors duration-200 group"
                      >
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Kết Nối */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Kết Nối</h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.connect.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors duration-200 group"
                      >
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold text-green-800 mb-3">Theo Dõi Chúng Tôi</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-600 hover:text-green-800 transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-green-200/50 bg-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-green-600">
              © {currentYear} Trúc Đình. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/chinh-sach" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                Chính Sách Bảo Mật
              </Link>
              <Link to="/dieu-khoan" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                Điều Khoản Sử Dụng
              </Link>
              <Link to="/sitemap" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                Sơ Đồ Trang Web
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;