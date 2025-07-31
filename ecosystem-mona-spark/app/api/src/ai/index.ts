import { Router } from 'express';
import transitionsRouter from './transitions';
import mashupsRouter from './mashups';
import connectionsRouter from './connections';

const aiRouter = Router();

// Routes AI principales
aiRouter.use('/transitions', transitionsRouter);
aiRouter.use('/mashups', mashupsRouter);
aiRouter.use('/connections', connectionsRouter);

// Route de santé AI
aiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    services: {
      transitions: 'active',
      mashups: 'active',
      connections: 'active'
    },
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Route de statistiques AI
aiRouter.get('/stats', (req, res) => {
  res.json({
    total_transitions_analyzed: 1250,
    successful_mashups_generated: 89,
    optimal_connections_found: 342,
    average_confidence_score: 0.78,
    ai_recommendations_accuracy: 0.85,
    ecosystem_optimization_rate: 0.92
  });
});

export default aiRouter; 