"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice, formatVolume } from "@/lib/format";
import { CloseIcon, DropletIcon } from "@/components/Icons";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem, totalCents } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setIsCheckingOut(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Impossible de lancer le paiement.");
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink-950/60 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream-50 text-ink-950 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Panier"
      >
        <div className="flex items-center justify-between border-b border-ink-950/10 px-6 py-5">
          <h2 className="font-serif text-lg tracking-wide">Votre panier</h2>
          <button
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="rounded-full p-2 transition hover:bg-ink-950/5"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center text-ink-950/60">
            <DropletIcon className="h-12 w-12 text-sage-500" />
            <p>Votre panier est vide pour le moment.</p>
            <Link
              href="/boutique"
              onClick={closeCart}
              className="text-sm font-medium uppercase tracking-widest2 text-sage-600 underline-offset-4 hover:underline"
            >
              Découvrir la boutique
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="divide-y divide-ink-950/10">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-5">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-ink-950/5">
                    <DropletIcon className="h-8 w-8 text-sage-600" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium leading-snug">{item.name}</p>
                        <p className="text-xs uppercase tracking-wide text-ink-950/50">
                          {item.profile} · {formatVolume(item.volumeMl)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Retirer ${item.name}`}
                        className="text-ink-950/40 hover:text-ink-950"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink-950/15">
                        <button
                          className="px-3 py-1 text-sm"
                          onClick={() => setQuantity(item.productId, item.quantity - 1)}
                          aria-label="Diminuer la quantité"
                        >
                          −
                        </button>
                        <span className="min-w-[2ch] text-center text-sm">{item.quantity}</span>
                        <button
                          className="px-3 py-1 text-sm"
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-medium">{formatPrice(item.priceCents * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-ink-950/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm uppercase tracking-widest2 text-ink-950/60">
              <span>Sous-total</span>
              <span className="text-base font-medium text-ink-950">{formatPrice(totalCents)}</span>
            </div>
            {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="block w-full rounded-full bg-ink-950 px-6 py-3 text-center text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:bg-ink-800 disabled:opacity-60"
            >
              {isCheckingOut ? "Redirection…" : "Passer la commande"}
            </button>
            <p className="mt-3 text-center text-xs text-ink-950/50">
              Livraison et taxes calculées à l'étape suivante.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
