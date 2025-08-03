import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { 
      code: 'en' as const, 
      name: 'English', 
      flag: '🇺🇸',
      nativeName: 'English'
    },
    { 
      code: 'es' as const, 
      name: 'Español', 
      flag: '🇪🇸',
      nativeName: 'Español'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Select value={language} onValueChange={(value: 'en' | 'es') => setLanguage(value)}>
        <SelectTrigger className="w-[120px] h-10 bg-white/90 border border-gray-200 hover:bg-white hover:border-sarai-primary/50 transition-all duration-200 focus:ring-sarai-primary/20">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{currentLanguage?.flag}</span>
              <span className="text-sm font-medium text-gray-700">
                {currentLanguage?.nativeName}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="hover:bg-sarai-primary/10 focus:bg-sarai-primary/10 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500">{lang.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default LanguageSelector; 