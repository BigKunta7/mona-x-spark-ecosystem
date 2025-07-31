import { Router, Response } from 'express';

const discoveryRouter = Router();

// Types pour la géolocalisation
interface Location {
  id: string;
  name: string;
  type: 'city' | 'venue' | 'event_space' | 'studio' | 'gallery';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  country: string;
  region: string;
  city: string;
  postal_code: string;
  timezone: string;
  population?: number;
  creative_score: number;
  event_count: number;
  creator_count: number;
  investment_volume: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'festival' | 'concert' | 'exhibition' | 'workshop' | 'meetup' | 'residence';
  location_id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  start_date: Date;
  end_date: Date;
  capacity: number;
  current_attendees: number;
  price_range: {
    min: number;
    max: number;
  };
  organizer_id: string;
  organizer_name: string;
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  creative_category: string;
  engagement_score: number;
}

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  genre: string;
  location_id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  followers: number;
  engagement_rate: number;
  recent_activity: string;
  availability: 'available' | 'busy' | 'unavailable';
  collaboration_interest: boolean;
  skills: string[];
  portfolio_url?: string;
  social_links: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}

interface HeatMap {
  id: string;
  name: string;
  type: 'creativity' | 'events' | 'investment' | 'collaboration';
  data: HeatMapPoint[];
  color_scale: {
    min: string;
    max: string;
  };
  last_updated: Date;
}

interface HeatMapPoint {
  lat: number;
  lng: number;
  intensity: number;
  radius: number;
  metadata: {
    event_count?: number;
    creator_count?: number;
    investment_volume?: number;
    collaboration_count?: number;
  };
}

interface DiscoveryZone {
  id: string;
  name: string;
  description: string;
  center: {
    lat: number;
    lng: number;
  };
  radius: number; // en mètres
  type: 'creative_hub' | 'event_cluster' | 'investment_zone' | 'collaboration_area';
  features: string[];
  stats: {
    total_creators: number;
    total_events: number;
    total_investment: number;
    average_engagement: number;
  };
  trending: boolean;
  discovery_score: number;
}

interface NearbyDiscovery {
  user_location: {
    lat: number;
    lng: number;
  };
  nearby_events: Event[];
  nearby_creators: Creator[];
  nearby_venues: Location[];
  discovery_zones: DiscoveryZone[];
  recommendations: {
    events: Event[];
    creators: Creator[];
    collaborations: Collaboration[];
  };
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
  status: 'proposed' | 'active' | 'completed';
  success_score: number;
  tags: string[];
}

// Service de Géolocalisation
class GeolocationService {
  // Obtenir les événements par géolocalisation
  async getEventsByLocation(lat: number, lng: number, radius: number = 50): Promise<Event[]> {
    // Simuler des événements proches
    const events: Event[] = [
      {
        id: 'event_1',
        title: 'Festival Électronique Paris',
        description: 'Le plus grand festival électronique de Paris avec 50+ artistes',
        type: 'festival',
        location_id: 'paris_1',
        coordinates: { lat: 48.8566, lng: 2.3522 },
        start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        capacity: 5000,
        current_attendees: 3200,
        price_range: { min: 45, max: 120 },
        organizer_id: 'org_1',
        organizer_name: 'Electronic Events Paris',
        tags: ['electronic', 'festival', 'music'],
        status: 'upcoming',
        creative_category: 'music',
        engagement_score: 0.92
      },
      {
        id: 'event_2',
        title: 'Exposition Art Contemporain',
        description: 'Exposition d\'art contemporain avec 30 artistes émergents',
        type: 'exhibition',
        location_id: 'paris_2',
        coordinates: { lat: 48.8606, lng: 2.3376 },
        start_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        capacity: 200,
        current_attendees: 45,
        price_range: { min: 8, max: 15 },
        organizer_id: 'org_2',
        organizer_name: 'Galerie Moderne',
        tags: ['art', 'contemporary', 'exhibition'],
        status: 'upcoming',
        creative_category: 'visual',
        engagement_score: 0.78
      },
      {
        id: 'event_3',
        title: 'Workshop Création Numérique',
        description: 'Atelier de création numérique pour débutants et confirmés',
        type: 'workshop',
        location_id: 'paris_3',
        coordinates: { lat: 48.8700, lng: 2.3500 },
        start_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        capacity: 25,
        current_attendees: 18,
        price_range: { min: 25, max: 45 },
        organizer_id: 'org_3',
        organizer_name: 'Digital Arts Studio',
        tags: ['workshop', 'digital', 'creation'],
        status: 'upcoming',
        creative_category: 'digital',
        engagement_score: 0.85
      }
    ];
    
    return events;
  }

