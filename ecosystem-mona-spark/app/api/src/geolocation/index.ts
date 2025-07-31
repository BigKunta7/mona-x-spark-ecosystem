import { Router } from 'express';
import discoveryRouter from './discovery';

const geolocationRouter = Router();

// Routes de géolocalisation principales
geolocationRouter.use('/discovery', discoveryRouter);

// Route de santé géolocalisation
geolocationRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    services: {
      discovery: 'active',
      heatmaps: 'active',
      zones: 'active'
    },
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Route de statistiques géolocalisation
geolocationRouter.get('/stats', (req, res) => {
  res.json({
    total_locations: 156,
    total_events_discovered: 89,
    total_creators_found: 342,
    average_discovery_score: 0.78,
    heat_maps_generated: 15,
    discovery_zones_created: 8
  });
});

export default geolocationRouter; 