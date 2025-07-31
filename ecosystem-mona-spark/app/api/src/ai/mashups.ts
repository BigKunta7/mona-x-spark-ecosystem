import { Router, Response } from 'express';

const mashupsRouter = Router();

// Types pour les mashups AI
interface Creator {
  id: number;
  name: string;
  genre: string;
  style: string[];
  skills: string[];
  followers: number;
  engagement: number;
  location: string;
  availability: string;
  goals: string[];
}

interface Event {
  id: number;
  name: string;
  type: 'festival' | 'residence' | 'popup' | 'workshop';
  location: string;
  capacity: number;
  budget: number;
  target_audience: string[];
  creators: Creator[];
}

interface Collaboration {
  id: string;
  creators: Creator[];
  project_title: string;
  project_type: 'music' | 'visual' | 'multimedia' | 'event';
  description: string;
  estimated_duration: string;
  budget_estimate: number;
  success_probability: number;
  innovation_score: number;
  market_potential: number;
  ai_recommendations: string[];
}

interface HybridEvent {
  id: string;
  base_events: Event[];
  hybrid_name: string;
  hybrid_type: 'festival-residence' | 'popup-workshop' | 'multi-location';
  description: string;
  estimated_capacity: number;
  budget_estimate: number;
  success_probability: number;
  unique_value_proposition: string;
  target_audience_expanded: string[];
  ai_optimizations: string[];
}

interface InvestmentOpportunity {
  id: string;
  creator: Creator;
  investor_profile: string;
  investment_type: 'direct' | 'crowdfunding' | 'sponsorship';
  amount_range: { min: number; max: number };
  expected_roi: number;
  risk_level: 'low' | 'medium' | 'high';
  timeline: string;
  success_probability: number;
  ai_insights: string[];
}

// Service AI Mashups
class AIMashupService {
  // Génération de collaborations créatives
  async generateCreativeMashup(creatorA: Creator, creatorB: Creator): Promise<Collaboration> {
    const compatibility_score = this.calculateCreatorCompatibility(creatorA, creatorB);
    const innovation_potential = this.analyzeInnovationPotential(creatorA, creatorB);
    const market_opportunity = this.analyzeMarketOpportunity(creatorA, creatorB);
    
    const success_probability = (compatibility_score + innovation_potential + market_opportunity) / 3;
    
    const project_type = this.determineOptimalProjectType(creatorA, creatorB);
    const project_title = this.generateProjectTitle(creatorA, creatorB, project_type);
    
    return {
      id: `mashup_${creatorA.id}_${creatorB.id}`,
      creators: [creatorA, creatorB],
      project_title,
      project_type,
      description: this.generateProjectDescription(creatorA, creatorB, project_type),
      estimated_duration: this.estimateProjectDuration(project_type),
      budget_estimate: this.estimateProjectBudget(creatorA, creatorB, project_type),
      success_probability,
      innovation_score: innovation_potential,
      market_potential: market_opportunity,
      ai_recommendations: this.generateAIRecommendations(creatorA, creatorB, project_type)
    };
  }

  // Génération de mashups d'événements
  async generateEventMashup(eventA: Event, eventB: Event): Promise<HybridEvent> {
    const compatibility_score = this.calculateEventCompatibility(eventA, eventB);
    const synergy_potential = this.analyzeEventSynergy(eventA, eventB);
    const market_expansion = this.analyzeMarketExpansion(eventA, eventB);
    
    const success_probability = (compatibility_score + synergy_potential + market_expansion) / 3;
    
    const hybrid_type = this.determineHybridType(eventA, eventB);
    const hybrid_name = this.generateHybridEventName(eventA, eventB);
    
    return {
      id: `hybrid_${eventA.id}_${eventB.id}`,
      base_events: [eventA, eventB],
      hybrid_name,
      hybrid_type,
      description: this.generateHybridDescription(eventA, eventB, hybrid_type),
      estimated_capacity: this.estimateHybridCapacity(eventA, eventB),
      budget_estimate: this.estimateHybridBudget(eventA, eventB),
      success_probability,
      unique_value_proposition: this.generateUniqueValueProposition(eventA, eventB),
      target_audience_expanded: this.expandTargetAudience(eventA, eventB),
      ai_optimizations: this.generateAIOptimizations(eventA, eventB, hybrid_type)
    };
  }

