
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import EnhancedTestimonials from '@/components/EnhancedTestimonials';
import ScrollAnimation from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Benefits Section */}
        <section className="sarai-section bg-white">
          <div className="sarai-container">
            <ScrollAnimation direction="up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sarai-text">
                {t('benefits.title')}
              </h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                {t('benefits.subtitle')}
              </p>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Benefit 1 */}
              <ScrollAnimation direction="left" delay={0.2}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-14 bg-sarai-primary/10 rounded-full flex items-center justify-center mb-4"
                  >
                    <svg className="w-6 h-6 text-sarai-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-sarai-text">{t('benefits.personalized.title')}</h3>
                  <p className="text-gray-600">
                    {t('benefits.personalized.description')}
                  </p>
                </motion.div>
              </ScrollAnimation>
              
              {/* Benefit 2 */}
              <ScrollAnimation direction="up" delay={0.4}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-14 bg-sarai-primary/10 rounded-full flex items-center justify-center mb-4"
                  >
                    <svg className="w-6 h-6 text-sarai-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-sarai-text">{t('benefits.flexible.title')}</h3>
                  <p className="text-gray-600">
                    {t('benefits.flexible.description')}
                  </p>
                </motion.div>
              </ScrollAnimation>
              
              {/* Benefit 3 */}
              <ScrollAnimation direction="right" delay={0.6}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-14 bg-sarai-primary/10 rounded-full flex items-center justify-center mb-4"
                  >
                    <svg className="w-6 h-6 text-sarai-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-sarai-text">{t('benefits.certified.title')}</h3>
                  <p className="text-gray-600">
                    {t('benefits.certified.description')}
                  </p>
                </motion.div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="sarai-section bg-gray-50">
          <div className="sarai-container">
            <ScrollAnimation direction="up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sarai-text">
                {t('howItWorks.title')}
              </h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                {t('howItWorks.subtitle')}
              </p>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Step 1 */}
              <ScrollAnimation direction="left" delay={0.2}>
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 bg-sarai-primary rounded-full flex items-center justify-center text-white font-bold mb-4"
                    >
                      1
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-sarai-text">{t('howItWorks.step1.title')}</h3>
                    <p className="text-gray-600">
                      {t('howItWorks.step1.description')}
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
                  >
                    <svg className="w-8 h-8 text-sarai-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </ScrollAnimation>
              
              {/* Step 2 */}
              <ScrollAnimation direction="up" delay={0.4}>
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 bg-sarai-primary rounded-full flex items-center justify-center text-white font-bold mb-4"
                    >
                      2
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-sarai-text">{t('howItWorks.step2.title')}</h3>
                    <p className="text-gray-600">
                      {t('howItWorks.step2.description')}
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
                  >
                    <svg className="w-8 h-8 text-sarai-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </ScrollAnimation>
              
              {/* Step 3 */}
              <ScrollAnimation direction="right" delay={0.6}>
                <div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 bg-sarai-primary rounded-full flex items-center justify-center text-white font-bold mb-4"
                    >
                      3
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-sarai-text">{t('howItWorks.step3.title')}</h3>
                    <p className="text-gray-600">
                      {t('howItWorks.step3.description')}
                    </p>
                  </motion.div>
                </div>
              </ScrollAnimation>
            </div>
            
            <ScrollAnimation direction="up" delay={0.8} className="mt-12 text-center">
              <Link to="/book">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-sarai-secondary hover:bg-sarai-secondary/90 text-white">
                    {t('howItWorks.cta')}
                  </Button>
                </motion.div>
              </Link>
            </ScrollAnimation>
          </div>
        </section>
        
        {/* Enhanced Testimonials */}
        <EnhancedTestimonials />
        
        {/* CTA Section */}
        <section className="bg-sarai-primary text-white py-16">
          <div className="sarai-container">
            <ScrollAnimation direction="up" className="max-w-3xl mx-auto text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t('cta.title')}
                </h2>
                <p className="text-xl mb-8">
                  {t('cta.subtitle')}
                </p>
                <Link to="/book">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-white text-sarai-primary hover:bg-gray-100 font-semibold py-3 px-8 text-lg shadow-lg">
                      {t('cta.button')}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </ScrollAnimation>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
