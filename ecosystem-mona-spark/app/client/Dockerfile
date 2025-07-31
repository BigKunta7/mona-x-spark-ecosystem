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

# Installer les dépendances avec des options de résilience
RUN npm install --no-audit --no-fund --prefer-offline

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"] 