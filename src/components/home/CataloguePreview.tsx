import { productsService, type Product } from "@/lib/services";
import CataloguePreviewClient from "./CataloguePreviewClient";

export default async function CataloguePreview() {
  const products = await productsService.getFeatured();
  return <CataloguePreviewClient products={products} />;
}
