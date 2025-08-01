export default function SponsorsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-6">
          Sponsors
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Rejoignez l'écosystème MONA x SPARK et bénéficiez d'un ROI garanti 
          grâce à nos artistes sélectionnés et nos villas créatives d'élite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            ROI Garanti
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Nos villas SPARK offrent un retour sur investissement garanti 
            grâce à notre système de sélection rigoureux et notre expertise 
            en production de contenu viral.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-white">ROI garanti 64% minimum</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-white">Artistes sélectionnés 95+ points</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-white">Contenu viral garanti</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-white">Suivi personnalisé</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Packages Sponsors</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white">Bronze - 5K€</h4>
              <p className="text-white/90">Participation à 1 villa SPARK</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white">Silver - 15K€</h4>
              <p className="text-white/90">Participation à 3 villas SPARK</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white">Gold - 50K€</h4>
              <p className="text-white/90">Sponsor principal exclusif</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Avantages Sponsors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">64%</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">ROI Garanti</h3>
            <p className="text-gray-300">Retour sur investissement minimum garanti</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">95+</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Artistes Élite</h3>
            <p className="text-gray-300">Sélection rigoureuse par scoring</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">7j</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Villas Premium</h3>
            <p className="text-gray-300">Environnements créatifs d'élite</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Prêt à Investir ?</h2>
        <p className="text-gray-300 mb-8">
          Rejoignez nos sponsors et bénéficiez d'un ROI garanti
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
            Devenir Sponsor
          </a>
          <a href="/spark" className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
            Découvrir SPARK
          </a>
        </div>
      </div>
    </div>
  )
} 