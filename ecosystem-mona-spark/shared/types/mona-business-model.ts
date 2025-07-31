// Types pour l'adaptation du modèle 7K à MONA x SPARK

// =====================================================
// SYSTÈME DE SCORING 7K ADAPTÉ
// =====================================================

export interface ScoringMetric {
  name: string;
  ranges: [number, number][];
  points: number[];
  weight: number;
}

export interface ArtistScoringSystem {
  quantitativeMetrics: {
    instagramFollowers: ScoringMetric;
    engagementRateIG: ScoringMetric;
    spotifyMonthlyStreams: ScoringMetric;
    tiktokFollowers: ScoringMetric;
    youtubeSubscribers: ScoringMetric;
    twitterFollowers: ScoringMetric;
    facebookFollowers: ScoringMetric;
    soundcloudFollowers: ScoringMetric;
    // NOUVELLES MÉTRIQUES POUR INVESTISSEURS
    monthlyFollowerGrowth: ScoringMetric;
    averageRevenuePerMonth: ScoringMetric;
    communityStrength: ScoringMetric;
    publicationConsistency: ScoringMetric;
  };
  artisticQuality: {
    originaliteSonore: { maxPoints: number; weight: number };
    qualiteProduction: { maxPoints: number; weight: number };
    coherenceUnivers: { maxPoints: number; weight: number };
    potentielCommercial: { maxPoints: number; weight: number };
    evolutionArtistique: { maxPoints: number; weight: number };
  };
  structurationMindset: {
    professionnalisme: { maxPoints: number; weight: number };
    visionCarriere: { maxPoints: number; weight: number };
    capaciteInvestissement: { maxPoints: number; weight: number };
    equipeConstituee: { maxPoints: number; weight: number };
    motivationAmbition: { maxPoints: number; weight: number };
  };
}

export interface ArtistScore {
  artistId: string;
  totalScore: number;
  quantitativeScore: number;
  artisticQualityScore: number;
  structurationScore: number;
  lastUpdated: Date;
  details: {
    [metric: string]: {
      value: number;
      points: number;
      maxPoints: number;
    };
  };
}

// NOUVELLE INTERFACE POUR LE SCORE INVESTISSEUR
export interface ArtistInvestorScore {
    artistId: string;
    totalInvestorScore: number; // Score global sur 100
    riskLevel: 'low' | 'medium' | 'high' | 'very-high';
    potentialROI: number; // en %
    scores: {
        growthPotential: number; // Potentiel de croissance
        revenueStability: number; // Stabilité des revenus
        communityValue: number; // Valeur de la communauté
        professionalism: number; // Professionnalisme et structuration
    };
    lastUpdated: Date;
}

// NOUVEAU SYSTÈME DE PONDÉRATION POUR LE SCORE INVESTISSEUR
export interface InvestorScoringSystem {
    weights: {
        growthPotential: number; // ex: 0.40
        revenueStability: number; // ex: 0.30
        communityValue: number; // ex: 0.15
        professionalism: number; // ex: 0.15
    }
}


// =====================================================
// FORMULES MONA ADAPTÉES 7K
// =====================================================

export interface MonaOffer {
  id: string;
  name: string;
  price: number;
  adBudget: number;
  netMargin: number;
  duration: number; // en semaines
  deliverables: string[];
  targetScore: number;
  maxCapacity: number;
}

export interface CoProductionOffer {
  id: string;
  name: string;
  investmentRange: [number, number];
  masterSplit: string; // "70/30"
  publishingSplit: string; // "60/40"
  duration: number; // en mois
  services: string[];
}

export interface SponsoringCommission {
  range: [number, number];
  rate: number; // 0.25 = 25%
  partnershipTypes: string[];
}

export const MONA_OFFERS: Record<string, MonaOffer> = {
  starter_mini: {
    id: 'starter_mini',
    name: 'MONA 290 - Mini',
    price: 290,
    adBudget: 150,
    netMargin: 110,
    duration: 4,
    deliverables: [
      'Audit digital rapide',
      'Campagne marketing ciblée',
      'Optimisation 2 réseaux sociaux',
      'Rapport de performance'
    ],
    targetScore: 30,
    maxCapacity: 20
  },
  starter_classic: {
    id: 'starter_classic',
    name: 'MONA 390 - Classic',
    price: 390,
    adBudget: 250,
    netMargin: 140,
    duration: 6,
    deliverables: [
      'Audit complet digital',
      'Plan éditorial personnalisé',
      'Social kit complet',
      'Optimisation 3 réseaux sociaux',
      'Suivi hebdomadaire',
      'Rapport détaillé'
    ],
    targetScore: 50,
    maxCapacity: 15
  },
  starter_premium: {
    id: 'starter_premium',
    name: 'MONA 490+ - Premium',
    price: 490,
    adBudget: 350,
    netMargin: 140,
    duration: 8,
    deliverables: [
      'Audit complet + prescription stratégique',
      'Plan éditorial + calendrier',
      'Social kit + templates personnalisés',
      'Optimisation 4 réseaux sociaux',
      'Suivi quotidien',
      'Coaching personnalisé',
      'Préparation SPARK'
    ],
    targetScore: 70,
    maxCapacity: 10
  }
};

export const CO_PRODUCTION_OFFERS: Record<string, CoProductionOffer> = {
  micro: {
    id: 'micro',
    name: 'Co-production Micro',
    investmentRange: [1000, 2000],
    masterSplit: '70/30',
    publishingSplit: '60/40',
    duration: 12,
    services: [
      'Production 1 titre',
      'Mix & mastering',
      'Distribution',
      'Promotion ciblée'
    ]
  },
  classic: {
    id: 'classic',
    name: 'Co-production Classic',
    investmentRange: [2000, 5000],
    masterSplit: '60/40',
    publishingSplit: '50/50',
    duration: 18,
    services: [
      'Production EP (3-5 titres)',
      'Mix & mastering',
      'Distribution',
      'Marketing complet',
      'Préparation live'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Co-production Premium',
    investmentRange: [5000, 10000],
    masterSplit: '50/50',
    publishingSplit: '50/50',
    duration: 24,
    services: [
      'Production album complet',
      'Mix & mastering',
      'Distribution internationale',
      'Marketing complet',
      'Booking live',
      'Licensing & sync'
    ]
  }
};

// =====================================================
// TEMPLATES DE COMMUNICATION 7K ADAPTÉS
// =====================================================

export interface ContactTemplate {
  id: string;
  type: 'hot' | 'warm' | 'cold';
  name: string;
  template: string;
  variables: string[];
  successRate: number;
}

export interface ContactStrategy {
  artistId: string;
  templateId: string;
  customizations: Record<string, string>;
  scheduledDate: Date;
  status: 'pending' | 'sent' | 'responded' | 'converted';
  response?: string;
  followUpDate?: Date;
}

// =====================================================
// BLOCS DE DÉVELOPPEMENT ARTISTE (10 BLOCS)
// =================================...
// ... (le reste du fichier reste inchangé)
