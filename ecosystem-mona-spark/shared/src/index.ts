// Types partagés pour l'écosystème MONA x SPARK

export interface Creator {
  id: string;
  name: string;
  email: string;
  followers: number;
  engagement_rate: number;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  score: number;
  location: string;
  social_links: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
  };
  created_at: Date;
  updated_at: Date;
}

export interface Event {
  id: string;
  name: string;
  type: 'SPARK' | 'MONA';
  location: string;
  date: Date;
  capacity: number;
  registered: number;
  status: 'upcoming' | 'active' | 'completed';
  description: string;
  price: number;
}

export interface Collaboration {
  id: string;
  name: string;
  creators: string[];
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  budget: number;
  revenue_share: number;
  start_date: Date;
  end_date: Date;
  description: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'email' | 'push' | 'sms';
  title: string;
  message: string;
  read: boolean;
  created_at: Date;
}

export interface Analytics {
  total_creators: number;
  total_events: number;
  total_revenue: number;
  conversion_rate: number;
  average_score: number;
  monthly_growth: number;
}

// Utilitaires
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const calculateScore = (creator: Creator): number => {
  // Logique de calcul du score basée sur les métriques du créateur
  let score = 0;
  
  // Score basé sur les followers (max 25 points)
  if (creator.followers >= 50000) score += 25;
  else if (creator.followers >= 10000) score += 20;
  else if (creator.followers >= 5000) score += 15;
  else if (creator.followers >= 1000) score += 10;
  else score += 5;
  
  // Score basé sur l'engagement (max 25 points)
  if (creator.engagement_rate >= 0.15) score += 25;
  else if (creator.engagement_rate >= 0.10) score += 20;
  else if (creator.engagement_rate >= 0.05) score += 15;
  else if (creator.engagement_rate >= 0.02) score += 10;
  else score += 5;
  
  return score;
}; 