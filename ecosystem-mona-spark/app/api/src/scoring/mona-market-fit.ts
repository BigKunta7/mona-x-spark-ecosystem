import { Router, Response } from 'express';

const monaMarketFitRouter = Router();

// Types pour la méthodologie Mona Market Fit
interface MonaMarketFitData {
  id: string;
  name: string;
  genre: string;
  target_audience: string[];
  market_positioning: string;
  competitive_advantage: string[];
  revenue_streams: string[];
  growth_potential: number;
  market_size: number;
  market_maturity: number;
  audience_fit: number;
  monetization_readiness: number;
  scalability_potential: number;
}

interface MonaMarketFitScore {
  artist_id: string;
  market_fit_score: number;
  category: 'MARKET-READY' | 'MARKET-FIT' | 'MARKET-DEVELOPMENT' | 'MARKET-RESEARCH';
  confidence_level: number;
  breakdown: MarketFitBreakdown;
  recommendations: string[];
  funnel_stage: FunnelStage;
  next_actions: string[];
  last_updated: Date;
}

interface MarketFitBreakdown {
  audience_alignment: {
    target_fit: number;
    audience_size: number;
    engagement_potential: number;
    total: number;
  };
  market_opportunity: {
    market_size: number;
    competition_level: number;
    growth_potential: number;
    total: number;
  };
  monetization_readiness: {
    revenue_streams: number;
    pricing_power: number;
    scalability: number;
    total: number;
  };
  competitive_positioning: {
    differentiation: number;
    brand_strength: number;
    market_position: number;
    total: number;
  };
}

type FunnelStage = 
  | 'MARKET_DISCOVERY'
  | 'AUDIENCE_VALIDATION'
  | 'PRODUCT_MARKET_FIT'
  | 'SCALE_READY'
  | 'MARKET_DOMINANCE';

// Service Mona Market Fit
class MonaMarketFitEngine {
  
  // Calculer le score Mona Market Fit complet
  async calculateMarketFitScore(artistData: MonaMarketFitData): Promise<MonaMarketFitScore> {
    const breakdown = this.calculateMarketFitBreakdown(artistData);
    const market_fit_score = this.calculateTotalMarketFitScore(breakdown);
    const category = this.determineMarketFitCategory(market_fit_score);
    const confidence_level = this.calculateMarketFitConfidence(artistData);
    const funnel_stage = this.determineFunnelStage(artistData, breakdown);
    const recommendations = this.generateMarketFitRecommendations(artistData, breakdown);
    const next_actions = this.generateNextActions(funnel_stage, breakdown);

    return {
      artist_id: artistData.id,
      market_fit_score,
      category,
      confidence_level,
      breakdown,
      recommendations,
      funnel_stage,
      next_actions,
      last_updated: new Date()
    };
  }

  // Calculer la décomposition du score Market Fit
  private calculateMarketFitBreakdown(artist: MonaMarketFitData): MarketFitBreakdown {
    return {
      audience_alignment: {
        target_fit: this.calculateTargetFitScore(artist.target_audience, artist.genre),
        audience_size: this.calculateAudienceSizeScore(artist.market_size),
        engagement_potential: this.calculateEngagementPotentialScore(artist.audience_fit),
        total: 0 // Calculé après
      },
      market_opportunity: {
        market_size: this.calculateMarketSizeScore(artist.market_size),
        competition_level: this.calculateCompetitionScore(artist.market_maturity),
        growth_potential: this.calculateGrowthPotentialScore(artist.growth_potential),
        total: 0 // Calculé après
      },
      monetization_readiness: {
        revenue_streams: this.calculateRevenueStreamsScore(artist.revenue_streams),
        pricing_power: this.calculatePricingPowerScore(artist.market_positioning),
        scalability: this.calculateScalabilityScore(artist.scalability_potential),
        total: 0 // Calculé après
      },
      competitive_positioning: {
        differentiation: this.calculateDifferentiationScore(artist.competitive_advantage),
        brand_strength: this.calculateBrandStrengthScore(artist.market_positioning),
        market_position: this.calculateMarketPositionScore(artist.market_maturity),
        total: 0 // Calculé après
      }
    };
  }

