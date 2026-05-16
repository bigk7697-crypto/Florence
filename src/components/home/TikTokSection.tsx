"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function TikTokSection() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FE2C55]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#25F4EE]/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className="text-xl font-bold text-white tracking-wider">TikTok</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              Rejoignez notre communauté
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Découvrez nos nouveautés, astuces parfums, unboxings exclusifs et témoignages clients en vidéo. Ne manquez aucune promotion !
            </p>
            
            <div className="pt-4">
              <a 
                href="https://www.tiktok.com/@florenceparfums2024" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors group"
              >
                Suivre @florenceparfums2024
                <svg className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* TikTok Mockup Video Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl shadow-[#FE2C55]/20 group cursor-pointer"
          >
            <img 
              src="/images/hero_bg.png" 
              alt="TikTok Preview"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
            
            {/* Fake TikTok UI elements */}
            <div className="absolute bottom-4 left-4 right-16 text-white text-sm">
              <p className="font-bold mb-1">@florenceparfums2024</p>
              <p className="line-clamp-2 text-xs opacity-90">Découvrez le nouveau parfum Lattafa disponible en boutique ! 🌟✨ #parfum #lome #togo</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
