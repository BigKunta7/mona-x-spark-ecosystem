// Templates de communication adaptés pour MONA x SPARK

import { ContactTemplate } from '../types/mona-business-model';

// =====================================================
// TEMPLATES DE CONTACT ADAPTÉS
// =====================================================

export const CONTACT_TEMPLATES: Record<string, ContactTemplate> = {
  hot_template: {
    id: 'hot_template',
    type: 'hot',
    name: 'Template HOT - Découverte récente',
    template: `Salut {artistName} ! 🔥 

J'viens de découvrir "{specificTrack}" et franchement... {specificInsight}. Je suis {contactName}, je développe des artistes comme {similarArtist}.

Ton potentiel est énorme, mais je vois {specificInsight} qu'on pourrait exploser ensemble. J'ai {budget}€ à investir sur ton prochain projet si ça match.

Tu peux me rappeler ? {phoneNumber} Ou on se cale 15min : {calendlyLink}

PS: Écoute {similarArtist} pour voir le niveau qu'on vise 🎯`,
    variables: [
      'artistName',
      'specificTrack',
      'specificInsight',
      'contactName',
      'similarArtist',
      'budget',
      'phoneNumber',
      'calendlyLink'
    ],
    successRate: 0.35
  },

  warm_template: {
    id: 'warm_template',
    type: 'warm',
    name: 'Template WARM - Contact existant',
    template: `Hey {artistName} ! 👋

Ça fait un moment qu'on s'est parlé ! J'ai repensé à ton projet "{specificTrack}" et je me disais qu'on pourrait vraiment faire quelque chose de fou ensemble.

Je développe actuellement des artistes comme {similarArtist} et je vois exactement le même potentiel chez toi. {specificInsight}

J'ai {budget}€ à investir sur des projets qui me font vibrer. Le tien en fait partie.

Tu as 5min pour qu'on en parle ? {phoneNumber} ou {calendlyLink}

À bientôt ! 🚀`,
    variables: [
      'artistName',
      'specificTrack',
      'similarArtist',
      'specificInsight',
      'budget',
      'phoneNumber',
      'calendlyLink'
    ],
    successRate: 0.25
  },

  cold_template: {
    id: 'cold_template',
    type: 'cold',
    name: 'Template COLD - Première approche',
    template: `Salut {artistName} ! 

Je suis {contactName}, je développe des artistes émergents depuis 5 ans. J'ai découvert ton univers et je suis impressionné par {specificInsight}.

Je travaille avec des artistes comme {similarArtist} et je vois exactement le même potentiel chez toi.

J'ai {budget}€ à investir sur des projets qui me font vibrer. Le tien en fait partie.

Tu as 5min pour qu'on en parle ? {phoneNumber} ou {calendlyLink}

À bientôt ! 🎵`,
    variables: [
      'artistName',
      'contactName',
      'specificInsight',
      'similarArtist',
      'budget',
      'phoneNumber',
      'calendlyLink'
    ],
    successRate: 0.15
  },

  spark_invitation: {
    id: 'spark_invitation',
    type: 'hot',
    name: 'Invitation SPARK - Événement collectif',
    template: `Salut {artistName} ! 🌟

J'ai une opportunité unique pour toi ! On organise un événement SPARK avec {participantCount} artistes comme {similarArtist} dans une villa créative.

Ton univers "{specificTrack}" serait parfait pour ce projet collectif. {specificInsight}

On a {budget}€ de budget sponsor et on vise {targetAudience} vues.

Tu veux en faire partie ? {calendlyLink}

C'est du 100% gagnant-gagnant ! 🚀`,
    variables: [
      'artistName',
      'participantCount',
      'similarArtist',
      'specificTrack',
      'specificInsight',
      'budget',
      'targetAudience',
      'calendlyLink'
    ],
    successRate: 0.45
  },

  follow_up_1: {
    id: 'follow_up_1',
    type: 'warm',
    name: 'Follow-up 1 - Relance douce',
    template: `Hey {artistName} ! 

Je me disais que tu avais peut-être manqué mon message sur {specificTrack} ?

J'ai toujours {budget}€ à investir sur ton projet. C'est vraiment une opportunité unique.

Tu as 2min ? {phoneNumber}

À bientôt ! 🎯`,
    variables: [
      'artistName',
      'specificTrack',
      'budget',
      'phoneNumber'
    ],
    successRate: 0.20
  },

  follow_up_2: {
    id: 'follow_up_2',
    type: 'cold',
    name: 'Follow-up 2 - Dernière chance',
    template: `Salut {artistName} ! 

Dernière tentative pour te contacter au sujet de {specificTrack}.

J'ai {budget}€ à investir et je pense vraiment que ton projet en vaut la peine.

Si tu es intéressé, réponds-moi vite ! {phoneNumber}

Sinon, bonne continuation ! 🎵`,
    variables: [
      'artistName',
      'specificTrack',
      'budget',
      'phoneNumber'
    ],
    successRate: 0.10
  }
};

