#!/bin/bash

# Script de déploiement Stack Moderne MONA x SPARK
# Vercel + Supabase + Backblaze + Cloudflare + Replicate

set -e

echo "🚀 Déploiement Stack Moderne MONA x SPARK"
echo "=========================================="

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
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

log_stack() {
    echo -e "${PURPLE}[STACK]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js requis"
        exit 1
    fi
    
    # npm
    if ! command -v npm &> /dev/null; then
        log_error "npm requis"
        exit 1
    fi
    
    # Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log_warning "Installation de Vercel CLI..."
        npm install -g vercel
    fi
    
    log_success "Prérequis satisfaits"
}

# Configuration Supabase
setup_supabase() {
    log_stack "Configuration Supabase"
    
    log_info "1. Créez un projet Supabase sur https://supabase.com"
    log_info "2. Récupérez vos clés API"
    log_info "3. Configurez les variables d'environnement"
    
    echo ""
    log_warning "Variables Supabase à configurer:"
    echo "NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon"
    echo "SUPABASE_SERVICE_ROLE_KEY=votre_clé_service"
    echo ""
}

# Configuration Backblaze
setup_backblaze() {
    log_stack "Configuration Backblaze"
    
    log_info "1. Créez un compte Backblaze B2"
    log_info "2. Créez un bucket pour les médias SPARK"
    log_info "3. Configurez les clés d'accès"
    
    echo ""
    log_warning "Variables Backblaze à configurer:"
    echo "BACKBLAZE_APPLICATION_KEY_ID=votre_key_id"
    echo "BACKBLAZE_APPLICATION_KEY=votre_application_key"
    echo "BACKBLAZE_BUCKET_NAME=votre_bucket_name"
    echo ""
}

# Configuration Cloudflare
setup_cloudflare() {
    log_stack "Configuration Cloudflare"
    
    log_info "1. Créez un compte Cloudflare"
    log_info "2. Configurez votre domaine"
    log_info "3. Activez le CDN"
    
    echo ""
    log_warning "Variables Cloudflare à configurer:"
    echo "CLOUDFLARE_API_TOKEN=votre_api_token"
    echo "CLOUDFLARE_ZONE_ID=votre_zone_id"
    echo ""
}

# Configuration Replicate
setup_replicate() {
    log_stack "Configuration Replicate (IA)"
    
    log_info "1. Créez un compte Replicate"
    log_info "2. Configurez l'API pour le scoring MONA"
    
    echo ""
    log_warning "Variables Replicate à configurer:"
    echo "REPLICATE_API_TOKEN=votre_api_token"
    echo ""
}

# Déploiement Vercel
deploy_vercel() {
    log_stack "Déploiement Vercel"
    
    cd app/client
    
    # Configuration Vercel
    if [ ! -f ".vercel" ]; then
        log_info "Configuration Vercel..."
        vercel --yes
    fi
    
    # Déploiement
    log_info "Déploiement en production..."
    vercel --prod
    
    log_success "Déploiement Vercel terminé"
}

# Configuration des variables d'environnement
setup_env() {
    log_info "Configuration des variables d'environnement..."
    
    # Créer un fichier .env.example
    cat > .env.example << 'EOF'
# Configuration Stack Moderne MONA x SPARK

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# Backblaze B2
BACKBLAZE_APPLICATION_KEY_ID=your_backblaze_key_id
BACKBLAZE_APPLICATION_KEY=your_backblaze_application_key
BACKBLAZE_BUCKET_NAME=your_bucket_name

# Cloudflare
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ZONE_ID=your_cloudflare_zone_id

# Replicate (IA)
REPLICATE_API_TOKEN=your_replicate_api_token

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Sécurité
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key

# URLs
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-api.vercel.app
EOF
    
    log_success "Fichier .env.example créé"
}

# Affichage du budget prévisionnel
show_budget() {
    echo ""
    log_info "💰 Budget Prévisionnel MONA x SPARK"
    echo ""
    echo "Mois 1-6 : 50-150€/mois"
    echo "├── Vercel Pro : 20€/mois"
    echo "├── Supabase Pro : 25€/mois"
    echo "├── Backblaze B2 : 5€/mois"
    echo "├── Cloudflare Pro : 20€/mois"
    echo "└── Replicate : 10-50€/mois"
    echo ""
    echo "Mois 6-12 : 150-400€/mois"
    echo "├── Scaling automatique"
    echo "├── Plus d'utilisateurs"
    echo "└── Fonctionnalités avancées"
    echo ""
    echo "An 2+ : 400-1000€/mois"
    echo "├── Équipe complète"
    echo "├── Fonctionnalités premium"
    echo "└── Support dédié"
    echo ""
}

# Affichage des prochaines étapes
show_next_steps() {
    echo ""
    log_info "🎯 Prochaines Étapes"
    echo ""
    echo "1. 🌐 Déployez sur Vercel"
    echo "2. 🗄️  Configurez Supabase"
    echo "3. 📦 Configurez Backblaze"
    echo "4. 🌍 Configurez Cloudflare"
    echo "5. 🤖 Configurez Replicate"
    echo "6. 💳 Configurez Stripe"
    echo "7. 📧 Configurez Resend"
    echo "8. 📱 Configurez Twilio"
    echo "9. 🔒 Configurez la sécurité"
    echo "10. 🧪 Testez l'application"
    echo ""
    log_success "Stack moderne configurée !"
}

# Fonction principale
main() {
    log_info "Déploiement Stack Moderne MONA x SPARK"
    
    check_prerequisites
    setup_supabase
    setup_backblaze
    setup_cloudflare
    setup_replicate
    setup_env
    deploy_vercel
    show_budget
    show_next_steps
}

# Exécution
main "$@" 