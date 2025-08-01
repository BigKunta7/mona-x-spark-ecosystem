import { Router, Response } from 'express';

const router = Router();

// Types pour le Plug and Play
interface Creator {
  id: string;
  name: string;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  score: number;
  location: string;
  skills: string[];
  interests: string[];
}

interface Connection {
  id: string;
  creator_a: string;
  creator_b: string;
  compatibility_score: number;
  potential_collaboration: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: Date;
}

// Service Plug and Play
class PlugAndPlayService {
  private creators: Creator[] = [];
  private connections: Connection[] = [];

  async findCompatibleCreators(creatorId: string): Promise<Creator[]> {
    const creator = this.creators.find(c => c.id === creatorId);
    if (!creator) return [];

    // Algorithme de compatibilité basé sur le score, la localisation et les compétences
    return this.creators
      .filter(c => c.id !== creatorId)
      .map(c => ({
        ...c,
        compatibility_score: this.calculateCompatibility(creator, c)
      }))
      .sort((a, b) => b.compatibility_score - a.compatibility_score)
      .slice(0, 10);
  }

  async createConnection(creatorA: string, creatorB: string): Promise<Connection> {
    const connection: Connection = {
      id: this.generateId(),
      creator_a: creatorA,
      creator_b: creatorB,
      compatibility_score: this.calculateCompatibility(
        this.creators.find(c => c.id === creatorA)!,
        this.creators.find(c => c.id === creatorB)!
      ),
      potential_collaboration: this.generateCollaborationIdea(
        this.creators.find(c => c.id === creatorA)!,
        this.creators.find(c => c.id === creatorB)!
      ),
      status: 'pending',
      created_at: new Date()
    };

    this.connections.push(connection);
    return connection;
  }

  async orchestrateEcosystem(): Promise<any> {
    // Orchestration intelligente de l'écosystème
    const recommendations = [];
    
    // Trouver les meilleures connexions possibles
    for (const creator of this.creators) {
      const compatible = await this.findCompatibleCreators(creator.id);
      if (compatible.length > 0) {
        recommendations.push({
          creator_id: creator.id,
          suggested_connections: compatible.slice(0, 3),
          ecosystem_impact: this.calculateEcosystemImpact(creator, compatible[0])
        });
      }
    }

    return {
      total_creators: this.creators.length,
      total_connections: this.connections.length,
      recommendations,
      ecosystem_health: this.calculateEcosystemHealth()
    };
  }

  private calculateCompatibility(creatorA: Creator, creatorB: Creator): number {
    let score = 0;
    
    // Score basé sur la catégorie
    if (creatorA.category === creatorB.category) score += 30;
    else if (this.areCategoriesCompatible(creatorA.category, creatorB.category)) score += 20;
    
    // Score basé sur la localisation
    if (creatorA.location === creatorB.location) score += 25;
    
    // Score basé sur les compétences communes
    const commonSkills = creatorA.skills.filter(s => creatorB.skills.includes(s));
    score += commonSkills.length * 10;
    
    // Score basé sur les intérêts communs
    const commonInterests = creatorA.interests.filter(i => creatorB.interests.includes(i));
    score += commonInterests.length * 5;
    
    return Math.min(score, 100);
  }

  private areCategoriesCompatible(catA: string, catB: string): boolean {
    const compatiblePairs = [
      ['SPARK-READY', 'MONA-POSSIBLE'],
      ['MONA-POSSIBLE', 'EN-DEVELOPPEMENT'],
      ['EN-DEVELOPPEMENT', 'NON-PRIORITAIRE']
    ];
    
    return compatiblePairs.some(pair => 
      (pair[0] === catA && pair[1] === catB) || 
      (pair[0] === catB && pair[1] === catA)
    );
  }

  private generateCollaborationIdea(creatorA: Creator, creatorB: Creator): string {
    const ideas = [
      'Création d\'un projet musical collaboratif',
      'Organisation d\'un événement créatif',
      'Développement d\'un contenu cross-platform',
      'Mentorat et partage d\'expérience',
      'Création d\'une série de contenus'
    ];
    
    return ideas[Math.floor(Math.random() * ideas.length)];
  }

  private calculateEcosystemImpact(creator: Creator, compatible: Creator): number {
    return (creator.score + compatible.score) / 2;
  }

  private calculateEcosystemHealth(): number {
    const totalConnections = this.connections.length;
    const activeConnections = this.connections.filter(c => c.status === 'accepted').length;
    const averageScore = this.creators.reduce((sum, c) => sum + c.score, 0) / this.creators.length;
    
    return (activeConnections / totalConnections) * 0.4 + (averageScore / 100) * 0.6;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

const plugAndPlayService = new PlugAndPlayService();

// Routes API
router.get('/compatible-creators/:creatorId', async (req: any, res: Response) => {
  try {
    const { creatorId } = req.params;
    const compatible = await plugAndPlayService.findCompatibleCreators(creatorId);
    res.json(compatible);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur recherche créateurs compatibles', details: error.message });
  }
});

router.post('/create-connection', async (req: any, res: Response) => {
  try {
    const { creator_a, creator_b } = req.body;
    const connection = await plugAndPlayService.createConnection(creator_a, creator_b);
    res.json(connection);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur création connexion', details: error.message });
  }
});

router.post('/orchestrate-ecosystem', async (req: any, res: Response) => {
  try {
    const orchestration = await plugAndPlayService.orchestrateEcosystem();
    res.json(orchestration);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur orchestration écosystème', details: error.message });
  }
});

export default router; 