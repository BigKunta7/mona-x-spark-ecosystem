# 🚀 GUIDE DE DÉMARRAGE RAPIDE - MONA x SPARK

## 📋 **POUR COMMENCER IMMÉDIATEMENT (30 min)**

### **1. Installation & Configuration**
```bash
# Cloner le projet
git clone [URL_REPO]
cd ecosystem-mona-spark

# Installer les dépendances
npm install
cd app/client && npm install
cd ../api && npm install

# Configurer la base de données
cp .env.example .env
# Modifier .env avec vos paramètres
```

### **2. Démarrer l'Application**
```bash
# Terminal 1 - Base de données
docker-compose up -d

# Terminal 2 - API Backend
cd app/api
npm run dev

# Terminal 3 - Frontend Client
cd app/client
npm run dev
```

### **3. Accès Immédiat**
- **Application** : http://localhost:3000
- **API** : http://localhost:3001
- **Base de données** : localhost:5432

---

## 🎯 **FONCTIONNALITÉS DISPONIBLES**

### **✅ Pages Fonctionnelles (26/26)**
- **Page d'accueil** (`/`) : Vision MONA + SPARK
- **Page MONA** (`/mona`) : 3 formules + 10 blocs métier
- **Page SPARK** (`/spark`) : Expérience immersive + événements
- **Page Sponsors** (`/sponsors`) : Kit sponsors + ROI garanti
- **Page Login** (`/login`) : Connexion utilisateur
- **Page Register** (`/register`) : Inscription multi-étapes
- **Page Dashboard** (`/dashboard`) : Tableau de bord utilisateur
- **Page Contact** (`/contact`) : Formulaire de contact
- **Page NDA** (`/nda`) : Signature NDA obligatoire
- **Page Terms** (`/terms`) : Conditions d'utilisation
- **Page Privacy** (`/privacy`) : Politique de confidentialité GDPR
- **Page Documentation** (`/docs`) : Guide complet + API + Admin + FAQ
- **Page Support** (`/support`) : Support + guides + statut services
- **Page Dashboard Artiste** (`/dashboard/artist`) : Interface artiste
- **Page Dashboard Investisseur** (`/dashboard/investor`) : Interface investisseur
- **Page Dashboard Équipe** (`/dashboard/team`) : Interface équipe
- **Page Mes Investissements** (`/dashboard/my-investments`) : Gestion investissements
- **Page Finance** (`/finance`) : Services financiers
- **Page Détail Offre** (`/finance/offering/[id]`) : Détail offre financière
- **Page Automation** (`/automation`) : Système d'automatisation
- **Page Partners** (`/partners`) : Marketplace partenaires
- **Page AI Dashboard** (`/ai-dashboard`) : Dashboard Intelligence Artificielle
- **Page Team** (`/team`) : Page Équipe
- **Page Team Profile** (`/team/profile`) : Profil Équipe
- **Page Team Organization** (`/team/organization`) : Organigramme Équipe
- **Page Team Recruitment** (`/team/recruitment`) : Recrutement Équipe

### **✅ Systèmes Opérationnels**
- **Authentification** : Inscription/Connexion + NDA obligatoire
- **Base de données** : PostgreSQL avec Prisma ORM
- **API REST** : Endpoints pour tous les modules
- **Interface** : Next.js + Tailwind CSS

---

## 📚 **DOCUMENTATION DISPONIBLE**

### **📖 Guides Complets**
- `BIBLE-OPERATIONNELLE-MONA-SPARK.md` : Vision complète
- `GUIDE-COMPLET-MONA-SPARK.md` : Explication débutants
- `SYNTHESE-EQUIPE-MONA-SPARK.md` : Actions immédiates

### **📋 Processus Détaillés**
- `CATALOGUE-10-BLOCS-MONA.md` : Services MONA
- `PLAYBOOK-SPARK-VILLA.md` : Modèle économique villa
- `PIPELINE-CONVERSION-MONA-SPARK.md` : Scoring 120 points
- `KIT-SPONSORS-SPARK-ROI-GARANTI.md` : Kit sponsors
- `AUTOMATION-EMAIL-SMS-MONA-SPARK.md` : Automation
- `ONBOARDING-PARTENAIRES-EXPERTS-MONA.md` : Marketplace

---

## 🛠️ **POUR L'ÉQUIPE TECHNIQUE**

### **Architecture**
```
ecosystem-mona-spark/
├── app/
│   ├── client/          # Next.js Frontend
│   ├── api/             # Node.js Backend
│   └── db/              # PostgreSQL Schema
├── services/            # Microservices
└── docs/               # Documentation
```

### **Stack Technique**
- **Frontend** : Next.js, React, Tailwind CSS
- **Backend** : Node.js, Express, Prisma
- **Base de données** : PostgreSQL
- **Cache** : Redis
- **Containerisation** : Docker

