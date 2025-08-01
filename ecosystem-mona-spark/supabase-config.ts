// Configuration Supabase pour MONA x SPARK
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
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
  const { data, error } = await supabase
    .from('artists')
    .select('mona_score')
    .eq('user_id', userId)
    .single()
  
  if (error) throw error
  return data?.mona_score || 0
}

export const updateMonaScore = async (userId: string, score: number): Promise<void> => {
  const { error } = await supabase
    .from('artists')
    .update({ mona_score: score })
    .eq('user_id', userId)
  
  if (error) throw error
} 