#!/usr/bin/env bash
# Déploiement / mise à jour de Golden Spoon sur un VPS qui héberge déjà
# d'autres services. Ce script est conçu pour ne RIEN modifier de ce qui
# existe déjà :
#   - Node.js est installé via nvm, isolé dans ce compte utilisateur
#     (le Node système, s'il existe, n'est ni touché ni remplacé).
#   - Le port de l'application est détecté automatiquement (premier port
#     libre à partir de 3000), pour ne pas entrer en conflit avec une
#     application déjà en écoute.
#   - Nginx n'est modifié QUE si un nom de domaine est fourni, et
#     uniquement par l'ajout d'un nouveau fichier de site — aucun site
#     existant n'est touché ou supprimé.
#   - PM2 ajoute cette application à la liste des process gérés sans
#     toucher aux applications déjà démarrées.
#
# Usage :
#   bash deploy/setup.sh                      # accès direct par http://IP:PORT
#   bash deploy/setup.sh boutique.exemple.fr    # + Nginx + HTTPS (Let's Encrypt)
#
# Peut être relancé sans danger pour mettre à jour le site (il réutilise le
# port déjà choisi lors du premier lancement, stocké dans .env).

set -euo pipefail

REPO_URL="https://github.com/mimochak/s.git"
BRANCH="claude/ecommerce-olive-oil-site-mri2jo"
APP_DIR="$HOME/golden-spoon"
DOMAIN="${1:-}"

if [ -d "$APP_DIR" ] && [ ! -d "$APP_DIR/.git" ]; then
  echo "❌ $APP_DIR existe déjà et n'est pas un dépôt git de ce projet." >&2
  echo "   Choisissez un autre emplacement ou renommez/supprimez ce dossier avant de relancer." >&2
  exit 1
fi

echo "==> Paquets de base (curl, git — n'affecte rien d'existant)"
sudo apt-get update -y
sudo apt-get install -y curl git ca-certificates

echo "==> Node.js 22 via nvm (isolé dans ce compte, ne remplace pas un Node système existant)"
export NVM_DIR="$HOME/.nvm"
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi
# shellcheck disable=SC1091
\. "$NVM_DIR/nvm.sh"
nvm install 22 >/dev/null
nvm use 22 >/dev/null

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installation de PM2 (ajoute juste cette appli à vos process gérés)"
  npm install -g pm2
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
fi

echo "==> Recherche d'un port libre pour l'application"
# Point de départ : PORT (variable d'env passée à l'appel) > valeur déjà
# stockée dans .env lors d'un lancement précédent > 3000 par défaut.
# Dans tous les cas, le port est vérifié ci-dessous et incrémenté s'il est occupé.
EXISTING_PORT="$(grep -E '^PORT=' .env 2>/dev/null | head -1 | cut -d'"' -f2 || true)"
PORT="${PORT:-${EXISTING_PORT:-3000}}"
echo "    Point de départ : $PORT"
while (exec 3<>"/dev/tcp/127.0.0.1/$PORT") 2>/dev/null; do
  echo "    Port $PORT occupé, essai du suivant…"
  exec 3<&- 3>&- 2>/dev/null || true
  PORT=$((PORT + 1))
done
if grep -q '^PORT=' .env 2>/dev/null; then
  sed -i "s#^PORT=.*#PORT=\"$PORT\"#" .env
else
  echo "PORT=\"$PORT\"" >> .env
fi
echo "    Port choisi : $PORT"

if [ -n "$DOMAIN" ]; then
  sed -i "s#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=\"https://$DOMAIN\"#" .env
else
  sed -i "s#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=\"http://localhost:$PORT\"#" .env
fi

echo "==> Migration et initialisation de la base de données"
npx prisma migrate deploy
npm run seed

echo "==> Build de production"
npm run build

echo "==> Démarrage / redémarrage de l'application (PM2)"
export PORT
if pm2 describe golden-spoon >/dev/null 2>&1; then
  pm2 delete golden-spoon >/dev/null 2>&1 || true
fi
pm2 start ecosystem.config.js
pm2 save

echo "==> Démarrage automatique au redémarrage du serveur (best-effort, n'écrase aucun service existant)"
STARTUP_CMD="$(pm2 startup systemd -u "$USER" --hp "$HOME" 2>/dev/null | tail -1 || true)"
if [[ "$STARTUP_CMD" == sudo* ]]; then
  eval "$STARTUP_CMD" || echo "   (pm2 startup a échoué — ce n'est pas bloquant, l'appli tourne quand même)"
fi

if command -v ufw >/dev/null 2>&1 && sudo ufw status | grep -q "Status: active"; then
  echo "==> Ouverture du port $PORT dans le pare-feu (règle ajoutée, rien d'existant n'est retiré)"
  sudo ufw allow "$PORT/tcp" || true
fi

if [ -n "$DOMAIN" ]; then
  echo "==> Installation de Nginx/Certbot si nécessaire (n'affecte pas vos sites existants)"
  sudo apt-get install -y nginx certbot python3-certbot-nginx

  echo "==> Ajout d'un nouveau site Nginx pour $DOMAIN (vos sites existants ne sont pas modifiés)"
  sed "s/__SERVER_NAME__/$DOMAIN/; s/__PORT__/$PORT/" deploy/nginx.conf.template \
    | sudo tee "/etc/nginx/sites-available/golden-spoon" >/dev/null
  sudo ln -sf "/etc/nginx/sites-available/golden-spoon" "/etc/nginx/sites-enabled/golden-spoon"
  sudo nginx -t
  sudo systemctl reload nginx

  if command -v ufw >/dev/null 2>&1 && sudo ufw status | grep -q "Status: active"; then
    sudo ufw allow "Nginx Full" || true
  fi

  echo "==> HTTPS (Let's Encrypt) pour $DOMAIN"
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" --redirect \
    || echo "⚠️  Certbot a échoué — vérifiez que $DOMAIN pointe bien (DNS A/AAAA) vers ce serveur, puis relancez : sudo certbot --nginx -d $DOMAIN"
fi

echo ""
echo "✅ Déploiement terminé."
if [ -n "$DOMAIN" ]; then
  echo "   Site  : https://$DOMAIN"
  echo "   Admin : https://$DOMAIN/admin"
else
  PUBLIC_IP="$(curl -s https://ifconfig.me || true)"
  echo "   Site  : http://${PUBLIC_IP:-<IP_DU_VPS>}:$PORT"
  echo "   Admin : http://${PUBLIC_IP:-<IP_DU_VPS>}:$PORT/admin"
fi
echo ""
echo "⚠️  Pensez à définir un vrai mot de passe admin :"
echo "    nano $APP_DIR/.env   # modifiez ADMIN_PASSWORD"
echo "    pm2 restart golden-spoon"
