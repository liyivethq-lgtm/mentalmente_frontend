'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Precalcular posiciones de las partículas con redondeo fijo para evitar mismatches de hidratación
const particleCount = 12;
const particleRadius = 70;
const particles = Array.from({ length: particleCount }, (_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  const top = (Math.sin(angle) * particleRadius).toFixed(4);
  const left = (Math.cos(angle) * particleRadius).toFixed(4);
  return { top, left };
});

export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#fafbf8] to-[#eef0e9]">
      {/* Sistema orbital mejorado */}
      <div className="relative mb-8 w-48 h-48">
        {/* Órbita externa - verde más claro, rotación lenta antihoraria */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#bec5a4]/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#bec5a4] shadow-lg shadow-[#bec5a4]/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          />
        </motion.div>

        {/* Órbita media - verde medio, rotación horaria más rápida */}
        <motion.div
          className="absolute inset-3 rounded-full border border-[#9fa68c]/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#9fa68c] shadow-lg shadow-[#9fa68c]/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
          />
        </motion.div>

        {/* Órbita interna - verde más oscuro, rotación variable con efecto de rebote */}
        <motion.div
          className="absolute inset-6 rounded-full border border-[#8a9379]/50"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#bec5a4] to-[#6d7a5c] shadow-xl"
            animate={{ rotate: [0, -180, -360] }}
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
          />
        </motion.div>

        {/* Logo central con doble resplandor pulsante */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-[#bec5a4]/20 blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-14 h-14 rounded-full bg-[#9fa68c]/30 blur-md"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <div className="relative w-16 h-16 z-10">
            <Image
              src="/logo-sana-tu.png"
              alt="SanaTú"
              fill
              sizes="64px"
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Partículas flotantes alrededor - con posiciones fijas */}
        {particles.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#bec5a4]"
            style={{
              top: `calc(50% + ${pos.top}px)`,
              left: `calc(50% + ${pos.left}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Texto animado */}
      <div className="mt-6 text-center">
        <motion.p
          className="text-xl font-light text-[#4a4f3f] tracking-wide"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Preparando tu espacio de bienestar
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3 }}
          >
            ...
          </motion.span>
        </motion.p>

        <motion.p
          className="mt-2 text-sm text-[#7f8c7a] font-medium"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          SanaTú · Transformando vidas
        </motion.p>

        {/* Línea decorativa inferior */}
        <motion.div
          className="mt-4 mx-auto h-0.5 w-32 rounded-full bg-gradient-to-r from-transparent via-[#bec5a4] to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}