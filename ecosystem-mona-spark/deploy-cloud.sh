#!/bin/bash

# Script de déploiement Cloud pour MONA x SPARK
# Supporte Railway, Render, et DigitalOcean App Platform

set -e

echo "🚀 Déploiement Cloud MONA x SPARK"
echo "=================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Vérifier si Docker est installé
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé. Veuillez l'installer d'abord."
        exit 1
    fi
    
    # Vérifier si Node.js est installé
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé. Veuillez l'installer d'abord."
        exit 1
    fi
    
    # Vérifier si npm est installé
    if ! command -v npm &> /dev/null; then
        log_error "npm n'est pas installé. Veuillez l'installer d'abord."
        exit 1
    fi
    
    log_success "Tous les prérequis sont satisfaits"
}

# Build de l'application
build_application() {
    log_info "Build de l'application..."
    
    # Installation des dépendances
    npm install
    
    # Build de l'application
    npm run build
    
    log_success "Build terminé avec succès"
}

# Déploiement sur Railway
deploy_railway() {
    log_info "Déploiement sur Railway..."
    
    # Vérifier si Railway CLI est installé
    if ! command -v railway &> /dev/null; then
        log_warning "Railway CLI n'est pas installé. Installation..."
        npm install -g @railway/cli
    fi
    
    # Login Railway (si nécessaire)
    if ! railway whoami &> /dev/null; then
        log_info "Connexion à Railway..."
        railway login
    fi
    
    # Déploiement
    railway up
    
    log_success "Déploiement Railway terminé"
}

# Déploiement sur Render
deploy_render() {
    log_info "Déploiement sur Render..."
    
    # Vérifier si le fichier render.yaml existe
    if [ ! -f "render.yaml" ]; then
        log_error "Fichier render.yaml manquant"
        exit 1
    fi
    
    log_info "Pour déployer sur Render:"
    log_info "1. Connectez-vous à votre compte Render"
    log_info "2. Créez un nouveau service Blueprint"
    log_info "3. Connectez ce repository"
    log_info "4. Render utilisera automatiquement render.yaml"
    
    log_success "Configuration Render prête"
}

# Déploiement sur DigitalOcean App Platform
deploy_digitalocean() {
    log_info "Déploiement sur DigitalOcean App Platform..."
    
    # Vérifier si doctl est installé
    if ! command -v doctl &> /dev/null; then
        log_warning "DigitalOcean CLI (doctl) n'est pas installé"
        log_info "Installez doctl depuis: https://docs.digitalocean.com/reference/doctl/how-to/install/"
    fi
    
    log_info "Pour déployer sur DigitalOcean:"
    log_info "1. Connectez-vous avec: doctl auth init"
    log_info "2. Créez une app: doctl apps create --spec app.yaml"
    
    log_success "Configuration DigitalOcean prête"
}

# Menu principal
show_menu() {
    echo ""
    echo "Choisissez votre plateforme de déploiement:"
    echo "1) Railway (Recommandé - Simple et rapide)"
    echo "2) Render (Gratuit avec limitations)"
    echo "3) DigitalOcean App Platform (Payant mais robuste)"
    echo "4) Vérifier les prérequis seulement"
    echo "5) Build local seulement"
    echo "6) Quitter"
    echo ""
    read -p "Votre choix (1-6): " choice
}

# Fonction principale
main() {
    echo ""
    log_info "Bienvenue dans le déploiement Cloud MONA x SPARK"
    
    while true; do
        show_menu
        
        case $choice in
            1)
                check_prerequisites
                build_application
                deploy_railway
                break
                ;;
            2)
                check_prerequisites
                build_application
                deploy_render
                break
                ;;
            3)
                check_prerequisites
                build_application
                deploy_digitalocean
                break
                ;;
            4)
                check_prerequisites
                break
                ;;
            5)
                check_prerequisites
                build_application
                break
                ;;
            6)
                log_info "Au revoir !"
                exit 0
                ;;
            *)
                log_error "Choix invalide. Veuillez choisir 1-6."
                ;;
        esac
    done
    
    log_success "Déploiement terminé !"
    echo ""
    log_info "Prochaines étapes:"
    log_info "1. Configurez vos variables d'environnement"
    log_info "2. Testez votre application"
    log_info "3. Configurez votre domaine personnalisé"
    echo ""
}

# Exécution du script
main "$@" 