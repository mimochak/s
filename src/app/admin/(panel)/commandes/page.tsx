import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { ORDER_STATUSES, orderStatusLabel, orderStatusStyle, isOrderStatus } from "@/lib/orderStatus";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Commandes — Admin",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && isOrderStatus(status) ? status : undefined;

  const orders = await prisma.order.findMany({
    where: filter ? { status: filter } : undefined,
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink-950">Commandes</h1>
      <p className="mt-1 text-sm text-ink-950/50">{orders.length} commande(s).</p>

      <form method="get" className="mt-6 flex items-center gap-3">
        <label className="text-xs uppercase tracking-widest2 text-ink-950/50">Filtrer par statut</label>
        <select
          name="status"
          defaultValue={filter ?? ""}
          className="rounded-md border border-ink-950/15 px-3 py-2 text-sm"
        >
          <option value="">Tous</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {orderStatusLabel(s)}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-full bg-ink-950 px-4 py-2 text-xs font-medium uppercase tracking-widest2 text-cream-50 hover:bg-ink-800">
          Filtrer
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-lg border border-ink-950/10 bg-white">
        {orders.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-ink-950/50">Aucune commande.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-950/10 bg-cream-50 text-xs uppercase tracking-widest2 text-ink-950/50">
              <tr>
                <th className="px-5 py-3">Commande</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Articles</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-950/10">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-4">
                    <Link href={`/admin/commandes/${order.id}`} className="font-medium text-ink-950 hover:underline">
                      #{order.id.slice(-8)}
                    </Link>
                    {order.customerEmail && <p className="text-xs text-ink-950/50">{order.customerEmail}</p>}
                  </td>
                  <td className="px-5 py-4 text-ink-950/70">
                    {order.createdAt.toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-4 text-ink-950/70">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                  </td>
                  <td className="px-5 py-4 font-medium text-ink-950">{formatPrice(order.totalCents)}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${orderStatusStyle(order.status)}`}>
                      {orderStatusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
