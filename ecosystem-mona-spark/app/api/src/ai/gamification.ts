import { Router, Response } from 'express';

const router = Router();

// Types pour la Gamification
interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'achievement' | 'milestone' | 'special';
  icon: string;
  points: number;
  requirements: BadgeRequirement[];
}

interface BadgeRequirement {
  type: 'followers' | 'engagement' | 'collaborations' | 'events' | 'revenue';
  value: number;
  condition: 'gte' | 'lte' | 'eq';
}

interface UserBadge {
  user_id: string;
  badge_id: string;
  earned_at: Date;
  progress: number;
}

interface LeaderboardEntry {
  user_id: string;
  name: string;
  total_points: number;
  badges_count: number;
  rank: number;
  category: string;
}

// Service de Gamification
class GamificationService {
  private badges: Badge[] = [
    {
      id: 'first_collaboration',
      name: 'Première Collaboration',
      description: 'A participé à sa première collaboration',
      category: 'milestone',
      icon: '🤝',
      points: 50,
      requirements: [{ type: 'collaborations', value: 1, condition: 'gte' }]
    },
    {
      id: 'spark_ready',
      name: 'SPARK Ready',
      description: 'Atteint le niveau SPARK-READY',
      category: 'achievement',
      icon: '⭐',
      points: 200,
      requirements: [{ type: 'followers', value: 10000, condition: 'gte' }]
    },
    {
      id: 'community_builder',
      name: 'Bâtisseur de Communauté',
      description: 'A développé une communauté de 5000+ followers',
      category: 'milestone',
      icon: '🏗️',
      points: 100,
      requirements: [{ type: 'followers', value: 5000, condition: 'gte' }]
    },
    {
      id: 'engagement_master',
      name: 'Maître de l\'Engagement',
      description: 'Maintient un taux d\'engagement de 10%+',
      category: 'achievement',
      icon: '🎯',
      points: 150,
      requirements: [{ type: 'engagement', value: 10, condition: 'gte' }]
    },
    {
      id: 'event_organizer',
      name: 'Organisateur d\'Événements',
      description: 'A organisé 3+ événements',
      category: 'milestone',
      icon: '🎪',
      points: 300,
      requirements: [{ type: 'events', value: 3, condition: 'gte' }]
    },
    {
      id: 'revenue_champion',
      name: 'Champion du Revenue',
      description: 'A généré 10k€+ de revenue',
      category: 'achievement',
      icon: '💰',
      points: 500,
      requirements: [{ type: 'revenue', value: 10000, condition: 'gte' }]
    }
  ];

  private userBadges: UserBadge[] = [];
  private leaderboard: LeaderboardEntry[] = [];

  async getUserBadges(userId: string): Promise<UserBadge[]> {
    return this.userBadges.filter(ub => ub.user_id === userId);
  }

  async getAllBadges(): Promise<Badge[]> {
    return this.badges;
  }

  async checkBadgeEligibility(userId: string, userMetrics: any): Promise<Badge[]> {
    const earnedBadges = this.userBadges.filter(ub => ub.user_id === userId).map(ub => ub.badge_id);
    const eligibleBadges: Badge[] = [];

    for (const badge of this.badges) {
      if (earnedBadges.includes(badge.id)) continue;

      let isEligible = true;
      for (const requirement of badge.requirements) {
        const userValue = userMetrics[requirement.type] || 0;
        
        switch (requirement.condition) {
          case 'gte':
            if (userValue < requirement.value) isEligible = false;
            break;
          case 'lte':
            if (userValue > requirement.value) isEligible = false;
            break;
          case 'eq':
            if (userValue !== requirement.value) isEligible = false;
            break;
        }
      }

      if (isEligible) {
        eligibleBadges.push(badge);
      }
    }

    return eligibleBadges;
  }

