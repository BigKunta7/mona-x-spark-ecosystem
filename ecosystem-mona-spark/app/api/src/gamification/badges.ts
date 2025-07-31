import { Router, Response } from 'express';

const badgesRouter = Router();

// Types pour la gamification
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'creator' | 'investor' | 'fan' | 'event' | 'collaboration';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: BadgeRequirement[];
  rewards: BadgeReward[];
  unlocked_at?: Date;
}

interface BadgeRequirement {
  type: 'followers' | 'events' | 'investments' | 'collaborations' | 'revenue' | 'location' | 'engagement';
  value: number;
  description: string;
}

interface BadgeReward {
  type: 'points' | 'feature' | 'discount' | 'access' | 'recognition';
  value: number | string;
  description: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  progress: number;
  target: number;
  completed: boolean;
  completed_at?: Date;
  rewards: AchievementReward[];
}

interface AchievementReward {
  type: 'badge' | 'points' | 'feature' | 'recognition';
  value: string | number;
  description: string;
}

interface Leaderboard {
  id: string;
  name: string;
  category: 'creators' | 'investors' | 'events' | 'cities';
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all_time';
  entries: LeaderboardEntry[];
  user_rank?: number;
}

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar: string;
  score: number;
  metric: string;
  change?: number;
}

interface UserGamification {
  user_id: string;
  level: number;
  experience: number;
  total_points: number;
  badges: Badge[];
  achievements: Achievement[];
  leaderboard_rankings: LeaderboardRanking[];
  rewards_history: RewardHistory[];
}

interface LeaderboardRanking {
  leaderboard_id: string;
  rank: number;
  score: number;
  category: string;
}

interface RewardHistory {
  id: string;
  type: string;
  value: string | number;
  earned_at: Date;
  description: string;
}

// Service de Gamification
class GamificationService {
  // Badges prédéfinis
  private badges: Badge[] = [
    {
      id: 'first_event',
      name: 'Premier Événement',
      description: 'Organisez votre premier événement SPARK',
      icon: '🎉',
      category: 'event',
      rarity: 'common',
      requirements: [{ type: 'events', value: 1, description: 'Organiser 1 événement' }],
      rewards: [{ type: 'points', value: 100, description: '+100 points d\'expérience' }]
    },
    {
      id: 'social_butterfly',
      name: 'Papillon Social',
      description: 'Connectez-vous avec 50+ créateurs',
      icon: '🦋',
      category: 'collaboration',
      rarity: 'rare',
      requirements: [{ type: 'collaborations', value: 50, description: '50+ collaborations' }],
      rewards: [{ type: 'feature', value: 'premium_networking', description: 'Accès réseau premium' }]
    },
    {
      id: 'investor_legend',
      name: 'Légende Investisseur',
      description: 'Investissez dans 10+ créateurs avec succès',
      icon: '💰',
      category: 'investor',
      rarity: 'epic',
      requirements: [{ type: 'investments', value: 10, description: '10+ investissements réussis' }],
      rewards: [{ type: 'recognition', value: 'investor_legend', description: 'Badge légendaire' }]
    },
    {
      id: 'local_hero',
      name: 'Héros Local',
      description: 'Devenez le créateur le plus populaire de votre ville',
      icon: '🏆',
      category: 'creator',
      rarity: 'legendary',
      requirements: [{ type: 'location', value: 1, description: 'Top 1 de votre ville' }],
      rewards: [{ type: 'feature', value: 'city_ambassador', description: 'Ambassadeur de ville' }]
    },
    {
      id: 'revenue_master',
      name: 'Maître des Revenus',
      description: 'Générez 10,000€+ de revenus via la plateforme',
      icon: '💎',
      category: 'creator',
      rarity: 'epic',
      requirements: [{ type: 'revenue', value: 10000, description: '10,000€+ de revenus' }],
      rewards: [{ type: 'discount', value: 20, description: '20% de réduction sur les frais' }]
    },
    {
      id: 'engagement_king',
      name: 'Roi de l\'Engagement',
      description: 'Atteignez 90%+ d\'engagement sur vos contenus',
      icon: '👑',
      category: 'creator',
      rarity: 'rare',
      requirements: [{ type: 'engagement', value: 90, description: '90%+ d\'engagement' }],
      rewards: [{ type: 'feature', value: 'priority_algorithm', description: 'Priorité algorithmique' }]
    },
    {
      id: 'festival_organizer',
      name: 'Organisateur de Festival',
      description: 'Organisez un festival avec 1000+ participants',
      icon: '🎪',
      category: 'event',
      rarity: 'epic',
      requirements: [{ type: 'events', value: 1000, description: 'Festival 1000+ participants' }],
      rewards: [{ type: 'recognition', value: 'festival_master', description: 'Maître des festivals' }]
    },
    {
      id: 'collaboration_master',
      name: 'Maître de la Collaboration',
      description: 'Créez 20+ projets collaboratifs réussis',
      icon: '🤝',
      category: 'collaboration',
      rarity: 'rare',
      requirements: [{ type: 'collaborations', value: 20, description: '20+ collaborations réussies' }],
      rewards: [{ type: 'feature', value: 'collaboration_boost', description: 'Boost collaboration' }]
    }
  ];

