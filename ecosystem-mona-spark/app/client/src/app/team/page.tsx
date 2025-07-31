// ecosystem-mona-spark/app/client/src/app/team/page.tsx
'use client';

import React from 'react';

// Définition du type pour un membre de l'équipe
interface TeamMember {
  avatar: string;
  name: string;
  title: string;
  description: string;
  links?: {
    icon: 'github' | 'linkedin' | 'twitter';
    link: string;
  }[];
}

// Données factices pour l'équipe
const teamMembers: TeamMember[] = [
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Alexandre Dubois',
    title: 'CEO & Fondateur',
    description: 'Visionnaire et stratège, Alex dirige MONA x SPARK avec la passion de transformer l\'industrie créative.',
    links: [
      { icon: 'linkedin', link: '#' },
      { icon: 'twitter', link: '#' },
    ],
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    name: 'Juliette Moreau',
    title: 'Directrice Artistique (MONA)',
    description: 'Avec un œil pour le talent brut, Juliette sculpte les carrières des artistes MONA pour en faire des icônes.',
    links: [
      { icon: 'linkedin', link: '#' },
    ],
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    name: 'Leo Garnier',
    title: 'Responsable des Événements (SPARK)',
    description: 'Léo est le maître d\'œuvre derrière les expériences immersives SPARK, créant des moments inoubliables.',
    links: [
      { icon: 'twitter', link: '#' },
    ],
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    name: 'Chloé Martin',
    title: 'Développeuse Full-Stack',
    description: 'Architecte de notre plateforme, Chloé transforme les idées complexes en fonctionnalités fluides et intuitives.',
    links: [
      { icon: 'github', link: '#' },
      { icon: 'linkedin', link: '#' },
    ],
  },
];

const SocialIcon = ({ icon }: { icon: 'github' | 'linkedin' | 'twitter' }) => {
    const icons = {
        github: <path d="M9 19c-5 1.5-5-2.5-7-3m7 6v-6a2 2 0 00-2-2 2 2 0 00-2 2v6m-7-10h4v-2a2 2 0 012-2h4a2 2 0 012 2v2h4m-11 4v-2a2 2 0 00-2-2 2 2 0 00-2 2v2m11 0v-2a2 2 0 00-2-2 2 2 0 00-2 2v2" />,
        linkedin: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />,
        twitter: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon]}
        </svg>
    )
}

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="text-center p-6 bg-gray-900 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-purple-500/20">
    <img src={member.avatar} alt={`Avatar de ${member.name}`} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700" />
    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
    <p className="text-purple-400 font-semibold mb-3">{member.title}</p>
    <p className="text-gray-400 mb-4">{member.description}</p>
    <div className="flex justify-center space-x-4">
      {member.links?.map((social, index) => (
        <a key={index} href={social.link} className="text-gray-500 hover:text-purple-400 transition-colors">
          <SocialIcon icon={social.icon} />
        </a>
      ))}
    </div>
  </div>
);

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tighter text-white">Notre Équipe</h1>
          <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto">
            Les passionnés qui construisent le futur de la création.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
