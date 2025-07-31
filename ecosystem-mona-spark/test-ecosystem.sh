#!/bin/bash

echo "🧪 Test Écosystème MONA x SPARK"
echo "================================"

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

# Test des services Docker
log_info "Test des services Docker..."
if docker-compose ps | grep -q "Up"; then
    log_success "Services Docker: OK"
else
    log_warning "Services Docker: Non démarrés"
fi

# Test des ports
log_info "Test des ports..."

# Test PostgreSQL
if nc -z localhost 5432 2>/dev/null; then
    log_success "PostgreSQL (5432): OK"
else
    log_warning "PostgreSQL (5432): Non accessible"
fi

# Test Redis
if nc -z localhost 6379 2>/dev/null; then
    log_success "Redis (6379): OK"
else
    log_warning "Redis (6379): Non accessible"
fi

# Test des applications
log_info "Test des applications..."

# Test SPARK Hub
if curl -s http://localhost:3003 > /dev/null 2>&1; then
    log_success "SPARK Hub (3003): OK"
else
    log_warning "SPARK Hub (3003): Non accessible"
fi

# Test MONA Client
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    log_success "MONA Client (3000): OK"
else
    log_warning "MONA Client (3000): Non accessible"
fi

# Test MONA Dashboard
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    log_success "MONA Dashboard (3001): OK"
else
    log_warning "MONA Dashboard (3001): Non accessible"
fi

echo ""
log_info "Résumé de l'écosystème :"
echo ""
echo "📊 Services :"
echo "   - PostgreSQL: localhost:5432"
echo "   - Redis: localhost:6379"
echo ""
echo "🌐 Applications :"
echo "   - SPARK Hub: http://localhost:3003"
echo "   - MONA Client: http://localhost:3000"
echo "   - MONA Dashboard: http://localhost:3001"
echo ""
echo "📈 Monitoring :"
echo "   - Grafana: http://localhost:3005"
echo ""
log_success "Test terminé ! 🎯" 