import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsAndConditions from "@/components/TermsAndConditions";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-sarai-primary text-white py-16">
          <div className="sarai-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'es' ? 'Términos y Condiciones' : 'Terms and Conditions'}
              </h1>
              <p className="text-xl opacity-90">
                {language === 'es' 
                  ? 'Información importante sobre nuestras clases y políticas'
                  : 'Important information about our classes and policies'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="sarai-section bg-white">
          <div className="sarai-container">
            <TermsAndConditions />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms; 