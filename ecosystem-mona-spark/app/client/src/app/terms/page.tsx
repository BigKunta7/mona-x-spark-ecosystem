import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
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

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Conditions d'Utilisation
            </h1>
            <p className="text-xl text-white/80">
              Dernière mise à jour : 1er Janvier 2024
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
            <div className="space-y-8 text-white/80 text-sm leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptation des conditions</h2>
                <p>
                  En accédant et en utilisant la plateforme MONA x SPARK, vous acceptez d'être lié par ces conditions d'utilisation. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description des services</h2>
                <p>
                  MONA x SPARK propose un écosystème complet pour les artistes émergents comprenant :<br />
                  • MONA : Services de diagnostic et d'accompagnement artistique<br />
                  • SPARK : Expériences immersives en villas créatives<br />
                  • Marketplace : Mise en relation avec des experts partenaires<br />
                  • Automation : Systèmes de communication automatisés
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Inscription et compte utilisateur</h2>
                <p>
                  Pour utiliser nos services, vous devez créer un compte en fournissant des informations exactes et à jour. 
                  Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de toutes les activités 
                  qui se produisent sous votre compte.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Utilisation acceptable</h2>
                <p>
                  Vous vous engagez à utiliser nos services uniquement à des fins légales et conformes à ces conditions. 
                  Il est interdit d'utiliser nos services pour :<br />
                  • Violer les droits de propriété intellectuelle<br />
                  • Transmettre du contenu illégal, offensant ou inapproprié<br />
                  • Tenter d'accéder non autorisé à nos systèmes<br />
                  • Perturber le fonctionnement de la plateforme
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Propriété intellectuelle</h2>
                <p>
                  Tous les contenus, marques, logos et logiciels de la plateforme MONA x SPARK sont protégés par les droits 
                  de propriété intellectuelle. Vous conservez vos droits sur le contenu que vous créez, mais accordez à MONA x SPARK 
                  une licence non exclusive pour l'utiliser dans le cadre de nos services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">6. Confidentialité et protection des données</h2>
                <p>
                  La protection de vos données personnelles est une priorité. Nous collectons et traitons vos données conformément 
                  à notre politique de confidentialité et au Règlement Général sur la Protection des Données (RGPD). 
                  Vous pouvez exercer vos droits d'accès, de rectification et de suppression à tout moment.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">7. Paiements et facturation</h2>
                <p>
                  Les prix de nos services sont affichés en euros et incluent la TVA applicable. Les paiements sont traités 
                  de manière sécurisée par nos prestataires de paiement. Les factures sont générées automatiquement et envoyées 
                  par email. Aucun remboursement n'est possible sauf en cas de défaillance de notre part.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">8. Limitation de responsabilité</h2>
                <p>
                  MONA x SPARK s'efforce de fournir des services de qualité mais ne peut garantir des résultats spécifiques. 
                  Notre responsabilité est limitée au montant des frais payés pour le service concerné. Nous ne sommes pas 
                  responsables des dommages indirects ou consécutifs.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">9. Résiliation</h2>
                <p>
                  Vous pouvez résilier votre compte à tout moment en nous contactant. Nous pouvons suspendre ou résilier 
                  votre accès en cas de violation de ces conditions. Les dispositions relatives à la confidentialité, 
                  à la propriété intellectuelle et à la limitation de responsabilité survivent à la résiliation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">10. Modifications des conditions</h2>
                <p>
                  Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur 
                  dès leur publication sur la plateforme. Votre utilisation continue des services après publication des nouvelles 
                  conditions constitue votre acceptation de ces modifications.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">11. Droit applicable et juridiction</h2>
                <p>
                  Ces conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents de Paris, 
                  sauf en cas de disposition impérative contraire.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact</h2>
                <p>
                  Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter à :<br />
                  Email : legal@mona-spark.com<br />
                  Adresse : 123 Rue de la Créativité, 75001 Paris, France<br />
                  Téléphone : +33 1 23 45 67 89
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">
              ← Retour à l'accueil
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