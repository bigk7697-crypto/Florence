"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    author: "Koffi A.",
    content: "The best perfume shop in Lomé! Je recommande vivement pour la qualité des parfums.",
    rating: 5,
  },
  {
    id: 2,
    author: "Amina T.",
    content: "A benchmark for genuine perfume and unbeatable prices. Le service est impeccable.",
    rating: 5,
  },
  {
    id: 3,
    author: "Jean-Paul",
    content: "I bought some very good quality perfumes and the prices are very affordable.",
    rating: 4,
  },
];

export default function ReviewsCarousel() {
  return (
    <section id="reviews" className="py-24 bg-[#0A0A0A] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[var(--color-brand-gold)] uppercase tracking-widest text-sm font-semibold">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Ils Nous Font Confiance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[var(--color-brand-gold)]/20 group-hover:text-[var(--color-brand-gold)]/40 transition-colors" />
              
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < review.rating ? "text-[var(--color-brand-gold)] fill-[var(--color-brand-gold)]" : "text-gray-600"}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 italic mb-6 leading-relaxed relative z-10">
                "{review.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-gold)]/20 flex items-center justify-center mr-4">
                  <span className="text-[var(--color-brand-gold)] font-bold text-lg">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{review.author}</h4>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Client Vérifié</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