  // Génération d'opportunités d'investissement mashup
  async generateInvestmentMashup(creator: Creator, investor_profile: string): Promise<InvestmentOpportunity> {
    const investment_fit = this.analyzeInvestmentFit(creator, investor_profile);
    const market_timing = this.analyzeMarketTiming(creator);
    const growth_potential = this.analyzeGrowthPotential(creator);
    
    const success_probability = (investment_fit + market_timing + growth_potential) / 3;
    
    const investment_type = this.determineOptimalInvestmentType(creator, investor_profile);
    const amount_range = this.calculateInvestmentRange(creator, investment_type);
    
    return {
      id: `investment_${creator.id}_${investor_profile}`,
      creator,
      investor_profile,
      investment_type,
      amount_range,
      expected_roi: this.calculateExpectedROI(creator, investment_type),
      risk_level: this.assessRiskLevel(creator, investment_type),
      timeline: this.estimateInvestmentTimeline(creator, investment_type),
      success_probability,
      ai_insights: this.generateInvestmentInsights(creator, investment_type)
    };
  }

  // Méthodes d'analyse privées
  private calculateCreatorCompatibility(creatorA: Creator, creatorB: Creator): number {
    const skill_complementarity = this.analyzeSkillComplementarity(creatorA, creatorB);
    const style_compatibility = this.analyzeStyleCompatibility(creatorA, creatorB);
    const location_synergy = this.analyzeLocationSynergy(creatorA, creatorB);
    const availability_match = this.analyzeAvailabilityMatch(creatorA, creatorB);
    
    return (skill_complementarity + style_compatibility + location_synergy + availability_match) / 4;
  }

  private analyzeInnovationPotential(creatorA: Creator, creatorB: Creator): number {
    const genre_fusion = this.analyzeGenreFusion(creatorA, creatorB);
    const skill_diversity = this.analyzeSkillDiversity(creatorA, creatorB);
    const audience_crossover = this.analyzeAudienceCrossover(creatorA, creatorB);
    
    return (genre_fusion + skill_diversity + audience_crossover) / 3;
  }

  private analyzeMarketOpportunity(creatorA: Creator, creatorB: Creator): number {
    const combined_followers = creatorA.followers + creatorB.followers;
    const engagement_multiplier = (creatorA.engagement + creatorB.engagement) / 2;
    const market_trend = this.getMarketTrend();
    
    return Math.min((combined_followers / 10000 + engagement_multiplier / 1000 + market_trend) / 3, 1);
  }

  private calculateEventCompatibility(eventA: Event, eventB: Event): number {
    const location_compatibility = eventA.location === eventB.location ? 0.9 : 0.4;
    const audience_overlap = this.calculateAudienceOverlap(eventA, eventB);
    const timing_compatibility = this.analyzeTimingCompatibility(eventA, eventB);
    
    return (location_compatibility + audience_overlap + timing_compatibility) / 3;
  }

  private analyzeEventSynergy(eventA: Event, eventB: Event): number {
    const type_synergy = this.analyzeTypeSynergy(eventA.type, eventB.type);
    const capacity_optimization = this.analyzeCapacityOptimization(eventA, eventB);
    const budget_efficiency = this.analyzeBudgetEfficiency(eventA, eventB);
    
    return (type_synergy + capacity_optimization + budget_efficiency) / 3;
  }

  private analyzeMarketExpansion(eventA: Event, eventB: Event): number {
    const audience_expansion = this.calculateAudienceExpansion(eventA, eventB);
    const geographic_reach = this.analyzeGeographicReach(eventA, eventB);
    const brand_synergy = this.analyzeBrandSynergy(eventA, eventB);
    
    return (audience_expansion + geographic_reach + brand_synergy) / 3;
  }

  private analyzeInvestmentFit(creator: Creator, investor_profile: string): number {
    const risk_tolerance_match = this.analyzeRiskToleranceMatch(creator, investor_profile);
    const investment_horizon_match = this.analyzeInvestmentHorizonMatch(creator, investor_profile);
    const return_expectation_match = this.analyzeReturnExpectationMatch(creator, investor_profile);
    
    return (risk_tolerance_match + investment_horizon_match + return_expectation_match) / 3;
  }

  private analyzeMarketTiming(creator: Creator): number {
    const genre_trend = this.getGenreTrend(creator.genre);
    const seasonal_factor = this.getSeasonalFactor();
    const competition_level = this.getCompetitionLevel(creator.genre);
    
    return (genre_trend + seasonal_factor + (1 - competition_level)) / 3;
  }

