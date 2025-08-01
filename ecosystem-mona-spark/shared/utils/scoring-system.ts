// Utilitaires pour le système de scoring artistique MONA x SPARK

import { ArtistScoringSystem, ArtistScore, ScoringMetric, InvestorScoringSystem, ArtistInvestorScore } from '../types/mona-business-model';

// =====================================================
// SYSTÈME DE SCORING ARTISTIQUE
// =====================================================

export const ARTIST_SCORING_SYSTEM: ArtistScoringSystem = {
  quantitativeMetrics: {
    instagramFollowers: {
      name: 'Instagram Followers',
      ranges: [[0, 500], [500, 2000], [2000, 5000], [5000, 15000], [15000, Infinity]],
      points: [0, 2, 4, 6, 8],
      weight: 0.15
    },
    engagementRateIG: {
      name: 'Taux d\'engagement Instagram',
      ranges: [[0, 1], [1, 3], [3, 6], [6, Infinity]],
      points: [0, 2, 4, 6],
      weight: 0.10
    },
    spotifyMonthlyStreams: {
      name: 'Écoutes mensuelles Spotify',
      ranges: [[0, 100], [100, 1000], [1000, 5000], [5000, 15000], [15000, 50000], [50000, Infinity]],
      points: [0, 2, 4, 6, 8, 10],
      weight: 0.12
    },
    tiktokFollowers: {
      name: 'TikTok Followers',
      ranges: [[0, 1000], [1000, 5000], [5000, 15000], [15000, 50000], [50000, Infinity]],
      points: [0, 2, 4, 6, 8],
      weight: 0.08
    },
    youtubeSubscribers: {
      name: 'Abonnés YouTube',
      ranges: [[0, 100], [100, 500], [500, 2000], [2000, 10000], [10000, Infinity]],
      points: [0, 2, 4, 6, 8],
      weight: 0.10
    },
    twitterFollowers: {
      name: 'Twitter Followers',
      ranges: [[0, 500], [500, 2000], [2000, 5000], [5000, 15000], [15000, Infinity]],
      points: [0, 1, 2, 3, 4],
      weight: 0.05
    },
    facebookFollowers: {
      name: 'Facebook Followers',
      ranges: [[0, 500], [500, 2000], [2000, 5000], [5000, 15000], [15000, Infinity]],
      points: [0, 1, 2, 3, 4],
      weight: 0.05
    },
    soundcloudFollowers: {
      name: 'SoundCloud Followers',
      ranges: [[0, 100], [100, 500], [500, 2000], [2000, 10000], [10000, Infinity]],
      points: [0, 1, 2, 3, 4],
      weight: 0.05
    },
    // NOUVELLES MÉTRIQUES
    monthlyFollowerGrowth: {
        name: 'Croissance mensuelle des followers (%)',
        ranges: [[0, 1], [1, 5], [5, 10], [10, 20], [20, Infinity]],
        points: [0, 2, 4, 7, 10],
        weight: 0.20
    },
    averageRevenuePerMonth: {
        name: 'Revenu mensuel moyen (€)',
        ranges: [[0, 50], [50, 200], [200, 1000], [1000, 5000], [5000, Infinity]],
        points: [0, 2, 5, 8, 10],
        weight: 0.30
    },
    communityStrength: {
        name: 'Force de la communauté (sur 10)',
        ranges: [[0, 2], [2, 4], [4, 6], [6, 8], [8, 10]],
        points: [0, 2, 4, 6, 8],
        weight: 0.15
    },
    publicationConsistency: {
        name: 'Consistance de publication (publications/mois)',
        ranges: [[0, 1], [1, 4], [4, 8], [8, Infinity]],
        points: [0, 3, 6, 8],
        weight: 0.10
    }
  },
  artisticQuality: {
    originaliteSonore: { maxPoints: 8, weight: 0.20 },
    qualiteProduction: { maxPoints: 7, weight: 0.18 },
    coherenceUnivers: { maxPoints: 6, weight: 0.15 },
    potentielCommercial: { maxPoints: 7, weight: 0.17 },
    evolutionArtistique: { maxPoints: 7, weight: 0.15 }
  },
  structurationMindset: {
    professionnalisme: { maxPoints: 6, weight: 0.20 },
    visionCarriere: { maxPoints: 5, weight: 0.18 },
    capaciteInvestissement: { maxPoints: 4, weight: 0.15 },
    equipeConstituee: { maxPoints: 4, weight: 0.12 },
    motivationAmbition: { maxPoints: 6, weight: 0.20 }
  }
};

