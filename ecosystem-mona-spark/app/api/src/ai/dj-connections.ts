import { Router, Response } from 'express';

const djConnectionsRouter = Router();

// Types pour Plug and Play - Connexions entre créateurs
interface Creator {
  id: string;
  name: string;
  genre: string;
  style: string[];
  skills: string[];
  followers: number;
  engagement: number;
  location: string;
  availability: string;
  goals: string[];
  vibe: string; // Énergie créative
  tempo: number; // Rythme de travail (1-10)
  frequency: string; // Fréquence de création
}

interface Connection {
  id: string;
  creator_a: Creator;
  creator_b: Creator;
  connection_type: 'collaboration' | 'mentorship' | 'inspiration' | 'networking';
  compatibility_score: number;
  synergy_potential: number;
  ai_recommendation: string;
  suggested_project?: string;
  connection_strength: number;
  mutual_benefits: string[];
}

interface EcosystemOrchestration {
  id: string;
  creators: Creator[];
  connections: Connection[];
  ecosystem_vibe: string;
  overall_synergy: number;
  ai_insights: string[];
  recommendations: string[];
}

interface CollaborationRecommendation {
  id: string;
  creators: Creator[];
  project_title: string;
  project_description: string;
  expected_impact: number;
  timeline: string;
  resources_needed: string[];
  success_probability: number;
}

// Service Plug and Play - Connexions Créatives
class PlugAndPlayService {
  // Trouver des créateurs compatibles
  async findCompatibleCreators(creator: Creator): Promise<Creator[]> {
    // Simuler des créateurs compatibles
    const compatibleCreators: Creator[] = [
      {
        id: 'creator_2',
        name: 'Visual Artist',
        genre: 'visual',
        style: ['digital', 'abstract', 'interactive'],
        skills: ['digital_art', 'animation', 'installation'],
        followers: 8900,
        engagement: 0.76,
        location: 'Paris',
        availability: 'available',
        goals: ['exhibition', 'collaboration', 'recognition'],
        vibe: 'experimental',
        tempo: 8,
        frequency: 'weekly'
      },
      {
        id: 'creator_3',
        name: 'Producer',
        genre: 'music',
        style: ['electronic', 'ambient', 'experimental'],
        skills: ['production', 'sound_design', 'mixing'],
        followers: 15600,
        engagement: 0.94,
        location: 'Paris',
        availability: 'available',
        goals: ['album', 'collaboration', 'live_performance'],
        vibe: 'innovative',
        tempo: 7,
        frequency: 'daily'
      },
      {
        id: 'creator_4',
        name: 'Dance Choreographer',
        genre: 'performance',
        style: ['contemporary', 'experimental', 'immersive'],
        skills: ['choreography', 'movement', 'performance'],
        followers: 7200,
        engagement: 0.82,
        location: 'Paris',
        availability: 'busy',
        goals: ['show', 'collaboration', 'teaching'],
        vibe: 'expressive',
        tempo: 6,
        frequency: 'weekly'
      }
    ];
    
    return compatibleCreators;
  }

  // Créer une connexion intelligente
  async createConnection(creatorA: Creator, creatorB: Creator): Promise<Connection> {
    const compatibility_score = this.calculateCompatibility(creatorA, creatorB);
    const synergy_potential = this.calculateSynergy(creatorA, creatorB);
    const connection_strength = (compatibility_score + synergy_potential) / 2;
    
    const connection_type = this.determineConnectionType(creatorA, creatorB);
    const ai_recommendation = this.generateAIRecommendation(creatorA, creatorB);
    const suggested_project = this.suggestProject(creatorA, creatorB);
    const mutual_benefits = this.identifyMutualBenefits(creatorA, creatorB);
    
    return {
      id: `connection_${creatorA.id}_${creatorB.id}`,
      creator_a: creatorA,
      creator_b: creatorB,
      connection_type,
      compatibility_score,
      synergy_potential,
      ai_recommendation,
      suggested_project,
      connection_strength,
      mutual_benefits
    };
  }

