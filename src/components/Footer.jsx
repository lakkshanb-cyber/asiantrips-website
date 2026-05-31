import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import AsianTripsLogo from '@/components/AsianTripsLogo';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-950 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              {/* Full Vertical Logo for Footer */}
              {/* Overriding text colors to white for dark background */}
              <AsianTripsLogo 
                type="full" 
                className="items-start [&_.logo-icon]:w-16 [&_.logo-icon]:h-16 [&_.logo-text]:text-3xl [&_.logo-text]:text-white [&_.logo-tagline]:text-blue-200" 
              />
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs mt-4">
              Your trusted local partner for honest, transparent, and unforgettable journeys across Sikkim, Darjeeling, Bhutan, and Northeast India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-lg font-serif font-bold mb-6 block text-orange-400">Quick Links</span>
            <ul className="space-y-3">
              <li><Link to="/" className="text-blue-200 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Home</Link></li>
              <li><Link to="/about" className="text-blue-200 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">About Us</Link></li>
              <li><Link to="/destinations" className="text-blue-200 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Destinations</Link></li>
              <li><Link to="/packages" className="text-blue-200 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Packages</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <span className="text-lg font-serif font-bold mb-6 block text-orange-400">Popular Places</span>
            <ul className="space-y-3">
              <li className="text-blue-200 text-sm hover:text-white cursor-pointer transition-colors">Sikkim Tours</li>
              <li className="text-blue-200 text-sm hover:text-white cursor-pointer transition-colors">Darjeeling Getaways</li>
              <li className="text-blue-200 text-sm hover:text-white cursor-pointer transition-colors">Bhutan Cultural Trips</li>
              <li className="text-blue-200 text-sm hover:text-white cursor-pointer transition-colors">Northeast India Adventures</li>
              <li className="text-blue-200 text-sm hover:text-white cursor-pointer transition-colors">Nepal Expeditions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <span className="text-lg font-serif font-bold mb-6 block text-orange-400">Contact Us</span>
            <div className="space-y-4">
              <a href="tel:9907562273" className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group">
                <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-orange-500 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+91 9907562273</span>
              </a>
              <a href="https://wa.me/919907562273" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group">
                <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">WhatsApp Chat</span>
              </a>
              <a href="mailto:info@asiantrips.com" className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group">
                <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-orange-500 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">info@asiantrips.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-300 text-xs text-center md:text-left">
            © 2025 AsianTrips. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-blue-300 text-xs cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="text-blue-300 text-xs cursor-pointer hover:text-white">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
