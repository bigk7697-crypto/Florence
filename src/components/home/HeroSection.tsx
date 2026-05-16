"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero_bg.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="block text-[var(--color-brand-gold)] tracking-[0.3em] text-sm md:text-base font-semibold uppercase"
          >
            L'excellence du parfum à Lomé
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
            Sentez la <span className="text-[var(--color-brand-gold)]">Différence</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Parfums authentiques, prix imbattables. Votre boutique de référence pour les parfums de qualité supérieure, orientaux et huiles parfumées.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link 
              href="/catalogue"
              className="w-full sm:w-auto px-8 py-4 bg-[var(--color-brand-gold)] text-black font-semibold rounded hover:bg-[var(--color-brand-gold-dark)] transition-all flex items-center justify-center group"
            >
              Découvrir la Collection
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="https://maps.google.com/?q=6.2330002,1.1976249"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded hover:bg-white hover:text-black transition-all flex items-center justify-center glass-dark"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Nous Localiser
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-[var(--color-brand-gold)] absolute top-0"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
