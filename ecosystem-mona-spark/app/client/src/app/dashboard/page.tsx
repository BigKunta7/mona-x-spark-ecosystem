'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  monaScore: number
  sparkApplications: number
  marketplaceBookings: number
  revenue: number
  growth: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    monaScore: 87,
    sparkApplications: 3,
    marketplaceBookings: 12,
    revenue: 2400,
    growth: 23
  })

  const [activeTab, setActiveTab] = useState('overview')

  // Simuler des données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        monaScore: Math.min(120, prev.monaScore + Math.random() * 2),
        growth: prev.growth + Math.random() * 0.5
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-300">Bienvenue dans votre espace personnel MONA x SPARK</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
        {[
          { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
          { id: 'mona', label: 'MONA', icon: '🎯' },
          { id: 'spark', label: 'SPARK', icon: '✨' },
          { id: 'marketplace', label: 'Marketplace', icon: '🛒' },
          { id: 'automation', label: 'Automation', icon: '🤖' },
          { id: 'market-fit', label: 'Mona Market Fit', icon: '🎯' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Score MONA</p>
                  <p className="text-3xl font-bold text-white">{Math.round(stats.monaScore)}/120</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🎯</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                    style={{ width: `${(stats.monaScore / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Candidatures SPARK</p>
                  <p className="text-3xl font-bold text-white">{stats.sparkApplications}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✨</span>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">+2 ce mois</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Réservations</p>
                  <p className="text-3xl font-bold text-white">{stats.marketplaceBookings}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🛒</span>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">+5 cette semaine</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Revenus</p>
                  <p className="text-3xl font-bold text-white">{stats.revenue}€</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">+{stats.growth.toFixed(1)}% ce mois</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <Link href="/mona/scoring" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                  <span className="text-2xl mr-3">🎯</span>
                  <div>
                    <p className="text-white font-medium">Améliorer mon score MONA</p>
                    <p className="text-gray-300 text-sm">33 points restants</p>
                  </div>
                </Link>
                
                <Link href="/spark/villas" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                  <span className="text-2xl mr-3">✨</span>
                  <div>
                    <p className="text-white font-medium">Candidater à SPARK</p>
                    <p className="text-gray-300 text-sm">2 villas disponibles</p>
                  </div>
                </Link>
                
                <Link href="/marketplace/services" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                  <span className="text-2xl mr-3">🛒</span>
                  <div>
                    <p className="text-white font-medium">Trouver un expert</p>
                    <p className="text-gray-300 text-sm">15 experts disponibles</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-white/10 rounded-lg">
                  <span className="text-2xl mr-3">🎉</span>
                  <div>
                    <p className="text-white font-medium">Score MONA amélioré !</p>
                    <p className="text-gray-300 text-sm">+5 points ce mois</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white/10 rounded-lg">
                  <span className="text-2xl mr-3">✨</span>
                  <div>
                    <p className="text-white font-medium">Nouvelle villa SPARK</p>
                    <p className="text-gray-300 text-sm">Candidatures ouvertes</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white/10 rounded-lg">
                  <span className="text-2xl mr-3">💰</span>
                  <div>
                    <p className="text-white font-medium">Paiement reçu</p>
                    <p className="text-gray-300 text-sm">+150€ de commission</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Activité Récente</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-white">Score MONA mis à jour : 87/120</span>
                <span className="text-gray-400 ml-auto">Il y a 2h</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-white">Candidature SPARK envoyée</span>
                <span className="text-gray-400 ml-auto">Il y a 1j</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-white">Réservation marketplace confirmée</span>
                <span className="text-gray-400 ml-auto">Il y a 2j</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span className="text-white">Paiement reçu : 150€</span>
                <span className="text-gray-400 ml-auto">Il y a 3j</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MONA Tab */}
      {activeTab === 'mona' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Système de Scoring MONA</h2>
            <p className="text-gray-300 mb-6">
              Votre score MONA détermine votre éligibilité aux villas SPARK. 
              Améliorez vos performances dans chaque catégorie.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Audience', score: 18, max: 20, color: 'from-green-500 to-emerald-500' },
                { name: 'Engagement', score: 15, max: 20, color: 'from-blue-500 to-cyan-500' },
                { name: 'Contenu', score: 12, max: 20, color: 'from-purple-500 to-pink-500' },
                { name: 'Croissance', score: 14, max: 20, color: 'from-amber-500 to-orange-500' },
                { name: 'Collaboration', score: 10, max: 20, color: 'from-red-500 to-pink-500' },
                { name: 'Innovation', score: 8, max: 20, color: 'from-indigo-500 to-purple-500' }
              ].map(category => (
                <div key={category.name} className="bg-white/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{category.name}</span>
                    <span className="text-gray-300">{category.score}/{category.max}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all`}
                      style={{ width: `${(category.score / category.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SPARK Tab */}
      {activeTab === 'spark' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-lg border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Villas SPARK</h2>
            <p className="text-gray-300 mb-6">
              Découvrez les prochaines villas SPARK et postulez pour y participer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Villa Créative', date: '15-22 Jan 2024', status: 'Candidatures ouvertes', spots: 8, applied: 45 },
                { name: 'Villa Production', date: '22-29 Jan 2024', status: 'Bientôt ouvert', spots: 6, applied: 0 },
                { name: 'Villa Business', date: '29 Jan-5 Fév 2024', status: 'Bientôt ouvert', spots: 10, applied: 0 }
              ].map(villa => (
                <div key={villa.name} className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">{villa.name}</h3>
                  <p className="text-gray-300 mb-2">{villa.date}</p>
                  <p className="text-green-400 mb-4">{villa.status}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{villa.spots} places</span>
                    <span className="text-gray-300">{villa.applied} candidatures</span>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-md font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">
                    Candidater
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Marketplace Tab */}
      {activeTab === 'marketplace' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-lg border border-green-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Marketplace</h2>
            <p className="text-gray-300 mb-6">
              Trouvez des experts pour accélérer votre carrière ou proposez vos services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Production Musicale', experts: 25, avgPrice: 150 },
                { name: 'Marketing Digital', experts: 18, avgPrice: 200 },
                { name: 'Branding & Design', experts: 12, avgPrice: 180 }
              ].map(category => (
                <div key={category.name} className="bg-white/10 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-300 mb-2">{category.experts} experts</p>
                  <p className="text-green-400 mb-4">~{category.avgPrice}€/h</p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-md font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                    Explorer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-lg border border-amber-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Automation</h2>
            <p className="text-gray-300 mb-6">
              Automatisez votre présence en ligne et optimisez votre croissance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Workflows Actifs</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-white">Publication automatique</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-white">Engagement automatique</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-white">Analytics temps réel</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Publications</span>
                      <span className="text-white">24/7</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Engagement</span>
                      <span className="text-white">+23%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Croissance</span>
                      <span className="text-white">+15%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mona Market Fit Tab */}
      {activeTab === 'market-fit' && (
        <div className="space-y-8">
          {/* Market Fit Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Score Market Fit</p>
                  <p className="text-3xl font-bold text-white">92/100</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🎯</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: '92%' }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Funnel Stage</p>
                  <p className="text-2xl font-bold text-white">SCALE READY</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📈</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Confiance</p>
                  <p className="text-3xl font-bold text-white">87%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">⚡</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Catégorie</p>
                  <p className="text-2xl font-bold text-white">MARKET-READY</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🏆</span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Fit Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Décomposition Market Fit</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Alignement Audience</span>
                    <span className="text-green-400 font-bold">94%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Opportunité Marché</span>
                    <span className="text-blue-400 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Monétisation</span>
                    <span className="text-yellow-400 font-bold">91%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Positionnement</span>
                    <span className="text-purple-400 font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Prochaines Actions</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-white">Automatiser les processus de scale</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-white">Développer l'équipe de support</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-white">Préparer les investissements</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-white">Optimiser la stratégie de pricing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Funnel Stages */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Funnel Mona Market Fit</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { stage: 'MARKET_DISCOVERY', label: 'Découverte Marché', status: 'completed', icon: '🔍' },
                { stage: 'AUDIENCE_VALIDATION', label: 'Validation Audience', status: 'completed', icon: '👥' },
                { stage: 'PRODUCT_MARKET_FIT', label: 'Product Market Fit', status: 'completed', icon: '🎯' },
                { stage: 'SCALE_READY', label: 'Prêt au Scale', status: 'current', icon: '📈' },
                { stage: 'MARKET_DOMINANCE', label: 'Domination Marché', status: 'pending', icon: '🏆' }
              ].map((funnelStage, index) => (
                <div key={funnelStage.stage} className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    funnelStage.status === 'completed' ? 'bg-green-500' :
                    funnelStage.status === 'current' ? 'bg-blue-500' : 'bg-gray-600'
                  }`}>
                    <span className="text-white text-2xl">{funnelStage.icon}</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">{funnelStage.label}</h4>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    funnelStage.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    funnelStage.status === 'current' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {funnelStage.status === 'completed' ? 'Terminé' :
                     funnelStage.status === 'current' ? 'En cours' : 'En attente'}
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block w-full h-0.5 bg-gray-600 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recommandations Market Fit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">✅ Points Forts</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Positionnement de marque solide</li>
                  <li>• Audience cible bien définie</li>
                  <li>• Modèle de revenus diversifié</li>
                  <li>• Avantages concurrentiels clairs</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Améliorations</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Automatiser les processus</li>
                  <li>• Développer l'équipe</li>
                  <li>• Optimiser le pricing</li>
                  <li>• Préparer les investissements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 