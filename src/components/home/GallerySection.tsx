"use client";

import { motion } from "framer-motion";

const GALLERY = [
  { id: 1, src: "/images/hero_bg.png", alt: "Intérieur de la boutique", className: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/images/hero_bg.png", alt: "Collection de parfums" },
  { id: 3, src: "/images/hero_bg.png", alt: "Parfum gros plan" },
  { id: 4, src: "/images/hero_bg.png", alt: "Client satisfait" },
  { id: 5, src: "/images/hero_bg.png", alt: "Vitrine de la boutique" },
];

export default function GallerySection() {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[var(--color-brand-gold)] uppercase tracking-widest text-sm font-semibold">
            L'Univers Florence
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Notre Galerie
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[250px]">
          {GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.className || ''}`}
            >
              <img 
                src={item.src} 
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-wide uppercase text-sm border border-white/50 px-4 py-2 rounded glass">
                  Agrandir
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
