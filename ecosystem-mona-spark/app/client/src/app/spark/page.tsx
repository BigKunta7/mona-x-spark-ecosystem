export default function SparkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            SPARK
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            L'Expérience Immersive. Villas créatives d'élite pour les artistes sélectionnés. 
            Production de contenu viral et attraction de sponsors premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              L'Expérience Immersive
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Villas créatives d'élite pour les artistes sélectionnés. 
              Production de contenu viral et attraction de sponsors premium.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span className="text-white">Sélection par scoring 95+ points</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span className="text-white">Villas d'élite 7 jours</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span className="text-white">ROI sponsor garanti</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span className="text-white">Production de contenu viral</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Expérience SPARK</h3>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-white">Villa Immersive</h4>
                <p className="text-white/90">7 jours de création intensive</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-white">Contenu Viral</h4>
                <p className="text-white/90">Production de contenu premium</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-white">Sponsors Garantis</h4>
                <p className="text-white/90">ROI garanti pour les sponsors</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-white">Réseau Élite</h4>
                <p className="text-white/90">Connexions avec l'industrie</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Villas SPARK</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-lg border border-amber-500/30">
              <h3 className="text-xl font-bold text-white mb-2">Villa Créative</h3>
              <p className="text-gray-300 mb-4">Environnement propice à la création</p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Studios d'enregistrement</li>
                <li>• Équipements professionnels</li>
                <li>• Espaces de collaboration</li>
                <li>• Hébergement premium</li>
              </ul>
              <div className="text-amber-400 font-semibold">ROI : 64%</div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-lg border border-pink-500/30">
              <h3 className="text-xl font-bold text-white mb-2">Villa Production</h3>
              <p className="text-gray-300 mb-4">Production de contenu viral</p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Équipes de production</li>
                <li>• Caméras et éclairage</li>
                <li>• Montage professionnel</li>
                <li>• Distribution optimisée</li>
              </ul>
              <div className="text-pink-400 font-semibold">ROI : 78%</div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-bold text-white mb-2">Villa Business</h3>
              <p className="text-gray-300 mb-4">Développement commercial</p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Rencontres sponsors</li>
                <li>• Networking exclusif</li>
                <li>• Stratégies marketing</li>
                <li>• Partenariats premium</li>
              </ul>
              <div className="text-green-400 font-semibold">ROI : 92%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">95+</div>
            <div className="text-gray-400">Points pour SPARK</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">7</div>
            <div className="text-gray-400">Jours d'immersion</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">64%</div>
            <div className="text-gray-400">ROI Villa SPARK</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-400">Satisfaction</div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Prêt pour l'Expérience SPARK ?</h2>
          <p className="text-gray-300 mb-8">
            Rejoignez les villas d'élite et accélérez votre carrière
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/mona" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all">
              Se Qualifier
            </a>
            <a href="/contact" className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
              En Savoir Plus
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 