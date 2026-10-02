export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export function formatVolume(volumeMl: number): string {
  if (volumeMl >= 1000) {
    const liters = volumeMl / 1000;
    return `${liters.toLocaleString("fr-FR")} L`;
  }
  return `${volumeMl} ml`;
}