  private analyzeGrowthPotential(creator: Creator): number {
    const follower_growth_rate = creator.followers > 10000 ? 0.9 : 0.5;
    const engagement_trend = creator.engagement > 500 ? 0.8 : 0.4;
    const market_position = this.getMarketPosition(creator.genre);
    
    return (follower_growth_rate + engagement_trend + market_position) / 3;
  }

  // Méthodes utilitaires
  private determineOptimalProjectType(creatorA: Creator, creatorB: Creator): 'music' | 'visual' | 'multimedia' | 'event' {
    const music_skills = creatorA.skills.includes('music') || creatorB.skills.includes('music');
    const visual_skills = creatorA.skills.includes('visual') || creatorB.skills.includes('visual');
    const event_skills = creatorA.skills.includes('event') || creatorB.skills.includes('event');
    
    if (music_skills && visual_skills) return 'multimedia';
    if (music_skills) return 'music';
    if (visual_skills) return 'visual';
    if (event_skills) return 'event';
    return 'multimedia';
  }

  private generateProjectTitle(creatorA: Creator, creatorB: Creator, project_type: string): string {
    const titles = {
      'music': `${creatorA.name} x ${creatorB.name} - Fusion Musicale`,
      'visual': `${creatorA.name} x ${creatorB.name} - Collaboration Visuelle`,
      'multimedia': `${creatorA.name} x ${creatorB.name} - Expérience Multimédia`,
      'event': `${creatorA.name} x ${creatorB.name} - Événement Collaboratif`
    };
    return titles[project_type as keyof typeof titles] || titles.multimedia;
  }

  private generateProjectDescription(creatorA: Creator, creatorB: Creator, project_type: string): string {
    return `Collaboration innovante entre ${creatorA.name} et ${creatorB.name} pour créer une ${project_type === 'music' ? 'fusion musicale unique' : project_type === 'visual' ? 'expérience visuelle immersive' : project_type === 'multimedia' ? 'expérience multimédia révolutionnaire' : 'événement collaboratif mémorable'}.`;
  }

  private estimateProjectDuration(project_type: string): string {
    const durations = {
      'music': '2-3 mois',
      'visual': '1-2 mois',
      'multimedia': '3-4 mois',
      'event': '1 mois'
    };
    return durations[project_type as keyof typeof durations] || '2-3 mois';
  }

  private estimateProjectBudget(creatorA: Creator, creatorB: Creator, project_type: string): number {
    const base_budget = creatorA.followers + creatorB.followers;
    const multipliers = {
      'music': 0.5,
      'visual': 0.3,
      'multimedia': 1.0,
      'event': 0.8
    };
    return Math.round(base_budget * (multipliers[project_type as keyof typeof multipliers] || 0.5));
  }

  private generateAIRecommendations(creatorA: Creator, creatorB: Creator, project_type: string): string[] {
    return [
      'Lancer une campagne de pré-promotion sur les réseaux sociaux',
      'Créer du contenu behind-the-scenes pour l\'engagement',
      'Planifier une stratégie de distribution multi-plateforme',
      'Optimiser le timing de sortie pour maximiser l\'impact'
    ];
  }

  private determineHybridType(eventA: Event, eventB: Event): 'festival-residence' | 'popup-workshop' | 'multi-location' {
    if (eventA.type === 'festival' && eventB.type === 'residence') return 'festival-residence';
    if (eventA.type === 'popup' && eventB.type === 'workshop') return 'popup-workshop';
    return 'multi-location';
  }

  private generateHybridEventName(eventA: Event, eventB: Event): string {
    return `${eventA.name} x ${eventB.name} - Expérience Hybride`;
  }

  private generateHybridDescription(eventA: Event, eventB: Event, hybrid_type: string): string {
    return `Fusion innovante entre ${eventA.name} et ${eventB.name} pour créer une expérience ${hybrid_type === 'festival-residence' ? 'festival-résidence immersive' : hybrid_type === 'popup-workshop' ? 'popup-workshop interactive' : 'multi-location unique'}.`;
  }

  private estimateHybridCapacity(eventA: Event, eventB: Event): number {
    return Math.round((eventA.capacity + eventB.capacity) * 0.8);
  }

  private estimateHybridBudget(eventA: Event, eventB: Event): number {
    return Math.round((eventA.budget + eventB.budget) * 0.9);
  }

