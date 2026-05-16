"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Gem } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[var(--color-brand-gold)]" />,
    title: "100% Authentique",
    description: "Nous garantissons l'authenticité absolue de tous nos parfums. Des marques de prestige directement sourcées.",
  },
  {
    icon: <Gem className="w-8 h-8 text-[var(--color-brand-gold)]" />,
    title: "Qualité Premium",
    description: "Une sélection rigoureuse des meilleures fragrances mondiales et orientales.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-[var(--color-brand-gold)]" />,
    title: "Prix Imbattables",
    description: "Le luxe accessible. Nous proposons les meilleurs prix sur le marché de Lomé.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-gold)]/20 to-transparent" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[var(--color-brand-gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-10 w-96 h-96 bg-[var(--color-brand-gold)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[var(--color-brand-gold)] uppercase tracking-widest text-sm font-semibold">
                Notre Histoire
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                L'art de la parfumerie <br/>à votre portée.
              </h2>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Chez <strong className="text-white font-normal">FLORENCE parfums & Senteurs</strong>, nous croyons que le luxe ne devrait pas être un privilège inaccessible. Basés à Lomé, nous sommes passionnés par l'art subtil des fragrances.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Notre mission est simple : vous offrir les marques les plus prestigieuses, des parfums orientaux envoûtants et des huiles parfumées concentrées, le tout avec une garantie d'authenticité absolue et à des prix défiant toute concurrence.
            </p>

            <div className="space-y-4 pt-4">
              {['Service client d\'excellence', 'Large collection de marques', 'Conseils personnalisés'].map((item, i) => (
                <div key={i} className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-[var(--color-brand-gold)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`p-8 rounded-2xl glass-dark hover:border-[var(--color-brand-gold)]/30 transition-colors ${
                  index === 2 ? "sm:col-span-2 sm:w-1/2 sm:mx-auto" : ""
                }`}
              >
                <div className="mb-6 inline-block p-4 rounded-full bg-[var(--color-brand-gold)]/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
