'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-6">
          Contact
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Contactez l'équipe MONA x SPARK pour toute question, 
          demande de partenariat ou support technique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Parlons de Votre Projet
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Que vous soyez artiste, expert, sponsor ou partenaire, 
            notre équipe est là pour vous accompagner dans votre projet.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-white">Réponse sous 24h</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-white">Consultation gratuite</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-white">Accompagnement personnalisé</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-white">Support technique dédié</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Formulaire de Contact</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Type de demande
              </label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">Sélectionnez...</option>
                <option value="artist">Artiste - Services MONA</option>
                <option value="expert">Expert - Marketplace</option>
                <option value="sponsor">Sponsor - Villas SPARK</option>
                <option value="partnership">Partenariat</option>
                <option value="support">Support technique</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Décrivez votre projet ou votre demande..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-md font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Envoyer le Message
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Informations de Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📧</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-gray-300">contact@mona-spark.com</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Téléphone</h3>
            <p className="text-gray-300">+33 1 23 45 67 89</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Adresse</h3>
            <p className="text-gray-300">Paris, France</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Prêt à Commencer ?</h2>
        <p className="text-gray-300 mb-8">
          Rejoignez l'écosystème MONA x SPARK dès aujourd'hui
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
            S'inscrire
          </a>
          <a href="/mona" className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
            Découvrir MONA
          </a>
        </div>
      </div>
    </div>
  )
} 