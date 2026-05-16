import { productsService } from "@/lib/services";
import CatalogueClient from "@/components/catalogue/CatalogueClient";

export const metadata = {
  title: "Catalogue | FLORENCE parfums & Senteurs",
  description: "Parcourez notre catalogue complet de parfums de luxe, arabes et huiles parfumées. Livraison à Lomé, Togo.",
};

export default async function CataloguePage() {
  const products = await productsService.getAll();
  return <CatalogueClient products={products} />;
}
