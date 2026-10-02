import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct, setProductActive } from "../actions";

export const metadata: Metadata = {
  title: "Modifier le produit — Admin",
};

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/produits" className="text-xs uppercase tracking-widest2 text-ink-950/50 hover:text-ink-950">
        ← Produits
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-ink-950">{product.name}</h1>
        <form action={setProductActive.bind(null, product.id, !product.active)}>
          <button
            type="submit"
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest2 ${
              product.active ? "bg-ink-950/10 text-ink-950/60 hover:bg-ink-950/15" : "bg-sage-500/15 text-sage-700 hover:bg-sage-500/25"
            }`}
          >
            {product.active ? "Archiver" : "Réactiver"}
          </button>
        </form>
      </div>

      <div className="mt-6">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          defaultValues={product}
          error={error}
          submitLabel="Enregistrer les modifications"
        />
      </div>
    </div>
  );
}
