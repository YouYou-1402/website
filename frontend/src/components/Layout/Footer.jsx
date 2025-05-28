import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon,
  HeartIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Books', href: '/books' },
      { name: 'Movies', href: '/movies' },
      { name: 'Music', href: '/music' },
      { name: 'Blog', href: '/blog' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    connect: [
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'Community', href: '/community' },
      { name: 'Support', href: '/support' },
      { name: 'FAQ', href: '/faq' },
    ]
  };

  return (
    <footer className="bg-vintage-brown text-vintage-cream mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-vintage-cream rounded-lg flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-vintage-brown" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">Vintage</h3>
                <p className="text-sm text-vintage-lightbrown -mt-1">Cultural Blog</p>
              </div>
            </div>
            <p className="text-vintage-lightbrown mb-6 text-sm leading-relaxed">
              Discover timeless stories, classic films, vintage music, and thoughtful insights 
              that celebrate the enduring beauty of culture and art.
            </p>
            <div className="flex items-center space-x-2 text-sm text-vintage-lightbrown">
              <MapPinIcon className="w-4 h-4" />
              <span>Connecting cultures worldwide</span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-serif font-semibold text-vintage-cream mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-vintage-lightbrown hover:text-vintage-cream transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif font-semibold text-vintage-cream mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-vintage-lightbrown hover:text-vintage-cream transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-serif font-semibold text-vintage-cream mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-vintage-lightbrown hover:text-vintage-cream transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-vintage-darkbrown border border-vintage-lightbrown/30 rounded-l-md text-vintage-cream placeholder-vintage-lightbrown text-sm focus:outline-none focus:ring-2 focus:ring-vintage-gold"
                />
                <button className="px-4 py-2 bg-vintage-gold text-vintage-darkbrown rounded-r-md hover:bg-vintage-gold/90 transition-colors">
                  <EnvelopeIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-vintage-lightbrown/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-vintage-lightbrown text-sm">
              © {currentYear} Vintage Cultural Blog. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-vintage-lightbrown text-sm mt-2 md:mt-0">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-red-400" />
              <span>for culture enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
