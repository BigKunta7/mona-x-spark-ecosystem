#!/bin/bash

# MONA x SPARK - Vérification Vision SPARK
# Vérifie que la vision SPARK est correctement intégrée

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🌟 Vérification Vision SPARK MONA x SPARK${NC}"
echo -e "${CYAN}Laboratoire Créatif Itinérant${NC}"
echo ""

# Fonction pour vérifier la vision SPARK
check_spark_vision() {
    echo -e "${BLUE}🎯 Vérification vision SPARK...${NC}"
    
    if [ -f "shared/types/spark-vision.ts" ]; then
        echo -e "${GREEN}✅ Vision SPARK présente${NC}"
        
        # Vérifier les éléments clés de la vision
        if grep -q "Nous ne créons pas des œuvres" shared/types/spark-vision.ts; then
            echo -e "  ✅ Tagline SPARK"
        else
            echo -e "${RED}  ❌ Tagline SPARK manquante${NC}"
            return 1
        fi
        
        if grep -q "SparkEdition" shared/types/spark-vision.ts; then
            echo -e "  ✅ Interface SparkEdition"
        else
            echo -e "${RED}  ❌ Interface SparkEdition manquante${NC}"
            return 1
        fi
        
        if grep -q "SparkParticipant" shared/types/spark-vision.ts; then
            echo -e "  ✅ Interface SparkParticipant"
        else
            echo -e "${RED}  ❌ Interface SparkParticipant manquante${NC}"
            return 1
        fi
        
        if grep -q "SPARK_CONFIG" shared/types/spark-vision.ts; then
            echo -e "  ✅ Configuration SPARK"
        else
            echo -e "${RED}  ❌ Configuration SPARK manquante${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Vision SPARK manquante${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les utilitaires SPARK
check_spark_utils() {
    echo -e "${BLUE}🔧 Vérification utilitaires SPARK...${NC}"
    
    if [ -f "shared/utils/spark-management.ts" ]; then
        echo -e "${GREEN}✅ Utilitaires SPARK présents${NC}"
        
        # Vérifier les fonctions principales
        if grep -q "createSparkEdition" shared/utils/spark-management.ts; then
            echo -e "  ✅ createSparkEdition"
        else
            echo -e "${RED}  ❌ createSparkEdition manquante${NC}"
            return 1
        fi
        
        if grep -q "selectParticipants" shared/utils/spark-management.ts; then
            echo -e "  ✅ selectParticipants"
        else
            echo -e "${RED}  ❌ selectParticipants manquante${NC}"
            return 1
        fi
        
        if grep -q "calculateSparkMetrics" shared/utils/spark-management.ts; then
            echo -e "  ✅ calculateSparkMetrics"
        else
            echo -e "${RED}  ❌ calculateSparkMetrics manquante${NC}"
            return 1
        fi
        
        if grep -q "validateEditionSetup" shared/utils/spark-management.ts; then
            echo -e "  ✅ validateEditionSetup"
        else
            echo -e "${RED}  ❌ validateEditionSetup manquante${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Utilitaires SPARK manquants${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les exports
check_spark_exports() {
    echo -e "${BLUE}📦 Vérification exports SPARK...${NC}"
    
    # Vérifier exports types
    if [ -f "shared/types/index.ts" ] && grep -q "spark-vision" shared/types/index.ts; then
        echo -e "${GREEN}✅ Export types SPARK configuré${NC}"
    else
        echo -e "${RED}❌ Export types SPARK manquant${NC}"
        return 1
    fi
    
    # Vérifier exports utils
    if [ -f "shared/utils/index.ts" ] && grep -q "spark-management" shared/utils/index.ts; then
        echo -e "${GREEN}✅ Export utils SPARK configuré${NC}"
    else
        echo -e "${RED}❌ Export utils SPARK manquant${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier les spécificités SPARK
check_spark_specificities() {
    echo -e "${BLUE}🎨 Vérification spécificités SPARK...${NC}"
    
    # Vérifier les rôles SPARK
    if grep -q "musician\|beatmaker\|dancer\|videographer" shared/types/spark-vision.ts; then
        echo -e "${GREEN}✅ Rôles SPARK définis${NC}"
    else
        echo -e "${RED}❌ Rôles SPARK manquants${NC}"
        return 1
    fi
    
    # Vérifier les tiers sponsors
    if grep -q "RAW\|CORE\|LEGACY" shared/types/spark-vision.ts; then
        echo -e "${GREEN}✅ Tiers sponsors définis${NC}"
    else
        echo -e "${RED}❌ Tiers sponsors manquants${NC}"
        return 1
    fi
    
    # Vérifier la configuration
    if grep -q "editionDuration.*7" shared/types/spark-vision.ts; then
        echo -e "${GREEN}✅ Durée édition configurée${NC}"
    else
        echo -e "${RED}❌ Durée édition manquante${NC}"
        return 1
    fi
    
    # Vérifier les métriques
    if grep -q "SparkMetrics" shared/types/spark-vision.ts; then
        echo -e "${GREEN}✅ Métriques SPARK définies${NC}"
    else
        echo -e "${RED}❌ Métriques SPARK manquantes${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour vérifier l'intégration MONA-SPARK
check_mona_spark_integration() {
    echo -e "${BLUE}🔗 Vérification intégration MONA-SPARK...${NC}"
    
    # Vérifier que les types SPARK sont cohérents avec MONA
    if grep -q "ArtistScore\|MonaOffer" shared/types/mona-business-model.ts; then
        echo -e "${GREEN}✅ Types MONA présents${NC}"
    else
        echo -e "${RED}❌ Types MONA manquants${NC}"
        return 1
    fi
    
    # Vérifier que les types SPARK sont présents
    if grep -q "SparkEdition\|SparkParticipant" shared/types/spark-vision.ts; then
        echo -e "${GREEN}✅ Types SPARK présents${NC}"
    else
        echo -e "${RED}❌ Types SPARK manquants${NC}"
        return 1
    fi
    
    # Vérifier la cohérence des exports
    if grep -q "mona-business-model\|spark-vision" shared/types/index.ts; then
        echo -e "${GREEN}✅ Exports cohérents${NC}"
    else
        echo -e "${RED}❌ Exports incohérents${NC}"
        return 1
    fi
    
    echo ""
}

# Fonction pour afficher le résumé
show_summary() {
    echo -e "${PURPLE}📊 Résumé de la vision SPARK :${NC}"
    echo ""
    echo -e "${CYAN}✅ Vision SPARK intégrée${NC}"
    echo -e "${CYAN}✅ Laboratoire créatif itinérant${NC}"
    echo -e "${CYAN}✅ Modèle économique diversifié${NC}"
    echo -e "${CYAN}✅ Gestion des participants et sponsors${NC}"
    echo -e "${CYAN}✅ Métriques et KPIs définis${NC}"
    echo ""
    echo -e "${GREEN}🎉 MONA x SPARK est prêt avec la vision SPARK !${NC}"
    echo ""
    echo -e "${YELLOW}💡 Caractéristiques SPARK :${NC}"
    echo -e "   • Résidences créatives nomades"
    echo -e "   • 10-15 artistes pluridisciplinaires"
    echo -e "   • 7 jours d'immersion créative"
    echo -e "   • Diffusion live et contenus"
    echo -e "   • Modèle économique diversifié"
    echo ""
    echo -e "${YELLOW}🎯 Différenciation MONA vs SPARK :${NC}"
    echo -e "   • MONA : Agence & Label (individuel)"
    echo -e "   • SPARK : Media Lab & Studio Créatif (collectif)"
    echo ""
}

# Fonction principale
main() {
    echo -e "${GREEN}🔍 Début de la vérification SPARK...${NC}"
    echo ""
    
    local errors=0
    
    # Vérifications
    check_spark_vision || ((errors++))
    check_spark_utils || ((errors++))
    check_spark_exports || ((errors++))
    check_spark_specificities || ((errors++))
    check_mona_spark_integration || ((errors++))
    
    echo ""
    
    if [ $errors -eq 0 ]; then
        show_summary
        echo -e "${GREEN}✅ Vérification SPARK terminée avec succès !${NC}"
        exit 0
    else
        echo -e "${RED}❌ Vérification SPARK terminée avec $errors erreur(s)${NC}"
        echo -e "${YELLOW}🔧 Corrigez les erreurs avant de continuer${NC}"
        exit 1
    fi
}

# Exécuter la fonction principale
main 