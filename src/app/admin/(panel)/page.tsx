import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { StatCard } from "@/components/admin/StatCard";
import { orderStatusLabel, orderStatusStyle } from "@/lib/orderStatus";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tableau de bord — Admin",
};

export default async function AdminDashboardPage() {
  const [revenueAgg, orderCount, productCounts, unreadMessages, recentOrders, recentMessages] =
    await Promise.all([
      prisma.order.aggregate({
        where: { status: { in: ["paid", "shipped"] } },
        _sum: { totalCents: true },
      }),
      prisma.order.count(),
      prisma.product.count({ where: { active: true } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: true },
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink-950">Tableau de bord</h1>
      <p className="mt-1 text-sm text-ink-950/50">Vue d&rsquo;ensemble de la boutique.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Chiffre d'affaires"
          value={formatPrice(revenueAgg._sum.totalCents ?? 0)}
          note="Commandes payées + expédiées"
        />
        <StatCard label="Commandes" value={String(orderCount)} />
        <StatCard label="Produits actifs" value={String(productCounts)} />
        <StatCard
          label="Messages non lus"
          value={String(unreadMessages)}
          note={unreadMessages > 0 ? "À traiter" : undefined}
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-ink-950/10 bg-white">
          <div className="flex items-center justify-between border-b border-ink-950/10 px-5 py-4">
            <h2 className="font-serif text-lg text-ink-950">Commandes récentes</h2>
            <Link href="/admin/commandes" className="text-xs uppercase tracking-widest2 text-sage-600 hover:underline">
              Tout voir
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-ink-950/50">Aucune commande pour le moment.</p>
          ) : (
            <ul className="divide-y divide-ink-950/10">
              {recentOrders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/admin/commandes/${order.id}`}
                    className="flex items-center justify-between px-5 py-3 text-sm transition hover:bg-cream-50"
                  >
                    <div>
                      <p className="font-medium text-ink-950">#{order.id.slice(-8)}</p>
                      <p className="text-xs text-ink-950/50">
                        {order.items.length} article{order.items.length > 1 ? "s" : ""} ·{" "}
                        {order.createdAt.toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-ink-950">{formatPrice(order.totalCents)}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${orderStatusStyle(order.status)}`}>
                        {orderStatusLabel(order.status)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-ink-950/10 bg-white">
          <div className="flex items-center justify-between border-b border-ink-950/10 px-5 py-4">
            <h2 className="font-serif text-lg text-ink-950">Messages récents</h2>
            <Link href="/admin/messages" className="text-xs uppercase tracking-widest2 text-sage-600 hover:underline">
              Tout voir
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-ink-950/50">Aucun message pour le moment.</p>
          ) : (
            <ul className="divide-y divide-ink-950/10">
              {recentMessages.map((message) => (
                <li key={message.id}>
                  <Link
                    href={`/admin/messages/${message.id}`}
                    className="flex items-center justify-between px-5 py-3 text-sm transition hover:bg-cream-50"
                  >
                    <div>
                      <p className={`font-medium ${message.read ? "text-ink-950/70" : "text-ink-950"}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-ink-950/50">
                        {message.name} · {message.createdAt.toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    {!message.read && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-gold-500" />}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
