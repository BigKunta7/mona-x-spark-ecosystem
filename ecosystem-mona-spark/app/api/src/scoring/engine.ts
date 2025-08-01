import { Router, Response } from 'express';

const scoringRouter = Router();

// Types pour le système de scoring
interface CreatorData {
  id: string;
  name: string;
  followers: number;
  engagement_rate: number;
  growth_rate: number;
  posting_frequency: number;
  artistic_consistency: number;
  innovation_level: number;
  technical_quality: number;
  collaboration_openness: number;
  ecosystem_fit: number;
  genre: string;
  location: string;
  social_links: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
  };
}

interface CreatorScore {
  creator_id: string;
  total_score: number;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  confidence_level: number;
  breakdown: ScoreBreakdown;
  recommendations: string[];
  last_updated: Date;
}

interface ScoreBreakdown {
  audience_engagement: {
    followers_score: number;
    engagement_score: number;
    total: number;
  };
  growth_dynamism: {
    growth_score: number;
    frequency_score: number;
    total: number;
  };
  creative_quality: {
    consistency_score: number;
    innovation_score: number;
    technical_score: number;
    total: number;
  };
  collaborative_potential: {
    openness_score: number;
    ecosystem_fit_score: number;
    total: number;
  };
}

// Service de Scoring
class ScoringEngine {
  // Calculer le score complet d'un créateur
  async calculateCreatorScore(creatorData: CreatorData): Promise<CreatorScore> {
    const breakdown = this.calculateScoreBreakdown(creatorData);
    const total_score = this.calculateTotalScore(breakdown);
    const category = this.determineCategory(total_score);
    const confidence_level = this.calculateConfidenceLevel(creatorData);
    const recommendations = this.generateRecommendations(creatorData, breakdown);

    return {
      creator_id: creatorData.id,
      total_score,
      category,
      confidence_level,
      breakdown,
      recommendations,
      last_updated: new Date()
    };
  }

  // Calculer la décomposition du score
  private calculateScoreBreakdown(creator: CreatorData): ScoreBreakdown {
    return {
      audience_engagement: {
        followers_score: this.calculateFollowersScore(creator.followers),
        engagement_score: this.calculateEngagementScore(creator.engagement_rate),
        total: this.calculateFollowersScore(creator.followers) + this.calculateEngagementScore(creator.engagement_rate)
      },
      growth_dynamism: {
        growth_score: this.calculateGrowthScore(creator.growth_rate),
        frequency_score: this.calculateFrequencyScore(creator.posting_frequency),
        total: this.calculateGrowthScore(creator.growth_rate) + this.calculateFrequencyScore(creator.posting_frequency)
      },
      creative_quality: {
        consistency_score: this.calculateConsistencyScore(creator.artistic_consistency),
        innovation_score: this.calculateInnovationScore(creator.innovation_level),
        technical_score: this.calculateTechnicalScore(creator.technical_quality),
        total: this.calculateConsistencyScore(creator.artistic_consistency) + 
               this.calculateInnovationScore(creator.innovation_level) + 
               this.calculateTechnicalScore(creator.technical_quality)
      },
      collaborative_potential: {
        openness_score: this.calculateOpennessScore(creator.collaboration_openness),
        ecosystem_fit_score: this.calculateEcosystemFitScore(creator.ecosystem_fit),
        total: this.calculateOpennessScore(creator.collaboration_openness) + 
               this.calculateEcosystemFitScore(creator.ecosystem_fit)
      }
    };
  }

  // Calculer le score total
  private calculateTotalScore(breakdown: ScoreBreakdown): number {
    return breakdown.audience_engagement.total + 
           breakdown.growth_dynamism.total + 
           breakdown.creative_quality.total + 
           breakdown.collaborative_potential.total;
  }

