import Link from "next/link";
import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export const metadata: Metadata = {
  title: "Nouveau produit — Admin",
};

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <Link href="/admin/produits" className="text-xs uppercase tracking-widest2 text-ink-950/50 hover:text-ink-950">
        ← Produits
      </Link>
      <h1 className="mt-3 font-serif text-2xl text-ink-950">Nouveau produit</h1>

      <div className="mt-6">
        <ProductForm action={createProduct} error={error} submitLabel="Créer le produit" />
      </div>
    </div>
  );
}
