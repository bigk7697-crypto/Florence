"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching initial data, fonts, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo text animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-heading font-bold text-white tracking-widest mb-4"
            >
              FLORENCE
            </motion.div>
            
            {/* Subtitle animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[var(--color-brand-gold)] uppercase tracking-[0.3em] text-xs font-light"
            >
              Parfums & Senteurs
            </motion.div>

            {/* Loading line */}
            <div className="absolute -bottom-12 w-32 h-[1px] bg-white/10 overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-full bg-[var(--color-brand-gold)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
