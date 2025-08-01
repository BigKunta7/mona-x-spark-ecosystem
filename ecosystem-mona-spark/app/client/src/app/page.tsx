'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            MONA x SPARK
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transformez votre créativité en carrière
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">MONA</h3>
              <p className="text-gray-300">
                Agence digitale et label pour artistes émergents
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">SPARK</h3>
              <p className="text-gray-300">
                Media lab et studio créatif pour collaborations
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">MARKETPLACE</h3>
              <p className="text-gray-300">
                Plateforme de services pour experts créatifs
              </p>
            </div>
          </div>
          <div className="mt-16">
            <a href="/register" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
              Commencer l'aventure
            </a>
          </div>
        </div>
      </div>
  )
}
