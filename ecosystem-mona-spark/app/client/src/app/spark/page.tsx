// ecosystem-mona-spark/app/client/src/app/spark/page.tsx
'use client';

import React from 'react';

export default function SparkShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-amber-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-black tracking-tighter">SPARK</h1>
              <p className="text-amber-200">Événements immersifs créatifs</p>
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
            Créez des <span className="text-amber-400">Expériences</span> Inoubliables
          </h1>
          <p className="text-xl md:text-2xl text-amber-200 mb-12 max-w-3xl mx-auto">
            SPARK organise des événements immersifs et des résidences créatives qui transforment les artistes en stars et créent des moments magiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Découvrir nos Événements
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Participer à un SPARK
            </button>
          </div>
        </div>
      </section>

      {/* Événements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Nos Événements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-800/50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Festivals Immersifs</h3>
              <p className="text-amber-200">
                Des événements multi-artistiques qui mélangent musique, art digital et performances live.
              </p>
            </div>
            <div className="bg-amber-800/50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Résidences Créatives</h3>
              <p className="text-amber-200">
                Des espaces dédiés où les artistes peuvent créer, collaborer et se développer.
              </p>
            </div>
            <div className="bg-amber-800/50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎪</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Pop-up Events</h3>
              <p className="text-amber-200">
                Des événements éphémères dans des lieux uniques pour des expériences exclusives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prochains Événements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Prochains Événements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-800/30 rounded-lg p-8">
              <div className="mb-6">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm">15-17 Juin</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">SPARK Festival Paris</h4>
              <p className="text-amber-200 mb-4">
                Le plus grand festival immersif de l'année avec 50+ artistes et 10,000+ visiteurs attendus.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-bold">Paris, France</span>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded">
                  Réserver
                </button>
              </div>
            </div>
            <div className="bg-amber-800/30 rounded-lg p-8">
              <div className="mb-6">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm">1-7 Août</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">Résidence Créative Lyon</h4>
              <p className="text-amber-200 mb-4">
                Une semaine intensive de création et de collaboration entre artistes émergents.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-bold">Lyon, France</span>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded">
                  Postuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Notre Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">50+</div>
              <p className="text-amber-200">Événements organisés</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <p className="text-amber-200">Artistes accompagnés</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">25,000+</div>
              <p className="text-amber-200">Visiteurs touchés</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">95%</div>
              <p className="text-amber-200">Satisfaction artistes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Prêt à Allumer votre SPARK ?</h2>
          <p className="text-xl text-amber-200 mb-8">
            Rejoignez les artistes qui ont déjà vécu l'expérience SPARK et transformé leur carrière.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 rounded-lg font-bold text-xl transition-colors">
            Participer Maintenant
          </button>
        </div>
      </section>
    </div>
  );
}
