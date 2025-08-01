// Configuration Supabase simplifiée pour MONA x SPARK
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Types pour MONA x SPARK
export interface MonaUser {
  id: string
  email: string
  first_name: string
  last_name: string
  user_type: 'artist' | 'expert' | 'sponsor' | 'admin'
  mona_score?: number
  created_at: string
  updated_at: string
}

export interface SparkEvent {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  max_participants: number
  current_participants: number
  status: 'planning' | 'active' | 'completed'
  created_at: string
}

export interface Artist {
  id: string
  user_id: string
  artist_name: string
  bio: string
  genre: string
  social_links: {
    instagram?: string
    tiktok?: string
    youtube?: string
    spotify?: string
  }
  mona_score: number
  level: 'prospect' | 'qualified' | 'active' | 'completed'
  created_at: string
}

// Fonctions utilitaires
export const getMonaScore = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('mona_score')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data?.mona_score || 0
  } catch (error) {
    console.error('Erreur lors de la récupération du score MONA:', error)
    return 0
  }
}

export const updateMonaScore = async (userId: string, score: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('artists')
      .update({ mona_score: score })
      .eq('user_id', userId)
    
    if (error) throw error
  } catch (error) {
    console.error('Erreur lors de la mise à jour du score MONA:', error)
  }
} 