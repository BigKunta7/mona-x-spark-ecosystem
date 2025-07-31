# 🚀 MONA x SPARK - Quick Start Guide

## Votre Écosystème Straight Up

### 🎯 Objectif
Maximiser l'impact et la monétisation collective de votre équipe MONA x SPARK.

---

## ⚡ Démarrage Rapide

### 1. Prérequis
```bash
# Vérifiez que vous avez :
node --version    # >= 18.0.0
docker --version  # >= 20.0.0
npm --version     # >= 9.0.0
```

### 2. Installation
```bash
# Clonez le projet
git clone <votre-repo>
cd ecosystem-mona-spark

# Démarrage automatique
./start.sh dev
```

### 3. Accès aux Applications
- **MONA Frontend** : http://localhost:3000
- **SPARK Frontend** : http://localhost:3003
- **MONA API** : http://localhost:3001
- **SPARK API** : http://localhost:3002
- **Grafana** : http://localhost:3005

---

## 🏗️ Architecture

### MONA Engine (Acquisition & Qualification)
```
mona-engine/
├── api/              # API Node.js + Express
├── frontend/         # Next.js + React
├── prospection/      # Outils prospection
├── checkup/          # Diagnostic digital
├── prescription/     # Ordonnance IA
└── execution/        # Exécution campagnes
```

### SPARK Hub (Création & Viralisation)
```
spark-hub/
├── api/              # API Node.js + Express
├── frontend/         # Next.js + React
├── villa-creative/   # Gestion séjours
├── live-streaming/   # Intégration Twitch
├── content-factory/  # Production contenus
└── showcase/         # Événements finaux
```

### Business Intelligence (Data & Insights)
```
business-intelligence/
├── analytics/        # Métriques temps réel
├── predictions/      # IA prédictive
├── reporting/        # Rapports automatisés
└── optimization/     # Optimisation continue
```

---

## 🎨 Design System

### Couleurs Brand
- **Primary** : `#6366f1` (Indigo)
- **Secondary** : `#f59e0b` (Amber)
- **Success** : `#10b981` (Emerald)
- **Warning** : `#f97316` (Orange)
- **Error** : `#ef4444` (Red)

### Principes Design
- **Less is More** : Interface épurée
- **Mobile First** : Responsive design
- **Performance** : Core Web Vitals 90+

---

## 📊 KPIs & Métriques

### Business
- **CAC** : < 18€ par artiste
- **Conversion** : > 25% landing → inscription
- **LTV** : > 5x CAC
- **NPS** : > 70

### Technique
- **Latence** : < 100ms
- **Disponibilité** : 99.99%
- **Server Usage** : < 80%

---

## 🔧 Commandes Utiles

### Développement
```bash
# Démarrage développement
./start.sh dev

# Build applications
npm run build

# Tests
npm run test

# Linting
npm run lint
```

### Production
```bash
# Démarrage production
./start.sh prod

# Déploiement staging
npm run deploy:staging

# Déploiement production
npm run deploy:production
```

### Monitoring
```bash
# Vérification statut
docker-compose ps

# Logs services
docker-compose logs -f

# Métriques
curl http://localhost:3001/metrics
```

---

## 🚀 Workflows

### MONA Pipeline
1. **Prospection** → Ciblage artistes
2. **Check-up** → Diagnostic digital
3. **Prescription** → Ordonnance IA
4. **Exécution** → Campagnes rapides
5. **Fidélisation** → Qualification SPARK

### SPARK Pipeline
1. **Qualification** → Artistes MONA
2. **Villa Prep** → Préparation séjour
3. **Live Stream** → Twitch/YouTube
4. **Content Prod** → Contenus viraux
5. **Showcase** → Événements finaux
6. **Monétisation** → Sponsors & revenus

---

## 🎯 Règles Équipe

### Code
- **TypeScript** obligatoire
- **Tests** : 80% coverage minimum
- **Code Review** : Pull Request obligatoire
- **Documentation** : README + JSDoc

### Performance
- **80% max** ressources serveur
- **Alertes** automatiques seuils
- **Monitoring** temps réel

### Communication
- **Daily Standup** : 15min max
- **Weekly Review** : Métriques & objectifs
- **Monthly Retro** : Amélioration continue

---

## 🔍 Debugging

### Logs
```bash
# Logs API MONA
docker-compose logs mona-api

# Logs Frontend MONA
docker-compose logs mona-frontend

# Logs base de données
docker-compose logs postgres
```

### Base de données
```bash
# Accès PostgreSQL
docker-compose exec postgres psql -U mona_user -d mona_spark

# Accès Redis
docker-compose exec redis redis-cli
```

### Monitoring
```bash
# Grafana
open http://localhost:3005
# admin / admin

# Prometheus
open http://localhost:9090
```

---

## 🆘 Support

### Problèmes Courants
1. **Ports occupés** : `lsof -ti:3000 | xargs kill -9`
2. **Docker down** : `docker-compose down && docker-compose up -d`
3. **Cache npm** : `npm cache clean --force`
4. **Reset complet** : `./start.sh` puis option 10

### Contacts
- **Tech Lead** : [Votre nom]
- **Product Owner** : [Votre nom]
- **DevOps** : [Votre nom]

---

## 📈 Roadmap

### Phase 1 (S1-S2) : MONA Engine ✅
- [x] Setup architecture
- [x] Module prospection
- [x] Check-up digital
- [x] Dashboard monitoring

### Phase 2 (S3) : SPARK Hub 🚧
- [ ] Gestion villa créative
- [ ] Intégration streaming
- [ ] Factory contenus viraux
- [ ] Système monétisation

### Phase 3 (S4) : Business Intelligence 📋
- [ ] Analytics temps réel
- [ ] IA prédictive
- [ ] Optimisation automatique
- [ ] Reporting automatisé

---

*Votre écosystème MONA x SPARK est prêt à maximiser l'impact et la monétisation collective ! 🚀* 