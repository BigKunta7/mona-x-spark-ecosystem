'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'artist'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsLoading(false);
      alert('Message envoyé ! Nous vous répondrons dans les 24h.');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <Link href="/mona" className="text-white/80 hover:text-white transition-colors">MONA</Link>
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
              Contactez <span className="text-blue-400">MONA x SPARK</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              Nous sommes là pour vous accompagner dans votre parcours créatif
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Nom complet
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-white mb-2">
                    Je suis un...
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="artist">🎵 Artiste</option>
                    <option value="expert">💼 Expert</option>
                    <option value="sponsor">🏢 Sponsor</option>
                    <option value="other">🤝 Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Votre sujet"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Décrivez votre demande..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    'Envoyer le message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Informations de contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <p className="text-white/60">contact@mona-spark.com</p>
                      <p className="text-white/60 text-sm">Réponse sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Téléphone</h3>
                      <p className="text-white/60">+33 1 23 45 67 89</p>
                      <p className="text-white/60 text-sm">Lun-Ven 9h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Adresse</h3>
                      <p className="text-white/60">123 Rue de la Créativité</p>
                      <p className="text-white/60">75001 Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Liens rapides</h3>
                <div className="space-y-3">
                  <Link href="/mona" className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <p className="text-white font-medium">Services MONA</p>
                      <p className="text-white/60 text-sm">Découvrir nos formules</p>
                    </div>
                  </Link>
                  
                  <Link href="/spark" className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <span className="text-2xl mr-3">✨</span>
                    <div>
                      <p className="text-white font-medium">Expérience SPARK</p>
                      <p className="text-white/60 text-sm">Candidater aux villas</p>
                    </div>
                  </Link>
                  
                  <Link href="/sponsors" className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <span className="text-2xl mr-3">💰</span>
                    <div>
                      <p className="text-white font-medium">Devenir Sponsor</p>
                      <p className="text-white/60 text-sm">Investir dans SPARK</p>
                    </div>
                  </Link>
                  
                  <Link href="/partners" className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <span className="text-2xl mr-3">🤝</span>
                    <div>
                      <p className="text-white font-medium">Rejoindre les Experts</p>
                      <p className="text-white/60 text-sm">Proposer vos services</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Questions Fréquentes</h2>
            <p className="text-xl text-white/80">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
              <h3 className="text-lg font-bold text-white mb-3">Comment fonctionne le scoring MONA ?</h3>
              <p className="text-white/80">
                Le scoring MONA évalue votre progression sur 120 points répartis en 7 catégories. 
                Plus votre score est élevé, plus vous avez de chances d'être sélectionné pour SPARK.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
              <h3 className="text-lg font-bold text-white mb-3">Quels sont les prérequis pour SPARK ?</h3>
              <p className="text-white/80">
                Pour candidater à SPARK, vous devez avoir un score MONA de 95+ points, 
                une audience de 5K+ followers, et produire du contenu de qualité.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
              <h3 className="text-lg font-bold text-white mb-3">Comment devenir expert partenaire ?</h3>
              <p className="text-white/80">
                Remplissez le formulaire de candidature, passez un entretien de pré-qualification, 
                puis effectuez une mission pilote pour valider votre intégration.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
              <h3 className="text-lg font-bold text-white mb-3">Quels sont les packages sponsors disponibles ?</h3>
              <p className="text-white/80">
                Nous proposons 4 packages : Principal (15,000€), Catégoriel (8,000€), 
                Activation (5,000€), et Événement (3,000€), tous avec ROI garanti.
              </p>
            </div>
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