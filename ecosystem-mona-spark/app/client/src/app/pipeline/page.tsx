'use client'

import { useState, useEffect } from 'react'

interface Artist {
  id: string
  name: string
  email: string
  phone: string
  genre: string
  followers: number
  monaScore: number
  marketFitScore: number
  status: 'prospect' | 'qualified' | 'negotiation' | 'signed' | 'active'
  stage: string
  lastContact: Date
  nextFollowUp: Date
  tags: string[]
  notes: string
  interactions: Interaction[]
  opportunities: Opportunity[]
}

interface Interaction {
  id: string
  type: 'email' | 'call' | 'meeting' | 'message' | 'proposal'
  date: Date
  description: string
  outcome: string
  nextAction: string
  assignedTo: string
}

interface Opportunity {
  id: string
  title: string
  value: number
  probability: number
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed'
  expectedClose: Date
  description: string
}

interface PipelineStage {
  id: string
  name: string
  color: string
  artists: Artist[]
}

export default function PipelinePage() {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 'prospects',
      name: 'Prospects',
      color: 'bg-gray-500',
      artists: []
    },
    {
      id: 'qualified',
      name: 'Qualifiés',
      color: 'bg-blue-500',
      artists: []
    },
    {
      id: 'negotiation',
      name: 'Négociation',
      color: 'bg-yellow-500',
      artists: []
    },
    {
      id: 'signed',
      name: 'Signés',
      color: 'bg-green-500',
      artists: []
    },
    {
      id: 'active',
      name: 'Actifs',
      color: 'bg-purple-500',
      artists: []
    }
  ])

  const [artists, setArtists] = useState<Artist[]>([
    {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      phone: '+33 6 12 34 56 78',
      genre: 'Hip-Hop',
      followers: 25000,
      monaScore: 87,
      marketFitScore: 92,
      status: 'qualified',
      stage: 'qualified',
      lastContact: new Date('2024-01-15'),
      nextFollowUp: new Date('2024-01-22'),
      tags: ['urban', 'emerging', 'high-potential'],
      notes: 'Artiste prometteur avec une audience engagée. Intéressé par SPARK Villa.',
      interactions: [
        {
          id: '1',
          type: 'call',
          date: new Date('2024-01-15'),
          description: 'Appel de qualification - très réceptif',
          outcome: 'positive',
          nextAction: 'Envoyer proposition SPARK',
          assignedTo: 'Marie'
        }
      ],
      opportunities: [
        {
          id: '1',
          title: 'SPARK Villa Session',
          value: 5000,
          probability: 80,
          stage: 'proposal',
          expectedClose: new Date('2024-02-15'),
          description: 'Participation à la prochaine villa SPARK'
        }
      ]
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      phone: '+33 6 98 76 54 32',
      genre: 'Pop',
      followers: 45000,
      monaScore: 92,
      marketFitScore: 88,
      status: 'negotiation',
      stage: 'negotiation',
      lastContact: new Date('2024-01-18'),
      nextFollowUp: new Date('2024-01-25'),
      tags: ['pop', 'established', 'viral-potential'],
      notes: 'Artiste établie avec un fort potentiel viral. Négociation en cours pour contrat exclusif.',
      interactions: [
        {
          id: '2',
          type: 'meeting',
          date: new Date('2024-01-18'),
          description: 'Rencontre en personne - excellente chimie',
          outcome: 'very-positive',
          nextAction: 'Présenter contrat final',
          assignedTo: 'Thomas'
        }
      ],
      opportunities: [
        {
          id: '2',
          title: 'Contrat Exclusif MONA',
          value: 25000,
          probability: 75,
          stage: 'negotiation',
          expectedClose: new Date('2024-02-01'),
          description: 'Contrat de management exclusif 2 ans'
        }
      ]
    }
  ])

  const [filters, setFilters] = useState({
    status: 'all',
    genre: 'all',
    monaScore: 'all',
    assignedTo: 'all'
  })

  const [searchTerm, setSearchTerm] = useState('')

  // Organiser les artistes par stage
  useEffect(() => {
    const updatedStages = pipelineStages.map(stage => ({
      ...stage,
      artists: artists.filter(artist => artist.stage === stage.id)
    }))
    setPipelineStages(updatedStages)
  }, [artists])

  const moveArtist = (artistId: string, newStage: string) => {
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, stage: newStage, status: newStage as any }
        : artist
    ))
  }

  const addInteraction = (artistId: string, interaction: Omit<Interaction, 'id'>) => {
    const newInteraction = {
      ...interaction,
      id: Date.now().toString()
    }
    
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, interactions: [...artist.interactions, newInteraction] }
        : artist
    ))
  }

  const addOpportunity = (artistId: string, opportunity: Omit<Opportunity, 'id'>) => {
    const newOpportunity = {
      ...opportunity,
      id: Date.now().toString()
    }
    
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, opportunities: [...artist.opportunities, newOpportunity] }
        : artist
    ))
  }

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.status === 'all' || artist.status === filters.status
    const matchesGenre = filters.genre === 'all' || artist.genre === filters.genre
    const matchesMonaScore = filters.monaScore === 'all' || 
                             (filters.monaScore === 'high' && artist.monaScore >= 80) ||
                             (filters.monaScore === 'medium' && artist.monaScore >= 60 && artist.monaScore < 80) ||
                             (filters.monaScore === 'low' && artist.monaScore < 60)
    
    return matchesSearch && matchesStatus && matchesGenre && matchesMonaScore
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">CRM Pipeline</h1>
        <p className="text-gray-300">Gestion complète des artistes et prospects</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
        {[
          { id: 'pipeline', label: 'Pipeline Visuel', icon: '📊' },
          { id: 'artists', label: 'Fiches Artistes', icon: '👥' },
          { id: 'interactions', label: 'Interactions', icon: '💬' },
          { id: 'opportunities', label: 'Opportunités', icon: '💰' },
          { id: 'analytics', label: 'Analytics', icon: '📈' }
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

      {/* Pipeline Visuel Tab */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* Filtres et Recherche */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Rechercher artiste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="prospect">Prospects</option>
                  <option value="qualified">Qualifiés</option>
                  <option value="negotiation">Négociation</option>
                  <option value="signed">Signés</option>
                  <option value="active">Actifs</option>
                </select>
              </div>
              <div>
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="all">Tous les genres</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Electronic">Electronic</option>
                </select>
              </div>
              <div>
                <select
                  value={filters.monaScore}
                  onChange={(e) => setFilters(prev => ({ ...prev, monaScore: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="all">Tous les scores</option>
                  <option value="high">Score élevé (80+)</option>
                  <option value="medium">Score moyen (60-79)</option>
                  <option value="low">Score faible (&lt;60)</option>
                </select>
              </div>
              <div>
                <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  + Nouvel Artiste
                </button>
              </div>
            </div>
          </div>

          {/* Pipeline Visuel */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {pipelineStages.map(stage => (
              <div key={stage.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{stage.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${stage.color} text-white`}>
                    {stage.artists.length}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {stage.artists.map(artist => (
                    <div
                      key={artist.id}
                      className="bg-white/5 rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => setSelectedArtist(artist)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{artist.name}</h4>
                        <div className="text-xs text-gray-300">{artist.genre}</div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="text-sm text-gray-300">
                          {artist.followers.toLocaleString()} followers
                        </div>
                        <div className="text-sm text-purple-400">
                          MONA: {artist.monaScore}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          {artist.lastContact.toLocaleDateString()}
                        </div>
                        <div className="flex space-x-1">
                          {artist.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fiches Artistes Tab */}
      {activeTab === 'artists' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Fiches Artistes Détaillées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtists.map(artist => (
                <div
                  key={artist.id}
                  className="bg-white/5 rounded-lg p-6 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => setSelectedArtist(artist)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">{artist.name}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      artist.status === 'prospect' ? 'bg-gray-500' :
                      artist.status === 'qualified' ? 'bg-blue-500' :
                      artist.status === 'negotiation' ? 'bg-yellow-500' :
                      artist.status === 'signed' ? 'bg-green-500' : 'bg-purple-500'
                    } text-white`}>
                      {artist.status}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Genre</span>
                      <span className="text-white">{artist.genre}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Followers</span>
                      <span className="text-white">{artist.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Score MONA</span>
                      <span className="text-purple-400">{artist.monaScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Market Fit</span>
                      <span className="text-green-400">{artist.marketFitScore}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm text-gray-300 mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {artist.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactions Tab */}
      {activeTab === 'interactions' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Historique des Interactions</h3>
            <div className="space-y-4">
              {artists.flatMap(artist => 
                artist.interactions.map(interaction => (
                  <div key={interaction.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {interaction.type === 'email' ? '📧' :
                           interaction.type === 'call' ? '📞' :
                           interaction.type === 'meeting' ? '🤝' :
                           interaction.type === 'message' ? '💬' : '📄'}
                        </span>
                        <div>
                          <div className="font-semibold text-white">{artist.name}</div>
                          <div className="text-sm text-gray-300">{interaction.type}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {interaction.date.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="text-gray-300 mb-2">{interaction.description}</div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Assigné à: {interaction.assignedTo}
                      </div>
                      <div className="text-sm text-blue-400">
                        Prochaine action: {interaction.nextAction}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Opportunités Tab */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Opportunités</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.flatMap(artist => 
                artist.opportunities.map(opportunity => (
                  <div key={opportunity.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">{opportunity.title}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        opportunity.stage === 'discovery' ? 'bg-gray-500' :
                        opportunity.stage === 'proposal' ? 'bg-blue-500' :
                        opportunity.stage === 'negotiation' ? 'bg-yellow-500' : 'bg-green-500'
                      } text-white`}>
                        {opportunity.stage}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Valeur</span>
                        <span className="text-white font-semibold">€{opportunity.value.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Probabilité</span>
                        <span className="text-green-400">{opportunity.probability}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Artiste</span>
                        <span className="text-white">{artist.name}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-sm text-gray-300">{opportunity.description}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Total Artistes</h3>
            <div className="text-3xl font-bold text-white mb-2">{artists.length}</div>
            <div className="text-sm text-gray-300">Artistes dans le pipeline</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Taux de Conversion</h3>
            <div className="text-3xl font-bold text-white mb-2">23%</div>
            <div className="text-sm text-gray-300">Prospect → Signé</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Valeur Pipeline</h3>
            <div className="text-3xl font-bold text-white mb-2">€127K</div>
            <div className="text-sm text-gray-300">Opportunités en cours</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Score Moyen</h3>
            <div className="text-3xl font-bold text-white mb-2">84</div>
            <div className="text-sm text-gray-300">Score MONA moyen</div>
          </div>
        </div>
      )}

      {/* Modal Fiche Artiste */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedArtist.name}</h2>
              <button
                onClick={() => setSelectedArtist(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informations Générales */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Informations Générales</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Email</span>
                      <span className="text-white">{selectedArtist.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Téléphone</span>
                      <span className="text-white">{selectedArtist.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Genre</span>
                      <span className="text-white">{selectedArtist.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Followers</span>
                      <span className="text-white">{selectedArtist.followers.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Scores</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Score MONA</span>
                      <span className="text-purple-400">{selectedArtist.monaScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Market Fit</span>
                      <span className="text-green-400">{selectedArtist.marketFitScore}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Historique et Opportunités */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Dernières Interactions</h3>
                  <div className="space-y-2">
                    {selectedArtist.interactions.slice(-3).map(interaction => (
                      <div key={interaction.id} className="text-sm">
                        <div className="text-gray-300">{interaction.date.toLocaleDateString()}</div>
                        <div className="text-white">{interaction.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Opportunités</h3>
                  <div className="space-y-2">
                    {selectedArtist.opportunities.map(opportunity => (
                      <div key={opportunity.id} className="text-sm">
                        <div className="text-white font-medium">{opportunity.title}</div>
                        <div className="text-gray-300">€{opportunity.value.toLocaleString()} - {opportunity.probability}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
              <p className="text-gray-300">{selectedArtist.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 