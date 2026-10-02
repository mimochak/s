import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatVolume } from "@/lib/format";
import { setProductActive } from "./actions";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Produits — Admin",
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string }>;
}) {
  const { created, updated } = await searchParams;
  const products = await prisma.product.findMany({ orderBy: [{ active: "desc" }, { position: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink-950">Produits</h1>
          <p className="mt-1 text-sm text-ink-950/50">{products.length} produit(s) au catalogue.</p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="rounded-full bg-ink-950 px-5 py-2.5 text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:bg-ink-800"
        >
          Nouveau produit
        </Link>
      </div>

      {created === "1" && (
        <p className="mt-4 rounded-md bg-sage-500/10 px-4 py-3 text-sm text-sage-700">Produit créé avec succès.</p>
      )}
      {updated === "1" && (
        <p className="mt-4 rounded-md bg-sage-500/10 px-4 py-3 text-sm text-sage-700">Produit mis à jour avec succès.</p>
      )}

      <div className="mt-6 overflow-hidden rounded-lg border border-ink-950/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-950/10 bg-cream-50 text-xs uppercase tracking-widest2 text-ink-950/50">
            <tr>
              <th className="px-5 py-3">Produit</th>
              <th className="px-5 py-3">Format</th>
              <th className="px-5 py-3">Prix</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-950/10">
            {products.map((product) => (
              <tr key={product.id} className={product.active ? "" : "opacity-50"}>
                <td className="px-5 py-4">
                  <p className="font-medium text-ink-950">{product.name}</p>
                  <p className="text-xs text-ink-950/50">{product.profile}</p>
                </td>
                <td className="px-5 py-4 text-ink-950/70">{formatVolume(product.volumeMl)}</td>
                <td className="px-5 py-4 text-ink-950/70">{formatPrice(product.priceCents)}</td>
                <td className="px-5 py-4 text-ink-950/70">{product.stock}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {product.featured && (
                      <span className="rounded-full bg-gold-500/15 px-2.5 py-1 text-xs font-medium text-gold-600">
                        Vedette
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        product.active ? "bg-sage-500/15 text-sage-700" : "bg-ink-950/10 text-ink-950/50"
                      }`}
                    >
                      {product.active ? "Actif" : "Archivé"}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/produits/${product.id}`} className="text-xs uppercase tracking-widest2 text-sage-600 hover:underline">
                      Modifier
                    </Link>
                    <form action={setProductActive.bind(null, product.id, !product.active)}>
                      <button type="submit" className="text-xs uppercase tracking-widest2 text-ink-950/50 hover:text-ink-950 hover:underline">
                        {product.active ? "Archiver" : "Réactiver"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
