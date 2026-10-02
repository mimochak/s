import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "fruite-vert-250ml",
    name: "Huile d'Olive Bio — Fruité Vert",
    profile: "Fruité Vert",
    volumeMl: 250,
    priceCents: 990,
    compareAtCents: null,
    stock: 120,
    shortDesc: "Notes herbacées et piquantes, pressée à froid dès la récolte.",
    description:
      "Notre Fruité Vert est extraite à froid dans les 24 heures suivant la récolte, à partir d'olives encore vertes. Résultat : une huile vive, aux arômes d'herbe fraîche et d'artichaut, avec une pointe de piquant caractéristique des polyphénols naturellement préservés. Idéale crue, sur des légumes grillés ou une bruschetta.",
    harvestYear: 2025,
    region: "Vallée des Baux, France",
    featured: false,
    position: 1,
  },
  {
    slug: "fruite-vert-500ml",
    name: "Huile d'Olive Bio — Fruité Vert",
    profile: "Fruité Vert",
    volumeMl: 500,
    priceCents: 1590,
    compareAtCents: null,
    stock: 160,
    shortDesc: "Notes herbacées et piquantes, pressée à froid dès la récolte.",
    description:
      "Notre Fruité Vert est extraite à froid dans les 24 heures suivant la récolte, à partir d'olives encore vertes. Résultat : une huile vive, aux arômes d'herbe fraîche et d'artichaut, avec une pointe de piquant caractéristique des polyphénols naturellement préservés. Idéale crue, sur des légumes grillés ou une bruschetta.",
    harvestYear: 2025,
    region: "Vallée des Baux, France",
    featured: true,
    position: 2,
  },
  {
    slug: "fruite-vert-1l",
    name: "Huile d'Olive Bio — Fruité Vert",
    profile: "Fruité Vert",
    volumeMl: 1000,
    priceCents: 2890,
    compareAtCents: 3200,
    stock: 90,
    shortDesc: "Notes herbacées et piquantes, pressée à froid dès la récolte.",
    description:
      "Notre Fruité Vert est extraite à froid dans les 24 heures suivant la récolte, à partir d'olives encore vertes. Résultat : une huile vive, aux arômes d'herbe fraîche et d'artichaut, avec une pointe de piquant caractéristique des polyphénols naturellement préservés. Idéale crue, sur des légumes grillés ou une bruschetta.",
    harvestYear: 2025,
    region: "Vallée des Baux, France",
    featured: true,
    position: 3,
  },
  {
    slug: "fruite-mur-500ml",
    name: "Huile d'Olive Bio — Fruité Mûr",
    profile: "Fruité Mûr",
    volumeMl: 500,
    priceCents: 1690,
    compareAtCents: null,
    stock: 140,
    shortDesc: "Ronde et douce, pour la cuisine du quotidien.",
    description:
      "Issue d'olives récoltées à pleine maturité, cette huile développe des notes rondes d'amande fraîche et de fruits mûrs, sans amertume excessive. Son équilibre doux en fait l'huile idéale pour la cuisson, les sauces et la pâtisserie salée, tout en gardant la richesse en antioxydants d'une extraction à froid.",
    harvestYear: 2025,
    region: "Vallée des Baux, France",
    featured: true,
    position: 4,
  },
  {
    slug: "fruite-mur-1l",
    name: "Huile d'Olive Bio — Fruité Mûr",
    profile: "Fruité Mûr",
    volumeMl: 1000,
    priceCents: 2990,
    compareAtCents: null,
    stock: 100,
    shortDesc: "Ronde et douce, pour la cuisine du quotidien.",
    description:
      "Issue d'olives récoltées à pleine maturité, cette huile développe des notes rondes d'amande fraîche et de fruits mûrs, sans amertume excessive. Son équilibre doux en fait l'huile idéale pour la cuisson, les sauces et la pâtisserie salée, tout en gardant la richesse en antioxydants d'une extraction à froid.",
    harvestYear: 2025,
    region: "Vallée des Baux, France",
    featured: false,
    position: 5,
  },
  {
    slug: "coffret-decouverte",
    name: "Coffret Découverte — 2 x 250ml",
    profile: "Duo Fruité Vert & Fruité Mûr",
    volumeMl: 500,
    priceCents: 2490,
    compareAtCents: 2780,
    stock: 60,
    shortDesc: "Les deux profils, pour comparer et choisir son préféré.",
    description:
      "Le Coffret Découverte réunit nos deux profils signature en format 250ml : le Fruité Vert, vif et herbacé, et le Fruité Mûr, rond et doux. Présenté dans un étui cadeau, c'est la façon idéale de découvrir toute la palette aromatique de notre huile d'olive extra vierge biologique — ou d'offrir un cadeau gourmand.",
    harvestYear: 2025,
    region: "Vallée des Baux, France",
    featured: true,
    position: 0,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Catalogue initialisé : ${products.length} produits.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