  // Obtenir les créateurs par géolocalisation
  async getCreatorsByLocation(lat: number, lng: number, radius: number = 50): Promise<Creator[]> {
    // Simuler des créateurs proches
    const creators: Creator[] = [
      {
        id: 'creator_1',
        name: 'DJ Flow',
        username: '@djflow',
        avatar: '🎧',
        bio: 'DJ électronique spécialisé dans la techno et l\'ambient',
        genre: 'electronic',
        location_id: 'paris_1',
        coordinates: { lat: 48.8566, lng: 2.3522 },
        followers: 12500,
        engagement_rate: 0.89,
        recent_activity: 'Nouveau set live sur Twitch',
        availability: 'available',
        collaboration_interest: true,
        skills: ['music', 'production', 'live_performance'],
        social_links: {
          instagram: '@djflow',
          twitter: '@djflow_official',
          youtube: 'DJ Flow Official'
        }
      },
      {
        id: 'creator_2',
        name: 'Visual Artist',
        username: '@visualartist',
        avatar: '🎨',
        bio: 'Artiste visuel spécialisé dans l\'art numérique et les installations',
        genre: 'visual',
        location_id: 'paris_2',
        coordinates: { lat: 48.8606, lng: 2.3376 },
        followers: 8900,
        engagement_rate: 0.76,
        recent_activity: 'Nouvelle installation interactive',
        availability: 'available',
        collaboration_interest: true,
        skills: ['digital_art', 'installation', 'interactive'],
        social_links: {
          instagram: '@visualartist',
          twitter: '@visualartist_official'
        }
      },
      {
        id: 'creator_3',
        name: 'Hip-Hop Master',
        username: '@hiphopmaster',
        avatar: '🎤',
        bio: 'Rappeur et producteur hip-hop avec 10 ans d\'expérience',
        genre: 'hip-hop',
        location_id: 'paris_3',
        coordinates: { lat: 48.8700, lng: 2.3500 },
        followers: 15600,
        engagement_rate: 0.94,
        recent_activity: 'Nouveau single en featuring',
        availability: 'busy',
        collaboration_interest: false,
        skills: ['rap', 'production', 'songwriting'],
        social_links: {
          instagram: '@hiphopmaster',
          twitter: '@hiphopmaster_official',
          youtube: 'Hip-Hop Master'
        }
      }
    ];
    
    return creators;
  }

  // Obtenir les zones de découverte
  async getDiscoveryZones(lat: number, lng: number, radius: number = 100): Promise<DiscoveryZone[]> {
    const zones: DiscoveryZone[] = [
      {
        id: 'zone_1',
        name: 'Quartier Créatif Marais',
        description: 'Zone historique avec concentration d\'artistes et galeries',
        center: { lat: 48.8606, lng: 2.3622 },
        radius: 2000,
        type: 'creative_hub',
        features: ['galeries', 'studios', 'cafés créatifs', 'espaces de coworking'],
        stats: {
          total_creators: 45,
          total_events: 12,
          total_investment: 250000,
          average_engagement: 0.82
        },
        trending: true,
        discovery_score: 0.95
      },
      {
        id: 'zone_2',
        name: 'Cluster Événementiel Champs-Élysées',
        description: 'Zone d\'événements premium avec salles de concert et théâtres',
        center: { lat: 48.8698, lng: 2.3077 },
        radius: 1500,
        type: 'event_cluster',
        features: ['salles de concert', 'théâtres', 'espaces événementiels', 'hôtels'],
        stats: {
          total_creators: 28,
          total_events: 8,
          total_investment: 180000,
          average_engagement: 0.78
        },
        trending: false,
        discovery_score: 0.87
      },
      {
        id: 'zone_3',
        name: 'Hub Investissement La Défense',
        description: 'Zone d\'investissement avec fonds et incubateurs créatifs',
        center: { lat: 48.8900, lng: 2.2417 },
        radius: 3000,
        type: 'investment_zone',
        features: ['fonds d\'investissement', 'incubateurs', 'accélérateurs', 'coworking'],
        stats: {
          total_creators: 15,
          total_events: 3,
          total_investment: 500000,
          average_engagement: 0.91
        },
        trending: true,
        discovery_score: 0.92
      }
    ];
    
    return zones;
  }

