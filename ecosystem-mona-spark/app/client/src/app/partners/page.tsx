export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-6">
          Experts
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Rejoignez notre réseau d'experts créatifs et monétisez vos compétences 
          auprès d'artistes émergents dans l'écosystème MONA x SPARK.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Devenez Expert
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Partagez votre expertise avec des artistes émergents et gagnez 
            jusqu'à 25% de commission sur chaque projet réalisé.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-white">Commission 25% garantie</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-white">Clients qualifiés automatiquement</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-white">Plateforme de gestion intégrée</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-white">Support dédié</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Catégories d'Experts</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white">Production Musicale</h4>
              <p className="text-white/90">Beatmakers, arrangeurs, mixeurs</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white">Marketing Digital</h4>
              <p className="text-white/90">Stratégies réseaux sociaux, growth hacking</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white">Branding & Design</h4>
              <p className="text-white/90">Identité visuelle, logos, merchandising</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white">Business Development</h4>
              <p className="text-white/90">Partenariats, contrats, négociations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Avantages Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">25%</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Commission</h3>
            <p className="text-gray-300">Commission garantie sur chaque projet</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">95+</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Clients Qualifiés</h3>
            <p className="text-gray-300">Artistes sélectionnés par scoring</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">24/7</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Support</h3>
            <p className="text-gray-300">Support dédié et plateforme intégrée</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">∞</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Croissance</h3>
            <p className="text-gray-300">Potentiel de croissance illimité</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Prêt à Devenir Expert ?</h2>
        <p className="text-gray-300 mb-8">
          Rejoignez notre réseau et monétisez votre expertise
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">
            Devenir Expert
          </a>
          <a href="/marketplace" className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
            Voir le Marketplace
          </a>
        </div>
      </div>
    </div>
  )
} 