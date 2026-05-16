"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/services";

export default function CataloguePreviewClient({ products }: { products: Product[] }) {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-2xl"
          >
            <span className="text-[var(--color-brand-gold)] uppercase tracking-widest text-sm font-semibold">
              Notre Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              Produits Phares
            </h2>
            <p className="text-gray-400 font-light">
              Découvrez nos parfums les plus prisés. Une sélection minutieuse pour hommes, femmes et amateurs de senteurs orientales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/catalogue"
              className="inline-flex items-center text-[var(--color-brand-gold)] hover:text-white transition-colors group uppercase tracking-wider text-sm font-semibold"
            >
              Voir tout le catalogue
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#111] mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
                
                {product.original_price && (
                  <div className="absolute top-4 left-4 bg-[var(--color-brand-gold)] text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                    Promo
                  </div>
                )}
                
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => {
                      useCartStore.getState().addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0]
                      });
                    }}
                    className="w-full py-3 bg-white text-black font-semibold rounded flex items-center justify-center hover:bg-[var(--color-brand-gold)] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/catalogue/${product.id}`}>
                      <h3 className="text-white font-heading font-semibold text-lg group-hover:text-[var(--color-brand-gold)] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{product.price.toLocaleString('fr-FR')} F</p>
                    {product.original_price && (
                      <p className="text-gray-500 text-xs line-through">{product.original_price.toLocaleString('fr-FR')} F</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
