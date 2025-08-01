// ecosystem-mona-spark/app/client/src/app/spark/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function SparkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">MONA x SPARK</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/mona" className="text-white/80 hover:text-white transition-colors">MONA</Link>
              <Link href="/spark" className="text-white font-semibold">SPARK</Link>
              <Link href="/sponsors" className="text-white/80 hover:text-white transition-colors">Sponsors</Link>
              <Link href="/partners" className="text-white/80 hover:text-white transition-colors">Experts</Link>
              <Link href="/automation" className="text-white/80 hover:text-white transition-colors">Automation</Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">Connexion</Link>
              <Link href="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">Inscription</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              SPARK : L'<span className="text-purple-400">Expérience</span> Immersive
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              Villas créatives d'élite pour les artistes sélectionnés. Production de contenu viral et attraction de sponsors premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#villas" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Découvrir les Villas
              </Link>
              <Link href="#candidature" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Candidater
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
                Pourquoi SPARK ?
              </h2>
              <p className="text-lg text-white/80 mb-6">
                SPARK n'est pas une plateforme tech, mais une expérience physique immersive. 
                Les artistes sélectionnés (95+ points MONA) vivent 7 jours de création intensive 
                dans des villas d'élite, produisant du contenu viral qui attire les sponsors.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Sélection par scoring 95+ points</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Villas d'élite 7 jours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Production contenu viral</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">ROI sponsor garanti</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Modèle Économique</h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Coûts Villa</h4>
                  <p className="text-white/80">19,500€ (logement, équipement, production)</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Revenus Sponsors</h4>
                  <p className="text-white/80">23,000€ (packages garantis)</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Revenus Additionnels</h4>
                  <p className="text-white/80">9,000€ (licences, merchandising)</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">ROI Total</h4>
                  <p className="text-white/80">64% de rentabilité</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villas Section */}
      <section id="villas" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Les Villas SPARK</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Expériences immersives d'élite pour les artistes sélectionnés
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Villa #8 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-purple-400 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">SPARK Villa #8</h3>
                <div className="text-purple-400 font-semibold mb-2">15-22 Mars 2024</div>
                <p className="text-white/80">Hip-Hop Focus</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">8-12 artistes sélectionnés</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Villa d'élite en région parisienne</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Studio d'enregistrement professionnel</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Équipe production complète</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Sponsors : Nike, Red Bull, Beats</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-white/60 mb-4">Statut : COMPLET</div>
                <button disabled className="w-full bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg cursor-not-allowed">
                  Complet
                </button>
              </div>
            </div>

            {/* Villa #9 */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 border-2 border-purple-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-400 text-white px-4 py-1 rounded-full text-sm font-semibold">OUVERT</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">SPARK Villa #9</h3>
                <div className="text-white font-semibold mb-2">12-19 Mai 2024</div>
                <p className="text-white/80">Électro/Dance Focus</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">8-12 artistes sélectionnés</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Villa d'élite en Provence</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Studio DJ & production électronique</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Équipe production complète</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Sponsors : Pioneer, Monster, Spotify</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-white/80 mb-4">Places disponibles : 3/12</div>
                <Link href="#candidature" className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors block">
                  Candidater
                </Link>
              </div>
            </div>

            {/* Villa #10 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-purple-400 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">SPARK Villa #10</h3>
                <div className="text-purple-400 font-semibold mb-2">7-14 Juillet 2024</div>
                <p className="text-white/80">Multi-Genre Summer</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">8-12 artistes sélectionnés</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Villa d'élite en Côte d'Azur</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Studio multi-genre complet</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Équipe production complète</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Sponsors : Adidas, Coca-Cola, Apple</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-white/60 mb-4">Statut : PRÉ-INSCRIPTION</div>
                <Link href="#candidature" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block">
                  Pré-inscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Le Processus SPARK</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              De la candidature à la villa : un parcours sélectif et exigeant
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Étape 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Candidature</h3>
              <p className="text-white/80">Formulaire en ligne avec portfolio et motivation</p>
            </div>

            {/* Étape 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Scoring</h3>
              <p className="text-white/80">Évaluation automatique : 95+ points requis</p>
            </div>

            {/* Étape 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Entretien</h3>
              <p className="text-white/80">Validation humaine et vérification motivation</p>
            </div>

            {/* Étape 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sélection</h3>
              <p className="text-white/80">Confirmation participation et préparation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Production de Contenu Viral
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Chaque villa SPARK produit 15-30 contenus viraux par artiste, 
                créant une machine à contenu qui attire naturellement les sponsors.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Freestyles et collaborations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Clips et visuals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Vlogs et behind-the-scenes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Capsules médias monétisables</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Output par Villa</h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Contenus Produits</h4>
                  <p className="text-white/80">120-240 contenus (15-30 par artiste)</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Vues Moyennes</h4>
                  <p className="text-white/80">2-5M vues totales par villa</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Engagement</h4>
                  <p className="text-white/80">15-25% taux d'engagement moyen</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">ROI Sponsor</h4>
                  <p className="text-white/80">300-500% retour sur investissement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidature Section */}
      <section id="candidature" className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Candidater pour SPARK
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Vous devez avoir un score MONA de 95+ points pour être éligible
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Prérequis</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Score MONA 95+ points</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Audience 5K+ followers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Contenu de qualité</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Motivation élevée</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Processus</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Candidature en ligne</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Évaluation scoring</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Entretien validation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Confirmation participation</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mona" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Vérifier Mon Score MONA
            </Link>
            <Link href="/register" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Candidater Maintenant
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
