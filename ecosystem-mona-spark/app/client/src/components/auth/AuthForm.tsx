'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setMessage('Vérifiez votre email pour confirmer votre compte !')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        setMessage('Connexion réussie !')
        // Redirection vers le dashboard
        window.location.href = '/dashboard'
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('réussie') || message.includes('Vérifiez') 
              ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-300">
          {mode === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
          <a 
            href={mode === 'login' ? '/register' : '/login'}
            className="text-purple-400 hover:text-purple-300 ml-1"
          >
            {mode === 'login' ? 'S\'inscrire' : 'Se connecter'}
          </a>
        </p>
      </div>
    </div>
  )
} 