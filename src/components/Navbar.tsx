
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette } from 'lucide-react'; 
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-white to-blue-50 shadow-sm">
      <div className="sarai-container">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-sarai-primary to-sarai-secondary rounded-full">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <span className="text-sarai-primary font-montserrat text-2xl font-bold">
              {t('nav.brand')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              <Link 
                to="/" 
                className={`font-medium transition-all duration-300 ${isActive('/') ? 'text-sarai-primary scale-110' : 'text-gray-600 hover:text-sarai-primary hover:scale-110'}`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-all duration-300 ${isActive('/about') ? 'text-sarai-primary scale-110' : 'text-gray-600 hover:text-sarai-primary hover:scale-110'}`}
              >
                {t('nav.about')}
              </Link>
              <Link 
                to="/services" 
                className={`font-medium transition-all duration-300 ${isActive('/services') ? 'text-sarai-primary scale-110' : 'text-gray-600 hover:text-sarai-primary hover:scale-110'}`}
              >
                {t('nav.services')}
              </Link>
              <Link 
                to="/chat" 
                className={`font-medium transition-all duration-300 ${isActive('/chat') ? 'text-sarai-primary scale-110' : 'text-gray-600 hover:text-sarai-primary hover:scale-110'}`}
              >
                {t('nav.chat')}
              </Link>
              <Link 
                to="/book" 
                className="btn-primary shadow-lg hover:shadow-sarai-primary/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                {t('nav.book')}
              </Link>
            </div>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSelector />
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-sarai-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-gradient-to-b from-white to-blue-50">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-sarai-primary bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-sarai-primary'}`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-sarai-primary bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-sarai-primary'}`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/services"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/services') ? 'text-sarai-primary bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-sarai-primary'}`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/chat"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/chat') ? 'text-sarai-primary bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-sarai-primary'}`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.chat')}
            </Link>
            <Link
              to="/book"
              className="block px-3 py-2 rounded-md text-base font-medium btn-primary w-full text-center shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.book')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
