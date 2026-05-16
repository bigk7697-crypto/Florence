"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, Star, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function ReviewsAdmin() {
  const [searchQuery, setSearchQuery] = useState("");

  const reviews = [
    { id: "1", author: "Koffi A.", rating: 5, content: "Le meilleur parfum de Lomé ! Je recommande vivement Florence Parfums.", status: 'approved', date: '2024-05-10' },
    { id: "2", author: "Amina T.", rating: 5, content: "Excellent service et livraison rapide. Les parfums sont 100% authentiques.", status: 'pending', date: '2024-05-12' },
    { id: "3", author: "Jean K.", rating: 4, content: "Très bon rapport qualité-prix. Je suis client fidèle depuis 2 ans.", status: 'approved', date: '2024-05-08' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Avis Clients</h1>
        <p className="text-gray-400 text-sm">Gérez les témoignages et avis laissés par vos clients.</p>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111]">
          <div className="relative w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Rechercher un avis..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[var(--color-brand-gold)] text-sm"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
          
          <div className="text-sm text-gray-400">
            Total: {reviews.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Auteur</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avis</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Note</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-[#0A0A0A]/50">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {review.author}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-400 truncate">{review.content}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{review.date}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex text-[var(--color-brand-gold)]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      review.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.status === 'approved' ? 'Approuvé' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {review.status === 'pending' ? (
                        <button className="text-green-500 hover:text-green-400 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="text-gray-500 hover:text-gray-400 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
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
