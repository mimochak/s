import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Marquee } from "@/components/Marquee";
import { StatBadge } from "@/components/StatBadge";
import { ProcessStep } from "@/components/ProcessStep";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  OliveBranchIcon,
  ArrowUpRightIcon,
  LeafCheckIcon,
  DropletIcon,
  ShieldIcon,
  MapPinIcon,
} from "@/components/Icons";

export const revalidate = 0;

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, active: true },
    orderBy: { position: "asc" },
    take: 4,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-cream-50">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest2 text-cream-100/60">
            <MapPinIcon className="h-4 w-4 text-gold-500" />
            Vallée des Baux · France
            <span className="text-cream-100/30">/</span>
            Récolte {new Date().getFullYear()}
          </div>

          <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">
            L&rsquo;or de nos oliviers, <em>cultivé avec soin.</em>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-cream-100/70">
            Huile d&rsquo;olive extra vierge biologique, récoltée à la main et
            pressée à froid dans nos oliveraies. Du domaine à la bouteille,
            sans intermédiaire.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/boutique"
              className="flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-medium uppercase tracking-widest2 text-ink-950 transition hover:bg-gold-400"
            >
              Découvrir la boutique
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="#qualite"
              className="flex items-center gap-2 rounded-full border border-cream-100/20 px-7 py-3 text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:border-gold-500"
            >
              Nos preuves qualité
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-10">
            <StatBadge value="100%" label="Origine France" />
            <StatBadge value="< 0,3%" label="Acidité libre moyenne" note="Limite réglementaire EVOO ≤ 0,8%" />
            <StatBadge value="24h" label="Entre récolte et pressage" />
          </div>
        </div>
        <OliveBranchIcon className="pointer-events-none absolute -bottom-6 right-0 h-40 w-64 text-gold-500/10 sm:h-56 sm:w-96" />
      </section>

      <Marquee />

      {/* Origin */}
      <section className="bg-ink-950 py-20 text-cream-50">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-widest2 text-gold-500">01 / L&rsquo;origine</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
            La qualité commence <em>avant la mise en bouteille.</em>
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <p className="text-cream-100/70">
              Nous gérons nous-mêmes nos oliveraies. Ce contrôle direct nous
              permet de superviser la culture, la récolte, l&rsquo;extraction
              et la mise en bouteille, à chaque étape.
            </p>
            <p className="text-cream-100/70">
              Une tradition oléicole provençale rencontre une approche
              moderne de la traçabilité&nbsp;: moins d&rsquo;intermédiaires,
              plus de visibilité à chaque étape, et une qualité qui peut être
              vérifiée.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink-900 py-20 text-cream-50">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-widest2 text-gold-500">Savoir-faire maîtrisé</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
            Quatre étapes soignées. <em>Une exigence constante.</em>
          </h2>
          <div className="mt-6">
            <ProcessStep
              index="01"
              title="Gérer l'oliveraie"
              description="La qualité se décide d'abord sur l'arbre. La gestion directe de nos oliveraies nous donne la visibilité nécessaire sur l'origine et les pratiques culturales."
              bullets={["Oliviers gérés en propre", "Origine clairement identifiée"]}
            />
            <ProcessStep
              index="02"
              title="Respecter le fruit"
              description="Les olives sont récoltées avec soin pour préserver leur intégrité avant extraction. La cueillette se fait majoritairement à la main."
              bullets={["Sélection minutieuse", "Manutention contrôlée"]}
            />
            <ProcessStep
              index="03"
              title="Préserver la fraîcheur"
              description="L'extraction à froid vise à préserver le profil sensoriel de l'huile ainsi que les composés naturellement présents."
              bullets={["Première pression à froid", "Profil riche en polyphénols"]}
            />
            <ProcessStep
              index="04"
              title="Tester et documenter"
              description="Nos analyses et notre certification biologique permettent de vérifier l'essentiel avant toute dégustation."
              bullets={["Analyses physico-chimiques", "Certification Agriculture Biologique"]}
            />
          </div>
        </div>
      </section>

      {/* Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-cream-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-widest2 text-sage-600">La collection</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-snug text-ink-950 sm:text-4xl">
              Une présence forte. <em className="text-sage-600">Dans chaque format.</em>
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
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
            <div className="mt-10 text-center">
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest2 text-ink-950 underline-offset-4 hover:underline"
              >
                Voir toute la boutique
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quality evidence */}
      <section id="qualite" className="bg-ink-950 py-20 text-cream-50">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-widest2 text-gold-500">Preuves avant promesses</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
            La qualité ne se raconte pas. <em>Elle se mesure.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-cream-100/60">
            Chaque lot est contrôlé selon les critères de l&rsquo;huile
            d&rsquo;olive vierge extra&nbsp;: acidité libre, indice de
            peroxyde et profil sensoriel. Nos certifications sont disponibles
            sur demande.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-cream-100/10 p-6">
              <DropletIcon className="h-8 w-8 text-gold-500" />
              <p className="mt-4 font-serif text-2xl">&lt; 0,3%</p>
              <p className="mt-1 text-sm text-cream-100/60">Acidité libre</p>
              <p className="mt-1 text-xs text-cream-100/40">Limite réglementaire EVOO ≤ 0,8%</p>
            </div>
            <div className="rounded-lg border border-cream-100/10 p-6">
              <ShieldIcon className="h-8 w-8 text-gold-500" />
              <p className="mt-4 font-serif text-2xl">AB · EU</p>
              <p className="mt-1 text-sm text-cream-100/60">Certification biologique</p>
              <p className="mt-1 text-xs text-cream-100/40">Délivrée par un organisme agréé</p>
            </div>
            <div className="rounded-lg border border-cream-100/10 p-6">
              <LeafCheckIcon className="h-8 w-8 text-gold-500" />
              <p className="mt-4 font-serif text-2xl">1ère pression</p>
              <p className="mt-1 text-sm text-cream-100/60">Extraction à froid</p>
              <p className="mt-1 text-xs text-cream-100/40">Sous 27°C, sans solvant</p>
            </div>
            <div className="rounded-lg border border-cream-100/10 p-6">
              <MapPinIcon className="h-8 w-8 text-gold-500" />
              <p className="mt-4 font-serif text-2xl">100%</p>
              <p className="mt-1 text-sm text-cream-100/60">Origine France</p>
              <p className="mt-1 text-xs text-cream-100/40">Oliveraies gérées en propre</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-cream-100/40">
            Les valeurs indiquées correspondent aux moyennes constatées sur
            nos derniers lots et peuvent varier selon la récolte.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-ink-900 py-16 text-cream-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl">Suivez nos récoltes</h2>
            <p className="mt-2 max-w-md text-cream-100/60">
              Nouvelles récoltes, éditions limitées et conseils de
              dégustation — directement dans votre boîte mail.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
