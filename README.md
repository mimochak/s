# Golden Spoon — Boutique d'huile d'olive bio

Site e-commerce pour la vente d'huile d'olive extra vierge biologique,
construit avec Next.js (App Router), Tailwind CSS, Prisma/SQLite et Stripe
(mode test). Inclut un espace d'administration protégé par mot de passe.

> **Golden Spoon** est une marque et un domaine fictifs, utilisés comme
> contenu de démonstration. Le nom « Golden Spoon » est par ailleurs déjà
> utilisé comme marque commerciale par une autre entreprise (huile d'olive
> tunisienne) — vérifiez sa disponibilité avant tout usage commercial réel.
> Remplacez le nom, les textes, les coordonnées et les mentions légales par
> les vôtres avant toute mise en ligne réelle.

## Fonctionnalités

### Boutique (publique)

- Page d'accueil premium (héros, process en 4 étapes, preuves qualité, newsletter)
- Catalogue produits et fiches produit détaillées (données en base SQLite via Prisma)
- Panier persistant (localStorage) avec tiroir latéral
- Tunnel de commande via Stripe Checkout (mode test) avec **repli démo**
  si aucune clé Stripe n'est configurée (la commande est enregistrée en
  base sans paiement réel)
- Pages À propos, Contact (formulaire enregistré en base) et Mentions légales

### Administration (`/admin`)

- Connexion par mot de passe (session signée, cookie httpOnly)
- Tableau de bord : chiffre d'affaires, commandes, produits actifs, messages non lus
- Gestion des produits : création, modification, archivage (les produits
  archivés disparaissent de la boutique mais restent liés aux commandes passées)
- Gestion des commandes : liste filtrable par statut, détail, mise à jour du statut
- Messages de contact : boîte de réception, marquage lu/non lu, suppression

## Démarrage

```bash
npm install
cp .env.example .env        # puis éditez .env (voir ci-dessous)
npx prisma migrate dev --name init
npm run seed                 # charge le catalogue de démonstration
npm run dev
```

Le site est alors disponible sur http://localhost:3000, et l'administration
sur http://localhost:3000/admin.

## Configurer l'administration

Avant le premier lancement, définissez dans `.env` :

```
ADMIN_PASSWORD="votre-mot-de-passe"
ADMIN_SESSION_SECRET="une-chaine-aleatoire-longue"
```

Générez une valeur pour `ADMIN_SESSION_SECRET` avec :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

> Il n'y a qu'un seul compte admin (pas de gestion multi-utilisateurs). Pour
> un usage en production avec plusieurs personnes, prévoyez une évolution
> vers une vraie table d'utilisateurs avec mots de passe individuels.

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

- `src/app/(shop)` — pages publiques de la boutique (regroupées pour avoir
  leur propre layout racine, distinct de l'admin)
- `src/app/admin` — espace d'administration (`login/` public,
  `(panel)/` protégé : tableau de bord, produits, commandes, messages)
- `src/app/api` — routes API (`checkout`, `contact`)
- `src/proxy.ts` — protège les routes `/admin/*` (redirige vers la
  connexion si la session n'est pas valide)
- `src/components` — composants UI partagés (panier, header, cartes produit…)
- `src/components/admin` — composants UI de l'administration
- `src/lib` — client Prisma, client Stripe, session admin, utilitaires
- `prisma/schema.prisma` — modèle de données (Product, Order, OrderItem, ContactMessage)
- `prisma/seed.ts` — catalogue de démonstration (6 produits)

## À personnaliser avant mise en production

- Nom de marque, textes, logo (actuellement une illustration SVG générique)
- Coordonnées réelles (email, téléphone, adresse) dans le footer, la page
  Contact et les Mentions légales
- Mentions légales et CGV complètes (champs `[à compléter]` dans
  `src/app/(shop)/mentions-legales/page.tsx`)
- `ADMIN_PASSWORD` et `ADMIN_SESSION_SECRET` (valeurs uniques et secrètes)
- Remplacement de SQLite par une base de production (PostgreSQL, etc.) si déployé
- Clé Stripe de production + webhooks pour une gestion robuste des commandes
