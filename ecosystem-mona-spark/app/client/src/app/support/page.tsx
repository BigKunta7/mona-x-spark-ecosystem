'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [activeSection, setActiveSection] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const sections = [
    { id: 'contact', title: 'Contact Support' },
    { id: 'faq', title: 'FAQ' },
    { id: 'guides', title: 'Guides' },
    { id: 'status', title: 'Statut Services' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi
    alert('Votre message a été envoyé. Nous vous répondrons dans les 24h.');
    setFormData({
      name: '',
      email: '',
      userType: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-purple-600">
                MONA x SPARK
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                Accueil
              </Link>
              <Link href="/mona" className="text-gray-600 hover:text-purple-600 transition-colors">
                MONA
              </Link>
              <Link href="/spark" className="text-gray-600 hover:text-purple-600 transition-colors">
                SPARK
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support & Aide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe est là pour vous accompagner dans votre parcours MONA x SPARK
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeSection === section.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Contact Support */}
          {activeSection === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contactez notre Support
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Formulaire de contact
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type d'utilisateur
                      </label>
                      <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="artist">Artiste</option>
                        <option value="expert">Expert</option>
                        <option value="sponsor">Sponsor</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priorité
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="low">Faible</option>
                        <option value="normal">Normale</option>
                        <option value="high">Élevée</option>
                        <option value="urgent">Urgente</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Décrivez votre problème ou question..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Envoyer le message
                    </button>
                  </form>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Autres moyens de contact
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Email</h4>
                      <p className="text-purple-700">support@mona-spark.com</p>
                      <p className="text-sm text-purple-600">Réponse sous 24h</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Téléphone</h4>
                      <p className="text-blue-700">+33 1 23 45 67 89</p>
                      <p className="text-sm text-blue-600">Lun-Ven 9h-18h</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Chat en ligne</h4>
                      <p className="text-green-700">Disponible 24/7</p>
                      <p className="text-sm text-green-600">Support instantané</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Urgences</h4>
                      <p className="text-yellow-700">urgent@mona-spark.com</p>
                      <p className="text-sm text-yellow-600">Problèmes critiques</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Informations utiles</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Temps de réponse : 24h maximum</li>
                      <li>• Support en français et anglais</li>
                      <li>• Documentation complète disponible</li>
                      <li>• Formation gratuite pour nouveaux utilisateurs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeSection === 'faq' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Questions Fréquentes
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Comment fonctionne le score MONA ?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Le score MONA est calculé automatiquement sur 120 points répartis en 7 catégories. 
                    Il évolue selon vos interactions avec la plateforme et vos réalisations.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Comment candidater pour SPARK ?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Vous devez avoir un score MONA d'au moins 80/120 et passer l'évaluation qualitative. 
                    Les invitations sont envoyées automatiquement aux éligibles.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Comment devenir expert partenaire ?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Remplissez le formulaire de candidature, passez l'entretien de pré-qualification, 
                    réalisez une mission pilote, puis intégrez notre réseau d'experts.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Comment fonctionne le ROI garanti pour les sponsors ?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nous garantissons un retour sur investissement minimum défini selon le package choisi. 
                    Si l'objectif n'est pas atteint, nous compensons la différence.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Mes données sont-elles sécurisées ?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Oui, toutes vos données sont chiffrées (AES-256), nous respectons le RGPD, 
                    et vous signez un NDA dès l'inscription. Nous ne partageons jamais vos données.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Comment contacter le support ?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Par email à support@mona-spark.com, par téléphone au +33 1 23 45 67 89, 
                    ou via le formulaire de contact sur le site.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Guides */}
          {activeSection === 'guides' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Guides et Ressources
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    Guide Démarrage Rapide
                  </h3>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li>• Création de compte</li>
                    <li>• Première connexion</li>
                    <li>• Configuration du profil</li>
                    <li>• Navigation de base</li>
                  </ul>
                  <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                    Télécharger
                  </button>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    Guide MONA Complet
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• Les 3 formules MONA</li>
                    <li>• Les 10 blocs métier</li>
                    <li>• Calcul du score</li>
                    <li>• Optimisation du profil</li>
                  </ul>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Télécharger
                  </button>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    Guide SPARK
                  </h3>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• Processus de candidature</li>
                    <li>• Critères de sélection</li>
                    <li>• Préparation villa</li>
                    <li>• Production de contenu</li>
                  </ul>
                  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                    Télécharger
                  </button>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                    Guide Expert
                  </h3>
                  <ul className="text-sm text-yellow-700 space-y-2">
                    <li>• Processus d'onboarding</li>
                    <li>• Gestion des missions</li>
                    <li>• Calcul des commissions</li>
                    <li>• Évaluation qualité</li>
                  </ul>
                  <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors">
                    Télécharger
                  </button>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Vidéos Tutoriels
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 text-2xl">▶</span>
                    </div>
                    <p className="text-sm font-medium">Premiers pas</p>
                    <p className="text-xs text-gray-600">5 min</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 text-2xl">▶</span>
                    </div>
                    <p className="text-sm font-medium">Score MONA</p>
                    <p className="text-xs text-gray-600">8 min</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 text-2xl">▶</span>
                    </div>
                    <p className="text-sm font-medium">Candidature SPARK</p>
                    <p className="text-xs text-gray-600">12 min</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Services */}
          {activeSection === 'status' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Statut des Services
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">Application Web</h3>
                      <p className="text-sm text-gray-600">Interface utilisateur principale</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">Opérationnel</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">API Backend</h3>
                      <p className="text-sm text-gray-600">Services et données</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">Opérationnel</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">Base de Données</h3>
                      <p className="text-sm text-gray-600">Stockage et gestion des données</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">Opérationnel</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">Système de Paiement</h3>
                      <p className="text-sm text-gray-600">Stripe et facturation</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">Opérationnel</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">Emails & SMS</h3>
                      <p className="text-sm text-gray-600">Communications automatisées</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">Opérationnel</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">Système de Scoring</h3>
                      <p className="text-sm text-gray-600">Calcul des scores MONA</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">Opérationnel</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Dernière mise à jour</h3>
                <p className="text-blue-700 text-sm">
                  {new Date().toLocaleString('fr-FR')} - Tous les services fonctionnent normalement
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Notre équipe support est disponible 24/7 pour vous accompagner.
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/docs" className="text-purple-600 hover:text-purple-800">
              Documentation
            </Link>
            <Link href="/contact" className="text-purple-600 hover:text-purple-800">
              Contact
            </Link>
            <Link href="/terms" className="text-purple-600 hover:text-purple-800">
              Conditions d'Utilisation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 