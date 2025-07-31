#!/bin/bash

# Script de lancement complet pour MONA x SPARK
echo "🚀 Lancement de l'écosystème MONA x SPARK..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les statuts
show_status() {
    echo -e "\n${BLUE}📊 Statut des services :${NC}"
    docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
}

# Fonction pour tester un service
test_service() {
    local service_name=$1
    local port=$2
    local url=$3
    
    echo -e "\n${YELLOW}🔍 Test du service $service_name sur le port $port...${NC}"
    
    if curl -s --connect-timeout 5 "$url" > /dev/null; then
        echo -e "${GREEN}✅ $service_name est accessible sur $url${NC}"
        return 0
    else
        echo -e "${RED}❌ $service_name n'est pas accessible sur $url${NC}"
        return 1
    fi
}

# Vérifier que Docker est en cours d'exécution
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker n'est pas en cours d'exécution${NC}"
    echo "Veuillez démarrer Docker Desktop et réessayer"
    exit 1
fi

echo -e "${GREEN}✅ Docker est en cours d'exécution${NC}"

# Démarrer les services de base
echo -e "\n${BLUE}🗄️  Démarrage des services de base...${NC}"
docker-compose up -d postgres redis

# Attendre que les services de base soient prêts
echo -e "${YELLOW}⏳ Attente que les services de base soient prêts...${NC}"
sleep 10

# Démarrer l'API
echo -e "\n${BLUE}🔧 Démarrage de l'API...${NC}"
docker-compose up -d api

# Attendre que l'API soit prête
echo -e "${YELLOW}⏳ Attente que l'API soit prête...${NC}"
sleep 15

# Démarrer le client
echo -e "\n${BLUE}🎨 Démarrage du client...${NC}"
docker-compose up -d client

# Attendre que le client soit prêt
echo -e "${YELLOW}⏳ Attente que le client soit prêt...${NC}"
sleep 20

# Démarrer les microservices
echo -e "\n${BLUE}⚙️  Démarrage des microservices...${NC}"
docker-compose up -d analytics notifications streaming-bridge

# Attendre que les microservices soient prêts
echo -e "${YELLOW}⏳ Attente que les microservices soient prêts...${NC}"
sleep 15

# Afficher le statut final
show_status

# Tester tous les services
echo -e "\n${BLUE}🧪 Tests de connectivité...${NC}"

test_service "API" "3001" "http://localhost:3001/health"
test_service "Client" "3000" "http://localhost:3000"
test_service "Analytics" "3002" "http://localhost:3002/health"
test_service "Notifications" "3004" "http://localhost:3004/health"
test_service "Streaming Bridge" "3005" "http://localhost:3005/health"

# Afficher les URLs d'accès
echo -e "\n${GREEN}🎉 Écosystème MONA x SPARK lancé !${NC}"
echo -e "\n${BLUE}📱 URLs d'accès :${NC}"
echo -e "${GREEN}• Client Next.js :${NC} http://localhost:3000"
echo -e "${GREEN}• API Backend :${NC} http://localhost:3001"
echo -e "${GREEN}• Health API :${NC} http://localhost:3001/health"
echo -e "${GREEN}• Status API :${NC} http://localhost:3001/status"
echo -e "${GREEN}• Analytics :${NC} http://localhost:3002"
echo -e "${GREEN}• Notifications :${NC} http://localhost:3004"
echo -e "${GREEN}• Streaming Bridge :${NC} http://localhost:3005"

echo -e "\n${YELLOW}💡 Commandes utiles :${NC}"
echo -e "• Voir les logs : docker-compose logs -f [service]"
echo -e "• Redémarrer un service : docker-compose restart [service]"
echo -e "• Arrêter tout : docker-compose down"
echo -e "• Voir le statut : docker-compose ps"

echo -e "\n${BLUE}🔗 Base de données :${NC}"
echo -e "• PostgreSQL : localhost:5432"
echo -e "• Redis : localhost:6379" 