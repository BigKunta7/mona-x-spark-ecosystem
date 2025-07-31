'use client';

import React, { useState, useEffect } from 'react';

// Types pour l'interface AI
interface AITransition {
  id: string;
  from_type: string;
  to_type: string;
  confidence_score: number;
  optimization_reasons: string[];
  ai_suggestions: string[];
  predicted_success_rate: number;
}

interface AIMashup {
  id: string;
  project_title: string;
  project_type: string;
  success_probability: number;
  innovation_score: number;
  market_potential: number;
  ai_recommendations: string[];
}

interface AIConnection {
  id: string;
  creator_a: { name: string; genre: string };
  creator_b: { name: string; genre: string };
  connection_strength: number;
  collaboration_potential: number;
  market_opportunity: number;
  ai_suggestions: string[];
}

interface AIStats {
  total_transitions_analyzed: number;
  successful_mashups_generated: number;
  optimal_connections_found: number;
  average_confidence_score: number;
  ai_recommendations_accuracy: number;
  ecosystem_optimization_rate: number;
}

export default function AIDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiStats, setAiStats] = useState<AIStats | null>(null);
  const [transitions, setTransitions] = useState<AITransition[]>([]);
  const [mashups, setMashups] = useState<AIMashup[]>([]);
  const [connections, setConnections] = useState<AIConnection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données AI
    setTimeout(() => {
      setAiStats({
        total_transitions_analyzed: 1250,
        successful_mashups_generated: 89,
        optimal_connections_found: 342,
        average_confidence_score: 0.78,
        ai_recommendations_accuracy: 0.85,
        ecosystem_optimization_rate: 0.92
      });

      setTransitions([
        {
          id: 'transition_1',
          from_type: 'creator',
          to_type: 'project',
          confidence_score: 0.85,
          optimization_reasons: [
            'Compatibilité créateur-projet: 85.0%',
            'Demande marché: 78.0%',
            'Optimisation timing: 82.0%'
          ],
          ai_suggestions: [
            'Suggérer une collaboration avec un créateur complémentaire',
            'Optimiser le budget pour maximiser l\'impact',
            'Planifier une campagne de promotion ciblée'
          ],
          predicted_success_rate: 0.77
        },
        {
          id: 'transition_2',
          from_type: 'event',
          to_type: 'investment',
          confidence_score: 0.92,
          optimization_reasons: [
            'Potentiel succès événement: 92.0%',
            'Potentiel ROI investissement: 88.0%',
            'Timing marché optimal: 90.0%'
          ],
          ai_suggestions: [
            'Optimiser la stratégie de monétisation de l\'événement',
            'Cibler les investisseurs les plus pertinents',
            'Préparer une présentation ROI détaillée'
          ],
          predicted_success_rate: 0.83
        }
      ]);

      setMashups([
        {
          id: 'mashup_1',
          project_title: 'DJ Flow x Visual Artist - Fusion Multimédia',
          project_type: 'multimedia',
          success_probability: 0.88,
          innovation_score: 0.92,
          market_potential: 0.85,
          ai_recommendations: [
            'Lancer une campagne de pré-promotion sur les réseaux sociaux',
            'Créer du contenu behind-the-scenes pour l\'engagement',
            'Planifier une stratégie de distribution multi-plateforme',
            'Optimiser le timing de sortie pour maximiser l\'impact'
          ]
        },
        {
          id: 'mashup_2',
          project_title: 'Festival x Résidence - Expérience Hybride',
          project_type: 'event',
          success_probability: 0.91,
          innovation_score: 0.89,
          market_potential: 0.93,
          ai_recommendations: [
            'Optimiser le timing pour maximiser l\'audience',
            'Créer une stratégie de promotion cross-platform',
            'Planifier des moments d\'engagement interactifs',
            'Optimiser le budget pour le meilleur ROI'
          ]
        }
      ]);

      setConnections([
        {
          id: 'connection_1',
          creator_a: { name: 'DJ Flow', genre: 'electronic' },
          creator_b: { name: 'Visual Artist', genre: 'visual' },
          connection_strength: 0.89,
          collaboration_potential: 0.92,
          market_opportunity: 0.85,
          ai_suggestions: [
            'Organiser une session de brainstorming créatif',
            'Créer un projet pilote de collaboration',
            'Planifier une campagne de promotion conjointe',
            'Explorer des opportunités de co-création'
          ]
        },
        {
          id: 'connection_2',
          creator_a: { name: 'Hip-Hop Artist', genre: 'hip-hop' },
          creator_b: { name: 'Producer', genre: 'music' },
          connection_strength: 0.94,
          collaboration_potential: 0.96,
          market_opportunity: 0.88,
          ai_suggestions: [
            'Créer un EP collaboratif',
            'Organiser des sessions de studio',
            'Lancer une tournée conjointe',
            'Développer une signature sonore unique'
          ]
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">AI DJ en cours d'initialisation...</h2>
          <p className="text-gray-300">Optimisation de l'écosystème créatif</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI DJ Dashboard</h1>
                <p className="text-gray-300">Écosystème créatif intelligent</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-300">Optimisation</p>
                <p className="text-lg font-bold text-cyan-400">
                  {aiStats ? `${(aiStats.ecosystem_optimization_rate * 100).toFixed(1)}%` : '...'}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
              { id: 'transitions', label: 'Transitions AI', icon: '🔄' },
              { id: 'mashups', label: 'Mashups Créatifs', icon: '🎵' },
              { id: 'connections', label: 'Connexions Optimales', icon: '🔗' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-gray-300 hover:text-white'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiStats && [
                {
                  title: 'Transitions Analysées',
                  value: aiStats.total_transitions_analyzed.toLocaleString(),
                  icon: '🔄',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Mashups Générés',
                  value: aiStats.successful_mashups_generated,
                  icon: '🎵',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Connexions Trouvées',
                  value: aiStats.optimal_connections_found,
                  icon: '🔗',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Confiance Moyenne',
                  value: `${(aiStats.average_confidence_score * 100).toFixed(1)}%`,
                  icon: '📈',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  title: 'Précision AI',
                  value: `${(aiStats.ai_recommendations_accuracy * 100).toFixed(1)}%`,
                  icon: '🤖',
                  color: 'from-indigo-500 to-purple-500'
                },
                {
                  title: 'Optimisation Écosystème',
                  value: `${(aiStats.ecosystem_optimization_rate * 100).toFixed(1)}%`,
                  icon: '⚡',
                  color: 'from-red-500 to-pink-500'
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{stat.icon}</span>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-lg">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-cyan-400">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Graphiques de performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Performance des Transitions</h3>
                <div className="space-y-4">
                  {transitions.slice(0, 3).map((transition, index) => (
                    <div key={transition.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🔄</span>
                        <div>
                          <p className="font-medium">{transition.from_type} → {transition.to_type}</p>
                          <p className="text-sm text-gray-400">
                            Confiance: {(transition.confidence_score * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${transition.confidence_score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Mashups Créatifs</h3>
                <div className="space-y-4">
                  {mashups.slice(0, 3).map((mashup, index) => (
                    <div key={mashup.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🎵</span>
                        <div>
                          <p className="font-medium">{mashup.project_title}</p>
                          <p className="text-sm text-gray-400">
                            Innovation: {(mashup.innovation_score * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${mashup.success_probability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transitions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Transitions AI Optimisées</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {transitions.map((transition) => (
                <div key={transition.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {transition.from_type} → {transition.to_type}
                    </h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-400">
                        {(transition.confidence_score * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-400">Confiance</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Optimisations AI:</h4>
                      <ul className="space-y-1">
                        {transition.optimization_reasons.map((reason, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Suggestions AI:</h4>
                      <ul className="space-y-1">
                        {transition.ai_suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mashups' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Mashups Créatifs Générés</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mashups.map((mashup) => (
                <div key={mashup.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{mashup.project_title}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-400">
                        {(mashup.success_probability * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-400">Succès</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">
                        {(mashup.innovation_score * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-400">Innovation</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">
                        {(mashup.market_potential * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-400">Marché</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Recommandations AI:</h4>
                    <ul className="space-y-1">
                      {mashup.ai_recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Connexions Optimales</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {connections.map((connection) => (
                <div key={connection.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {connection.creator_a.name} ↔ {connection.creator_b.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {connection.creator_a.genre} x {connection.creator_b.genre}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">
                        {(connection.connection_strength * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-400">Force</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">
                        {(connection.collaboration_potential * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-400">Collaboration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-400">
                        {(connection.market_opportunity * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-400">Marché</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Suggestions AI:</h4>
                    <ul className="space-y-1">
                      {connection.ai_suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 