  private generateUniqueValueProposition(eventA: Event, eventB: Event): string {
    return `Expérience unique combinant ${eventA.type} et ${eventB.type} pour maximiser l'engagement et l'impact.`;
  }

  private expandTargetAudience(eventA: Event, eventB: Event): string[] {
    const combined_audience = [...eventA.target_audience, ...eventB.target_audience];
    return [...new Set(combined_audience)];
  }

  private generateAIOptimizations(eventA: Event, eventB: Event, hybrid_type: string): string[] {
    return [
      'Optimiser le timing pour maximiser l\'audience',
      'Créer une stratégie de promotion cross-platform',
      'Planifier des moments d\'engagement interactifs',
      'Optimiser le budget pour le meilleur ROI'
    ];
  }

  private determineOptimalInvestmentType(creator: Creator, investor_profile: string): 'direct' | 'crowdfunding' | 'sponsorship' {
    if (creator.followers > 50000) return 'sponsorship';
    if (creator.followers > 10000) return 'crowdfunding';
    return 'direct';
  }

  private calculateInvestmentRange(creator: Creator, investment_type: string): { min: number; max: number } {
    const base_amount = creator.followers * 0.1;
    const multipliers = {
      'direct': { min: 0.5, max: 1.0 },
      'crowdfunding': { min: 1.0, max: 2.0 },
      'sponsorship': { min: 2.0, max: 5.0 }
    };
    const multiplier = multipliers[investment_type as keyof typeof multipliers] || { min: 1.0, max: 1.5 };
    return {
      min: Math.round(base_amount * multiplier.min),
      max: Math.round(base_amount * multiplier.max)
    };
  }

  private calculateExpectedROI(creator: Creator, investment_type: string): number {
    const base_roi = creator.engagement / 1000;
    const multipliers = {
      'direct': 1.2,
      'crowdfunding': 1.5,
      'sponsorship': 2.0
    };
    return Math.min(base_roi * (multipliers[investment_type as keyof typeof multipliers] || 1.0), 0.5);
  }

  private assessRiskLevel(creator: Creator, investment_type: string): 'low' | 'medium' | 'high' {
    if (creator.followers > 50000) return 'low';
    if (creator.followers > 10000) return 'medium';
    return 'high';
  }

  private estimateInvestmentTimeline(creator: Creator, investment_type: string): string {
    const timelines = {
      'direct': '3-6 mois',
      'crowdfunding': '6-12 mois',
      'sponsorship': '12-24 mois'
    };
    return timelines[investment_type as keyof typeof timelines] || '6-12 mois';
  }

  private generateInvestmentInsights(creator: Creator, investment_type: string): string[] {
    return [
      `Potentiel de croissance: ${creator.followers > 10000 ? 'Élevé' : 'Modéré'}`,
      `Engagement audience: ${creator.engagement > 500 ? 'Excellent' : 'À améliorer'}`,
      `Type d'investissement optimal: ${investment_type}`,
      'Recommandation: Suivre les métriques d\'engagement pour optimiser le ROI'
    ];
  }

  // Méthodes d'analyse complémentaires (simulées)
  private analyzeSkillComplementarity(creatorA: Creator, creatorB: Creator): number {
    const skillsA = new Set(creatorA.skills);
    const skillsB = new Set(creatorB.skills);
    const intersection = new Set([...skillsA].filter(x => skillsB.has(x)));
    const union = new Set([...skillsA, ...skillsB]);
    return intersection.size / union.size;
  }

  private analyzeStyleCompatibility(creatorA: Creator, creatorB: Creator): number {
    const stylesA = new Set(creatorA.style);
    const stylesB = new Set(creatorB.style);
    const intersection = new Set([...stylesA].filter(x => stylesB.has(x)));
    return Math.min(intersection.size / Math.max(stylesA.size, stylesB.size), 1);
  }

  private analyzeLocationSynergy(creatorA: Creator, creatorB: Creator): number {
    return creatorA.location === creatorB.location ? 0.9 : 0.4;
  }

  private analyzeAvailabilityMatch(creatorA: Creator, creatorB: Creator): number {
    return creatorA.availability === creatorB.availability ? 0.9 : 0.5;
  }

  private analyzeGenreFusion(creatorA: Creator, creatorB: Creator): number {
    return creatorA.genre === creatorB.genre ? 0.7 : 0.9; // Différents genres = plus innovant
  }