  // Calculer le score total Market Fit
  private calculateTotalMarketFitScore(breakdown: MarketFitBreakdown): number {
    const audienceTotal = breakdown.audience_alignment.target_fit + 
                         breakdown.audience_alignment.audience_size + 
                         breakdown.audience_alignment.engagement_potential;
    
    const marketTotal = breakdown.market_opportunity.market_size + 
                       breakdown.market_opportunity.competition_level + 
                       breakdown.market_opportunity.growth_potential;
    
    const monetizationTotal = breakdown.monetization_readiness.revenue_streams + 
                              breakdown.monetization_readiness.pricing_power + 
                              breakdown.monetization_readiness.scalability;
    
    const competitiveTotal = breakdown.competitive_positioning.differentiation + 
                            breakdown.competitive_positioning.brand_strength + 
                            breakdown.competitive_positioning.market_position;

    // Mettre à jour les totaux
    breakdown.audience_alignment.total = audienceTotal;
    breakdown.market_opportunity.total = marketTotal;
    breakdown.monetization_readiness.total = monetizationTotal;
    breakdown.competitive_positioning.total = competitiveTotal;

    return (audienceTotal + marketTotal + monetizationTotal + competitiveTotal) / 4;
  }

  // Déterminer la catégorie Market Fit
  private determineMarketFitCategory(score: number): 'MARKET-READY' | 'MARKET-FIT' | 'MARKET-DEVELOPMENT' | 'MARKET-RESEARCH' {
    if (score >= 85) return 'MARKET-READY';
    if (score >= 70) return 'MARKET-FIT';
    if (score >= 50) return 'MARKET-DEVELOPMENT';
    return 'MARKET-RESEARCH';
  }

  // Déterminer l'étape du funnel
  private determineFunnelStage(artist: MonaMarketFitData, breakdown: MarketFitBreakdown): FunnelStage {
    const audienceScore = breakdown.audience_alignment.total;
    const marketScore = breakdown.market_opportunity.total;
    const monetizationScore = breakdown.monetization_readiness.total;

    if (audienceScore < 30) return 'MARKET_DISCOVERY';
    if (audienceScore < 60) return 'AUDIENCE_VALIDATION';
    if (marketScore < 70) return 'PRODUCT_MARKET_FIT';
    if (monetizationScore < 80) return 'SCALE_READY';
    return 'MARKET_DOMINANCE';
  }

  // Calculer le niveau de confiance
  private calculateMarketFitConfidence(artist: MonaMarketFitData): number {
    const dataCompleteness = this.calculateDataCompleteness(artist);
    const marketDataQuality = this.calculateMarketDataQuality(artist);
    return (dataCompleteness + marketDataQuality) / 2;
  }

  // Générer les recommandations Market Fit
  private generateMarketFitRecommendations(artist: MonaMarketFitData, breakdown: MarketFitBreakdown): string[] {
    const recommendations: string[] = [];

    if (breakdown.audience_alignment.total < 60) {
      recommendations.push('Affiner le ciblage de l\'audience cible');
      recommendations.push('Conduire des études de marché approfondies');
    }

    if (breakdown.market_opportunity.total < 60) {
      recommendations.push('Identifier des niches de marché sous-exploitées');
      recommendations.push('Analyser la concurrence pour se différencier');
    }

    if (breakdown.monetization_readiness.total < 60) {
      recommendations.push('Diversifier les sources de revenus');
      recommendations.push('Optimiser la stratégie de pricing');
    }

    if (breakdown.competitive_positioning.total < 60) {
      recommendations.push('Renforcer l\'identité de marque unique');
      recommendations.push('Développer des avantages concurrentiels clairs');
    }

    return recommendations;
  }

