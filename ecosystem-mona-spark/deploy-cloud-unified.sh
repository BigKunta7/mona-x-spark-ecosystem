#!/bin/bash

# Script de déploiement Cloud Unifié pour MONA x SPARK
# Supporte Railway, Vercel, Render et DigitalOcean

set -e

echo "🚀 Déploiement Cloud Unifié MONA x SPARK"
echo "========================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

log_platform() {
    echo -e "${PURPLE}[PLATFORM]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # npm
    if ! command -v npm &> /dev/null; then
        log_error "npm n'est pas installé"
        exit 1
    fi
    
    # Git
    if ! command -v git &> /dev/null; then
        log_error "Git n'est pas installé"
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

# Déploiement Railway
deploy_railway() {
    log_platform "Railway"
    
    # Vérifier Railway CLI
    if ! command -v railway &> /dev/null; then
        log_warning "Installation de Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Login
    if ! railway whoami &> /dev/null; then
        log_info "Connexion à Railway..."
        railway login
    fi
    
    # Initialisation
    if [ ! -f ".railway" ]; then
        log_info "Initialisation du projet Railway..."
        railway init
    fi
    
    # Déploiement
    log_info "Déploiement sur Railway..."
    railway up
    
    log_success "Déploiement Railway terminé"
}

# Déploiement Vercel
deploy_vercel() {
    log_platform "Vercel"
    
    # Vérifier Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log_warning "Installation de Vercel CLI..."
        npm install -g vercel
    fi
    
    # Login
    if ! vercel whoami &> /dev/null; then
        log_info "Connexion à Vercel..."
        vercel login
    fi
    
    # Configuration
    if [ ! -f ".vercel" ]; then
        log_info "Configuration du projet Vercel..."
        vercel --yes
    fi
    
    # Déploiement
    log_info "Déploiement sur Vercel..."
    vercel --prod
    
    log_success "Déploiement Vercel terminé"
}

# Déploiement Render
deploy_render() {
    log_platform "Render"
    
    log_info "Pour déployer sur Render:"
    log_info "1. Connectez-vous à https://render.com"
    log_info "2. Créez un nouveau service Blueprint"
    log_info "3. Connectez ce repository GitHub"
    log_info "4. Render utilisera automatiquement render.yaml"
    
    log_success "Configuration Render prête"
}

# Déploiement DigitalOcean
deploy_digitalocean() {
    log_platform "DigitalOcean App Platform"
    
    if ! command -v doctl &> /dev/null; then
        log_warning "DigitalOcean CLI (doctl) non installé"
        log_info "Installez doctl depuis: https://docs.digitalocean.com/reference/doctl/how-to/install/"
    fi
    
    log_info "Pour déployer sur DigitalOcean:"
    log_info "1. Connectez-vous: doctl auth init"
    log_info "2. Créez une app: doctl apps create --spec app.yaml"
    
    log_success "Configuration DigitalOcean prête"
}

# Menu de sélection
show_menu() {
    echo ""
    echo "🌐 Choisissez votre plateforme de déploiement:"
    echo ""
    echo "1) 🚂 Railway (Recommandé)"
    echo "   ✅ Simple, rapide, gratuit pour open source"
    echo "   ✅ Base de données PostgreSQL incluse"
    echo "   ✅ Cache Redis inclus"
    echo ""
    echo "2) ⚡ Vercel (Alternative)"
    echo "   ✅ Optimisé pour Next.js"
    echo "   ✅ Déploiement automatique"
    echo "   ✅ Edge functions"
    echo ""
    echo "3) 🎨 Render (Gratuit)"
    echo "   ✅ Plan gratuit disponible"
    echo "   ⚠️  Temps de démarrage lent"
    echo "   ⚠️  Limitations sur le plan gratuit"
    echo ""
    echo "4) 🐳 DigitalOcean (Payant)"
    echo "   ✅ Performance élevée"
    echo "   ✅ Scalabilité"
    echo "   💰 Coût: ~$5-20/mois"
    echo ""
    echo "5) 🔧 Vérifier les prérequis seulement"
    echo "6) 🏗️  Build local seulement"
    echo "7) ❌ Quitter"
    echo ""
    read -p "Votre choix (1-7): " choice
}

# Configuration des variables d'environnement
setup_env_variables() {
    log_info "Configuration des variables d'environnement..."
    
    # Créer un fichier .env.example
    cat > .env.example << EOF
# Configuration Cloud MONA x SPARK
NODE_ENV=production
PORT=3000
API_PORT=3001

# Base de données
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://:password@host:port

# Sécurité
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here

# APIs Streaming
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
TIKTOK_API_KEY=your_tiktok_api_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
SMTP_PORT=587

# URLs
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_APP_URL=https://your-app-url.com
EOF
    
    log_success "Fichier .env.example créé"
    log_warning "Configurez vos variables d'environnement selon votre plateforme"
}

# Affichage des prochaines étapes
show_next_steps() {
    echo ""
    log_info "🎯 Prochaines étapes:"
    echo ""
    echo "1. 📋 Configurez vos variables d'environnement"
    echo "2. 🔑 Ajoutez vos clés API (Twitch, YouTube, TikTok)"
    echo "3. 📧 Configurez votre service email"
    echo "4. 🧪 Testez votre application"
    echo "5. 🌐 Configurez votre domaine personnalisé"
    echo "6. 📊 Mettez en place le monitoring"
    echo "7. 👥 Formez votre équipe"
    echo ""
    log_success "Déploiement cloud terminé !"
}

# Fonction principale
main() {
    log_info "Bienvenue dans le déploiement Cloud MONA x SPARK"
    
    while true; do
        show_menu
        
        case $choice in
            1)
                check_prerequisites
                build_application
                deploy_railway
                setup_env_variables
                show_next_steps
                break
                ;;
            2)
                check_prerequisites
                build_application
                deploy_vercel
                setup_env_variables
                show_next_steps
                break
                ;;
            3)
                check_prerequisites
                build_application
                deploy_render
                setup_env_variables
                show_next_steps
                break
                ;;
            4)
                check_prerequisites
                build_application
                deploy_digitalocean
                setup_env_variables
                show_next_steps
                break
                ;;
            5)
                check_prerequisites
                break
                ;;
            6)
                check_prerequisites
                build_application
                break
                ;;
            7)
                log_info "Au revoir !"
                exit 0
                ;;
            *)
                log_error "Choix invalide. Veuillez choisir 1-7."
                ;;
        esac
    done
}

# Exécution du script
main "$@" 