  // Orchestrer l'écosystème complet
  async orchestrateEcosystem(creators: Creator[]): Promise<EcosystemOrchestration> {
    const connections: Connection[] = [];
    
    // Créer des connexions entre tous les créateurs compatibles
    for (let i = 0; i < creators.length; i++) {
      for (let j = i + 1; j < creators.length; j++) {
        const creatorA = creators[i];
        const creatorB = creators[j];
        
        const compatibility_score = this.calculateCompatibility(creatorA, creatorB);
        if (compatibility_score > 0.6) { // Seuil de compatibilité
          const connection = await this.createConnection(creatorA, creatorB);
          connections.push(connection);
        }
      }
    }
    
    const ecosystem_vibe = this.determineEcosystemVibe(creators);
    const overall_synergy = this.calculateOverallSynergy(connections);
    const ai_insights = this.generateEcosystemInsights(creators, connections);
    const recommendations = this.generateEcosystemRecommendations(creators, connections);
    
    return {
      id: `ecosystem_${creators.length}_creators`,
      creators,
      connections,
      ecosystem_vibe,
      overall_synergy,
      ai_insights,
      recommendations
    };
  }

  // Recommander des collaborations
  async recommendCollaborations(creator: Creator): Promise<CollaborationRecommendation[]> {
    const compatibleCreators = await this.findCompatibleCreators(creator);
    const recommendations: CollaborationRecommendation[] = [];
    
    for (const compatibleCreator of compatibleCreators) {
      const project_title = this.generateProjectTitle(creator, compatibleCreator);
      const project_description = this.generateProjectDescription(creator, compatibleCreator);
      const expected_impact = this.calculateExpectedImpact(creator, compatibleCreator);
      const timeline = this.estimateTimeline(creator, compatibleCreator);
      const resources_needed = this.identifyResources(creator, compatibleCreator);
      const success_probability = this.calculateSuccessProbability(creator, compatibleCreator);
      
      recommendations.push({
        id: `collab_${creator.id}_${compatibleCreator.id}`,
        creators: [creator, compatibleCreator],
        project_title,
        project_description,
        expected_impact,
        timeline,
        resources_needed,
        success_probability
      });
    }
    
    return recommendations.sort((a, b) => b.success_probability - a.success_probability);
  }

  // Méthodes privées pour les calculs
  private calculateCompatibility(creatorA: Creator, creatorB: Creator): number {
    const genre_compatibility = creatorA.genre === creatorB.genre ? 0.8 : 0.4;
    const style_overlap = this.calculateStyleOverlap(creatorA.style, creatorB.style);
    const skill_complementarity = this.calculateSkillComplementarity(creatorA.skills, creatorB.skills);
    const vibe_compatibility = this.calculateVibeCompatibility(creatorA.vibe, creatorB.vibe);
    const tempo_compatibility = this.calculateTempoCompatibility(creatorA.tempo, creatorB.tempo);
    
    return (genre_compatibility + style_overlap + skill_complementarity + vibe_compatibility + tempo_compatibility) / 5;
  }

  private calculateSynergy(creatorA: Creator, creatorB: Creator): number {
    const audience_synergy = this.calculateAudienceSynergy(creatorA, creatorB);
    const creative_synergy = this.calculateCreativeSynergy(creatorA, creatorB);
    const market_synergy = this.calculateMarketSynergy(creatorA, creatorB);
    
    return (audience_synergy + creative_synergy + market_synergy) / 3;
  }

  private determineConnectionType(creatorA: Creator, creatorB: Creator): 'collaboration' | 'mentorship' | 'inspiration' | 'networking' {
    const experience_diff = Math.abs(creatorA.followers - creatorB.followers);
    const skill_diff = Math.abs(creatorA.skills.length - creatorB.skills.length);
    
    if (experience_diff > 10000) return 'mentorship';
    if (skill_diff > 3) return 'collaboration';
    if (creatorA.genre === creatorB.genre) return 'inspiration';
    return 'networking';
  }

