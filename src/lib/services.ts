import { supabase } from './supabase';

// ============================================================
// TYPE DEFINITIONS
// ============================================================
export type Product = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  brand: string;
  description: string | null;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  stock: number;
  category: { id: string; name: string; slug: string } | null;
  notes_top: string[] | null;
  notes_heart: string[] | null;
  notes_base: string[] | null;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  content: string;
  status: 'pending' | 'approved';
  created_at: string;
};

export type Lead = {
  id?: string;
  email: string;
  source: string;
  created_at?: string;
};

// ============================================================
// FALLBACK DEMO DATA (used when Supabase is not yet configured)
// ============================================================
const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Oud Wood Exclusif",
    brand: "Lattafa",
    price: 45000,
    original_price: 55000,
    description: "Une composition magistrale et luxueuse qui capture l'essence rare et précieuse du bois de oud. Ce parfum oriental s'ouvre sur des épices exotiques pour s'épanouir dans un cœur de bois précieux.",
    images: ["/images/hero_bg.png"],
    is_featured: true,
    is_active: true,
    stock: 10,
    category: { id: "c1", name: "Parfums Arabes", slug: "parfums-arabes" },
    notes_top: ["Bois de Rose", "Cardamome", "Poivre Chinois"],
    notes_heart: ["Bois de Oud rare", "Santal", "Vétiver"],
    notes_base: ["Fève Tonka", "Vanille", "Ambre"],
  },
  {
    id: "2",
    name: "Fleur de Nuit",
    brand: "Paris Fragrance",
    price: 30000,
    original_price: null,
    description: "Une ode à la féminité. Des fleurs blanches magnifiques s'épanouissent sur un fond de bois chauds.",
    images: ["/images/hero_bg.png"],
    is_featured: true,
    is_active: true,
    stock: 8,
    category: { id: "c2", name: "Parfums Femme", slug: "parfums-femme" },
    notes_top: ["Bergamote", "Poire", "Freesia"],
    notes_heart: ["Jasmin", "Rose de Mai", "Muguet"],
    notes_base: ["Musc blanc", "Cèdre", "Ambre"],
  },
  {
    id: "3",
    name: "Sauvage Élégance",
    brand: "Florence Collection",
    price: 55000,
    original_price: 60000,
    description: "Un parfum masculin à la fois sauvage et raffiné. Il mêle la fraîcheur de la lavande provençale à la profondeur du patchouli.",
    images: ["/images/hero_bg.png"],
    is_featured: true,
    is_active: true,
    stock: 5,
    category: { id: "c3", name: "Parfums Homme", slug: "parfums-homme" },
    notes_top: ["Lavande", "Poivre Noir", "Cardamome"],
    notes_heart: ["Bois de Gaïac", "Iris", "Géranium"],
    notes_base: ["Patchouli", "Ambre Gris", "Bois de Cèdre"],
  },
  {
    id: "4",
    name: "Oud Royal",
    brand: "Orient",
    price: 35000,
    original_price: null,
    description: "Un voyage olfactif au cœur de l'Orient. La richesse du oud pur se mêle à des épices envoûtantes pour créer une signature unique.",
    images: ["/images/hero_bg.png"],
    is_featured: false,
    is_active: true,
    stock: 12,
    category: { id: "c1", name: "Parfums Arabes", slug: "parfums-arabes" },
    notes_top: ["Safran", "Cannelle", "Rose"],
    notes_heart: ["Oud", "Encens", "Myrrhe"],
    notes_base: ["Musc", "Ambre", "Benjoin"],
  },
  {
    id: "5",
    name: "Essence Florale",
    brand: "Lattafa",
    price: 25000,
    original_price: 30000,
    description: "Une huile précieuse extraite des plus belles fleurs orientales. À appliquer directement sur la peau pour une tenue exceptionnelle.",
    images: ["/images/hero_bg.png"],
    is_featured: false,
    is_active: true,
    stock: 20,
    category: { id: "c4", name: "Huiles Parfumées", slug: "huiles-parfumees" },
    notes_top: ["Rose", "Jasmin"],
    notes_heart: ["Musc", "Oud"],
    notes_base: ["Santal", "Vanille"],
  },
  {
    id: "6",
    name: "Bois Noir",
    brand: "Orient",
    price: 40000,
    original_price: null,
    description: "Un parfum sombre et magnétique pour l'homme moderne. Une harmonie de bois noirs et de cuir raffiné.",
    images: ["/images/hero_bg.png"],
    is_featured: false,
    is_active: true,
    stock: 7,
    category: { id: "c3", name: "Parfums Homme", slug: "parfums-homme" },
    notes_top: ["Poivre Noir", "Bergamote"],
    notes_heart: ["Cuir", "Vétiver", "Cèdre"],
    notes_base: ["Oud", "Musc Noir", "Ambre"],
  },
];

