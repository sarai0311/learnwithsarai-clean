import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimation from '@/components/ScrollAnimation';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Heart, Award, GraduationCap, Users, Star, CheckCircle, Target, Clock, MessageCircle } from 'lucide-react';
const About = () => {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-sarai-ice via-sarai-lightblue to-white py-16 lg:py-24">
          <div className="sarai-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimation direction="left">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-sarai-text mb-6">
                    Meet Your <span className="text-sarai-secondary">Spanish Teacher</span>
                  </h1>
                  <p className="text-lg text-sarai-steel mb-6">
                    Professional, certified, and passionate about helping you achieve fluency in Spanish with personalized lessons from Colombia.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                      <Globe className="h-5 w-5 text-sarai-primary mr-2" />
                      <span className="text-sm font-medium">Native Colombian Speaker</span>
                    </div>
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                      <Award className="h-5 w-5 text-sarai-secondary mr-2" />
                      <span className="text-sm font-medium">Certified Spanish Teacher</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation direction="right">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sarai-primary/10 via-sarai-secondary/10 to-sarai-accent/10 rounded-3xl transform -rotate-6"></div>
                  <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                    <div className="flex justify-center mb-6">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-br from-sarai-primary to-sarai-secondary p-1">
                        <img 
                          src="/sarai-about-profile.jpeg" 
                          alt="Sarai Acevedo - Professional Spanish Teacher"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-sarai-text mb-2">Sarai Acevedo</h3>
                      <p className="text-sarai-steel mb-4">Certified Spanish Teacher</p>
                      <div className="flex justify-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-sarai-background/50 p-3 rounded-lg">
                          <div className="font-bold text-sarai-primary">500+</div>
                          <div className="text-sarai-steel">Happy Students</div>
                        </div>
                        <div className="bg-sarai-background/50 p-3 rounded-lg">
                          <div className="font-bold text-sarai-secondary">15+</div>
                          <div className="text-sarai-steel">Countries</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section className="sarai-section bg-white">
          <div className="sarai-container">
            <ScrollAnimation direction="up" className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-sarai-text mb-6">
                  My Story & Teaching Philosophy
                </h2>
                <p className="text-lg text-sarai-steel leading-relaxed">
                  Born and raised in beautiful Colombia, I've been passionate about languages and education my entire life. 
                  After earning my certification in Spanish as a Foreign Language, I discovered my true calling: 
                  helping people from around the world connect with the Spanish language and Latin American culture.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <ScrollAnimation direction="left" delay={0.2}>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sarai-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-sarai-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-sarai-text mb-2">Passionate Teaching</h3>
                        <p className="text-sarai-steel">
                          Every student is unique, and I believe learning should be enjoyable, practical, and personally meaningful. 
                          I adapt my teaching style to match your learning preferences and goals.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sarai-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="h-6 w-6 text-sarai-secondary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-sarai-text mb-2">Goal-Oriented Approach</h3>
                        <p className="text-sarai-steel">
                          Whether you're learning for travel, business, family connections, or personal growth, 
                          I'll create a customized curriculum that aligns with your specific objectives.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sarai-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-6 w-6 text-sarai-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-sarai-text mb-2">Cultural Immersion</h3>
                        <p className="text-sarai-steel">
                          Learning Spanish isn't just about grammar and vocabulary. I'll share the rich cultural context, 
                          traditions, and nuances that make Spanish-speaking countries so vibrant and diverse.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation direction="right" delay={0.4}>
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-sarai-primary to-sarai-secondary p-6 rounded-xl text-white text-center"
                      >
                        <GraduationCap className="h-12 w-12 mx-auto mb-3" />
                        <div className="text-2xl font-bold">Certified</div>
                        <div className="text-sm opacity-90">Spanish Teacher</div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-sarai-secondary to-sarai-accent p-6 rounded-xl text-white text-center"
                      >
                        <Users className="h-12 w-12 mx-auto mb-3" />
                        <div className="text-2xl font-bold">500+</div>
                        <div className="text-sm opacity-90">Students Taught</div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-sarai-accent to-sarai-primary p-6 rounded-xl text-white text-center"
                      >
                        <Clock className="h-12 w-12 mx-auto mb-3" />
                        <div className="text-2xl font-bold">2000+</div>
                        <div className="text-sm opacity-90">Hours Taught</div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-sarai-primary to-sarai-accent p-6 rounded-xl text-white text-center"
                      >
                        <Globe className="h-12 w-12 mx-auto mb-3" />
                        <div className="text-2xl font-bold">15+</div>
                        <div className="text-sm opacity-90">Countries</div>
                      </motion.div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* What Makes Me Different */}
        <section className="sarai-section bg-gray-50">
          <div className="sarai-container">
            <ScrollAnimation direction="up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sarai-text mb-6">
                What Makes My Teaching Different
              </h2>
              <p className="text-lg text-sarai-steel max-w-3xl mx-auto">
                After years of teaching students from diverse backgrounds, I've developed a unique approach that combines 
                proven pedagogical methods with cultural authenticity and personal attention.
              </p>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollAnimation direction="left" delay={0.2}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="w-16 h-16 bg-sarai-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <BookOpen className="h-8 w-8 text-sarai-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-sarai-text mb-4 text-center">Personalized Materials</h3>
                  <p className="text-sarai-steel text-center">
                    I create custom learning materials for each student based on their interests, professional needs, 
                    and learning style. No generic textbooks here!
                  </p>
                </motion.div>
              </ScrollAnimation>
              
              <ScrollAnimation direction="up" delay={0.4}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="w-16 h-16 bg-sarai-secondary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <MessageCircle className="h-8 w-8 text-sarai-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-sarai-text mb-4 text-center">Real-World Practice</h3>
                  <p className="text-sarai-steel text-center">
                    We practice with real situations you'll encounter, from ordering coffee in Bogotá to 
                    presenting in a business meeting in Mexico City.
                  </p>
                </motion.div>
              </ScrollAnimation>
              
              <ScrollAnimation direction="right" delay={0.6}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="w-16 h-16 bg-sarai-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <CheckCircle className="h-8 w-8 text-sarai-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-sarai-text mb-4 text-center">Ongoing Support</h3>
                  <p className="text-sarai-steel text-center">
                    Learning doesn't stop when class ends. I provide resources, answer questions, 
                    and offer encouragement between sessions.
                  </p>
                </motion.div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-sarai-primary text-white py-16">
          <div className="sarai-container">
            <ScrollAnimation direction="up" className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Spanish Journey?
              </h2>
              <p className="text-xl mb-8">
                Book your first lesson today and discover how enjoyable learning Spanish can be with personalized, one-on-one instruction.
              </p>
              <motion.a 
                href="/book"
                whileHover={{ scale: 1.05, y: -5 }} 
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-sarai-primary hover:bg-gray-100 font-semibold py-3 px-8 text-lg rounded-lg shadow-lg transition-all duration-300"
              >
                Schedule Your First Class
              </motion.a>
            </ScrollAnimation>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
