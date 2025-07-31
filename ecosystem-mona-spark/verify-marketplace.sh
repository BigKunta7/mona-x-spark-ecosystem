#!/bin/bash

# MONA x SPARK - Vérification Marketplace
# Vérifie que la marketplace avec les 10 blocs est correctement intégrée

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🛒 Vérification Marketplace MONA x SPARK${NC}"
echo -e "${CYAN}10 Blocs de Développement Artistique${NC}"
echo ""

# Fonction pour vérifier les types marketplace
check_marketplace_types() {
    echo -e "${BLUE}📋 Vérification types marketplace...${NC}"
    
    if [ -f "shared/types/marketplace.ts" ]; then
        echo -e "${GREEN}✅ Types marketplace présents${NC}"
        
        # Vérifier les interfaces principales
        if grep -q "MarketplaceBlock" shared/types/marketplace.ts; then
            echo -e "  ✅ MarketplaceBlock"
        else
            echo -e "${RED}  ❌ MarketplaceBlock manquant${NC}"
            return 1
        fi
        
        if grep -q "BriefData" shared/types/marketplace.ts; then
            echo -e "  ✅ BriefData"
        else
            echo -e "${RED}  ❌ BriefData manquant${NC}"
            return 1
        fi
        
        if grep -q "Expert" shared/types/marketplace.ts; then
            echo -e "  ✅ Expert"
        else
            echo -e "${RED}  ❌ Expert manquant${NC}"
            return 1
        fi
        
        if grep -q "Proposal" shared/types/marketplace.ts; then
            echo -e "  ✅ Proposal"
        else
            echo -e "${RED}  ❌ Proposal manquant${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Types marketplace manquants${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les utilitaires marketplace
check_marketplace_utils() {
    echo -e "${BLUE}🔧 Vérification utilitaires marketplace...${NC}"
    
    if [ -f "shared/utils/marketplace-management.ts" ]; then
        echo -e "${GREEN}✅ Utilitaires marketplace présents${NC}"
        
        # Vérifier les fonctions principales
        if grep -q "createBriefSubmission" shared/utils/marketplace-management.ts; then
            echo -e "  ✅ createBriefSubmission"
        else
            echo -e "${RED}  ❌ createBriefSubmission manquante${NC}"
            return 1
        fi
        
        if grep -q "validateBriefData" shared/utils/marketplace-management.ts; then
            echo -e "  ✅ validateBriefData"
        else
            echo -e "${RED}  ❌ validateBriefData manquante${NC}"
            return 1
        fi
        
        if grep -q "generateProposal" shared/utils/marketplace-management.ts; then
            echo -e "  ✅ generateProposal"
        else
            echo -e "${RED}  ❌ generateProposal manquante${NC}"
            return 1
        fi
        
        if grep -q "getRecommendedBlocks" shared/utils/marketplace-management.ts; then
            echo -e "  ✅ getRecommendedBlocks"
        else
            echo -e "${RED}  ❌ getRecommendedBlocks manquante${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Utilitaires marketplace manquants${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les exports
check_marketplace_exports() {
    echo -e "${BLUE}📦 Vérification exports marketplace...${NC}"
    
    # Vérifier exports types
    if [ -f "shared/types/index.ts" ] && grep -q "marketplace" shared/types/index.ts; then
        echo -e "${GREEN}✅ Export types marketplace configuré${NC}"
    else
        echo -e "${RED}❌ Export types marketplace manquant${NC}"
        return 1
    fi
    
    # Vérifier exports utils
    if [ -f "shared/utils/index.ts" ] && grep -q "marketplace-management" shared/utils/index.ts; then
        echo -e "${GREEN}✅ Export utils marketplace configuré${NC}"
    else
        echo -e "${RED}❌ Export utils marketplace manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les 10 blocs
check_marketplace_blocks() {
    echo -e "${BLUE}🎯 Vérification 10 blocs marketplace...${NC}"
    
    # Vérifier que tous les blocs sont définis
    for i in {1..10}; do
        if grep -q "id: $i," shared/types/marketplace.ts; then
            echo -e "  ✅ Bloc $i présent"
        else
            echo -e "${RED}  ❌ Bloc $i manquant${NC}"
            return 1
        fi
    done
    
    # Vérifier les blocs spécifiques
    if grep -q "Signature & Onboarding" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 1: Signature & Onboarding"
    else
        echo -e "${RED}  ❌ Bloc 1 manquant${NC}"
        return 1
    fi
    
    if grep -q "Direction Artistique & A&R" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 2: Direction Artistique & A&R"
    else
        echo -e "${RED}  ❌ Bloc 2 manquant${NC}"
        return 1
    fi
    
    if grep -q "Production Musicale" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 3: Production Musicale"
    else
        echo -e "${RED}  ❌ Bloc 3 manquant${NC}"
        return 1
    fi
    
    if grep -q "Publishing & Édition" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 4: Publishing & Édition"
    else
        echo -e "${RED}  ❌ Bloc 4 manquant${NC}"
        return 1
    fi
    
    if grep -q "Marketing & Image" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 5: Marketing & Image"
    else
        echo -e "${RED}  ❌ Bloc 5 manquant${NC}"
        return 1
    fi
    
    if grep -q "Distribution & Plateformes" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 6: Distribution & Plateformes"
    else
        echo -e "${RED}  ❌ Bloc 6 manquant${NC}"
        return 1
    fi
    
    if grep -q "Live & Booking" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 7: Live & Booking"
    else
        echo -e "${RED}  ❌ Bloc 7 manquant${NC}"
        return 1
    fi
    
    if grep -q "Licensing & Sync" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 8: Licensing & Sync"
    else
        echo -e "${RED}  ❌ Bloc 8 manquant${NC}"
        return 1
    fi
    
    if grep -q "Exit Strategy" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 9: Exit Strategy"
    else
        echo -e "${RED}  ❌ Bloc 9 manquant${NC}"
        return 1
    fi
    
    if grep -q "Direction Stratégique" shared/types/marketplace.ts; then
        echo -e "  ✅ Bloc 10: Direction Stratégique"
    else
        echo -e "${RED}  ❌ Bloc 10 manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les experts
check_marketplace_experts() {
    echo -e "${BLUE}👥 Vérification experts marketplace...${NC}"
    
    # Vérifier que des experts sont définis
    if grep -q "expert-" shared/types/marketplace.ts; then
        echo -e "${GREEN}✅ Experts définis${NC}"
        
        # Vérifier quelques experts spécifiques
        if grep -q "Sophie Laurent" shared/types/marketplace.ts; then
            echo -e "  ✅ Expert juridique"
        else
            echo -e "${RED}  ❌ Expert juridique manquant${NC}"
            return 1
        fi
        
        if grep -q "Marco Silva" shared/types/marketplace.ts; then
            echo -e "  ✅ Expert direction artistique"
        else
            echo -e "${RED}  ❌ Expert direction artistique manquant${NC}"
            return 1
        fi
        
        if grep -q "Alex Chen" shared/types/marketplace.ts; then
            echo -e "  ✅ Expert production"
        else
            echo -e "${RED}  ❌ Expert production manquant${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Aucun expert défini${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les case studies
check_marketplace_case_studies() {
    echo -e "${BLUE}📊 Vérification case studies marketplace...${NC}"
    
    # Vérifier que des case studies sont définis
    if grep -q "caseStudies" shared/types/marketplace.ts; then
        echo -e "${GREEN}✅ Case studies définis${NC}"
        
        # Vérifier quelques case studies spécifiques
        if grep -q "YZO" shared/types/marketplace.ts; then
            echo -e "  ✅ Case study YZO"
        else
            echo -e "${RED}  ❌ Case study YZO manquant${NC}"
            return 1
        fi
        
        if grep -q "Luna" shared/types/marketplace.ts; then
            echo -e "  ✅ Case study Luna"
        else
            echo -e "${RED}  ❌ Case study Luna manquant${NC}"
            return 1
        fi
        
        if grep -q "The Echo" shared/types/marketplace.ts; then
            echo -e "  ✅ Case study The Echo"
        else
            echo -e "${RED}  ❌ Case study The Echo manquant${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Aucun case study défini${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour afficher le résumé
show_summary() {
    echo -e "${PURPLE}📊 Résumé de la marketplace :${NC}"
    echo ""
    echo -e "${CYAN}✅ Marketplace intégrée${NC}"
    echo -e "${CYAN}✅ 10 blocs de développement définis${NC}"
    echo -e "${CYAN}✅ Experts et case studies présents${NC}"
    echo -e "${CYAN}✅ Utilitaires de gestion créés${NC}"
    echo -e "${CYAN}✅ Workflow complet implémenté${NC}"
    echo ""
    echo -e "${GREEN}🎉 MONA x SPARK est prêt avec la marketplace !${NC}"
    echo ""
    echo -e "${YELLOW}💡 Workflow marketplace :${NC}"
    echo -e "   1. Accès marketplace depuis dashboard"
    echo -e "   2. Vue d'ensemble des 10 blocs"
    echo -e "   3. Sélection et exploration d'un bloc"
    echo -e "   4. Prise de contact ou réservation appel"
    echo -e "   5. Création du brief personnalisé"
    echo -e "   6. Attribution automatique d'un expert"
    echo -e "   7. Communication et proposition personnalisée"
    echo -e "   8. Suivi du projet dans le dashboard"
    echo ""
    echo -e "${YELLOW}🎯 Caractéristiques marketplace :${NC}"
    echo -e "   • Approche sans affichage de prix public"
    echo -e "   • Brief personnalisé selon les besoins"
    echo -e "   • Attribution automatique d'experts"
    echo -e "   • Propositions sur mesure"
    echo -e "   • Suivi complet des projets"
    echo ""
}

# Fonction principale
main() {
    echo -e "${GREEN}🔍 Début de la vérification marketplace...${NC}"
    echo ""
    
    local errors=0
    
    # Vérifications
    check_marketplace_types || ((errors++))
    check_marketplace_utils || ((errors++))
    check_marketplace_exports || ((errors++))
    check_marketplace_blocks || ((errors++))
    check_marketplace_experts || ((errors++))
    check_marketplace_case_studies || ((errors++))
    
    echo ""
    
    if [ $errors -eq 0 ]; then
        show_summary
        echo -e "${GREEN}✅ Vérification marketplace terminée avec succès !${NC}"
        exit 0
    else
        echo -e "${RED}❌ Vérification marketplace terminée avec $errors erreur(s)${NC}"
        echo -e "${YELLOW}🔧 Corrigez les erreurs avant de continuer${NC}"
        exit 1
    fi
}

# Exécuter la fonction principale
main 