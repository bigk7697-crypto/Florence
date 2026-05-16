import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import CataloguePreview from "@/components/home/CataloguePreview";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import GallerySection from "@/components/home/GallerySection";
import TikTokSection from "@/components/home/TikTokSection";
import ContactSection from "@/components/home/ContactSection";

import Marquee from "@/components/home/Marquee";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full">
        <HeroSection />
        <Marquee />
        <AboutSection />
        <CataloguePreview />
        <ReviewsCarousel />
        <GallerySection />
        <TikTokSection />
        <ContactSection />
      </div>
    </main>
  );
}
