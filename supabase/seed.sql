-- Insertion des catégories
INSERT INTO categories (id, name, slug, description, display_order) VALUES
('c0000000-0000-0000-0000-000000000001', 'Parfums Homme', 'parfums-homme', 'Des fragrances élégantes et affirmées pour homme.', 1),
('c0000000-0000-0000-0000-000000000002', 'Parfums Femme', 'parfums-femme', 'Senteurs douces, florales et envoûtantes pour femme.', 2),
('c0000000-0000-0000-0000-000000000003', 'Parfums Arabes', 'parfums-arabes', 'L''authenticité et le luxe des parfums orientaux.', 3),
('c0000000-0000-0000-0000-000000000004', 'Huiles Parfumées', 'huiles-parfumees', 'Concentrés purs et intenses.', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insertion des produits (exemples)
INSERT INTO products (id, name, description, price, original_price, category_id, brand, volume, in_stock, featured, images) VALUES
('p0000000-0000-0000-0000-000000000001', 'Oud Wood Exclusif', 'Un parfum oriental intense aux notes de bois de oud, d''épices et de cuir. Parfait pour les occasions spéciales.', 45000, 55000, 'c0000000-0000-0000-0000-000000000003', 'Lattafa', '100ml', true, true, ARRAY['/images/product-1.jpg']),
('p0000000-0000-0000-0000-000000000002', 'Fleur de Nuit', 'Senteur florale et mystérieuse avec des accords de rose, de jasmin et de vanille.', 30000, NULL, 'c0000000-0000-0000-0000-000000000002', 'Paris Fragrance', '50ml', true, true, ARRAY['/images/product-2.jpg']),
('p0000000-0000-0000-0000-000000000003', 'Sauvage Élégance', 'La fraîcheur de la bergamote combinée à la puissance de l''ambroxan.', 55000, 60000, 'c0000000-0000-0000-0000-000000000001', 'Florence Collection', '100ml', true, true, ARRAY['/images/product-3.jpg'])
ON CONFLICT DO NOTHING;

-- Insertion des avis
INSERT INTO reviews (author, content, rating, featured) VALUES
('Koffi A.', 'The best perfume shop in Lomé! Je recommande vivement pour la qualité des parfums.', 5, true),
('Amina T.', 'A benchmark for genuine perfume and unbeatable prices. Le service est impeccable.', 5, true),
('Jean-Paul', 'I bought some very good quality perfumes and the prices are very affordable.', 4, true),
('Sarah M.', 'Good scent, et la livraison a été très rapide.', 5, false);

-- Insertion des paramètres du site
INSERT INTO site_settings (key, value) VALUES
('contact', '{"phone": "+228 96 97 98 15", "email": "contact@florenceparfums.com", "address": "À côté de la station CAP Agoe Assiyeyé, Lomé, Togo", "lat": 6.2330002, "lng": 1.1976249}'::jsonb),
('socials', '{"tiktok": "https://www.tiktok.com/@florenceparfums2024", "instagram": "", "facebook": ""}'::jsonb),
('business_hours', '{"monday": "9h00 – 20h00", "tuesday": "9h00 – 20h00", "wednesday": "9h00 – 20h00", "thursday": "9h00 – 20h00", "friday": "9h00 – 20h00", "saturday": "9h00 – 20h00", "sunday": "Fermé"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
