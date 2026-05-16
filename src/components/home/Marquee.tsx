"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const words = [
    "AUTHENTICITÉ",
    "•",
    "SENTEURS D'ORIENT",
    "•",
    "PARFUMS DE LUXE",
    "•",
    "LOMÉ",
    "•",
    "QUALITÉ GARANTIE",
    "•",
    "PRIX IMBATTABLES",
    "•",
  ];

  // Repeat the array to create a seamless loop
  const marqueeContent = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full bg-[var(--color-brand-gold)] py-3 overflow-hidden border-y border-[var(--color-brand-gold-dark)] flex">
      <motion.div
        className="flex whitespace-nowrap items-center font-heading text-black font-bold text-sm tracking-[0.2em] uppercase"
        animate={{ x: [0, -1035] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {marqueeContent.map((word, index) => (
          <span key={index} className="mx-6">
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
