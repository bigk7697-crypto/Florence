"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Percent, Edit, Trash2, Calendar } from "lucide-react";

export default function PromotionsAdmin() {
  const promotions = [
    { id: "1", title: "Offre Ramadan", discount: "20%", expiry: "2024-04-15", status: 'active' },
    { id: "2", title: "Fête des Mères", discount: "15%", expiry: "2024-05-30", status: 'upcoming' },
  ];

  return (
    <AdminLayout>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Promotions & Codes</h1>
          <p className="text-gray-400 text-sm">Gérez les offres spéciales et les réductions.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="flex items-center px-4 py-2 bg-[var(--color-brand-gold)] text-black font-semibold rounded hover:bg-[var(--color-brand-gold-dark)] transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Créer une offre
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo) => (
          <div key={promo.id} className="glass p-6 rounded-xl relative overflow-hidden flex justify-between items-start">
            <div className="flex items-start">
              <div className="h-12 w-12 bg-[var(--color-brand-gold)]/10 rounded-lg flex items-center justify-center mr-4">
                <Percent className="w-6 h-6 text-[var(--color-brand-gold)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{promo.title}</h3>
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  Expire le {promo.expiry}
                </div>
                <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full ${
                  promo.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {promo.status === 'active' ? 'En cours' : 'À venir'}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-[var(--color-brand-gold)] mb-4">-{promo.discount}</div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
