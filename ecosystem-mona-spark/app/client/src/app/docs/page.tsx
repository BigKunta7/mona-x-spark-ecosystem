'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('guide');

  const sections = [
    { id: 'guide', title: 'Guide Utilisateur' },
    { id: 'mona', title: 'MONA' },
    { id: 'spark', title: 'SPARK' },
    { id: 'api', title: 'API' },
    { id: 'admin', title: 'Administration' },
    { id: 'faq', title: 'FAQ' }
  ];

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
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guide complet pour utiliser l'écosystème MONA x SPARK
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
          {/* Guide Utilisateur */}
          {activeSection === 'guide' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Guide Utilisateur
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Premiers pas
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ol className="list-decimal list-inside space-y-2 text-blue-800">
                      <li>Créez votre compte en choisissant votre type d'utilisateur</li>
                      <li>Signez le NDA obligatoire</li>
                      <li>Complétez votre profil avec vos informations</li>
                      <li>Accédez à votre tableau de bord personnalisé</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Types d'utilisateurs
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Artistes</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Calcul du score MONA</li>
                        <li>• Accès aux services de coaching</li>
                        <li>• Candidature aux villas SPARK</li>
                        <li>• Suivi des missions</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Experts</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Gestion du profil expert</li>
                        <li>• Attribution des missions</li>
                        <li>• Suivi des commissions</li>
                        <li>• Évaluation de la qualité</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Sponsors</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Choix des packages sponsor</li>
                        <li>• Suivi du ROI garanti</li>
                        <li>• Accès aux rapports</li>
                        <li>• Communication des résultats</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Navigation
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Tableau de bord</p>
                        <p className="text-sm text-gray-600">Vue d'ensemble de vos activités</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">MONA</p>
                        <p className="text-sm text-gray-600">Services de coaching et diagnostic</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">SPARK</p>
                        <p className="text-sm text-gray-600">Villas immersives et expériences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MONA */}
          {activeSection === 'mona' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                MONA - Le Médecin du Créateur
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Les 3 Formules MONA
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border border-purple-200 rounded-lg p-4">
                      <h4 className="font-bold text-purple-800 text-lg mb-2">MONA 290€</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Diagnostic complet</li>
                        <li>• Plan d'action personnalisé</li>
                        <li>• 1 session de coaching</li>
                        <li>• Accès aux ressources</li>
                      </ul>
                    </div>
                    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <h4 className="font-bold text-blue-800 text-lg mb-2">MONA 390€</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Tout MONA 290€</li>
                        <li>• 3 sessions de coaching</li>
                        <li>• Suivi mensuel</li>
                        <li>• Accès aux experts</li>
                      </ul>
                    </div>
                    <div className="border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 text-lg mb-2">MONA 490€+</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Tout MONA 390€</li>
                        <li>• Coaching illimité</li>
                        <li>• Accès prioritaire SPARK</li>
                        <li>• Support VIP</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Les 10 Blocs Métier
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Stratégie Artistique', 'Marketing Digital', 'Gestion Financière',
                      'Production Musicale', 'Management', 'Communication',
                      'Développement Business', 'Réseaux Sociaux', 'Événementiel', 'Formation'
                    ].map((bloc, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-800">{bloc}</h4>
                        <p className="text-sm text-gray-600">Prix : 50€ - 200€ selon complexité</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Score MONA
                  </h3>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-800 mb-3">
                      Le score MONA évalue votre progression sur 120 points répartis en 7 catégories :
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>• Stratégie (20 points)</div>
                      <div>• Marketing (20 points)</div>
                      <div>• Finance (15 points)</div>
                      <div>• Production (15 points)</div>
                      <div>• Management (15 points)</div>
                      <div>• Communication (15 points)</div>
                      <div>• Innovation (20 points)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SPARK */}
          {activeSection === 'spark' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                SPARK - L'Expérience Immersive
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Concept SPARK
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                    <p className="text-gray-800 mb-4">
                      SPARK n'est pas une plateforme tech, mais une expérience physique immersive 
                      dans des villas créatives pour artistes d'élite.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Objectifs</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• Production de contenu viral</li>
                          <li>• Attraction de sponsors</li>
                          <li>• Networking d'élite</li>
                          <li>• Développement créatif</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Sélection</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Score MONA minimum 80/120</li>
                          <li>• Évaluation qualitative</li>
                          <li>• Potentiel viral</li>
                          <li>• Engagement communautaire</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Modèle Économique
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Revenus Sponsors</h4>
                      <p className="text-sm text-green-700">
                        Packages sponsor de 5k€ à 50k€ avec ROI garanti
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Contenu Viral</h4>
                      <p className="text-sm text-blue-700">
                        Production de contenu à fort potentiel de viralité
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Partenariats</h4>
                      <p className="text-sm text-purple-700">
                        Collaborations avec marques et médias
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Processus de Candidature
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Score MONA ≥ 80/120</p>
                        <p className="text-sm text-gray-600">Éligibilité automatique</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Évaluation qualitative</p>
                        <p className="text-sm text-gray-600">Potentiel viral et engagement</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Invitation villa</p>
                        <p className="text-sm text-gray-600">Dates et conditions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API */}
          {activeSection === 'api' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Documentation API
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Endpoints Principaux
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Authentification</h4>
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-gray-200 px-2 py-1 rounded">POST /api/auth/register</code></div>
                        <div><code className="bg-gray-200 px-2 py-1 rounded">POST /api/auth/login</code></div>
                        <div><code className="bg-gray-200 px-2 py-1 rounded">POST /api/auth/sign-nda</code></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Utilisateurs</h4>
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-gray-200 px-2 py-1 rounded">GET /api/users/profile</code></div>
                        <div><code className="bg-gray-200 px-2 py-1 rounded">PUT /api/users/profile</code></div>
                        <div><code className="bg-gray-200 px-2 py-1 rounded">DELETE /api/users/account</code></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">MONA</h4>
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-gray-200 px-2 py-1 rounded">GET /api/mona/score</code></div>
                        <div><code className="bg-gray-200 px-2 py-1 rounded">POST /api/mona/evaluate</code></div>
                        <div><code className="bg-gray-200 px-2 py-1 rounded">GET /api/mona/services</code></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Authentification
                  </h3>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 mb-3">
                      Toutes les requêtes API nécessitent un token JWT dans le header :
                    </p>
                    <code className="bg-yellow-100 px-2 py-1 rounded text-sm">
                      Authorization: Bearer [token]
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Codes de Réponse
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Succès</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>200 - OK</li>
                        <li>201 - Created</li>
                        <li>204 - No Content</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Erreurs</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>400 - Bad Request</li>
                        <li>401 - Unauthorized</li>
                        <li>403 - Forbidden</li>
                        <li>404 - Not Found</li>
                        <li>500 - Server Error</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Administration */}
          {activeSection === 'admin' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Administration
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Tableau de Bord Admin
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Métriques</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Utilisateurs actifs</li>
                        <li>• Revenus MONA/SPARK</li>
                        <li>• Scores moyens</li>
                        <li>• Taux de conversion</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Gestion</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Validation experts</li>
                        <li>• Attribution missions</li>
                        <li>• Gestion sponsors</li>
                        <li>• Support utilisateurs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Automatisation
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Séquences Email/SMS</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Welcome sequence</li>
                        <li>• Nurturing sequence</li>
                        <li>• Upsell sequence</li>
                        <li>• Win-back sequence</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Scoring Automatique</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Calcul score MONA</li>
                        <li>• Évaluation experts</li>
                        <li>• Sélection SPARK</li>
                        <li>• Alertes seuils</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Sécurité et Conformité
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Sécurité</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Chiffrement AES-256</li>
                        <li>• Audit logs complets</li>
                        <li>• Authentification JWT</li>
                        <li>• Protection CSRF</li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2">GDPR</h4>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Consentement obligatoire</li>
                        <li>• Droit à l'oubli</li>
                        <li>• Portabilité données</li>
                        <li>• NDA automatique</li>
                      </ul>
                    </div>
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
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Cette documentation est mise à jour régulièrement.
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/contact" className="text-purple-600 hover:text-purple-800">
              Contact Support
            </Link>
            <Link href="/terms" className="text-purple-600 hover:text-purple-800">
              Conditions d'Utilisation
            </Link>
            <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 