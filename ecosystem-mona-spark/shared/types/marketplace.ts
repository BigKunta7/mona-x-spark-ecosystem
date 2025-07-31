// Types pour la Marketplace MONA x SPARK - 10 Blocs de Développement

// =====================================================
// STRUCTURE DES BLOCS MARKETPLACE
// =====================================================

export interface MarketplaceBlock {
  id: number;
  name: string;
  icon: string;
  description: string;
  timeframe: string;
  subServices: SubService[];
  experts: Expert[];
  caseStudies: CaseStudy[];
  pricing?: {
    type: 'fixed' | 'variable' | 'custom';
    range?: [number, number];
    currency: string;
  };
  prerequisites?: string[];
  deliverables: string[];
  successMetrics: string[];
}

export interface SubService {
  name: string;
  description: string;
  duration: string;
  steps: string[];
  deliverables: string[];
  estimatedHours: number;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
  experience: number; // années
  rating: number; // 1-5
  availability: 'available' | 'busy' | 'unavailable';
  languages: string[];
  bio: string;
}

export interface CaseStudy {
  artist: string;
  description: string;
  results: string;
  duration: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
  metrics?: {
    improvement: number; // %
    timeframe: string;
  };
}

// =====================================================
// BRIEF ET DEMANDE
// =====================================================

export interface BriefData {
  blockId: number;
  artistId: string;
  objectives: string[];
  specificNeeds: string;
  timeline: {
    start?: string;
    urgency: 'urgent' | 'normal' | 'flexible';
    deadline?: string;
  };
  budget: {
    disclosed: boolean;
    range?: [number, number];
    currency: string;
  };
  references: Reference[];
  contactPreference: 'email' | 'phone' | 'video';
  additionalInfo?: string;
}

export interface Reference {
  id: string;
  name: string;
  type: 'artist' | 'track' | 'visual' | 'other';
  url?: string;
  description?: string;
}

export interface BriefSubmission {
  id: string;
  briefData: BriefData;
  status: 'submitted' | 'reviewed' | 'assigned' | 'contacted' | 'proposal_sent' | 'accepted' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  assignedExpert?: string;
  expertNotes?: string;
  proposal?: Proposal;
  notes: string[];
}

export interface Proposal {
  id: string;
  briefId: string;
  expertId: string;
  customServices: CustomService[];
  timeline: {
    start: Date;
    end: Date;
    milestones: Milestone[];
  };
  pricing: {
    total: number;
    breakdown: PricingBreakdown[];
    paymentSchedule: PaymentSchedule[];
  };
  terms: string[];
  validity: Date;
}

export interface CustomService {
  name: string;
  description: string;
  duration: string;
  deliverables: string[];
  price: number;
}

export interface Milestone {
  name: string;
  date: Date;
  deliverables: string[];
  status: 'pending' | 'in_progress' | 'completed';
}

export interface PricingBreakdown {
  service: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
}

export interface PaymentSchedule {
  percentage: number;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
}

// =====================================================
// GESTION DES EXPERTS
// =====================================================

export interface ExpertProfile extends Expert {
  contactInfo: {
    email: string;
    phone?: string;
    calendly?: string;
  };
  availability: {
    currentLoad: number; // 0-100%
    maxProjects: number;
    nextAvailable: Date;
  };
  skills: {
    primary: string[];
    secondary: string[];
    certifications: string[];
  };
  portfolio: {
    projects: number;
    successRate: number;
    averageRating: number;
  };
  pricing: {
    hourlyRate: number;
    projectRate: number;
    currency: string;
  };
}

export interface ExpertAssignment {
  briefId: string;
  expertId: string;
  assignedAt: Date;
  status: 'assigned' | 'contacted' | 'proposal_sent' | 'accepted' | 'rejected';
  notes: string[];
  communicationHistory: CommunicationEvent[];
}

export interface CommunicationEvent {
  id: string;
  type: 'email' | 'phone' | 'video' | 'message';
  timestamp: Date;
  direction: 'inbound' | 'outbound';
  content: string;
  attachments?: string[];
}

// =====================================================
// SUIVI ET MÉTRIQUES
// =====================================================