  // Obtenir les heat maps
  async getHeatMaps(type: string): Promise<HeatMap[]> {
    const heatMaps: HeatMap[] = [
      {
        id: 'heatmap_creativity',
        name: 'Carte de Créativité',
        type: 'creativity',
        data: [
          { lat: 48.8566, lng: 2.3522, intensity: 0.95, radius: 500, metadata: { creator_count: 45, event_count: 12 } },
          { lat: 48.8606, lng: 2.3376, intensity: 0.87, radius: 400, metadata: { creator_count: 32, event_count: 8 } },
          { lat: 48.8698, lng: 2.3077, intensity: 0.78, radius: 300, metadata: { creator_count: 28, event_count: 6 } },
          { lat: 48.8900, lng: 2.2417, intensity: 0.92, radius: 600, metadata: { creator_count: 15, event_count: 3 } }
        ],
        color_scale: { min: '#00ff00', max: '#ff0000' },
        last_updated: new Date()
      },
      {
        id: 'heatmap_events',
        name: 'Carte des Événements',
        type: 'events',
        data: [
          { lat: 48.8566, lng: 2.3522, intensity: 0.88, radius: 400, metadata: { event_count: 12, collaboration_count: 8 } },
          { lat: 48.8606, lng: 2.3376, intensity: 0.76, radius: 350, metadata: { event_count: 8, collaboration_count: 5 } },
          { lat: 48.8698, lng: 2.3077, intensity: 0.82, radius: 300, metadata: { event_count: 6, collaboration_count: 4 } }
        ],
        color_scale: { min: '#0000ff', max: '#ff00ff' },
        last_updated: new Date()
      },
      {
        id: 'heatmap_investment',
        name: 'Carte des Investissements',
        type: 'investment',
        data: [
          { lat: 48.8900, lng: 2.2417, intensity: 0.95, radius: 800, metadata: { investment_volume: 500000 } },
          { lat: 48.8566, lng: 2.3522, intensity: 0.78, radius: 400, metadata: { investment_volume: 250000 } },
          { lat: 48.8606, lng: 2.3376, intensity: 0.65, radius: 300, metadata: { investment_volume: 180000 } }
        ],
        color_scale: { min: '#ffff00', max: '#ff6600' },
        last_updated: new Date()
      }
    ];
    
    return heatMaps.filter(hm => hm.type === type);
  }

  // Obtenir les découvertes à proximité
  async getNearbyDiscovery(userLat: number, userLng: number, radius: number = 50): Promise<NearbyDiscovery> {
    const nearbyEvents = await this.getEventsByLocation(userLat, userLng, radius);
    const nearbyCreators = await this.getCreatorsByLocation(userLat, userLng, radius);
    const discoveryZones = await this.getDiscoveryZones(userLat, userLng, radius);
    
    // Simuler des lieux proches
    const nearbyVenues: Location[] = [
      {
        id: 'venue_1',
        name: 'Studio Créatif Paris',
        type: 'studio',
        coordinates: { lat: 48.8566, lng: 2.3522 },
        address: '123 Rue de la Créativité, 75001 Paris',
        country: 'France',
        region: 'Île-de-France',
        city: 'Paris',
        postal_code: '75001',
        timezone: 'Europe/Paris',
        creative_score: 0.92,
        event_count: 15,
        creator_count: 25,
        investment_volume: 150000
      },
      {
        id: 'venue_2',
        name: 'Galerie Moderne',
        type: 'gallery',
        coordinates: { lat: 48.8606, lng: 2.3376 },
        address: '456 Avenue des Arts, 75003 Paris',
        country: 'France',
        region: 'Île-de-France',
        city: 'Paris',
        postal_code: '75003',
        timezone: 'Europe/Paris',
        creative_score: 0.87,
        event_count: 8,
        creator_count: 18,
        investment_volume: 95000
      }
    ];
    
    // Simuler des recommandations
    const recommendations = {
      events: nearbyEvents.slice(0, 2),
      creators: nearbyCreators.slice(0, 2),
      collaborations: [
        {
          id: 'collab_1',
          title: 'DJ Flow x Visual Artist',
          description: 'Collaboration musique et art visuel',
          creator_a: nearbyCreators[0],
          creator_b: nearbyCreators[1],
          location: nearbyVenues[0],
          start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          end_date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
          status: 'proposed',
          success_score: 0.89,
          tags: ['music', 'visual', 'collaboration']
        }
      ]
    };
    
    return {
      user_location: { lat: userLat, lng: userLng },
      nearby_events: nearbyEvents,
      nearby_creators: nearbyCreators,
      nearby_venues: nearbyVenues,
      discovery_zones: discoveryZones,
      recommendations
    };
  }

