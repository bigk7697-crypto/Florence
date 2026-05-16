"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  MessageSquare, 
  Image as ImageIcon, 
  Percent, 
  LogOut,
  Menu,
  X,
  ExternalLink,
  Home,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Produits', href: '/admin/products', icon: Package },
    { name: 'Catégories', href: '/admin/categories', icon: Tags },
    { name: 'Avis Clients', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Galerie', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Promotions', href: '/admin/promotions', icon: Percent },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A] border-b border-white/10 z-50 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <span className="text-lg font-heading font-bold text-white tracking-wider">FLORENCE</span>
          <span className="text-[10px] text-[var(--color-brand-gold)] uppercase tracking-widest">Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-6 lg:justify-center border-b border-white/10">
            <Link href="/admin/dashboard" className="flex flex-col items-center">
              <span className="text-xl font-heading font-bold text-white tracking-wider">FLORENCE</span>
              <span className="text-xs text-[var(--color-brand-gold)] uppercase tracking-[0.2em] font-medium">Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-[var(--color-brand-gold)]/10 text-[var(--color-brand-gold)]' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-[var(--color-brand-gold)]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500 group-hover:text-[var(--color-brand-gold)]" />
              Retour au site
              <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <button
              onClick={async () => {
                const { supabase } = await import("@/lib/supabase");
                await supabase.auth.signOut();
                window.location.href = "/admin/login";
              }}
              className="w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500 group-hover:text-red-400" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest lg:hidden">
              FLORENCE <span className="text-[var(--color-brand-gold)]">Admin</span>
            </h2>
            <div className="hidden lg:flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest">
              <span>Admin</span>
              <span>/</span>
              <span className="text-white">{pathname.split('/').pop()?.replace('-', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              target="_blank"
              className="text-xs text-gray-400 hover:text-[var(--color-brand-gold)] transition-colors flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <span>Voir le site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <div className="h-8 w-8 rounded-full bg-[var(--color-brand-gold)]/20 border border-[var(--color-brand-gold)]/40 flex items-center justify-center text-[var(--color-brand-gold)] font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto focus:outline-none bg-[#050505]">
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
