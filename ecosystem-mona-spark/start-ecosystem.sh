#!/bin/bash

echo "🚀 Écosystème MONA x SPARK - Démarrage Complet"
echo "================================================"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérification Docker
log_info "Vérification Docker..."
if ! docker info > /dev/null 2>&1; then
    log_warning "Docker n'est pas démarré. Démarrage de Docker Desktop..."
    open -a Docker
    sleep 10
    while ! docker info > /dev/null 2>&1; do
        log_info "Attente du démarrage de Docker..."
        sleep 5
    done
fi
log_success "Docker est prêt"

# Démarrage des services Docker
log_info "Démarrage des services Docker..."
docker-compose up -d postgres redis
sleep 5

# Test des services
log_info "Test des services..."
if curl -s http://localhost:5432 > /dev/null 2>&1; then
    log_success "PostgreSQL: OK"
else
    log_warning "PostgreSQL: En cours de démarrage..."
fi

if curl -s http://localhost:6379 > /dev/null 2>&1; then
    log_success "Redis: OK"
else
    log_warning "Redis: En cours de démarrage..."
fi

echo ""
log_success "Services Docker démarrés !"
echo ""

# Menu de démarrage
echo "🎯 Choisissez les applications à démarrer :"
echo ""
echo "1) SPARK Hub (Port 3003)"
echo "2) MONA Client (Port 3000)"
echo "3) MONA Dashboard (Port 3001)"
echo "4) Tout démarrer"
echo "5) Voir le statut"
echo "6) Arrêter tout"
echo ""

read -p "Votre choix (1-6): " choice

case $choice in
    1)
        log_info "Démarrage SPARK Hub..."
        cd spark-hub/frontend && npm run dev &
        SPARK_PID=$!
        log_success "SPARK Hub démarré sur http://localhost:3003"
        ;;
    2)
        log_info "Démarrage MONA Client..."
        cd mona-engine/frontend && npm run dev &
        MONA_CLIENT_PID=$!
        log_success "MONA Client démarré sur http://localhost:3000"
        ;;
    3)
        log_info "Démarrage MONA Dashboard..."
        cd mona-engine/dashboard && npm run dev &
        MONA_DASHBOARD_PID=$!
        log_success "MONA Dashboard démarré sur http://localhost:3001"
        ;;
    4)
        log_info "Démarrage de tout l'écosystème..."
        
        # SPARK Hub
        cd spark-hub/frontend && npm run dev &
        SPARK_PID=$!
        log_success "SPARK Hub démarré"
        
        # MONA Client
        cd ../../mona-engine/frontend && npm run dev &
        MONA_CLIENT_PID=$!
        log_success "MONA Client démarré"
        
        # MONA Dashboard
        cd ../dashboard && npm run dev &
        MONA_DASHBOARD_PID=$!
        log_success "MONA Dashboard démarré"
        
        log_success "Tout l'écosystème est démarré !"
        ;;
    5)
        log_info "Statut de l'écosystème :"
        echo ""
        echo "📊 Services Docker :"
        docker-compose ps
        echo ""
        echo "🌐 Applications :"
        echo "   - SPARK Hub: http://localhost:3003"
        echo "   - MONA Client: http://localhost:3000"
        echo "   - MONA Dashboard: http://localhost:3001"
        echo ""
        echo "📈 Monitoring :"
        echo "   - Grafana: http://localhost:3005"
        echo ""
        ;;
    6)
        log_info "Arrêt de tout l'écosystème..."
        pkill -f "npm run dev"
        docker-compose down
        log_success "Écosystème arrêté"
        ;;
    *)
        log_error "Choix invalide"
        exit 1
        ;;
esac

if [ "$choice" = "4" ] || [ "$choice" = "1" ] || [ "$choice" = "2" ] || [ "$choice" = "3" ]; then
    echo ""
    log_success "🎉 Votre écosystème MONA x SPARK est opérationnel !"
    echo ""
    echo "🌐 URLs d'accès :"
    if [ "$choice" = "4" ] || [ "$choice" = "1" ]; then
        echo "   - SPARK Hub: http://localhost:3003"
    fi
    if [ "$choice" = "4" ] || [ "$choice" = "2" ]; then
        echo "   - MONA Client: http://localhost:3000"
    fi
    if [ "$choice" = "4" ] || [ "$choice" = "3" ]; then
        echo "   - MONA Dashboard: http://localhost:3001"
    fi
    echo ""
    echo "📊 Services :"
    echo "   - PostgreSQL: localhost:5432"
    echo "   - Redis: localhost:6379"
    echo "   - Grafana: http://localhost:3005"
    echo ""
    echo "🔧 Commandes utiles :"
    echo "   - docker-compose ps (statut services)"
    echo "   - docker-compose logs (logs services)"
    echo "   - pkill -f 'npm run dev' (arrêt apps)"
    echo ""
    log_success "Votre écosystème est prêt ! 🚀"
fi 