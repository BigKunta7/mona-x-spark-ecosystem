#!/bin/bash

# Script de déploiement Vercel simplifié pour MONA x SPARK

set -e

echo "🚀 Déploiement Vercel Simplifié MONA x SPARK"
echo "============================================="

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Nettoyage
cleanup() {
    log_info "Nettoyage des fichiers temporaires..."
    rm -rf .next
    rm -rf node_modules/.cache
    rm -f .npmrc
}

# Configuration npm
setup_npm() {
    log_info "Configuration npm..."
    cat > .npmrc << 'EOF'
legacy-peer-deps=true
platform=linux
arch=x64
EOF
}

# Installation des dépendances
install_deps() {
    log_info "Installation des dépendances..."
    npm ci --production=false
}

# Build local
build_local() {
    log_info "Build local..."
    npm run build
}

# Déploiement Vercel
deploy_vercel() {
    log_info "Déploiement Vercel..."
    vercel --prod --yes
}

# Fonction principale
main() {
    log_info "Démarrage du déploiement..."
    
    cleanup
    setup_npm
    install_deps
    build_local
    deploy_vercel
    
    log_success "Déploiement terminé !"
    log_info "URL : https://client-*.vercel.app"
}

# Exécution
main "$@" 