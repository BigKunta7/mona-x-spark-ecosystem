// Types pour la vision SPARK - Laboratoire Créatif Itinérant

// =====================================================
// VISION ET PHILOSOPHIE SPARK
// =====================================================

export interface SparkVision {
  tagline: string;
  philosophy: string;
  mission: string;
  values: SparkValue[];
}

export interface SparkValue {
  name: string;
  description: string;
  importance: 'core' | 'secondary';
}

export const SPARK_VISION: SparkVision = {
  tagline: "Nous ne créons pas des œuvres. Nous allumons des étincelles.",
  philosophy: "Le Spark's Lab est un laboratoire créatif nomade où chaque mois, une nouvelle villa devient le théâtre d'une alchimie artistique unique.",
  mission: "Faire naître des œuvres inattendues par la collaboration spontanée de créateurs pluridisciplinaires.",
  values: [
    {
      name: "Exigence",
      description: "Niveau artistique et technique élevé, sélection rigoureuse des participants",
      importance: "core"
    },
    {
      name: "Intensité",
      description: "Création spontanée et fertile dans un environnement stimulant",
      importance: "core"
    },
    {
      name: "Connexion",
      description: "Synergies authentiques entre créateurs de différents horizons",
      importance: "core"
    },
    {
      name: "Impact",
      description: "Résultats concrets et visibles à chaque édition",
      importance: "core"
    },
    {
      name: "Authenticité",
      description: "Reflet du réel, ancrage dans le terrain et l'humain",
      importance: "secondary"
    }
  ]
};

// =====================================================
// STRUCTURE OPÉRATIONNELLE
// =====================================================

export interface SparkEdition {
  id: string;
  number: string; // "001", "002", etc.
  name: string; // "Villa Méditerranée", "Villa Parisienne"
  theme?: string;
  dates: {
    start: Date;
    end: Date;
  };
  location: SparkLocation;
  participants: SparkParticipant[];
  sponsors: SparkSponsor[];
  budget: SparkBudget;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  content: SparkContent[];
}

export interface SparkLocation {
  id: string;
  name: string;
  address: string;
  region: string;
  capacity: number;
  features: string[]; // "studio", "terrasse", "piscine"
  technicalSpecs: {
    internet: string;
    acoustics: string;
    power: string;
  };
  photos: string[];
  cost: number;
}

export interface SparkParticipant {
  id: string;
  artistId: string;
  role: SparkRole;
  specialty: string[];
  experience: 'emerging' | 'established' | 'expert';
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    spotify?: string;
  };
  status: 'invited' | 'confirmed' | 'active' | 'completed';
  contribution: string; // Description de sa contribution
  compensation: {
    type: 'free' | 'paid' | 'revenue_share';
    amount?: number;
  };
}

export type SparkRole = 
  | 'musician'
  | 'beatmaker'
  | 'sound_engineer'
  | 'dancer'
  | 'performer'
  | 'painter'
  | 'visual_artist'
  | 'graphic_designer'
  | 'videographer'
  | 'stylist'
  | 'content_creator';

export interface SparkSponsor {
  id: string;
  name: string;
  tier: 'RAW' | 'CORE' | 'LEGACY';
  investment: number;
  benefits: string[];
  logo: string;
  contract: {
    startDate: Date;
    endDate: Date;
    deliverables: string[];
  };
}

export interface SparkBudget {
  total: number;
  breakdown: {
    location: number;
    catering: number;
    transport: number;
    technical: number;
    marketing: number;
    personnel: number;
    miscellaneous: number;
  };
  revenue: {
    sponsors: number;
    tickets: number;
    streaming: number;
    merchandising: number;
    other: number;
  };
  margin: number;
}

// =====================================================
// CONTENUS ET CRÉATIONS
// =====================================================

export interface SparkContent {
  id: string;
  type: 'music' | 'video' | 'visual' | 'performance' | 'documentary';
  title: string;
  description: string;
  creators: string[]; // IDs des participants
  duration: number; // en secondes
  platform: string[]; // "spotify", "youtube", "instagram"
  url?: string;
  metrics: {
    views: number;
    likes: number;
    shares: number;
    revenue: number;
  };
  rights: {
    ownership: 'spark' | 'shared' | 'artist';
    exploitation: string[];
    revenue_split: number; // % pour SPARK
  };
}

export interface SparkLiveStream {
  id: string;
  platform: 'twitch' | 'youtube' | 'instagram';
  title: string;
  duration: number;
  viewers: number;
  revenue: number;
  highlights: string[];
}

// =====================================================
// PROGRAMME TYPE
// =====================================================

export interface SparkSchedule {
  editionId: string;
  days: SparkDay[];
}

export interface SparkDay {
  day: number;
  date: Date;
  theme: string;
  activities: SparkActivity[];
  liveStreams: SparkLiveStream[];
  deliverables: string[];
}

export interface SparkActivity {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: 'creation' | 'workshop' | 'masterclass' | 'performance' | 'networking';
  participants: string[];
  location: string;
  isLive: boolean;
}

// =====================================================
// MODÈLE ÉCONOMIQUE
// =====================================================

