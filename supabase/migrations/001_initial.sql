-- Activer l'extension pgcrypto pour les UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Création des tables

-- Table Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table Promotions
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent >= 0 AND discount_percent <= 100),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL, -- Prix en FCFA (entier)
    original_price INTEGER, -- Ancien prix si promotion
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    brand VARCHAR(255),
    volume VARCHAR(50), -- ex: "100ml", "50ml"
    in_stock BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    promotion_id UUID REFERENCES promotions(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table Reviews (Témoignages)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table Gallery
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table Settings
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configuration de Row Level Security (RLS)

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Lecture publique pour les catégories" ON categories FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour les promotions" ON promotions FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour les produits" ON products FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour les avis" ON reviews FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour la galerie" ON gallery FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour les paramètres" ON site_settings FOR SELECT USING (true);

-- Politiques d'écriture pour les administrateurs authentifiés
-- (Pour l'instant on permet aux utilisateurs authentifiés de tout modifier)
CREATE POLICY "Modification pour les admins" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Modification pour les admins" ON promotions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Modification pour les admins" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Modification pour les admins" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Modification pour les admins" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Modification pour les admins" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
