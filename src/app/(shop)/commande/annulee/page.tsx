import Link from "next/link";
import { CloseIcon } from "@/components/Icons";

export default function CheckoutCancelledPage() {
  return (
    <div className="bg-cream-50 py-24">
      <div className="mx-auto max-w-lg px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-950/5">
          <CloseIcon className="h-8 w-8 text-ink-950/50" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-ink-950">Commande annulée</h1>
        <p className="mt-3 text-ink-950/60">
          Votre paiement a été annulé et votre panier est toujours disponible.
          Vous pouvez reprendre votre commande quand vous le souhaitez.
        </p>
        <Link
          href="/boutique"
          className="mt-8 inline-block rounded-full bg-ink-950 px-7 py-3 text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:bg-ink-800"
        >
          Retour à la boutique
        </Link>
      </div>
    </div>
  );
}
