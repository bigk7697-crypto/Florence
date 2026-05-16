import { Metadata } from "next";
import { ArrowLeft, Star, ShieldCheck, Droplets, Wind } from "lucide-react";
import Link from "next/link";
import { productsService } from "@/lib/services";
import AddToCartButton from "@/components/home/AddToCartButton";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const id = (await params).id;
  const product = await productsService.getById(id);
  
  if (!product) {
    return { title: "Produit non trouvé | Florence Parfums" };
  }

  return {
    title: `${product.name} | Florence Parfums & Senteurs`,
    description: product.description || `Découvrez ${product.name} par ${product.brand}. Disponible chez Florence Parfums à Lomé.`,
    openGraph: {
      title: `${product.name} — ${product.price.toLocaleString('fr-FR')} FCFA`,
      description: product.description || `Parfum de luxe disponible chez Florence Parfums à Lomé, Togo.`,
      images: product.images[0] ? [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.name,
        },
      ] : [],
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await productsService.getById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/catalogue" className="hover:text-white transition-colors">Catalogue</Link>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#111] border border-white/5 relative">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.original_price && (
                <div className="absolute top-6 left-6 bg-[var(--color-brand-gold)] text-black text-sm font-bold px-4 py-1.5 rounded uppercase tracking-wider">
                  Promotion
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white font-bold text-lg uppercase tracking-widest border border-white/50 px-6 py-3 rounded">
                    Rupture de stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[var(--color-brand-gold)] uppercase tracking-widest text-sm font-semibold">
                  {product.brand}
                </h2>
                {product.category && (
                  <span className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full">
                    {product.category.name}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-[var(--color-brand-gold)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">Authenticité garantie</span>
              </div>

              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-white">
                  {product.price.toLocaleString('fr-FR')} F
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.original_price.toLocaleString('fr-FR')} F
                  </span>
                )}
                {product.original_price && (
                  <span className="text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-medium">
                    -{Math.round((1 - product.price / product.original_price) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {product.description && (
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                {product.description}
              </p>
            )}

            {/* Olfactory Notes */}
            {(product.notes_top || product.notes_heart || product.notes_base) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {product.notes_top && product.notes_top.length > 0 && (
                  <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                    <div className="flex items-center text-[var(--color-brand-gold)] mb-2">
                      <Wind className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Tête</span>
                    </div>
                    <p className="text-gray-400 text-sm">{product.notes_top.join(", ")}</p>
                  </div>
                )}
                {product.notes_heart && product.notes_heart.length > 0 && (
                  <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                    <div className="flex items-center text-[var(--color-brand-gold)] mb-2">
                      <Droplets className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Cœur</span>
                    </div>
                    <p className="text-gray-400 text-sm">{product.notes_heart.join(", ")}</p>
                  </div>
                )}
                {product.notes_base && product.notes_base.length > 0 && (
                  <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                    <div className="flex items-center text-[var(--color-brand-gold)] mb-2">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Fond</span>
                    </div>
                    <p className="text-gray-400 text-sm">{product.notes_base.join(", ")}</p>
                  </div>
                )}
              </div>
            )}

            {/* Action */}
            <div className="flex space-x-4">
              {product.stock > 0 ? (
                <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: product.images[0] }} />
              ) : (
                <button disabled className="flex-1 py-4 bg-gray-700 text-gray-400 font-semibold rounded-lg cursor-not-allowed text-center">
                  Rupture de stock
                </button>
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
              <div className="flex items-center text-gray-400 text-sm">
                <ShieldCheck className="w-5 h-5 mr-3 text-[var(--color-brand-gold)] flex-shrink-0" />
                Produit 100% authentique, qualité garantie
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Droplets className="w-5 h-5 mr-3 text-[var(--color-brand-gold)] flex-shrink-0" />
                Excellente longévité (Plus de 24h)
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Link href="/#contact" className="flex items-center hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-3 text-[var(--color-brand-gold)] flex-shrink-0 rotate-180" />
                  Questions ? Contactez-nous sur WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
