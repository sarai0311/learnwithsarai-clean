import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

const EnhancedTestimonials = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: "Jahquahiel",
      country: "United States",
      flag: "us",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Sarai has to be one of the best teachers I've found online, she has kept the same positive energy since day one and I feel like I've already learned so much in one month. 10/10 would recommend!",
      months: "1 month of classes"
    },
    {
      name: "Neil",
      country: "United Kingdom", 
      flag: "gb",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      text: "I just finished my lesson with Sarai and right from the start I saw she came well prepared for the class and was extremely professional, and a super warm and nice person who is ready to help you with whatever you need to improve your Spanish.",
      months: "2 months of classes"
    },
    {
      name: "Caleb",
      country: "United States",
      flag: "us", 
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      text: "Sarai is kind and incredibly patient. She's a great listener and seems very adaptable. Her specialty is flexibility and conversation. Unlike most online teachers I've tried, Sarai will adjust to meet your needs.",
      months: "3 months of classes"
    },
    {
      name: "Sophie Williams",
      country: "United Kingdom",
      flag: "gb",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      text: "Classes with Sarai have been incredible. Her personalized approach and infinite patience have helped me gain confidence in speaking Spanish. Now I can communicate much better during my travels!",
      months: "4 months of classes"
    },
    {
      name: "Marco Rodriguez",
      country: "United States",
      flag: "us",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/18.jpg",
      text: "Learning Spanish with Sarai has been an amazing experience. Her teaching method is very effective and she always adapts to my learning pace. I highly recommend her to anyone wanting to learn Spanish!",
      months: "5 months of classes"
    },
    {
      name: "Emma Johnson",
      country: "Canada",
      flag: "ca",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      text: "Sarai is an exceptional teacher! Her classes are always engaging and fun. She has helped me improve my pronunciation and confidence in speaking Spanish significantly. Thank you, Sarai!",
      months: "6 months of classes"
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-sarai-background via-white to-sarai-lightblue overflow-hidden">
      <div className="sarai-container">
        <ScrollAnimation direction="up" className="text-center mb-16 relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
          >
            <Quote className="h-24 w-24 text-sarai-primary/15" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-sarai-text mb-6 decorated-heading">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-sarai-steel max-w-3xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-6 h-1 bg-gradient-to-r from-sarai-primary to-sarai-secondary rounded-full"
          />
        </ScrollAnimation>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <ScrollAnimation direction="up" delay={0.1}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative mx-auto max-w-2xl"
                    >
                      <div className="absolute -top-4 left-8">
                        <Quote className="h-8 w-8 text-sarai-primary bg-white p-1 rounded-full shadow-lg" />
                      </div>
                      
                      <div className="flex items-start space-x-4 mb-6">
                        <motion.img
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-2 border-sarai-primary/20 shadow-md"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-bold text-sarai-text text-lg">{testimonial.name}</h4>
                            <span className="text-2xl">
                              {testimonial.flag === 'us' && '🇺🇸'}
                              {testimonial.flag === 'gb' && '🇬🇧'}
                              {testimonial.flag === 'ca' && '🇨🇦'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{testimonial.country}</p>
                          <div className="flex space-x-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                              >
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              </motion.div>
                            ))}
                          </div>
                          <span className="text-xs bg-sarai-primary/10 text-sarai-primary px-2 py-1 rounded-full font-medium">
                            {testimonial.months}
                          </span>
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                        "{testimonial.text}"
                      </blockquote>
                    </motion.div>
                  </ScrollAnimation>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 text-sarai-primary hover:bg-sarai-primary hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 text-sarai-primary hover:bg-sarai-primary hover:text-white transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-sarai-primary scale-125' 
                    : 'bg-gray-300 hover:bg-sarai-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <ScrollAnimation direction="up" delay={0.4} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { number: "500+", label: "Happy Students" },
              { number: "15+", label: "Countries" },
              { number: "4.9/5", label: "Average Rating" },
              { number: "2000+", label: "Classes Taught" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-3xl font-bold text-sarai-primary mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default EnhancedTestimonials;
