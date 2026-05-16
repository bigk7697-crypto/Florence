"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16 space-y-4">
          <span className="text-[var(--color-brand-gold)] uppercase tracking-widest text-sm font-semibold">
            Nous Trouver
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Venez Découvrir Nos Senteurs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Info Contact */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 md:p-12 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-white mb-8">Informations Pratiques</h3>
              
              <ul className="space-y-8">
                <li className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-brand-gold)]/10 flex items-center justify-center mr-6 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[var(--color-brand-gold)]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Adresse de la Boutique</h4>
                    <p className="text-gray-400 font-light">À côté de la station CAP Agoe Assiyeyé<br />Lomé, Togo</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-brand-gold)]/10 flex items-center justify-center mr-6 flex-shrink-0">
                    <Phone className="w-6 h-6 text-[var(--color-brand-gold)]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Téléphone & WhatsApp</h4>
                    <a href="https://wa.me/22896979815" className="text-gray-400 font-light hover:text-[var(--color-brand-gold)] transition-colors">
                      +228 96 97 98 15
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-brand-gold)]/10 flex items-center justify-center mr-6 flex-shrink-0">
                    <Clock className="w-6 h-6 text-[var(--color-brand-gold)]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Horaires d'Ouverture</h4>
                    <div className="text-gray-400 font-light grid grid-cols-2 gap-x-4 w-48">
                      <span>Lundi - Samedi :</span>
                      <span className="text-right">9h - 20h</span>
                      <span>Dimanche :</span>
                      <span className="text-right">Fermé</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <a 
                href="https://maps.google.com/?q=6.2330002,1.1976249"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[var(--color-brand-gold)] text-black font-semibold rounded hover:bg-[var(--color-brand-gold-dark)] transition-colors flex items-center justify-center"
              >
                Obtenir l'itinéraire complet
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden h-[400px] lg:h-auto min-h-[400px] relative border border-white/10"
          >
            {/* Embedded Google Maps */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.4735237775936!2d1.1965305886676395!3d6.233005548658824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnNTguOCJOIDHCsDExJzUxLjUiRQ!5e0!3m2!1sfr!2stg!4v1700000000000!5m2!1sfr!2stg" 
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Overlay for styling - pointer-events-none so we can interact with map */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