export interface SparkRevenueModel {
  sponsors: {
    RAW: { min: number; max: number; benefits: string[] };
    CORE: { min: number; max: number; benefits: string[] };
    LEGACY: { min: number; max: number; benefits: string[] };
  };
  tickets: {
    aftershow: number;
    openDay: number;
    showcase: number;
  };
  streaming: {
    twitchSubscription: number;
    donations: number;
    bits: number;
  };
  merchandising: {
    tshirt: number;
    poster: number;
    toteBag: number;
  };
  rights: {
    musicLicensing: number;
    syncLicensing: number;
    publishing: number;
  };
}

export interface SparkFinancialProjection {
  edition: number;
  revenue: number;
  costs: number;
  margin: number;
  marginPercentage: number;
  roi: number;
}

// =====================================================
// ASPECTS JURIDIQUES
// =====================================================

export interface SparkContract {
  id: string;
  type: 'artist' | 'sponsor' | 'participant' | 'location';
  parties: {
    spark: string;
    counterparty: string;
  };
  terms: {
    startDate: Date;
    endDate: Date;
    obligations: string[];
    rights: string[];
    compensation: {
      type: 'fixed' | 'variable' | 'revenue_share';
      amount: number;
      conditions?: string[];
    };
  };
  intellectualProperty: {
    ownership: string;
    exploitation: string[];
    revenue_split: number;
    duration: string;
  };
  termination: {
    conditions: string[];
    penalties: string[];
  };
}

// =====================================================
// MARKETING ET COMMUNICATION
// =====================================================

export interface SparkBranding {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    primary: string;
    secondary: string;
  };
  logo: {
    main: string;
    variations: string[];
  };
  messaging: {
    taglines: string[];
    keyMessages: string[];
    tone: string;
  };
}

export interface SparkMarketingStrategy {
  platforms: {
    instagram: SparkPlatformStrategy;
    youtube: SparkPlatformStrategy;
    tiktok: SparkPlatformStrategy;
    twitch: SparkPlatformStrategy;
  };
  content: {
    duringEdition: SparkContentStrategy;
    betweenEditions: SparkContentStrategy;
    evergreen: SparkContentStrategy;
  };
  press: {
    targets: string[];
    kit: string[];
    schedule: SparkPressSchedule[];
  };
}

export interface SparkPlatformStrategy {
  audience: string;
  content: string[];
  frequency: string;
  goals: string[];
}

export interface SparkContentStrategy {
  types: string[];
  frequency: string;
  objectives: string[];
}

export interface SparkPressSchedule {
  timing: string;
  actions: string[];
  deliverables: string[];
}

// =====================================================
// RISQUES ET MITIGATION
// =====================================================

export interface SparkRisk {
  id: string;
  category: 'operational' | 'financial' | 'legal' | 'reputational';
  name: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string[];
  contingency: string[];
}

export interface SparkCrisisPlan {
  scenario: string;
  triggers: string[];
  immediateActions: string[];
  mediumTermActions: string[];
  communication: string[];
  recovery: string[];
}

// =====================================================
// MÉTRIQUES ET KPIs
// =====================================================

export interface SparkMetrics {
  edition: number;
  participants: {
    total: number;
    confirmed: number;
    active: number;
    satisfaction: number;
  };
  content: {
    created: number;
    published: number;
    views: number;
    engagement: number;
  };
  revenue: {
    total: number;
    sponsors: number;
    tickets: number;
    streaming: number;
    merchandising: number;
  };
  audience: {
    instagram: number;
    youtube: number;
    tiktok: number;
    twitch: number;
  };
  sponsors: {
    total: number;
    averageInvestment: number;
    retention: number;
  };
}

// =====================================================
// ROADMAP ET DÉVELOPPEMENT
// =====================================================

export interface SparkPhase {
  id: string;
  name: string;
  duration: string;
  objectives: string[];
  metrics: string[];
  budget: number;
  team: string[];
}

export interface SparkExpansion {
  region: string;
  timeline: string;
  investment: number;
  expectedRevenue: number;
  risks: string[];
  opportunities: string[];
}

// =====================================================
// CONSTANTES ET CONFIGURATIONS
// =====================================================

export const SPARK_CONFIG = {
  editionDuration: 7, // jours
  frequency: 'monthly',
  participantsPerEdition: { min: 10, max: 15 },
  villaRequirements: {
    minCapacity: 10,
    internetSpeed: '100Mbps+',
    acoustics: 'acceptable+',
    location: 'accessible'
  },
  budgetRange: { min: 13000, max: 20000 },
  targetMargin: 0.175, // 17.5%
  scalingTargets: {
    year1: { editions: 6, revenue: 120000 },
    year2: { editions: 12, revenue: 300000 },
    year3: { editions: 18, revenue: 600000 }
  }
};

export const SPARK_ROLES = {
  director: 'Directeur artistique et curateur',
  soundEngineer: 'Réalisateur sonore',
  producer: 'Producteur exécutif',
  facilitator: 'Créateur de synergies',
  director: 'Metteur en scène',
  coach: 'Coach créatif',
  architect: 'Architecte d\'expérience'
}; 