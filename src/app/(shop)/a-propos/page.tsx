import type { Metadata } from "next";
import Link from "next/link";
import { LeafCheckIcon, ShieldIcon, DropletIcon, MapPinIcon, ArrowUpRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Notre histoire — Golden Spoon Bio",
  description:
    "Découvrez l'histoire de Golden Spoon Bio, domaine oléicole familial et biologique de la Vallée des Baux.",
};

const VALUES = [
  {
    icon: LeafCheckIcon,
    title: "Agriculture biologique",
    text: "Nos oliveraies sont cultivées sans pesticides ni engrais de synthèse, certifiées par un organisme agréé par l'Union européenne.",
  },
  {
    icon: DropletIcon,
    title: "Extraction à froid",
    text: "Chaque récolte est pressée en moulin dans les 24 heures, à température contrôlée, pour préserver arômes et polyphénols.",
  },
  {
    icon: ShieldIcon,
    title: "Traçabilité totale",
    text: "De l'arbre à la bouteille, nous gérons chaque étape nous-mêmes : aucun intermédiaire, aucune huile mélangée.",
  },
  {
    icon: MapPinIcon,
    title: "Terroir provençal",
    text: "Nos oliviers, variétés Picholine et Aglandau, poussent sur les coteaux de la Vallée des Baux, entre Alpilles et Camargue.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50">
      <section className="bg-ink-950 py-20 text-cream-50">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs uppercase tracking-widest2 text-gold-500">Notre histoire</p>
          <h1 className="mt-4 font-serif text-4xl leading-snug sm:text-5xl">
            Un domaine familial, <em>une exigence biologique.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-cream-100/70">
            Golden Spoon Bio est né de la volonté de produire une huile d&rsquo;olive
            honnête&nbsp;: cultivée sans compromis, pressée près de la récolte,
            et vendue sans intermédiaire entre notre moulin et votre cuisine.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-6 leading-relaxed text-ink-950/80">
          <p>
            Tout commence par quelques hectares d&rsquo;oliviers plantés dans
            la Vallée des Baux, entre les Alpilles et la Camargue. Au fil des
            années, le domaine s&rsquo;est converti à l&rsquo;agriculture
            biologique, convaincu qu&rsquo;une terre respectée donne une huile
            plus expressive — et plus saine.
          </p>
          <p>
            Aujourd&rsquo;hui, nous récoltons nos olives à la main, variétés
            Picholine et Aglandau, et les pressons à froid le jour même dans
            notre moulin partenaire. Nous proposons deux profils
            complémentaires&nbsp;: un <strong>Fruité Vert</strong>, vif et
            herbacé, issu d&rsquo;olives récoltées tôt, et un{" "}
            <strong>Fruité Mûr</strong>, plus rond et doux, pour la cuisine du
            quotidien.
          </p>
          <p>
            Vendre en direct nous permet de proposer une huile fraîche, au
            juste prix, tout en gardant une entière visibilité sur chaque
            étape — de l&rsquo;arbre à la bouteille.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border border-ink-950/10 bg-white p-6">
              <Icon className="h-8 w-8 text-sage-600" />
              <h3 className="mt-4 font-serif text-lg text-ink-950">{title}</h3>
              <p className="mt-2 text-sm text-ink-950/60">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-lg bg-ink-950 p-8 text-cream-50 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl">Envie de goûter la différence ?</h2>
            <p className="mt-2 text-cream-100/70">Découvrez nos deux profils et nos coffrets découverte.</p>
          </div>
          <Link
            href="/boutique"
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gold-500 px-7 py-3 text-sm font-medium uppercase tracking-widest2 text-ink-950 transition hover:bg-gold-400"
          >
            Voir la boutique
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
