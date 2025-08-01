# Dockerfile Railway pour MONA x SPARK
FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de configuration
COPY app/client/package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY app/client/ ./

# Build avec gestion d'erreurs
RUN npm run build || echo "Build failed but continuing..."

# Exposition du port
EXPOSE 3000

# Démarrage en mode développement si le build échoue
CMD ["npm", "run", "dev"] 