import Link from "next/link";
import { OliveBranchIcon } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="border-t border-cream-100/10 bg-ink-950 text-cream-100/70">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-cream-50">
              <OliveBranchIcon className="h-5 w-8 text-gold-500" />
              <span className="font-serif text-lg">Golden Spoon</span>
            </div>
            <p className="text-sm leading-relaxed">
              Huile d'olive extra vierge biologique, pressée à froid dans la
              Vallée des Baux. Du domaine à la bouteille, sans intermédiaire.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest2 text-gold-500">Boutique</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/boutique" className="hover:text-gold-400">Tous les produits</Link></li>
              <li><Link href="/boutique#fruite-vert" className="hover:text-gold-400">Fruité Vert</Link></li>
              <li><Link href="/boutique#fruite-mur" className="hover:text-gold-400">Fruité Mûr</Link></li>
              <li><Link href="/boutique#coffrets" className="hover:text-gold-400">Coffrets cadeau</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest2 text-gold-500">La maison</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/a-propos" className="hover:text-gold-400">Notre histoire</Link></li>
              <li><Link href="/#qualite" className="hover:text-gold-400">Qualité &amp; certifications</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-gold-400">Mentions légales</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest2 text-gold-500">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>contact@goldenspoon.fr</li>
              <li>+33 (0)4 00 00 00 00</li>
              <li>Vallée des Baux, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-6 text-xs text-cream-100/50 md:flex-row">
          <p>© {new Date().getFullYear()} Golden Spoon. Tous droits réservés.</p>
          <p>Agriculture Biologique · Certifié par un organisme agréé UE</p>
        </div>
      </div>
    </footer>
  );
}
