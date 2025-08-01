#!/bin/bash

# Script de déploiement Vercel pour MONA x SPARK
set -e

echo "🚀 Déploiement Vercel MONA x SPARK"
echo "==================================="

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

# Vérification de Vercel CLI
check_vercel() {
    log_info "Vérification de Vercel CLI..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI non trouvé. Installation..."
        npm install -g vercel
    fi
    
    log_success "Vercel CLI prêt"
}

# Login Vercel
login_vercel() {
    log_info "Connexion à Vercel..."
    
    if ! vercel whoami &> /dev/null; then
        log_info "Authentification requise..."
        vercel login
    else
        log_success "Déjà connecté à Vercel"
    fi
}

# Configuration du projet
setup_project() {
    log_info "Configuration du projet Vercel..."
    
    if [ ! -f ".vercel" ]; then
        log_info "Initialisation du projet Vercel..."
        vercel --yes
    else
        log_success "Projet Vercel déjà configuré"
    fi
}

# Configuration des variables d'environnement
setup_env() {
    log_info "Configuration des variables d'environnement..."
    
    # Variables principales
    vercel env add NODE_ENV production
    vercel env add PORT 3000
    vercel env add API_PORT 3001
    
    # Base de données
    vercel env add POSTGRES_DB mona_spark_db
    vercel env add POSTGRES_USER mona_spark_user
    vercel env add POSTGRES_PASSWORD mona_spark_password_cloud_2024
    
    # Sécurité
    vercel env add JWT_SECRET mona_spark_jwt_secret_key_cloud_2024_secure
    vercel env add ENCRYPTION_KEY mona_spark_encryption_key_cloud_2024_secure
    
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
    log_info "Déploiement sur Vercel..."
    
    # Build et déploiement
    vercel --prod
    
    log_success "Déploiement terminé !"
}

# Affichage des URLs
show_urls() {
    log_info "Récupération des URLs..."
    
    # Afficher les URLs
    log_info "URLs de votre application:"
    vercel ls
    
    log_success "Déploiement Vercel terminé avec succès !"
}

# Fonction principale
main() {
    check_vercel
    login_vercel
    setup_project
    setup_env
    deploy
    show_urls
}

# Exécution
main "$@" 