// NOUVEAU : PONDÉRATION POUR LE SCORE INVESTISSEUR
export const INVESTOR_SCORING_WEIGHTS: InvestorScoringSystem = {
    weights: {
        growthPotential: 0.40,
        revenueStability: 0.30,
        communityValue: 0.15,
        professionalism: 0.15,
    }
};


// =====================================================
// FONCTIONS DE CALCUL DE SCORE
// =====================================================

export function calculateQuantitativeScore(metrics: Record<string, number>): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const [metricName, value] of Object.entries(metrics)) {
    const metric = ARTIST_SCORING_SYSTEM.quantitativeMetrics[metricName as keyof typeof ARTIST_SCORING_SYSTEM.quantitativeMetrics];
    if (metric) {
      const points = getPointsForValue(metric, value);
      totalScore += points * metric.weight;
      totalWeight += metric.weight;
    }
  }

  return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0; // Normalisé sur 100
}

export function calculateArtisticQualityScore(qualities: Record<string, number>): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const [qualityName, score] of Object.entries(qualities)) {
    const quality = ARTIST_SCORING_SYSTEM.artisticQuality[qualityName as keyof typeof ARTIST_SCORING_SYSTEM.artisticQuality];
    if (quality) {
      const normalizedScore = Math.min(score, quality.maxPoints);
      totalScore += (normalizedScore / quality.maxPoints) * quality.maxPoints * quality.weight;
      totalWeight += quality.maxPoints * quality.weight;
    }
  }

  return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
}

export function calculateStructurationScore(structuration: Record<string, number>): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const [structName, score] of Object.entries(structuration)) {
    const struct = ARTIST_SCORING_SYSTEM.structurationMindset[structName as keyof typeof ARTIST_SCORING_SYSTEM.structurationMindset];
    if (struct) {
      const normalizedScore = Math.min(score, struct.maxPoints);
      totalScore += (normalizedScore / struct.maxPoints) * struct.maxPoints * struct.weight;
      totalWeight += struct.maxPoints * struct.weight;
    }
  }

  return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
}

export function calculateTotalScore(
  quantitativeScore: number,
  artisticQualityScore: number,
  structurationScore: number
): number {
  // Pondération : 40% quantitatif, 35% qualité artistique, 25% structuration
  return (
    (quantitativeScore / 10) * 0.40 +
    (artisticQualityScore / 100) * 0.35 +
    (structurationScore / 100) * 0.25
  ) * 100;
}

