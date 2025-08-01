import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import des routes
import aiPlugAndPlayRouter from './ai/plug-and-play';
import aiGamificationRouter from './ai/gamification';
import aiGeolocationRouter from './ai/geolocation';
import financeRouter from './finance';
import scoringRouter from './scoring/engine';
import automationRouter from './automation/sequences';

const app = express();

// Middleware de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});
app.use(limiter);

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes API
app.use('/api/ai/plug-and-play', aiPlugAndPlayRouter);
app.use('/api/ai/gamification', aiGamificationRouter);
app.use('/api/ai/geolocation', aiGeolocationRouter);
app.use('/api/finance', financeRouter);
app.use('/api/scoring', scoringRouter);
app.use('/api/automation', automationRouter);

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'MONA x SPARK API',
    version: '1.0.0',
    endpoints: {
      ai: {
        'plug-and-play': '/api/ai/plug-and-play',
        gamification: '/api/ai/gamification',
        geolocation: '/api/ai/geolocation'
      },
      finance: '/api/finance',
      scoring: '/api/scoring',
      automation: '/api/automation',
      health: '/health'
    }
  });
});

// Middleware de gestion d'erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur API:', err);
  
  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur',
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

export default app; 