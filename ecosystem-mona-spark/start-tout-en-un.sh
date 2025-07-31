#!/bin/bash

# MONA x SPARK - Script de Démarrage Tout-en-Un
# Solution centralisée sans dépendances externes

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logo MONA x SPARK
echo -e "${PURPLE}"
cat << "EOF"
███╗   ███╗ ██████╗ ███╗   ██╗ █████╗     ███████╗██████╗  █████╗ ██████╗ ██╗  ██╗
████╗ ████║██╔═══██╗████╗  ██║██╔══██╗    ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝
██╔████╔██║██║   ██║██╔██╗ ██║███████║    ███████╗██████╔╝███████║██████╔╝█████╔╝ 
██║╚██╔╝██║██║   ██║██║╚██╗██║██╔══██║    ╚════██║██╔═══╝ ██╔══██║██╔══██╗██╔═██╗ 
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║██║  ██║    ███████║██║     ██║  ██║██║  ██║██║  ██╗
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
EOF
echo -e "${NC}"

echo -e "${CYAN}🚀 Solution Tout-en-Un MONA x SPARK${NC}"
echo -e "${YELLOW}Architecture centralisée sans dépendances externes${NC}"
echo ""

# Fonction pour vérifier les prérequis
check_prerequisites() {
    echo -e "${BLUE}🔍 Vérification des prérequis...${NC}"
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js n'est pas installé${NC}"
        echo "Installez Node.js depuis https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    REQUIRED_VERSION="18.0.0"
    
    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        echo -e "${RED}❌ Node.js version $NODE_VERSION détectée, version $REQUIRED_VERSION+ requise${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Node.js $NODE_VERSION détecté${NC}"
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm n'est pas installé${NC}"
        exit 1
    fi
    
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm $NPM_VERSION détecté${NC}"
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        echo -e "${YELLOW}⚠️  Docker n'est pas installé (optionnel pour le développement local)${NC}"
    else
        DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
        echo -e "${GREEN}✅ Docker $DOCKER_VERSION détecté${NC}"
    fi
    
    # Vérifier Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${YELLOW}⚠️  Docker Compose n'est pas installé (optionnel)${NC}"
    else
        COMPOSE_VERSION=$(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1)
        echo -e "${GREEN}✅ Docker Compose $COMPOSE_VERSION détecté${NC}"
    fi
    
    echo ""
}

# Fonction pour démarrer Docker si nécessaire
start_docker() {
    if command -v docker &> /dev/null; then
        echo -e "${BLUE}🐳 Vérification de Docker...${NC}"
        
        if ! docker info &> /dev/null; then
            echo -e "${YELLOW}⚠️  Docker n'est pas démarré${NC}"
            echo -e "${CYAN}🔄 Tentative de démarrage de Docker...${NC}"
            
            # macOS
            if [[ "$OSTYPE" == "darwin"* ]]; then
                if command -v open &> /dev/null; then
                    open -a Docker
                    echo -e "${YELLOW}⏳ Attente du démarrage de Docker...${NC}"
                    sleep 10
                fi
            fi
            
            # Linux
            if [[ "$OSTYPE" == "linux-gnu"* ]]; then
                if command -v systemctl &> /dev/null; then
                    sudo systemctl start docker
                fi
            fi
            
            # Attendre que Docker soit prêt
            for i in {1..30}; do
                if docker info &> /dev/null; then
                    echo -e "${GREEN}✅ Docker démarré avec succès${NC}"
                    break
                fi
                echo -e "${YELLOW}⏳ Attente... ($i/30)${NC}"
                sleep 2
            done
            
            if ! docker info &> /dev/null; then
                echo -e "${RED}❌ Impossible de démarrer Docker${NC}"
                echo "Démarrez Docker manuellement et relancez le script"
                exit 1
            fi
        else
            echo -e "${GREEN}✅ Docker est déjà démarré${NC}"
        fi
    fi
}

# Fonction pour installer les dépendances
install_dependencies() {
    echo -e "${BLUE}📦 Installation des dépendances...${NC}"
    
    # Installation des dépendances principales
    if [ -f "package.json" ]; then
        echo -e "${CYAN}📦 Installation des dépendances principales...${NC}"
        npm install
    fi
    
    # Installation des dépendances de l'application
    if [ -d "app" ]; then
        echo -e "${CYAN}📦 Installation des dépendances de l'application...${NC}"
        cd app
        npm install
        cd ..
    fi
    
    # Installation des dépendances du client
    if [ -d "app/client" ]; then
        echo -e "${CYAN}📦 Installation des dépendances du client...${NC}"
        cd app/client
        npm install
        cd ../..
    fi
    
    # Installation des dépendances de l'API
    if [ -d "app/api" ]; then
        echo -e "${CYAN}📦 Installation des dépendances de l'API...${NC}"
        cd app/api
        npm install
        cd ../..
    fi
    
    echo -e "${GREEN}✅ Toutes les dépendances sont installées${NC}"
    echo ""
}

