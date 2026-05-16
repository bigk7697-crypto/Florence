"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { productsService, type Product } from "@/lib/services";

type ModalMode = "add" | "edit" | null;

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", brand: "", price: 0, original_price: 0, description: "", stock: 0, is_featured: false,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const data = await productsService.getAll();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openAddModal = () => {
    setSelectedProduct(null);
    setForm({ name: "", brand: "", price: 0, original_price: 0, description: "", stock: 0, is_featured: false });
    setModalMode("add");
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      name: product.name,
      brand: product.brand,
      price: product.price,
      original_price: product.original_price || 0,
      description: product.description || "",
      stock: product.stock,
      is_featured: product.is_featured,
    });
    setModalMode("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "add") {
      await productsService.create({
        ...form,
        original_price: form.original_price || null,
        images: ["/images/hero_bg.png"],
        is_active: true,
        notes_top: null, notes_heart: null, notes_base: null,
      });
    } else if (modalMode === "edit" && selectedProduct) {
      await productsService.update(selectedProduct.id, {
        ...form,
        original_price: form.original_price || null,
      });
    }
    setModalMode(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    await productsService.delete(id);
    setDeleteConfirmId(null);
    fetchProducts();
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Produits</h1>
          <p className="text-gray-400 text-sm">
            {loading ? "Chargement..." : `${products.length} produits dans la base de données.`}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button onClick={fetchProducts} className="p-2 text-gray-400 hover:text-white transition-colors">
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-[var(--color-brand-gold)] text-black font-semibold rounded hover:bg-[var(--color-brand-gold-dark)] transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un produit
          </button>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111]">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[var(--color-brand-gold)] text-sm"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
          <div className="text-sm text-gray-400 ml-4 whitespace-nowrap">
            {filteredProducts.length} résultat(s)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Produit</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Catégorie / Marque</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prix</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Mis en avant</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-[#0A0A0A]/50">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-500">Chargement des produits...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-500">Aucun produit trouvé.</td></tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden bg-gray-800">
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{product.category?.name || "—"}</div>
                      <div className="text-sm text-gray-500">{product.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--color-brand-gold)] font-medium">{product.price.toLocaleString('fr-FR')} F</div>
                      {product.original_price && (
                        <div className="text-xs text-gray-500 line-through">{product.original_price.toLocaleString('fr-FR')} F</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `En stock (${product.stock})` : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.is_featured ? (
                        <CheckCircle className="w-5 h-5 text-[var(--color-brand-gold)]" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-600" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteConfirmId === product.id ? (
                        <div className="flex items-center justify-end space-x-2">
                          <span className="text-xs text-red-400">Confirmer ?</span>
                          <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-400 text-xs font-bold">Oui</button>
                          <button onClick={() => setDeleteConfirmId(null)} className="text-gray-400 hover:text-white text-xs">Non</button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => openEditModal(product)} className="text-gray-400 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirmId(product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setModalMode(null)} />
          <div className="relative z-10 w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              {modalMode === "add" ? "Ajouter un produit" : `Modifier : ${selectedProduct?.name}`}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Nom *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--color-brand-gold)]"
                    placeholder="Ex: Oud Wood Exclusif" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Marque *</label>
                  <input required value={form.brand} onChange={e => setForm({...form, brand: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--color-brand-gold)]"
                    placeholder="Ex: Lattafa" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Prix (FCFA) *</label>
                  <input required type="number" value={form.price} onChange={e => setForm({...form, price: parseInt(e.target.value)})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--color-brand-gold)]"
                    placeholder="Ex: 45000" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Prix barré (optionnel)</label>
                  <input type="number" value={form.original_price || ""} onChange={e => setForm({...form, original_price: parseInt(e.target.value) || 0})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--color-brand-gold)]"
                    placeholder="Ex: 55000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value)})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--color-brand-gold)]" />
                </div>
                <div className="flex items-center pt-6">
                  <input type="checkbox" id="is_featured" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})}
                    className="w-4 h-4 accent-[var(--color-brand-gold)] mr-3" />
                  <label htmlFor="is_featured" className="text-sm text-gray-300">Afficher en page d'accueil</label>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--color-brand-gold)] resize-none"
                  placeholder="Description du parfum..." />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setModalMode(null)} className="flex-1 py-3 border border-white/10 text-gray-400 rounded-lg hover:text-white hover:border-white/30 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex-1 py-3 bg-[var(--color-brand-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-brand-gold-dark)] transition-colors">
                  {modalMode === "add" ? "Ajouter" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
