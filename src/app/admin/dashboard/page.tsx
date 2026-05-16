"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Package, Tags, MessageSquare, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: 'Total Produits', stat: '124', icon: Package, change: '+4.75%', changeType: 'positive' },
    { name: 'Catégories', stat: '8', icon: Tags, change: '0%', changeType: 'neutral' },
    { name: 'Avis Clients', stat: '45', icon: MessageSquare, change: '+12.5%', changeType: 'positive' },
    { name: 'Visites ce mois', stat: '2,450', icon: TrendingUp, change: '+18.2%', changeType: 'positive' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Tableau de Bord</h1>
        <p className="text-gray-400">Bienvenue sur l'espace d'administration de Florence Parfums.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="glass p-6 rounded-xl relative overflow-hidden">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-8 w-8 text-[var(--color-brand-gold)]" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">{item.name}</dt>
                  <dd>
                    <div className="text-2xl font-bold text-white">{item.stat}</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className={`text-sm ${
                item.changeType === 'positive' ? 'text-green-400' : 
                item.changeType === 'negative' ? 'text-red-400' : 'text-gray-500'
              }`}>
                {item.change} par rapport au mois dernier
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Derniers Produits Ajoutés</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#111] rounded-lg border border-white/5">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Image</div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white">Parfum Exemple {i}</p>
                    <p className="text-xs text-gray-400">Catégorie XYZ</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-[var(--color-brand-gold)]">
                  45,000 F
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Derniers Avis</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-[#111] rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Client {i}</span>
                  <div className="flex text-[var(--color-brand-gold)]">
                    ★ ★ ★ ★ ★
                  </div>
                </div>
                <p className="text-sm text-gray-400">"Très satisfait de mon achat, le parfum sent divinement bon !"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
