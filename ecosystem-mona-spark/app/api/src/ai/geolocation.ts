import { Router, Response } from 'express';

const router = Router();

// Types pour la Géolocalisation
interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  region: string;
}

interface Creator {
  id: string;
  name: string;
  location: Location;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  score: number;
  skills: string[];
}

interface Event {
  id: string;
  name: string;
  location: Location;
  date: Date;
  type: 'SPARK' | 'MONA';
  capacity: number;
  registered: number;
  description: string;
}

interface NearbyDiscovery {
  events: Event[];
  creators: Creator[];
  collaborations: Collaboration[];
}

interface Collaboration {
  id: string;
  title: string;
  description: string;
  creator_a: Creator;
  creator_b: Creator;
  location: Location;
  start_date: Date;
  end_date: Date;
  status: 'completed' | 'proposed' | 'active';
  success_score: number;
  tags: string[];
}

// Service de Géolocalisation
class GeolocationService {
  private creators: Creator[] = [];
  private events: Event[] = [];
  private collaborations: Collaboration[] = [];

  async getNearbyEvents(location: Location, radius: number = 50): Promise<Event[]> {
    return this.events.filter(event => 
      this.calculateDistance(location, event.location) <= radius
    );
  }

  async getNearbyCreators(location: Location, radius: number = 50): Promise<Creator[]> {
    return this.creators.filter(creator => 
      this.calculateDistance(location, creator.location) <= radius
    );
  }

  async getNearbyDiscovery(location: Location, radius: number = 50): Promise<NearbyDiscovery> {
    const nearbyEvents = await this.getNearbyEvents(location, radius);
    const nearbyCreators = await this.getNearbyCreators(location, radius);
    const nearbyCollaborations = this.getNearbyCollaborations(location, radius);

    return {
      events: nearbyEvents,
      creators: nearbyCreators,
      collaborations: nearbyCollaborations
    };
  }

  async findCollaborationOpportunities(location: Location, radius: number = 50): Promise<Collaboration[]> {
    const nearbyCreators = await this.getNearbyCreators(location, radius);
    const opportunities: Collaboration[] = [];

    // Algorithme pour trouver des opportunités de collaboration
    for (let i = 0; i < nearbyCreators.length; i++) {
      for (let j = i + 1; j < nearbyCreators.length; j++) {
        const creatorA = nearbyCreators[i];
        const creatorB = nearbyCreators[j];

        if (this.areCompatibleForCollaboration(creatorA, creatorB)) {
          const collaboration: Collaboration = {
            id: this.generateId(),
            title: `Collaboration ${creatorA.name} x ${creatorB.name}`,
            description: this.generateCollaborationDescription(creatorA, creatorB),
            creator_a: creatorA,
            creator_b: creatorB,
            location: this.calculateMidpoint(creatorA.location, creatorB.location),
            start_date: new Date(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
            status: 'proposed',
            success_score: this.calculateCollaborationSuccessScore(creatorA, creatorB),
            tags: this.generateCollaborationTags(creatorA, creatorB)
          };

          opportunities.push(collaboration);
        }
      }
    }

    return opportunities.sort((a, b) => b.success_score - a.success_score);
  }

  async getLocationStats(location: Location): Promise<any> {
    const nearbyCreators = await this.getNearbyCreators(location, 50);
    const nearbyEvents = await this.getNearbyEvents(location, 50);

    const categoryStats = {
      'SPARK-READY': 0,
      'MONA-POSSIBLE': 0,
      'EN-DEVELOPPEMENT': 0,
      'NON-PRIORITAIRE': 0
    };

    nearbyCreators.forEach(creator => {
      categoryStats[creator.category]++;
    });

    return {
      total_creators: nearbyCreators.length,
      total_events: nearbyEvents.length,
      category_distribution: categoryStats,
      average_score: nearbyCreators.reduce((sum, c) => sum + c.score, 0) / nearbyCreators.length,
      top_skills: this.getTopSkills(nearbyCreators)
    };
  }

  private getNearbyCollaborations(location: Location, radius: number): Collaboration[] {
    return this.collaborations.filter(collab => 
      this.calculateDistance(location, collab.location) <= radius
    );
  }

  private calculateDistance(loc1: Location, loc2: Location): number {
    // Formule de Haversine pour calculer la distance entre deux points
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRadians(loc2.latitude - loc1.latitude);
    const dLon = this.toRadians(loc2.longitude - loc1.longitude);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(loc1.latitude)) * Math.cos(this.toRadians(loc2.latitude)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI/180);
  }

