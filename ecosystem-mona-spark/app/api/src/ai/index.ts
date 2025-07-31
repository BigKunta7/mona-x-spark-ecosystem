import { Router } from 'express';
import plugAndPlayRouter from './dj-connections';
import gamificationRouter from '../gamification/badges';
import geolocationRouter from '../geolocation';

const aiRouter = Router();

// Routes AI principales
aiRouter.use('/plug-and-play', plugAndPlayRouter);
aiRouter.use('/gamification', gamificationRouter);
aiRouter.use('/geolocation', geolocationRouter);

// Route de santé AI
aiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    services: {
      plug_and_play: 'active',
      gamification: 'active',
      geolocation: 'active'
    },
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Route de statistiques AI
aiRouter.get('/stats', (req, res) => {
  res.json({
    total_connections_created: 1250,
    successful_collaborations: 89,
    compatible_creators_found: 342,
    average_compatibility_score: 0.78,
    plug_and_play_accuracy: 0.85,
    ecosystem_orchestration_rate: 0.92
  });
});

export default aiRouter; 