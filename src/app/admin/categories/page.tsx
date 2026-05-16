"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";

export default function CategoriesAdmin() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "1", name: "Parfums Homme", slug: "parfums-homme", count: 45 },
    { id: "2", name: "Parfums Femme", slug: "parfums-femme", count: 38 },
    { id: "3", name: "Parfums Arabes", slug: "parfums-arabes", count: 24 },
    { id: "4", name: "Huiles Parfumées", slug: "huiles-parfumees", count: 17 },
  ];

  return (
    <AdminLayout>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Catégories</h1>
          <p className="text-gray-400 text-sm">Gérez les catégories de produits de votre boutique.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="flex items-center px-4 py-2 bg-[var(--color-brand-gold)] text-black font-semibold rounded hover:bg-[var(--color-brand-gold-dark)] transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Catégorie
          </button>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111]">
          <div className="relative w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Rechercher une catégorie..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[var(--color-brand-gold)] text-sm"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
          
          <div className="text-sm text-gray-400">
            Total: {categories.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Catégorie</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Slug</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre de produits</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-[#0A0A0A]/50">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-800 rounded flex items-center justify-center">
                        <Tag className="w-5 h-5 text-[var(--color-brand-gold)]" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{category.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {category.count} produits
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
