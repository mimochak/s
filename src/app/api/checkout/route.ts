import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled } from "@/lib/stripe";

type IncomingItem = {
  productId: string;
  quantity: number;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const items: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];

  if (items.length === 0) {
    return NextResponse.json({ error: "Le panier est vide." }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const orderItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const quantity = Math.max(1, Math.min(99, Math.floor(item.quantity) || 1));
      if (!product) return null;
      return { product, quantity };
    })
    .filter((i): i is { product: (typeof products)[number]; quantity: number } => i !== null);

  if (orderItems.length === 0) {
    return NextResponse.json({ error: "Produits introuvables." }, { status: 400 });
  }

  const totalCents = orderItems.reduce(
    (sum, { product, quantity }) => sum + product.priceCents * quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      totalCents,
      status: stripeEnabled ? "pending" : "demo",
      items: {
        create: orderItems.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
          priceCents: product.priceCents,
        })),
      },
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!stripeEnabled || !stripe) {
    return NextResponse.json({
      url: `/commande/succes?order_id=${order.id}&demo=1`,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: orderItems.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "eur",
          unit_amount: product.priceCents,
          product_data: {
            name: `${product.name} — ${product.profile}`,
          },
        },
      })),
      success_url: `${siteUrl}/commande/succes?order_id=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/commande/annulee?order_id=${order.id}`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: "Impossible de contacter Stripe. Réessayez plus tard." },
      { status: 502 }
    );
  }
}
