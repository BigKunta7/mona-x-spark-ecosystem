FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires pour Sharp
RUN apk add --no-cache curl vips-dev build-base python3 make g++

# Configurer npm pour une meilleure connectivité
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-retries 5

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (incluant devDependencies pour la compilation)
RUN npm install --no-audit --no-fund --prefer-offline

# Copier le code source
COPY . .

# Compiler le TypeScript
RUN npm run build

# Supprimer les devDependencies après compilation
RUN npm prune --omit=dev

# Exposer le port
EXPOSE 3003

# Commande de démarrage
CMD ["npm", "start"] 