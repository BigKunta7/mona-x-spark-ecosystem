// ecosystem-mona-spark/app/client/src/app/mona/page.tsx
'use client';

import React from 'react';

export default function MonaShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-black tracking-tighter">MONA</h1>
              <p className="text-purple-200">Services d'accompagnement artistique</p>
            </div>
            <a href="/" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            Transformez votre <span className="text-purple-400">Talent</span> en <span className="text-purple-400">Carrière</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto">
            MONA accompagne les artistes émergents dans leur développement professionnel avec des services personnalisés et une expertise du marché.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Découvrir nos Services
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Voir nos Artistes
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-800/50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Stratégie de Carrière</h3>
              <p className="text-purple-200">
                Développement de votre identité artistique et planification de votre carrière sur le long terme.
              </p>
            </div>
            <div className="bg-purple-800/50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Développement Business</h3>
              <p className="text-purple-200">
                Optimisation de vos revenus, gestion de votre communauté et diversification de vos sources de revenus.
              </p>
            </div>
            <div className="bg-purple-800/50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Exposition & Networking</h3>
              <p className="text-purple-200">
                Accès à notre réseau de partenaires et opportunités d'exposition dans l'industrie créative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-800/30 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="text-xl font-bold">Sarah Chen</h4>
                  <p className="text-purple-300">Artiste Digital</p>
                </div>
              </div>
              <p className="text-purple-200 mb-4">
                "Grâce à MONA, j'ai pu transformer ma passion en véritable carrière. Mon audience a triplé en 6 mois."
              </p>
              <div className="text-purple-400 font-bold">+300% d'audience</div>
            </div>
            <div className="bg-purple-800/30 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="text-xl font-bold">Marcus Rodriguez</h4>
                  <p className="text-purple-300">Musicien</p>
                </div>
              </div>
              <p className="text-purple-200 mb-4">
                "L'accompagnement MONA m'a permis de structurer mon activité et d'atteindre la rentabilité."
              </p>
              <div className="text-purple-400 font-bold">+150% de revenus</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Prêt à Transformer votre Carrière ?</h2>
          <p className="text-xl text-purple-200 mb-8">
            Rejoignez les artistes qui ont déjà transformé leur passion en succès avec MONA.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 rounded-lg font-bold text-xl transition-colors">
            Commencer Maintenant
          </button>
        </div>
      </section>
    </div>
  );
}
