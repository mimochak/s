# Terra Oliva — Boutique d'huile d'olive bio

Site e-commerce pour la vente d'huile d'olive extra vierge biologique,
construit avec Next.js (App Router), Tailwind CSS, Prisma/SQLite et Stripe
(mode test).

> **Terra Oliva** est une marque et un domaine fictifs, utilisés comme
> contenu de démonstration. Remplacez le nom, les textes, les coordonnées
> et les mentions légales par les vôtres avant toute mise en ligne réelle.

## Fonctionnalités

- Page d'accueil premium (héros, process en 4 étapes, preuves qualité, newsletter)
- Catalogue produits et fiches produit détaillées (données en base SQLite via Prisma)
- Panier persistant (localStorage) avec tiroir latéral
- Tunnel de commande via Stripe Checkout (mode test) avec **repli démo**
  si aucune clé Stripe n'est configurée (la commande est enregistrée en
  base sans paiement réel)
- Pages À propos, Contact (formulaire enregistré en base) et Mentions légales

## Démarrage

```bash
npm install
cp .env.example .env        # puis éditez .env si besoin
npx prisma migrate dev --name init
npm run seed                 # charge le catalogue de démonstration
npm run dev
```

Le site est alors disponible sur http://localhost:3000.

## Configurer Stripe (optionnel)

Sans clé Stripe, le tunnel de commande fonctionne en **mode démo** : la
commande est enregistrée dans la base de données mais aucun paiement n'est
déclenché.

Pour activer de vrais paiements de test :

1. Créez un compte sur https://dashboard.stripe.com (mode Test)
2. Récupérez votre clé secrète de test (`sk_test_...`)
3. Renseignez-la dans `.env` :

```
STRIPE_SECRET_KEY="sk_test_..."
```

4. Redémarrez `npm run dev`. Utilisez une carte de test Stripe
   (ex. `4242 4242 4242 4242`, n'importe quelle date future, n'importe quel CVC).

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` / `npm start` — build et serveur de production
- `npm run seed` — réinitialise/charge le catalogue de produits

## Structure

- `src/app` — pages (App Router) et routes API (`checkout`, `contact`)
- `src/components` — composants UI partagés (panier, header, cartes produit…)
- `src/lib` — client Prisma, client Stripe, utilitaires de formatage
- `prisma/schema.prisma` — modèle de données (Product, Order, OrderItem, ContactMessage)
- `prisma/seed.ts` — catalogue de démonstration (6 produits)

## À personnaliser avant mise en production

- Nom de marque, textes, logo (actuellement une illustration SVG générique)
- Coordonnées réelles (email, téléphone, adresse) dans le footer, la page
  Contact et les Mentions légales
- Mentions légales et CGV complètes (champs `[à compléter]` dans
  `src/app/mentions-legales/page.tsx`)
- Remplacement de SQLite par une base de production (PostgreSQL, etc.) si déployé
- Clé Stripe de production + webhooks pour une gestion robuste des commandes
