FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache curl

# Configurer npm pour une meilleure connectivité
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-retries 5

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (y compris dev pour ts-node)
RUN npm install --no-audit --no-fund --prefer-offline

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3004

# Commande de démarrage avec healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3004/health || exit 1

# Commande de démarrage
CMD ["npm", "start"] 