  // Achievements prédéfinis
  private achievements: Achievement[] = [
    {
      id: 'early_adopter',
      name: 'Early Adopter',
      description: 'Rejoignez MONA x SPARK dans les 100 premiers utilisateurs',
      icon: '🚀',
      category: 'milestone',
      progress: 0,
      target: 1,
      completed: false,
      rewards: [{ type: 'badge', value: 'early_adopter_badge', description: 'Badge Early Adopter' }]
    },
    {
      id: 'network_builder',
      name: 'Constructeur de Réseau',
      description: 'Connectez-vous avec 100+ créateurs',
      icon: '🌐',
      category: 'social',
      progress: 0,
      target: 100,
      completed: false,
      rewards: [{ type: 'points', value: 500, description: '+500 points d\'expérience' }]
    },
    {
      id: 'revenue_champion',
      name: 'Champion des Revenus',
      description: 'Générez 50,000€+ de revenus totaux',
      icon: '💎',
      category: 'financial',
      progress: 0,
      target: 50000,
      completed: false,
      rewards: [{ type: 'feature', value: 'vip_status', description: 'Statut VIP' }]
    },
    {
      id: 'event_series',
      name: 'Série d\'Événements',
      description: 'Organisez 10 événements consécutifs',
      icon: '📅',
      category: 'event',
      progress: 0,
      target: 10,
      completed: false,
      rewards: [{ type: 'recognition', value: 'event_series_master', description: 'Maître des séries' }]
    },
    {
      id: 'city_dominator',
      name: 'Dominateur de Ville',
      description: 'Devenez le créateur #1 dans 5 villes différentes',
      icon: '🏙️',
      category: 'geographic',
      progress: 0,
      target: 5,
      completed: false,
      rewards: [{ type: 'badge', value: 'city_dominator_badge', description: 'Badge Dominateur' }]
    }
  ];

  // Obtenir tous les badges disponibles
  async getAvailableBadges(): Promise<Badge[]> {
    return this.badges;
  }

  // Obtenir les badges d'un utilisateur
  async getUserBadges(userId: string): Promise<Badge[]> {
    // Simuler les badges débloqués par l'utilisateur
    const userBadges = this.badges.slice(0, 3).map(badge => ({
      ...badge,
      unlocked_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Derniers 30 jours
    }));
    
    return userBadges;
  }

