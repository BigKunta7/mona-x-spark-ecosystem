# 🚀 Configuration Équipe MONA x SPARK

Ce document explique comment configurer et utiliser le système de gestion d'équipe intégré à l'écosystème MONA x SPARK.

## 📋 Vue d'ensemble

Le système d'équipe MONA x SPARK comprend :

- **Base de données** : Tables pour les membres, squads et besoins de recrutement
- **Interface utilisateur** : Pages pour gérer les profils, organigramme et recrutement
- **Organisation modulaire** : Structure par squads avec rôles multi-casquettes

## 🏗️ Structure de l'équipe

### **CORE TEAM – MULTI-CASQUETTES**

| Membre | Rôle Principal | Département | Squads |
|--------|----------------|-------------|---------|
| **Kake** | CEO & Lead Stratégie | Core Team | Lancement Artiste, Campagne Sponsors |
| **Alexandre** | Head Artists & Growth | Core Team | Lancement Artiste (Lead) |
| **Valentine** | Creative Director & Brand | Core Team | Lancement Artiste |
| **Valentin** | BizDev / BDR Senior | Core Team | Campagne Sponsors (Lead) |
| **Mohand** | Partenariats & Market Intelligence | Core Team | Campagne Sponsors |

### **CRÉATION & PRODUCTION**

| Membre | Rôle Principal | Département | Squads |
|--------|----------------|-------------|---------|
| **Mathis** | Head Production Audiovisuelle | Création & Production | Lancement Artiste |
| **Dylan** | Motion & Visual Designer | Création & Production | Campagne Sponsors |
| **Gilda** | Content & Community | Création & Production | Lancement Artiste |

### **COMMUNICATION & INFLUENCE**

| Membre | Rôle Principal | Département | Squads |
|--------|----------------|-------------|---------|
| **Sandi** | Presse & Influence | Communication & Influence | Campagne Sponsors |

### **OPS, ADMIN & SUPPORT**

| Membre | Rôle Principal | Département | Squads |
|--------|----------------|-------------|---------|
| **Khaïdja** | Ops Manager | Ops, Admin & Support | Événement SPARK (Lead) |
| **O'Lwen** | Admin, Juridique & Finances | Ops, Admin & Support | Campagne Sponsors |

## 🎯 Squads Modulaires

### **Squad Lancement Artiste**
- **Lead** : Alexandre
- **Membres** : Valentine, Mathis, Gilda
- **Objectif** : Développement et lancement des artistes

### **Squad Campagne Sponsors**
- **Lead** : Valentin
- **Membres** : Mohand, Dylan, Sandi, O'Lwen
- **Objectif** : Campagnes de sponsoring et partenariats

### **Squad Événement SPARK**
- **Lead** : Khaïdja
- **Membres** : Tous selon spécialité
- **Objectif** : Organisation des événements SPARK

## 📊 Besoins de Recrutement

### **PRIORITÉ (Immédiat)**
1. **SDR sponsor/artistes dédié** - €35K-45K
2. **Social Media Manager full-time** - €30K-40K

### **PHASE 2**
3. **Ops Coordinator junior** - €25K-35K

### **PHASE 3**
4. **Product Manager (plateforme / app)** - €50K-70K

### **À externaliser**
5. **Coach scénique/artistique** - €100-200/h

## 🚀 Installation

### Prérequis
- PostgreSQL installé et en cours d'exécution
- Variables d'environnement configurées (DB_HOST, DB_PORT, DB_NAME, DB_USER)

### Installation rapide

```bash
# Naviguer vers le dossier de la base de données
cd ecosystem-mona-spark/app/db

# Exécuter le script d'installation
./setup-team-database.sh
```

### Installation manuelle

```bash
# 1. Créer les tables
psql -h localhost -U postgres -d mona_spark -f migrations/001_create_team_members.sql
psql -h localhost -U postgres -d mona_spark -f migrations/002_create_squads.sql
psql -h localhost -U postgres -d mona_spark -f migrations/003_create_recruitment_needs.sql

# 2. Insérer les données
psql -h localhost -U postgres -d mona_spark -f seeds/001_team_members.sql
psql -h localhost -U postgres -d mona_spark -f seeds/002_squads.sql
psql -h localhost -U postgres -d mona_spark -f seeds/003_recruitment_needs.sql
```

## 🌐 Interface Utilisateur

### Pages disponibles

1. **Profil Équipe** (`/team/profile`)
   - Finalisation des profils personnels
   - Gestion des compétences et spécialités
   - Ajout de liens professionnels

2. **Organigramme** (`/team/organization`)
   - Vue d'ensemble de l'équipe
   - Filtrage par département
   - Détails des squads et rôles

3. **Recrutement** (`/team/recruitment`)
   - Gestion des besoins de recrutement
   - Suivi des priorités
   - Actions de recrutement

## 📝 Utilisation

### Pour les membres de l'équipe

1. **Finaliser son profil**
   - Accéder à `/team/profile`
   - Compléter les informations personnelles
   - Ajouter compétences et spécialités
   - Sauvegarder les modifications

2. **Consulter l'organigramme**
   - Accéder à `/team/organization`
   - Voir sa position dans l'équipe
   - Comprendre les squads et rôles

### Pour les managers

1. **Gérer les recrutements**
   - Accéder à `/team/recruitment`
   - Suivre les priorités
   - Ajouter de nouveaux besoins
   - Marquer les postes comme pourvus

2. **Suivre l'organisation**
   - Consulter l'organigramme
   - Vérifier les disponibilités
   - Gérer les squads

## 🔧 Configuration

### Variables d'environnement

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mona_spark
DB_USER=postgres
```

### Structure de la base de données

#### Table `team_members`
- Informations personnelles
- Rôles et départements
- Compétences et spécialités
- Assignations aux squads

#### Table `squads`
- Définition des équipes modulaires
- Membres et leads
- Statuts et descriptions

#### Table `recruitment_needs`
- Besoins de recrutement
- Priorités et budgets
- Couverture temporaire

## 🎯 Avantages du système

### **Flexibilité**
- Structure modulaire par squads
- Rôles multi-casquettes
- Adaptation rapide aux besoins

### **Transparence**
- Organigramme clair
- Responsabilités définies
- Suivi des disponibilités

### **Efficacité**
- Gestion centralisée des recrutements
- Suivi des priorités
- Actions coordonnées

## 🔄 Maintenance

### Mise à jour des profils
- Les membres peuvent modifier leurs profils
- Sauvegarde automatique des changements
- Historique des modifications

### Ajout de nouveaux membres
1. Insérer dans la table `team_members`
2. Assigner aux squads appropriés
3. Définir les rôles et responsabilités

### Gestion des squads
- Création de nouveaux squads
- Modification des assignations
- Suivi des performances

## 📞 Support

Pour toute question ou problème :
- Consulter la documentation technique
- Contacter l'équipe de développement
- Utiliser les outils de diagnostic intégrés

---

**MONA x SPARK** - Transforme les créateurs en entrepreneurs 🚀 