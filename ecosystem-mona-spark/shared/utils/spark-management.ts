// Utilitaires pour la gestion SPARK - Laboratoire Créatif Itinérant

import { 
  SparkEdition, 
  SparkParticipant, 
  SparkSponsor, 
  SparkBudget, 
  SparkMetrics,
  SparkRole,
  SPARK_CONFIG 
} from '../types/spark-vision';

// =====================================================
// GESTION DES ÉDITIONS SPARK
// =====================================================

export function createSparkEdition(
  number: string,
  name: string,
  startDate: Date,
  location: any
): SparkEdition {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + SPARK_CONFIG.editionDuration - 1);

  return {
    id: `spark-${number}`,
    number,
    name,
    dates: { start: startDate, end: endDate },
    location,
    participants: [],
    sponsors: [],
    budget: createDefaultBudget(),
    status: 'planning',
    content: []
  };
}

export function calculateEditionBudget(edition: SparkEdition): SparkBudget {
  const costs = {
    location: edition.location.cost,
    catering: 150 * SPARK_CONFIG.participantsPerEdition.max * SPARK_CONFIG.editionDuration,
    transport: 500 * edition.participants.length,
    technical: 2000,
    marketing: 1500,
    personnel: 3000,
    miscellaneous: 1000
  };

  const totalCosts = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

  const revenue = {
    sponsors: edition.sponsors.reduce((sum, sponsor) => sum + sponsor.investment, 0),
    tickets: 3000, // Estimation
    streaming: 2500, // Estimation
    merchandising: 1500, // Estimation
    other: 500
  };

  const totalRevenue = Object.values(revenue).reduce((sum, rev) => sum + rev, 0);
  const margin = totalRevenue - totalCosts;

  return {
    total: totalCosts,
    breakdown: costs,
    revenue,
    margin
  };
}

function createDefaultBudget(): SparkBudget {
  return {
    total: 0,
    breakdown: {
      location: 0,
      catering: 0,
      transport: 0,
      technical: 0,
      marketing: 0,
      personnel: 0,
      miscellaneous: 0
    },
    revenue: {
      sponsors: 0,
      tickets: 0,
      streaming: 0,
      merchandising: 0,
      other: 0
    },
    margin: 0
  };
}

// =====================================================
// SÉLECTION DES PARTICIPANTS
// =====================================================

export function selectParticipants(
  candidates: any[],
  targetRoles: SparkRole[],
  maxParticipants: number = SPARK_CONFIG.participantsPerEdition.max
): SparkParticipant[] {
  const selected: SparkParticipant[] = [];
  const roleCounts: Record<SparkRole, number> = {} as Record<SparkRole, number>;

  // Initialiser les compteurs
  targetRoles.forEach(role => {
    roleCounts[role] = 0;
  });

  // Trier les candidats par score et expérience
  const sortedCandidates = candidates.sort((a, b) => {
    const scoreDiff = (b.score || 0) - (a.score || 0);
    if (scoreDiff !== 0) return scoreDiff;
    
    const experienceOrder = { 'expert': 3, 'established': 2, 'emerging': 1 };
    return experienceOrder[b.experience] - experienceOrder[a.experience];
  });

  // Sélectionner les participants
  for (const candidate of sortedCandidates) {
    if (selected.length >= maxParticipants) break;

    const primaryRole = candidate.roles[0];
    if (targetRoles.includes(primaryRole) && roleCounts[primaryRole] < 3) {
      selected.push({
        id: `participant-${selected.length + 1}`,
        artistId: candidate.id,
        role: primaryRole,
        specialty: candidate.specialties || [],
        experience: candidate.experience || 'emerging',
        socialMedia: candidate.socialMedia || {},
        status: 'invited',
        contribution: candidate.proposedContribution || '',
        compensation: {
          type: 'free',
          amount: 0
        }
      });

      roleCounts[primaryRole]++;
    }
  }

  return selected;
}

// =====================================================
// GESTION DES SPONSORS
// =====================================================

export function calculateSponsorTier(investment: number): 'RAW' | 'CORE' | 'LEGACY' {
  if (investment >= 30000) return 'LEGACY';
  if (investment >= 15000) return 'CORE';
  return 'RAW';
}

export function generateSponsorBenefits(tier: 'RAW' | 'CORE' | 'LEGACY'): string[] {
  const benefits = {
    RAW: [
      'Mention sur les réseaux sociaux',
      'Logo sur les supports vidéos',
      '2 billets VIP pour la restitution',
      'Stories Instagram pendant l\'édition'
    ],
    CORE: [
      'Visibilité permanente dans les vidéos',
      'Présence physique (kakémonos, goodies)',
      'Intégration dans le storytelling',
      'Capsule co-brandée possible',
      '4 billets VIP pour la restitution',
      'Contenu dédié sur les réseaux'
    ],
    LEGACY: [
      'Coproduction d\'une résidence entière',
      'Naming potentiel sur une édition',
      'Exploitation commerciale conjointe',
      'Événement exclusif partenaire',
      '10 billets VIP pour la restitution',
      'Contenu exclusif et personnalisé'
    ]
  };

  return benefits[tier];
}

// =====================================================
// CALCUL DES MÉTRIQUES
// =====================================================

