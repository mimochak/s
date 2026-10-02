import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Terra Oliva",
};

export default function LegalPage() {
  return (
    <div className="bg-cream-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-serif text-3xl text-ink-950">Mentions légales</h1>
        <p className="mt-2 text-sm text-ink-950/50">
          Document type à compléter avec les informations réelles de votre
          société avant mise en ligne.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-950/70">
          <section>
            <h2 className="mb-2 font-serif text-xl text-ink-950">Éditeur du site</h2>
            <p>
              Terra Oliva — [Forme juridique, ex. SARL] au capital de [montant]€<br />
              Siège social&nbsp;: Vallée des Baux, [adresse complète], France<br />
              SIREN&nbsp;: [à compléter] · RCS&nbsp;: [à compléter]<br />
              N° TVA intracommunautaire&nbsp;: [à compléter]<br />
              Directeur de la publication&nbsp;: [nom]<br />
              Contact&nbsp;: contact@terra-oliva.fr
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-ink-950">Hébergement</h2>
            <p>[Nom de l&rsquo;hébergeur, adresse, contact] — à compléter selon votre prestataire d&rsquo;hébergement.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-ink-950">Propriété intellectuelle</h2>
            <p>
              L&rsquo;ensemble des contenus présents sur ce site (textes,
              images, logos) est protégé par le droit de la propriété
              intellectuelle. Toute reproduction sans autorisation est
              interdite.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-ink-950">Données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez d&rsquo;un droit d&rsquo;accès, de
              rectification et de suppression des données vous concernant.
              Pour l&rsquo;exercer, contactez-nous à contact@terra-oliva.fr.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-ink-950">Conditions de vente</h2>
            <p>
              Les prix sont indiqués en euros, toutes taxes comprises. Les
              conditions générales de vente détaillées (livraison, droit de
              rétractation, garanties) doivent être rédigées et publiées
              avant l&rsquo;ouverture commerciale du site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
