#!/bin/bash

# Script pour configurer la base de données de l'équipe MONA x SPARK
# Ce script exécute les migrations et seeds pour l'organigramme

echo "🚀 Configuration de la base de données équipe MONA x SPARK..."

# Variables
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-mona_spark}
DB_USER=${DB_USER:-postgres}

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si psql est installé
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL client (psql) n'est pas installé"
    exit 1
fi

# Vérifier la connexion à la base de données
print_status "Vérification de la connexion à la base de données..."
if ! psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1;" > /dev/null 2>&1; then
    print_error "Impossible de se connecter à la base de données"
    print_error "Vérifiez que PostgreSQL est en cours d'exécution et que les variables d'environnement sont correctes"
    exit 1
fi

print_success "Connexion à la base de données établie"

# Exécuter les migrations
print_status "Exécution des migrations..."

# Migration 1: Création de la table team_members
print_status "Création de la table team_members..."
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f migrations/001_create_team_members.sql; then
    print_success "Table team_members créée avec succès"
else
    print_error "Erreur lors de la création de la table team_members"
    exit 1
fi

# Migration 2: Création des tables squads
print_status "Création des tables squads..."
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f migrations/002_create_squads.sql; then
    print_success "Tables squads créées avec succès"
else
    print_error "Erreur lors de la création des tables squads"
    exit 1
fi

# Migration 3: Création de la table recruitment_needs
print_status "Création de la table recruitment_needs..."
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f migrations/003_create_recruitment_needs.sql; then
    print_success "Table recruitment_needs créée avec succès"
else
    print_error "Erreur lors de la création de la table recruitment_needs"
    exit 1
fi

# Exécuter les seeds
print_status "Exécution des seeds..."

# Seed 1: Membres de l'équipe
print_status "Insertion des membres de l'équipe..."
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f seeds/001_team_members.sql; then
    print_success "Membres de l'équipe insérés avec succès"
else
    print_error "Erreur lors de l'insertion des membres de l'équipe"
    exit 1
fi

# Seed 2: Squads
print_status "Insertion des squads..."
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f seeds/002_squads.sql; then
    print_success "Squads insérés avec succès"
else
    print_error "Erreur lors de l'insertion des squads"
    exit 1
fi

# Seed 3: Besoins de recrutement
print_status "Insertion des besoins de recrutement..."
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f seeds/003_recruitment_needs.sql; then
    print_success "Besoins de recrutement insérés avec succès"
else
    print_error "Erreur lors de l'insertion des besoins de recrutement"
    exit 1
fi

# Vérification finale
print_status "Vérification de l'installation..."

# Compter les membres de l'équipe
TEAM_COUNT=$(psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM team_members;" | xargs)
print_status "Nombre de membres de l'équipe: $TEAM_COUNT"

# Compter les squads
SQUAD_COUNT=$(psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM squads;" | xargs)
print_status "Nombre de squads: $SQUAD_COUNT"

# Compter les besoins de recrutement
RECRUITMENT_COUNT=$(psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM recruitment_needs;" | xargs)
print_status "Nombre de besoins de recrutement: $RECRUITMENT_COUNT"

print_success "✅ Configuration de la base de données équipe terminée avec succès!"

echo ""
echo "📋 Récapitulatif de l'installation:"
echo "   • $TEAM_COUNT membres de l'équipe"
echo "   • $SQUAD_COUNT squads créés"
echo "   • $RECRUITMENT_COUNT besoins de recrutement identifiés"
echo ""
echo "🌐 Accès aux pages:"
echo "   • Profil équipe: http://localhost:3000/team/profile"
echo "   • Organigramme: http://localhost:3000/team/organization"
echo "   • Recrutement: http://localhost:3000/team/recruitment"
echo ""
echo "🎯 Prochaines étapes:"
echo "   1. Les membres peuvent finaliser leur profil via /team/profile"
echo "   2. Consulter l'organigramme via /team/organization"
echo "   3. Gérer les recrutements via /team/recruitment"
echo "" 