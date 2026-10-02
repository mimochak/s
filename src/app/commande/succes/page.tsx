import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { LeafCheckIcon } from "@/components/Icons";

export const revalidate = 0;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; session_id?: string; demo?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.order_id;
  let order = orderId
    ? await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } },
      })
    : null;

  const isDemo = params.demo === "1" || order?.status === "demo";

  if (order && stripeEnabled && stripe && params.session_id && order.status === "pending") {
    try {
      const session = await stripe.checkout.sessions.retrieve(params.session_id);
      if (session.payment_status === "paid") {
        order = await prisma.order.update({
          where: { id: order.id },
          data: { status: "paid", customerEmail: session.customer_details?.email ?? undefined },
          include: { items: { include: { product: true } } },
        });
      }
    } catch (error) {
      console.error("Stripe session retrieve error", error);
    }
  }

  return (
    <div className="bg-cream-50 py-20">
      <ClearCartOnMount />
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-500/10">
          <LeafCheckIcon className="h-9 w-9 text-sage-600" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-ink-950">
          {isDemo ? "Commande enregistrée (mode démo)" : "Merci pour votre commande !"}
        </h1>
        <p className="mt-3 text-ink-950/60">
          {isDemo
            ? "Aucune clé Stripe n'est configurée : le paiement n'a pas été réellement traité, mais votre commande a bien été enregistrée dans la base de données pour la démonstration."
            : "Votre paiement a été confirmé. Un e-mail de confirmation vous sera envoyé prochainement."}
        </p>

        {order && (
          <div className="mt-10 rounded-lg border border-ink-950/10 bg-white p-6 text-left">
            <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-950/40">
              Commande #{order.id.slice(-8)}
            </p>
            <ul className="divide-y divide-ink-950/10">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.priceCents * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-ink-950/10 pt-4 font-medium">
              <span>Total</span>
              <span>{formatPrice(order.totalCents)}</span>
            </div>
          </div>
        )}

        <Link
          href="/boutique"
          className="mt-10 inline-block rounded-full bg-ink-950 px-7 py-3 text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:bg-ink-800"
        >
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
