'use client';

import React from 'react';

export default function InvestorDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold">Espace Investisseur</h1>
              <p className="text-gray-400">Découvrez et investissez dans les talents de demain</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Investisseur</span>
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Mon Portfolio</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Investi</span>
                <span className="font-bold text-green-400">€45,230</span>
              </div>
              <div className="flex justify-between">
                <span>ROI Total</span>
                <span className="font-bold text-blue-400">+23.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Revenus ce mois</span>
                <span className="font-bold text-purple-400">€8,450</span>
              </div>
            </div>
          </div>

          {/* Opportunités */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Nouvelles Opportunités</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-900 rounded">
                <div className="font-medium">Artiste Émergent</div>
                <div className="text-sm text-gray-400">ROI estimé: 35%</div>
              </div>
              <div className="p-3 bg-blue-900 rounded">
                <div className="font-medium">Événement SPARK</div>
                <div className="text-sm text-gray-400">Financement: 60%</div>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                Explorer Marketplace
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Mes Investissements
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
                Analyser Performance
              </button>
            </div>
          </div>
        </div>

        {/* Marketplace Preview */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Marketplace - Top Opportunités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-gray-400">Artiste Digital</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Objectif</span>
                  <span className="font-bold">€15,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Collecté</span>
                  <span className="font-bold text-green-400">€12,450</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI Estimé</span>
                  <span className="font-bold text-blue-400">28%</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                Investir
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Marcus Rodriguez</h4>
                  <p className="text-sm text-gray-400">Musicien</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Objectif</span>
                  <span className="font-bold">€8,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Collecté</span>
                  <span className="font-bold text-green-400">€6,200</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI Estimé</span>
                  <span className="font-bold text-blue-400">32%</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                Investir
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Événement SPARK</h4>
                  <p className="text-sm text-gray-400">Festival Immersif</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Objectif</span>
                  <span className="font-bold">€25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Collecté</span>
                  <span className="font-bold text-green-400">€18,750</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI Estimé</span>
                  <span className="font-bold text-blue-400">25%</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                Investir
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 