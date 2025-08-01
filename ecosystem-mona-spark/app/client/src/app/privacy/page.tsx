'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('collecte');

  const sections = [
    { id: 'collecte', title: 'Collecte des Données' },
    { id: 'utilisation', title: 'Utilisation des Données' },
    { id: 'partage', title: 'Partage des Données' },
    { id: 'securite', title: 'Sécurité' },
    { id: 'droits', title: 'Vos Droits' },
    { id: 'cookies', title: 'Cookies' },
    { id: 'contact', title: 'Contact' }
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
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
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
          {/* Collecte des Données */}
          {activeSection === 'collecte' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Collecte des Données
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Données que nous collectons
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Données d'identification :</strong> Nom, prénom, adresse email, numéro de téléphone</li>
                    <li><strong>Données professionnelles :</strong> Type d'utilisateur (artiste, expert, sponsor), spécialité, entreprise</li>
                    <li><strong>Données de connexion :</strong> Adresse IP, logs de connexion, cookies</li>
                    <li><strong>Données d'utilisation :</strong> Interactions avec la plateforme, scores MONA, missions</li>
                    <li><strong>Données de paiement :</strong> Informations de facturation (via Stripe)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Méthodes de collecte
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Formulaires d'inscription et de contact</li>
                    <li>Cookies et technologies de suivi</li>
                    <li>Interactions avec la plateforme</li>
                    <li>Communications par email et SMS</li>
                    <li>Évaluations et feedback</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Base légale
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Consentement :</strong> Pour les communications marketing et l'utilisation de cookies</li>
                    <li><strong>Exécution du contrat :</strong> Pour la fourniture de nos services</li>
                    <li><strong>Intérêt légitime :</strong> Pour la sécurité et l'amélioration de nos services</li>
                    <li><strong>Obligation légale :</strong> Pour la conformité fiscale et comptable</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Utilisation des Données */}
          {activeSection === 'utilisation' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Utilisation des Données
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Finalités principales
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Fourniture de nos services MONA et SPARK</li>
                    <li>Gestion des comptes utilisateurs et authentification</li>
                    <li>Communication avec les utilisateurs</li>
                    <li>Amélioration de nos services et personnalisation</li>
                    <li>Gestion des paiements et facturation</li>
                    <li>Conformité légale et réglementaire</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Utilisations spécifiques
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Artistes</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Calcul du score MONA</li>
                        <li>• Évaluation pour les villas SPARK</li>
                        <li>• Mise en relation avec les experts</li>
                        <li>• Suivi des missions et projets</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Experts</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Gestion des profils et spécialités</li>
                        <li>• Attribution des missions</li>
                        <li>• Calcul des commissions</li>
                        <li>• Évaluation de la qualité</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Sponsors</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Gestion des packages sponsor</li>
                        <li>• Suivi du ROI garanti</li>
                        <li>• Génération des rapports</li>
                        <li>• Communication des résultats</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Partage des Données */}
          {activeSection === 'partage' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Partage des Données
              </h2>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800">
                    <strong>Important :</strong> Nous ne vendons jamais vos données personnelles à des tiers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Partenaires autorisés
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Prestataires de paiement :</strong> Stripe (conformément à leurs standards de sécurité)</li>
                    <li><strong>Services d'email :</strong> Nodemailer (SMTP sécurisé)</li>
                    <li><strong>Services SMS :</strong> Twilio (API sécurisée)</li>
                    <li><strong>Hébergement :</strong> Fournisseurs cloud avec certification GDPR</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Conditions de partage
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Tous nos partenaires sont soumis à des obligations contractuelles strictes</li>
                    <li>Les données sont partagées uniquement pour les finalités autorisées</li>
                    <li>Nous exigeons des garanties de sécurité appropriées</li>
                    <li>Nous surveillons régulièrement la conformité de nos partenaires</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Exceptions légales
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Obligation légale ou réglementaire</li>
                    <li>Protection de nos droits et de notre sécurité</li>
                    <li>Prévention de la fraude ou d'activités illégales</li>
                    <li>Avec votre consentement explicite</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Sécurité */}
          {activeSection === 'securite' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sécurité des Données
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Mesures techniques
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Chiffrement :</strong> AES-256-GCM pour les données sensibles</li>
                    <li><strong>Transmission :</strong> HTTPS/TLS 1.3 obligatoire</li>
                    <li><strong>Stockage :</strong> Base de données PostgreSQL sécurisée</li>
                    <li><strong>Authentification :</strong> JWT avec bcrypt pour les mots de passe</li>
                    <li><strong>Audit :</strong> Logs complets de toutes les actions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Mesures organisationnelles
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Accès limité aux données personnelles</li>
                    <li>Formation obligatoire sur la protection des données</li>
                    <li>Procédures de gestion des incidents</li>
                    <li>Tests de sécurité réguliers</li>
                    <li>Surveillance continue des systèmes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Conformité
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Respect du RGPD (Règlement Général sur la Protection des Données)</li>
                    <li>Audits de conformité réguliers</li>
                    <li>Mise à jour continue des mesures de sécurité</li>
                    <li>Coopération avec les autorités de contrôle</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Vos Droits */}
          {activeSection === 'droits' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vos Droits
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">
                      Droit d'accès
                    </h3>
                    <p className="text-purple-700 text-sm">
                      Vous pouvez demander une copie de toutes les données personnelles que nous détenons sur vous.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      Droit de rectification
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Vous pouvez corriger ou mettre à jour vos informations personnelles à tout moment.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      Droit à l'effacement
                    </h3>
                    <p className="text-green-700 text-sm">
                      Vous pouvez demander la suppression de vos données ("droit à l'oubli").
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                      Droit à la portabilité
                    </h3>
                    <p className="text-yellow-700 text-sm">
                      Vous pouvez récupérer vos données dans un format structuré et lisible.
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      Droit d'opposition
                    </h3>
                    <p className="text-red-700 text-sm">
                      Vous pouvez vous opposer au traitement de vos données pour certaines finalités.
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-3">
                      Droit de limitation
                    </h3>
                    <p className="text-indigo-700 text-sm">
                      Vous pouvez demander la limitation du traitement de vos données.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Comment exercer vos droits
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Via votre espace personnel dans l'application</li>
                    <li>Par email à privacy@mona-spark.com</li>
                    <li>Par courrier postal à l'adresse de notre DPO</li>
                    <li>Réponse sous 30 jours maximum</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Cookies */}
          {activeSection === 'cookies' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Cookies et Technologies de Suivi
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Types de cookies utilisés
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-800">Cookies essentiels</h4>
                      <p className="text-sm text-gray-600">Nécessaires au fonctionnement de l'application (authentification, sécurité)</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-800">Cookies de performance</h4>
                      <p className="text-sm text-gray-600">Mesure de l'utilisation et amélioration des performances</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-purple-800">Cookies de personnalisation</h4>
                      <p className="text-sm text-gray-600">Mémorisation de vos préférences et personnalisation</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Gestion des cookies
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Banner de consentement lors de la première visite</li>
                    <li>Paramètres de cookies accessibles dans votre profil</li>
                    <li>Possibilité de désactiver les cookies non essentiels</li>
                    <li>Suppression automatique des cookies à l'expiration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Technologies tierces
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Google Analytics (avec anonymisation des IP)</li>
                    <li>Stripe (paiements sécurisés)</li>
                    <li>Nodemailer (envoi d'emails)</li>
                    <li>Twilio (envoi de SMS)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          {activeSection === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact et Délégué à la Protection des Données
              </h2>
              
              <div className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    Délégué à la Protection des Données (DPO)
                  </h3>
                  <div className="space-y-2 text-purple-700">
                    <p><strong>Email :</strong> dpo@mona-spark.com</p>
                    <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                    <p><strong>Adresse :</strong> [Adresse du DPO]</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    Contact général
                  </h3>
                  <div className="space-y-2 text-blue-700">
                    <p><strong>Email :</strong> privacy@mona-spark.com</p>
                    <p><strong>Support :</strong> support@mona-spark.com</p>
                    <p><strong>Site web :</strong> www.mona-spark.com</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    Autorité de contrôle
                  </h3>
                  <div className="space-y-2 text-green-700">
                    <p>Si vous n'êtes pas satisfait de notre réponse, vous pouvez contacter :</p>
                    <p><strong>CNIL :</strong> www.cnil.fr</p>
                    <p><strong>Adresse :</strong> 3 Place de Fontenoy, 75007 Paris</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Délais de réponse
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Demandes d'accès : 30 jours maximum</li>
                    <li>Demandes de rectification : 15 jours maximum</li>
                    <li>Demandes d'effacement : 30 jours maximum</li>
                    <li>Demandes de portabilité : 30 jours maximum</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Cette politique de confidentialité est régulièrement mise à jour pour refléter nos pratiques actuelles.
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/terms" className="text-purple-600 hover:text-purple-800">
              Conditions d'Utilisation
            </Link>
            <Link href="/contact" className="text-purple-600 hover:text-purple-800">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 