import winston from 'winston';
import path from 'path';

// Configuration des formats
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level}]: ${message}`;
    
    if (Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta)}`;
    }
    
    if (stack) {
      log += `\n${stack}`;
    }
    
    return log;
  })
);

// Configuration des transports
const transports: winston.transport[] = [
  // Logs d'erreur
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'error.log'),
    level: 'error',
    format: logFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }),
  
  // Logs combinés
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'combined.log'),
    format: logFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }),
  
  // Logs d'audit
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'audit.log'),
    level: 'info',
    format: logFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 10
  })
];

// Transport console pour le développement
if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat
    })
  );
}

// Création du logger principal
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports,
  exitOnError: false
});

// Logger spécialisé pour l'audit
export const auditLogger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'audit.log'),
      format: logFormat
    })
  ]
});

// Logger spécialisé pour les performances
export const performanceLogger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'performance.log'),
      format: logFormat
    })
  ]
});

// Logger spécialisé pour la sécurité
export const securityLogger = winston.createLogger({
  level: 'warn',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'security.log'),
      format: logFormat
    })
  ]
});

// Fonctions utilitaires
export const logUserAction = (userId: string, action: string, details?: any) => {
  auditLogger.info('User Action', {
    userId,
    action,
    details,
    timestamp: new Date().toISOString()
  });
};

export const logPerformance = (operation: string, duration: number, details?: any) => {
  performanceLogger.info('Performance', {
    operation,
    duration,
    details,
    timestamp: new Date().toISOString()
  });
};

export const logSecurityEvent = (event: string, severity: 'low' | 'medium' | 'high', details?: any) => {
  const level = severity === 'high' ? 'error' : severity === 'medium' ? 'warn' : 'info';
  securityLogger.log(level, 'Security Event', {
    event,
    severity,
    details,
    timestamp: new Date().toISOString()
  });
};

export const logAPIRequest = (method: string, path: string, statusCode: number, duration: number, userId?: string) => {
  logger.info('API Request', {
    method,
    path,
    statusCode,
    duration,
    userId,
    timestamp: new Date().toISOString()
  });
};

export const logDatabaseQuery = (query: string, duration: number, table?: string) => {
  performanceLogger.info('Database Query', {
    query,
    duration,
    table,
    timestamp: new Date().toISOString()
  });
};

export const logError = (error: Error, context?: any) => {
  logger.error('Application Error', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  });
};

// Middleware pour logger les requêtes HTTP
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logAPIRequest(
      req.method,
      req.path,
      res.statusCode,
      duration,
      req.user?.id
    );
  });
  
  next();
};

// Fonction pour nettoyer les anciens logs
export const cleanupLogs = async (daysToKeep: number = 30) => {
  const fs = require('fs');
  const path = require('path');
  
  const logsDir = path.join(process.cwd(), 'logs');
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  
  try {
    const files = fs.readdirSync(logsDir);
    
    for (const file of files) {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime < cutoffDate) {
        fs.unlinkSync(filePath);
        logger.info(`Deleted old log file: ${file}`);
      }
    }
  } catch (error) {
    logger.error('Error cleaning up logs', { error: error.message });
  }
};

// Fonction pour obtenir les statistiques des logs
export const getLogStats = () => {
  const fs = require('fs');
  const path = require('path');
  
  const logsDir = path.join(process.cwd(), 'logs');
  const stats: any = {};
  
  try {
    const files = fs.readdirSync(logsDir);
    
    for (const file of files) {
      const filePath = path.join(logsDir, file);
      const fileStats = fs.statSync(filePath);
      
      stats[file] = {
        size: fileStats.size,
        modified: fileStats.mtime,
        sizeInMB: (fileStats.size / 1024 / 1024).toFixed(2)
      };
    }
  } catch (error) {
    logger.error('Error getting log stats', { error: error.message });
  }
  
  return stats;
};

export default logger; 