#!/bin/bash

# Script de déploiement Railway pour MONA x SPARK
set -e

echo "🚀 Déploiement Railway MONA x SPARK"
echo "===================================="

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Vérification de Railway CLI
check_railway() {
    log_info "Vérification de Railway CLI..."
    
    if ! command -v railway &> /dev/null; then
        log_warning "Railway CLI non trouvé. Installation..."
        npm install -g @railway/cli
    fi
    
    log_success "Railway CLI prêt"
}

# Login Railway
login_railway() {
    log_info "Connexion à Railway..."
    
    if ! railway whoami &> /dev/null; then
        log_info "Authentification requise..."
        railway login
    else
        log_success "Déjà connecté à Railway"
    fi
}

# Initialisation du projet
init_project() {
    log_info "Initialisation du projet Railway..."
    
    if [ ! -f ".railway" ]; then
        log_info "Création du projet Railway..."
        railway init
    else
        log_success "Projet Railway déjà initialisé"
    fi
}

# Configuration des variables d'environnement
setup_env() {
    log_info "Configuration des variables d'environnement..."
    
    # Variables principales
    railway variables set NODE_ENV=production
    railway variables set PORT=3000
    railway variables set API_PORT=3001
    
    # Base de données
    railway variables set POSTGRES_DB=mona_spark_db
    railway variables set POSTGRES_USER=mona_spark_user
    railway variables set POSTGRES_PASSWORD=mona_spark_password_cloud_2024
    
    # Sécurité
    railway variables set JWT_SECRET=mona_spark_jwt_secret_key_cloud_2024_secure
    railway variables set ENCRYPTION_KEY=mona_spark_encryption_key_cloud_2024_secure
    
    # APIs Streaming (à configurer manuellement)
    log_warning "Configurez manuellement les clés API:"
    log_info "TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET"
    log_info "YOUTUBE_API_KEY, TIKTOK_API_KEY"
    
    # Email (à configurer manuellement)
    log_warning "Configurez manuellement les paramètres email:"
    log_info "SMTP_HOST, SMTP_USER, SMTP_PASS"
    
    log_success "Variables d'environnement configurées"
}

# Déploiement
deploy() {
    log_info "Déploiement sur Railway..."
    
    # Build et déploiement
    railway up
    
    log_success "Déploiement terminé !"
}

# Affichage des URLs
show_urls() {
    log_info "Récupération des URLs..."
    
    # Attendre un peu pour que le déploiement se termine
    sleep 10
    
    # Afficher les URLs
    log_info "URLs de votre application:"
    railway status
    
    log_success "Déploiement Railway terminé avec succès !"
}

# Fonction principale
main() {
    check_railway
    login_railway
    init_project
    setup_env
    deploy
    show_urls
}

# Exécution
main "$@" 