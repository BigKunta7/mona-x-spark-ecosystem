import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface pour étendre Request avec user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        user_type: string;
        first_name: string;
        last_name: string;
      };
    }
  }
}

// Middleware d'authentification
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès requis' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        user_type: true,
        first_name: true,
        last_name: true,
        is_active: true
      }
    });

    if (!user || !user.is_active) {
      return res.status(401).json({ error: 'Utilisateur invalide ou inactif' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token invalide' });
  }
};

// Middleware d'autorisation par rôle
export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentification requise' });
    }

    if (!roles.includes(req.user.user_type)) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    next();
  };
};

// Middleware de validation des données
export const validateData = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ 
          error: 'Données invalides', 
          details: error.details 
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Erreur de validation' });
    }
  };
};

// Middleware de rate limiting
export const rateLimit = (windowMs: number = 15 * 60 * 1000, max: number = 100) => {
  const requests = new Map();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Nettoyer les anciennes requêtes
    if (requests.has(ip)) {
      requests.set(ip, requests.get(ip).filter((timestamp: number) => timestamp > windowStart));
    } else {
      requests.set(ip, []);
    }

    const userRequests = requests.get(ip);
    
    if (userRequests.length >= max) {
      return res.status(429).json({ 
        error: 'Trop de requêtes. Veuillez réessayer plus tard.' 
      });
    }

    userRequests.push(now);
    next();
  };
};

// Middleware de logging
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};

// Middleware de gestion d'erreurs
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Données invalides', 
      details: error.message 
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ 
      error: 'Non autorisé' 
    });
  }

  if (error.name === 'NotFoundError') {
    return res.status(404).json({ 
      error: 'Ressource non trouvée' 
    });
  }

  return res.status(500).json({ 
    error: 'Erreur interne du serveur' 
  });
};

// Utilitaires d'authentification
export const authUtils = {
  // Hasher un mot de passe
  hashPassword: async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  // Vérifier un mot de passe
  comparePassword: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  },

  // Générer un token JWT
  generateToken: (userId: string, userType: string): string => {
    return jwt.sign(
      { userId, userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
  },

  // Générer un token de rafraîchissement
  generateRefreshToken: (userId: string): string => {
    return jwt.sign(
      { userId, type: 'refresh' },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      { expiresIn: '7d' }
    );
  },

  // Vérifier un token de rafraîchissement
  verifyRefreshToken: (token: string): any => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key');
  }
};

// Middleware de sécurité CORS
export const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware de sécurité des en-têtes
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
}; 