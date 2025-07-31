#!/bin/bash

# MONA x SPARK - Vérification Nouvelle Structure
# Vérifie que l'architecture est correctement organisée

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🏗️  Vérification Nouvelle Structure MONA x SPARK${NC}"
echo -e "${CYAN}Architecture tout-en-un organisée${NC}"
echo ""

# Fonction pour vérifier la structure app
check_app_structure() {
    echo -e "${BLUE}📱 Vérification structure app/...${NC}"
    
    # Vérifier app/client
    if [ -d "app/client" ]; then
        echo -e "${GREEN}✅ app/client présent${NC}"
        
        # Vérifier les sous-dossiers du client
        for dir in dashboard pipeline content planning streaming; do
            if [ -d "app/client/$dir" ]; then
                echo -e "  ✅ $dir/"
            else
                echo -e "${YELLOW}  ⚠️  $dir/ manquant${NC}"
            fi
        done
    else
        echo -e "${RED}❌ app/client manquant${NC}"
        return 1
    fi
    
    # Vérifier app/api
    if [ -d "app/api" ]; then
        echo -e "${GREEN}✅ app/api présent${NC}"
        
        # Vérifier les sous-dossiers de l'API
        for dir in core artists sponsors content events; do
            if [ -d "app/api/$dir" ]; then
                echo -e "  ✅ $dir/"
            else
                echo -e "${YELLOW}  ⚠️  $dir/ manquant${NC}"
            fi
        done
    else
        echo -e "${RED}❌ app/api manquant${NC}"
        return 1
    fi
    
    # Vérifier app/db
    if [ -d "app/db" ] && [ -f "app/db/schema.sql" ]; then
        echo -e "${GREEN}✅ app/db avec schéma présent${NC}"
    else
        echo -e "${RED}❌ app/db ou schéma manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier la structure services
check_services_structure() {
    echo -e "${BLUE}🔧 Vérification structure services/...${NC}"
    
    # Vérifier chaque service
    for service in analytics media-processor notifications streaming-bridge; do
        if [ -d "services/$service" ]; then
            echo -e "${GREEN}✅ services/$service présent${NC}"
            
            # Vérifier package.json
            if [ -f "services/$service/package.json" ]; then
                echo -e "  ✅ package.json"
            else
                echo -e "${YELLOW}  ⚠️  package.json manquant${NC}"
            fi
        else
            echo -e "${RED}❌ services/$service manquant${NC}"
            return 1
        fi
    done
    
    echo ""
}

# Fonction pour vérifier la structure shared
check_shared_structure() {
    echo -e "${BLUE}📦 Vérification structure shared/...${NC}"
    
    if [ -d "shared" ]; then
        echo -e "${GREEN}✅ shared présent${NC}"
        
        # Vérifier les sous-dossiers
        for dir in components utils types hooks; do
            if [ -d "shared/$dir" ]; then
                echo -e "  ✅ $dir/"
            else
                echo -e "${YELLOW}  ⚠️  $dir/ manquant${NC}"
            fi
        done
        
        # Vérifier les fichiers principaux
        if [ -f "shared/package.json" ]; then
            echo -e "  ✅ package.json"
        else
            echo -e "${YELLOW}  ⚠️  package.json manquant${NC}"
        fi
        
        if [ -f "shared/index.ts" ]; then
            echo -e "  ✅ index.ts"
        else
            echo -e "${YELLOW}  ⚠️  index.ts manquant${NC}"
        fi
        
        if [ -f "shared/types/index.ts" ]; then
            echo -e "  ✅ types/index.ts"
        else
            echo -e "${YELLOW}  ⚠️  types/index.ts manquant${NC}"
        fi
    else
        echo -e "${RED}❌ shared manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les fichiers de configuration
check_config_files() {
    echo -e "${BLUE}⚙️  Vérification fichiers de configuration...${NC}"
    
    # Vérifier les fichiers principaux
    for file in package.json docker-compose.yml turbo.json tsconfig.simple.json; do
        if [ -f "$file" ]; then
            echo -e "${GREEN}✅ $file présent${NC}"
        else
            echo -e "${RED}❌ $file manquant${NC}"
            return 1
        fi
    done
    
    # Vérifier les scripts
    for script in start-tout-en-un.sh verify-clean-architecture.sh; do
        if [ -f "$script" ]; then
            echo -e "${GREEN}✅ $script présent${NC}"
        else
            echo -e "${RED}❌ $script manquant${NC}"
            return 1
        fi
    done
    
    echo ""
}

# Fonction pour vérifier les workspaces
check_workspaces() {
    echo -e "${BLUE}🔗 Vérification workspaces...${NC}"
    
    # Vérifier que les workspaces sont correctement configurés
    if grep -q "app/client" package.json && grep -q "app/api" package.json && grep -q "services/\*" package.json && grep -q "shared" package.json; then
        echo -e "${GREEN}✅ Workspaces correctement configurés${NC}"
    else
        echo -e "${RED}❌ Workspaces mal configurés${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour afficher l'arborescence
show_tree() {
    echo -e "${BLUE}🌳 Arborescence de l'architecture :${NC}"
    echo ""
    echo "ecosystem-mona-spark/"
    echo "├── app/                        # Application principale monolithique"
    echo "│   ├── client/                 # Frontend unifié React/Next.js"
    echo "│   │   ├── dashboard/          # Dashboard principal"
    echo "│   │   ├── pipeline/           # CRM & gestion pipeline"
    echo "│   │   ├── content/            # Gestion contenus & templates"
    echo "│   │   ├── planning/           # Calendriers & Kanban"
    echo "│   │   └── streaming/          # Interface streaming"
    echo "│   ├── api/                    # Backend unifié"
    echo "│   │   ├── core/               # Services partagés"
    echo "│   │   ├── artists/            # Gestion artistes"
    echo "│   │   ├── sponsors/           # Gestion sponsors"
    echo "│   │   ├── content/            # Gestion contenus"
    echo "│   │   └── events/             # Gestion événements"
    echo "│   └── db/                     # Schémas base de données"
    echo "├── services/                   # Microservices spécifiques"
    echo "│   ├── analytics/              # Service d'analytics"
    echo "│   ├── media-processor/        # Traitement médias"
    echo "│   ├── notifications/          # Système notifications"
    echo "│   └── streaming-bridge/       # Pont APIs Twitch/OBS"
    echo "└── shared/                     # Composants partagés"
    echo "    ├── components/             # Composants React partagés"
    echo "    ├── utils/                  # Utilitaires partagés"
    echo "    ├── types/                  # Types TypeScript partagés"
    echo "    └── hooks/                  # Hooks React partagés"
    echo ""
}

# Fonction pour afficher le résumé
show_summary() {
    echo -e "${PURPLE}📊 Résumé de la vérification :${NC}"
    echo ""
    echo -e "${CYAN}✅ Architecture tout-en-un organisée${NC}"
    echo -e "${CYAN}✅ Services modulaires configurés${NC}"
    echo -e "${CYAN}✅ Composants partagés structurés${NC}"
    echo -e "${CYAN}✅ Workspaces correctement configurés${NC}"
    echo ""
    echo -e "${GREEN}🎉 MONA x SPARK est prêt pour le développement !${NC}"
    echo ""
    echo -e "${YELLOW}💡 Prochaines étapes :${NC}"
    echo -e "   1. Installer les dépendances : npm install"
    echo -e "   2. Configurer les variables d'environnement"
    echo -e "   3. Lancer le développement : npm run dev"
    echo ""
}

# Fonction principale
main() {
    echo -e "${GREEN}🔍 Début de la vérification...${NC}"
    echo ""
    
    local errors=0
    
    # Vérifications
    check_app_structure || ((errors++))
    check_services_structure || ((errors++))
    check_shared_structure || ((errors++))
    check_config_files || ((errors++))
    check_workspaces || ((errors++))
    
    echo ""
    show_tree
    
    if [ $errors -eq 0 ]; then
        show_summary
        echo -e "${GREEN}✅ Vérification terminée avec succès !${NC}"
        exit 0
    else
        echo -e "${RED}❌ Vérification terminée avec $errors erreur(s)${NC}"
        echo -e "${YELLOW}🔧 Corrigez les erreurs avant de continuer${NC}"
        exit 1
    fi
}

# Exécuter la fonction principale
main 