  private generateAIRecommendation(creatorA: Creator, creatorB: Creator): string {
    const recommendations = [
      `"${creatorA.name} et ${creatorB.name} pourraient créer une fusion ${creatorA.genre}-${creatorB.genre} révolutionnaire"`,
      `"Collaboration parfaite pour un projet ${creatorA.vibe} x ${creatorB.vibe}"`,
      `"Synergie naturelle entre ${creatorA.name} (${creatorA.genre}) et ${creatorB.name} (${creatorB.genre})"`,
      `"Opportunité de mentorat entre ${creatorA.name} et ${creatorB.name} pour échanger leurs expertises"`
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }

  private suggestProject(creatorA: Creator, creatorB: Creator): string {
    const projects = [
      `${creatorA.name} x ${creatorB.name} - Fusion ${creatorA.genre}/${creatorB.genre}`,
      `"${creatorA.vibe} Meets ${creatorB.vibe}" - Collaboration Expérimentale`,
      `${creatorA.name} & ${creatorB.name} - Projet ${creatorA.genre} Innovant`,
      `"${creatorA.name} x ${creatorB.name}" - Création Collaborative`
    ];
    
    return projects[Math.floor(Math.random() * projects.length)];
  }

  private identifyMutualBenefits(creatorA: Creator, creatorB: Creator): string[] {
    return [
      `Audience croisée : ${creatorA.name} (${creatorA.followers} followers) + ${creatorB.name} (${creatorB.followers} followers)`,
      `Compétences complémentaires : ${creatorA.skills.join(', ')} + ${creatorB.skills.join(', ')}`,
      `Synergie créative : ${creatorA.vibe} x ${creatorB.vibe}`,
      `Marché élargi : ${creatorA.genre} + ${creatorB.genre}`
    ];
  }

  private calculateStyleOverlap(stylesA: string[], stylesB: string[]): number {
    const intersection = stylesA.filter(style => stylesB.includes(style));
    const union = [...new Set([...stylesA, ...stylesB])];
    return intersection.length / union.length;
  }

  private calculateSkillComplementarity(skillsA: string[], skillsB: string[]): number {
    const uniqueSkills = new Set([...skillsA, ...skillsB]);
    const totalSkills = skillsA.length + skillsB.length;
    return uniqueSkills.size / totalSkills;
  }

  private calculateVibeCompatibility(vibeA: string, vibeB: string): number {
    const vibePairs = {
      'experimental': ['innovative', 'abstract'],
      'innovative': ['experimental', 'progressive'],
      'expressive': ['emotional', 'passionate'],
      'emotional': ['expressive', 'sensitive']
    };
    
    const compatibleVibes = vibePairs[vibeA as keyof typeof vibePairs] || [];
    return compatibleVibes.includes(vibeB) ? 0.9 : 0.3;
  }

  private calculateTempoCompatibility(tempoA: number, tempoB: number): number {
    const tempoDiff = Math.abs(tempoA - tempoB);
    return Math.max(0, 1 - tempoDiff / 10);
  }

  private calculateAudienceSynergy(creatorA: Creator, creatorB: Creator): number {
    const audienceOverlap = Math.abs(creatorA.followers - creatorB.followers) / Math.max(creatorA.followers, creatorB.followers);
    return 1 - audienceOverlap;
  }

  private calculateCreativeSynergy(creatorA: Creator, creatorB: Creator): number {
    const genreSynergy = creatorA.genre === creatorB.genre ? 0.7 : 0.9; // Différents genres = plus innovant
    const styleSynergy = this.calculateStyleOverlap(creatorA.style, creatorB.style);
    return (genreSynergy + styleSynergy) / 2;
  }

  private calculateMarketSynergy(creatorA: Creator, creatorB: Creator): number {
    const engagementSynergy = (creatorA.engagement + creatorB.engagement) / 2;
    const marketDiversity = creatorA.genre === creatorB.genre ? 0.6 : 0.9;
    return (engagementSynergy + marketDiversity) / 2;
  }

  private determineEcosystemVibe(creators: Creator[]): string {
    const vibes = creators.map(c => c.vibe);
    const vibeCounts = vibes.reduce((acc, vibe) => {
      acc[vibe] = (acc[vibe] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantVibe = Object.entries(vibeCounts).sort((a, b) => b[1] - a[1])[0][0];
    return dominantVibe;
  }

  private calculateOverallSynergy(connections: Connection[]): number {
    if (connections.length === 0) return 0;
    const totalSynergy = connections.reduce((sum, conn) => sum + conn.synergy_potential, 0);
    return totalSynergy / connections.length;
  }

  private generateEcosystemInsights(creators: Creator[], connections: Connection[]): string[] {
    return [
      `Écosystème de ${creators.length} créateurs avec ${connections.length} connexions potentielles`,
      `Synergie moyenne de ${(this.calculateOverallSynergy(connections) * 100).toFixed(1)}%`,
      `Vibe dominante : ${this.determineEcosystemVibe(creators)}`,
      `${connections.filter(c => c.connection_type === 'collaboration').length} collaborations recommandées`
    ];
  }

  private generateEcosystemRecommendations(creators: Creator[], connections: Connection[]): string[] {
    return [
      'Organiser des événements de networking créatif',
      'Créer des espaces de collaboration physique',
      'Lancer des défis créatifs communautaires',
      'Développer des programmes de mentorat'
    ];
  }

  private generateProjectTitle(creatorA: Creator, creatorB: Creator): string {
    return `${creatorA.name} x ${creatorB.name} - Fusion ${creatorA.genre}/${creatorB.genre}`;
  }

  private generateProjectDescription(creatorA: Creator, creatorB: Creator): string {
    return `Collaboration innovante entre ${creatorA.name} (${creatorA.genre}) et ${creatorB.name} (${creatorB.genre}) pour créer une expérience unique ${creatorA.vibe} x ${creatorB.vibe}.`;
  }

  private calculateExpectedImpact(creatorA: Creator, creatorB: Creator): number {
    const combinedFollowers = creatorA.followers + creatorB.followers;
    const engagementMultiplier = (creatorA.engagement + creatorB.engagement) / 2;
    return Math.round(combinedFollowers * engagementMultiplier * 0.01);
  }

  private estimateTimeline(creatorA: Creator, creatorB: Creator): string {
    const tempoAverage = (creatorA.tempo + creatorB.tempo) / 2;
    if (tempoAverage > 8) return '2-3 semaines';
    if (tempoAverage > 6) return '1-2 mois';
    return '3-4 mois';
  }

  private identifyResources(creatorA: Creator, creatorB: Creator): string[] {
    return [
      'Studio de création partagé',
      'Équipement technique combiné',
      'Réseaux sociaux croisés',
      'Expertise complémentaire'
    ];
  }

  private calculateSuccessProbability(creatorA: Creator, creatorB: Creator): number {
    const compatibility = this.calculateCompatibility(creatorA, creatorB);
    const synergy = this.calculateSynergy(creatorA, creatorB);
    const engagement = (creatorA.engagement + creatorB.engagement) / 2;
    
    return (compatibility + synergy + engagement) / 3;
  }
}

const plugAndPlayService = new PlugAndPlayService();

// Routes API
djConnectionsRouter.get('/compatible-creators/:creatorId', async (req: any, res: Response) => {
  try {
    const { creatorId } = req.params;
    // Simuler un créateur
    const creator: Creator = {
      id: creatorId,
      name: 'Producer Flow',
      genre: 'electronic',
      style: ['techno', 'ambient', 'experimental'],
      skills: ['music', 'production', 'live_performance'],
      followers: 12500,
      engagement: 0.89,
      location: 'Paris',
      availability: 'available',
      goals: ['album', 'collaboration', 'live_performance'],
      vibe: 'experimental',
      tempo: 8,
      frequency: 'daily'
    };
    
    const compatibleCreators = await plugAndPlayService.findCompatibleCreators(creator);
    res.json(compatibleCreators);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur Plug and Play', details: error.message });
  }
});

djConnectionsRouter.post('/create-connection', async (req: any, res: Response) => {
  try {
    const { creatorA, creatorB } = req.body;
    const connection = await plugAndPlayService.createConnection(creatorA, creatorB);
    res.json(connection);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur Plug and Play', details: error.message });
  }
});

djConnectionsRouter.post('/orchestrate-ecosystem', async (req: any, res: Response) => {
  try {
    const { creators } = req.body;
    const orchestration = await plugAndPlayService.orchestrateEcosystem(creators);
    res.json(orchestration);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur Plug and Play', details: error.message });
  }
});

djConnectionsRouter.get('/recommendations/:creatorId', async (req: any, res: Response) => {
  try {
    const { creatorId } = req.params;
    // Simuler un créateur
    const creator: Creator = {
      id: creatorId,
      name: 'Producer Flow',
      genre: 'electronic',
      style: ['techno', 'ambient', 'experimental'],
      skills: ['music', 'production', 'live_performance'],
      followers: 12500,
      engagement: 0.89,
      location: 'Paris',
      availability: 'available',
      goals: ['album', 'collaboration', 'live_performance'],
      vibe: 'experimental',
      tempo: 8,
      frequency: 'daily'
    };
    
    const recommendations = await plugAndPlayService.recommendCollaborations(creator);
    res.json(recommendations);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur Plug and Play', details: error.message });
  }
});

export default djConnectionsRouter; 