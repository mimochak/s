import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { ORDER_STATUSES, orderStatusLabel, orderStatusStyle } from "@/lib/orderStatus";
import { updateOrderStatus } from "../actions";

export const metadata: Metadata = {
  title: "Détail commande — Admin",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/commandes" className="text-xs uppercase tracking-widest2 text-ink-950/50 hover:text-ink-950">
        ← Commandes
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink-950">Commande #{order.id.slice(-8)}</h1>
          <p className="mt-1 text-sm text-ink-950/50">
            Créée le {order.createdAt.toLocaleDateString("fr-FR")} à{" "}
            {order.createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${orderStatusStyle(order.status)}`}>
          {orderStatusLabel(order.status)}
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-ink-950/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-950/10 bg-cream-50 text-xs uppercase tracking-widest2 text-ink-950/50">
              <tr>
                <th className="px-5 py-3">Produit</th>
                <th className="px-5 py-3">Qté</th>
                <th className="px-5 py-3 text-right">Prix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-950/10">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink-950">{item.product.name}</p>
                    <p className="text-xs text-ink-950/50">{item.product.profile}</p>
                  </td>
                  <td className="px-5 py-4 text-ink-950/70">{item.quantity}</td>
                  <td className="px-5 py-4 text-right text-ink-950/70">{formatPrice(item.priceCents * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-ink-950/10">
                <td className="px-5 py-4 font-medium text-ink-950" colSpan={2}>
                  Total
                </td>
                <td className="px-5 py-4 text-right font-medium text-ink-950">{formatPrice(order.totalCents)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-ink-950/10 bg-white p-5">
            <h2 className="text-xs uppercase tracking-widest2 text-ink-950/50">Client</h2>
            <p className="mt-2 text-sm text-ink-950/70">{order.customerEmail ?? "Non renseigné"}</p>
            {order.stripeSessionId && (
              <>
                <h2 className="mt-4 text-xs uppercase tracking-widest2 text-ink-950/50">Session Stripe</h2>
                <p className="mt-2 break-all text-xs text-ink-950/50">{order.stripeSessionId}</p>
              </>
            )}
          </div>

          <div className="rounded-lg border border-ink-950/10 bg-white p-5">
            <h2 className="mb-3 text-xs uppercase tracking-widest2 text-ink-950/50">Mettre à jour le statut</h2>
            <form action={updateOrderStatus.bind(null, order.id)} className="flex items-center gap-2">
              <select name="status" defaultValue={order.status} className="flex-1 rounded-md border border-ink-950/15 px-3 py-2 text-sm">
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {orderStatusLabel(s)}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-full bg-ink-950 px-4 py-2 text-xs font-medium uppercase tracking-widest2 text-cream-50 hover:bg-ink-800"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
