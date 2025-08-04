
import { Link } from 'react-router-dom';
import { Image as ImageIcon, BookOpen, Star, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-b from-sarai-ice via-sarai-lightblue to-sarai-background">
      <div className="sarai-container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sarai-primary/20 text-sarai-accent">
              <ImageIcon size={16} className="mr-1" /> {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-sarai-text mb-6 text-shadow">
              {t('hero.title')} <span className="text-sarai-secondary relative">
                {t('hero.titleHighlight')}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sarai-secondary/30 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-sarai-steel mb-8">
              {t('hero.subtitle')}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="flex justify-center items-center h-6 w-6 rounded-full bg-sarai-secondary/20 mr-3">
                  <Check className="h-4 w-4 text-sarai-secondary" />
                </div>
                <span className="text-sarai-steel">{t('hero.benefit1')}</span>
              </div>
              <div className="flex items-center">
                <div className="flex justify-center items-center h-6 w-6 rounded-full bg-sarai-secondary/20 mr-3">
                  <Check className="h-4 w-4 text-sarai-secondary" />
                </div>
                <span className="text-sarai-steel">{t('hero.benefit2')}</span>
              </div>
              <div className="flex items-center">
                <div className="flex justify-center items-center h-6 w-6 rounded-full bg-sarai-secondary/20 mr-3">
                  <Check className="h-4 w-4 text-sarai-secondary" />
                </div>
                <span className="text-sarai-steel">{t('hero.benefit3')}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="btn-primary shadow-lg hover:shadow-sarai-secondary/30 transition-all duration-300 transform hover:-translate-y-1">
                {t('hero.cta1')}
              </Link>
              <Link to="/services" className="btn-outline hover:shadow-sarai-secondary/20 transition-all duration-300 transform hover:-translate-y-1">
                {t('hero.cta2')}
              </Link>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-sarai-primary/20 via-transparent to-sarai-secondary/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex justify-center items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-br from-sarai-primary to-sarai-secondary mx-auto">
                      <img 
                        src="/sarai-about-profile.jpeg" 
                        alt="Sarai Acevedo - Spanish Teacher"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-sarai-text">¡Hola! Soy Sarai</h3>
                    <p className="text-gray-600">Profesora certificada de español de Colombia</p>
                    
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="bg-sarai-background rounded-lg p-4">
                      <p className="text-sm text-sarai-steel italic">
                        "Más de 500 estudiantes felices aprendiendo español conmigo"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,214.86,124.16Z" 
            className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
// Force deployment - Mon Aug  4 18:43:33 WEST 2025