export interface ProjectTracking {
  id: string;
  briefId: string;
  expertId: string;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  progress: number; // 0-100
  milestones: Milestone[];
  deliverables: Deliverable[];
  communications: CommunicationEvent[];
  payments: PaymentSchedule[];
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  type: 'document' | 'audio' | 'video' | 'image' | 'other';
  status: 'pending' | 'in_progress' | 'review' | 'approved' | 'rejected';
  dueDate: Date;
  submittedAt?: Date;
  url?: string;
  feedback?: string;
}

export interface MarketplaceMetrics {
  totalBriefs: number;
  conversionRate: number; // briefs -> accepted projects
  averageResponseTime: number; // heures
  expertUtilization: number; // %
  revenue: {
    total: number;
    byBlock: Record<number, number>;
    byExpert: Record<string, number>;
  };
  satisfaction: {
    averageRating: number;
    totalReviews: number;
  };
}

// =====================================================
// CONFIGURATION DES BLOCS
// =====================================================

export const MARKETPLACE_BLOCKS: MarketplaceBlock[] = [
  {
    id: 1,
    name: "Signature & Onboarding",
    icon: "document-signature",
    description: "Processus complet d'intégration et mise en place des fondations légales et opérationnelles.",
    timeframe: "15 jours",
    subServices: [
      {
        name: "Due Diligence",
        description: "Audit juridique complet des droits existants et analyse de votre situation actuelle.",
        duration: "3 jours",
        steps: [
          "Audit juridique complet (droits existants)",
          "Vérification antécédents contractuels",
          "Analyse financière personnelle/professionnelle",
          "Évaluation équipe existante"
        ],
        deliverables: [
          "Rapport d'audit juridique",
          "Analyse de risques",
          "Recommandations stratégiques"
        ],
        estimatedHours: 24
      },
      {
        name: "Négociation contractuelle",
        description: "Élaboration de contrats sur mesure adaptés à votre situation et vos objectifs.",
        duration: "5 jours",
        steps: [
          "Draft contrat personnalisé",
          "Négociation termes spécifiques",
          "Validation juridique mutuelle",
          "Ajustements finaux"
        ],
        deliverables: [
          "Contrat personnalisé",
          "Annexes spécifiques",
          "Guide d'utilisation"
        ],
        estimatedHours: 40
      },
      {
        name: "Activation opérationnelle",
        description: "Mise en place des outils et processus pour démarrer efficacement.",
        duration: "7 jours",
        steps: [
          "Signature définitive (Docusign)",
          "Setup outils collaboratifs (Slack, Drive)",
          "Brief équipe MONA dédiée",
          "Lancement projet officiel"
        ],
        deliverables: [
          "Accès aux outils",
          "Équipe assignée",
          "Planning détaillé"
        ],
        estimatedHours: 16
      }
    ],
    experts: [
      {
        id: "expert-1",
        name: "Maître Sophie Laurent",
        role: "Juriste Musique & Entertainment",
        avatar: "/experts/sophie-l.jpg",
        specialties: ["Droit d'auteur", "Contrats musicaux", "Négociation"],
        experience: 12,
        rating: 4.9,
        availability: "available",
        languages: ["Français", "Anglais"],
        bio: "Spécialiste en droit de la musique avec 12 ans d'expérience"
      },
      {
        id: "expert-2",
        name: "Julien Mercier",
        role: "Coordinateur Onboarding",
        avatar: "/experts/julien-m.jpg",
        specialties: ["Gestion de projet", "Onboarding", "Coordination"],
        experience: 8,
        rating: 4.7,
        availability: "available",
        languages: ["Français", "Anglais"],
        bio: "Expert en coordination et mise en place de projets artistiques"
      }
    ],
    caseStudies: [
      {
        artist: "YZO",
        description: "Restructuration complète suite à un contrat problématique",
        results: "Libération des droits et nouveau départ en 21 jours",
        duration: "21 jours",
        beforeAfter: {
          before: "Contrat bloquant, droits verrouillés",
          after: "Liberté totale, nouveau contrat équitable"
        },
        metrics: {
          improvement: 100,
          timeframe: "21 jours"
        }
      }
    ],
    prerequisites: [
      "Documents contractuels existants",
      "Informations sur la situation actuelle"
    ],
    deliverables: [
      "Contrat personnalisé signé",
      "Accès aux outils collaboratifs",
      "Équipe dédiée assignée"
    ],
    successMetrics: [
      "Signature du contrat dans les délais",
      "Satisfaction client > 9/10",
      "Mise en place opérationnelle réussie"
    ]
  },
  {
    id: 2,
    name: "Direction Artistique & A&R",
    icon: "music-note",
    description: "Accompagnement créatif pour optimiser votre identité sonore et développer votre univers.",
    timeframe: "4-8 semaines",
    subServices: [
      {
        name: "Coaching Créatif",
        description: "Sessions personnalisées pour affiner votre identité artistique et sonore.",
        duration: "2 semaines",
        steps: [
          "Analyse univers artistique actuel",
          "Identification des forces distinctives",
          "Sessions de développement créatif",
          "Feedback constructif"
        ],
        deliverables: [
          "Analyse détaillée de l'univers artistique",
          "Plan de développement créatif",
          "Sessions de coaching enregistrées"
        ],
        estimatedHours: 20
      },
      {
        name: "Supervision Production",
        description: "Encadrement des processus créatifs et des sessions de production.",
        duration: "3-4 semaines",
        steps: [
          "Direction de sessions studio",
          "Sélection des collaborateurs",
          "Validation des masters",
          "Perfectionnement sonore"
        ],
        deliverables: [
          "Masters validés",
          "Rapport de production",
          "Recommandations techniques"
        ],
        estimatedHours: 40
      },
      {
        name: "Cohérence Globale",
        description: "Garantie d'une cohérence entre identité sonore et visuelle à travers tous les supports.",
        duration: "2 semaines",
        steps: [
          "Audit de cohérence 360°",
          "Alignement des éléments visuels et sonores",
          "Développement d'une identité distinctive",
          "Stratégie d'évolution artistique"
        ],
        deliverables: [
          "Guide d'identité artistique",
          "Stratégie d'évolution",
          "Kit de cohérence"
        ],
        estimatedHours: 25
      }
    ],
    experts: [
      {
        id: "expert-3",
        name: "Marco Silva",
        role: "Directeur Artistique",
        avatar: "/experts/marco-s.jpg",
        specialties: ["Direction artistique", "A&R", "Production"],
        experience: 15,
        rating: 4.8,
        availability: "available",
        languages: ["Français", "Anglais", "Portugais"],
        bio: "Directeur artistique reconnu avec 15 ans d'expérience"
      }
    ],
    caseStudies: [
      {
        artist: "Luna",
        description: "Refonte complète de l'identité artistique",
        results: "Nouvelle signature sonore distinctive",
        duration: "6 semaines",
        metrics: {
          improvement: 85,
          timeframe: "6 semaines"
        }
      }
    ],
    prerequisites: [
      "Matériel audio existant",
      "Vision artistique claire"
    ],
    deliverables: [
      "Identité artistique définie",
      "Masters produits",
      "Stratégie d'évolution"
    ],
    successMetrics: [
      "Identité artistique distinctive",
      "Qualité sonore professionnelle",
      "Cohérence visuelle et sonore"
    ]
  },
  {
    id: 3,
    name: "Production Musicale",
    icon: "studio",
    description: "Production professionnelle de vos projets musicaux avec équipements haut de gamme.",
    timeframe: "2-6 semaines",
    subServices: [
      {
        name: "Enregistrement Studio",
        description: "Sessions d'enregistrement professionnelles avec ingénieurs expérimentés.",
        duration: "1-3 semaines",
        steps: [
          "Préparation des sessions",
          "Enregistrement multipiste",
          "Direction artistique en temps réel",
          "Validation des prises"
        ],
        deliverables: [
          "Fichiers multipistes",
          "Notes de session",
          "Rapport technique"
        ],
        estimatedHours: 60
      },
      {
        name: "Mixage & Mastering",
        description: "Post-production professionnelle pour un rendu radio-ready.",
        duration: "1-2 semaines",
        steps: [
          "Mixage multipiste",
          "Égalisation et compression",
          "Mastering final",
          "Validation qualité"
        ],
        deliverables: [
          "Masters finaux",
          "Versions radio/edit",
          "Rapport de mastering"
        ],
        estimatedHours: 40
      }
    ],
    experts: [
      {
        id: "expert-4",
        name: "Alex Chen",
        role: "Ingénieur Son",
        avatar: "/experts/alex-c.jpg",
        specialties: ["Production", "Mixage", "Mastering"],
        experience: 10,
        rating: 4.9,
        availability: "available",
        languages: ["Français", "Anglais", "Mandarin"],
        bio: "Ingénieur son primé avec expertise en production moderne"
      }
    ],
    caseStudies: [
      {
        artist: "The Echo",
        description: "Production complète d'un EP 5 titres",
        results: "Qualité radio-ready, placement en playlist",
        duration: "4 semaines",
        metrics: {
          improvement: 90,
          timeframe: "4 semaines"
        }
      }
    ],
    prerequisites: [
      "Compositions finalisées",
      "Planning de sessions"
    ],
    deliverables: [
      "Masters professionnels",
      "Versions multiples",
      "Rapport technique complet"
    ],
    successMetrics: [
      "Qualité radio-ready",
      "Respect des délais",
      "Satisfaction artistique"
    ]
  },
  {
    id: 4,
    name: "Publishing & Édition",
    icon: "copyright",
    description: "Gestion complète de vos droits d'auteur et exploitation éditoriale.",
    timeframe: "3-4 semaines",
    subServices: [
      {
        name: "Déclaration SACEM",
        description: "Inscription et déclaration de vos œuvres auprès de la SACEM.",
        duration: "1 semaine",
        steps: [
          "Vérification éligibilité",
          "Préparation dossier",
          "Soumission SACEM",
          "Suivi validation"
        ],
        deliverables: [
          "Numéros d'œuvre SACEM",
          "Certificats de déclaration",
          "Guide d'exploitation"
        ],
        estimatedHours: 12
      },
      {
        name: "Gestion Éditoriale",
        description: "Optimisation de l'exploitation de vos droits d'auteur.",
        duration: "2-3 semaines",
        steps: [
          "Audit des droits existants",
          "Stratégie d'exploitation",
          "Négociation licences",
          "Suivi des revenus"
        ],
        deliverables: [
          "Stratégie éditoriale",
          "Contrats de licence",
          "Tableau de bord revenus"
        ],
        estimatedHours: 25
      }
    ],
    experts: [
      {
        id: "expert-5",
        name: "Marie Dubois",
        role: "Spécialiste Publishing",
        avatar: "/experts/marie-d.jpg",
        specialties: ["Publishing", "SACEM", "Licences"],
        experience: 8,
        rating: 4.6,
        availability: "available",
        languages: ["Français", "Anglais"],
        bio: "Experte en gestion des droits d'auteur et exploitation éditoriale"
      }
    ],
    caseStudies: [
      {
        artist: "Sound Collective",
        description: "Optimisation des revenus éditoriaux",
        results: "+150% de revenus SACEM en 6 mois",
        duration: "3 semaines",
        metrics: {
          improvement: 150,
          timeframe: "6 mois"
        }
      }
    ],
    prerequisites: [
      "Œuvres finalisées",
      "Documents d'identité"
    ],
    deliverables: [
      "Déclarations SACEM",
      "Stratégie d'exploitation",
      "Suivi des revenus"
    ],
    successMetrics: [
      "Déclarations validées",
      "Revenus optimisés",
      "Gestion automatisée"
    ]
  },
  {
    id: 5,
    name: "Marketing & Image",
    icon: "megaphone",
    description: "Stratégie marketing complète pour développer votre notoriété et votre audience.",
    timeframe: "6-12 semaines",
    subServices: [
      {
        name: "Stratégie Marketing",
        description: "Élaboration d'une stratégie marketing personnalisée et efficace.",
        duration: "2-3 semaines",
        steps: [
          "Analyse de marché",
          "Définition cible",
          "Positionnement",
          "Plan d'action"
        ],
        deliverables: [
          "Stratégie marketing",
          "Plan d'action détaillé",
          "KPI de suivi"
        ],
        estimatedHours: 30
      },
      {
        name: "Gestion Réseaux Sociaux",
        description: "Gestion professionnelle de vos réseaux sociaux et contenus.",
        duration: "8-12 semaines",
        steps: [
          "Audit des réseaux existants",
          "Création contenus",
          "Community management",
          "Analyse performances"
        ],
        deliverables: [
          "Calendrier éditorial",
          "Contenus créés",
          "Rapport de performance"
        ],
        estimatedHours: 80
      },
      {
        name: "Relations Presse",
        description: "Développement de votre présence médiatique et relations presse.",
        duration: "4-6 semaines",
        steps: [
          "Identification médias cibles",
          "Rédaction communiqués",
          "Pitch médias",
          "Suivi retombées"
        ],
        deliverables: [
          "Kit presse",
          "Communiqués",
          "Retombées médiatiques"
        ],
        estimatedHours: 35
      }
    ],
    experts: [
      {
        id: "expert-6",
        name: "Sarah Johnson",
        role: "Marketing Manager",
        avatar: "/experts/sarah-j.jpg",
        specialties: ["Marketing digital", "Social media", "PR"],
        experience: 12,
        rating: 4.7,
        availability: "available",
        languages: ["Français", "Anglais"],
        bio: "Experte en marketing digital et développement d'audience"
      }
    ],
    caseStudies: [
      {
        artist: "Digital Waves",
        description: "Campagne marketing complète",
        results: "+300% d'audience en 3 mois",
        duration: "12 semaines",
        metrics: {
          improvement: 300,
          timeframe: "3 mois"
        }
      }
    ],
    prerequisites: [
      "Identité artistique définie",
      "Contenus de base"
    ],
    deliverables: [
      "Stratégie marketing",
      "Contenus créés",
      "Retombées médiatiques"
    ],
    successMetrics: [
      "Croissance audience",
      "Engagement amélioré",
      "Presence médiatique"
    ]
  },
  {
    id: 6,
    name: "Distribution & Plateformes",
    icon: "globe",
    description: "Distribution mondiale de vos œuvres sur toutes les plateformes digitales.",
    timeframe: "2-4 semaines",
    subServices: [
      {
        name: "Setup Distribution",
        description: "Configuration de votre distribution sur toutes les plateformes.",
        duration: "1-2 semaines",
        steps: [
          "Choix distributeur",
          "Configuration comptes",
          "Upload métadonnées",
          "Validation distribution"
        ],
        deliverables: [
          "Comptes plateformes",
          "Métadonnées optimisées",
          "Guide d'utilisation"
        ],
        estimatedHours: 20
      },
      {
        name: "Optimisation Plateformes",
        description: "Optimisation de votre présence sur chaque plateforme.",
        duration: "2-3 semaines",
        steps: [
          "Audit présence actuelle",
          "Optimisation profils",
          "Stratégie playlist",
          "Suivi performances"
        ],
        deliverables: [
          "Profils optimisés",
          "Stratégie playlist",
          "Dashboard performances"
        ],
        estimatedHours: 30
      }
    ],
    experts: [
      {
        id: "expert-7",
        name: "Tom Wilson",
        role: "Distribution Specialist",
        avatar: "/experts/tom-w.jpg",
        specialties: ["Distribution", "Playlisting", "Analytics"],
        experience: 9,
        rating: 4.8,
        availability: "available",
        languages: ["Français", "Anglais"],
        bio: "Spécialiste en distribution digitale et optimisation plateformes"
      }
    ],
    caseStudies: [
      {
        artist: "Global Beats",
        description: "Distribution mondiale EP",
        results: "1M+ streams en 2 mois",
        duration: "4 semaines",
        metrics: {
          improvement: 500,
          timeframe: "2 mois"
        }
      }
    ],
    prerequisites: [
      "Masters finaux",
      "Métadonnées complètes"
    ],
    deliverables: [
      "Distribution mondiale",
      "Profils optimisés",
      "Suivi performances"
    ],
    successMetrics: [
      "Distribution réussie",
      "Croissance streams",
      "Placement playlists"
    ]
  },
  {
    id: 7,
    name: "Live & Booking",
    icon: "stage",
    description: "Développement de votre carrière live et gestion des bookings.",
    timeframe: "3-6 mois",
    subServices: [
      {
        name: "Stratégie Live",
        description: "Élaboration d'une stratégie de développement live.",
        duration: "2-3 semaines",
        steps: [
          "Analyse marché live",
          "Définition objectifs",
          "Plan de développement",
          "Budget prévisionnel"
        ],
        deliverables: [
          "Stratégie live",
          "Plan de développement",
          "Budget prévisionnel"
        ],
        estimatedHours: 25
      },
      {
        name: "Booking & Touring",
        description: "Gestion des bookings et organisation de tournées.",
        duration: "3-6 mois",
        steps: [
          "Prospection salles/festivals",
          "Négociation contrats",
          "Logistique tournée",
          "Suivi performances"
        ],
        deliverables: [
          "Contrats de booking",
          "Planning tournée",
          "Rapport de performance"
        ],
        estimatedHours: 60
      }
    ],
    experts: [
      {
        id: "expert-8",
        name: "Lisa Rodriguez",
        role: "Booking Manager",
        avatar: "/experts/lisa-r.jpg",
        specialties: ["Booking", "Touring", "Festivals"],
        experience: 11,
        rating: 4.7,
        availability: "available",
        languages: ["Français", "Anglais", "Espagnol"],
        bio: "Experte en booking et développement de carrière live"
      }
    ],
    caseStudies: [
      {
        artist: "Live Collective",
        description: "Développement carrière live",
        results: "50+ dates en 6 mois",
        duration: "6 mois",
        metrics: {
          improvement: 400,
          timeframe: "6 mois"
        }
      }
    ],
    prerequisites: [
      "Set live prêt",
      "Budget disponible"
    ],
    deliverables: [
      "Contrats de booking",
      "Planning tournée",
      "Suivi performances"
    ],
    successMetrics: [
      "Nombre de dates",
      "Revenus live",
      "Croissance audience"
    ]
  },
  {
    id: 8,
    name: "Licensing & Sync",
    icon: "film",
    description: "Placement de vos musiques dans films, séries, publicités et autres médias.",
    timeframe: "2-4 mois",
    subServices: [
      {
        name: "Préparation Licensing",
        description: "Préparation de votre catalogue pour le licensing.",
        duration: "2-3 semaines",
        steps: [
          "Audit catalogue",
          "Préparation versions",
          "Métadonnées licensing",
          "Catalogue optimisé"
        ],
        deliverables: [
          "Catalogue optimisé",
          "Versions licensing",
          "Base de données"
        ],
        estimatedHours: 20
      },
      {
        name: "Placement & Négociation",
        description: "Placement actif et négociation des licences.",
        duration: "2-4 mois",
        steps: [
          "Prospection clients",
          "Pitch catalogue",
          "Négociation licences",
          "Suivi placements"
        ],
        deliverables: [
          "Contrats de licence",
          "Placements confirmés",
          "Revenus générés"
        ],
        estimatedHours: 50
      }
    ],
    experts: [
      {
        id: "expert-9",
        name: "David Kim",
        role: "Licensing Specialist",
        avatar: "/experts/david-k.jpg",
        specialties: ["Licensing", "Sync", "Film/TV"],
        experience: 13,
        rating: 4.9,
        availability: "available",
        languages: ["Français", "Anglais", "Coréen"],
        bio: "Spécialiste en licensing et placement musical"
      }
    ],
    caseStudies: [
      {
        artist: "Sync Masters",
        description: "Placement dans séries TV",
        results: "15+ placements en 4 mois",
        duration: "4 mois",
        metrics: {
          improvement: 300,
          timeframe: "4 mois"
        }
      }
    ],
    prerequisites: [
      "Catalogue de qualité",
      "Droits disponibles"
    ],
    deliverables: [
      "Contrats de licence",
      "Placements confirmés",
      "Revenus générés"
    ],
    successMetrics: [
      "Nombre de placements",
      "Revenus licensing",
      "Visibilité médiatique"
    ]
  },
  {
    id: 9,
    name: "Exit Strategy",
    icon: "trending-up",
    description: "Stratégie de sortie et valorisation de votre carrière artistique.",
    timeframe: "6-12 mois",
    subServices: [
      {
        name: "Évaluation Actifs",
        description: "Évaluation complète de vos actifs artistiques et commerciaux.",
        duration: "2-3 semaines",
        steps: [
          "Audit complet actifs",
          "Évaluation financière",
          "Analyse marché",
          "Rapport d'évaluation"
        ],
        deliverables: [
          "Rapport d'évaluation",
          "Valuation actifs",
          "Recommandations"
        ],
        estimatedHours: 30
      },
      {
        name: "Stratégie de Sortie",
        description: "Élaboration d'une stratégie de sortie optimisée.",
        duration: "3-6 mois",
        steps: [
          "Définition objectifs",
          "Identification opportunités",
          "Préparation dossier",
          "Négociation sortie"
        ],
        deliverables: [
          "Stratégie de sortie",
          "Dossier de présentation",
          "Contrats de sortie"
        ],
        estimatedHours: 60
      }
    ],
    experts: [
      {
        id: "expert-10",
        name: "Emma Thompson",
        role: "Business Development",
        avatar: "/experts/emma-t.jpg",
        specialties: ["Business development", "M&A", "Valuation"],
        experience: 14,
        rating: 4.8,
        availability: "available",
        languages: ["Français", "Anglais"],
        bio: "Experte en développement business et stratégies de sortie"
      }
    ],
    caseStudies: [
      {
        artist: "Exit Success",
        description: "Vente catalogue à major",
        results: "Valuation 2M€, sortie réussie",
        duration: "12 mois",
        metrics: {
          improvement: 1000,
          timeframe: "12 mois"
        }
      }
    ],
    prerequisites: [
      "Catalogue développé",
      "Revenus stables"
    ],
    deliverables: [
      "Stratégie de sortie",
      "Valuation actifs",
      "Contrats de sortie"
    ],
    successMetrics: [
      "Valuation optimale",
      "Sortie réussie",
      "Retour sur investissement"
    ]
  },
  {
    id: 10,
    name: "Direction Stratégique",
    icon: "compass",
    description: "Accompagnement stratégique global pour le développement de votre carrière.",
    timeframe: "12-24 mois",
    subServices: [
      {
        name: "Vision Stratégique",
        description: "Définition de votre vision stratégique à long terme.",
        duration: "1-2 mois",
        steps: [
          "Analyse positionnement",
          "Définition vision",
          "Plan stratégique",
          "Feuille de route"
        ],
        deliverables: [
          "Vision stratégique",
          "Plan de développement",
          "Feuille de route"
        ],
        estimatedHours: 40
      },
      {
        name: "Accompagnement Global",
        description: "Accompagnement stratégique sur l'ensemble de votre carrière.",
        duration: "12-24 mois",
        steps: [
          "Suivi stratégique",
          "Ajustements tactiques",
          "Développement opportunités",
          "Optimisation performance"
        ],
        deliverables: [
          "Suivi mensuel",
          "Rapports trimestriels",
          "Ajustements stratégiques"
        ],
        estimatedHours: 200
      }
    ],
    experts: [
      {
        id: "expert-11",
        name: "Michael Anderson",
        role: "Strategic Advisor",
        avatar: "/experts/michael-a.jpg",
        specialties: ["Stratégie", "Business development", "Carrière artistique"],
        experience: 20,
        rating: 4.9,
        availability: "available",
        languages: ["Français", "Anglais"],
        bio: "Conseiller stratégique senior avec 20 ans d'expérience"
      }
    ],
    caseStudies: [
      {
        artist: "Strategic Artist",
        description: "Développement carrière complète",
        results: "Croissance 500% en 2 ans",
        duration: "24 mois",
        metrics: {
          improvement: 500,
          timeframe: "2 ans"
        }
      }
    ],
    prerequisites: [
      "Vision claire",
      "Engagement long terme"
    ],
    deliverables: [
      "Vision stratégique",
      "Plan de développement",
      "Accompagnement continu"
    ],
    successMetrics: [
      "Croissance globale",
      "Réalisation objectifs",
      "Développement carrière"
    ]
  }
];

// =====================================================
// UTILITAIRES MARKETPLACE
// =====================================================

export function getBlockById(id: number): MarketplaceBlock | undefined {
  return MARKETPLACE_BLOCKS.find(block => block.id === id);
}

export function getAvailableExperts(): Expert[] {
  return MARKETPLACE_BLOCKS.flatMap(block => 
    block.experts.filter(expert => expert.availability === 'available')
  );
}

export function calculateBlockDuration(block: MarketplaceBlock): number {
  return block.subServices.reduce((total, service) => {
    const duration = parseInt(service.duration.split(' ')[0]);
    return total + duration;
  }, 0);
}

export function estimateBlockCost(block: MarketplaceBlock): [number, number] {
  const totalHours = block.subServices.reduce((total, service) => {
    return total + service.estimatedHours;
  }, 0);
  
  const hourlyRate = 150; // Taux horaire moyen
  const minCost = totalHours * hourlyRate * 0.8;
  const maxCost = totalHours * hourlyRate * 1.2;
  
  return [minCost, maxCost];
} 