  // Vérifier et débloquer les badges
  async checkAndUnlockBadges(userId: string, userStats: any): Promise<Badge[]> {
    const unlockedBadges: Badge[] = [];
    
    for (const badge of this.badges) {
      const isUnlocked = this.checkBadgeRequirements(badge, userStats);
      if (isUnlocked) {
        unlockedBadges.push({
          ...badge,
          unlocked_at: new Date()
        });
      }
    }
    
    return unlockedBadges;
  }

  // Obtenir les achievements d'un utilisateur
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    // Simuler les achievements avec progression
    return this.achievements.map((achievement, index) => ({
      ...achievement,
      progress: Math.floor(Math.random() * achievement.target),
      completed: index < 2, // Les 2 premiers sont complétés
      completed_at: index < 2 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined
    }));
  }

  // Mettre à jour la progression des achievements
  async updateAchievementProgress(userId: string, achievementId: string, progress: number): Promise<Achievement | null> {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (!achievement) return null;
    
    const updatedAchievement = {
      ...achievement,
      progress: Math.min(progress, achievement.target),
      completed: progress >= achievement.target,
      completed_at: progress >= achievement.target ? new Date() : undefined
    };
    
    return updatedAchievement;
  }

  // Obtenir les leaderboards
  async getLeaderboards(category: string, timeframe: string): Promise<Leaderboard[]> {
    const leaderboards: Leaderboard[] = [
      {
        id: 'top_creators',
        name: 'Top Créateurs',
        category: 'creators',
        timeframe: 'monthly',
        entries: [
          { rank: 1, user_id: '1', username: 'DJ Flow', avatar: '🎧', score: 12500, metric: 'Followers' },
          { rank: 2, user_id: '2', username: 'Visual Artist', avatar: '🎨', score: 9800, metric: 'Followers' },
          { rank: 3, user_id: '3', username: 'Hip-Hop Master', avatar: '🎤', score: 8700, metric: 'Followers' },
          { rank: 4, user_id: '4', username: 'Producer Pro', avatar: '🎹', score: 7200, metric: 'Followers' },
          { rank: 5, user_id: '5', username: 'Dance Queen', avatar: '💃', score: 6500, metric: 'Followers' }
        ]
      },
      {
        id: 'top_investors',
        name: 'Top Investisseurs',
        category: 'investors',
        timeframe: 'monthly',
        entries: [
          { rank: 1, user_id: '6', username: 'Creative Capital', avatar: '💰', score: 250000, metric: '€ Investis' },
          { rank: 2, user_id: '7', username: 'Art Fund', avatar: '🎭', score: 180000, metric: '€ Investis' },
          { rank: 3, user_id: '8', username: 'Music Ventures', avatar: '🎵', score: 120000, metric: '€ Investis' },
          { rank: 4, user_id: '9', username: 'Digital Arts', avatar: '🖥️', score: 95000, metric: '€ Investis' },
          { rank: 5, user_id: '10', username: 'Event Master', avatar: '🎪', score: 78000, metric: '€ Investis' }
        ]
      },
      {
        id: 'top_cities',
        name: 'Villes les Plus Créatives',
        category: 'cities',
        timeframe: 'monthly',
        entries: [
          { rank: 1, user_id: 'paris', username: 'Paris', avatar: '🗼', score: 4500, metric: 'Événements' },
          { rank: 2, user_id: 'lyon', username: 'Lyon', avatar: '🏛️', score: 3200, metric: 'Événements' },
          { rank: 3, user_id: 'marseille', username: 'Marseille', avatar: '⛵', score: 2800, metric: 'Événements' },
          { rank: 4, user_id: 'bordeaux', username: 'Bordeaux', avatar: '🍷', score: 2100, metric: 'Événements' },
          { rank: 5, user_id: 'nantes', username: 'Nantes', avatar: '🌊', score: 1800, metric: 'Événements' }
        ]
      }
    ];
    
    return leaderboards.filter(lb => lb.category === category);
  }

  // Obtenir le profil gamification d'un utilisateur
  async getUserGamificationProfile(userId: string): Promise<UserGamification> {
    const badges = await this.getUserBadges(userId);
    const achievements = await this.getUserAchievements(userId);
    
    return {
      user_id: userId,
      level: this.calculateLevel(badges.length, achievements.length),
      experience: this.calculateExperience(badges, achievements),
      total_points: this.calculateTotalPoints(badges, achievements),
      badges,
      achievements,
      leaderboard_rankings: [
        { leaderboard_id: 'top_creators', rank: 15, score: 5200, category: 'creators' },
        { leaderboard_id: 'top_cities', rank: 3, score: 2800, category: 'cities' }
      ],
      rewards_history: [
        {
          id: '1',
          type: 'badge',
          value: 'first_event',
          earned_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          description: 'Badge Premier Événement débloqué'
        },
        {
          id: '2',
          type: 'points',
          value: 500,
          earned_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          description: '+500 points pour achievement Network Builder'
        }
      ]
    };
  }

  // Méthodes utilitaires privées
  private checkBadgeRequirements(badge: Badge, userStats: any): boolean {
    for (const requirement of badge.requirements) {
      const userValue = userStats[requirement.type] || 0;
      if (userValue < requirement.value) {
        return false;
      }
    }
    return true;
  }

  private calculateLevel(badgesCount: number, achievementsCount: number): number {
    const baseLevel = Math.floor((badgesCount + achievementsCount) / 2);
    return Math.max(1, Math.min(100, baseLevel));
  }

  private calculateExperience(badges: Badge[], achievements: Achievement[]): number {
    let experience = 0;
    
    // Expérience des badges
    badges.forEach(badge => {
      switch (badge.rarity) {
        case 'common': experience += 100; break;
        case 'rare': experience += 250; break;
        case 'epic': experience += 500; break;
        case 'legendary': experience += 1000; break;
      }
    });
    
    // Expérience des achievements
    achievements.forEach(achievement => {
      if (achievement.completed) {
        experience += achievement.target * 10;
      }
    });
    
    return experience;
  }

  private calculateTotalPoints(badges: Badge[], achievements: Achievement[]): number {
    let points = 0;
    
    // Points des badges
    badges.forEach(badge => {
      badge.rewards.forEach(reward => {
        if (reward.type === 'points') {
          points += reward.value as number;
        }
      });
    });
    
    // Points des achievements
    achievements.forEach(achievement => {
      if (achievement.completed) {
        achievement.rewards.forEach(reward => {
          if (reward.type === 'points') {
            points += reward.value as number;
          }
        });
      }
    });
    
    return points;
  }
}

