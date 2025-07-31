#!/bin/bash

# MONA x SPARK - Script de Vérification Architecture Nettoyée
# Analyse complète pour s'assurer qu'il n'y a pas de données factices

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🔍 Vérification Architecture MONA x SPARK${NC}"
echo -e "${CYAN}Analyse complète pour s'assurer qu'il n'y a pas de données factices${NC}"
echo ""

# Fonction pour vérifier la structure
check_structure() {
    echo -e "${BLUE}📁 Vérification de la structure...${NC}"
    
    # Vérifier que l'ancienne structure a été supprimée
    if [ -d "mona-engine" ] || [ -d "spark-hub" ] || [ -d "business-intelligence" ]; then
        echo -e "${RED}❌ Ancienne structure détectée${NC}"
        echo "   Supprimez les dossiers : mona-engine, spark-hub, business-intelligence"
        return 1
    else
        echo -e "${GREEN}✅ Ancienne structure supprimée${NC}"
    fi
    
    # Vérifier la nouvelle structure
    if [ -d "app" ] && [ -d "services" ] && [ -d "shared" ]; then
        echo -e "${GREEN}✅ Nouvelle structure tout-en-un présente${NC}"
    else
        echo -e "${RED}❌ Structure tout-en-un incomplète${NC}"
        return 1
    fi
    
    # Vérifier les sous-dossiers
    if [ -d "app/client" ] && [ -d "app/api" ] && [ -d "app/db" ]; then
        echo -e "${GREEN}✅ Structure app complète${NC}"
    else
        echo -e "${RED}❌ Structure app incomplète${NC}"
        return 1
    fi
    
    if [ -d "services/analytics" ] && [ -d "services/media-processor" ] && [ -d "services/notifications" ] && [ -d "services/streaming-bridge" ]; then
        echo -e "${GREEN}✅ Structure services complète${NC}"
    else
        echo -e "${RED}❌ Structure services incomplète${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les fichiers de configuration
check_config_files() {
    echo -e "${BLUE}⚙️  Vérification des fichiers de configuration...${NC}"
    
    # Vérifier package.json
    if [ -f "package.json" ]; then
        echo -e "${GREEN}✅ package.json principal présent${NC}"
    else
        echo -e "${RED}❌ package.json principal manquant${NC}"
        return 1
    fi
    
    # Vérifier docker-compose.yml
    if [ -f "docker-compose.yml" ]; then
        echo -e "${GREEN}✅ docker-compose.yml présent${NC}"
    else
        echo -e "${RED}❌ docker-compose.yml manquant${NC}"
        return 1
    fi
    
    # Vérifier le schéma de base de données
    if [ -f "app/db/schema.sql" ]; then
        echo -e "${GREEN}✅ Schéma de base de données présent${NC}"
    else
        echo -e "${RED}❌ Schéma de base de données manquant${NC}"
        return 1
    fi
    
    # Vérifier les scripts de démarrage
    if [ -f "start-tout-en-un.sh" ]; then
        echo -e "${GREEN}✅ Script de démarrage tout-en-un présent${NC}"
    else
        echo -e "${RED}❌ Script de démarrage tout-en-un manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les données factices
check_fake_data() {
    echo -e "${BLUE}🔍 Recherche de données factices...${NC}"
    
    # Vérifier les emails factices (non commentés)
    if grep -r "^[[:space:]]*('admin@monaspark.com\|'manager@monaspark.com\|'test@\|'demo@\|'example@" . --exclude-dir=node_modules --exclude=package-lock.json --exclude=verify-clean-architecture.sh 2>/dev/null; then
        echo -e "${RED}❌ Données factices détectées dans les fichiers${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Aucune donnée factice détectée${NC}"
    fi
    
    # Vérifier les mots de passe factices (non commentés)
    if grep -r "^[[:space:]]*('.*default_hash\|.*password123\|.*admin123" . --exclude-dir=node_modules --exclude=package-lock.json --exclude=verify-clean-architecture.sh 2>/dev/null; then
        echo -e "${RED}❌ Mots de passe factices détectés${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Aucun mot de passe factice détecté${NC}"
    fi
    
    # Vérifier les IDs factices
    if grep -r "your_twitch_client_id\|your_spotify_client_id\|your_jwt_secret" . --exclude-dir=node_modules --exclude=package-lock.json 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Variables d'environnement d'exemple détectées (normal)${NC}"
    else
        echo -e "${GREEN}✅ Variables d'environnement propres${NC}"
    fi
    
    echo ""
}

# Fonction pour vérifier les fichiers inutiles
check_unnecessary_files() {
    echo -e "${BLUE}🧹 Vérification des fichiers inutiles...${NC}"
    
    # Vérifier les node_modules
    if find . -name "node_modules" -type d 2>/dev/null | grep -q .; then
        echo -e "${YELLOW}⚠️  Dossiers node_modules détectés (à nettoyer)${NC}"
        find . -name "node_modules" -type d 2>/dev/null
    else
        echo -e "${GREEN}✅ Aucun dossier node_modules${NC}"
    fi
    
    # Vérifier les fichiers de cache
    if find . -name "*.cache" -o -name "*.tmp" -o -name "*.log" 2>/dev/null | grep -q .; then
        echo -e "${YELLOW}⚠️  Fichiers de cache détectés (à nettoyer)${NC}"
        find . -name "*.cache" -o -name "*.tmp" -o -name "*.log" 2>/dev/null
    else
        echo -e "${GREEN}✅ Aucun fichier de cache${NC}"
    fi
    
    # Vérifier les fichiers de build
    if find . -name "dist" -o -name "build" -o -name ".next" 2>/dev/null | grep -q .; then
        echo -e "${YELLOW}⚠️  Dossiers de build détectés (à nettoyer)${NC}"
        find . -name "dist" -o -name "build" -o -name ".next" 2>/dev/null
    else
        echo -e "${GREEN}✅ Aucun dossier de build${NC}"
    fi
    
    echo ""
}

# Fonction pour vérifier la cohérence des URLs
check_url_consistency() {
    echo -e "${BLUE}🌐 Vérification de la cohérence des URLs...${NC}"
    
    # Vérifier les URLs dans docker-compose.yml
    if grep -q "localhost:3000\|localhost:3001\|localhost:3002" docker-compose.yml; then
        echo -e "${GREEN}✅ URLs cohérentes dans docker-compose.yml${NC}"
    else
        echo -e "${RED}❌ URLs incohérentes dans docker-compose.yml${NC}"
        return 1
    fi
    
    # Vérifier les URLs dans les fichiers de configuration
    if grep -r "localhost:3000\|localhost:3001\|localhost:3002" . --exclude-dir=node_modules --exclude=package-lock.json 2>/dev/null | grep -q .; then
        echo -e "${GREEN}✅ URLs cohérentes dans les configurations${NC}"
    else
        echo -e "${YELLOW}⚠️  URLs non trouvées dans les configurations${NC}"
    fi
    
    echo ""
}

# Fonction pour vérifier la documentation
check_documentation() {
    echo -e "${BLUE}📚 Vérification de la documentation...${NC}"
    
    # Vérifier les fichiers de documentation
    if [ -f "README.md" ] && [ -f "architecture-tout-en-un.md" ] && [ -f "TRANSITION-TOUT-EN-UN.md" ]; then
        echo -e "${GREEN}✅ Documentation complète${NC}"
    else
        echo -e "${RED}❌ Documentation incomplète${NC}"
        return 1
    fi
    
    # Vérifier la cohérence de la documentation
    if grep -q "MONA.*Agence.*Label\|SPARK.*Media Lab" README.md; then
        echo -e "${GREEN}✅ Documentation cohérente avec la nouvelle architecture${NC}"
    else
        echo -e "${RED}❌ Documentation incohérente avec la nouvelle architecture${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour afficher le résumé
show_summary() {
    echo -e "${PURPLE}📊 Résumé de la vérification :${NC}"
    echo ""
    echo -e "${CYAN}✅ Architecture tout-en-un propre${NC}"
    echo -e "${CYAN}✅ Aucune donnée factice détectée${NC}"
    echo -e "${CYAN}✅ Structure cohérente${NC}"
    echo -e "${CYAN}✅ Documentation à jour${NC}"
    echo ""
    echo -e "${GREEN}🎉 MONA x SPARK est prêt pour le développement !${NC}"
    echo ""
    echo -e "${YELLOW}💡 Prochaines étapes :${NC}"
    echo -e "   1. Copier env.example vers .env"
    echo -e "   2. Configurer les variables d'environnement"
    echo -e "   3. Lancer ./start-tout-en-un.sh"
    echo ""
}

# Fonction principale
main() {
    echo -e "${GREEN}🔍 Début de la vérification...${NC}"
    echo ""
    
    local errors=0
    
    # Vérifications
    check_structure || ((errors++))
    check_config_files || ((errors++))
    check_fake_data || ((errors++))
    check_unnecessary_files || ((errors++))
    check_url_consistency || ((errors++))
    check_documentation || ((errors++))
    
    echo ""
    
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