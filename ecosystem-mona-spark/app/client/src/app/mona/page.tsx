export default function MonaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            MONA
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Le Docteur du Créateur. Diagnostic complet et accompagnement personnalisé 
            pour les artistes émergents avec notre système de scoring 120 points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Check-up MarkHealth</h3>
            <p className="text-gray-300 mb-4">
              Analyse complète de votre présence en ligne et de votre potentiel créatif.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Analyse des réseaux sociaux</li>
              <li>• Évaluation du contenu</li>
              <li>• Métriques d'engagement</li>
              <li>• Potentiel de croissance</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Coaching Personnalisé</h3>
            <p className="text-gray-300 mb-4">
              Accompagnement sur mesure pour développer votre carrière artistique.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Stratégie de contenu</li>
              <li>• Optimisation des réseaux</li>
              <li>• Développement de marque</li>
              <li>• Planification de carrière</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Pipeline SPARK</h3>
            <p className="text-gray-300 mb-4">
              Préparation pour les villas créatives SPARK avec scoring 95+ points.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Qualification automatique</li>
              <li>• Préparation intensive</li>
              <li>• Accès aux villas d'élite</li>
              <li>• ROI sponsor garanti</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Formules MONA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-2">MONA 290€</h3>
              <p className="text-gray-300 mb-4">Check-up complet + diagnostic</p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Analyse MarkHealth complète</li>
                <li>• Rapport détaillé 120 points</li>
                <li>• Recommandations personnalisées</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                Choisir cette formule
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-2">MONA 390€</h3>
              <p className="text-gray-300 mb-4">Check-up + coaching personnalisé</p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Tout du package 290€</li>
                <li>• 4 sessions de coaching</li>
                <li>• Suivi personnalisé 1 mois</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-md font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">
                Choisir cette formule
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-bold text-white mb-2">MONA 490€+</h3>
              <p className="text-gray-300 mb-4">Manager personnel complet</p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Tout du package 390€</li>
                <li>• Gestion complète de carrière</li>
                <li>• Accès prioritaire SPARK</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-md font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                Choisir cette formule
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Prêt à Transformer Votre Carrière ?</h2>
          <p className="text-gray-300 mb-8">
            Rejoignez MONA et accélérez votre progression vers le succès
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
              Commencer Maintenant
            </a>
            <a href="/contact" className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
              Nous Contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 