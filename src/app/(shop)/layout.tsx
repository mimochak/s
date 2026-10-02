import type { Metadata } from "next";
import "../globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Golden Spoon Bio — Huile d'Olive Extra Vierge Biologique",
  description:
    "Huile d'olive extra vierge biologique, récoltée à la main et pressée à froid dans la Vallée des Baux. Du domaine à la bouteille.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans text-ink-950 antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
