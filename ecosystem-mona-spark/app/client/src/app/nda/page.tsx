'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NDAPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    signature: '',
    agree: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation de signature
    setTimeout(() => {
      setIsLoading(false);
      alert('NDA signé avec succès ! Vous pouvez maintenant accéder à votre compte.');
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      agree: e.target.checked
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
            <div className="flex space-x-4">
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">Connexion</Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Inscription</Link>
            </div>
          </div>
        </div>
      </header>

      {/* NDA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Accord de Confidentialité
            </h1>
            <p className="text-xl text-white/80">
              Signature obligatoire pour accéder à votre compte
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
            {/* NDA Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">ACCORD DE CONFIDENTIALITÉ</h2>
              
              <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                <p>
                  <strong className="text-white">ENTRE :</strong><br />
                  MONA x SPARK, société de droit français, dont le siège social est situé au 123 Rue de la Créativité, 75001 Paris, France, représentée par son Directeur Général, d'une part,
                </p>
                
                <p>
                  <strong className="text-white">ET :</strong><br />
                  L'utilisateur inscrit sur la plateforme MONA x SPARK, d'autre part,
                </p>
                
                <p>
                  <strong className="text-white">IL A ÉTÉ CONVENU CE QUI SUIT :</strong>
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Article 1 - Objet</h3>
                    <p>
                      Le présent accord a pour objet de définir les conditions dans lesquelles l'Utilisateur s'engage à respecter la confidentialité des informations auxquelles il pourrait avoir accès dans le cadre de son utilisation de la plateforme MONA x SPARK.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-2">Article 2 - Informations confidentielles</h3>
                    <p>
                      Sont considérées comme confidentielles toutes les informations, données, documents, processus, méthodes, techniques, savoir-faire, secrets commerciaux, informations relatives aux clients, aux partenaires, aux projets, aux stratégies commerciales, aux développements technologiques, aux finances, à la propriété intellectuelle, et plus généralement toute information non publique relative à MONA x SPARK et à son écosystème.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-2">Article 3 - Obligations de confidentialité</h3>
                    <p>
                      L'Utilisateur s'engage à :<br />
                      • Ne pas divulguer les informations confidentielles à des tiers<br />
                      • Ne pas utiliser les informations confidentielles à des fins autres que celles prévues par le présent accord<br />
                      • Prendre toutes les mesures nécessaires pour protéger la confidentialité des informations<br />
                      • Informer immédiatement MONA x SPARK de toute divulgation non autorisée
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-2">Article 4 - Durée</h3>
                    <p>
                      Le présent accord prend effet à compter de sa signature et reste en vigueur pendant toute la durée d'utilisation de la plateforme et pendant 5 (cinq) années après la fin de cette utilisation.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-2">Article 5 - Sanctions</h3>
                    <p>
                      Toute violation des obligations de confidentialité pourra entraîner la suspension ou la résiliation immédiate de l'accès à la plateforme, ainsi que des poursuites judiciaires pour obtenir réparation du préjudice subi.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-2">Article 6 - Droit applicable</h3>
                    <p>
                      Le présent accord est régi par le droit français. Tout litige sera soumis aux tribunaux compétents de Paris.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  Nom complet (signature électronique)
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Votre nom complet"
                />
              </div>

              <div>
                <label htmlFor="signature" className="block text-sm font-medium text-white mb-2">
                  Signature électronique
                </label>
                <input
                  id="signature"
                  name="signature"
                  type="text"
                  required
                  value={formData.signature}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tapez votre nom pour signer électroniquement"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agree" className="ml-2 block text-sm text-white/80">
                  Je certifie avoir lu, compris et accepté les termes de cet accord de confidentialité. 
                  Je reconnais que ma signature électronique a la même valeur qu'une signature manuscrite.
                </label>
              </div>

              <div className="flex space-x-4">
                <Link href="/register" className="flex-1 py-3 px-4 border border-white/20 rounded-lg text-sm font-medium text-white bg-transparent hover:bg-white/10 transition-all text-center">
                  Retour
                </Link>
                <button
                  type="submit"
                  disabled={isLoading || !formData.agree}
                  className="flex-1 py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signature en cours...
                    </div>
                  ) : (
                    'Signer l\'accord'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Information Box */}
          <div className="mt-8 bg-blue-600/20 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">ℹ️ Information importante</h3>
            <p className="text-white/80 text-sm">
              La signature de cet accord de confidentialité est obligatoire pour accéder à votre compte MONA x SPARK. 
              Cet accord protège les informations sensibles de notre écosystème et de nos utilisateurs. 
              Votre signature électronique a la même valeur légale qu'une signature manuscrite.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 mt-20">
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