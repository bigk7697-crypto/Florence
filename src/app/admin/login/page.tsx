"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Tentative de connexion via Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Fallback : mode démo avec identifiants locaux
        if (
          email === "admin@florenceparfums.com" &&
          password === "Admin123!"
        ) {
          router.push("/admin/dashboard");
          return;
        }
        setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push("/admin/dashboard");
      }
    } catch {
      // Fallback : mode démo si Supabase non disponible
      if (
        email === "admin@florenceparfums.com" &&
        password === "Admin123!"
      ) {
        router.push("/admin/dashboard");
        return;
      }
      setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand-gold)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-gold)]/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back to site */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-8 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour au site
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-2xl shadow-black/50"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-brand-gold)]/10 border border-[var(--color-brand-gold)]/20 mb-4">
              <Lock className="w-7 h-7 text-[var(--color-brand-gold)]" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white tracking-wider mb-1">
              FLORENCE
            </h1>
            <p className="text-[var(--color-brand-gold)] uppercase tracking-[0.25em] text-xs font-semibold">
              Espace Administration
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-sm flex items-start"
            >
              <span className="mr-2">⚠️</span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5" htmlFor="admin-email">
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#111] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-gold)] focus:border-[var(--color-brand-gold)] text-sm transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5" htmlFor="admin-password">
                Mot de Passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-lg bg-[#111] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-gold)] focus:border-[var(--color-brand-gold)] text-sm transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-lg text-sm font-semibold text-black bg-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-dark)] focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Connexion en cours...
                </>
              ) : (
                "Se Connecter →"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-gray-600">
              Accès réservé aux administrateurs de Florence Parfums
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
