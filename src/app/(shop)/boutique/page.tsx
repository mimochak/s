import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Boutique — Golden Spoon",
  description:
    "Toute notre gamme d'huile d'olive extra vierge biologique : Fruité Vert, Fruité Mûr et coffrets découverte.",
};

export default async function BoutiquePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { position: "asc" },
  });

  const allProfiles = Array.from(new Set(products.map((p) => p.profile)));
  const priority = ["Fruité Vert", "Fruité Mûr"];
  const profiles = [
    ...priority.filter((p) => allProfiles.includes(p)),
    ...allProfiles.filter((p) => !priority.includes(p)),
  ];

  return (
    <div className="bg-cream-50">
      <section className="bg-ink-950 py-16 text-cream-50">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-widest2 text-gold-500">La boutique</p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-snug sm:text-5xl">
            Toute notre huile d&rsquo;olive, <em>un seul domaine.</em>
          </h1>
          <p className="mt-4 max-w-xl text-cream-100/70">
            Deux profils aromatiques, plusieurs formats, une même
            exigence&nbsp;: extra vierge, biologique, pressée à froid.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {profiles.map((profile) => {
          const items = products.filter((p) => p.profile === profile);
          return (
            <div key={profile} id={profile === "Fruité Vert" ? "fruite-vert" : profile === "Fruité Mûr" ? "fruite-mur" : "coffrets"} className="mb-16 scroll-mt-24">
              <h2 className="mb-6 font-serif text-2xl text-ink-950">{profile}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      slug: product.slug,
                      name: product.name,
                      profile: product.profile,
                      volumeMl: product.volumeMl,
                      priceCents: product.priceCents,
                      compareAtCents: product.compareAtCents,
                      shortDesc: product.shortDesc,
                      featured: product.featured,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