// =====================================================
// FONCTIONS DE PERSONNALISATION
// =====================================================

export function personalizeTemplate(
  template: ContactTemplate,
  artistData: Record<string, any>,
  contactData: Record<string, any>
): string {
  let personalizedTemplate = template.template;

  // Remplacer les variables par les données
  for (const variable of template.variables) {
    const value = artistData[variable] || contactData[variable] || `{${variable}}`;
    personalizedTemplate = personalizedTemplate.replace(
      new RegExp(`{${variable}}`, 'g'),
      value
    );
  }

  return personalizedTemplate;
}

export function generateSpecificInsight(artistData: Record<string, any>): string {
  const insights = [
    'ton univers sonore est vraiment unique',
    'ta production est au top niveau',
    'ton engagement sur les réseaux est impressionnant',
    'tu as un vrai potentiel commercial',
    'ton évolution artistique est remarquable',
    'ton professionnalisme se ressent',
    'tu as une vision carrière claire',
    'ton équipe est bien structurée'
  ];

  // Choisir un insight basé sur les données de l'artiste
  const score = artistData.totalScore || 0;
  if (score > 70) return insights[0];
  if (score > 60) return insights[1];
  if (score > 50) return insights[2];
  if (score > 40) return insights[3];
  return insights[Math.floor(Math.random() * insights.length)];
}

export function findSimilarArtist(artistData: Record<string, any>): string {
  const similarArtists = [
    'Dua Lipa',
    'The Weeknd',
    'Post Malone',
    'Billie Eilish',
    'Drake',
    'Ariana Grande',
    'Ed Sheeran',
    'Taylor Swift'
  ];

  // Basé sur le genre ou le style
  const genre = artistData.genre || 'pop';
  const genreMap: Record<string, string> = {
    'pop': 'Dua Lipa',
    'hip-hop': 'Post Malone',
    'r&b': 'The Weeknd',
    'electronic': 'Billie Eilish',
    'rock': 'Imagine Dragons',
    'indie': 'Tame Impala'
  };

  return genreMap[genre] || similarArtists[Math.floor(Math.random() * similarArtists.length)];
}

// =====================================================
// FONCTIONS DE STRATÉGIE DE CONTACT
// =====================================================

export function selectTemplate(
  artistScore: number,
  previousContact: boolean,
  isSparkEligible: boolean
): ContactTemplate {
  if (isSparkEligible && artistScore > 60) {
    return CONTACT_TEMPLATES.spark_invitation;
  }

  if (artistScore > 70) {
    return CONTACT_TEMPLATES.hot_template;
  }

  if (previousContact) {
    return CONTACT_TEMPLATES.warm_template;
  }

  return CONTACT_TEMPLATES.cold_template;
}

export function calculateContactTiming(artistScore: number): number {
  // Délai en heures avant le premier contact
  if (artistScore > 80) return 1; // Contact immédiat
  if (artistScore > 60) return 4; // Contact dans la journée
  if (artistScore > 40) return 24; // Contact le lendemain
  return 48; // Contact dans 2 jours
}

export function generateFollowUpSchedule(initialResponse: boolean): Date[] {
  if (initialResponse) {
    // Si réponse positive, suivi rapproché
    return [
      new Date(Date.now() + 24 * 60 * 60 * 1000), // +1 jour
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 jours
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +1 semaine
    ];
  } else {
    // Si pas de réponse, relances espacées
    return [
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 jours
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +1 semaine
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // +2 semaines
    ];
  }
}

// =====================================================
// FONCTIONS D'ANALYSE DE PERFORMANCE
// =====================================================

export function calculateTemplateSuccessRate(
  templateId: string,
  sentCount: number,
  responseCount: number
): number {
  if (sentCount === 0) return 0;
  return responseCount / sentCount;
}

export function getBestPerformingTemplate(templates: Record<string, any>): string {
  let bestTemplate = '';
  let bestRate = 0;

  for (const [templateId, data] of Object.entries(templates)) {
    const successRate = calculateTemplateSuccessRate(
      templateId,
      data.sentCount,
      data.responseCount
    );
    
    if (successRate > bestRate) {
      bestRate = successRate;
      bestTemplate = templateId;
    }
  }

  return bestTemplate;
}

export function optimizeTemplateSelection(
  artistScore: number,
  historicalData: Record<string, any>
): ContactTemplate {
  // Utiliser les données historiques pour optimiser la sélection
  const bestTemplate = getBestPerformingTemplate(historicalData);
  
  if (bestTemplate && CONTACT_TEMPLATES[bestTemplate]) {
    return CONTACT_TEMPLATES[bestTemplate];
  }

  // Fallback sur la sélection basée sur le score
  return selectTemplate(artistScore, false, false);
} 