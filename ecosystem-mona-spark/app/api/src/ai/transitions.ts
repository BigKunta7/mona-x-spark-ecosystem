import { Router, Response } from 'express';

const transitionsRouter = Router();

// Types pour les transitions AI
interface Creator {
  id: number;
  name: string;
  genre: string;
  location: string;
  followers: number;
  engagement: number;
  style: string[];
  skills: string[];
  availability: string;
  goals: string[];
}

interface Project {
  id: number;
  title: string;
  type: 'music' | 'visual' | 'event' | 'collaboration';
  requirements: string[];
  budget: number;
  timeline: string;
  target_audience: string[];
}

interface Event {
  id: number;
  name: string;
  type: 'festival' | 'residence' | 'popup' | 'workshop';
  location: string;
  capacity: number;
  budget: number;
  target_creators: string[];
}

interface Investment {
  id: number;
  amount: number;
  type: 'direct' | 'crowdfunding' | 'sponsorship';
  investor_id: number;
  creator_id: number;
  expected_roi: number;
}

interface Transition {
  id: string;
  from_type: 'creator' | 'project' | 'event' | 'investment';
  to_type: 'creator' | 'project' | 'event' | 'investment';
  from_id: number;
  to_id: number;
  confidence_score: number;
  optimization_reasons: string[];
  ai_suggestions: string[];
  predicted_success_rate: number;
}

// Service AI Transitions
class AITransitionService {
  // Optimisation des transitions créateur → projet
  async optimizeCreatorToProjectTransition(creator: Creator, project: Project): Promise<Transition> {
    const compatibility_score = this.calculateCompatibility(creator, project);
    const market_demand = this.analyzeMarketDemand(creator, project);
    const timing_optimization = this.optimizeTiming(creator, project);
    
    const confidence_score = (compatibility_score + market_demand + timing_optimization) / 3;
    
    return {
      id: `transition_${creator.id}_${project.id}`,
      from_type: 'creator',
      to_type: 'project',
      from_id: creator.id,
      to_id: project.id,
      confidence_score,
      optimization_reasons: [
        `Compatibilité créateur-projet: ${(compatibility_score * 100).toFixed(1)}%`,
        `Demande marché: ${(market_demand * 100).toFixed(1)}%`,
        `Optimisation timing: ${(timing_optimization * 100).toFixed(1)}%`
      ],
      ai_suggestions: [
        'Suggérer une collaboration avec un créateur complémentaire',
        'Optimiser le budget pour maximiser l\'impact',
        'Planifier une campagne de promotion ciblée'
      ],
      predicted_success_rate: confidence_score * 0.9
    };
  }

  // Optimisation des transitions événement → investissement
  async optimizeEventToInvestmentTransition(event: Event, investment: Investment): Promise<Transition> {
    const event_success_potential = this.analyzeEventSuccess(event);
    const investment_roi_potential = this.analyzeInvestmentROI(investment);
    const market_timing = this.analyzeMarketTiming(event, investment);
    
    const confidence_score = (event_success_potential + investment_roi_potential + market_timing) / 3;
    
    return {
      id: `transition_${event.id}_${investment.id}`,
      from_type: 'event',
      to_type: 'investment',
      from_id: event.id,
      to_id: investment.id,
      confidence_score,
      optimization_reasons: [
        `Potentiel succès événement: ${(event_success_potential * 100).toFixed(1)}%`,
        `Potentiel ROI investissement: ${(investment_roi_potential * 100).toFixed(1)}%`,
        `Timing marché optimal: ${(market_timing * 100).toFixed(1)}%`
      ],
      ai_suggestions: [
        'Optimiser la stratégie de monétisation de l\'événement',
        'Cibler les investisseurs les plus pertinents',
        'Préparer une présentation ROI détaillée'
      ],
      predicted_success_rate: confidence_score * 0.85
    };
  }

  // Optimisation des transitions géolocalisation → collaboration
  async optimizeLocationToCollaborationTransition(location: string, creators: Creator[]): Promise<Transition[]> {
    const local_network = this.analyzeLocalNetwork(location, creators);
    const collaboration_potential = this.analyzeCollaborationPotential(creators);
    const market_opportunity = this.analyzeMarketOpportunity(location);
    
    return creators.map(creator => {
      const confidence_score = (local_network + collaboration_potential + market_opportunity) / 3;
      
      return {
        id: `transition_location_${creator.id}`,
        from_type: 'creator',
        to_type: 'project',
        from_id: creator.id,
        to_id: 0, // Projet à créer
        confidence_score,
        optimization_reasons: [
          `Réseau local fort: ${(local_network * 100).toFixed(1)}%`,
          `Potentiel collaboration: ${(collaboration_potential * 100).toFixed(1)}%`,
          `Opportunité marché: ${(market_opportunity * 100).toFixed(1)}%`
        ],
        ai_suggestions: [
          'Organiser un événement de networking local',
          'Créer un projet collaboratif multi-créateurs',
          'Lancer une campagne de promotion locale'
        ],
        predicted_success_rate: confidence_score * 0.8
      };
    });
  }

  // Méthodes d'analyse privées
  private calculateCompatibility(creator: Creator, project: Project): number {
    const skill_match = creator.skills.filter(skill => 
      project.requirements.includes(skill)
    ).length / project.requirements.length;
    
    const style_match = creator.style.some(style => 
      project.target_audience.includes(style)
    ) ? 0.8 : 0.3;
    
    const availability_match = creator.availability === 'available' ? 0.9 : 0.4;
    
    return (skill_match + style_match + availability_match) / 3;
  }

