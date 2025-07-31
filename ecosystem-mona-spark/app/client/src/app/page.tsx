'use client';

import React, { useState, useEffect } from 'react';

// Design System - Couleurs et espacements cohérents
const designSystem = {
  colors: {
    primary: 'from-purple-600 to-blue-600',
    secondary: 'from-amber-500 to-orange-500',
    accent: 'from-emerald-500 to-teal-500',
    dark: 'from-gray-900 to-black',
    light: 'from-white to-gray-50'
  },
  spacing: {
    section: 'py-16 md:py-24',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }
};

// Données pour les 5 sections du portail avec UX améliorée
const portalSections = [
  {
    title: "MONA",
    subtitle: "Services d'accompagnement",
    description: "Transformez votre talent en carrière avec nos services personnalisés.",
    href: "/mona",
    color: designSystem.colors.primary,
    icon: "🎯",
    features: ["Scoring artistique", "Formules personnalisées", "Suivi performance"]
  },
  {
    title: "SPARK", 
    subtitle: "Événements immersifs",
    description: "Créez des expériences inoubliables et développez votre réseau.",
    href: "/spark",
    color: designSystem.colors.secondary,
    icon: "✨",
    features: ["Festivals immersifs", "Résidences créatives", "Networking"]
  },
  {
    title: "Créateur",
    subtitle: "Espace personnel",
    description: "Gérez vos projets, analysez vos performances, développez votre audience.",
    href: "/dashboard/artist",
    color: designSystem.colors.accent,
    icon: "🎨",
    features: ["Dashboard complet", "Analytics avancées", "Gestion projets"]
  },
  {
    title: "Investisseur",
    subtitle: "Opportunités d'investissement",
    description: "Découvrez et investissez dans les talents de demain.",
    href: "/dashboard/investor",
    color: "from-green-600 to-emerald-600",
    icon: "💰",
    features: ["Marketplace", "Portfolio", "ROI tracking"]
  },
  {
    title: "Équipe",
    subtitle: "Administration",
    description: "Gérez l'écosystème et supervisez les performances globales.",
    href: "/dashboard/team",
    color: designSystem.colors.dark,
    icon: "⚙️",
    features: ["Gestion utilisateurs", "Analytics globales", "Modération"]
  },
            {
            title: "Plug and Play",
            subtitle: "Connexions Intelligentes",
            description: "Service de connexion intelligente entre créateurs avec orchestration automatique de l'écosystème créatif.",
            href: "/ai-dashboard",
            color: "from-cyan-600 to-blue-600",
            icon: "🔌",
            features: ["Connexions intelligentes", "Orchestration automatique", "Collaborations optimisées", "Écosystème connecté"]
          },
];

// Composant de carte avec animations et interactions
const PortalCard = ({ section, index }: { section: typeof portalSections[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ease-out transform ${
        isHovered ? 'scale-105 -translate-y-2' : 'scale-100'
      } ${isClicked ? 'scale-95' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsClicked(true);
        setTimeout(() => {
          window.location.href = section.href;
        }, 150);
      }}
    >
      {/* Carte principale */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.color} p-8 h-80 text-white shadow-2xl transition-all duration-500`}>
        {/* Effet de brillance au hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`} />
        
        {/* Contenu */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{section.icon}</span>
              <div>
                <h3 className="text-2xl font-bold">{section.title}</h3>
                <p className="text-sm opacity-80">{section.subtitle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90">{section.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            {section.features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                <span className="opacity-80">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-70">Cliquez pour explorer</span>
            <div className={`w-8 h-8 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'bg-white/30 scale-110' : ''
            }`}>
              <span className="text-white text-lg">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ombre dynamique */}
      <div className={`absolute inset-0 rounded-2xl bg-black/20 blur-xl transition-all duration-500 ${
        isHovered ? 'opacity-60 scale-110' : 'opacity-0 scale-100'
      }`} />
    </div>
  );
};

// Composant de navigation sticky
const StickyNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">MONA x SPARK</h1>
            <span className="text-sm text-gray-300 hidden sm:block">Écosystème Créatif</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
              À propos
            </button>
            <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <StickyNavigation />
      
      {/* Hero Section avec animation d'entrée */}
      <section className={`${designSystem.spacing.section} ${designSystem.spacing.container} pt-32`}>
        <div className="text-center space-y-8">
          <div className={`transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MONA
              </span>
              <span className="text-white"> x </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                SPARK
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              L'écosystème où les créateurs deviennent des entrepreneurs
            </p>
          </div>

          {/* Stats animées */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400">500+</div>
              <div className="text-sm text-gray-300">Artistes accompagnés</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold text-amber-400">50+</div>
              <div className="text-sm text-gray-300">Événements organisés</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold text-emerald-400">€2.4M</div>
              <div className="text-sm text-gray-300">Volume d'investissements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des portails avec grille responsive */}
      <section className={`${designSystem.spacing.section} ${designSystem.spacing.container}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choisissez votre voie</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez les différentes facettes de notre écosystème créatif
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalSections.map((section, index) => (
            <div
              key={section.title}
              className={`transition-all duration-700 delay-${index * 100}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <PortalCard section={section} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer avec navigation secondaire */}
      <footer className="bg-black/20 border-t border-white/10 py-12">
        <div className={designSystem.spacing.container}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">MONA x SPARK</h3>
              <p className="text-sm text-gray-300">
                Écosystème complet de gestion artistique et laboratoire créatif
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/mona" className="hover:text-white transition-colors">MONA</a></li>
                <li><a href="/spark" className="hover:text-white transition-colors">SPARK</a></li>
                <li><a href="/dashboard/artist" className="hover:text-white transition-colors">Espace Créateur</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Investissement</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/dashboard/investor" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="/finance" className="hover:text-white transition-colors">Opportunités</a></li>
                <li><a href="/team" className="hover:text-white transition-colors">Notre Équipe</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>hello@monaxspark.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
