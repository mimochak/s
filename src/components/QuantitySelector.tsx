"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { CartItem } from "@/lib/types";

export function QuantitySelector({
  item,
}: {
  item: Omit<CartItem, "quantity">;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-full border border-ink-950/20">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-2 text-lg"
          aria-label="Diminuer la quantité"
        >
          −
        </button>
        <span className="min-w-[2ch] text-center">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-4 py-2 text-lg"
          aria-label="Augmenter la quantité"
        >
          +
        </button>
      </div>
      <button
        onClick={() => {
          addItem(item, quantity);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
        className="flex-1 rounded-full bg-ink-950 px-8 py-3 text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:bg-ink-800"
      >
        {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
      </button>
    </div>
  );
}
