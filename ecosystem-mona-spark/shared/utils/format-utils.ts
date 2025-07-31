// Utilitaires de formatage pour MONA x SPARK

// =====================================================
// FORMATAGE DES NOMBRES
// =====================================================

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

export function formatFileSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${formatNumber(bytes / Math.pow(1024, i), 1)} ${sizes[i]}`;
}

// =====================================================
// FORMATAGE DES TEXTES
// =====================================================

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalizeWords(str: string): string {
  return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
}

export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatPhoneNumber(phone: string): string {
  // Format: +33 1 23 45 67 89 ou 01 23 45 67 89
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('33')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
  }
  
  if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
  }
  
  return phone;
}

// =====================================================
// FORMATAGE SPÉCIFIQUE MONA x SPARK
// =====================================================

export function formatMonaScore(score: number): string {
  if (score >= 80) return `${score}/100 - Excellent`;
  if (score >= 70) return `${score}/100 - Bon`;
  if (score >= 60) return `${score}/100 - Moyen`;
  if (score >= 50) return `${score}/100 - Faible`;
  return `${score}/100 - Insuffisant`;
}

export function formatArtistStatus(status: string): string {
  const statusMap: Record<string, string> = {
    prospect: 'Prospect',
    qualified: 'Qualifié',
    active: 'Actif',
    completed: 'Terminé',
    archived: 'Archivé'
  };
  return statusMap[status] || status;
}

export function formatCampaignType(type: string): string {
  const typeMap: Record<string, string> = {
    quick_win: 'Quick Win',
    audit: 'Audit',
    content_plan: 'Plan de Contenu',
    long_term: 'Long Terme'
  };
  return typeMap[type] || type;
}

export function formatSparkEventType(type: string): string {
  const typeMap: Record<string, string> = {
    villa_creative: 'Villa Créative',
    live_stream: 'Live Stream',
    mini_docu: 'Mini Documentaire',
    showcase: 'Showcase',
    workshop: 'Atelier'
  };
  return typeMap[type] || type;
}

export function formatSocialPlatform(platform: string): string {
  const platformMap: Record<string, string> = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    twitter: 'Twitter',
    facebook: 'Facebook',
    spotify: 'Spotify',
    soundcloud: 'SoundCloud'
  };
  return platformMap[platform] || platform;
}

// =====================================================
// FORMATAGE DES DONNÉES
// =====================================================

export function formatSocialMetrics(metrics: Record<string, number>): Record<string, string> {
  return {
    followers: formatNumber(metrics.followers),
    engagement: formatPercentage(metrics.engagement),
    reach: formatNumber(metrics.reach),
    impressions: formatNumber(metrics.impressions),
    clicks: formatNumber(metrics.clicks),
    conversions: formatNumber(metrics.conversions)
  };
}

export function formatBudget(budget: number, type: 'campaign' | 'event' | 'artist'): string {
  const formatted = formatCurrency(budget);
  
  const typeLabels = {
    campaign: 'Campagne',
    event: 'Événement',
    artist: 'Artiste'
  };
  
  return `${typeLabels[type]}: ${formatted}`;
}

export function formatDuration(startDate: Date, endDate: Date): string {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (days === 1) return '1 jour';
  if (days < 7) return `${days} jours`;
  if (days < 30) return `${Math.ceil(days / 7)} semaines`;
  if (days < 365) return `${Math.ceil(days / 30)} mois`;
  return `${Math.ceil(days / 365)} an(s)`;
}

// =====================================================
// FORMATAGE DES LIENS
// =====================================================

export function formatSocialLink(platform: string, username: string): string {
  const baseUrls: Record<string, string> = {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/@',
    youtube: 'https://youtube.com/@',
    twitter: 'https://twitter.com/',
    facebook: 'https://facebook.com/',
    spotify: 'https://open.spotify.com/artist/',
    soundcloud: 'https://soundcloud.com/'
  };
  
  return baseUrls[platform] ? `${baseUrls[platform]}${username}` : username;
}

export function formatCalendlyLink(email: string, name: string): string {
  const baseUrl = 'https://calendly.com/mona-spark';
  const params = new URLSearchParams({
    email: email,
    name: name
  });
  return `${baseUrl}?${params.toString()}`;
}

// =====================================================
// CONSTANTES DE FORMATAGE
// =====================================================

export const FORMAT_CONFIG = {
  CURRENCY: {
    EUR: 'EUR',
    USD: 'USD'
  },
  DATE_FORMATS: {
    SHORT: 'dd/MM/yyyy',
    LONG: 'dd MMMM yyyy',
    TIME: 'HH:mm',
    DATETIME: 'dd/MM/yyyy HH:mm'
  },
  NUMBER_FORMATS: {
    DECIMALS: 2,
    PERCENTAGE_DECIMALS: 1
  }
} as const;

export const PLATFORM_ICONS = {
  instagram: '📸',
  tiktok: '🎵',
  youtube: '📺',
  twitter: '🐦',
  facebook: '📘',
  spotify: '🎧',
  soundcloud: '☁️'
} as const;
