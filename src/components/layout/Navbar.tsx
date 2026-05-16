"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { items, toggleCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "À Propos", href: "/#about" },
    { name: "Avis", href: "/#reviews" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-dark shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="text-2xl md:text-3xl font-heading font-bold text-white tracking-wider group-hover:text-[var(--color-brand-gold)] transition-colors">
              FLORENCE
            </span>
            <span className="text-xs tracking-[0.2em] text-[var(--color-brand-gold)] uppercase font-light">
              Parfums & Senteurs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wide uppercase font-medium transition-colors hover:text-[var(--color-brand-gold)] ${
                  pathname === link.href ? "text-[var(--color-brand-gold)]" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            
            <button
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-[var(--color-brand-gold)] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-[var(--color-brand-gold)] text-black text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                  {items.length}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/22896979815"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-5 py-2.5 bg-[var(--color-brand-gold)] text-black font-semibold rounded hover:bg-[var(--color-brand-gold-dark)] transition-colors text-sm uppercase tracking-wide"
            >
              <Phone className="w-4 h-4 mr-2" />
              Nous Contacter
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-[var(--color-brand-gold)] focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col pt-24 px-6"
          >
            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-heading text-white hover:text-[var(--color-brand-gold)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-8 flex flex-col space-y-4">
                <a
                  href="https://wa.me/22896979815"
                  className="flex items-center justify-center px-6 py-3 bg-[var(--color-brand-gold)] text-black font-bold rounded"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +228 96 97 98 15
                </a>
                <a
                  href="https://maps.google.com/?q=6.2330002,1.1976249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors rounded"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Nous trouver à Lomé
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
