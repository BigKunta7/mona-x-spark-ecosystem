'use client';

import React, { useState, useEffect } from 'react';

interface TeamMemberProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  primary_role: string;
  primary_department: string;
  backup_roles: string[];
  squad_assignments: string[];
  squad_lead_roles: string[];
  skills: string[];
  specialties: string[];
  bio?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  status: string;
  availability_percentage: number;
}

export default function TeamProfilePage() {
  const [profile, setProfile] = useState<TeamMemberProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Simuler la récupération du profil depuis l'API
  useEffect(() => {
    // TODO: Remplacer par un appel API réel
    const mockProfile: TeamMemberProfile = {
      id: '1',
      first_name: 'Kake',
      last_name: '',
      email: 'kake@monaxspark.com',
      primary_role: 'CEO & Lead Stratégie',
      primary_department: 'Core Team',
      backup_roles: ['RH', 'Sales Closing'],
      squad_assignments: ['Squad Lancement Artiste', 'Squad Campagne Sponsors'],
      squad_lead_roles: ['Squad Stratégie Générale'],
      skills: ['Vision & direction générale', 'Recrutement', 'RH & culture interne', 'Sales closing sponsors majeurs'],
      specialties: ['Stratégie', 'Leadership', 'Business Development'],
      bio: 'CEO & Lead Stratégie - Vision & direction générale, recrutement RH & culture interne, sales closing sponsors majeurs',
      status: 'active',
      availability_percentage: 100
    };
    
    setProfile(mockProfile);
    setLoading(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Implémenter la sauvegarde via API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsEditing(false);
    setSaving(false);
  };

  const handleInputChange = (field: keyof TeamMemberProfile, value: any) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const handleArrayInputChange = (field: keyof TeamMemberProfile, value: string) => {
    if (profile) {
      const currentArray = profile[field] as string[];
      setProfile({ ...profile, [field]: [...currentArray, value] });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400">Profil non trouvé</h2>
          <p className="mt-2 text-slate-400">Votre profil n'a pas été trouvé dans la base de données.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-white mb-4">
            Mon Profil Équipe
          </h1>
          <p className="text-slate-400">
            Finalisez votre profil pour accéder à votre espace personnel
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-gray-900 rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Informations Personnelles</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={profile.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={profile.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={profile.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                />
              </div>
            </div>

            {/* Rôle et département */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Rôle & Département</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rôle Principal
                </label>
                <input
                  type="text"
                  value={profile.primary_role}
                  disabled
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Département
                </label>
                <input
                  type="text"
                  value={profile.primary_department}
                  disabled
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Disponibilité (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={profile.availability_percentage}
                  onChange={(e) => handleInputChange('availability_percentage', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Compétences et spécialités */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Compétences & Spécialités</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Compétences
                </label>
                <div className="space-y-2">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                        {skill}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newSkills = profile.skills.filter((_, i) => i !== index);
                            handleInputChange('skills', newSkills);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="Ajouter une compétence..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          if (target.value.trim()) {
                            handleArrayInputChange('skills', target.value.trim());
                            target.value = '';
                          }
                        }
                      }}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Spécialités
                </label>
                <div className="space-y-2">
                  {profile.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                        {specialty}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newSpecialties = profile.specialties.filter((_, i) => i !== index);
                            handleInputChange('specialties', newSpecialties);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="Ajouter une spécialité..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          if (target.value.trim()) {
                            handleArrayInputChange('specialties', target.value.trim());
                            target.value = '';
                          }
                        }
                      }}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
              placeholder="Décrivez votre parcours et vos objectifs..."
            />
          </div>

          {/* Liens */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={profile.linkedin_url || ''}
                onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                placeholder="https://linkedin.com/in/votre-profil"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Portfolio
              </label>
              <input
                type="url"
                value={profile.portfolio_url || ''}
                onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                placeholder="https://votre-portfolio.com"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Modifier le profil
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 