import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AsianTripsLogo from '@/components/AsianTripsLogo';
import { useQuoteModal } from '@/context/QuoteModalContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useQuoteModal();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group min-w-fit">
            <AsianTripsLogo type="header" className="transition-opacity hover:opacity-90" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-orange-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3 ml-auto lg:ml-0">
            <Button
              onClick={openModal}
              className="hidden lg:inline-flex bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Get Free Quote
            </Button>
            <a
              href="tel:9933649669"
              className="hidden xl:flex items-center gap-2 px-3 py-2 text-blue-900 font-medium hover:text-orange-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>9933649669</span>
            </a>
            <a
              href="https://wa.me/919933649669"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors ml-4"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden border-t bg-white overflow-hidden"
          >
            <div className="flex flex-col py-4 px-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors px-4 py-3 rounded-lg ${
                    location.pathname === link.path
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 px-4 pt-4 mt-2 border-t">
                <Button
                  onClick={() => {
                    openModal();
                    setIsOpen(false);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full py-6"
                >
                  Get Free Quote
                </Button>
                <div className="flex gap-4">
                  <a
                    href="tel:9933649669"
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg text-blue-900 font-medium hover:bg-gray-50"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <a
                    href="https://wa.me/919933649669"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-green-200 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;