// ============================================================
// HELPER: Check if Supabase is properly configured
// ============================================================
const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key');
};

// ============================================================
// PRODUCTS SERVICE
// ============================================================
export const productsService = {
  async getAll(): Promise<Product[]> {
    if (!isSupabaseConfigured()) {
      return DEMO_PRODUCTS;
    }
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(id, name, slug)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('[Supabase] Error fetching products, using demo data:', error?.message);
      return DEMO_PRODUCTS;
    }
    return data as Product[];
  },

  async getFeatured(): Promise<Product[]> {
    if (!isSupabaseConfigured()) {
      return DEMO_PRODUCTS.filter(p => p.is_featured);
    }
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(id, name, slug)')
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(4);

    if (error || !data) {
      console.warn('[Supabase] Error fetching featured products, using demo data:', error?.message);
      return DEMO_PRODUCTS.filter(p => p.is_featured);
    }
    return data as Product[];
  },

  async getById(id: string): Promise<Product | null> {
    if (!isSupabaseConfigured()) {
      return DEMO_PRODUCTS.find(p => p.id === id) || null;
    }
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(id, name, slug)')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.warn('[Supabase] Error fetching product, using demo data:', error?.message);
      return DEMO_PRODUCTS.find(p => p.id === id) || null;
    }
    return data as Product;
  },

  async create(product: Omit<Product, 'id' | 'category'> & { category_id?: string }): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Error creating product:', error.message);
      return null;
    }
    return data as Product;
  },

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Error updating product:', error.message);
      return null;
    }
    return data as Product;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Supabase] Error deleting product:', error.message);
      return false;
    }
    return true;
  },
};

// ============================================================
// REVIEWS SERVICE
// ============================================================
export const reviewsService = {
  async getApproved(): Promise<Review[]> {
    if (!isSupabaseConfigured()) {
      return [
        { id: "1", author: "Koffi A.", rating: 5, content: "Le meilleur parfum de Lomé ! Je recommande vivement Florence Parfums.", status: 'approved', created_at: new Date().toISOString() },
        { id: "2", author: "Amina T.", rating: 5, content: "Excellent service et livraison rapide. Les parfums sont 100% authentiques.", status: 'approved', created_at: new Date().toISOString() },
        { id: "3", author: "Jean K.", rating: 4, content: "Très bon rapport qualité-prix. Je suis client fidèle depuis 2 ans.", status: 'approved', created_at: new Date().toISOString() },
        { id: "4", author: "Fatou B.", rating: 5, content: "Vous trouverez tout ce que vous cherchez. Une adresse à ne pas manquer.", status: 'approved', created_at: new Date().toISOString() },
      ];
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as Review[];
  },

  async getAll(): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as Review[];
  },

  async updateStatus(id: string, status: 'approved' | 'pending'): Promise<boolean> {
    const { error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id);
    return !error;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    return !error;
  },
};

// ============================================================
// CATEGORIES SERVICE
// ============================================================
export const categoriesService = {
  async getAll(): Promise<{ id: string; name: string; slug: string }[]> {
    if (!isSupabaseConfigured()) {
      return [
        { id: "c1", name: "Parfums Arabes", slug: "parfums-arabes" },
        { id: "c2", name: "Parfums Femme", slug: "parfums-femme" },
        { id: "c3", name: "Parfums Homme", slug: "parfums-homme" },
        { id: "c4", name: "Huiles Parfumées", slug: "huiles-parfumees" },
      ];
    }
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error || !data) return [];
    return data;
  }
};

// ============================================================
// LEADS SERVICE (Newsletter / Club Privilege)
// ============================================================
export const leadsService = {
  async saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      console.log('[Demo] Lead captured:', lead.email);
      return true;
    }
    const { error } = await supabase
      .from('leads')
      .upsert([lead], { onConflict: 'email' });

    if (error) {
      console.error('[Supabase] Error saving lead:', error.message);
      return false;
    }
    return true;
  },
};
