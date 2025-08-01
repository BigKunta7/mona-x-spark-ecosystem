import React from 'react';
import Link from 'next/link';

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">MONA x SPARK</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/mona" className="text-white/80 hover:text-white transition-colors">MONA</Link>
              <Link href="/spark" className="text-white/80 hover:text-white transition-colors">SPARK</Link>
              <Link href="/sponsors" className="text-white font-semibold">Sponsors</Link>
              <Link href="/partners" className="text-white/80 hover:text-white transition-colors">Experts</Link>
              <Link href="/automation" className="text-white/80 hover:text-white transition-colors">Automation</Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">Connexion</Link>
              <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">Inscription</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Kit <span className="text-green-400">Sponsors</span> & ROI Garanti
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              Investissez dans l'expérience SPARK et bénéficiez d'un retour sur investissement garanti avec des contenus viraux de qualité premium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#packages" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Découvrir les Packages
              </Link>
              <Link href="#roi" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Voir le ROI Garanti
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
                Pourquoi Sponsoriser SPARK ?
              </h2>
              <p className="text-lg text-white/80 mb-6">
                SPARK produit du contenu viral de qualité premium avec des artistes sélectionnés. 
                Chaque villa génère 2-5M vues et un engagement de 15-25%, garantissant un ROI exceptionnel.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Contenu viral garanti</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Artistes sélectionnés (95+ points)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">ROI garanti 300-500%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Packages personnalisés</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-blue-600 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Métriques SPARK</h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Vues par Villa</h4>
                  <p className="text-white/80">2-5M vues totales</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Engagement</h4>
                  <p className="text-white/80">15-25% taux moyen</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Contenus Produits</h4>
                  <p className="text-white/80">120-240 contenus par villa</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">ROI Sponsor</h4>
                  <p className="text-white/80">300-500% retour garanti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Les 4 Packages Sponsors</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choisissez le package qui correspond à vos objectifs et budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Package Principal */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-green-400 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Principal</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">15,000€</div>
                <p className="text-white/80">Sponsor principal de la villa</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Logo sur tous les contenus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Mention dans 50% des contenus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Contenu dédié (5-10 posts)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">ROI garanti 400%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Présence physique villa</span>
                </div>
              </div>
              
              <Link href="/contact" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center">
                Contacter
              </Link>
            </div>

            {/* Package Catégoriel */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 border-2 border-green-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-400 text-white px-4 py-1 rounded-full text-sm font-semibold">POPULAIRE</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Catégoriel</h3>
                <div className="text-4xl font-bold text-white mb-2">8,000€</div>
                <p className="text-white/80">Sponsor par catégorie</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Logo sur contenus spécifiques</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Mention dans 25% des contenus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Contenu dédié (3-5 posts)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">ROI garanti 350%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-white">Catégorie exclusive</span>
                </div>
              </div>
              
              <Link href="/contact" className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors block text-center">
                Choisir
              </Link>
            </div>

            {/* Package Activation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-green-400 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Activation</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">5,000€</div>
                <p className="text-white/80">Activation spécifique</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Activation sur mesure</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Mention dans 15% des contenus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Contenu dédié (2-3 posts)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">ROI garanti 300%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Flexibilité maximale</span>
                </div>
              </div>
              
              <Link href="/contact" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center">
                Contacter
              </Link>
            </div>

            {/* Package Événement */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-green-400 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Événement</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">3,000€</div>
                <p className="text-white/80">Événement ponctuel</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Événement unique</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Mention dans 10% des contenus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Contenu dédié (1-2 posts)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">ROI garanti 250%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Timing flexible</span>
                </div>
              </div>
              
              <Link href="/contact" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center">
                Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section id="roi" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">ROI Garanti</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Nous garantissons un retour sur investissement exceptionnel grâce à notre modèle économique éprouvé
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Comment Garantissons-nous le ROI ?
              </h3>
              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-white mb-3">1. Sélection Rigoureuse</h4>
                  <p className="text-white/80">
                    Seuls les artistes avec 95+ points MONA participent, garantissant une qualité de contenu exceptionnelle.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-white mb-3">2. Production Professionnelle</h4>
                  <p className="text-white/80">
                    Équipe de production complète pour créer du contenu viral de qualité premium.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-white mb-3">3. Distribution Optimisée</h4>
                  <p className="text-white/80">
                    Stratégie de diffusion multi-plateformes pour maximiser la visibilité et l'engagement.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-white mb-3">4. Métriques Transparentes</h4>
                  <p className="text-white/80">
                    Reporting détaillé avec vues, engagement, et ROI calculé en temps réel.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-blue-600 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Exemple ROI Package Principal</h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Investissement</h4>
                  <p className="text-white/80">15,000€</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Vues Garanties</h4>
                  <p className="text-white/80">2-5M vues totales</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Engagement Moyen</h4>
                  <p className="text-white/80">15-25%</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">Valeur Média</h4>
                  <p className="text-white/80">60,000€ (4x ROI)</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">ROI Garanti</h4>
                  <p className="text-white/80">400% minimum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemples Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Exemples de Succès</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Découvrez comment nos sponsors ont bénéficié de l'expérience SPARK
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Exemple 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-xl font-bold text-white">Beats by Dre</h3>
                <p className="text-white/80">SPARK Villa #7</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Investissement :</span>
                  <span className="text-white">15,000€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Vues générées :</span>
                  <span className="text-white">3.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Engagement :</span>
                  <span className="text-white">22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">ROI :</span>
                  <span className="text-green-400 font-bold">427%</span>
                </div>
              </div>
            </div>

            {/* Exemple 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥤</span>
                </div>
                <h3 className="text-xl font-bold text-white">Red Bull</h3>
                <p className="text-white/80">SPARK Villa #6</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Investissement :</span>
                  <span className="text-white">8,000€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Vues générées :</span>
                  <span className="text-white">2.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Engagement :</span>
                  <span className="text-white">18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">ROI :</span>
                  <span className="text-green-400 font-bold">350%</span>
                </div>
              </div>
            </div>

            {/* Exemple 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👟</span>
                </div>
                <h3 className="text-xl font-bold text-white">Nike</h3>
                <p className="text-white/80">SPARK Villa #5</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Investissement :</span>
                  <span className="text-white">15,000€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Vues générées :</span>
                  <span className="text-white">4.1M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Engagement :</span>
                  <span className="text-white">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">ROI :</span>
                  <span className="text-green-400 font-bold">473%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Investir dans SPARK ?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Rejoignez nos sponsors et bénéficiez d'un ROI garanti avec du contenu viral de qualité premium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Devenir Sponsor
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