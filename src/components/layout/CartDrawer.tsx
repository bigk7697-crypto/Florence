"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, updateQuantity, removeItem, cartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cartTotal();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Bonjour Florence Parfums, je souhaite commander :\n\n";
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA)\n`;
    });
    message += `\nTotal estimé : ${total.toLocaleString('fr-FR')} FCFA\n\nMerci !`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/22896979815?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-heading font-bold text-white flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3 text-[var(--color-brand-gold)]" />
                Votre Panier
                <span className="ml-3 text-sm font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                  {items.length} {items.length > 1 ? 'articles' : 'article'}
                </span>
              </h2>
              <button 
                onClick={toggleCart}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag className="w-16 h-16 text-gray-500" />
                  <p className="text-gray-400">Votre panier est vide.</p>
                  <button 
                    onClick={toggleCart}
                    className="text-[var(--color-brand-gold)] hover:underline underline-offset-4"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#111] flex-shrink-0 border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium text-sm leading-tight pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[var(--color-brand-gold)] text-sm font-semibold mt-1">
                          {item.price.toLocaleString('fr-FR')} F
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-white/5 w-fit rounded-lg p-1 border border-white/10">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#050505]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Total estimé</span>
                  <span className="text-xl font-bold text-white">
                    {total.toLocaleString('fr-FR')} F
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[var(--color-brand-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-brand-gold-dark)] transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Commander sur WhatsApp</span>
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Le paiement se fera à la livraison ou par TMoney/Flooz.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
