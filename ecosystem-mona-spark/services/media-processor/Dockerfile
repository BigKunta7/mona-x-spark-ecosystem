# ===========================================
# MONA x SPARK - Media Processor Service
# Dockerfile optimisé pour la production
# ===========================================

# Image de base Node.js 18 Alpine (plus légère et sécurisée)
FROM node:18-alpine AS base

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires pour Sharp et autres packages natifs
RUN apk add --no-cache \
    curl \
    vips-dev \
    build-base \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Configurer npm pour une meilleure connectivité et sécurité
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm config set audit false && \
    npm config set fund false

# ===========================================
# ÉTAPE DE DÉVELOPPEMENT
# ===========================================
FROM base AS development

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (incluant devDependencies)
RUN npm ci --only=production --no-audit --no-fund --prefer-offline

# Copier le code source
COPY . .

# Compiler le TypeScript
RUN npm run build

# ===========================================
# ÉTAPE DE PRODUCTION
# ===========================================
FROM base AS production

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (incluant devDependencies pour la compilation)
RUN npm ci --no-audit --no-fund --prefer-offline

# Copier le code source
COPY . .

# Compiler le TypeScript
RUN npm run build

# Supprimer les devDependencies après compilation pour réduire la taille
RUN npm prune --omit=dev --no-audit --no-fund

# Changer la propriété des fichiers pour l'utilisateur non-root
RUN chown -R nodejs:nodejs /app

# Passer à l'utilisateur non-root
USER nodejs

# Exposer le port du service
EXPOSE 3003

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3003

# Health check pour vérifier que le service fonctionne
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3003/health || exit 1

# Commande de démarrage optimisée
CMD ["npm", "start"] 