const gamificationService = new GamificationService();

// Routes API
badgesRouter.get('/badges', async (req: any, res: Response) => {
  try {
    const badges = await gamificationService.getAvailableBadges();
    res.json(badges);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur gamification', details: error.message });
  }
});

badgesRouter.get('/user/:userId/badges', async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const badges = await gamificationService.getUserBadges(userId);
    res.json(badges);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur gamification', details: error.message });
  }
});

badgesRouter.get('/user/:userId/achievements', async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const achievements = await gamificationService.getUserAchievements(userId);
    res.json(achievements);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur gamification', details: error.message });
  }
});

badgesRouter.get('/leaderboards', async (req: any, res: Response) => {
  try {
    const { category, timeframe } = req.query;
    const leaderboards = await gamificationService.getLeaderboards(category as string, timeframe as string);
    res.json(leaderboards);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur gamification', details: error.message });
  }
});

badgesRouter.get('/user/:userId/profile', async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = await gamificationService.getUserGamificationProfile(userId);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur gamification', details: error.message });
  }
});

badgesRouter.post('/user/:userId/check-badges', async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const { userStats } = req.body;
    const unlockedBadges = await gamificationService.checkAndUnlockBadges(userId, userStats);
    res.json(unlockedBadges);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur gamification', details: error.message });
  }
});

export default badgesRouter; 