"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift } from "lucide-react";
import { leadsService } from "@/lib/services";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Vérifier si le popup a déjà été vu ou fermé
    const hasSeenPopup = localStorage.getItem("florence_popup_seen");
    
    if (!hasSeenPopup) {
      // Afficher après 10 secondes
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("florence_popup_seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    await leadsService.saveLead({ email, source: 'popup_club_privilege' });
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Côté Image (Visible sur desktop) */}
            <div className="hidden md:block w-1/3 relative bg-[#111]">
              <img 
                src="/images/logo.png" 
                alt="Florence Parfums" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-lighten"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Contenu */}
            <div className="p-8 md:w-2/3 flex flex-col justify-center">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Bienvenue au Club !</h3>
                  <p className="text-gray-400 text-sm">Vérifiez vos e-mails (et vos spams) pour récupérer votre code promo de -10%.</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-[var(--color-brand-gold)] uppercase tracking-widest text-xs font-semibold mb-2 block">
                      Club Privilège
                    </span>
                    <h2 className="text-2xl font-heading font-bold text-white mb-2">
                      Obtenez -10% sur votre première commande
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Rejoignez notre cercle exclusif pour recevoir nos offres privées et nouveautés en avant-première.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-brand-gold)] text-sm transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[var(--color-brand-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-brand-gold-dark)] transition-colors text-sm"
                    >
                      Rejoindre le Club
                    </button>
                    <p className="text-center text-xs text-gray-600 mt-3">
                      Nous ne partageons jamais vos données.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
