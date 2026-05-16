"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CartDrawer from "./CartDrawer";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import ScrollToTop from "./ScrollToTop";
import NewsletterPopup from "./NewsletterPopup";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollToTop />
      <NewsletterPopup />
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
