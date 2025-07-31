'use client';

import React, { useState, useEffect } from 'react';

// Design System cohérent
const designSystem = {
  colors: {
    primary: 'from-blue-600 to-purple-600',
    secondary: 'from-emerald-500 to-teal-500',
    accent: 'from-amber-500 to-orange-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-yellow-500 to-orange-500',
    danger: 'from-red-500 to-pink-500'
  },
  spacing: {
    section: 'py-8',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }
};

// Composant de navigation latérale
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'projects', label: 'Mes Projets', icon: '🎨' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'community', label: 'Communauté', icon: '👥' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <h2 className="text-white font-semibold">Artiste</h2>
            <p className="text-sm text-gray-400">Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Composant de carte avec animations
const StatCard = ({ title, value, change, icon, color }: {
  title: string;
  value: string;
  change?: string;
  icon: string;
  color: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-gray-800 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
        isHovered ? 'transform scale-105 shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`} />
      </div>
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      {change && (
        <p className={`text-sm ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </p>
      )}
    </div>
  );
};

// Composant de graphique simple
const ProgressBar = ({ label, value, max, color }: {
  label: string;
  value: number;
  max: number;
  color: string;
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-medium">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Header principal */}
      <header className="ml-64 bg-gray-800 border-b border-gray-700">
        <div className="flex justify-between items-center py-6 px-8">
          <div>
            <h1 className="text-2xl font-bold">Espace Créateur</h1>
            <p className="text-gray-400">Bienvenue dans votre espace personnel</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Nouveau Projet
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="ml-64 p-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Followers"
                value="12,450"
                change="+234 ce mois"
                icon="👥"
                color={designSystem.colors.primary}
              />
              <StatCard
                title="Engagement"
                value="8.2%"
                change="+1.2%"
                icon="📈"
                color={designSystem.colors.success}
              />
              <StatCard
                title="Revenus"
                value="€2,340"
                change="+15%"
                icon="💰"
                color={designSystem.colors.accent}
              />
              <StatCard
                title="Projets Actifs"
                value="3"
                change="+1"
                icon="🎨"
                color={designSystem.colors.secondary}
              />
            </div>

            {/* Projets récents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Projets Récents</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">🎵</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Album "Nouveau Monde"</h4>
                        <p className="text-sm text-gray-400">En cours - 75%</p>
                      </div>
                    </div>
                    <ProgressBar label="" value={75} max={100} color={designSystem.colors.primary} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">🎭</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Événement SPARK</h4>
                        <p className="text-sm text-gray-400">Préparation - 30%</p>
                      </div>
                    </div>
                    <ProgressBar label="" value={30} max={100} color={designSystem.colors.accent} />
                  </div>
                </div>
              </div>

              {/* Finance */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Finance & Investissements</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">€15,670</p>
                      <p className="text-sm text-gray-400">Total investi</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">€3,240</p>
                      <p className="text-sm text-gray-400">Revenus ce mois</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-400">€890</p>
                      <p className="text-sm text-gray-400">Prochain paiement</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <ProgressBar label="Objectif mensuel" value={3240} max={5000} color={designSystem.colors.success} />
                    <ProgressBar label="Croissance audience" value={75} max={100} color={designSystem.colors.primary} />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6">Actions Rapides</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-left">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">➕</span>
                    <div>
                      <h4 className="font-semibold">Nouvelle Campagne</h4>
                      <p className="text-sm opacity-80">Lancer un projet</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-left">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <h4 className="font-semibold">Créer du Contenu</h4>
                      <p className="text-sm opacity-80">Publier maintenant</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-left">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <h4 className="font-semibold">Analyser Performance</h4>
                      <p className="text-sm opacity-80">Voir les stats</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Mes Projets</h2>
            <p className="text-gray-400">Gérez vos projets créatifs et suivez leur progression</p>
            {/* Contenu des projets */}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            <p className="text-gray-400">Analysez vos performances et optimisez votre stratégie</p>
            {/* Contenu analytics */}
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Finance</h2>
            <p className="text-gray-400">Gérez vos revenus et investissements</p>
            {/* Contenu finance */}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Communauté</h2>
            <p className="text-gray-400">Interagissez avec votre audience et vos collaborateurs</p>
            {/* Contenu communauté */}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Paramètres</h2>
            <p className="text-gray-400">Personnalisez votre espace et vos préférences</p>
            {/* Contenu paramètres */}
          </div>
        )}
      </main>
    </div>
  );
} 