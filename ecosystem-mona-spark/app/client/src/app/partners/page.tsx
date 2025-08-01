import React from 'react';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-white">MONA x SPARK Partners</div>
              <div className="text-sm text-gray-300">Marketplace d'experts pour artistes</div>
            </div>
            <nav className="flex space-x-8">
              <button className="px-4 py-2 rounded-lg transition-all text-gray-300 hover:text-white">MONA</button>
              <button className="px-4 py-2 rounded-lg transition-all text-gray-300 hover:text-white">SPARK</button>
              <button className="px-4 py-2 rounded-lg transition-all bg-white/20 text-white">Partners</button>
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
              🤝 MONA - Onboarding Partenaires Experts
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rejoignez le réseau d'experts premium au service des artistes MONA
            </p>
          </div>

          {/* Stratégie Marketplace */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Stratégie Marketplace Experts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Objectifs Partenariats */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Objectifs Partenariats</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">1</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Qualité service garantie</div>
                      <div className="text-sm text-gray-300">Sélection rigoureuse des meilleurs pros</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">2</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Expérience client premium</div>
                      <div className="text-sm text-gray-300">Standards MONA respectés</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">3</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Revenus récurrents</div>
                      <div className="text-sm text-gray-300">20-25% commission sur chaque mission</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">4</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Scalabilité</div>
                      <div className="text-sm text-gray-300">Réseau d'experts extensible selon demande</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profil Experts Recherchés */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Profil Experts Recherchés</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">🎨</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Créatifs</div>
                      <div className="text-sm text-gray-300">DA, graphistes, photographes, réalisateurs</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">🎵</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Production</div>
                      <div className="text-sm text-gray-300">Producteurs, ingé-son, beatmakers, musiciens</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">📱</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Digital</div>
                      <div className="text-sm text-gray-300">Social media managers, growth hackers, développeurs</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">💼</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Business</div>
                      <div className="text-sm text-gray-300">Managers, attachés de presse, juristes, comptables</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">🎭</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Coaching</div>
                      <div className="text-sm text-gray-300">Coachs vocaux, scène, développement personnel</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Processus de Qualification */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Processus de Qualification</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Étape 1 : Candidature Initiale */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-green-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Candidature Initiale</h3>
                      <div className="text-sm text-gray-300">J0 - Formulaire de candidature (15 min)</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Informations générales</span>
                      <span className="text-white">Nom, localisation, spécialité</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expérience professionnelle</span>
                      <span className="text-white">3 derniers clients, tarifs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Références & portfolio</span>
                      <span className="text-white">5 réalisations, témoignages</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Motivation MONA</span>
                      <span className="text-white">Pourquoi rejoindre l'écosystème</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Taux de sélection :</span>
                      <span className="text-green-400 font-semibold">15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Étape 2 : Pré-qualification */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Pré-qualification</h3>
                      <div className="text-sm text-gray-300">J3-5 - Call de pré-qualification (30 min)</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Introduction</span>
                      <span className="text-white">Présentation MONA/SPARK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Validation expérience</span>
                      <span className="text-white">Deep dive sur 2-3 projets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Test compétences</span>
                      <span className="text-white">Cas pratique selon spécialité</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Fit culturel</span>
                      <span className="text-white">Vision accompagnement artistes</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Seuil de passage :</span>
                      <span className="text-blue-400 font-semibold">35/50</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Étape 3 : Mission Pilote */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Mission Pilote</h3>
                      <div className="text-sm text-gray-300">J7-14 - Test avec artiste MONA</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Client</span>
                      <span className="text-white">Artiste MONA (genre, niveau)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Mission</span>
                      <span className="text-white">Brief détaillé selon spécialité</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Budget</span>
                      <span className="text-white">Tarif habituel de l'expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Commission</span>
                      <span className="text-white">25% MONA (dégressif)</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Paiement :</span>
                      <span className="text-purple-400 font-semibold">50% commande, 50% livraison</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Étape 4 : Évaluation & Intégration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-orange-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Évaluation & Intégration</h3>
                      <div className="text-sm text-gray-300">J15-21 - Intégration officielle</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Qualité livrable</span>
                      <span className="text-white">40% de l'évaluation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Respect délais</span>
                      <span className="text-white">25% de l'évaluation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Communication</span>
                      <span className="text-white">20% de l'évaluation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Satisfaction client</span>
                      <span className="text-white">15% de l'évaluation</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Seuil d'intégration :</span>
                      <span className="text-orange-400 font-semibold">35/50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modèle Économique */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Modèle Économique Partenaires</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Structure Commission */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Structure Commission</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Commission standard</span>
                    <span className="text-green-400">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Commission dégressive</span>
                    <span className="text-blue-400">20% (5+ missions/mois)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Commission premium</span>
                    <span className="text-purple-400">15% (10+ missions/mois)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Bonus volume</span>
                    <span className="text-orange-400">+5% (30+ missions/trimestre)</span>
                  </div>
                </div>
              </div>

              {/* Revenus Moyens Experts */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Revenus Moyens Experts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Débutant (2-3 missions)</span>
                    <span className="text-green-400">800-1500€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Confirmé (5-8 missions)</span>
                    <span className="text-blue-400">2000-4000€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Expert (10-15 missions)</span>
                    <span className="text-purple-400">5000-8000€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Premium (15+ missions)</span>
                    <span className="text-orange-400">8000€+/mois</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Standards Qualité */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Standards Qualité MONA</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">⚡</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Réactivité</h3>
                </div>
                <p className="text-sm text-gray-300">Réponse sous 24h maximum</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">💬</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Communication</h3>
                </div>
                <p className="text-sm text-gray-300">Updates réguliers au client</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">⏰</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Deadlines</h3>
                </div>
                <p className="text-sm text-gray-300">Respect strict des délais convenus</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">⭐</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Qualité</h3>
                </div>
                <p className="text-sm text-gray-300">Livrables conformes aux standards</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">🤝</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Professionalisme</h3>
                </div>
                <p className="text-sm text-gray-300">Attitude bienveillante et constructive</p>
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
                      <th className="text-left py-3 text-white font-semibold">KPI</th>
                      <th className="text-center py-3 text-white font-semibold">Objectif</th>
                      <th className="text-center py-3 text-white font-semibold">Mesure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">Nombre d'experts</td>
                      <td className="py-3 text-center text-green-400">100 experts actifs</td>
                      <td className="py-3 text-center text-white">Croissance du réseau</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">Missions/mois</td>
                      <td className="py-3 text-center text-blue-400">500 missions/mois</td>
                      <td className="py-3 text-center text-white">Volume d'activité</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">Satisfaction</td>
                      <td className="py-3 text-center text-purple-400">4.5/5</td>
                      <td className="py-3 text-center text-white">Excellence service</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 text-white font-semibold">Rétention</td>
                      <td className="py-3 text-center text-orange-400">90%</td>
                      <td className="py-3 text-center text-white">Fidélisation experts</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white font-semibold">CA Marketplace</td>
                      <td className="py-3 text-center text-red-400">200K€</td>
                      <td className="py-3 text-center text-white">Revenus marketplace</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Prêt à rejoindre le réseau d'experts MONA ?</h2>
            <p className="text-xl text-gray-300">
              Rejoignez les meilleurs professionnels au service des artistes
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Candidater Expert
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Voir les Experts
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Consulter les Missions
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 