  // Rechercher des créateurs par géolocalisation
  async searchCreatorsByLocation(lat: number, lng: number, radius: number, filters: any): Promise<Creator[]> {
    const allCreators = await this.getCreatorsByLocation(lat, lng, radius);
    
    // Appliquer les filtres
    let filteredCreators = allCreators;
    
    if (filters.genre) {
      filteredCreators = filteredCreators.filter(c => c.genre === filters.genre);
    }
    
    if (filters.availability) {
      filteredCreators = filteredCreators.filter(c => c.availability === filters.availability);
    }
    
    if (filters.min_followers) {
      filteredCreators = filteredCreators.filter(c => c.followers >= filters.min_followers);
    }
    
    if (filters.skills) {
      filteredCreators = filteredCreators.filter(c => 
        filters.skills.some((skill: string) => c.skills.includes(skill))
      );
    }
    
    return filteredCreators;
  }

  // Obtenir les statistiques de géolocalisation
  async getLocationStats(locationId: string): Promise<any> {
    return {
      total_creators: 156,
      total_events: 89,
      total_venues: 23,
      total_investment: 1250000,
      average_engagement: 0.84,
      trending_creators: 12,
      upcoming_events: 15,
      discovery_zones: 5,
      heat_map_intensity: 0.78
    };
  }
}

const geolocationService = new GeolocationService();

// Routes API
discoveryRouter.get('/events', async (req: any, res: Response) => {
  try {
    const { lat, lng, radius } = req.query;
    const events = await geolocationService.getEventsByLocation(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseInt(radius as string) || 50
    );
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur géolocalisation', details: error.message });
  }
});

discoveryRouter.get('/creators', async (req: any, res: Response) => {
  try {
    const { lat, lng, radius } = req.query;
    const creators = await geolocationService.getCreatorsByLocation(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseInt(radius as string) || 50
    );
    res.json(creators);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur géolocalisation', details: error.message });
  }
});

discoveryRouter.get('/search-creators', async (req: any, res: Response) => {
  try {
    const { lat, lng, radius, ...filters } = req.query;
    const creators = await geolocationService.searchCreatorsByLocation(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseInt(radius as string) || 50,
      filters
    );
    res.json(creators);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur géolocalisation', details: error.message });
  }
});

discoveryRouter.get('/discovery-zones', async (req: any, res: Response) => {
  try {
    const { lat, lng, radius } = req.query;
    const zones = await geolocationService.getDiscoveryZones(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseInt(radius as string) || 100
    );
    res.json(zones);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur géolocalisation', details: error.message });
  }
});

discoveryRouter.get('/heat-maps', async (req: any, res: Response) => {
  try {
    const { type } = req.query;
    const heatMaps = await geolocationService.getHeatMaps(type as string);
    res.json(heatMaps);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur géolocalisation', details: error.message });
  }
});

discoveryRouter.get('/nearby-discovery', async (req: any, res: Response) => {
  try {
    const { lat, lng, radius } = req.query;
    const discovery = await geolocationService.getNearbyDiscovery(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseInt(radius as string) || 50
    );
    res.json(discovery);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur géolocalisation', details: error.message });
  }
});

discoveryRouter.get('/location/:locationId/stats', async (req: any, res: Response) => {
  try {
    const { locationId } = req.params;
    const stats = await geolocationService.getLocationStats(locationId);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur géolocalisation', details: error.message });
  }
});

export default discoveryRouter; 