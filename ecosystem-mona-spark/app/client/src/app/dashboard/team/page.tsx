'use client';

import React from 'react';

export default function TeamDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold">Espace Équipe</h1>
              <p className="text-gray-400">Administration et gestion interne</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Admin</span>
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Statistiques Globales */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Statistiques Globales</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Artistes Actifs</span>
                <span className="font-bold text-blue-400">247</span>
              </div>
              <div className="flex justify-between">
                <span>Investisseurs</span>
                <span className="font-bold text-green-400">1,234</span>
              </div>
              <div className="flex justify-between">
                <span>Volume Total</span>
                <span className="font-bold text-purple-400">€2.4M</span>
              </div>
            </div>
          </div>

          {/* Alertes Système */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Alertes Système</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-900 rounded">
                <div className="font-medium">Serveur API</div>
                <div className="text-sm text-gray-400">Charge: 78%</div>
              </div>
              <div className="p-3 bg-green-900 rounded">
                <div className="font-medium">Base de Données</div>
                <div className="text-sm text-gray-400">OK - 45%</div>
              </div>
            </div>
          </div>

          {/* Actions Administratives */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Actions Administratives</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Gérer Utilisateurs
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                Modérer Contenu
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
                Rapports Financiers
              </button>
            </div>
          </div>
        </div>

        {/* Gestion des Artistes */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Gestion des Artistes</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2">En Attente</h4>
                <p className="text-2xl font-bold text-yellow-400">23</p>
                <p className="text-sm text-gray-400">Validations</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Approuvés</h4>
                <p className="text-2xl font-bold text-green-400">189</p>
                <p className="text-sm text-gray-400">Ce mois</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Rejetés</h4>
                <p className="text-2xl font-bold text-red-400">7</p>
                <p className="text-sm text-gray-400">Ce mois</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Score Moyen</h4>
                <p className="text-2xl font-bold text-blue-400">7.8/10</p>
                <p className="text-sm text-gray-400">Qualité</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gestion des Événements */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Gestion des Événements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Événements SPARK</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Planifiés</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>En Cours</span>
                  <span className="font-bold text-blue-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Terminés</span>
                  <span className="font-bold text-green-400">8</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Campagnes MONA</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Actives</span>
                  <span className="font-bold text-green-400">45</span>
                </div>
                <div className="flex justify-between">
                  <span>En Préparation</span>
                  <span className="font-bold text-yellow-400">18</span>
                </div>
                <div className="flex justify-between">
                  <span>Terminées</span>
                  <span className="font-bold">67</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Performance</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Taux de Réussite</span>
                  <span className="font-bold text-green-400">87%</span>
                </div>
                <div className="flex justify-between">
                  <span>Satisfaction Client</span>
                  <span className="font-bold text-blue-400">4.6/5</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI Moyen</span>
                  <span className="font-bold text-purple-400">24%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 