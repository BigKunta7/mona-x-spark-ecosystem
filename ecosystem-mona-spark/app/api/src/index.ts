import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { monaDB, sparkDB, analyticsDB, db } from './database';
import { monaMarketFitRouter } from './scoring/mona-market-fit';

const app = express();
const PORT = process.env.PORT || 3001;

import financeRouter from './finance';
import aiRouter from './ai';
import gamificationRouter from './gamification';
import geolocationRouter from './geolocation';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/finance', financeRouter);
app.use('/api/ai', aiRouter);
app.use('/api/gamification', gamificationRouter);
app.use('/api/geolocation', geolocationRouter);
app.use('/api/mona-market-fit', monaMarketFitRouter);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Health check
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await db.health();
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'MONA x SPARK API',
      version: '1.0.0',
      database: dbHealth.status
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: 'Database connection failed'
    });
  }
});

// Status endpoint
app.get('/status', async (req, res) => {
  try {
    const dbHealth = await db.health();
    res.json({
      status: 'operational',
      services: {
        api: 'running',
        database: dbHealth.status,
        redis: 'connected'
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      status: 'degraded',
      error: 'Database connection failed'
    });
  }
});

// MONA Routes
app.get('/api/mona/services', (req, res) => {
  res.json({
    services: [
      {
        id: 'mona-290',
        name: 'MONA 290',
        price: 290,
        description: 'Campagne marketing rapide, résultats immédiats',
        features: [
          'Audit digital express',
          'Plan de contenu 2 semaines',
          'Social kit personnalisé',
          'Suivi performance'
        ],
        duration: '2 semaines'
      },
      {
        id: 'mona-390',
        name: 'MONA 390',
        price: 390,
        description: 'Audit, éditorialité, social kit, plan de contenu',
        features: [
          'Audit complet digital',
          'Stratégie éditoriale',
          'Social kit premium',
          'Plan de contenu 1 mois',
          'Coaching 2 sessions'
        ],
        duration: '1 mois'
      },
      {
        id: 'mona-490',
        name: 'MONA 490+',
        price: 490,
        description: 'Accompagnement long terme, sponsors, coaching',
        features: [
          'Accompagnement 3 mois',
          'Recherche sponsors',
          'Coaching hebdomadaire',
          'Stratégie monétisation',
          'Support prioritaire'
        ],
        duration: '3 mois'
      }
    ]
  });
});

app.post('/api/mona/contact', async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    
    // Validation basique
    if (!name || !email || !service) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'service']
      });
    }

    // Enregistrer en base de données
    const contact = await monaDB.createContact({
      name,
      email,
      service,
      message
    });

    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      contact
    });
    return;
  } catch (error: any) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      error: 'Failed to create contact',
      message: error.message
    });
    return;
  }
});

// Récupérer tous les contacts MONA
app.get('/api/mona/contacts', async (req, res) => {
  try {
    const contacts = await monaDB.getContacts();
    res.json({
      success: true,
      contacts
    });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      error: 'Failed to fetch contacts',
      message: error.message
    });
  }
});

// SPARK Routes
app.get('/api/spark/editions', (req, res) => {
  res.json({
    editions: [
      {
        id: 'spark-weekend',
        name: 'SPARK Weekend',
        duration: '3 jours',
        price: 1500,
        description: 'Immersion créative intensive',
        features: [
          'Villa créative exclusive',
          'Twitch live intégré',
          'Mini-documentaire',
          'Showcase final',
          'Réseaux sociaux'
        ],
        maxParticipants: 8
      },
      {
        id: 'spark-week',
        name: 'SPARK Week',
        duration: '7 jours',
        price: 3000,
        description: 'Expérience créative complète',
        features: [
          'Séjour villa premium',
          'Contenu multi-plateforme',
          'Documentaire complet',
          'Showcase événement',
          'Stratégie viral'
        ],
        maxParticipants: 12
      },
      {
        id: 'spark-month',
        name: 'SPARK Month',
        duration: '1 mois',
        price: 8000,
        description: 'Programme créatif étendu',
        features: [
          'Programme personnalisé',
          'Contenu viral garanti',
          'Sponsors inclus',
          'Monétisation optimisée',
          'Suivi post-édition'
        ],
        maxParticipants: 6
      }
    ]
  });
});

app.post('/api/spark/booking', async (req, res) => {
  try {
    const { name, email, edition, participants, dates, message } = req.body;
    
    // Validation basique
    if (!name || !email || !edition) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'edition']
      });
    }

    // Enregistrer en base de données
    const booking = await sparkDB.createBooking({
      name,
      email,
      edition,
      participants: participants || 1,
      dates,
      message
    });

    res.json({
      success: true,
      message: 'Booking request submitted successfully',
      booking
    });
    return;
  } catch (error: any) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      error: 'Failed to create booking',
      message: error.message
    });
    return;
  }
});

// Récupérer toutes les réservations SPARK
app.get('/api/spark/bookings', async (req, res) => {
  try {
    const bookings = await sparkDB.getBookings();
    res.json({
      success: true,
      bookings
    });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      error: 'Failed to fetch bookings',
      message: error.message
    });
  }
});

// Analytics Routes
app.get('/api/analytics/overview', async (req, res) => {
  try {
    const stats = await analyticsDB.getStats();
    res.json({
      overview: {
        totalContacts: stats.totalContacts,
        totalBookings: stats.totalBookings,
        conversionRate: 14.7,
        revenue: {
          mona: stats.monaRevenue,
          spark: 89000,
          total: stats.monaRevenue + 89000
        },
        monthlyGrowth: 23.5
      }
    });
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      error: 'Failed to fetch analytics',
      message: error.message
    });
  }
});

// Dashboard Routes
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats = await analyticsDB.getStats();
    res.json({
      stats: {
        activeProjects: 12,
        pendingContacts: stats.totalContacts,
        upcomingEvents: 3,
        monthlyRevenue: stats.monaRevenue,
        conversionRate: 14.7,
        averageResponseTime: '2.3h'
      }
    });
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard stats',
      message: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'MONA x SPARK API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      status: '/status',
      mona: {
        services: '/api/mona/services',
        contact: '/api/mona/contact',
        contacts: '/api/mona/contacts'
      },
      spark: {
        editions: '/api/spark/editions',
        booking: '/api/spark/booking',
        bookings: '/api/spark/bookings'
      },
      analytics: {
        overview: '/api/analytics/overview'
      },
      dashboard: {
        stats: '/api/dashboard/stats'
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    availableEndpoints: [
      '/health',
      '/status',
      '/api/mona/services',
      '/api/mona/contact',
      '/api/mona/contacts',
      '/api/spark/editions',
      '/api/spark/booking',
      '/api/spark/bookings',
      '/api/analytics/overview',
      '/api/dashboard/stats'
    ]
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MONA x SPARK API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Status: http://localhost:${PORT}/status`);
  console.log(`📊 Mona Market Fit API: http://localhost:${PORT}/api/mona-market-fit`);
}); 