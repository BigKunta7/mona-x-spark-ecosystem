'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'artist',
    phone: '',
    specialty: '',
    companyName: '',
    industry: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'inscription
    setTimeout(() => {
      setIsLoading(false);
      // Redirection vers la signature NDA
      window.location.href = '/nda';
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-white mb-2 block">
            MONA x SPARK
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">
            Créer votre compte
          </h2>
          <p className="text-white/60">
            Rejoignez l'écosystème MONA x SPARK
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Step 1: User Type Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-4">
                    Je suis un...
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-white/20 hover:border-blue-400 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="artist"
                        checked={formData.userType === 'artist'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="text-white font-medium">🎵 Artiste</div>
                        <div className="text-white/60 text-sm">Je veux développer ma carrière musicale</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-white/20 hover:border-blue-400 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="expert"
                        checked={formData.userType === 'expert'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="text-white font-medium">💼 Expert</div>
                        <div className="text-white/60 text-sm">Je veux proposer mes services</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-white/20 hover:border-blue-400 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="sponsor"
                        checked={formData.userType === 'sponsor'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="text-white font-medium">🏢 Sponsor</div>
                        <div className="text-white/60 text-sm">Je veux investir dans SPARK</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  Continuer
                </button>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                      Prénom
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                      Nom
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Adresse email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Téléphone (optionnel)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                {/* Conditional fields based on user type */}
                {formData.userType === 'expert' && (
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-white mb-2">
                      Spécialité
                    </label>
                    <select
                      id="specialty"
                      name="specialty"
                      required
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez votre spécialité</option>
                      <option value="production">Production Musicale</option>
                      <option value="direction-artistique">Direction Artistique</option>
                      <option value="marketing">Marketing Digital</option>
                      <option value="social-media">Social Media</option>
                      <option value="video">Production Vidéo</option>
                      <option value="business">Business & Management</option>
                      <option value="coaching">Coaching Artistique</option>
                    </select>
                  </div>
                )}

                {formData.userType === 'sponsor' && (
                  <>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2">
                        Nom de l'entreprise
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-white mb-2">
                        Secteur d'activité
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        required
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez votre secteur</option>
                        <option value="audio-tech">Audio & Tech</option>
                        <option value="fashion-lifestyle">Fashion & Lifestyle</option>
                        <option value="food-beverage">Food & Beverage</option>
                        <option value="digital-apps">Digital & Apps</option>
                        <option value="automotive">Automotive</option>
                        <option value="finance">Finance</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 border border-white/20 rounded-lg text-sm font-medium text-white bg-transparent hover:bg-white/10 transition-all"
                  >
                    Retour
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Password & Terms */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Votre mot de passe"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirmez votre mot de passe"
                  />
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-white/80">
                    J'accepte les{' '}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                      conditions d'utilisation
                    </Link>
                    {' '}et la{' '}
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                      politique de confidentialité
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-white/80">
                    Je souhaite recevoir les actualités de MONA x SPARK
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 border border-white/20 rounded-lg text-sm font-medium text-white bg-transparent hover:bg-white/10 transition-all"
                  >
                    Retour
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Création en cours...
                      </div>
                    ) : (
                      'Créer mon compte'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-white/60">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
} 