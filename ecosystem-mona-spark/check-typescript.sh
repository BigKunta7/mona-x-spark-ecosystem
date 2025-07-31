#!/bin/bash

echo "🔍 Vérification TypeScript sur tous les projets..."
echo ""

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour vérifier un projet
check_project() {
    local project_path=$1
    local project_name=$2
    
    echo -e "${YELLOW}📁 Vérification de $project_name...${NC}"
    
    if [ -d "$project_path" ]; then
        if [ -f "$project_path/package.json" ]; then
            if (cd "$project_path" && npm run type-check > /dev/null 2>&1); then
                echo -e "  ${GREEN}✅ $project_name - OK${NC}"
                return 0
            else
                echo -e "  ${RED}❌ $project_name - Erreurs TypeScript${NC}"
                return 1
            fi
        else
            echo -e "  ${RED}❌ $project_name - package.json manquant${NC}"
            return 1
        fi
    else
        echo -e "  ${RED}❌ $project_name - Dossier manquant${NC}"
        return 1
    fi
}

# Retour au répertoire racine
cd "$(dirname "$0")"

# Compteurs
total_projects=0
successful_projects=0

echo "🚀 Démarrage de la vérification TypeScript globale..."
echo ""

# Vérification des projets
check_project "mona-engine/api" "MONA API" && ((successful_projects++))
((total_projects++))

check_project "mona-engine/frontend" "MONA Frontend" && ((successful_projects++))
((total_projects++))

check_project "mona-engine/dashboard" "MONA Dashboard" && ((successful_projects++))
((total_projects++))

check_project "spark-hub/frontend" "SPARK Frontend" && ((successful_projects++))
((total_projects++))

echo ""
echo "📊 Résumé de la vérification TypeScript :"
echo ""

if [ $successful_projects -eq $total_projects ]; then
    echo -e "${GREEN}🎉 Tous les projets ($successful_projects/$total_projects) sont sans erreurs TypeScript !${NC}"
    echo ""
    echo -e "${GREEN}✅ Configuration TypeScript globale validée${NC}"
    echo -e "${GREEN}✅ tsconfig.simple.json fonctionne correctement${NC}"
    echo -e "${GREEN}✅ Tous les types sont installés${NC}"
    exit 0
else
    echo -e "${RED}⚠️  $successful_projects/$total_projects projets sans erreurs TypeScript${NC}"
    echo ""
    echo -e "${YELLOW}💡 Suggestions :${NC}"
    echo -e "  - Vérifiez les imports dans les fichiers .ts/.tsx"
    echo -e "  - Installez les types manquants avec npm install @types/[package]"
    echo -e "  - Vérifiez la configuration tsconfig.json"
    exit 1
fi 