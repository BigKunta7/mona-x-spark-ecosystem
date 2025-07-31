// Utilitaires pour la gestion de la Marketplace MONA x SPARK

import { 
  MarketplaceBlock, 
  BriefData, 
  BriefSubmission, 
  Proposal,
  Expert,
  ExpertAssignment,
  ProjectTracking,
  MarketplaceMetrics,
  MARKETPLACE_BLOCKS,
  getBlockById,
  getAvailableExperts,
  estimateBlockCost
} from '../types/marketplace';

// =====================================================
// GESTION DES BRIEFS
// =====================================================

export function createBriefSubmission(
  briefData: BriefData
): BriefSubmission {
  return {
    id: `brief-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    briefData,
    status: 'submitted',
    submittedAt: new Date(),
    notes: []
  };
}

export function validateBriefData(briefData: BriefData): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Vérifications obligatoires
  if (!briefData.blockId) {
    errors.push('Bloc non sélectionné');
  }

  if (!briefData.artistId) {
    errors.push('Artiste non identifié');
  }

  if (briefData.objectives.length === 0) {
    errors.push('Aucun objectif sélectionné');
  }

  if (!briefData.specificNeeds || briefData.specificNeeds.trim().length < 50) {
    errors.push('Besoins spécifiques trop courts (minimum 50 caractères)');
  }

  if (!briefData.timeline.urgency) {
    errors.push('Niveau d\'urgence non défini');
  }

  // Vérifications de cohérence
  const block = getBlockById(briefData.blockId);
  if (block) {
    if (briefData.timeline.start) {
      const startDate = new Date(briefData.timeline.start);
      const now = new Date();
      if (startDate < now) {
        warnings.push('Date de début dans le passé');
      }
    }

    if (briefData.budget.disclosed && briefData.budget.range) {
      const [minCost, maxCost] = estimateBlockCost(block);
      if (briefData.budget.range[1] < minCost) {
        warnings.push('Budget potentiellement insuffisant pour ce bloc');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function assignExpertToBrief(
  briefSubmission: BriefSubmission,
  availableExperts: Expert[]
): ExpertAssignment | null {
  const block = getBlockById(briefSubmission.briefData.blockId);
  if (!block) return null;

  // Trouver l'expert le plus approprié
  const suitableExperts = availableExperts.filter(expert => {
    // Vérifier si l'expert est disponible pour ce bloc
    return block.experts.some(blockExpert => 
      blockExpert.id === expert.id && expert.availability === 'available'
    );
  });

  if (suitableExperts.length === 0) return null;

  // Sélectionner l'expert avec le meilleur rating et la plus grande disponibilité
  const bestExpert = suitableExperts.sort((a, b) => {
    if (a.rating !== b.rating) return b.rating - a.rating;
    return a.experience - b.experience; // Plus d'expérience en priorité
  })[0];

  return {
    briefId: briefSubmission.id,
    expertId: bestExpert.id,
    assignedAt: new Date(),
    status: 'assigned',
    notes: [`Expert ${bestExpert.name} assigné automatiquement`],
    communicationHistory: []
  };
}

// =====================================================
// GÉNÉRATION DE PROPOSITIONS
// =====================================================

export function generateProposal(
  briefSubmission: BriefSubmission,
  expertAssignment: ExpertAssignment
): Proposal {
  const block = getBlockById(briefSubmission.briefData.blockId);
  if (!block) throw new Error('Bloc non trouvé');

  const [minCost, maxCost] = estimateBlockCost(block);
  const totalCost = Math.round((minCost + maxCost) / 2);

  // Générer des services personnalisés basés sur les objectifs
  const customServices = block.subServices.map(service => ({
    name: service.name,
    description: service.description,
    duration: service.duration,
    deliverables: service.deliverables,
    price: Math.round((service.estimatedHours * 150) * (0.9 + Math.random() * 0.2))
  }));

  // Calculer la timeline
  const startDate = briefSubmission.briefData.timeline.start 
    ? new Date(briefSubmission.briefData.timeline.start)
    : new Date();
  
  const totalDuration = block.subServices.reduce((total, service) => {
    const duration = parseInt(service.duration.split(' ')[0]);
    return total + duration;
  }, 0);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + totalDuration);

  // Générer les milestones
  const milestones = block.subServices.map((service, index) => {
    const milestoneDate = new Date(startDate);
    const serviceDuration = parseInt(service.duration.split(' ')[0]);
    milestoneDate.setDate(milestoneDate.getDate() + 
      block.subServices.slice(0, index).reduce((total, s) => 
        total + parseInt(s.duration.split(' ')[0]), 0
      ) + serviceDuration
    );

    return {
      name: service.name,
      date: milestoneDate,
      deliverables: service.deliverables,
      status: 'pending' as const
    };
  });

  // Générer le planning de paiement
  const paymentSchedule = [
    {
      percentage: 30,
      amount: Math.round(totalCost * 0.3),
      dueDate: startDate,
      status: 'pending' as const
    },
    {
      percentage: 40,
      amount: Math.round(totalCost * 0.4),
      dueDate: new Date(startDate.getTime() + (totalDuration * 0.5 * 24 * 60 * 60 * 1000)),
      status: 'pending' as const
    },
    {
      percentage: 30,
      amount: Math.round(totalCost * 0.3),
      dueDate: endDate,
      status: 'pending' as const
    }
  ];

  return {
    id: `proposal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    briefId: briefSubmission.id,
    expertId: expertAssignment.expertId,
    customServices,
    timeline: {
      start: startDate,
      end: endDate,
      milestones
    },
    pricing: {
      total: totalCost,
      breakdown: customServices.map(service => ({
        service: service.name,
        description: service.description,
        price: service.price,
        quantity: 1,
        total: service.price
      })),
      paymentSchedule
    },
    terms: [
      'Paiement selon planning convenu',
      'Livrables selon timeline défini',
      'Révisions incluses dans le prix',
      'Confidentialité garantie'
    ],
    validity: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
  };
}

