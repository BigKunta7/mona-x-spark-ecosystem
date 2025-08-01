'use client';

import React, { useState, useEffect } from 'react';

interface RecruitmentNeed {
  id: string;
  role_name: string;
  department: string;
  priority: string;
  description: string;
  temporary_coverage: string[];
  requirements: string[];
  budget_range: string;
  timeline: string;
  status: string;
}

export default function RecruitmentPage() {
  const [recruitmentNeeds, setRecruitmentNeeds] = useState<RecruitmentNeed[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Simuler la récupération des données depuis l'API
  useEffect(() => {
    // TODO: Remplacer par des appels API réels
    const mockRecruitmentNeeds: RecruitmentNeed[] = [
      {
        id: '1',
        role_name: 'SDR sponsor/artistes dédié',
        department: 'Core Team',
        priority: 'PRIORITÉ',
        description: 'Sales Development Representative dédié à la prospection sponsors et artistes',
        temporary_coverage: ['Alexandre', 'Kake'],
        requirements: ['Expérience en prospection B2B', 'Connaissance du secteur culturel', 'Outils CRM', 'Capacité de closing'],
        budget_range: '€35K-45K',
        timeline: 'Immédiat',
        status: 'open'
      },
      {
        id: '2',
        role_name: 'Social Media Manager full-time',
        department: 'Création & Production',
        priority: 'PRIORITÉ',
        description: 'Gestionnaire réseaux sociaux à temps plein pour MONA et SPARK',
        temporary_coverage: ['Gilda', 'Valentine'],
        requirements: ['Expérience en gestion de comptes', 'Création de contenu', 'Analytics sociaux', 'Planning éditorial'],
        budget_range: '€30K-40K',
        timeline: 'Immédiat',
        status: 'open'
      },
      {
        id: '3',
        role_name: 'Ops Coordinator junior',
        department: 'Ops, Admin & Support',
        priority: 'PHASE 2',
        description: 'Coordinateur opérationnel junior pour supporter Khaïdja',
        temporary_coverage: ['Khaïdja'],
        requirements: ['Organisation', 'Gestion de projet', 'Outils de coordination', 'Communication'],
        budget_range: '€25K-35K',
        timeline: 'Phase 2',
        status: 'open'
      },
      {
        id: '4',
        role_name: 'Product Manager (plateforme / app)',
        department: 'Core Team',
        priority: 'PHASE 3',
        description: 'Product Manager pour développer la plateforme MONA x SPARK',
        temporary_coverage: ['-'],
        requirements: ['Expérience en product management', 'Développement digital', 'UX/UI', 'Agile'],
        budget_range: '€50K-70K',
        timeline: 'Phase 3',
        status: 'open'
      },
      {
        id: '5',
        role_name: 'Coach scénique/artistique',
        department: 'Création & Production',
        priority: 'À externaliser',
        description: 'Coach artistique pour accompagner les artistes en développement',
        temporary_coverage: ['Freelance ponctuel'],
        requirements: ['Expérience en coaching artistique', 'Connaissance du secteur', 'Pédagogie', 'Réseau artistique'],
        budget_range: '€100-200/h',
        timeline: 'À la demande',
        status: 'open'
      }
    ];

    setRecruitmentNeeds(mockRecruitmentNeeds);
    setLoading(false);
  }, []);

  const priorities = ['PRIORITÉ', 'PHASE 2', 'PHASE 3', 'À externaliser'];

  const filteredNeeds = selectedPriority === 'all' 
    ? recruitmentNeeds 
    : recruitmentNeeds.filter(need => need.priority === selectedPriority);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'PRIORITÉ':
        return 'bg-red-600';
      case 'PHASE 2':
        return 'bg-orange-600';
      case 'PHASE 3':
        return 'bg-yellow-600';
      case 'À externaliser':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Core Team':
        return 'bg-purple-600';
      case 'Création & Production':
        return 'bg-blue-600';
      case 'Communication & Influence':
        return 'bg-green-600';
      case 'Ops, Admin & Support':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Chargement des besoins de recrutement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black tracking-tighter text-white mb-4">
            Besoins de Recrutement
          </h1>
          <p className="text-slate-400 max-w-3xl">
            Gestion des rôles manquants et priorités de recrutement pour l'équipe MONA x SPARK
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white">{recruitmentNeeds.length}</h3>
            <p className="text-slate-400">Total des besoins</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-400">
              {recruitmentNeeds.filter(need => need.priority === 'PRIORITÉ').length}
            </h3>
            <p className="text-slate-400">Priorités</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-400">
              {recruitmentNeeds.filter(need => need.priority === 'PHASE 2').length}
            </h3>
            <p className="text-slate-400">Phase 2</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-400">
              {recruitmentNeeds.filter(need => need.priority === 'À externaliser').length}
            </h3>
            <p className="text-slate-400">À externaliser</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedPriority('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPriority === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
              }`}
            >
              Toutes les priorités
            </button>
            {priorities.map(priority => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPriority === priority 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des besoins */}
        <div className="space-y-6">
          {filteredNeeds.map(need => (
            <div key={need.id} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{need.role_name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(need.priority)}`}>
                      {need.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getDepartmentColor(need.department)}`}>
                      {need.department}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-4">{need.description}</p>
                </div>
                
                <div className="lg:ml-6 lg:text-right">
                  <div className="text-lg font-bold text-white mb-1">{need.budget_range}</div>
                  <div className="text-sm text-slate-400">{need.timeline}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Couverture temporaire */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Couverture Temporaire</h4>
                  <div className="flex flex-wrap gap-2">
                    {need.temporary_coverage.map((person, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm">
                        {person}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exigences */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Exigences</h4>
                  <div className="space-y-1">
                    {need.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        <span className="text-sm text-slate-300">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Voir les candidats
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Publier l'offre
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  Modifier
                </button>
                {need.status === 'open' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Marquer comme pourvu
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions globales */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Actions Globales</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Ajouter un nouveau besoin
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Exporter le rapport
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Planifier les entretiens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 