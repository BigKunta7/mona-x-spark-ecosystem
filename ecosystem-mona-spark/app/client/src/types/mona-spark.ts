// Types pour MONA x SPARK

export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  user_type: 'artist' | 'expert' | 'sponsor' | 'admin'
  mona_score?: number
  created_at: string
  updated_at: string
}

export interface Artist {
  id: string
  user_id: string
  artist_name: string
  bio?: string
  genre?: string
  social_links?: {
    instagram?: string
    tiktok?: string
    youtube?: string
    spotify?: string
  }
  mona_score: number
  level: 'prospect' | 'qualified' | 'active' | 'completed'
  created_at: string
}

export interface SparkEvent {
  id: string
  title: string
  description?: string
  start_date?: string
  end_date?: string
  location?: string
  max_participants?: number
  current_participants: number
  status: 'planning' | 'active' | 'completed'
  created_at: string
}

export interface Expert {
  id: string
  user_id: string
  expert_name: string
  expertise: string[]
  bio?: string
  hourly_rate?: number
  availability: {
    status: 'available' | 'busy' | 'unavailable'
    current_load: number
    max_projects: number
    next_available?: string
  }
  rating: number
  total_projects: number
  created_at: string
}

export interface Sponsor {
  id: string
  user_id: string
  company_name: string
  industry: string
  budget_range: string
  target_audience: string[]
  previous_campaigns?: string[]
  contact_email: string
  contact_phone?: string
  created_at: string
}

export interface MonaScore {
  id: string
  user_id: string
  score: number
  breakdown: {
    social_media: number
    content_quality: number
    engagement: number
    consistency: number
    growth_potential: number
  }
  recommendations: string[]
  last_updated: string
}

export interface SparkVilla {
  id: string
  name: string
  location: string
  capacity: number
  current_occupants: number
  start_date: string
  end_date: string
  status: 'upcoming' | 'active' | 'completed'
  artists: Artist[]
  sponsors: Sponsor[]
  budget: number
  roi_target: number
  created_at: string
}

// Types pour les formulaires
export interface SignUpForm {
  email: string
  password: string
  first_name: string
  last_name: string
  user_type: 'artist' | 'expert' | 'sponsor'
}

export interface LoginForm {
  email: string
  password: string
}

export interface ArtistProfileForm {
  artist_name: string
  bio: string
  genre: string
  social_links: {
    instagram?: string
    tiktok?: string
    youtube?: string
    spotify?: string
  }
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Types pour les métriques
export interface Metrics {
  total_users: number
  total_artists: number
  total_experts: number
  total_sponsors: number
  active_villas: number
  total_revenue: number
  average_mona_score: number
}

// Types pour les notifications
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  created_at: string
} 