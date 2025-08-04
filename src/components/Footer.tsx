
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LearnWithSaraiLogo from '@/components/LearnWithSaraiLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="sarai-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section - takes up more space */}
          <div className="col-span-1 md:col-span-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-1.5 bg-gradient-to-r from-sarai-primary to-sarai-secondary rounded-full">
                <LearnWithSaraiLogo className="h-6 w-6" size={24} />
              </div>
              <span className="text-sarai-primary font-montserrat text-2xl font-bold tracking-wide">
                {t('nav.brand')}
              </span>
            </Link>
            <p className="mt-4 text-gray-600">
              {t('footer.description')}
            </p>
          </div>
          
          {/* Quick Links moved to the right */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-sarai-text mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-sarai-primary transition-colors duration-200 text-sm">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-sarai-primary transition-colors duration-200 text-sm">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-sarai-primary transition-colors duration-200 text-sm">
                  {t('footer.services')}
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-gray-600 hover:text-sarai-primary transition-colors duration-200 text-sm">
                  {t('footer.book')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-sarai-primary transition-colors duration-200 text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright and Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} {t('nav.brand')}. {t('footer.rights')}
            </p>
            <div className="text-sm text-gray-500 text-center mt-2 md:mt-0">
              {t('footer.designed')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