  // Déterminer la catégorie
  private determineCategory(total_score: number): 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE' {
    if (total_score >= 80) return 'SPARK-READY';
    if (total_score >= 60) return 'MONA-POSSIBLE';
    if (total_score >= 40) return 'EN-DEVELOPPEMENT';
    return 'NON-PRIORITAIRE';
  }

  // Calculer le niveau de confiance
  private calculateConfidenceLevel(creator: CreatorData): number {
    let confidence = 0.5; // Base
    
    // Plus de données = plus de confiance
    if (creator.followers > 1000) confidence += 0.1;
    if (creator.engagement_rate > 0.05) confidence += 0.1;
    if (creator.growth_rate > 0.1) confidence += 0.1;
    if (creator.posting_frequency > 3) confidence += 0.1;
    
    // Qualité des données
    if (creator.artistic_consistency > 0.7) confidence += 0.1;
    if (creator.innovation_level > 0.7) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  // Générer des recommandations
  private generateRecommendations(creator: CreatorData, breakdown: ScoreBreakdown): string[] {
    const recommendations: string[] = [];
    
    // Recommandations basées sur les scores faibles
    if (breakdown.audience_engagement.total < 20) {
      recommendations.push('Développer votre audience avec du contenu régulier et engageant');
    }
    
    if (breakdown.growth_dynamism.total < 15) {
      recommendations.push('Augmenter la fréquence de publication pour stimuler la croissance');
    }
    
    if (breakdown.creative_quality.total < 18) {
      recommendations.push('Améliorer la cohérence artistique et l\'innovation de vos créations');
    }
    
    if (breakdown.collaborative_potential.total < 12) {
      recommendations.push('Participer à des collaborations pour élargir votre réseau');
    }
    
    // Recommandations spécifiques par catégorie
    const category = this.determineCategory(this.calculateTotalScore(breakdown));
    
    switch (category) {
      case 'SPARK-READY':
        recommendations.push('Prêt pour les événements SPARK - contactez-nous immédiatement');
        recommendations.push('Opportunité de collaboration premium disponible');
        break;
      case 'MONA-POSSIBLE':
        recommendations.push('Potentiel SPARK identifié - participez à nos événements gratuits');
        recommendations.push('Accédez à notre programme de mentorat');
        break;
      case 'EN-DEVELOPPEMENT':
        recommendations.push('Rejoignez notre programme d\'accompagnement créateur');
        recommendations.push('Participez à nos workshops gratuits');
        break;
      case 'NON-PRIORITAIRE':
        recommendations.push('Développez votre présence en ligne');
        recommendations.push('Rejoignez notre newsletter pour des conseils');
        break;
    }
    
    return recommendations;
  }

  // Méthodes de calcul des scores individuels
  private calculateFollowersScore(followers: number): number {
    if (followers >= 50000) return 15;
    if (followers >= 10000) return 12;
    if (followers >= 5000) return 8;
    if (followers >= 1000) return 5;
    return 2;
  }

  private calculateEngagementScore(engagement: number): number {
    if (engagement >= 0.15) return 15;
    if (engagement >= 0.10) return 13;
    if (engagement >= 0.05) return 10;
    if (engagement >= 0.02) return 5;
    return 2;
  }

  private calculateGrowthScore(growth: number): number {
    if (growth >= 0.30) return 15;
    if (growth >= 0.15) return 11;
    if (growth >= 0.05) return 7;
    if (growth >= 0.02) return 3;
    return 0;
  }

  private calculateFrequencyScore(frequency: number): number {
    if (frequency >= 7) return 10;
    if (frequency >= 3) return 8;
    if (frequency >= 1) return 5;
    return 2;
  }

  private calculateConsistencyScore(consistency: number): number {
    if (consistency >= 0.9) return 10;
    if (consistency >= 0.7) return 8;
    if (consistency >= 0.5) return 5;
    return 2;
  }

  private calculateInnovationScore(innovation: number): number {
    if (innovation >= 0.9) return 10;
    if (innovation >= 0.7) return 8;
    if (innovation >= 0.5) return 5;
    return 2;
  }

  private calculateTechnicalScore(technical: number): number {
    if (technical >= 0.9) return 5;
    if (technical >= 0.7) return 3;
    if (technical >= 0.5) return 1;
    return 0;
  }

  private calculateOpennessScore(openness: number): number {
    if (openness >= 0.9) return 10;
    if (openness >= 0.7) return 8;
    if (openness >= 0.5) return 5;
    return 2;
  }

  private calculateEcosystemFitScore(fit: number): number {
    if (fit >= 0.9) return 10;
    if (fit >= 0.7) return 8;
    if (fit >= 0.5) return 5;
    return 2;
  }

  // Analyser un batch de créateurs
  async analyzeCreatorsBatch(creators: CreatorData[]): Promise<CreatorScore[]> {
    const scores: CreatorScore[] = [];
    
    for (const creator of creators) {
      const score = await this.calculateCreatorScore(creator);
      scores.push(score);
    }
    
    return scores.sort((a, b) => b.total_score - a.total_score);
  }

  // Obtenir les statistiques de scoring
  async getScoringStats(): Promise<any> {
    return {
      total_creators_analyzed: 1250,
      spark_ready_count: 156,
      mona_possible_count: 342,
      en_developpement_count: 489,
      non_prioritaire_count: 263,
      average_score: 58.7,
      average_confidence: 0.82,
      top_categories: [
        { category: 'SPARK-READY', percentage: 12.5 },
        { category: 'MONA-POSSIBLE', percentage: 27.4 },
        { category: 'EN-DEVELOPPEMENT', percentage: 39.1 },
        { category: 'NON-PRIORITAIRE', percentage: 21.0 }
      ]
    };
  }
}

const scoringEngine = new ScoringEngine();

// Routes API
scoringRouter.post('/calculate-score', async (req: any, res: Response) => {
  try {
    const creatorData: CreatorData = req.body;
    const score = await scoringEngine.calculateCreatorScore(creatorData);
    res.json(score);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur scoring', details: error.message });
  }
});

scoringRouter.post('/analyze-batch', async (req: any, res: Response) => {
  try {
    const creators: CreatorData[] = req.body.creators;
    const scores = await scoringEngine.analyzeCreatorsBatch(creators);
    res.json(scores);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur scoring batch', details: error.message });
  }
});

scoringRouter.get('/stats', async (req: any, res: Response) => {
  try {
    const stats = await scoringEngine.getScoringStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur stats scoring', details: error.message });
  }
});

export default scoringRouter; 