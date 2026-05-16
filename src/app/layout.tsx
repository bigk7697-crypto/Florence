import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "FLORENCE parfums & Senteurs | Luxe & Authenticité à Lomé",
  description: "Parfums authentiques, prix imbattables. Votre boutique de référence pour les parfums de qualité à Lomé. Découvrez notre collection de parfums de luxe, arabes et huiles parfumées.",
  keywords: ["parfum", "Lomé", "Togo", "luxe", "parfum arabe", "Florence parfums"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
