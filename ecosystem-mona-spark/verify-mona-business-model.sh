#!/bin/bash

# MONA x SPARK - Vérification Modèle Business MONA
# Vérifie que le modèle business MONA est correctement intégré

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🎯 Vérification Modèle Business MONA x SPARK${NC}"
echo -e "${CYAN}Intégration du modèle business MONA dans l'architecture${NC}"
echo ""

# Fonction pour vérifier les types MONA
check_mona_types() {
    echo -e "${BLUE}📋 Vérification types MONA...${NC}"
    
    if [ -f "shared/types/mona-business-model.ts" ]; then
        echo -e "${GREEN}✅ Types MONA présents${NC}"
        
        # Vérifier les interfaces principales
        if grep -q "ArtistScoringSystem" shared/types/mona-business-model.ts; then
            echo -e "  ✅ ArtistScoringSystem"
        else
            echo -e "${RED}  ❌ ArtistScoringSystem manquant${NC}"
            return 1
        fi
        
        if grep -q "MonaOffer" shared/types/mona-business-model.ts; then
            echo -e "  ✅ MonaOffer"
        else
            echo -e "${RED}  ❌ MonaOffer manquant${NC}"
            return 1
        fi
        
        if grep -q "ContactTemplate" shared/types/mona-business-model.ts; then
            echo -e "  ✅ ContactTemplate"
        else
            echo -e "${RED}  ❌ ContactTemplate manquant${NC}"
            return 1
        fi
        
        if grep -q "DevelopmentBlock" shared/types/mona-business-model.ts; then
            echo -e "  ✅ DevelopmentBlock"
        else
            echo -e "${RED}  ❌ DevelopmentBlock manquant${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Types MONA manquants${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les utilitaires MONA
check_mona_utils() {
    echo -e "${BLUE}🔧 Vérification utilitaires MONA...${NC}"
    
    # Vérifier scoring-system
    if [ -f "shared/utils/scoring-system.ts" ]; then
        echo -e "${GREEN}✅ Scoring system présent${NC}"
        
        if grep -q "ARTIST_SCORING_SYSTEM" shared/utils/scoring-system.ts; then
            echo -e "  ✅ ARTIST_SCORING_SYSTEM"
        else
            echo -e "${RED}  ❌ ARTIST_SCORING_SYSTEM manquant${NC}"
            return 1
        fi
        
        if grep -q "calculateTotalScore" shared/utils/scoring-system.ts; then
            echo -e "  ✅ calculateTotalScore"
        else
            echo -e "${RED}  ❌ calculateTotalScore manquant${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Scoring system manquant${NC}"
        return 1
    fi
    
    # Vérifier contact-templates
    if [ -f "shared/utils/contact-templates.ts" ]; then
        echo -e "${GREEN}✅ Contact templates présents${NC}"
        
        if grep -q "CONTACT_TEMPLATES" shared/utils/contact-templates.ts; then
            echo -e "  ✅ CONTACT_TEMPLATES"
        else
            echo -e "${RED}  ❌ CONTACT_TEMPLATES manquant${NC}"
            return 1
        fi
        
        if grep -q "personalizeTemplate" shared/utils/contact-templates.ts; then
            echo -e "  ✅ personalizeTemplate"
        else
            echo -e "${RED}  ❌ personalizeTemplate manquant${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Contact templates manquants${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les exports
check_exports() {
    echo -e "${BLUE}📦 Vérification exports...${NC}"
    
    # Vérifier exports types
    if [ -f "shared/types/index.ts" ] && grep -q "mona-business-model" shared/types/index.ts; then
        echo -e "${GREEN}✅ Export types MONA configuré${NC}"
    else
        echo -e "${RED}❌ Export types MONA manquant${NC}"
        return 1
    fi
    
    # Vérifier exports utils
    if [ -f "shared/utils/index.ts" ] && grep -q "scoring-system" shared/utils/index.ts; then
        echo -e "${GREEN}✅ Export utils MONA configuré${NC}"
    else
        echo -e "${RED}❌ Export utils MONA manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier la cohérence des données
check_data_consistency() {
    echo -e "${BLUE}🔍 Vérification cohérence données...${NC}"
    
    # Vérifier que les offres MONA sont cohérentes
    if grep -q "MONA_OFFERS" shared/types/mona-business-model.ts; then
        echo -e "${GREEN}✅ Offres MONA définies${NC}"
        
        # Vérifier les 3 offres principales
        if grep -q "starter_mini" shared/types/mona-business-model.ts; then
            echo -e "  ✅ MONA 290"
        else
            echo -e "${RED}  ❌ MONA 290 manquant${NC}"
            return 1
        fi
        
        if grep -q "starter_classic" shared/types/mona-business-model.ts; then
            echo -e "  ✅ MONA 390"
        else
            echo -e "${RED}  ❌ MONA 390 manquant${NC}"
            return 1
        fi
        
        if grep -q "starter_premium" shared/types/mona-business-model.ts; then
            echo -e "  ✅ MONA 490+"
        else
            echo -e "${RED}  ❌ MONA 490+ manquant${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Offres MONA manquantes${NC}"
        return 1
    fi
    
    # Vérifier les 10 blocs de développement
    if grep -q "DEVELOPMENT_BLOCKS" shared/types/mona-business-model.ts; then
        echo -e "${GREEN}✅ Blocs de développement définis${NC}"
        
        # Vérifier quelques blocs clés
        for block in "onboarding" "artistic_direction" "production" "marketing" "strategy"; do
            if grep -q "$block" shared/types/mona-business-model.ts; then
                echo -e "  ✅ $block"
            else
                echo -e "${RED}  ❌ $block manquant${NC}"
                return 1
            fi
        done
    else
        echo -e "${RED}❌ Blocs de développement manquants${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les spécificités SPARK
check_spark_specificities() {
    echo -e "${BLUE}🌟 Vérification spécificités SPARK...${NC}"
    
    # Vérifier les types SPARK spécifiques
    if grep -q "SparkCollectiveDimension" shared/types/mona-business-model.ts; then
        echo -e "${GREEN}✅ Dimension collective SPARK${NC}"
    else
        echo -e "${RED}❌ Dimension collective SPARK manquante${NC}"
        return 1
    fi
    
    if grep -q "ProgressiveStructuration" shared/types/mona-business-model.ts; then
        echo -e "${GREEN}✅ Structuration progressive${NC}"
    else
        echo -e "${RED}❌ Structuration progressive manquante${NC}"
        return 1
    fi
    
    if grep -q "SponsorCollectiveApproach" shared/types/mona-business-model.ts; then
        echo -e "${GREEN}✅ Approche sponsors collective${NC}"
    else
        echo -e "${RED}❌ Approche sponsors collective manquante${NC}"
        return 1
    fi
    
    # Vérifier les templates SPARK
    if grep -q "spark_invitation" shared/utils/contact-templates.ts; then
        echo -e "${GREEN}✅ Template invitation SPARK${NC}"
    else
        echo -e "${RED}❌ Template invitation SPARK manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour afficher le résumé
show_summary() {
    echo -e "${PURPLE}📊 Résumé du modèle business MONA :${NC}"
    echo ""
    echo -e "${CYAN}✅ Système de scoring artistique intégré${NC}"
    echo -e "${CYAN}✅ Formules MONA adaptées${NC}"
    echo -e "${CYAN}✅ Templates de communication personnalisés${NC}"
    echo -e "${CYAN}✅ 10 blocs de développement${NC}"
    echo -e "${CYAN}✅ Spécificités SPARK préservées${NC}"
    echo ""
    echo -e "${GREEN}🎉 MONA x SPARK est prêt avec le modèle business MONA !${NC}"
    echo ""
    echo -e "${YELLOW}💡 Caractéristiques du modèle MONA :${NC}"
    echo -e "   • Dimension collective SPARK"
    echo -e "   • Structuration progressive"
    echo -e "   • Approche sponsors collective"
    echo -e "   • Événements créatifs collectifs"
    echo ""
}

# Fonction principale
main() {
    echo -e "${GREEN}🔍 Début de la vérification modèle business MONA...${NC}"
    echo ""
    
    local errors=0
    
    # Vérifications
    check_mona_types || ((errors++))
    check_mona_utils || ((errors++))
    check_exports || ((errors++))
    check_data_consistency || ((errors++))
    check_spark_specificities || ((errors++))
    
    echo ""
    
    if [ $errors -eq 0 ]; then
        show_summary
        echo -e "${GREEN}✅ Vérification modèle business MONA terminée avec succès !${NC}"
        exit 0
    else
        echo -e "${RED}❌ Vérification modèle business MONA terminée avec $errors erreur(s)${NC}"
        echo -e "${YELLOW}🔧 Corrigez les erreurs avant de continuer${NC}"
        exit 1
    fi
}

# Exécuter la fonction principale
main 