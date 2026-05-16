"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling down 300px
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <a
        href="https://wa.me/22896979815"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] group"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-black text-sm font-medium py-1.5 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Besoin d'aide ?
        </span>
      </a>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></div>
    </motion.div>
  );
}
