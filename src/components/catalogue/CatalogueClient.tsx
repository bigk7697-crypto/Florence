"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/services";

const CATEGORIES = [
  { name: "Tous les parfums", slug: "all" },
  { name: "Parfums Homme", slug: "parfums-homme" },
  { name: "Parfums Femme", slug: "parfums-femme" },
  { name: "Parfums Arabes", slug: "parfums-arabes" },
  { name: "Huiles Parfumées", slug: "huiles-parfumees" },
];

export default function CatalogueClient({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter(p => p.category?.slug === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "featured") {
      result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="pt-24 pb-16 bg-[#050505] min-h-screen">
      {/* Header */}
      <div className="bg-[#0A0A0A] py-12 border-b border-white/10 mb-8">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Notre Catalogue</h1>
          <p className="text-gray-400 max-w-2xl">
            Explorez notre collection complète de parfums authentiques. Filtrez par catégorie, par marque ou trouvez exactement ce que vous cherchez.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium"
            onClick={() => setShowFiltersMobile(true)}
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filtres & Tri
          </button>

          {/* Sidebar / Filters */}
          <div className={`
            fixed inset-0 z-50 bg-[#0A0A0A] p-6 lg:p-0 lg:bg-transparent lg:static lg:block lg:w-1/4 lg:z-auto transition-transform duration-300
            ${showFiltersMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            <div className="flex justify-between items-center mb-8 lg:hidden">
              <h2 className="text-xl font-bold text-white">Filtres</h2>
              <button onClick={() => setShowFiltersMobile(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8 sticky top-28">
              {/* Search */}
              <div>
                <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Recherche</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Chercher un parfum..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors placeholder:text-gray-600"
                  />
                  <Search className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Catégories</h3>
                <ul className="space-y-2">
                  {CATEGORIES.map(category => (
                    <li key={category.slug}>
                      <button
                        onClick={() => {
                          setActiveCategory(category.slug);
                          setShowFiltersMobile(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          activeCategory === category.slug 
                            ? "bg-[var(--color-brand-gold)] text-black font-medium" 
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold uppercase tracking-wider text-sm">Prix</h3>
                  <span className="text-[var(--color-brand-gold)] text-xs font-bold">
                    max {priceRange[1].toLocaleString('fr-FR')} F
                  </span>
                </div>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="10000" 
                    max="100000" 
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[var(--color-brand-gold)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>10k</span>
                    <span>100k+</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Trier par</h3>
                <select 
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setShowFiltersMobile(false); }}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="featured">Mis en avant</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-400">
                <strong className="text-white">{filteredProducts.length}</strong> produits trouvés
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#111] border border-white/5 rounded-xl p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Aucun parfum trouvé</h3>
                <p className="text-gray-400">Essayez de modifier vos filtres ou votre recherche.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); setPriceRange([0, 100000]); }}
                  className="mt-6 text-[var(--color-brand-gold)] hover:text-white transition-colors underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
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

                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold uppercase tracking-wider text-sm border border-white/50 px-4 py-2 rounded">
                            Rupture de stock
                          </span>
                        </div>
                      )}
                      
                      {product.stock > 0 && (
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
                      )}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