  private analyzeMarketDemand(creator: Creator, project: Project): number {
    const follower_engagement = Math.min(creator.engagement / 1000, 1);
    const genre_popularity = this.getGenrePopularity(creator.genre);
    const project_innovation = this.getProjectInnovationScore(project);
    
    return (follower_engagement + genre_popularity + project_innovation) / 3;
  }

  private optimizeTiming(creator: Creator, project: Project): number {
    const creator_momentum = creator.followers > 10000 ? 0.9 : 0.5;
    const project_timeline = project.timeline === 'urgent' ? 0.8 : 0.6;
    const market_timing = this.getMarketTimingScore();
    
    return (creator_momentum + project_timeline + market_timing) / 3;
  }

  private analyzeEventSuccess(event: Event): number {
    const capacity_utilization = event.capacity > 100 ? 0.8 : 0.6;
    const budget_adequacy = event.budget > 5000 ? 0.9 : 0.5;
    const location_advantage = this.getLocationAdvantage(event.location);
    
    return (capacity_utilization + budget_adequacy + location_advantage) / 3;
  }

  private analyzeInvestmentROI(investment: Investment): number {
    const amount_adequacy = investment.amount > 1000 ? 0.8 : 0.4;
    const roi_potential = investment.expected_roi > 0.15 ? 0.9 : 0.6;
    const risk_assessment = this.getRiskAssessment(investment);
    
    return (amount_adequacy + roi_potential + risk_assessment) / 3;
  }

  private analyzeMarketTiming(event: Event, investment: Investment): number {
    const seasonal_factor = this.getSeasonalFactor();
    const market_trend = this.getMarketTrend();
    const competition_level = this.getCompetitionLevel(event.type);
    
    return (seasonal_factor + market_trend + competition_level) / 3;
  }

  private analyzeLocalNetwork(location: string, creators: Creator[]): number {
    const local_creators = creators.filter(c => c.location === location).length;
    return Math.min(local_creators / 10, 1);
  }

  private analyzeCollaborationPotential(creators: Creator[]): number {
    const diverse_skills = new Set(creators.flatMap(c => c.skills)).size;
    const complementary_styles = this.getComplementaryStyles(creators);
    const network_density = creators.length > 3 ? 0.8 : 0.4;
    
    return (diverse_skills / 10 + complementary_styles + network_density) / 3;
  }

  private analyzeMarketOpportunity(location: string): number {
    const market_size = this.getMarketSize(location);
    const competition_level = this.getCompetitionLevel('local');
    const growth_potential = this.getGrowthPotential(location);
    
    return (market_size + (1 - competition_level) + growth_potential) / 3;
  }

  // Méthodes utilitaires (simulées)
  private getGenrePopularity(genre: string): number {
    const popularity = {
      'hip-hop': 0.9, 'pop': 0.8, 'electronic': 0.7, 'rock': 0.6, 'jazz': 0.5
    };
    return popularity[genre as keyof typeof popularity] || 0.5;
  }

  private getProjectInnovationScore(project: Project): number {
    return project.type === 'collaboration' ? 0.9 : 0.6;
  }

  private getMarketTimingScore(): number {
    return 0.7; // Simulé
  }

  private getLocationAdvantage(location: string): number {
    const advantages = {
      'Paris': 0.9, 'Lyon': 0.7, 'Marseille': 0.6, 'Bordeaux': 0.5
    };
    return advantages[location as keyof typeof advantages] || 0.5;
  }

  private getRiskAssessment(investment: Investment): number {
    return investment.amount < 5000 ? 0.8 : 0.6;
  }

  private getSeasonalFactor(): number {
    return 0.7; // Simulé
  }

  private getMarketTrend(): number {
    return 0.8; // Simulé
  }

  private getCompetitionLevel(type: string): number {
    const levels = {
      'festival': 0.6, 'residence': 0.4, 'popup': 0.7, 'workshop': 0.5
    };
    return levels[type as keyof typeof levels] || 0.5;
  }

  private getComplementaryStyles(creators: Creator[]): number {
    const styles = creators.flatMap(c => c.style);
    const unique_styles = new Set(styles).size;
    return Math.min(unique_styles / creators.length, 1);
  }

  private getMarketSize(location: string): number {
    const sizes = {
      'Paris': 0.9, 'Lyon': 0.7, 'Marseille': 0.6, 'Bordeaux': 0.5
    };
    return sizes[location as keyof typeof sizes] || 0.5;
  }

  private getGrowthPotential(location: string): number {
    return 0.8; // Simulé
  }
}

const aiTransitionService = new AITransitionService();

// Routes API
transitionsRouter.post('/creator-to-project', async (req: any, res: Response) => {
  try {
    const { creator, project } = req.body;
    const transition = await aiTransitionService.optimizeCreatorToProjectTransition(creator, project);
    res.json(transition);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur AI transition', details: error.message });
  }
});

transitionsRouter.post('/event-to-investment', async (req: any, res: Response) => {
  try {
    const { event, investment } = req.body;
    const transition = await aiTransitionService.optimizeEventToInvestmentTransition(event, investment);
    res.json(transition);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur AI transition', details: error.message });
  }
});

transitionsRouter.post('/location-to-collaboration', async (req: any, res: Response) => {
  try {
    const { location, creators } = req.body;
    const transitions = await aiTransitionService.optimizeLocationToCollaborationTransition(location, creators);
    res.json(transitions);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur AI transition', details: error.message });
  }
});

export default transitionsRouter; 