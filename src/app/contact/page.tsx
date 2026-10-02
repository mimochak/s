import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MapPinIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact — Terra Oliva",
};

export default function ContactPage() {
  return (
    <div className="bg-ink-950 py-16 text-cream-50">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs uppercase tracking-widest2 text-gold-500">Contact</p>
        <h1 className="mt-4 font-serif text-4xl">Une question, une commande spéciale ?</h1>
        <p className="mt-4 max-w-xl text-cream-100/70">
          Écrivez-nous&nbsp;: particuliers, restaurateurs ou revendeurs,
          nous répondons sous 48h ouvrées.
        </p>

        <div className="mt-12 grid gap-10 rounded-2xl bg-cream-50 p-8 text-ink-950 sm:grid-cols-[1fr_1.4fr] sm:p-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs uppercase tracking-widest2 text-sage-600">Domaine</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink-950/70">
                <MapPinIcon className="h-4 w-4 text-sage-600" />
                Vallée des Baux, France
              </p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest2 text-sage-600">E-mail</h2>
              <p className="mt-2 text-sm text-ink-950/70">contact@terra-oliva.fr</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest2 text-sage-600">Téléphone</h2>
              <p className="mt-2 text-sm text-ink-950/70">+33 (0)4 00 00 00 00</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest2 text-sage-600">Professionnels</h2>
              <p className="mt-2 text-sm text-ink-950/70">
                Restaurateurs et revendeurs, précisez vos volumes souhaités
                dans votre message.
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
