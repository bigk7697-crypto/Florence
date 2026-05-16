import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col group inline-block">
              <span className="text-2xl font-heading font-bold text-white tracking-wider">
                FLORENCE
              </span>
              <span className="text-xs tracking-[0.2em] text-[var(--color-brand-gold)] uppercase font-light">
                Parfums & Senteurs
              </span>
            </Link>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Votre boutique de référence pour les parfums authentiques de luxe, arabes et huiles parfumées à Lomé. L'excellence du parfum à prix imbattables.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.tiktok.com/@florenceparfums2024" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-brand-gold)] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-brand-gold)] transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-brand-gold)] transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--color-brand-gold)] font-heading font-semibold text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Accueil</Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-gray-400 hover:text-white transition-colors text-sm">Catalogue Complet</Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-white transition-colors text-sm">Notre Histoire</Link>
              </li>
              <li>
                <Link href="/#reviews" className="text-gray-400 hover:text-white transition-colors text-sm">Avis Clients</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--color-brand-gold)] font-heading font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[var(--color-brand-gold)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">À côté de la station CAP Agoe Assiyeyé<br />Lomé, Togo</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[var(--color-brand-gold)] flex-shrink-0" />
                <a href="https://wa.me/22896979815" className="text-sm text-gray-400 hover:text-white transition-colors">+228 96 97 98 15</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[var(--color-brand-gold)] font-heading font-semibold text-lg mb-4">Horaires</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-[var(--color-brand-gold)] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p className="flex justify-between w-32 mb-1"><span>Lun - Sam:</span> <span>9h - 20h</span></p>
                  <p className="flex justify-between w-32 text-gray-500"><span>Dimanche:</span> <span>Fermé</span></p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} FLORENCE parfums & Senteurs. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">Espace Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
