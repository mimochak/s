"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { CartItem } from "@/lib/types";

export function AddToCartButton({
  item,
  quantity = 1,
  className,
  children = "Ajouter au panier",
}: {
  item: Omit<CartItem, "quantity">;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addItem(item, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={className}
    >
      {added ? "Ajouté ✓" : children}
    </button>
  );
}
