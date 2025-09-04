# 1. Image de base officielle Node.js
FROM node:20-alpine

# 2. Définir le répertoire de travail dans le conteneur
WORKDIR /app

# 3. Copier package.json et package-lock.json (si présent)
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install --production

# 5. Copier le reste du projet
COPY . .

# 6. Exposer le port utilisé par l'application
EXPOSE 3000

# 7. Commande pour démarrer l'application
CMD ["node", "main.js"]
