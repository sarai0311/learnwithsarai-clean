
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FrequentQuestions = () => {
  const faqs = [
    {
      question: "¿Cuánto tiempo se necesita para aprender español?",
      answer: "El tiempo necesario para aprender español varía según tu experiencia previa con idiomas, tu dedicación y la frecuencia de tus clases. Muchos estudiantes logran mantener conversaciones básicas después de 3-6 meses de estudio regular. Para alcanzar fluidez, generalmente se requieren entre 9-18 meses de práctica consistente. Mis clases personalizadas te ayudarán a avanzar a tu propio ritmo y alcanzar tus objetivos específicos."
    },
    {
      question: "¿Cuál es tu metodología de enseñanza?",
      answer: "Mi enfoque es comunicativo y personalizado. Me centro en desarrollar las cuatro habilidades fundamentales: hablar, escuchar, leer y escribir, con énfasis especial en la conversación. Adapto los materiales y actividades según tus intereses, nivel y objetivos de aprendizaje. Utilizo recursos auténticos como artículos, videos y podcasts para exponerte al español real, y complemento con ejercicios gramaticales estructurados cuando es necesario."
    },
    {
      question: "¿Cómo son las clases virtuales?",
      answer: "Las clases se realizan a través de Zoom o Google Meet, según tu preferencia. Cada sesión incluye conversación, explicaciones gramaticales, práctica de pronunciación y tareas interactivas. Comparto mi pantalla para mostrar materiales visuales y envío recursos complementarios después de cada clase. El formato virtual permite grabar las sesiones (si lo deseas) para que puedas revisarlas posteriormente."
    },
    {
      question: "¿Puedo cancelar o reprogramar una clase?",
      answer: "Sí, entiendo que pueden surgir imprevistos. Te pido que avises con al menos 24 horas de anticipación para reprogramar sin costo. Las cancelaciones con menos de 24 horas podrían estar sujetas a un cargo parcial. Mi política busca ser flexible mientras mantenemos un compromiso mutuo con tu aprendizaje."
    },
    {
      question: "¿Ofreces paquetes de clases con descuento?",
      answer: "Sí, ofrezco varios paquetes que proporcionan mejor valor que las clases individuales. Los paquetes más populares son de 5, 10 y 20 clases, con descuentos progresivamente mayores cuanto más grande sea el paquete. Contáctame para conocer las tarifas actuales y promociones disponibles."
    },
    {
      question: "¿Qué nivel de español puedo alcanzar?",
      answer: "Mis clases cubren todos los niveles, desde principiante (A1) hasta avanzado (C1) según el Marco Común Europeo. Puedo ayudarte a prepararte para exámenes oficiales como el DELE o simplemente a desarrollar fluidez conversacional. En nuestra primera sesión, evaluaré tu nivel actual y estableceremos objetivos realistas para tu progreso."
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-white via-sarai-background to-white">
      <div className="sarai-container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-sarai-primary/10 rounded-full">
              <HelpCircle className="h-10 w-10 text-sarai-primary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-sarai-text mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Respuestas a las dudas más comunes sobre mis clases de español
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-none">
                <AccordionTrigger className="py-5 text-left font-semibold text-sarai-text">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            ¿Tienes más preguntas? No dudes en contactarme directamente
          </p>
          <a href="mailto:info@learnwithsarai.com" className="btn-secondary inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar un Mensaje
          </a>
        </div>
      </div>
    </div>
  );
};

export default FrequentQuestions;
