export const ORDER_STATUSES = [
  "pending",
  "paid",
  "shipped",
  "cancelled",
  "demo",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  paid: "Payée",
  shipped: "Expédiée",
  cancelled: "Annulée",
  demo: "Démo",
};

export const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-sage-500/15 text-sage-700",
  shipped: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-700",
  demo: "bg-ink-950/10 text-ink-950/60",
};

export function isOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value);
}

export function orderStatusLabel(status: string): string {
  return isOrderStatus(status) ? ORDER_STATUS_LABELS[status] : status;
}

export function orderStatusStyle(status: string): string {
  return isOrderStatus(status) ? ORDER_STATUS_STYLES[status] : "bg-ink-950/10 text-ink-950/60";
}
