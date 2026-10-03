#!/usr/bin/env bash
# Déploiement / mise à jour de Golden Spoon sur un VPS Ubuntu/Debian frais.
#
# Usage :
#   bash deploy/setup.sh                    # accès par IP uniquement (http)
#   bash deploy/setup.sh boutique.exemple.fr  # + Nginx + HTTPS via Let's Encrypt
#
# Peut être relancé sans danger pour mettre à jour le site (git pull + rebuild).

set -euo pipefail

REPO_URL="https://github.com/mimochak/s.git"
BRANCH="claude/ecommerce-olive-oil-site-mri2jo"
APP_DIR="$HOME/golden-spoon"
DOMAIN="${1:-}"

echo "==> Mise à jour des paquets système"
sudo apt-get update -y
sudo apt-get install -y curl git nginx ca-certificates

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v22* ]]; then
  echo "==> Installation de Node.js 22"
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installation de PM2"
  sudo npm install -g pm2
fi

echo "==> Récupération du code (${BRANCH})"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch origin "$BRANCH"
  git -C "$APP_DIR" checkout "$BRANCH"
  git -C "$APP_DIR" reset --hard "origin/$BRANCH"
else
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
fi
cd "$APP_DIR"

echo "==> Installation des dépendances"
npm ci

if [ ! -f .env ]; then
  echo "==> Création de .env"
  cp .env.example .env
  SECRET="$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")"
  sed -i "s#^ADMIN_SESSION_SECRET=.*#ADMIN_SESSION_SECRET=\"$SECRET\"#" .env
  if [ -n "$DOMAIN" ]; then
    sed -i "s#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=\"https://$DOMAIN\"#" .env
  fi
fi

echo "==> Migration et initialisation de la base de données"
npx prisma migrate deploy
npm run seed

echo "==> Build de production"
npm run build

echo "==> Démarrage / redémarrage de l'application (PM2)"
if pm2 describe golden-spoon >/dev/null 2>&1; then
  pm2 reload ecosystem.config.js
else
  pm2 start ecosystem.config.js
fi
pm2 save
STARTUP_CMD="$(pm2 startup systemd -u "$USER" --hp "$HOME" 2>/dev/null | tail -1 || true)"
if [[ "$STARTUP_CMD" == sudo* ]]; then
  eval "$STARTUP_CMD"
fi

echo "==> Configuration de Nginx"
SERVER_NAME="${DOMAIN:-_}"
sed "s/__SERVER_NAME__/$SERVER_NAME/" deploy/nginx.conf.template | sudo tee /etc/nginx/sites-available/golden-spoon >/dev/null
sudo ln -sf /etc/nginx/sites-available/golden-spoon /etc/nginx/sites-enabled/golden-spoon
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

if command -v ufw >/dev/null 2>&1 && sudo ufw status | grep -q "Status: active"; then
  sudo ufw allow "Nginx Full" || true
  sudo ufw allow OpenSSH || true
fi

if [ -n "$DOMAIN" ]; then
  echo "==> HTTPS (Let's Encrypt) pour $DOMAIN"
  sudo apt-get install -y certbot python3-certbot-nginx
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" --redirect \
    || echo "⚠️  Certbot a échoué — vérifiez que $DOMAIN pointe bien (DNS A/AAAA) vers ce serveur, puis relancez : sudo certbot --nginx -d $DOMAIN"
fi

echo ""
echo "✅ Déploiement terminé."
if [ -n "$DOMAIN" ]; then
  echo "   Site     : https://$DOMAIN"
  echo "   Admin    : https://$DOMAIN/admin"
else
  PUBLIC_IP="$(curl -s https://ifconfig.me || true)"
  echo "   Site     : http://${PUBLIC_IP:-<IP_DU_VPS>}"
  echo "   Admin    : http://${PUBLIC_IP:-<IP_DU_VPS>}/admin"
fi
echo ""
echo "⚠️  Pensez à définir un vrai mot de passe admin :"
echo "    nano $APP_DIR/.env   # modifiez ADMIN_PASSWORD"
echo "    pm2 restart golden-spoon"