  // Générer les prochaines actions selon l'étape du funnel
  private generateNextActions(funnelStage: FunnelStage, breakdown: MarketFitBreakdown): string[] {
    const actions: { [key in FunnelStage]: string[] } = {
      MARKET_DISCOVERY: [
        'Conduire des interviews d\'audience',
        'Analyser les tendances du marché',
        'Identifier les segments d\'audience potentiels'
      ],
      AUDIENCE_VALIDATION: [
        'Tester des contenus avec différents segments',
        'Mesurer l\'engagement par audience',
        'Affiner le message de marque'
      ],
      PRODUCT_MARKET_FIT: [
        'Optimiser l\'offre selon les retours',
        'Développer des partenariats stratégiques',
        'Préparer la stratégie de scale'
      ],
      SCALE_READY: [
        'Automatiser les processus',
        'Développer l\'équipe',
        'Préparer les investissements'
      ],
      MARKET_DOMINANCE: [
        'Acquérir des concurrents',
        'Expanser vers de nouveaux marchés',
        'Développer des produits adjacents'
      ]
    };

    return actions[funnelStage] || [];
  }

  // Méthodes de calcul des scores individuels
  private calculateTargetFitScore(targetAudience: string[], genre: string): number {
    // Logique de scoring basée sur l'alignement audience/genre
    return Math.min(100, targetAudience.length * 20 + (genre ? 30 : 0));
  }

  private calculateAudienceSizeScore(marketSize: number): number {
    return Math.min(100, marketSize / 1000000 * 100);
  }

  private calculateEngagementPotentialScore(audienceFit: number): number {
    return audienceFit;
  }

  private calculateMarketSizeScore(marketSize: number): number {
    return Math.min(100, marketSize / 5000000 * 100);
  }

  private calculateCompetitionScore(marketMaturity: number): number {
    return Math.max(0, 100 - marketMaturity);
  }

  private calculateGrowthPotentialScore(growthPotential: number): number {
    return growthPotential;
  }

  private calculateRevenueStreamsScore(revenueStreams: string[]): number {
    return Math.min(100, revenueStreams.length * 25);
  }

  private calculatePricingPowerScore(marketPositioning: string): number {
    return marketPositioning.includes('premium') ? 80 : 50;
  }

  private calculateScalabilityScore(scalabilityPotential: number): number {
    return scalabilityPotential;
  }

  private calculateDifferentiationScore(competitiveAdvantage: string[]): number {
    return Math.min(100, competitiveAdvantage.length * 30);
  }

  private calculateBrandStrengthScore(marketPositioning: string): number {
    return marketPositioning.length > 20 ? 70 : 40;
  }

  private calculateMarketPositionScore(marketMaturity: number): number {
    return Math.max(0, 100 - marketMaturity);
  }

  private calculateDataCompleteness(artist: MonaMarketFitData): number {
    const fields = Object.keys(artist).length;
    const filledFields = Object.values(artist).filter(v => v !== null && v !== undefined && v !== '').length;
    return (filledFields / fields) * 100;
  }

  private calculateMarketDataQuality(artist: MonaMarketFitData): number {
    return artist.market_size > 0 && artist.growth_potential > 0 ? 80 : 40;
  }

  // Analyser un batch d'artistes
  async analyzeArtistsBatch(artists: MonaMarketFitData[]): Promise<MonaMarketFitScore[]> {
    return Promise.all(artists.map(artist => this.calculateMarketFitScore(artist)));
  }

  // Obtenir les statistiques Market Fit
  async getMarketFitStats(): Promise<any> {
    return {
      total_analyzed: 0,
      market_ready_count: 0,
      market_fit_count: 0,
      market_development_count: 0,
      market_research_count: 0,
      average_score: 0
    };
  }
}

// Routes API
monaMarketFitRouter.post('/analyze', async (req, res) => {
  try {
    const engine = new MonaMarketFitEngine();
    const score = await engine.calculateMarketFitScore(req.body);
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'analyse Market Fit' });
  }
});

monaMarketFitRouter.post('/analyze-batch', async (req, res) => {
  try {
    const engine = new MonaMarketFitEngine();
    const scores = await engine.analyzeArtistsBatch(req.body);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'analyse batch' });
  }
});

monaMarketFitRouter.get('/stats', async (req, res) => {
  try {
    const engine = new MonaMarketFitEngine();
    const stats = await engine.getMarketFitStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des stats' });
  }
});

export { monaMarketFitRouter, MonaMarketFitEngine }; 