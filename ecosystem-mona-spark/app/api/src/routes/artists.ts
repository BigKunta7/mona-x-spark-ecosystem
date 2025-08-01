import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/artists - Liste des artistes avec filtres
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      status, 
      genre, 
      monaScore, 
      page = 1, 
      limit = 20,
      search 
    } = req.query;

    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (genre && genre !== 'all') {
      where.genre = genre;
    }
    
    if (monaScore && monaScore !== 'all') {
      const scoreRange = {
        high: { gte: 80 },
        medium: { gte: 60, lt: 80 },
        low: { lt: 60 }
      };
      where.score_mona = scoreRange[monaScore as keyof typeof scoreRange];
    }
    
    if (search) {
      where.OR = [
        { artist_name: { contains: search as string, mode: 'insensitive' } },
        { bio: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const artists = await prisma.artists.findMany({
      where,
      include: {
        user: true,
        interactions: {
          orderBy: { created_at: 'desc' },
          take: 5
        },
        opportunities: {
          orderBy: { created_at: 'desc' },
          take: 5
        }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { score_mona: 'desc' }
    });

    const total = await prisma.artists.count({ where });

    res.json({
      artists,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des artistes' });
  }
});

// GET /api/artists/:id - Détails d'un artiste
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const artist = await prisma.artists.findUnique({
      where: { id },
      include: {
        user: true,
        interactions: {
          orderBy: { created_at: 'desc' }
        },
        opportunities: {
          orderBy: { created_at: 'desc' }
        }
      }
    });

    if (!artist) {
      return res.status(404).json({ error: 'Artiste non trouvé' });
    }

    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'artiste' });
  }
});

// POST /api/artists - Créer un nouvel artiste
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      artistName,
      genre,
      phone,
      bio
    } = req.body;

    // Créer l'utilisateur d'abord
    const user = await prisma.users.create({
      data: {
        email,
        password_hash: password, // À hasher en production
        first_name: firstName,
        last_name: lastName,
        user_type: 'artist',
        phone
      }
    });

    // Créer l'artiste
    const artist = await prisma.artists.create({
      data: {
        id: user.id,
        artist_name: artistName,
        genre,
        bio,
        score_mona: 0,
        level: 'prospect'
      },
      include: {
        user: true
      }
    });

    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'artiste' });
  }
});

// PUT /api/artists/:id - Mettre à jour un artiste
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const artist = await prisma.artists.update({
      where: { id },
      data: updateData,
      include: {
        user: true
      }
    });

    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'artiste' });
  }
});

// DELETE /api/artists/:id - Supprimer un artiste
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.artists.delete({
      where: { id }
    });

    await prisma.users.delete({
      where: { id }
    });

    res.json({ message: 'Artiste supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'artiste' });
  }
});

// POST /api/artists/:id/interactions - Ajouter une interaction
router.post('/:id/interactions', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, description, outcome, nextAction, assignedTo } = req.body;

    const interaction = await prisma.interactions.create({
      data: {
        artist_id: id,
        type,
        description,
        outcome,
        next_action: nextAction,
        assigned_to: assignedTo
      }
    });

    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'interaction' });
  }
});

// POST /api/artists/:id/opportunities - Ajouter une opportunité
router.post('/:id/opportunities', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, value, probability, stage, expectedClose, description } = req.body;

    const opportunity = await prisma.opportunities.create({
      data: {
        artist_id: id,
        title,
        value,
        probability,
        stage,
        expected_close: expectedClose,
        description
      }
    });

    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'opportunité' });
  }
});

// PUT /api/artists/:id/status - Changer le statut d'un artiste
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const artist = await prisma.artists.update({
      where: { id },
      data: { level: status },
      include: {
        user: true
      }
    });

    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du changement de statut' });
  }
});

// GET /api/artists/pipeline/stats - Statistiques du pipeline
router.get('/pipeline/stats', async (req: Request, res: Response) => {
  try {
    const stats = await prisma.artists.groupBy({
      by: ['level'],
      _count: {
        id: true
      }
    });

    const total = await prisma.artists.count();
    const averageScore = await prisma.artists.aggregate({
      _avg: {
        score_mona: true
      }
    });

    const conversionRate = await prisma.artists.count({
      where: { level: 'signed' }
    }) / total * 100;

    res.json({
      pipelineStats: stats,
      total,
      averageScore: averageScore._avg.score_mona || 0,
      conversionRate
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

export default router; 