import Link from "next/link";
import { BottleIcon } from "@/components/Icons";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, formatVolume } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-ink-950/10 bg-cream-50 transition hover:shadow-lg">
      <Link href={`/boutique/${product.slug}`} className="block">
        <div className="relative flex h-64 items-center justify-center bg-ink-950">
          <BottleIcon className="h-48 text-cream-100/90 transition group-hover:scale-105" />
          {product.compareAtCents && (
            <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-950">
              Promo
            </span>
          )}
        </div>
        <div className="px-5 pt-5">
          <p className="text-xs uppercase tracking-widest2 text-sage-600">{product.profile}</p>
          <h3 className="mt-1 font-serif text-lg leading-snug text-ink-950">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-950/60">{formatVolume(product.volumeMl)}</p>
          <p className="mt-2 text-sm text-ink-950/70">{product.shortDesc}</p>
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-3 px-5 pb-5">
        <div>
          {product.compareAtCents && (
            <span className="mr-2 text-sm text-ink-950/40 line-through">
              {formatPrice(product.compareAtCents)}
            </span>
          )}
          <span className="font-serif text-lg text-ink-950">{formatPrice(product.priceCents)}</span>
        </div>
        <AddToCartButton
          item={{
            productId: product.id,
            slug: product.slug,
            name: product.name,
            profile: product.profile,
            volumeMl: product.volumeMl,
            priceCents: product.priceCents,
          }}
          className="rounded-full border border-ink-950 px-4 py-2 text-xs font-medium uppercase tracking-wide text-ink-950 transition hover:bg-ink-950 hover:text-cream-50"
        >
          Ajouter
        </AddToCartButton>
      </div>
    </article>
  );
}
