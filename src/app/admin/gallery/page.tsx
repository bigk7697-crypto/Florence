"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

export default function GalleryAdmin() {
  const images = [
    { id: "1", url: "/images/hero_bg.png", title: "Ambiance Boutique" },
    { id: "2", url: "/images/hero_bg.png", title: "Collection Oud" },
    { id: "3", url: "/images/hero_bg.png", title: "Coffret Cadeau" },
    { id: "4", url: "/images/hero_bg.png", title: "Détails Flacon" },
  ];

  return (
    <AdminLayout>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Galerie Photos</h1>
          <p className="text-gray-400 text-sm">Gérez les photos affichées dans la galerie du site.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="flex items-center px-4 py-2 bg-[var(--color-brand-gold)] text-black font-semibold rounded hover:bg-[var(--color-brand-gold-dark)] transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter une photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="group relative glass rounded-xl overflow-hidden aspect-square">
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
              <p className="text-white text-sm font-medium mb-4">{image.title}</p>
              <button className="p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Add placeholder */}
        <button className="glass rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)]/50 transition-all aspect-square">
          <ImageIcon className="w-10 h-10 mb-2" />
          <span className="text-xs uppercase tracking-wider font-semibold">Téléverser</span>
        </button>
      </div>
    </AdminLayout>
  );
}
