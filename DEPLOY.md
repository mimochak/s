# Déployer Golden Spoon sur un VPS

Ce guide déploie le site sur un VPS Ubuntu/Debian frais (testé pour Ubuntu
24.04) avec Nginx en reverse proxy, PM2 pour garder l'application en vie, et
HTTPS automatique via Let's Encrypt si vous avez un nom de domaine.

## 1. Connectez-vous à votre VPS

```bash
ssh ubuntu@VOTRE_IP
```

## 2. Lancez le script de déploiement

**Avec un nom de domaine** (recommandé — pointez d'abord un enregistrement
DNS A/AAAA vers l'IP du VPS) :

```bash
git clone --branch claude/ecommerce-olive-oil-site-mri2jo https://github.com/mimochak/s.git golden-spoon
cd golden-spoon
bash deploy/setup.sh boutique.votre-domaine.fr
```

**Sans domaine, juste pour tester par IP** (en HTTP, sans certificat) :

```bash
git clone --branch claude/ecommerce-olive-oil-site-mri2jo https://github.com/mimochak/s.git golden-spoon
cd golden-spoon
bash deploy/setup.sh
```

Le script (`deploy/setup.sh`, lisible avant exécution) installe Node.js 22,
Nginx, PM2 et Certbot, clone/compile l'application, initialise la base de
données SQLite avec le catalogue de démonstration, démarre le site avec PM2
et configure Nginx (+ HTTPS si un domaine est fourni). Il est **idempotent** :
vous pouvez le relancer pour mettre à jour le site.

## 3. Sécurisez l'accès admin

À la fin du script, éditez le mot de passe admin (la valeur par défaut est
`changeme`) :

```bash
nano ~/golden-spoon/.env    # ADMIN_PASSWORD="votre-mot-de-passe-fort"
pm2 restart golden-spoon
```

L'admin est accessible sur `/admin` (ex. `https://boutique.votre-domaine.fr/admin`).

## 4. (Recommandé) Sécurisez le VPS lui-même

Le mot de passe root/ubuntu que vous avez utilisé pour vous connecter a
transité en clair dans cette conversation — par précaution :

```bash
passwd                 # changez le mot de passe de l'utilisateur
```

Et envisagez de passer à une authentification par clé SSH puis de désactiver
l'authentification par mot de passe dans `/etc/ssh/sshd_config`
(`PasswordAuthentication no`).

## Mettre à jour le site plus tard

```bash
cd ~/golden-spoon
bash deploy/setup.sh boutique.votre-domaine.fr   # mêmes arguments qu'au premier lancement
```

Ou manuellement :

```bash
cd ~/golden-spoon
git pull
npm ci
npx prisma migrate deploy
npm run build
pm2 restart golden-spoon
```

## Commandes utiles

```bash
pm2 status              # état de l'application
pm2 logs golden-spoon   # logs en direct
pm2 restart golden-spoon
sudo nginx -t && sudo systemctl reload nginx   # après modif de la config Nginx
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
- **Sauvegardes** : pensez à sauvegarder régulièrement `prisma/dev.db`.
