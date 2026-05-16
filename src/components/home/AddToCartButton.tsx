"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

type ProductDetails = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ product }: { product: ProductDetails }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 py-4 bg-[var(--color-brand-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-brand-gold-dark)] transition-colors flex items-center justify-center space-x-2"
    >
      <ShoppingBag className="w-5 h-5" />
      <span>Ajouter au panier</span>
    </button>
  );
}
