
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, VolumeX, Volume2, Shuffle, Flag, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const InteractiveTools = () => {
  return (
    <div className="bg-gradient-to-r from-sarai-lightblue to-white py-16">
      <div className="sarai-container">
        <div className="flex flex-col items-center mb-12">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-sarai-text mb-4">
              Herramientas Interactivas
            </h2>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-sarai-skyblue/30 rounded-full opacity-75 floating"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-sarai-secondary/30 rounded-full opacity-75 floating" style={{animationDelay: '1s'}}></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            Acelera tu aprendizaje con estas herramientas divertidas e interactivas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bubble-bg">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-sarai-navy/10 rounded-full">
                    <Flag className="h-8 w-8 text-sarai-navy" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  ¡Palabra del Día!
                </h3>
                <div className="bg-sarai-navy/5 p-4 rounded-lg mb-4">
                  <p className="text-2xl font-bold text-center text-sarai-navy">
                    Resplandor
                  </p>
                  <p className="text-gray-600 text-center italic">
                    (sustantivo) - radiance, glow
                  </p>
                </div>
                <p className="text-gray-700 text-center mb-4">
                  "El resplandor de la luna iluminaba el camino."
                </p>
                <div className="flex justify-center">
                  <button className="flex items-center text-sarai-navy hover:text-sarai-navy/70 transition-colors">
                    <Volume2 className="h-5 w-5 mr-2" />
                    <span>Escuchar pronunciación</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-sarai-primary/10 rounded-full">
                  <Shuffle className="h-8 w-8 text-sarai-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Ejercicio Flash
              </h3>
              <div className="bg-sarai-primary/5 p-4 rounded-lg mb-4">
                <p className="text-center font-medium mb-2">Completa la frase:</p>
                <p className="text-center text-lg">
                  "¿____ hora es? - Son las cinco."
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="bg-white border border-gray-200 rounded py-1 px-3 hover:bg-sarai-primary/10 transition-colors text-center">
                    Qué
                  </button>
                  <button className="bg-white border border-gray-200 rounded py-1 px-3 hover:bg-sarai-primary/10 transition-colors text-center">
                    Cuánta
                  </button>
                  <button className="bg-white border border-gray-200 rounded py-1 px-3 hover:bg-sarai-primary/10 transition-colors text-center">
                    Cuándo
                  </button>
                  <button className="bg-white border border-gray-200 rounded py-1 px-3 hover:bg-sarai-primary/10 transition-colors text-center">
                    Cuál
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <button className="text-sarai-primary hover:text-sarai-primary/70 font-medium transition-colors">
                  Ver respuesta
                </button>
              </div>
            </CardContent>
          </Card>
          
          <div className="bubble-bg">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-sarai-skyblue/20 rounded-full">
                    <MessageSquare className="h-8 w-8 text-sarai-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Expresión Útil
                </h3>
                <div className="bg-sarai-skyblue/10 p-4 rounded-lg mb-4 wiggle">
                  <p className="text-center text-xl font-bold text-sarai-accent mb-1">
                    ¡Qué chévere!
                  </p>
                  <p className="text-center text-gray-600">
                    How cool! / That's awesome!
                  </p>
                </div>
                <p className="text-gray-700 text-center text-sm mb-3">
                  Una expresión muy común en Colombia y Venezuela para expresar que algo es genial o interesante.
                </p>
                <div className="flex justify-center">
                  <Link to="/book" className="text-sarai-accent hover:text-sarai-accent/70 font-medium flex items-center transition-colors">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Aprende más en clase</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/book" className="btn-primary inline-flex items-center shadow-lg hover:shadow-sarai-primary/30">
            <BookOpen className="mr-2 h-5 w-5" />
            Reserva una clase por solo $9.99
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTools;
