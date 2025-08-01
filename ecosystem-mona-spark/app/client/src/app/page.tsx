'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="glass-card border-0 border-b border-white/10 rounded-none">
        <div className="container">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 mona-gradient rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">MS</span>
                </div>
                <span className="text-2xl font-bold text-white">MONA x SPARK</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/mona" className="nav-item">
                MONA
              </Link>
              <Link href="/spark" className="nav-item">
                SPARK
              </Link>
              <Link href="/sponsors" className="nav-item">
                Sponsors
              </Link>
              <Link href="/partners" className="nav-item">
                Experts
              </Link>
              <Link href="/automation" className="nav-item">
                Automation
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="/login" className="btn-secondary">
                Connexion
              </Link>
              <Link href="/register" className="btn-primary">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="text-center">
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 animate-fade-in">
              MONA x <span className="text-gradient">SPARK</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto animate-fade-in">
              L'écosystème complet pour transformer les artistes émergents en stars internationales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link href="/mona" className="btn-primary text-lg px-8 py-4">
                Découvrir MONA
              </Link>
              <Link href="/spark" className="btn-secondary text-lg px-8 py-4 spark-gradient">
                Découvrir SPARK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-right">
              <h2 className="text-4xl font-bold text-white mb-6">
                MONA : Le Docteur du Créateur
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Diagnostic complet et accompagnement personnalisé pour les artistes émergents. 
                Notre système de scoring 120 points évalue et fait progresser chaque talent.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                  <span className="text-white">Check-up MarkHealth complet</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                  <span className="text-white">Coaching personnalisé</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                  <span className="text-white">Pipeline vers SPARK</span>
                </div>
              </div>
            </div>
            <div className="card-modern mona-gradient p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Formules MONA</h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-white">MONA 290€</h4>
                  <p className="text-white/90">Check-up complet + diagnostic</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-white">MONA 390€</h4>
                  <p className="text-white/90">Check-up + coaching personnalisé</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-white">MONA 490€+</h4>
                  <p className="text-white/90">Manager personnel complet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPARK Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="card-modern spark-gradient p-8">
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
                </div>
              </div>
            </motion.div>
            <div className="order-1 lg:order-2 animate-slide-in-right">
              <h2 className="text-4xl font-bold text-white mb-6">
                SPARK : L'Expérience Immersive
              </h2>
              <p className="text-lg text-slate-300 mb-6">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center kpi-card">
              <div className="text-4xl font-bold text-indigo-400 mb-2">120</div>
              <div className="text-slate-400">Points de Scoring</div>
            </div>
            <div className="text-center kpi-card">
              <div className="text-4xl font-bold text-amber-400 mb-2">95+</div>
              <div className="text-slate-400">Points pour SPARK</div>
            </div>
            <div className="text-center kpi-card">
              <div className="text-4xl font-bold text-emerald-400 mb-2">64%</div>
              <div className="text-slate-400">ROI Villa SPARK</div>
            </div>
            <div className="text-center kpi-card">
              <div className="text-4xl font-bold text-pink-400 mb-2">25%</div>
              <div className="text-slate-400">Commission Experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Prêt à Transformer Votre Carrière ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 animate-fade-in">
            Rejoignez l'écosystème MONA x SPARK et accélérez votre progression
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/register" className="btn-primary text-lg px-8 py-4">
              Commencer Maintenant
            </Link>
            <Link href="/mona" className="btn-secondary text-lg px-8 py-4">
              En Savoir Plus
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-slate-800/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">MONA x SPARK</h3>
              <p className="text-slate-400 text-sm">
                L'écosystème complet pour les artistes émergents
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mona" className="text-slate-400 hover:text-white transition-colors">MONA</Link></li>
                <li><Link href="/spark" className="text-slate-400 hover:text-white transition-colors">SPARK</Link></li>
                <li><Link href="/sponsors" className="text-slate-400 hover:text-white transition-colors">Sponsors</Link></li>
                <li><Link href="/partners" className="text-slate-400 hover:text-white transition-colors">Experts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/automation" className="text-slate-400 hover:text-white transition-colors">Automation</Link></li>
                <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/support" className="text-slate-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-slate-400 text-sm">
                contact@mona-spark.com<br />
                +33 1 23 45 67 89
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              © 2024 MONA x SPARK. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