export function calculateSparkMetrics(edition: SparkEdition): SparkMetrics {
  const participants = edition.participants;
  const content = edition.content;

  return {
    edition: parseInt(edition.number),
    participants: {
      total: participants.length,
      confirmed: participants.filter(p => p.status === 'confirmed').length,
      active: participants.filter(p => p.status === 'active').length,
      satisfaction: calculateAverageSatisfaction(participants)
    },
    content: {
      created: content.length,
      published: content.filter(c => c.url).length,
      views: content.reduce((sum, c) => sum + c.metrics.views, 0),
      engagement: content.reduce((sum, c) => sum + c.metrics.likes + c.metrics.shares, 0)
    },
    revenue: {
      total: edition.budget.revenue.sponsors + edition.budget.revenue.tickets + 
             edition.budget.revenue.streaming + edition.budget.revenue.merchandising,
      sponsors: edition.budget.revenue.sponsors,
      tickets: edition.budget.revenue.tickets,
      streaming: edition.budget.revenue.streaming,
      merchandising: edition.budget.revenue.merchandising
    },
    audience: {
      instagram: calculateSocialMediaReach(edition, 'instagram'),
      youtube: calculateSocialMediaReach(edition, 'youtube'),
      tiktok: calculateSocialMediaReach(edition, 'tiktok'),
      twitch: calculateSocialMediaReach(edition, 'twitch')
    },
    sponsors: {
      total: edition.sponsors.length,
      averageInvestment: edition.sponsors.length > 0 
        ? edition.sponsors.reduce((sum, s) => sum + s.investment, 0) / edition.sponsors.length 
        : 0,
      retention: calculateSponsorRetention(edition)
    }
  };
}

function calculateAverageSatisfaction(participants: SparkParticipant[]): number {
  // Simulation - en réalité, ce serait basé sur des sondages
  return 8.5; // Sur 10
}

function calculateSocialMediaReach(edition: SparkEdition, platform: string): number {
  // Simulation basée sur les participants et le contenu
  const participantReach = edition.participants.reduce((sum, p) => {
    const followers = p.socialMedia[platform as keyof typeof p.socialMedia] || 0;
    return sum + followers;
  }, 0);

  const contentReach = edition.content.reduce((sum, c) => {
    return sum + c.metrics.views;
  }, 0);

  return participantReach + contentReach;
}

function calculateSponsorRetention(edition: SparkEdition): number {
  // Simulation - en réalité, ce serait basé sur l'historique
  return 0.75; // 75% de rétention
}

// =====================================================
// GESTION DES CONTENUS
// =====================================================

export function generateContentIdeas(participants: SparkParticipant[]): string[] {
  const ideas: string[] = [];
  
  // Basé sur les rôles des participants
  const roles = participants.map(p => p.role);
  
  if (roles.includes('musician') && roles.includes('beatmaker')) {
    ideas.push('Collaboration musique live + production');
  }
  
  if (roles.includes('dancer') && roles.includes('musician')) {
    ideas.push('Performance chorégraphiée sur musique live');
  }
  
  if (roles.includes('videographer') && roles.includes('visual_artist')) {
    ideas.push('Clip vidéo avec art visuel intégré');
  }
  
  if (roles.includes('content_creator')) {
    ideas.push('Série de contenus behind-the-scenes');
  }
  
  return ideas;
}

export function calculateContentRevenue(content: any[]): number {
  return content.reduce((total, c) => {
    return total + c.metrics.revenue;
  }, 0);
}

// =====================================================
// VALIDATION ET VÉRIFICATION
// =====================================================

export function validateEditionSetup(edition: SparkEdition): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Vérifications critiques
  if (!edition.location) {
    errors.push('Localisation manquante');
  }

  if (edition.participants.length < SPARK_CONFIG.participantsPerEdition.min) {
    errors.push(`Nombre de participants insuffisant (${edition.participants.length}/${SPARK_CONFIG.participantsPerEdition.min})`);
  }

  if (edition.budget.total > SPARK_CONFIG.budgetRange.max) {
    warnings.push(`Budget dépassé (${edition.budget.total}€/${SPARK_CONFIG.budgetRange.max}€)`);
  }

  if (edition.budget.margin < 0) {
    errors.push('Budget non rentable');
  }

  // Vérifications de diversité
  const roles = edition.participants.map(p => p.role);
  const uniqueRoles = new Set(roles);
  
  if (uniqueRoles.size < 5) {
    warnings.push('Diversité des rôles limitée');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// =====================================================
// PROJECTIONS ET ANALYSES
// =====================================================

export function projectAnnualRevenue(editionsCount: number): number {
  const averageRevenuePerEdition = 20000; // Estimation
  return editionsCount * averageRevenuePerEdition;
}

export function calculateSparkROI(edition: SparkEdition): number {
  const totalInvestment = edition.budget.total;
  const totalRevenue = Object.values(edition.budget.revenue).reduce((sum, rev) => sum + rev, 0);
  
  if (totalInvestment === 0) return 0;
  return ((totalRevenue - totalInvestment) / totalInvestment) * 100;
}

export function estimateBreakEvenPoint(monthlyCosts: number, revenuePerEdition: number): number {
  if (revenuePerEdition === 0) return Infinity;
  return Math.ceil(monthlyCosts / revenuePerEdition);
} 