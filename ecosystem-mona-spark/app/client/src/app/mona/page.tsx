// ecosystem-mona-spark/app/client/src/app/mona/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function MonaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">MONA x SPARK</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/mona" className="text-white font-semibold">MONA</Link>
              <Link href="/spark" className="text-white/80 hover:text-white transition-colors">SPARK</Link>
              <Link href="/sponsors" className="text-white/80 hover:text-white transition-colors">Sponsors</Link>
              <Link href="/partners" className="text-white/80 hover:text-white transition-colors">Experts</Link>
              <Link href="/automation" className="text-white/80 hover:text-white transition-colors">Automation</Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">Connexion</Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Inscription</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              MONA : Le <span className="text-blue-400">Docteur</span> du Créateur
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              Diagnostic complet et accompagnement personnalisé pour transformer les artistes émergents en talents bankables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#formules" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Découvrir les Formules
              </Link>
              <Link href="#blocs" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Voir les Blocs Métier
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Pourquoi MONA ?
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Les artistes émergents (1K-15K followers) ont souvent un potentiel énorme mais manquent de cohérence et de structure. 
                MONA apporte le diagnostic et l'accompagnement modulaire pour transformer ce potentiel en carrière.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Scoring automatique 120 points</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Accompagnement modulaire</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Pipeline vers SPARK</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Système de Scoring</h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Prospect (0-30 points)</h4>
                  <p className="text-white/80">Artiste débutant, potentiel à développer</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Émergent (31-60 points)</h4>
                  <p className="text-white/80">Artiste en développement, audience en croissance</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Confirmé (61-94 points)</h4>
                  <p className="text-white/80">Artiste structuré, prêt pour SPARK</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">SPARK-Ready (95+ points)</h4>
                  <p className="text-white/80">Éligible pour l'expérience SPARK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formules Section */}
      <section id="formules" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Les 3 Formules MONA</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choisissez la formule qui correspond à votre niveau et vos objectifs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* MONA 290€ */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">MONA 290€</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">290€</div>
                <p className="text-white/80">Check-up MarkHealth complet</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Audit marketing personnalisé</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Score MONA (120 points)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Recommandations immédiates</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Plan d'action rapide</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Accès à la marketplace experts</span>
                </div>
              </div>
              
              <Link href="/register" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center">
                Commencer
              </Link>
            </div>

            {/* MONA 390€ */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 border-2 border-blue-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-400 text-white px-4 py-1 rounded-full text-sm font-semibold">POPULAIRE</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">MONA 390€</h3>
                <div className="text-4xl font-bold text-white mb-2">390€</div>
                <p className="text-white/80">Check-up + coaching personnalisé</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Tout de MONA 290€</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Coaching personnalisé 1 mois</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Suivi progression scoring</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Accompagnement vers SPARK</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Connexions professionnelles</span>
                </div>
              </div>
              
              <Link href="/register" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors block text-center">
                Choisir
              </Link>
            </div>

            {/* MONA 490€+ */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-purple-400 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">MONA 490€+</h3>
                <div className="text-4xl font-bold text-purple-400 mb-2">490€+</div>
                <p className="text-white/80">Manager personnel complet</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Tout de MONA 390€</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Manager personnel dédié</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Accompagnement illimité</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Sélection SPARK garantie</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Prix sur mesure</span>
                </div>
              </div>
              
              <Link href="/contact" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center">
                Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blocs Métier Section */}
      <section id="blocs" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Les 10 Blocs Métier</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Services à la carte pour répondre à tous vos besoins créatifs et business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Bloc 1 - Stratégie */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Stratégie</h3>
                <p className="text-sm text-white/80">Positionnement & vision</p>
                <div className="text-blue-400 font-semibold">80€-500€</div>
              </div>
            </div>

            {/* Bloc 2 - Direction Artistique */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Direction Artistique</h3>
                <p className="text-sm text-white/80">DA visuelle & identité</p>
                <div className="text-blue-400 font-semibold">150€-800€</div>
              </div>
            </div>

            {/* Bloc 3 - Production */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Production</h3>
                <p className="text-sm text-white/80">Musicale & sonore</p>
                <div className="text-blue-400 font-semibold">200€-1500€</div>
              </div>
            </div>

            {/* Bloc 4 - Visuel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📹</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Visuel</h3>
                <p className="text-sm text-white/80">Clips & capsules</p>
                <div className="text-blue-400 font-semibold">300€-2500€</div>
              </div>
            </div>

            {/* Bloc 5 - Social Media */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Social Media</h3>
                <p className="text-sm text-white/80">Community building</p>
                <div className="text-blue-400 font-semibold">100€-600€</div>
              </div>
            </div>

            {/* Bloc 6 - Growth */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Growth</h3>
                <p className="text-sm text-white/80">Paid ads & acquisition</p>
                <div className="text-blue-400 font-semibold">200€-1000€</div>
              </div>
            </div>

            {/* Bloc 7 - Relations Presse */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📰</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Relations Presse</h3>
                <p className="text-sm text-white/80">Influence & médias</p>
                <div className="text-blue-400 font-semibold">150€-800€</div>
              </div>
            </div>

            {/* Bloc 8 - Monétisation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Monétisation</h3>
                <p className="text-sm text-white/80">Sponsors & financement</p>
                <div className="text-blue-400 font-semibold">200€-1200€</div>
              </div>
            </div>

            {/* Bloc 9 - Distribution */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎧</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Distribution</h3>
                <p className="text-sm text-white/80">DSP management</p>
                <div className="text-blue-400 font-semibold">100€-500€</div>
              </div>
            </div>

            {/* Bloc 10 - Business */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400 transition-all">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Business</h3>
                <p className="text-sm text-white/80">Juridique & droits</p>
                <div className="text-blue-400 font-semibold">150€-1000€</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Transformer Votre Carrière ?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Commencez par MONA pour vous structurer, puis vivez l'expérience SPARK
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Commencer avec MONA
            </Link>
            <Link href="/spark" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Découvrir SPARK
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">MONA x SPARK</h3>
              <p className="text-white/60 text-sm">
                L'écosystème complet pour les artistes émergents
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mona" className="text-white/60 hover:text-white">MONA</Link></li>
                <li><Link href="/spark" className="text-white/60 hover:text-white">SPARK</Link></li>
                <li><Link href="/sponsors" className="text-white/60 hover:text-white">Sponsors</Link></li>
                <li><Link href="/partners" className="text-white/60 hover:text-white">Experts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/automation" className="text-white/60 hover:text-white">Automation</Link></li>
                <li><Link href="/docs" className="text-white/60 hover:text-white">Documentation</Link></li>
                <li><Link href="/support" className="text-white/60 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-white/60 text-sm">
                contact@mona-spark.com<br />
                +33 1 23 45 67 89
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 MONA x SPARK. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