  private areCompatibleForCollaboration(creatorA: Creator, creatorB: Creator): boolean {
    // Vérifier la compatibilité basée sur les catégories et compétences
    if (creatorA.category === creatorB.category) return true;
    
    const compatiblePairs = [
      ['SPARK-READY', 'MONA-POSSIBLE'],
      ['MONA-POSSIBLE', 'EN-DEVELOPPEMENT']
    ];

    return compatiblePairs.some(pair => 
      (pair[0] === creatorA.category && pair[1] === creatorB.category) ||
      (pair[0] === creatorB.category && pair[1] === creatorA.category)
    );
  }

  private generateCollaborationDescription(creatorA: Creator, creatorB: Creator): string {
    const descriptions = [
      `Collaboration entre ${creatorA.name} et ${creatorB.name} pour créer du contenu innovant`,
      `Projet créatif réunissant ${creatorA.name} et ${creatorB.name}`,
      `Partnership entre ${creatorA.name} et ${creatorB.name} pour développer de nouveaux projets`,
      `Collaboration artistique entre ${creatorA.name} et ${creatorB.name}`
    ];

    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  private calculateMidpoint(loc1: Location, loc2: Location): Location {
    return {
      latitude: (loc1.latitude + loc2.latitude) / 2,
      longitude: (loc1.longitude + loc2.longitude) / 2,
      city: loc1.city, // Simplification
      country: loc1.country,
      region: loc1.region
    };
  }

  private calculateCollaborationSuccessScore(creatorA: Creator, creatorB: Creator): number {
    // Score basé sur les scores individuels et la compatibilité
    const baseScore = (creatorA.score + creatorB.score) / 2;
    const compatibilityBonus = creatorA.category === creatorB.category ? 20 : 10;
    return Math.min(baseScore + compatibilityBonus, 100);
  }

  private generateCollaborationTags(creatorA: Creator, creatorB: Creator): string[] {
    const allSkills = [...creatorA.skills, ...creatorB.skills];
    const uniqueSkills = [...new Set(allSkills)];
    return uniqueSkills.slice(0, 5); // Limiter à 5 tags
  }

  private getTopSkills(creators: Creator[]): string[] {
    const skillCounts: Record<string, number> = {};
    
    creators.forEach(creator => {
      creator.skills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });

    return Object.entries(skillCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([skill]) => skill);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

const geolocationService = new GeolocationService();

// Routes API
router.get('/discovery/events', async (req: any, res: Response) => {
  try {
    const { latitude, longitude, radius = 50 } = req.query;
    const location: Location = {
      latitude: parseFloat(latitude as string),
      longitude: parseFloat(longitude as string),
      city: req.query.city || 'Unknown',
      country: req.query.country || 'Unknown',
      region: req.query.region || 'Unknown'
    };

    const events = await geolocationService.getNearbyEvents(location, radius as number);
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur récupération événements', details: error.message });
  }
});

router.get('/discovery/creators', async (req: any, res: Response) => {
  try {
    const { latitude, longitude, radius = 50 } = req.query;
    const location: Location = {
      latitude: parseFloat(latitude as string),
      longitude: parseFloat(longitude as string),
      city: req.query.city || 'Unknown',
      country: req.query.country || 'Unknown',
      region: req.query.region || 'Unknown'
    };

    const creators = await geolocationService.getNearbyCreators(location, radius as number);
    res.json(creators);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur récupération créateurs', details: error.message });
  }
});

router.get('/discovery/nearby-discovery', async (req: any, res: Response) => {
  try {
    const { latitude, longitude, radius = 50 } = req.query;
    const location: Location = {
      latitude: parseFloat(latitude as string),
      longitude: parseFloat(longitude as string),
      city: req.query.city || 'Unknown',
      country: req.query.country || 'Unknown',
      region: req.query.region || 'Unknown'
    };

    const discovery = await geolocationService.getNearbyDiscovery(location, radius as number);
    res.json(discovery);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur découverte locale', details: error.message });
  }
});

router.get('/collaboration-opportunities', async (req: any, res: Response) => {
  try {
    const { latitude, longitude, radius = 50 } = req.query;
    const location: Location = {
      latitude: parseFloat(latitude as string),
      longitude: parseFloat(longitude as string),
      city: req.query.city || 'Unknown',
      country: req.query.country || 'Unknown',
      region: req.query.region || 'Unknown'
    };

    const opportunities = await geolocationService.findCollaborationOpportunities(location, radius as number);
    res.json(opportunities);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur opportunités collaboration', details: error.message });
  }
});

router.get('/location-stats', async (req: any, res: Response) => {
  try {
    const { latitude, longitude } = req.query;
    const location: Location = {
      latitude: parseFloat(latitude as string),
      longitude: parseFloat(longitude as string),
      city: req.query.city || 'Unknown',
      country: req.query.country || 'Unknown',
      region: req.query.region || 'Unknown'
    };

    const stats = await geolocationService.getLocationStats(location);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur statistiques localisation', details: error.message });
  }
});

export default router; 