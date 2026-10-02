import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatVolume } from "@/lib/format";
import { BottleIcon, LeafCheckIcon, DropletIcon, MapPinIcon } from "@/components/Icons";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ProductCard } from "@/components/ProductCard";

export const revalidate = 0;

async function getProduct(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produit introuvable — Terra Oliva" };
  return {
    title: `${product.name} — Terra Oliva`,
    description: product.shortDesc,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { profile: product.profile, id: { not: product.id } },
    take: 3,
    orderBy: { position: "asc" },
  });

  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <nav className="mb-8 text-sm text-ink-950/50">
          <Link href="/boutique" className="hover:text-ink-950">Boutique</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-950/70">{product.name}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex h-96 items-center justify-center rounded-lg bg-ink-950 md:h-[520px]">
            <BottleIcon className="h-72 text-cream-100/90 md:h-96" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest2 text-sage-600">{product.profile}</p>
            <h1 className="mt-2 font-serif text-3xl text-ink-950 sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-ink-950/60">{product.shortDesc}</p>

            <div className="mt-6 flex items-baseline gap-3">
              {product.compareAtCents && (
                <span className="text-lg text-ink-950/40 line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
              )}
              <span className="font-serif text-3xl text-ink-950">{formatPrice(product.priceCents)}</span>
              <span className="text-sm text-ink-950/50">· {formatVolume(product.volumeMl)}</span>
            </div>

            <div className="mt-8">
              <QuantitySelector
                item={{
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  profile: product.profile,
                  volumeMl: product.volumeMl,
                  priceCents: product.priceCents,
                }}
              />
            </div>

            <p className="mt-8 leading-relaxed text-ink-950/70">{product.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-ink-950/10 pt-6 text-sm">
              <div className="flex items-center gap-2 text-ink-950/60">
                <DropletIcon className="h-4 w-4 text-sage-600" />
                <span>Récolte {product.harvestYear}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-950/60">
                <MapPinIcon className="h-4 w-4 text-sage-600" />
                <span>{product.region}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-950/60">
                <LeafCheckIcon className="h-4 w-4 text-sage-600" />
                <span>Agriculture biologique</span>
              </div>
              <div className="flex items-center gap-2 text-ink-950/60">
                <DropletIcon className="h-4 w-4 text-sage-600" />
                <span>Première pression à froid</span>
              </div>
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-ink-950/10 pt-12">
            <h2 className="mb-6 font-serif text-2xl text-ink-950">Vous aimerez aussi</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.id,
                    slug: item.slug,
                    name: item.name,
                    profile: item.profile,
                    volumeMl: item.volumeMl,
                    priceCents: item.priceCents,
                    compareAtCents: item.compareAtCents,
                    shortDesc: item.shortDesc,
                    featured: item.featured,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
