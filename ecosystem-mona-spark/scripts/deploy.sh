#!/bin/bash

# ========================================
# MONA x SPARK V2 - Script de Déploiement
# ========================================

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-staging}
VERSION=${2:-$(git rev-parse --short HEAD)}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Fonctions utilitaires
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

# Vérifications préliminaires
check_prerequisites() {
    log_info "🔍 Vérification des prérequis..."
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    # Vérifier Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier Git
    if ! command -v git &> /dev/null; then
        log_error "Git n'est pas installé"
        exit 1
    fi
    
    log_success "✅ Prérequis vérifiés"
}

# Nettoyage
cleanup() {
    log_info "🧹 Nettoyage..."
    
    # Nettoyer les images Docker non utilisées
    docker image prune -f
    
    # Nettoyer les conteneurs arrêtés
    docker container prune -f
    
    # Nettoyer les volumes non utilisés
    docker volume prune -f
    
    log_success "✅ Nettoyage terminé"
}

# Build des applications
build_applications() {
    log_info "📦 Build des applications..."
    
    # Build API
    log_info "Building API..."
    cd app/api
    npm ci --only=production
    npm run build
    
    # Build Client
    log_info "Building Client..."
    cd ../client
    npm ci --only=production
    npm run build
    
    cd ../..
    
    log_success "✅ Applications buildées"
}

# Tests
run_tests() {
    log_info "🧪 Exécution des tests..."
    
    # Tests API
    log_info "Tests API..."
    cd app/api
    npm test -- --coverage --watchAll=false
    
    # Tests Client
    log_info "Tests Client..."
    cd ../client
    npm test -- --coverage --watchAll=false
    
    cd ../..
    
    log_success "✅ Tests passés"
}

# Build Docker
build_docker() {
    log_info "🐳 Build des images Docker..."
    
    # Build avec cache
    docker-compose build --no-cache
    
    # Tag des images
    docker tag mona-spark-api:latest mona-spark-api:$VERSION
    docker tag mona-spark-client:latest mona-spark-client:$VERSION
    
    log_success "✅ Images Docker buildées"
}

# Migration base de données
migrate_database() {
    log_info "🗄️ Migration de la base de données..."
    
    # Attendre que PostgreSQL soit prêt
    log_info "Attente de PostgreSQL..."
    sleep 10
    
    # Exécuter les migrations
    cd app/api
    npx prisma migrate deploy
    npx prisma generate
    
    # Seed si nécessaire
    if [ "$ENVIRONMENT" = "staging" ]; then
        log_info "Seed de données de test..."
        npx prisma db seed
    fi
    
    cd ../..
    
    log_success "✅ Base de données migrée"
}

# Déploiement
deploy() {
    log_info "🚀 Déploiement sur $ENVIRONMENT..."
    
    # Arrêter les services existants
    log_info "Arrêt des services existants..."
    docker-compose down --remove-orphans
    
    # Démarrer les nouveaux services
    log_info "Démarrage des nouveaux services..."
    docker-compose up -d
    
    # Attendre que les services soient prêts
    log_info "Attente des services..."
    sleep 30
    
    log_success "✅ Déploiement terminé"
}

# Tests de santé
health_check() {
    log_info "🏥 Tests de santé..."
    
    # Vérifier l'API
    local api_health=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)
    if [ "$api_health" = "200" ]; then
        log_success "✅ API en ligne"
    else
        log_error "❌ API hors ligne (HTTP $api_health)"
        return 1
    fi
    
    # Vérifier le Client
    local client_health=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
    if [ "$client_health" = "200" ]; then
        log_success "✅ Client en ligne"
    else
        log_error "❌ Client hors ligne (HTTP $client_health)"
        return 1
    fi
    
    # Vérifier la base de données
    if docker-compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; then
        log_success "✅ Base de données en ligne"
    else
        log_error "❌ Base de données hors ligne"
        return 1
    fi
    
    log_success "✅ Tous les services sont en ligne"
}

# Notifications
send_notifications() {
    log_info "📢 Envoi des notifications..."
    
    # Slack notification
    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚀 Déploiement $ENVIRONMENT v$VERSION terminé avec succès!\"}" \
            $SLACK_WEBHOOK_URL
    fi
    
    # Email notification
    if [ -n "$EMAIL_SMTP_HOST" ]; then
        echo "Déploiement $ENVIRONMENT v$VERSION terminé" | mail -s "MONA x SPARK - Déploiement" team@mona-spark.com
    fi
    
    log_success "✅ Notifications envoyées"
}

# Rollback
rollback() {
    log_warning "🔄 Rollback en cours..."
    
    # Arrêter les services
    docker-compose down
    
    # Restaurer la version précédente
    if [ -n "$PREVIOUS_VERSION" ]; then
        docker tag mona-spark-api:$PREVIOUS_VERSION mona-spark-api:latest
        docker tag mona-spark-client:$PREVIOUS_VERSION mona-spark-client:latest
        
        # Redémarrer avec l'ancienne version
        docker-compose up -d
        
        log_success "✅ Rollback terminé vers v$PREVIOUS_VERSION"
    else
        log_error "❌ Impossible de faire le rollback - version précédente non trouvée"
    fi
}

# Monitoring
setup_monitoring() {
    log_info "📊 Configuration du monitoring..."
    
    # Créer les dossiers de logs
    mkdir -p logs
    
    # Configurer les alertes
    if [ "$ENVIRONMENT" = "production" ]; then
        # Alertes critiques pour la production
        log_info "Configuration alertes production..."
    fi
    
    log_success "✅ Monitoring configuré"
}

# Backup
create_backup() {
    log_info "💾 Création du backup..."
    
    # Backup de la base de données
    docker-compose exec -T postgres pg_dump -U postgres mona_spark > backup_${TIMESTAMP}.sql
    
    # Backup des logs
    tar -czf logs_backup_${TIMESTAMP}.tar.gz logs/
    
    # Upload vers le stockage cloud
    if [ -n "$AWS_S3_BUCKET" ]; then
        aws s3 cp backup_${TIMESTAMP}.sql s3://$AWS_S3_BUCKET/backups/
        aws s3 cp logs_backup_${TIMESTAMP}.tar.gz s3://$AWS_S3_BUCKET/backups/
    fi
    
    log_success "✅ Backup créé"
}

# Fonction principale
main() {
    log_info "🚀 Démarrage du déploiement MONA x SPARK V2"
    log_info "Environment: $ENVIRONMENT"
    log_info "Version: $VERSION"
    log_info "Timestamp: $TIMESTAMP"
    
    # Sauvegarder la version précédente
    PREVIOUS_VERSION=$(docker images --format "{{.Tag}}" mona-spark-api:latest | grep -v latest | head -1)
    
    # Exécuter les étapes
    check_prerequisites
    cleanup
    build_applications
    run_tests
    build_docker
    
    # Backup avant déploiement
    if [ "$ENVIRONMENT" = "production" ]; then
        create_backup
    fi
    
    migrate_database
    deploy
    health_check
    
    if [ $? -eq 0 ]; then
        setup_monitoring
        send_notifications
        log_success "🎉 Déploiement réussi!"
    else
        log_error "❌ Échec du déploiement"
        rollback
        exit 1
    fi
}

# Gestion des erreurs
trap 'log_error "Erreur survenue. Rollback en cours..."; rollback; exit 1' ERR

# Exécution
main "$@" 