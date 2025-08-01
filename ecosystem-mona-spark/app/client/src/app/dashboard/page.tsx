'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

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
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">JD</span>
                  </div>
                  <span>John Doe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenue, John Doe 👋
          </h1>
          <p className="text-white/60">
            Voici un aperçu de votre activité sur MONA x SPARK
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-white/60 text-sm">Score MONA</p>
                <p className="text-2xl font-bold text-white">87</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <div className="ml-4">
                <p className="text-white/60 text-sm">Missions</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-white/60 text-sm">Revenus</p>
                <p className="text-2xl font-bold text-white">2,450€</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-white/60 text-sm">Niveau</p>
                <p className="text-2xl font-bold text-white">Confirmé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('mona')}
              className={`py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'mona'
                  ? 'bg-blue-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              MONA
            </button>
            <button
              onClick={() => setActiveTab('spark')}
              className={`py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'spark'
                  ? 'bg-blue-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              SPARK
            </button>
            <button
              onClick={() => setActiveTab('missions')}
              className={`py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'missions'
                  ? 'bg-blue-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Missions
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'finance'
                  ? 'bg-blue-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Finance
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Vue d'ensemble</h2>
              
              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Activité Récente</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">✓</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Mission complétée</p>
                        <p className="text-white/60 text-sm">Production vidéo - 2h ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">📈</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Score MONA mis à jour</p>
                        <p className="text-white/60 text-sm">+5 points - 1j ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">💰</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Paiement reçu</p>
                        <p className="text-white/60 text-sm">450€ - 2j ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Prochaines Actions</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border-l-4 border-orange-500">
                      <p className="text-white font-medium">Candidature SPARK</p>
                      <p className="text-white/60 text-sm">Deadline : 15 Mars 2024</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-500">
                      <p className="text-white font-medium">Mission en cours</p>
                      <p className="text-white/60 text-sm">Direction artistique - 3j restants</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-500">
                      <p className="text-white font-medium">Formation disponible</p>
                      <p className="text-white/60 text-sm">Marketing digital - 5h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mona' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">MONA - Votre Progression</h2>
              
              {/* Score Progress */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Score MONA : 87/120</h3>
                <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                  <div className="bg-white h-3 rounded-full" style={{ width: '72.5%' }}></div>
                </div>
                <p className="text-white/80 text-sm">Il vous manque 33 points pour être éligible à SPARK</p>
              </div>

              {/* Categories */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Catégories</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Stratégie</span>
                      <span className="text-green-400 font-semibold">18/20</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Production</span>
                      <span className="text-yellow-400 font-semibold">15/20</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Marketing</span>
                      <span className="text-blue-400 font-semibold">12/20</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Business</span>
                      <span className="text-red-400 font-semibold">8/20</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recommandations</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-white font-medium">Améliorer votre présence business</p>
                      <p className="text-white/60 text-sm">Prenez des cours de management</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-white font-medium">Optimiser votre marketing digital</p>
                      <p className="text-white/60 text-sm">Formation disponible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spark' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">SPARK - Candidatures</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Villas Disponibles</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border-2 border-purple-500">
                      <h4 className="text-white font-semibold">SPARK Villa #9</h4>
                      <p className="text-white/60 text-sm">12-19 Mai 2024 - Électro/Dance</p>
                      <p className="text-green-400 text-sm mt-2">✅ Éligible (87/95 points requis)</p>
                      <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Candidater
                      </button>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border-2 border-white/20">
                      <h4 className="text-white font-semibold">SPARK Villa #10</h4>
                      <p className="text-white/60 text-sm">7-14 Juillet 2024 - Multi-Genre</p>
                      <p className="text-yellow-400 text-sm mt-2">⚠️ Presque éligible (87/95 points requis)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Mes Candidatures</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-white font-semibold">SPARK Villa #8</h4>
                      <p className="text-white/60 text-sm">15-22 Mars 2024</p>
                      <span className="inline-block bg-gray-600 text-white px-2 py-1 rounded text-xs mt-2">
                        En attente
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'missions' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Missions & Services</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Missions en Cours</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-500">
                      <h4 className="text-white font-semibold">Direction Artistique</h4>
                      <p className="text-white/60 text-sm">Client : Marie L.</p>
                      <p className="text-white/60 text-sm">Deadline : 3 jours</p>
                      <div className="mt-3">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-white/60 text-xs mt-1">75% complété</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Services Disponibles</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <h4 className="text-white font-medium">Production Musicale</h4>
                      <p className="text-white/60 text-sm">200€-1500€</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <h4 className="text-white font-medium">Marketing Digital</h4>
                      <p className="text-white/60 text-sm">100€-600€</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <h4 className="text-white font-medium">Coaching Artistique</h4>
                      <p className="text-white/60 text-sm">150€-800€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Finance & Revenus</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Aperçu Financier</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-white/60 text-sm">Revenus du mois</p>
                      <p className="text-2xl font-bold text-white">2,450€</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-white/60 text-sm">Missions complétées</p>
                      <p className="text-2xl font-bold text-white">12</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-white/60 text-sm">Taux de satisfaction</p>
                      <p className="text-2xl font-bold text-white">98%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Transactions Récentes</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Direction Artistique</p>
                        <p className="text-white/60 text-sm">Marie L.</p>
                      </div>
                      <p className="text-green-400 font-semibold">+450€</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Production Vidéo</p>
                        <p className="text-white/60 text-sm">Thomas D.</p>
                      </div>
                      <p className="text-green-400 font-semibold">+800€</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Coaching Marketing</p>
                        <p className="text-white/60 text-sm">Sarah M.</p>
                      </div>
                      <p className="text-green-400 font-semibold">+300€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 