# Fonction pour configurer la base de données
setup_database() {
    echo -e "${BLUE}🗄️  Configuration de la base de données...${NC}"
    
    if [ -d "app/api" ]; then
        cd app/api
        
        # Générer le client Prisma
        if [ -f "prisma/schema.prisma" ]; then
            echo -e "${CYAN}🔧 Génération du client Prisma...${NC}"
            npm run db:generate
        fi
        
        # Exécuter les migrations
        if [ -f "prisma/schema.prisma" ]; then
            echo -e "${CYAN}🔄 Exécution des migrations...${NC}"
            npm run db:migrate
        fi
        
        # Seed la base de données
        if [ -f "src/db/seed.ts" ]; then
            echo -e "${CYAN}🌱 Seeding de la base de données...${NC}"
            npm run db:seed
        fi
        
        cd ../..
    fi
    
    echo -e "${GREEN}✅ Base de données configurée${NC}"
    echo ""
}

# Fonction pour démarrer les services
start_services() {
    echo -e "${BLUE}🚀 Démarrage des services...${NC}"
    
    # Démarrer les services Docker si disponibles
    if command -v docker-compose &> /dev/null && [ -f "docker-compose.yml" ]; then
        echo -e "${CYAN}🐳 Démarrage des services Docker...${NC}"
        docker-compose up -d
        
        # Attendre que les services soient prêts
        echo -e "${YELLOW}⏳ Attente que les services soient prêts...${NC}"
        sleep 10
    fi
    
    echo -e "${GREEN}✅ Services démarrés${NC}"
    echo ""
}

# Fonction pour démarrer l'application
start_application() {
    echo -e "${BLUE}🎯 Démarrage de l'application tout-en-un...${NC}"
    
    if [ -d "app" ]; then
        cd app
        
        # Démarrer l'application en mode développement
        echo -e "${CYAN}🔄 Démarrage en mode développement...${NC}"
        npm run dev &
        
        # Attendre que l'application soit prête
        echo -e "${YELLOW}⏳ Attente que l'application soit prête...${NC}"
        sleep 15
        
        cd ..
    fi
    
    echo -e "${GREEN}✅ Application démarrée${NC}"
    echo ""
}

# Fonction pour afficher les URLs
show_urls() {
    echo -e "${PURPLE}🌐 URLs d'accès :${NC}"
    echo ""
    echo -e "${CYAN}📊 Hub Central (Dashboard) :${NC} http://localhost:3000"
    echo -e "${CYAN}🎨 Interface Client :${NC} http://localhost:3000"
    echo -e "${CYAN}🔧 API Backend :${NC} http://localhost:3001"
    echo -e "${CYAN}📚 Documentation API :${NC} http://localhost:3001/api/docs"
    echo ""
    echo -e "${CYAN}🗄️  Base de données :${NC}"
    echo -e "   PostgreSQL : localhost:5432"
    echo -e "   Redis : localhost:6379"
    echo ""
    echo -e "${CYAN}📊 Monitoring :${NC}"
    echo -e "   Grafana : http://localhost:3000/grafana"
    echo -e "   Prometheus : http://localhost:3000/prometheus"
    echo ""
}

# Fonction pour afficher les informations de développement
show_dev_info() {
    echo -e "${PURPLE}🛠️  Informations de développement :${NC}"
    echo ""
    echo -e "${CYAN}📁 Structure du projet :${NC}"
    echo -e "   app/client/     - Frontend unifié"
    echo -e "   app/api/        - Backend unifié"
    echo -e "   app/db/         - Schémas base de données"
    echo -e "   services/       - Microservices"
    echo -e "   shared/         - Composants partagés"
    echo ""
    echo -e "${CYAN}🔧 Commandes utiles :${NC}"
    echo -e "   npm run dev     - Démarrage développement"
    echo -e "   npm run build   - Build production"
    echo -e "   npm run test    - Tests"
    echo -e "   npm run lint    - Linting"
    echo ""
    echo -e "${CYAN}📦 Gestion des dépendances :${NC}"
    echo -e "   npm install     - Installer toutes les dépendances"
    echo -e "   npm run type-check - Vérification TypeScript"
    echo ""
}

# Fonction principale
main() {
    echo -e "${GREEN}🎉 Démarrage de MONA x SPARK - Solution Tout-en-Un${NC}"
    echo ""
    
    # Vérifier les prérequis
    check_prerequisites
    
    # Démarrer Docker si nécessaire
    start_docker
    
    # Installer les dépendances
    install_dependencies
    
    # Configurer la base de données
    setup_database
    
    # Démarrer les services
    start_services
    
    # Démarrer l'application
    start_application
    
    # Afficher les URLs
    show_urls
    
    # Afficher les informations de développement
    show_dev_info
    
    echo -e "${GREEN}🎉 MONA x SPARK - Solution Tout-en-Un est prêt !${NC}"
    echo ""
    echo -e "${YELLOW}💡 Conseil : Gardez ce terminal ouvert pour voir les logs${NC}"
    echo -e "${YELLOW}💡 Pour arrêter : Ctrl+C${NC}"
    echo ""
    
    # Attendre que l'utilisateur appuie sur Ctrl+C
    trap 'echo -e "\n${RED}🛑 Arrêt de MONA x SPARK...${NC}"; exit 0' INT
    while true; do
        sleep 1
    done
}

# Exécuter la fonction principale
main 