// NOUVEAU : FONCTION DE CALCUL POUR LE SCORE INVESTISSEUR
export function calculateInvestorScore(
    metrics: Record<string, number>, // Données quantitatives de l'artiste
    structuration: Record<string, number> // Données de structuration
): ArtistInvestorScore {
    // 1. Calculer les sous-scores
    const growthPotential = calculateSubScore(metrics, ['monthlyFollowerGrowth', 'tiktokFollowers', 'engagementRateIG']);
    const revenueStability = calculateSubScore(metrics, ['averageRevenuePerMonth', 'spotifyMonthlyStreams', 'youtubeSubscribers', 'publicationConsistency']);
    const communityValue = calculateSubScore(metrics, ['communityStrength', 'instagramFollowers']);
    const professionalism = calculateStructurationScore(structuration);

    // 2. Calculer le score total pondéré
    const weights = INVESTOR_SCORING_WEIGHTS.weights;
    const totalInvestorScore = 
        growthPotential * weights.growthPotential +
        revenueStability * weights.revenueStability +
        communityValue * weights.communityValue +
        professionalism * weights.professionalism;

    // 3. Déterminer le niveau de risque et le ROI potentiel
    const riskLevel = getRiskLevel(totalInvestorScore);
    const potentialROI = estimatePotentialROI(totalInvestorScore);

    return {
        artistId: 'temp-id', // Doit être remplacé par le vrai ID
        totalInvestorScore,
        riskLevel,
        potentialROI,
        scores: {
            growthPotential,
            revenueStability,
            communityValue,
            professionalism,
        },
        lastUpdated: new Date()
    };
}

// Helper pour calculer les sous-scores du score investisseur
function calculateSubScore(metrics: Record<string, number>, metricNames: string[]): number {
    let totalScore = 0;
    let totalWeight = 0;
    for (const metricName of metricNames) {
        const metric = ARTIST_SCORING_SYSTEM.quantitativeMetrics[metricName as keyof typeof ARTIST_SCORING_SYSTEM.quantitativeMetrics];
        if (metric && metrics[metricName] !== undefined) {
            const points = getPointsForValue(metric, metrics[metricName]);
            totalScore += points * metric.weight;
            totalWeight += 10 * metric.weight; // Max points (10) * weight
        }
    }
    return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
}


// =====================================================
// FONCTIONS UTILITAIRES
// =====================================================

export function getPointsForValue(metric: ScoringMetric, value: number): number {
  for (let i = 0; i < metric.ranges.length; i++) {
    const [min, max] = metric.ranges[i];
    if (value >= min && value < max) {
      return metric.points[i];
    }
  }
  // Gérer le cas de la dernière tranche (Infinity)
  const lastRange = metric.ranges[metric.ranges.length - 1];
  if (value >= lastRange[0]) {
      return metric.points[metric.points.length - 1];
  }
  return 0;
}

export function getScoreLevel(score: number): 'low' | 'medium' | 'high' | 'excellent' {
  if (score < 30) return 'low';
  if (score < 50) return 'medium';
  if (score < 70) return 'high';
  return 'excellent';
}

// NOUVEAU : Utilitaire pour le score investisseur
function getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'very-high' {
    if (score > 75) return 'low';
    if (score > 50) return 'medium';
    if (score > 25) return 'high';
    return 'very-high';
}

function estimatePotentialROI(score: number): number {
    // Formule simple pour estimer le ROI potentiel basé sur le score
    // (score / 100) ^ 2 * 50% + 5%
    const baseROI = 0.05; // 5% de base
    const scoreFactor = Math.pow(score / 100, 2);
    const variableROI = scoreFactor * 0.50; // Jusqu'à 50%
    return (baseROI + variableROI) * 100; // en %
}


export function getRecommendations(score: ArtistScore): string[] {
  const recommendations: string[] = [];
  
  // Recommandations basées sur le score total
  if (score.totalScore < 30) {
    recommendations.push('Développer votre présence en ligne');
    recommendations.push('Augmenter la fréquence de publication');
    recommendations.push('Améliorer la qualité du contenu');
  } else if (score.totalScore < 50) {
    recommendations.push('Optimiser votre stratégie de contenu');
    recommendations.push('Développer votre communauté');
    recommendations.push('Améliorer l\'engagement');
  } else if (score.totalScore < 70) {
    recommendations.push('Diversifier vos plateformes');
    recommendations.push('Collaborer avec d\'autres créateurs');
    recommendations.push('Monétiser votre audience');
  } else {
    recommendations.push('Maintenir votre excellence');
    recommendations.push('Développer de nouveaux projets');
    recommendations.push('Mentorer d\'autres créateurs');
  }
  
  return recommendations;
}
