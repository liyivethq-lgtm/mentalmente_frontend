'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const WHATSAPP_NUMBER = '573113266223';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola Psic. Liyiveth, quiero empezar mi proceso terapéutico.'
);

const ClosingSection = () => {
  const handleStartClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
  };

  return (
    <section className="relative py-32 px-6 lg:px-8 bg-gradient-to-b from-white to-[#f8fafc] overflow-hidden">
      <div className="relative container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="relative p-10 lg:p-14 rounded-3xl border border-gray-200/40 bg-white/60 backdrop-blur-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#bec5a4] rounded-full">
              <span className="text-xs font-light text-white tracking-widest uppercase">Cierre</span>
            </div>

            <p className="text-lg lg:text-xl text-gray-700 font-light leading-relaxed italic">
              El verdadero éxito de una práctica clínica no radica en saturar una pantalla con títulos
              inalcanzables, sino en tender un puente de palabras honestas donde el dolor del otro se
              sienta comprendido, validado y respetado.
            </p>
          </div>

          <motion.button
            onClick={handleStartClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center space-x-3 px-10 py-4 bg-[#bec5a4] text-white rounded-xl
                     font-light tracking-wide hover:bg-[#a0a78c] transition-colors duration-300
                     shadow-lg hover:shadow-xl"
          >
            <span>Quiero empezar</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSection;
