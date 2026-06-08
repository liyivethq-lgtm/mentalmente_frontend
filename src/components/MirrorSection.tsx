'use client';

import { motion } from 'framer-motion';
import { Heart, Brain, Activity } from 'lucide-react';

const mirrorItems = [
  {
    category: 'En el cuerpo',
    icon: <Activity className="w-6 h-6" />,
    text: 'Insomnio, aceleración, opresión en el pecho y cansancio crónico.',
  },
  {
    category: 'En la mente',
    icon: <Brain className="w-6 h-6" />,
    text: 'Sobrepensar todo el día, miedo al rechazo y la necesidad de querer controlarlo todo.',
  },
  {
    category: 'En tus relaciones',
    icon: <Heart className="w-6 h-6" />,
    text: 'Ansiedad por separaciones, rupturas amorosas y el vacío que deja un bloqueo emocional.',
  },
];

const MirrorSection = () => {
  return (
    <section className="relative py-24 px-6 lg:px-8 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bec5a4]/20 to-transparent" />

      <div className="relative container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-sm tracking-[0.3em] font-light text-gray-500 uppercase">
              El Espejo
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-light text-gray-900">
            Donde la gente lee lo que le pasa
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {mirrorItems.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="absolute -inset-2 rounded-2xl bg-[#bec5a4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm
                            group-hover:border-[#bec5a4]/30 transition-all duration-500 h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6
                              bg-gradient-to-br from-[#bec5a4]/15 to-[#bec5a4]/5 border border-[#bec5a4]/20">
                  <div className="text-[#bec5a4]">{item.icon}</div>
                </div>

                <h3 className="text-lg font-light text-gray-900 mb-4">{item.category}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MirrorSection;
