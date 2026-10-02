export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  profile: string;
  volumeMl: number;
  priceCents: number;
  quantity: number;
};

export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  profile: string;
  volumeMl: number;
  priceCents: number;
  compareAtCents: number | null;
  shortDesc: string;
  featured: boolean;
};