  async awardBadge(userId: string, badgeId: string): Promise<UserBadge> {
    const badge = this.badges.find(b => b.id === badgeId);
    if (!badge) {
      throw new Error('Badge non trouvé');
    }

    const userBadge: UserBadge = {
      user_id: userId,
      badge_id: badgeId,
      earned_at: new Date(),
      progress: 100
    };

    this.userBadges.push(userBadge);
    return userBadge;
  }

  async getLeaderboard(category?: string): Promise<LeaderboardEntry[]> {
    let entries = this.leaderboard;
    
    if (category) {
      entries = entries.filter(entry => entry.category === category);
    }

    return entries.sort((a, b) => b.total_points - a.total_points);
  }

  async updateUserProgress(userId: string, metrics: any): Promise<any> {
    // Vérifier l'éligibilité aux badges
    const eligibleBadges = await this.checkBadgeEligibility(userId, metrics);
    
    // Attribuer automatiquement les badges éligibles
    const awardedBadges = [];
    for (const badge of eligibleBadges) {
      const userBadge = await this.awardBadge(userId, badge.id);
      awardedBadges.push(userBadge);
    }

    // Mettre à jour le leaderboard
    await this.updateLeaderboard(userId, metrics);

    return {
      eligible_badges: eligibleBadges,
      awarded_badges: awardedBadges,
      total_points: this.calculateTotalPoints(userId)
    };
  }

  private async updateLeaderboard(userId: string, metrics: any): Promise<void> {
    const totalPoints = this.calculateTotalPoints(userId);
    const badgesCount = this.userBadges.filter(ub => ub.user_id === userId).length;
    
    const existingEntry = this.leaderboard.find(entry => entry.user_id === userId);
    
    if (existingEntry) {
      existingEntry.total_points = totalPoints;
      existingEntry.badges_count = badgesCount;
    } else {
      this.leaderboard.push({
        user_id: userId,
        name: `User ${userId}`, // À remplacer par le vrai nom
        total_points: totalPoints,
        badges_count: badgesCount,
        rank: 0,
        category: this.determineCategory(metrics)
      });
    }

    // Recalculer les rangs
    this.leaderboard.sort((a, b) => b.total_points - a.total_points);
    this.leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
  }

  private calculateTotalPoints(userId: string): number {
    const userBadges = this.userBadges.filter(ub => ub.user_id === userId);
    return userBadges.reduce((total, ub) => {
      const badge = this.badges.find(b => b.id === ub.badge_id);
      return total + (badge?.points || 0);
    }, 0);
  }

  private determineCategory(metrics: any): string {
    if (metrics.followers >= 10000) return 'SPARK-READY';
    if (metrics.followers >= 5000) return 'MONA-POSSIBLE';
    if (metrics.followers >= 1000) return 'EN-DEVELOPPEMENT';
    return 'NON-PRIORITAIRE';
  }
}

const gamificationService = new GamificationService();

// Routes API
router.get('/badges', async (req: any, res: Response) => {
  try {
    const badges = await gamificationService.getAllBadges();
    res.json(badges);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur récupération badges', details: error.message });
  }
});

router.get('/user/:userId/badges', async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const badges = await gamificationService.getUserBadges(userId);
    res.json(badges);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur récupération badges utilisateur', details: error.message });
  }
});

router.get('/leaderboards', async (req: any, res: Response) => {
  try {
    const { category } = req.query;
    const leaderboard = await gamificationService.getLeaderboard(category as string);
    res.json(leaderboard);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur récupération leaderboard', details: error.message });
  }
});

router.post('/award-badge', async (req: any, res: Response) => {
  try {
    const { userId, badgeId } = req.body;
    const userBadge = await gamificationService.awardBadge(userId, badgeId);
    res.json(userBadge);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur attribution badge', details: error.message });
  }
});

router.post('/update-progress', async (req: any, res: Response) => {
  try {
    const { userId, metrics } = req.body;
    const progress = await gamificationService.updateUserProgress(userId, metrics);
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur mise à jour progression', details: error.message });
  }
});

export default router; 