import React from 'react';

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-white">MONA x SPARK Automation</div>
              <div className="text-sm text-gray-300">Système d'automation Email/SMS</div>
            </div>
            <nav className="flex space-x-8">
              <button className="px-4 py-2 rounded-lg transition-all text-gray-300 hover:text-white">MONA</button>
              <button className="px-4 py-2 rounded-lg transition-all text-gray-300 hover:text-white">SPARK</button>
              <button className="px-4 py-2 rounded-lg transition-all bg-white/20 text-white">Automation</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-white">
              MONA x SPARK - Automation Email/SMS
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Système d'automation intelligent pour convertir, fidéliser et transformer les artistes
            </p>
          </div>

          {/* Stratégie Globale */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Stratégie Globale d'Automation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Objectifs Prioritaires */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Objectifs Prioritaires</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">1</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Conversion Prospects → Clients</div>
                      <div className="text-sm text-gray-300">25% taux de conversion cible</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">2</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Rétention & Upsell</div>
                      <div className="text-sm text-gray-300">LTV moyenne +150%</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">3</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Préparation SPARK-ready</div>
                      <div className="text-sm text-gray-300">Pipeline qualifié</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">4</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Réactivation Dormants</div>
                      <div className="text-sm text-gray-300">Win-back 20%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Canaux & Timing */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Canaux & Timing</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">📧</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Email</div>
                      <div className="text-sm text-gray-300">Contenu éducatif, analyses, offres</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">📱</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">SMS</div>
                      <div className="text-sm text-gray-300">Urgence, rappels, social proof</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">🔔</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Push notifications</div>
                      <div className="text-sm text-gray-300">Engagement app, scores, connexions</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">💬</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">WhatsApp</div>
                      <div className="text-sm text-gray-300">Support VIP, coaching personnel</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Séquences d'Automation */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Séquences d'Automation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Séquence 1 : Welcome Prospects */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-green-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Welcome Prospects</h3>
                      <div className="text-sm text-gray-300">7 jours - Conversion initiale</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">J0 :</span>
                      <span className="text-white">Email bienvenue + ressources gratuites</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J0+2h :</span>
                      <span className="text-white">SMS confirmation + social proof</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J3 :</span>
                      <span className="text-white">Diagnostic + prescription personnalisée</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J5 :</span>
                      <span className="text-white">Objection handling + urgence</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J6 :</span>
                      <span className="text-white">SMS urgence finale</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J7 :</span>
                      <span className="text-white">Dernière chance + alternative</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Taux de conversion cible :</span>
                      <span className="text-green-400 font-semibold">25%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Séquence 2 : Nurturing Client MONA 290€ */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Nurturing MONA 290€</h3>
                      <div className="text-sm text-gray-300">30 jours - Fidélisation & upsell</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">J0 :</span>
                      <span className="text-white">Onboarding + première étape</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J1 :</span>
                      <span className="text-white">SMS rappel action</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J7 :</span>
                      <span className="text-white">Premiers résultats + social proof</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J14 :</span>
                      <span className="text-white">Mi-parcours + upsell soft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J21 :</span>
                      <span className="text-white">Préparation fin de parcours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J28 :</span>
                      <span className="text-white">Bilan final + upsell stratégique</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Taux d'upsell cible :</span>
                      <span className="text-blue-400 font-semibold">40%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Séquence 3 : Conversion Upsell MONA 390€ */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Upsell MONA 390€</h3>
                      <div className="text-sm text-gray-300">14 jours - Conversion premium</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">J0 :</span>
                      <span className="text-white">Félicitation + invitation exclusive</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J1 :</span>
                      <span className="text-white">SMS urgence + social proof</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J3 :</span>
                      <span className="text-white">Objection handling + garantie</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J7 :</span>
                      <span className="text-white">Dernière chance + rareté</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Taux de conversion cible :</span>
                      <span className="text-purple-400 font-semibold">35%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Séquence 4 : Préparation SPARK-ready */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-orange-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">SPARK-ready</h3>
                      <div className="text-sm text-gray-300">21 jours - Préparation villa</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">J0 :</span>
                      <span className="text-white">Félicitations + révélation exclusive</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J1 :</span>
                      <span className="text-white">SMS urgence + social proof</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J5 :</span>
                      <span className="text-white">Objection handling + témoignages</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Taux de candidature cible :</span>
                      <span className="text-orange-400 font-semibold">60%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Séquence 5 : Win-back Dormants */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-red-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">5</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Win-back Dormants</h3>
                      <div className="text-sm text-gray-300">10 jours - Réactivation</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">J0 :</span>
                      <span className="text-white">Constat + empathie</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J3 :</span>
                      <span className="text-white">Success story + espoir</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">J5 :</span>
                      <span className="text-white">SMS dernière tentative</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Taux de réactivation cible :</span>
                      <span className="text-red-400 font-semibold">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Métriques & KPI */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Métriques & KPI</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 text-white font-semibold">Séquence</th>
                      <th className="text-center py-3 text-white font-semibold">Taux d'ouverture</th>
                      <th className="text-center py-3 text-white font-semibold">Taux de clic</th>
                      <th className="text-center py-3 text-white font-semibold">Taux de conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">Welcome Prospects</td>
                      <td className="py-3 text-center text-green-400">45%</td>
                      <td className="py-3 text-center text-green-400">12%</td>
                      <td className="py-3 text-center text-green-400">25% → Clients</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">Nurturing 290€</td>
                      <td className="py-3 text-center text-blue-400">65%</td>
                      <td className="py-3 text-center text-blue-400">18%</td>
                      <td className="py-3 text-center text-blue-400">40% → Upsell</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">Upsell 390€</td>
                      <td className="py-3 text-center text-purple-400">55%</td>
                      <td className="py-3 text-center text-purple-400">15%</td>
                      <td className="py-3 text-center text-purple-400">35% → Premium</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">SPARK-Ready</td>
                      <td className="py-3 text-center text-orange-400">75%</td>
                      <td className="py-3 text-center text-orange-400">25%</td>
                      <td className="py-3 text-center text-orange-400">60% → Candidature</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white font-semibold">Win-back</td>
                      <td className="py-3 text-center text-red-400">35%</td>
                      <td className="py-3 text-center text-red-400">8%</td>
                      <td className="py-3 text-center text-red-400">20% → Réactivation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Système de Scoring Comportemental */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Système de Scoring Comportemental</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Actions Positives */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-green-500/50">
                <h3 className="text-xl font-bold text-white mb-4">Actions Positives</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Ouverture email</span>
                    <span className="text-green-400">+1 pt</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Clic lien</span>
                    <span className="text-green-400">+3 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Connexion app</span>
                    <span className="text-green-400">+5 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Réponse message</span>
                    <span className="text-green-400">+10 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Action recommandée</span>
                    <span className="text-green-400">+15 pts</span>
                  </div>
                </div>
              </div>

              {/* Actions Négatives */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-red-500/50">
                <h3 className="text-xl font-bold text-white mb-4">Actions Négatives</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Non engagement 7j</span>
                    <span className="text-red-400">-5 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Désabonnement</span>
                    <span className="text-red-400">-20 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Spam signalé</span>
                    <span className="text-red-400">-50 pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Triggers Automatiques */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Triggers Automatiques</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">🎉</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Milestone atteint</h3>
                </div>
                <p className="text-sm text-gray-300">Félicitations + next step</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">⚠️</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Stagnation détectée</h3>
                </div>
                <p className="text-sm text-gray-300">Motivation + help offer</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">🔥</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Pic d'activité</h3>
                </div>
                <p className="text-sm text-gray-300">Encouragement + upsell opportunity</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">😴</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Inactivité prolongée</h3>
                </div>
                <p className="text-sm text-gray-300">Win-back sequence</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">🎪</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Éligibilité SPARK</h3>
                </div>
                <p className="text-sm text-gray-300">Invitation exclusive immédiate</p>
              </div>
            </div>
          </div>

          {/* A/B Tests */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">A/B Tests Mensuels</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Subject lines</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Emoji vs texte</span>
                    <span className="text-white">+15% ouverture</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Urgence vs bénéfice</span>
                    <span className="text-white">+8% conversion</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Timing envoi</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Matin vs soir</span>
                    <span className="text-white">+12% engagement</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Semaine vs weekend</span>
                    <span className="text-white">+5% clics</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Canaux</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email vs SMS</span>
                    <span className="text-white">+25% réactivité</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Push notification</span>
                    <span className="text-white">+18% connexion app</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">CTA</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Couleur</span>
                    <span className="text-white">+22% clics</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Placement</span>
                    <span className="text-white">+10% conversion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Prêt à automatiser votre conversion ?</h2>
            <p className="text-xl text-gray-300">
              Système d'automation intelligent pour maximiser vos résultats
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Activer l'Automation
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Voir les Templates
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Analyser les Métriques
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 