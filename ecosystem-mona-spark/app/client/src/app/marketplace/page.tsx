'use client'
import { useState } from 'react'

export default function MarketplacePage() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const [showContactModal, setShowContactModal] = useState(false)

  const marketplaceBlocks = [
    {
      id: 'signature-onboarding',
      title: 'Signature & Onboarding',
      icon: '📋',
      description: 'Due diligence, contrat, activation complète',
      features: [
        'Audit complet du profil artistique',
        'Négociation et rédaction de contrats',
        'Processus d\'activation et d\'intégration',
        'Suivi post-signature'
      ],
      price: 'Sur devis',
      duration: '2-4 semaines',
      experts: 3,
      successRate: '95%'
    },
    {
      id: 'direction-artistique',
      title: 'Direction Artistique & A&R',
      icon: '🎨',
      description: 'Coaching créatif, supervision, cohérence',
      features: [
        'Développement de l\'identité artistique',
        'Supervision des projets créatifs',
        'Coaching personnalisé',
        'Stratégie de développement'
      ],
      price: 'Sur devis',
      duration: 'Ongoing',
      experts: 5,
      successRate: '90%'
    },
    {
      id: 'production-musicale',
      title: 'Production Musicale',
      icon: '🎵',
      description: 'Studios partenaires, packages prod',
      features: [
        'Production de beats et arrangements',
        'Mixage et mastering professionnel',
        'Accès aux studios partenaires',
        'Packages production personnalisés'
      ],
      price: 'Sur devis',
      duration: '1-8 semaines',
      experts: 8,
      successRate: '88%'
    },
    {
      id: 'edition-publishing',
      title: 'Édition/Publishing',
      icon: '📄',
      description: 'Admin, exploitation, valorisation',
      features: [
        'Administration des droits d\'auteur',
        'Exploitation des catalogues',
        'Valorisation des œuvres',
        'Gestion des licences'
      ],
      price: 'Sur devis',
      duration: 'Ongoing',
      experts: 4,
      successRate: '92%'
    },
    {
      id: 'marketing-image',
      title: 'Marketing/Image',
      icon: '📢',
      description: 'Branding, campagnes, médias',
      features: [
        'Stratégie de branding complète',
        'Campagnes marketing ciblées',
        'Relations presse et médias',
        'Gestion de l\'image publique'
      ],
      price: 'Sur devis',
      duration: '3-6 mois',
      experts: 6,
      successRate: '87%'
    },
    {
      id: 'distribution',
      title: 'Distribution',
      icon: '🌐',
      description: 'Partenaires, modèles revenus',
      features: [
        'Distribution multi-plateformes',
        'Partenariats stratégiques',
        'Modèles de revenus diversifiés',
        'Optimisation des canaux'
      ],
      price: 'Sur devis',
      duration: 'Ongoing',
      experts: 7,
      successRate: '85%'
    },
    {
      id: 'booking-live',
      title: 'Booking/Live',
      icon: '🎪',
      description: 'Développement scène, booking, merchandising',
      features: [
        'Développement de la présence scénique',
        'Booking et tournées',
        'Merchandising et produits dérivés',
        'Gestion des événements live'
      ],
      price: 'Sur devis',
      duration: 'Ongoing',
      experts: 5,
      successRate: '83%'
    },
    {
      id: 'licensing-synchro',
      title: 'Licensing/Synchro',
      icon: '🎬',
      description: 'Sync, pitch, commission',
      features: [
        'Placement dans films et publicités',
        'Pitch aux maisons de production',
        'Gestion des commissions',
        'Développement des opportunités'
      ],
      price: 'Sur devis',
      duration: '2-6 mois',
      experts: 4,
      successRate: '80%'
    },
    {
      id: 'sortie-revente',
      title: 'Sortie/Revente',
      icon: '💼',
      description: 'Exit, valorisation, options',
      features: [
        'Stratégies de sortie',
        'Valorisation des actifs',
        'Options de revente',
        'Optimisation fiscale'
      ],
      price: 'Sur devis',
      duration: '6-12 mois',
      experts: 3,
      successRate: '75%'
    },
    {
      id: 'direction-strategique',
      title: 'Direction Stratégique',
      icon: '🎯',
      description: 'Vision, coordination, biz dev',
      features: [
        'Vision stratégique globale',
        'Coordination des équipes',
        'Business development',
        'Pilotage de la croissance'
      ],
      price: 'Sur devis',
      duration: 'Ongoing',
      experts: 2,
      successRate: '90%'
    }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    console.log('Contact form submitted:', contactForm)
    setShowContactModal(false)
    setContactForm({
      name: '',
      email: '',
      phone: '',
      project: '',
      budget: '',
      timeline: '',
      message: ''
    })
  }

  const openContactModal = (blockId: string) => {
    setSelectedBlock(blockId)
    setShowContactModal(true)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-6">
          Marketplace MONA x SPARK
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Découvrez nos 10 blocs d'expertise spécialisés pour accélérer votre carrière artistique 
          et maximiser votre potentiel commercial.
        </p>
      </div>

      {/* Grille des 10 Blocs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
        {marketplaceBlocks.map(block => (
          <div
            key={block.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all cursor-pointer"
            onClick={() => openContactModal(block.id)}
          >
            <div className="text-4xl mb-4">{block.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{block.title}</h3>
            <p className="text-gray-300 mb-4 text-sm">{block.description}</p>
            
            <div className="space-y-2 mb-4">
              {block.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-400 font-semibold">{block.price}</span>
              <span className="text-gray-400">{block.duration}</span>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              <span>{block.experts} experts</span>
              <span>{block.successRate} succès</span>
            </div>
            
            <button className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
              Contacter
            </button>
          </div>
        ))}
      </div>

      {/* Processus */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Découverte</h3>
            <p className="text-gray-300">Identifiez vos besoins et choisissez le bloc adapté</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Brief Personnalisé</h3>
            <p className="text-gray-300">Recevez un brief détaillé adapté à votre projet</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Exécution</h3>
            <p className="text-gray-300">Nos experts travaillent sur votre projet</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">4</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Résultats</h3>
            <p className="text-gray-300">Obtenez des résultats mesurables et durables</p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">10</div>
          <div className="text-gray-300">Blocs d'expertise</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">47</div>
          <div className="text-gray-300">Experts certifiés</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">156</div>
          <div className="text-gray-300">Projets réalisés</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">87%</div>
          <div className="text-gray-300">Taux de satisfaction</div>
        </div>
      </div>

      {/* Modal Contact */}
      {showContactModal && selectedBlock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Contact - {marketplaceBlocks.find(b => b.id === selectedBlock)?.title}
              </h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Budget estimé</label>
                  <select
                    value={contactForm.budget}
                    onChange={(e) => setContactForm(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="small">&lt; 5K€</option>
                    <option value="medium">5K€ - 20K€</option>
                    <option value="large">20K€ - 50K€</option>
                    <option value="enterprise">&gt; 50K€</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Type de projet</label>
                <input
                  type="text"
                  value={contactForm.project}
                  onChange={(e) => setContactForm(prev => ({ ...prev, project: e.target.value }))}
                  placeholder="Décrivez votre projet..."
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Timeline souhaitée</label>
                <select
                  value={contactForm.timeline}
                  onChange={(e) => setContactForm(prev => ({ ...prev, timeline: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="">Sélectionner</option>
                  <option value="urgent">Urgent (1-2 semaines)</option>
                  <option value="normal">Normal (1-3 mois)</option>
                  <option value="long">Long terme (3+ mois)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Message détaillé</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  placeholder="Décrivez vos besoins spécifiques..."
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                ></textarea>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Envoyer la demande
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 