  private analyzeSkillDiversity(creatorA: Creator, creatorB: Creator): number {
    const allSkills = new Set([...creatorA.skills, ...creatorB.skills]);
    return Math.min(allSkills.size / 10, 1);
  }

  private analyzeAudienceCrossover(creatorA: Creator, creatorB: Creator): number {
    const audience_overlap = Math.abs(creatorA.followers - creatorB.followers) / Math.max(creatorA.followers, creatorB.followers);
    return 1 - audience_overlap;
  }

  private calculateAudienceOverlap(eventA: Event, eventB: Event): number {
    const audienceA = new Set(eventA.target_audience);
    const audienceB = new Set(eventB.target_audience);
    const intersection = new Set([...audienceA].filter(x => audienceB.has(x)));
    const union = new Set([...audienceA, ...audienceB]);
    return intersection.size / union.size;
  }

  private analyzeTimingCompatibility(eventA: Event, eventB: Event): number {
    return 0.7; // Simulé
  }

  private analyzeTypeSynergy(typeA: string, typeB: string): number {
    const synergies = {
      'festival-residence': 0.9,
      'popup-workshop': 0.8,
      'festival-popup': 0.7,
      'residence-workshop': 0.6
    };
    const key = `${typeA}-${typeB}`;
    return synergies[key as keyof typeof synergies] || 0.5;
  }

  private analyzeCapacityOptimization(eventA: Event, eventB: Event): number {
    const total_capacity = eventA.capacity + eventB.capacity;
    return total_capacity > 200 ? 0.9 : 0.6;
  }

  private analyzeBudgetEfficiency(eventA: Event, eventB: Event): number {
    const total_budget = eventA.budget + eventB.budget;
    return total_budget > 10000 ? 0.9 : 0.6;
  }

  private calculateAudienceExpansion(eventA: Event, eventB: Event): number {
    const audienceA = new Set(eventA.target_audience);
    const audienceB = new Set(eventB.target_audience);
    const union = new Set([...audienceA, ...audienceB]);
    return Math.min(union.size / 20, 1);
  }

  private analyzeGeographicReach(eventA: Event, eventB: Event): number {
    return eventA.location === eventB.location ? 0.6 : 0.9;
  }

  private analyzeBrandSynergy(eventA: Event, eventB: Event): number {
    return 0.8; // Simulé
  }

  private analyzeRiskToleranceMatch(creator: Creator, investor_profile: string): number {
    return 0.7; // Simulé
  }

  private analyzeInvestmentHorizonMatch(creator: Creator, investor_profile: string): number {
    return 0.8; // Simulé
  }

  private analyzeReturnExpectationMatch(creator: Creator, investor_profile: string): number {
    return 0.6; // Simulé
  }

  private getGenreTrend(genre: string): number {
    const trends = {
      'hip-hop': 0.9, 'pop': 0.8, 'electronic': 0.7, 'rock': 0.6, 'jazz': 0.5
    };
    return trends[genre as keyof typeof trends] || 0.6;
  }

  private getSeasonalFactor(): number {
    return 0.7; // Simulé
  }

  private getCompetitionLevel(genre: string): number {
    const levels = {
      'hip-hop': 0.8, 'pop': 0.9, 'electronic': 0.6, 'rock': 0.5, 'jazz': 0.3
    };
    return levels[genre as keyof typeof levels] || 0.6;
  }

  private getMarketPosition(genre: string): number {
    return 0.7; // Simulé
  }

  private getMarketTrend(): number {
    return 0.8; // Simulé
  }
}

const aiMashupService = new AIMashupService();

// Routes API
mashupsRouter.post('/creative-mashup', async (req: any, res: Response) => {
  try {
    const { creatorA, creatorB } = req.body;
    const collaboration = await aiMashupService.generateCreativeMashup(creatorA, creatorB);
    res.json(collaboration);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur AI mashup', details: error.message });
  }
});

mashupsRouter.post('/event-mashup', async (req: any, res: Response) => {
  try {
    const { eventA, eventB } = req.body;
    const hybridEvent = await aiMashupService.generateEventMashup(eventA, eventB);
    res.json(hybridEvent);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur AI mashup', details: error.message });
  }
});

mashupsRouter.post('/investment-mashup', async (req: any, res: Response) => {
  try {
    const { creator, investor_profile } = req.body;
    const opportunity = await aiMashupService.generateInvestmentMashup(creator, investor_profile);
    res.json(opportunity);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur AI mashup', details: error.message });
  }
});

export default mashupsRouter; 