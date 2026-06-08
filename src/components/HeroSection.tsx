'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';

const WHATSAPP_NUMBER = '573113266223';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola Psic. Liyiveth, vi tu página y quiero agendar mi cita.'
);

const HeroSection = () => {
  const handleScheduleClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fafc] to-white" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#bec5a4]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-[#bec5a4]/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto max-w-5xl py-24 lg:py-32">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#bec5a4]/40" />
              <span className="text-sm tracking-[0.25em] font-light text-[#bec5a4] uppercase">
                Psicóloga experta en Ansiedad Relacional y Manejo del estrés
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#bec5a4]/40" />
            </div>

            <blockquote className="text-gray-500 font-light italic text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
              &ldquo;El odio despierta rencillas; Pero el amor cubrirá todas las faltas.&rdquo;
              <span className="block mt-1 text-[#bec5a4] not-italic text-xs tracking-widest">
                Proverbios 10:12
              </span>
            </blockquote>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
              ¿Sientes que tu mente no se apaga y vives en{' '}
              <span className="text-[#bec5a4]">modo supervivencia?</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Te ayudo a recuperar la paz, sanar tus vínculos y regular tu sistema nervioso
              a través de la psicoterapia y el diálogo clínico.
            </p>
          </div>

          <motion.button
            onClick={handleScheduleClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center space-x-3 px-10 py-4 bg-[#bec5a4] text-white rounded-xl
                     font-light tracking-wide hover:bg-[#a0a78c] transition-colors duration-300
                     shadow-lg hover:shadow-xl"
          >
            <Calendar className="w-5 h-5" />
            <span>Quiero agendar mi cita</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
