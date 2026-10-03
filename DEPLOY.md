# Déployer Golden Spoon sur un VPS (partagé avec d'autres services)

Ce script est conçu pour un VPS qui héberge **déjà d'autres sites/applications**.
Il ne touche à rien d'existant :

| Ce qui pourrait entrer en conflit | Comment le script l'évite |
| --- | --- |
| Un Node.js système déjà installé (autre version) | Installe Node 22 via **nvm**, isolé dans le compte utilisateur — le Node système n'est ni modifié ni remplacé |
| Une application déjà en écoute sur le port 3000 | Détecte automatiquement le **premier port libre** à partir de 3000 et le réutilise à chaque relance (stocké dans `.env`) |
| Nginx déjà configuré pour d'autres sites | N'est modifié **que si vous fournissez un nom de domaine** ; dans ce cas, un **nouveau** fichier de site est ajouté — aucun site existant n'est touché ou supprimé |
| D'autres applications gérées par PM2 | La nôtre est simplement ajoutée à la liste (`pm2 list`), rien d'autre n'est redémarré ou arrêté |

## 1. Connectez-vous à votre VPS

```bash
ssh ubuntu@VOTRE_IP
```

## 2. Lancez le script de déploiement

**Accès direct par IP, sans toucher à Nginx** (ce que vous avez choisi pour l'instant) :

```bash
git clone --branch claude/ecommerce-olive-oil-site-mri2jo https://github.com/mimochak/s.git golden-spoon
cd golden-spoon
bash deploy/setup.sh
```

Le site sera accessible sur `http://VOTRE_IP:PORT` — le port exact (3000, 3001…
selon ce qui est déjà pris) est affiché à la fin du script.

**Plus tard, avec un nom de domaine** (pointez d'abord un enregistrement DNS
A/AAAA vers l'IP du VPS), pour avoir Nginx + HTTPS automatique :

```bash
cd ~/golden-spoon
bash deploy/setup.sh boutique.votre-domaine.fr
```

Le script (`deploy/setup.sh`, lisible avant exécution) est **idempotent** :
relancez-le à tout moment pour mettre à jour le site ou pour ajouter un
domaine après coup.

## 3. Sécurisez l'accès admin

À la fin du script, éditez le mot de passe admin (la valeur par défaut est
`changeme`) :

```bash
nano ~/golden-spoon/.env    # ADMIN_PASSWORD="votre-mot-de-passe-fort"
pm2 restart golden-spoon
```

L'admin est accessible sur `/admin` (ex. `http://VOTRE_IP:PORT/admin`).

## 4. (Recommandé) Sécurisez le VPS lui-même

Le mot de passe utilisé pour la connexion a transité en clair dans la
conversation qui a servi à préparer ce déploiement — par précaution :

```bash
passwd                 # changez le mot de passe de l'utilisateur
```

Et envisagez de passer à une authentification par clé SSH puis de désactiver
l'authentification par mot de passe dans `/etc/ssh/sshd_config`
(`PasswordAuthentication no`).

## Vérifier qu'on ne dérange rien avant de lancer

```bash
pm2 list                 # applications déjà gérées par PM2 (rien ne sera arrêté)
sudo nginx -T 2>/dev/null | grep server_name   # sites Nginx déjà configurés
node -v                  # version du Node système actuel (ne sera pas touchée)
ss -ltn                  # ports déjà occupés
```

## Mettre à jour le site plus tard

```bash
cd ~/golden-spoon
bash deploy/setup.sh                              # garde le même port/domaine
# ou, pour (re)configurer un domaine :
bash deploy/setup.sh boutique.votre-domaine.fr
```

Ou manuellement :

```bash
cd ~/golden-spoon
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh" && nvm use 22
git pull
npm ci
npx prisma migrate deploy
npm run build
pm2 restart golden-spoon
```

## Commandes utiles

```bash
pm2 status               # état de toutes les applications gérées
pm2 logs golden-spoon    # logs en direct de ce site uniquement
pm2 restart golden-spoon
cat ~/golden-spoon/.env | grep PORT   # retrouver le port utilisé
```

## Stripe (optionnel)

Sans clé Stripe, les commandes passent en **mode démo** (enregistrées en
base sans paiement réel). Pour activer de vrais paiements de test, ajoutez
`STRIPE_SECRET_KEY` dans `.env` puis `pm2 restart golden-spoon` (voir le
`README.md` principal).

## Limites de cette configuration

- **SQLite** : suffit pour démarrer, mais pour un trafic important migrez
  vers PostgreSQL (adapter `DATABASE_URL` et `provider` dans
  `prisma/schema.prisma`).
- **Un seul process Node** : PM2 peut être configuré en mode cluster
  (`instances: "max"` dans `ecosystem.config.js`) si besoin de monter en charge.
- **Sauvegardes** : pensez à sauvegarder régulièrement `~/golden-spoon/prisma/dev.db`.
