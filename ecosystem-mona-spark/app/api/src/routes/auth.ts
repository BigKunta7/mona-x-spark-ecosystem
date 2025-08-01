import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Inscription utilisateur
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.users.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.users.create({
      data: {
        email,
        password_hash: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        user_type: userType
      }
    });

    // Créer le profil spécifique selon le type
    if (userType === 'artist') {
      await prisma.artists.create({
        data: {
          id: user.id,
          artist_name: `${firstName} ${lastName}`,
          score_mona: 0,
          level: 'prospect'
        }
      });
    } else if (userType === 'expert') {
      await prisma.experts.create({
        data: {
          id: user.id,
          specialty: req.body.specialty || 'Général',
          hourly_rate: req.body.hourlyRate || 0
        }
      });
    } else if (userType === 'sponsor') {
      await prisma.sponsors.create({
        data: {
          id: user.id,
          company_name: req.body.companyName || '',
          industry: req.body.industry || ''
        }
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Connexion utilisateur
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier si NDA signé
    if (!user.nda_signed) {
      return res.status(403).json({ 
        error: 'NDA non signé',
        requiresNDA: true,
        userId: user.id
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type
      }
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Signer NDA
router.post('/sign-nda', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await prisma.users.update({
      where: { id: userId },
      data: {
        nda_signed: true,
        nda_signed_at: new Date()
      }
    });

    res.json({
      message: 'NDA signé avec succès',
      user: {
        id: user.id,
        email: user.email,
        ndaSigned: user.nda_signed,
        ndaSignedAt: user.nda_signed_at
      }
    });

  } catch (error) {
    console.error('Erreur lors de la signature NDA:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Middleware d'authentification
export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

export default router; 