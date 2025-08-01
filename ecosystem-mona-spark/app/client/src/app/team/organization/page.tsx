'use client';

import React, { useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  primary_role: string;
  primary_department: string;
  backup_roles: string[];
  squad_assignments: string[];
  squad_lead_roles: string[];
  skills: string[];
  specialties: string[];
  bio?: string;
  status: string;
  availability_percentage: number;
}

interface Squad {
  id: string;
  name: string;
  description: string;
  department: string;
  status: string;
  lead_member_id?: string;
}

export default function TeamOrganizationPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Simuler la récupération des données depuis l'API
  useEffect(() => {
    // TODO: Remplacer par des appels API réels
    const mockTeamMembers: TeamMember[] = [
      {
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
      },
      {
        id: '2',
        first_name: 'Alexandre',
        last_name: '',
        email: 'alexandre@monaxspark.com',
        primary_role: 'Head Artists & Growth',
        primary_department: 'Core Team',
        backup_roles: ['Business Intelligence', 'SDR'],
        squad_assignments: ['Squad Lancement Artiste'],
        squad_lead_roles: ['Squad Lancement Artiste'],
        skills: ['A&R', 'Développement des talents', 'SDR artistes', 'Business Intelligence', 'Suivi KPI', 'Funnel conversion'],
        specialties: ['A&R', 'Growth', 'Analytics'],
        bio: 'Head Artists & Growth - A&R + développement des talents, SDR artistes, Business Intelligence : suivi KPI, funnel conversion',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '3',
        first_name: 'Valentine',
        last_name: '',
        email: 'valentine@monaxspark.com',
        primary_role: 'Creative Director & Brand',
        primary_department: 'Core Team',
        backup_roles: ['Communication', 'Community Management'],
        squad_assignments: ['Squad Lancement Artiste'],
        squad_lead_roles: ['Squad Création & Brand'],
        skills: ['Direction artistique globale', 'Social Media Strategy', 'Ligne éditoriale', 'Planning', 'Co-pilotage presse'],
        specialties: ['Creative Direction', 'Brand Strategy', 'Social Media'],
        bio: 'Creative Director & Brand - Direction artistique globale, Social Media Strategy : ligne éditoriale & planning, co-pilotage presse',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '4',
        first_name: 'Valentin',
        last_name: '',
        email: 'valentin@monaxspark.com',
        primary_role: 'BizDev / BDR Senior',
        primary_department: 'Core Team',
        backup_roles: ['Négociation'],
        squad_assignments: ['Squad Campagne Sponsors'],
        squad_lead_roles: ['Squad Campagne Sponsors'],
        skills: ['Closing sponsors', 'Grands comptes', 'Négociation contrats', 'Définition pricing offres B2B'],
        specialties: ['Business Development', 'Sales', 'Partnerships'],
        bio: 'BizDev / BDR Senior - Closing sponsors / grands comptes, négociation contrats, définition pricing offres B2B',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '5',
        first_name: 'Mohand',
        last_name: '',
        email: 'mohand@monaxspark.com',
        primary_role: 'Partenariats & Market Intelligence',
        primary_department: 'Core Team',
        backup_roles: ['Support stratégique'],
        squad_assignments: ['Squad Campagne Sponsors'],
        squad_lead_roles: ['Squad Partenariats'],
        skills: ['Développement B2B', 'Partenariats culturels', 'Veille tendances', 'Benchmark', 'Support stratégique'],
        specialties: ['Partnerships', 'Market Intelligence', 'B2B Development'],
        bio: 'Partenariats & Market Intelligence - Développement B2B (partenariats culturels), veille tendances / benchmark, support stratégique',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '6',
        first_name: 'Mathis',
        last_name: '',
        email: 'mathis@monaxspark.com',
        primary_role: 'Head Production Audiovisuelle',
        primary_department: 'Création & Production',
        backup_roles: ['Montage'],
        squad_assignments: ['Squad Lancement Artiste'],
        squad_lead_roles: ['Squad Production'],
        skills: ['Réalisation son & vidéo', 'Supervision technique', 'Caméras', 'Setup villa', 'Gestion freelances prod', 'Monteurs', 'Cadreurs'],
        specialties: ['Production Audiovisuelle', 'Technical Supervision', 'Freelance Management'],
        bio: 'Head Production Audiovisuelle - Réalisation son & vidéo, supervision technique (caméras, setup villa), gestion freelances prod',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '7',
        first_name: 'Dylan',
        last_name: '',
        email: 'dylan@monaxspark.com',
        primary_role: 'Motion & Visual Designer',
        primary_department: 'Création & Production',
        backup_roles: ['Design'],
        squad_assignments: ['Squad Campagne Sponsors'],
        squad_lead_roles: ['Squad Design'],
        skills: ['Créations visuelles', 'Motion', 'Templates social media', 'Montage stories', 'Shorts rapides'],
        specialties: ['Motion Design', 'Visual Design', 'Social Media Templates'],
        bio: 'Motion & Visual Designer - Créations visuelles & motion, templates social media, montage stories / shorts rapides',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '8',
        first_name: 'Gilda',
        last_name: '',
        email: 'gilda@monaxspark.com',
        primary_role: 'Content & Community',
        primary_department: 'Création & Production',
        backup_roles: ['Influence'],
        squad_assignments: ['Squad Lancement Artiste'],
        squad_lead_roles: ['Squad Community'],
        skills: ['Création contenu behind the scenes', 'Lifestyle', 'Social Media Management', 'Posting', 'Modération', 'Coordination influence', 'Collabs créateurs'],
        specialties: ['Content Creation', 'Community Management', 'Influence'],
        bio: 'Content & Community - Création contenu behind the scenes / lifestyle, Social Media Management (posting / modération), coordination influence & collabs créateurs',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '9',
        first_name: 'Sandi',
        last_name: '',
        email: 'sandi@monaxspark.com',
        primary_role: 'Presse & Influence',
        primary_department: 'Communication & Influence',
        backup_roles: ['Communication'],
        squad_assignments: ['Squad Campagne Sponsors'],
        squad_lead_roles: ['Squad Communication'],
        skills: ['Relations médias', 'Interviews', 'Com de crise', 'Storytelling RP', 'Influence TikTok/IG'],
        specialties: ['PR', 'Media Relations', 'Influence Marketing'],
        bio: 'Presse & Influence - Relations médias & interviews, com de crise & storytelling RP, influence TikTok/IG avec Gilda',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '10',
        first_name: 'Khaïdja',
        last_name: '',
        email: 'khaidja@monaxspark.com',
        primary_role: 'Ops Manager',
        primary_department: 'Ops, Admin & Support',
        backup_roles: ['Coordination'],
        squad_assignments: ['Squad Événement SPARK'],
        squad_lead_roles: ['Squad Événement SPARK'],
        skills: ['Logistique', 'Plannings', 'Coordination projets', 'Support aux events SPARK', 'Pilotage de projet transverse'],
        specialties: ['Operations', 'Project Management', 'Logistics'],
        bio: 'Ops Manager - Logistique, plannings, coordination projets, support aux events SPARK, pilotage de projet transverse',
        status: 'active',
        availability_percentage: 100
      },
      {
        id: '11',
        first_name: 'O\'Lwen',
        last_name: '',
        email: 'olwen@monaxspark.com',
        primary_role: 'Admin, Juridique & Finances',
        primary_department: 'Ops, Admin & Support',
        backup_roles: ['Juridique', 'Artistes'],
        squad_assignments: ['Squad Campagne Sponsors'],
        squad_lead_roles: ['Squad Admin'],
        skills: ['Contrats artistes', 'Contrats sponsors', 'Facturation', 'Déclarations', 'Compliance', 'Interface cabinet juridique', 'Fiscalité'],
        specialties: ['Legal', 'Finance', 'Administration'],
        bio: 'Admin, Juridique & Finances - Contrats artistes & sponsors, facturation, déclarations, compliance, interface cabinet juridique / fiscalité',
        status: 'active',
        availability_percentage: 100
      }
    ];

    const mockSquads: Squad[] = [
      {
        id: '1',
        name: 'Squad Lancement Artiste',
        description: 'Équipe dédiée au lancement et développement des artistes',
        department: 'Core Team',
        status: 'active'
      },
      {
        id: '2',
        name: 'Squad Campagne Sponsors',
        description: 'Équipe dédiée aux campagnes de sponsoring et partenariats',
        department: 'Core Team',
        status: 'active'
      },
      {
        id: '3',
        name: 'Squad Événement SPARK',
        description: 'Équipe dédiée à l\'organisation des événements SPARK',
        department: 'Ops, Admin & Support',
        status: 'active'
      },
      {
        id: '4',
        name: 'Squad Création & Brand',
        description: 'Équipe dédiée à la création et à la direction artistique',
        department: 'Création & Production',
        status: 'active'
      },
      {
        id: '5',
        name: 'Squad Production',
        description: 'Équipe dédiée à la production audiovisuelle',
        department: 'Création & Production',
        status: 'active'
      },
      {
        id: '6',
        name: 'Squad Design',
        description: 'Équipe dédiée au design et aux créations visuelles',
        department: 'Création & Production',
        status: 'active'
      },
      {
        id: '7',
        name: 'Squad Community',
        description: 'Équipe dédiée à la gestion de communauté et au contenu',
        department: 'Création & Production',
        status: 'active'
      },
      {
        id: '8',
        name: 'Squad Communication',
        description: 'Équipe dédiée à la communication et aux relations presse',
        department: 'Communication & Influence',
        status: 'active'
      },
      {
        id: '9',
        name: 'Squad Partenariats',
        description: 'Équipe dédiée aux partenariats et à l\'intelligence de marché',
        department: 'Core Team',
        status: 'active'
      },
      {
        id: '10',
        name: 'Squad Admin',
        description: 'Équipe dédiée à l\'administration, juridique et finances',
        department: 'Ops, Admin & Support',
        status: 'active'
      },
      {
        id: '11',
        name: 'Squad Stratégie Générale',
        description: 'Équipe dédiée à la stratégie générale et au leadership',
        department: 'Core Team',
        status: 'active'
      }
    ];

    setTeamMembers(mockTeamMembers);
    setSquads(mockSquads);
    setLoading(false);
  }, []);

  const departments = ['Core Team', 'Création & Production', 'Communication & Influence', 'Ops, Admin & Support'];

  const filteredMembers = selectedDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.primary_department === selectedDepartment);

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
          <p className="mt-4 text-slate-400">Chargement de l'organigramme...</p>
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
            Organigramme Équipe
          </h1>
          <p className="text-slate-400 max-w-3xl">
            Structure startup horizontale MONA x SPARK - Organisation modulaire par squads avec rôles multi-casquettes
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedDepartment('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDepartment === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
              }`}
            >
              Tous les départements
            </button>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedDepartment === dept 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Organigramme par département */}
        {departments.map(department => {
          const deptMembers = teamMembers.filter(member => member.primary_department === department);
          if (selectedDepartment !== 'all' && selectedDepartment !== department) return null;

          return (
            <div key={department} className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className={`inline-block w-4 h-4 rounded-full mr-3 ${getDepartmentColor(department)}`}></span>
                {department}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deptMembers.map(member => (
                  <div key={member.id} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
                    {/* Header du membre */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.first_name} {member.last_name}
                      </h3>
                      <p className="text-purple-400 font-semibold text-sm">
                        {member.primary_role}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {member.email}
                      </p>
                    </div>

                    {/* Compétences principales */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Compétences</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-600 text-white rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Squads */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Squads</h4>
                      <div className="space-y-1">
                        {member.squad_assignments.map((squad, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">{squad}</span>
                            {member.squad_lead_roles.includes(squad) && (
                              <span className="px-1 py-0.5 bg-yellow-600 text-white rounded text-xs">
                                Lead
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Backup roles */}
                    {member.backup_roles.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Backup</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.backup_roles.map((role, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Disponibilité */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Disponibilité</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-700 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${member.availability_percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-400">{member.availability_percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Squads Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Squads Modulaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {squads.map(squad => {
              const squadMembers = teamMembers.filter(member => 
                member.squad_assignments.includes(squad.name)
              );
              const squadLeads = teamMembers.filter(member => 
                member.squad_lead_roles.includes(squad.name)
              );

              return (
                <div key={squad.id} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-2">{squad.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{squad.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Département</span>
                      <span className="text-xs text-purple-400">{squad.department}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Membres</span>
                      <span className="text-xs text-white">{squadMembers.length}</span>
                    </div>
                    
                    {squadLeads.length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Leads</span>
                        <span className="text-xs text-yellow-400">
                          {squadLeads.map(lead => `${lead.first_name} ${lead.last_name}`).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 