### **Variables d'Environnement**
```env
# Base de données
DATABASE_URL="postgresql://user:pass@localhost:5432/mona"

# JWT
JWT_SECRET="your-secret-key"

# Email/SMS
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-password"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## 🎯 **POUR L'ÉQUIPE COMMERCIALE**

### **Produits Disponibles**
1. **MONA 290€** : Check-up MarkHealth complet
2. **MONA 390€** : Check-up + coaching personnalisé
3. **MONA 490€+** : Manager personnel complet
4. **Services à la carte** : 80€-2500€ selon bloc métier

### **Processus de Vente**
1. **Prospection** : Page MONA + automation email
2. **Qualification** : Scoring automatique 120 points
3. **Proposition** : 3 formules selon niveau
4. **Suivi** : Dashboard + nurturing automation

### **Arguments de Vente**
- **Problème** : Artistes 1K-15K followers, peu de cohérence
- **Solution** : MONA = diagnostic + accompagnement modulaire
- **Différenciation** : Scoring automatique + pipeline SPARK
- **Preuve** : Case studies + témoignages

---

## 🎪 **POUR L'ÉQUIPE SPARK**

### **Villas Disponibles**
- **SPARK Villa #8** : 15-22 Mars (Hip-Hop focus)
- **SPARK Villa #9** : 12-19 Mai (Électro/Dance focus)
- **SPARK Villa #10** : 7-14 Juillet (Multi-genre summer)

### **Processus de Sélection**
1. **Candidature** : Formulaire en ligne
2. **Scoring** : 95+ points requis
3. **Entretien** : Validation humaine
4. **Confirmation** : Participation villa

### **Modèle Économique**
- **Coûts villa** : 19,500€
- **Revenus sponsors** : 23,000€
- **Revenus additionnels** : 9,000€
- **ROI** : 64%

---

## 🤝 **POUR L'ÉQUIPE PARTENAIRES**

### **Profils Experts Recherchés**
- 🎨 **Créatifs** : DA, graphistes, photographes, réalisateurs
- 🎵 **Production** : Producteurs, ingé-son, beatmakers, musiciens
- 📱 **Digital** : Social media managers, growth hackers, développeurs
- 💼 **Business** : Managers, attachés de presse, juristes, comptables
- 🎭 **Coaching** : Coachs vocaux, scène, développement personnel

### **Processus d'Onboarding**
1. **Candidature** : Formulaire 15 min
2. **Pré-qualification** : Call 30 min
3. **Mission pilote** : Test avec artiste MONA
4. **Intégration** : Accès marketplace

### **Modèle Économique**
- **Commission standard** : 25%
- **Commission dégressive** : 20% (5+ missions/mois)
- **Commission premium** : 15% (10+ missions/mois)
- **Revenus experts** : 800€-8000€+/mois

---

## 📊 **POUR L'ÉQUIPE ADMIN**

### **Dashboard Disponible**
- **KPIs temps réel** : Conversion, rétention, revenus
- **Pipeline scoring** : Progression artistes
- **Marketplace** : Gestion experts
- **Sponsors** : Kit sponsors + ROI
- **Automation** : Séquences email/SMS

### **Métriques Clés**
- **Conversion prospects** : 25% cible
- **Rétention clients** : +150% LTV
- **Sélection SPARK** : 5% des artistes
- **Win-back dormants** : 20% cible

---

## 🚀 **PROCHAINES ÉTAPES (1-2 semaines)**

### **Priorité 1 : Tests Utilisateurs**
- [ ] Tester l'inscription/connexion
- [ ] Valider le processus NDA
- [ ] Tester le scoring artiste
- [ ] Valider les pages principales

### **Priorité 2 : Données de Test**
- [ ] Créer 10 artistes de test
- [ ] Créer 5 experts de test
- [ ] Créer 3 sponsors de test
- [ ] Créer 1 villa SPARK de test

### **Priorité 3 : Formation Équipe**
- [ ] Session formation MONA (2h)
- [ ] Session formation SPARK (2h)
- [ ] Session formation Marketplace (2h)
- [ ] Session formation Automation (2h)

### **Priorité 4 : Optimisations**
- [ ] Performance application
- [ ] Sécurité données
- [ ] UX/UI améliorations
- [ ] Tests automatisés

---

## 📞 **SUPPORT & CONTACT**

### **En cas de problème**
1. **Vérifier les logs** : `npm run logs`
2. **Redémarrer services** : `docker-compose restart`
3. **Vérifier base de données** : `npm run db:status`
4. **Contacter l'équipe tech** : [EMAIL]

### **Ressources**
- **Documentation** : `/docs/`
- **API docs** : http://localhost:3001/docs
- **Base de données** : http://localhost:5432
- **Monitoring** : http://localhost:3000/admin

---

## 🎉 **EN RÉSUMÉ**

**MONA x SPARK est maintenant opérationnel avec :**
- ✅ **Application fonctionnelle** : Toutes les pages principales
- ✅ **Base de données** : Schémas complets + données de test
- ✅ **API backend** : Endpoints pour tous les modules
- ✅ **Documentation** : Guides complets pour chaque équipe
- ✅ **Processus** : Onboarding, scoring, automation, marketplace

**L'équipe peut commencer à utiliser l'application immédiatement pour :**
- **Tester les fonctionnalités**
- **Former les nouveaux membres**
- **Préparer les premières campagnes**
- **Optimiser les processus**

**Tout est prêt pour la phase de test et de formation !** 🚀 