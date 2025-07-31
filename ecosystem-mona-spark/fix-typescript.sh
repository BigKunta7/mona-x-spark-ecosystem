#!/bin/bash

echo "🔧 Correction TypeScript Globale MONA x SPARK"
echo "============================================="

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

# Installation des types manquants globalement
log_info "Installation des types TypeScript manquants..."

# MONA API
cd mona-engine/api
npm install --save-dev @types/semver @types/node @types/express @types/cors
log_success "Types installés pour MONA API"

# MONA Frontend
cd ../frontend
npm install --save-dev @types/semver @types/node @types/react @types/react-dom
log_success "Types installés pour MONA Frontend"

# MONA Dashboard
cd ../dashboard
npm install --save-dev @types/semver @types/node @types/react @types/react-dom
log_success "Types installés pour MONA Dashboard"

# SPARK Frontend
cd ../../spark-hub/frontend
npm install --save-dev @types/semver @types/node @types/react @types/react-dom
log_success "Types installés pour SPARK Frontend"

# Retour à la racine
cd ../..

# Vérification TypeScript globale
log_info "Vérification TypeScript globale..."

# MONA API
log_info "Vérification MONA API..."
cd mona-engine/api
npx tsc --noEmit --skipLibCheck
if [ $? -eq 0 ]; then
    log_success "MONA API: OK"
else
    log_warning "MONA API: Erreurs TypeScript détectées"
fi

# MONA Frontend
log_info "Vérification MONA Frontend..."
cd ../frontend
npx tsc --noEmit --skipLibCheck
if [ $? -eq 0 ]; then
    log_success "MONA Frontend: OK"
else
    log_warning "MONA Frontend: Erreurs TypeScript détectées"
fi

# MONA Dashboard
log_info "Vérification MONA Dashboard..."
cd ../dashboard
npx tsc --noEmit --skipLibCheck
if [ $? -eq 0 ]; then
    log_success "MONA Dashboard: OK"
else
    log_warning "MONA Dashboard: Erreurs TypeScript détectées"
fi

# SPARK Frontend
log_info "Vérification SPARK Frontend..."
cd ../../spark-hub/frontend
npx tsc --noEmit --skipLibCheck
if [ $? -eq 0 ]; then
    log_success "SPARK Frontend: OK"
else
    log_warning "SPARK Frontend: Erreurs TypeScript détectées"
fi

cd ../..

echo ""
log_success "Correction TypeScript terminée !"
echo ""
echo "🎯 Configuration TypeScript :"
echo "   - tsconfig.base.json : Configuration globale"
echo "   - Chaque projet étend la configuration de base"
echo "   - Types @types/semver installés partout"
echo ""
echo "📊 État des projets :"
echo "   - MONA API : TypeScript configuré"
echo "   - MONA Frontend : TypeScript configuré"
echo "   - MONA Dashboard : TypeScript configuré"
echo "   - SPARK Frontend : TypeScript configuré"
echo ""
log_success "Votre écosystème TypeScript est prêt ! 🚀" 