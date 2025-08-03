import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'es';
  setLanguage: (language: 'en' | 'es') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'en' | 'es') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<'en' | 'es', Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.services': 'Services',
    'nav.chat': 'Chat',
    'nav.book': 'Book a Class',
    'nav.brand': 'LEARN WithSarai',

    // Hero Section
    'hero.badge': 'Online Spanish Classes',
    'hero.title': 'Learn Spanish with',
    'hero.titleHighlight': 'Professional Guidance',
    'hero.subtitle': "Hi there! I'm Sarai, a certified Spanish teacher from Colombia and I'm here to help you learn Spanish in a way that's fun, effective and personalized just for you.",
    'hero.benefit1': 'Personalized classes for all levels',
    'hero.benefit2': 'Flexible schedule to fit your needs',
    'hero.benefit3': 'Interactive and enjoyable learning materials',
    'hero.cta1': 'Book a Trial Class',
    'hero.cta2': 'Explore Services',

    // Benefits Section
    'benefits.title': 'Why Learn Spanish with Me?',
    'benefits.subtitle': 'Discover how my personalized online Spanish lessons can help you reach your goals',
    'benefits.personalized.title': 'Personalized Learning',
    'benefits.personalized.description': 'Classes designed just for you - focused on your goals, learning style, and pace. No generic curriculum, just what you actually need.',
    'benefits.flexible.title': 'Flexible Scheduling',
    'benefits.flexible.description': 'Book classes when it works for you with our easy booking system that adapts to your time zone, wherever you are.',
    'benefits.certified.title': 'Certified Professional',
    'benefits.certified.description': 'Learn with a certified Spanish teacher with experience teaching students from around the world with proven results.',

    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Start your Spanish learning journey in three simple steps',
    'howItWorks.step1.title': 'Book a Trial Class',
    'howItWorks.step1.description': 'Schedule a 25-minute trial class to assess your current level and discuss your goals. Just €10.50 to get started.',
    'howItWorks.step2.title': 'Get a Learning Plan',
    'howItWorks.step2.description': 'Receive a customized learning plan based on what you want to achieve, your preferences, and your schedule.',
    'howItWorks.step3.title': 'Start Learning',
    'howItWorks.step3.description': 'Begin your classes in our virtual classroom with personalized materials and ongoing support between sessions.',
    'howItWorks.cta': 'Schedule Your Trial Class',

    // Testimonials
    'testimonials.title': 'What My Students Say',
    'testimonials.subtitle': 'Real stories from people who are already enjoying speaking Spanish fluently',

    // CTA Section
    'cta.title': 'Ready to Start Your Spanish Journey?',
    'cta.subtitle': 'Book your 25-minute trial class for just €10.50 and take the first step towards Spanish fluency.',
    'cta.button': 'Book Your Trial Class',

    // About Page
    'about.hero.title': 'Meet Your',
    'about.hero.titleHighlight': 'Spanish Teacher',
    'about.hero.subtitle': "Hello! I'm Sarai, a certified Spanish teacher from Colombia. My passion is helping students from around the world achieve their Spanish language goals in a personalized, effective, and fun way.",
    'about.hero.badge1': 'International Students',
    'about.hero.badge2': 'Outstanding Educator',
    'about.cta.title': 'Ready to Start Your Spanish Adventure?',
    'about.cta.subtitle': 'Book your 25-minute trial class for just €10.50 and take the first step towards Spanish fluency.',
    'about.cta.button': 'Book Your Trial Class',

    // Services Page
    'services.title': 'Spanish Learning Services',
    'services.subtitle': 'Classes designed just for you to help you reach your language goals',
    'services.tab.individual': 'Individual Classes',
    'services.tab.packages': 'Class Packages',
    'services.tab.specialized': 'Specialized Classes',
    'services.individual.title': 'One-on-One Spanish Classes',
    'services.individual.subtitle': 'Personalized individual lessons tailored to your specific needs and learning style',
    'services.trial.title': 'Trial Lesson',
    'services.trial.description': 'Try a 25-minute class to assess your level and discuss your learning goals.',
    'services.trial.price': '€10.50',
    'services.trial.feature1': 'Level assessment',
    'services.trial.feature2': 'Learning goals discussion',
    'services.trial.feature3': 'Personalized learning plan',
    'services.trial.feature4': 'Q&A about methodology',
    'services.trial.feature5': 'Payment required to book',
    'services.standard.title': 'Standard Class',
    'services.standard.description': 'Regular one-on-one Spanish lessons focused on your specific learning goals.',
    'services.standard.price': '€21.00',
    'services.standard.feature1': '50-minute sessions',
    'services.standard.feature2': 'Customized curriculum',
    'services.standard.feature3': 'Homework assignments',
    'services.standard.feature4': 'Progress tracking',
    'services.standard.feature5': 'Flexible scheduling',
    'services.premium.title': 'Premium Class',
    'services.premium.description': 'Extended sessions for faster progress with additional materials and support.',
    'services.premium.price': '€42.00',
    'services.premium.feature1': '100-minute sessions',
    'services.premium.feature2': 'Personalized learning materials',
    'services.premium.feature3': 'Interactive exercises',
    'services.premium.feature4': 'Email support between classes',
    'services.premium.feature5': 'Monthly progress report',
    'services.packages.title': 'Class Packages',
    'services.packages.subtitle': 'Bundle packages for consistent learning and better value',
    'services.specialized.title': 'Specialized Learning Programs',
    'services.specialized.subtitle': 'Focused courses designed for specific goals and contexts',
    'services.travel.title': 'Spanish for Travel',
    'services.travel.description': 'Quick, practical Spanish skills for travelers heading to Spanish-speaking countries.',
    'services.travel.price': '€25.00',
    'services.faq.title': 'Frequently Asked Questions',
    'services.faq.q1': 'What technology do I need for online classes?',
    'services.faq.a1': "You just need a computer or tablet with a stable internet connection, a webcam, and a microphone. We'll use a simple virtual classroom platform that's easy to access.",
    'services.faq.q2': 'Do I need to purchase any textbooks?',
    'services.faq.a2': "No! All learning materials are included in your class fee. I create custom materials based on what you need and your learning style.",
    'services.faq.q3': 'How do I know which class type is right for me?',
    'services.faq.a3': "Start with a trial class where we'll assess your current level and discuss your goals. Based on that, I'll recommend the best class type for your needs.",
    'services.faq.q4': 'What happens if I need to reschedule a class?',
    'services.faq.a4': "You can reschedule your class up to 12 hours before the scheduled time through the booking system. For last-minute changes, please refer to our cancellation policy.",
    'services.faq.q5': 'Are the classes one-on-one or in groups?',
    'services.faq.a5': "All classes are private, one-on-one sessions to ensure you get personalized attention and can progress at your own pace.",
    'services.faq.q6': 'How do payments work?',
    'services.faq.a6': "We use secure payment processing through Stripe. You can pay per class or choose a package. All prices are in euros, and you'll receive an invoice for each payment.",
    'services.faq.q7': 'What is the difference between standard and premium classes?',
    'services.faq.a7': "Standard classes (50 minutes) are perfect for regular learning, while premium classes (100 minutes) offer extended practice time and additional materials. Premium classes also include email support between sessions.",
    'services.faq.q8': 'Can I switch between class types?',
    'services.faq.a8': "Yes! You can try different class types to find what works best for you. Just book your preferred class type when scheduling your next session.",
    'services.faq.q9': 'Do you offer specialized business Spanish classes?',
    'services.faq.a9': "Yes! I offer specialized classes focused on business Spanish, including vocabulary for presentations, emails, and professional conversations. Contact me to discuss your specific needs.",
    'services.faq.q10': 'What is your teaching methodology?',
    'services.faq.a10': "I use a communicative approach focused on practical usage, combining conversation practice with structured learning. Each class is tailored to your goals, whether that's grammar, pronunciation, or specific skills.",
    'services.cta.title': 'Ready to Start Learning Spanish?',
    'services.cta.subtitle': 'Book your trial class today for just €10.50 and take the first step towards fluency.',
    'services.cta.button': 'Schedule Your Trial Class',

    // Book Class Page
    'book.title': 'Book Your Spanish Class',
    'book.subtitle': 'Choose your class type and schedule a time that works for you',
    'book.step1.title': 'Choose Your Class',
    'book.step2.title': 'Your Details',
    'book.personal.title': 'Personal Information',
    'book.name': 'Full Name',
    'book.email': 'Email Address',
    'book.timezone': 'Your Time Zone',
    'book.level': 'Your Spanish Level',
    'book.level.complete': 'Complete Beginner',
    'book.level.beginner': 'Beginner',
    'book.level.intermediate': 'Intermediate',
    'book.level.advanced': 'Advanced',
    'book.level.fluent': 'Near Fluent',
    'book.goals': 'What Do You Want to Achieve?',
    'book.goals.placeholder': 'Tell me about your goals with Spanish - travel, work, family connections, etc.',
    'book.continue': 'Continue to Payment',
    'book.submit': 'Complete Booking',

    // Chat Page  
    'chat.title': 'Student Chat',
    'chat.subtitle': 'Communicate with your students between classes',
    'chat.search': 'Search students...',
    'chat.type': 'Type your message...',
    'chat.send': 'Send',

    // Footer
    'footer.description': 'Personalized online Spanish lessons with a professional teacher. Learn Spanish at your own pace with customized classes.',
    'footer.quickLinks': 'Quick Links',
    'footer.home': 'Home',
    'footer.about': 'About Me',
    'footer.services': 'Services',
    'footer.book': 'Book a Class',
    'footer.terms': 'Terms & Conditions',
    'footer.rights': 'All rights reserved.',
    'footer.designed': 'Designed with ❤️ for Spanish learners worldwide.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.services': 'Servicios',
    'nav.chat': 'Chat',
    'nav.book': 'Reservar Clase',
    'nav.brand': 'APRENDE ConSarai',

    // Hero Section
    'hero.badge': 'Clases de Español Online',
    'hero.title': 'Aprende Español con',
    'hero.titleHighlight': 'Orientación Profesional',
    'hero.subtitle': '¡Hola! Soy Sarai, una profesora de español certificada de Colombia y estoy aquí para ayudarte a aprender español de una manera divertida, efectiva y personalizada solo para ti.',
    'hero.benefit1': 'Clases personalizadas para todos los niveles',
    'hero.benefit2': 'Horario flexible que se adapta a tus necesidades',
    'hero.benefit3': 'Materiales de aprendizaje interactivos y divertidos',
    'hero.cta1': 'Reservar Clase de Prueba',
    'hero.cta2': 'Explorar Servicios',

    // Benefits Section
    'benefits.title': '¿Por Qué Aprender Español Conmigo?',
    'benefits.subtitle': 'Descubre cómo mis clases personalizadas de español online pueden ayudarte a alcanzar tus objetivos',
    'benefits.personalized.title': 'Aprendizaje Personalizado',
    'benefits.personalized.description': 'Clases diseñadas solo para ti - enfocadas en tus objetivos, estilo de aprendizaje y ritmo. Sin plan de estudios genérico, solo lo que realmente necesitas.',
    'benefits.flexible.title': 'Horario Flexible',
    'benefits.flexible.description': 'Reserva clases cuando te convenga con nuestro sistema de reservas fácil que se adapta a tu zona horaria, donde sea que estés.',
    'benefits.certified.title': 'Profesional Certificada',
    'benefits.certified.description': 'Aprende con una profesora de español certificada con experiencia enseñando a estudiantes de todo el mundo con resultados probados.',

    // How It Works
    'howItWorks.title': 'Cómo Funciona',
    'howItWorks.subtitle': 'Comienza tu viaje de aprendizaje del español en tres simples pasos',
    'howItWorks.step1.title': 'Reserva una Clase de Prueba',
    'howItWorks.step1.description': 'Programa una clase de prueba de 25 minutos para evaluar tu nivel actual y discutir tus objetivos. Solo €10.50 para comenzar.',
    'howItWorks.step2.title': 'Obtén un Plan de Aprendizaje',
    'howItWorks.step2.description': 'Recibe un plan de aprendizaje personalizado basado en lo que quieres lograr, tus preferencias y tu horario.',
    'howItWorks.step3.title': 'Comienza a Aprender',
    'howItWorks.step3.description': 'Comienza tus clases en nuestro aula virtual con materiales personalizados y apoyo continuo entre sesiones.',
    'howItWorks.cta': 'Programa Tu Clase de Prueba',

    // Testimonials
    'testimonials.title': 'Lo Que Dicen Mis Estudiantes',
    'testimonials.subtitle': 'Historias reales de personas que ya disfrutan hablando español con fluidez',

    // CTA Section
    'cta.title': '¿Listo Para Comenzar Tu Viaje en Español?',
    'cta.subtitle': 'Reserva tu clase de prueba de 25 minutos por solo €10.50 y da el primer paso hacia la fluidez en español.',
    'cta.button': 'Reservar Tu Clase de Prueba',

    // About Page
    'about.hero.title': 'Conoce a Tu',
    'about.hero.titleHighlight': 'Profesora de Español',
    'about.hero.subtitle': '¡Hola! Soy Sarai, una profesora de español certificada de Colombia. Mi pasión es ayudar a estudiantes de todo el mundo a alcanzar sus objetivos del idioma español de una manera personalizada, efectiva y divertida.',
    'about.hero.badge1': 'Estudiantes Internacionales',
    'about.hero.badge2': 'Educadora Destacada',
    'about.cta.title': '¿Listo Para Comenzar Tu Aventura en Español?',
    'about.cta.subtitle': 'Reserva tu clase de prueba de 25 minutos por solo €10.50 y da el primer paso hacia la fluidez en español.',
    'about.cta.button': 'Reservar Tu Clase de Prueba',

    // Services Page
    'services.title': 'Servicios de Aprendizaje de Español',
    'services.subtitle': 'Clases diseñadas solo para ti para ayudarte a alcanzar tus objetivos del idioma',
    'services.tab.individual': 'Clases Individuales',
    'services.tab.packages': 'Paquetes de Clases',
    'services.tab.specialized': 'Clases Especializadas',
    'services.individual.title': 'Clases de Español Uno a Uno',
    'services.individual.subtitle': 'Lecciones individuales personalizadas adaptadas a tus necesidades específicas y estilo de aprendizaje',
    'services.trial.title': 'Clase de Prueba',
    'services.trial.description': 'Prueba una clase de 25 minutos para evaluar tu nivel y discutir tus objetivos de aprendizaje.',
    'services.trial.price': '€10.50',
    'services.trial.feature1': 'Evaluación de nivel',
    'services.trial.feature2': 'Discusión de objetivos de aprendizaje',
    'services.trial.feature3': 'Plan de aprendizaje personalizado',
    'services.trial.feature4': 'Preguntas y respuestas sobre metodología',
    'services.trial.feature5': 'Pago requerido para reservar',
    'services.standard.title': 'Clase Estándar',
    'services.standard.description': 'Lecciones regulares de español uno a uno enfocadas en tus objetivos específicos de aprendizaje.',
    'services.standard.price': '€21.00',
    'services.standard.feature1': 'Sesiones de 50 minutos',
    'services.standard.feature2': 'Plan de estudios personalizado',
    'services.standard.feature3': 'Tareas para casa',
    'services.standard.feature4': 'Seguimiento del progreso',
    'services.standard.feature5': 'Horario flexible',
    'services.premium.title': 'Clase Premium',
    'services.premium.description': 'Sesiones extendidas para un progreso más rápido con materiales adicionales y apoyo.',
    'services.premium.price': '€42.00',
    'services.premium.feature1': 'Sesiones de 100 minutos',
    'services.premium.feature2': 'Materiales de aprendizaje personalizados',
    'services.premium.feature3': 'Ejercicios interactivos',
    'services.premium.feature4': 'Apoyo por email entre clases',
    'services.premium.feature5': 'Reporte mensual de progreso',
    'services.packages.title': 'Paquetes de Clases',
    'services.packages.subtitle': 'Paquetes para un aprendizaje consistente y mejor valor',
    'services.specialized.title': 'Programas de Aprendizaje Especializados',
    'services.specialized.subtitle': 'Cursos enfocados diseñados para objetivos y contextos específicos',
    'services.travel.title': 'Español para Viajes',
    'services.travel.description': 'Habilidades rápidas y prácticas del español para viajeros que van a países de habla hispana.',
    'services.travel.price': '€25.00',
    'services.faq.title': 'Preguntas Frecuentes',
    'services.faq.q1': '¿Qué tecnología necesito para las clases en línea?',
    'services.faq.a1': "Solo necesitas una computadora o tablet con conexión estable a internet, una cámara web y un micrófono. Usaremos una plataforma virtual simple y fácil de acceder.",
    'services.faq.q2': '¿Necesito comprar libros de texto?',
    'services.faq.a2': "¡No! Todos los materiales de aprendizaje están incluidos en el precio de tu clase. Creo materiales personalizados basados en lo que necesitas y tu estilo de aprendizaje.",
    'services.faq.q3': '¿Cómo sé qué tipo de clase es adecuada para mí?',
    'services.faq.a3': "Comienza con una clase de prueba donde evaluaremos tu nivel actual y discutiremos tus objetivos. Basado en eso, te recomendaré el mejor tipo de clase para tus necesidades.",
    'services.faq.q4': '¿Qué sucede si necesito reprogramar una clase?',
    'services.faq.a4': "Puedes reprogramar tu clase hasta 12 horas antes de la hora programada a través del sistema de reservas. Para cambios de último momento, consulta nuestra política de cancelación.",
    'services.faq.q5': '¿Las clases son individuales o en grupo?',
    'services.faq.a5': "Todas las clases son sesiones privadas, uno a uno, para asegurar que recibas atención personalizada y puedas progresar a tu propio ritmo.",
    'services.faq.q6': '¿Cómo funcionan los pagos?',
    'services.faq.a6': "Utilizamos procesamiento de pagos seguro a través de Stripe. Puedes pagar por clase o elegir un paquete. Todos los precios están en euros y recibirás una factura por cada pago.",
    'services.faq.q7': '¿Cuál es la diferencia entre las clases estándar y premium?',
    'services.faq.a7': "Las clases estándar (50 minutos) son perfectas para el aprendizaje regular, mientras que las clases premium (100 minutos) ofrecen tiempo de práctica extendido y materiales adicionales. Las clases premium también incluyen soporte por email entre sesiones.",
    'services.faq.q8': '¿Puedo cambiar entre tipos de clases?',
    'services.faq.a8': "¡Sí! Puedes probar diferentes tipos de clases para encontrar lo que mejor funcione para ti. Solo reserva el tipo de clase que prefieras al programar tu próxima sesión.",
    'services.faq.q9': '¿Ofreces clases especializadas de español para negocios?',
    'services.faq.a9': "¡Sí! Ofrezco clases especializadas enfocadas en español para negocios, incluyendo vocabulario para presentaciones, correos electrónicos y conversaciones profesionales. Contáctame para discutir tus necesidades específicas.",
    'services.faq.q10': '¿Cuál es tu metodología de enseñanza?',
    'services.faq.a10': "Uso un enfoque comunicativo centrado en el uso práctico, combinando práctica de conversación con aprendizaje estructurado. Cada clase está adaptada a tus objetivos, ya sea gramática, pronunciación o habilidades específicas.",
    'services.cta.title': '¿Listo Para Comenzar a Aprender Español?',
    'services.cta.subtitle': 'Reserva tu clase de prueba hoy por solo €10.50 y da el primer paso hacia la fluidez.',
    'services.cta.button': 'Programa Tu Clase de Prueba',

    // Book Class Page
    'book.title': 'Reserva Tu Clase de Español',
    'book.subtitle': 'Elige tu tipo de clase y programa un horario que funcione para ti',
    'book.step1.title': 'Elige Tu Clase',
    'book.step2.title': 'Tus Detalles',
    'book.personal.title': 'Información Personal',
    'book.name': 'Nombre Completo',
    'book.email': 'Dirección de Email',
    'book.timezone': 'Tu Zona Horaria',
    'book.level': 'Tu Nivel de Español',
    'book.level.complete': 'Principiante Completo',
    'book.level.beginner': 'Principiante',
    'book.level.intermediate': 'Intermedio',
    'book.level.advanced': 'Avanzado',
    'book.level.fluent': 'Casi Fluido',
    'book.goals': '¿Qué Quieres Lograr?',
    'book.goals.placeholder': 'Cuéntame sobre tus objetivos con el español - viajes, trabajo, conexiones familiares, etc.',
    'book.continue': 'Continuar al Pago',
    'book.submit': 'Completar Reserva',

    // Chat Page
    'chat.title': 'Chat de Estudiantes',
    'chat.subtitle': 'Comunícate con tus estudiantes entre clases',
    'chat.search': 'Buscar estudiantes...',
    'chat.type': 'Escribe tu mensaje...',
    'chat.send': 'Enviar',

    // Footer
    'footer.description': 'Clases personalizadas de español online con una profesora profesional. Aprende español a tu propio ritmo con clases personalizadas.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.home': 'Inicio',
    'footer.about': 'Sobre Mí',
    'footer.services': 'Servicios',
    'footer.book': 'Reservar Clase',
    'footer.terms': 'Términos y Condiciones',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.designed': 'Diseñado con ❤️ para estudiantes de español en todo el mundo.',
  }
}; 