// =====================================================
// SUIVI DE PROJET
// =====================================================

export function createProjectTracking(
  briefSubmission: BriefSubmission,
  proposal: Proposal
): ProjectTracking {
  return {
    id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    briefId: briefSubmission.id,
    expertId: proposal.expertId,
    status: 'active',
    progress: 0,
    milestones: proposal.timeline.milestones,
    deliverables: [],
    communications: [],
    payments: proposal.pricing.paymentSchedule
  };
}

export function updateProjectProgress(
  project: ProjectTracking,
  completedMilestones: number
): ProjectTracking {
  const totalMilestones = project.milestones.length;
  const progress = Math.round((completedMilestones / totalMilestones) * 100);

  return {
    ...project,
    progress,
    status: progress >= 100 ? 'completed' : 'active'
  };
}

export function addCommunicationEvent(
  project: ProjectTracking,
  event: {
    type: 'email' | 'phone' | 'video' | 'message';
    direction: 'inbound' | 'outbound';
    content: string;
    attachments?: string[];
  }
): ProjectTracking {
  const communicationEvent = {
    id: `comm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    ...event
  };

  return {
    ...project,
    communications: [...project.communications, communicationEvent]
  };
}

// =====================================================
// CALCUL DES MÉTRIQUES
// =====================================================

export function calculateMarketplaceMetrics(
  briefs: BriefSubmission[],
  projects: ProjectTracking[]
): MarketplaceMetrics {
  const totalBriefs = briefs.length;
  const acceptedProjects = projects.filter(p => p.status === 'completed').length;
  const conversionRate = totalBriefs > 0 ? (acceptedProjects / totalBriefs) * 100 : 0;

  // Calculer le temps de réponse moyen
  const responseTimes = briefs
    .filter(b => b.reviewedAt)
    .map(b => {
      const submitted = b.submittedAt.getTime();
      const reviewed = b.reviewedAt!.getTime();
      return (reviewed - submitted) / (1000 * 60 * 60); // en heures
    });

  const averageResponseTime = responseTimes.length > 0 
    ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
    : 0;

  // Calculer l'utilisation des experts
  const totalExpertHours = projects.reduce((total, project) => {
    const block = getBlockById(parseInt(project.briefId.split('-')[1]));
    if (!block) return total;
    return total + block.subServices.reduce((sum, service) => sum + service.estimatedHours, 0);
  }, 0);

  const maxExpertHours = 160; // 40h/semaine * 4 semaines
  const expertUtilization = (totalExpertHours / maxExpertHours) * 100;

  // Calculer les revenus
  const revenue = {
    total: projects.reduce((total, project) => {
      const proposal = project as any; // Simplification
      return total + (proposal.pricing?.total || 0);
    }, 0),
    byBlock: {} as Record<number, number>,
    byExpert: {} as Record<string, number>
  };

  // Calculer la satisfaction
  const ratings = projects
    .filter(p => p.status === 'completed')
    .map(p => 4.5 + Math.random() * 0.5); // Simulation

  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
    : 0;

  return {
    totalBriefs,
    conversionRate,
    averageResponseTime,
    expertUtilization,
    revenue,
    satisfaction: {
      averageRating,
      totalReviews: ratings.length
    }
  };
}

// =====================================================
// RECOMMANDATIONS ET OPTIMISATIONS
// =====================================================

export function getRecommendedBlocks(
  artistScore: number,
  currentProjects: ProjectTracking[]
): MarketplaceBlock[] {
  // Basé sur le score de l'artiste et ses projets actuels
  const completedBlocks = currentProjects
    .filter(p => p.status === 'completed')
    .map(p => parseInt(p.briefId.split('-')[1]));

  const recommendations = MARKETPLACE_BLOCKS.filter(block => {
    // Ne pas recommander les blocs déjà complétés
    if (completedBlocks.includes(block.id)) return false;

    // Recommandations basées sur le score
    if (artistScore < 30) {
      return [1, 2, 3].includes(block.id); // Blocs de base
    } else if (artistScore < 60) {
      return [2, 3, 4, 5, 6].includes(block.id); // Blocs intermédiaires
    } else {
      return [5, 6, 7, 8, 9, 10].includes(block.id); // Blocs avancés
    }
  });

  return recommendations.sort((a, b) => {
    // Prioriser par impact potentiel
    const impactA = a.caseStudies[0]?.metrics?.improvement || 0;
    const impactB = b.caseStudies[0]?.metrics?.improvement || 0;
    return impactB - impactA;
  });
}

export function optimizeExpertAssignment(
  briefSubmission: BriefSubmission,
  availableExperts: Expert[]
): Expert {
  const block = getBlockById(briefSubmission.briefData.blockId);
  if (!block) throw new Error('Bloc non trouvé');

  // Algorithme d'optimisation basé sur plusieurs critères
  const expertScores = availableExperts.map(expert => {
    let score = 0;

    // Score de base (rating)
    score += expert.rating * 2;

    // Bonus pour l'expérience
    score += expert.experience * 0.5;

    // Bonus pour les langues (si l'artiste a des préférences)
    if (briefSubmission.briefData.contactPreference === 'video') {
      score += expert.languages.length * 0.3;
    }

    // Bonus pour la disponibilité
    if (expert.availability === 'available') {
      score += 2;
    }

    // Bonus pour la spécialisation
    const blockExpert = block.experts.find(be => be.id === expert.id);
    if (blockExpert) {
      score += 3;
    }

    return { expert, score };
  });

  // Retourner l'expert avec le meilleur score
  return expertScores
    .sort((a, b) => b.score - a.score)[0]
    .expert;
}

// =====================================================
// VALIDATION ET VÉRIFICATION
// =====================================================

export function validateProjectSetup(
  briefSubmission: BriefSubmission,
  proposal: Proposal
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Vérifications de base
  if (!proposal.expertId) {
    errors.push('Expert non assigné');
  }

  if (proposal.pricing.total <= 0) {
    errors.push('Prix invalide');
  }

  if (proposal.timeline.start >= proposal.timeline.end) {
    errors.push('Timeline invalide');
  }

  // Vérifications de cohérence
  const block = getBlockById(briefSubmission.briefData.blockId);
  if (block) {
    const [minCost, maxCost] = estimateBlockCost(block);
    
    if (proposal.pricing.total < minCost) {
      warnings.push('Prix potentiellement sous-évalué');
    }
    
    if (proposal.pricing.total > maxCost * 1.5) {
      warnings.push('Prix potentiellement sur-évalué');
    }
  }

  // Vérifications de paiement
  const totalPercentage = proposal.pricing.paymentSchedule.reduce(
    (sum, payment) => sum + payment.percentage, 0
  );
  
  if (Math.abs(totalPercentage - 100) > 1) {
    errors.push('Plan de paiement invalide (total doit être 100%)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
} 