"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { CartIcon, OliveBranchIcon, CloseIcon } from "@/components/Icons";

const NAV_LINKS = [
  { href: "/boutique", label: "Boutique" },
  { href: "/a-propos", label: "Notre histoire" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { totalItems, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-cream-100/10 bg-ink-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-cream-50">
          <OliveBranchIcon className="h-6 w-10 text-gold-500" />
          <span className="font-serif text-xl tracking-wide">Terra Oliva</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-widest2 text-cream-100/80 transition hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Ouvrir le panier"
            className="relative flex items-center gap-2 rounded-full border border-cream-100/20 px-4 py-2 text-cream-50 transition hover:border-gold-500"
          >
            <CartIcon className="h-5 w-5" />
            <span className="hidden text-sm sm:inline">Panier</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[11px] font-semibold text-ink-950">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="rounded-full border border-cream-100/20 p-2 text-cream-50 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <span className="block h-4 w-4 space-y-1">
              <span className="block h-px w-full bg-current" />
              <span className="block h-px w-full bg-current" />
              <span className="block h-px w-full bg-current" />
            </span>}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-cream-100/10 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm uppercase tracking-widest2 text-cream-100/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
