
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Book, Video, MessageSquare, FileText, Music, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearningResources = () => {
  return (
    <div className="sarai-container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sarai-text wavy-border inline-block pb-6">
          Recursos de Aprendizaje
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explora estos recursos para complementar tus clases y acelerar tu aprendizaje del español.
        </p>
      </div>

      <Tabs defaultValue="principiante" className="w-full max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-sarai-lightblue rounded-full p-1.5">
            <TabsTrigger 
              value="principiante" 
              className="rounded-full data-[state=active]:bg-sarai-primary data-[state=active]:text-white px-5 py-2"
            >
              Principiante
            </TabsTrigger>
            <TabsTrigger 
              value="intermedio" 
              className="rounded-full data-[state=active]:bg-sarai-secondary data-[state=active]:text-white px-5 py-2"
            >
              Intermedio
            </TabsTrigger>
            <TabsTrigger 
              value="avanzado" 
              className="rounded-full data-[state=active]:bg-sarai-accent data-[state=active]:text-white px-5 py-2"
            >
              Avanzado
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="principiante">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="theme-card primary p-6">
              <div className="flex items-center mb-4">
                <Book className="h-6 w-6 text-sarai-primary mr-3" />
                <h3 className="text-xl font-semibold">Gramática Básica</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Los Verbos Ser y Estar</AccordionTrigger>
                  <AccordionContent>
                    Aprende la diferencia entre "ser" y "estar", dos verbos esenciales en español.
                    <Link to="#" className="block mt-2 text-sarai-primary hover:underline">Ver lección completa →</Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Presente del Indicativo</AccordionTrigger>
                  <AccordionContent>
                    Conjugación de verbos regulares e irregulares en presente.
                    <Link to="#" className="block mt-2 text-sarai-primary hover:underline">Ver lección completa →</Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Artículos y Sustantivos</AccordionTrigger>
                  <AccordionContent>
                    Aprende a usar correctamente los artículos definidos e indefinidos.
                    <Link to="#" className="block mt-2 text-sarai-primary hover:underline">Ver lección completa →</Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="theme-card secondary p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-sarai-secondary mr-3" />
                <h3 className="text-xl font-semibold">Conversación</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Saludos y Presentaciones</AccordionTrigger>
                  <AccordionContent>
                    Aprende a saludar y presentarte en español.
                    <Link to="#" className="block mt-2 text-sarai-secondary hover:underline">Ver lección completa →</Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>En el Restaurante</AccordionTrigger>
                  <AccordionContent>
                    Vocabulario y frases útiles para ordenar comida en un restaurante.
                    <Link to="#" className="block mt-2 text-sarai-secondary hover:underline">Ver lección completa →</Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>De Compras</AccordionTrigger>
                  <AccordionContent>
                    Cómo preguntar por precios y hacer compras en español.
                    <Link to="#" className="block mt-2 text-sarai-secondary hover:underline">Ver lección completa →</Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="intermedio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="theme-card primary p-6">
              <div className="flex items-center mb-4">
                <Video className="h-6 w-6 text-sarai-primary mr-3" />
                <h3 className="text-xl font-semibold">Vídeos Recomendados</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-sarai-primary/10 p-2 rounded-full mr-3 mt-1">
                    <Video className="h-4 w-4 text-sarai-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pretérito vs. Imperfecto</h4>
                    <p className="text-gray-600 text-sm">Aprende cuándo usar cada tiempo verbal del pasado</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sarai-primary/10 p-2 rounded-full mr-3 mt-1">
                    <Video className="h-4 w-4 text-sarai-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pronombres de Objeto Directo e Indirecto</h4>
                    <p className="text-gray-600 text-sm">Guía completa sobre los pronombres en español</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sarai-primary/10 p-2 rounded-full mr-3 mt-1">
                    <Video className="h-4 w-4 text-sarai-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Subjuntivo Presente</h4>
                    <p className="text-gray-600 text-sm">Introducción al modo subjuntivo en español</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="theme-card accent p-6">
              <div className="flex items-center mb-4">
                <Music className="h-6 w-6 text-sarai-accent mr-3" />
                <h3 className="text-xl font-semibold">Recursos Culturales</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-sarai-accent/10 p-2 rounded-full mr-3 mt-1">
                    <Music className="h-4 w-4 text-sarai-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">Canciones Populares con Letras</h4>
                    <p className="text-gray-600 text-sm">Aprende español con canciones de artistas latinoamericanos</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sarai-accent/10 p-2 rounded-full mr-3 mt-1">
                    <BookOpen className="h-4 w-4 text-sarai-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">Lecturas Adaptadas</h4>
                    <p className="text-gray-600 text-sm">Cuentos cortos adaptados para estudiantes de nivel intermedio</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sarai-accent/10 p-2 rounded-full mr-3 mt-1">
                    <FileText className="h-4 w-4 text-sarai-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">Expresiones Idiomáticas</h4>
                    <p className="text-gray-600 text-sm">Las frases más comunes que no encontrarás en los diccionarios</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="avanzado">
          <div className="bg-gradient-to-br from-sarai-lightblue to-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-6">
              <span className="skill-badge mx-1">Debates</span>
              <span className="skill-badge mx-1">Literatura</span>
              <span className="skill-badge mx-1">Negocios</span>
              <span className="skill-badge mx-1">Académico</span>
            </div>
            <p className="text-center text-gray-700 mb-8">
              Los recursos para estudiantes avanzados se proporcionan durante las clases personalizadas según tus intereses y necesidades específicas.
            </p>
            <div className="flex justify-center">
              <Link to="/book" className="btn-primary">
                Reserva tu clase avanzada
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningResources;
