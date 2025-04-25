FROM node:20

WORKDIR /app

# Installation des dépendances globales
RUN npm install -g @nestjs/cli

# Copie des fichiers package.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers
COPY . .

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start:dev"]