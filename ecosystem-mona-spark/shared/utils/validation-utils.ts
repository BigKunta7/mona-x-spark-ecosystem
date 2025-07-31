// Utilitaires de validation pour MONA x SPARK

// =====================================================
// VALIDATION DES EMAILS
// =====================================================

export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email invalide' };
  }
  return { isValid: true };
}

export function validatePhone(phone: string): { isValid: boolean; error?: string } {
  const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Numéro de téléphone invalide' };
  }
  return { isValid: true };
}

export function validateUrl(url: string): { isValid: boolean; error?: string } {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'URL invalide' };
  }
}

// =====================================================
// VALIDATION DES DONNÉES ARTISTES
// =====================================================

export function validateArtist(data: any): { isValid: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!data.name || data.name.length < 2) {
    errors.name = 'Nom trop court (minimum 2 caractères)';
  }
  
  if (!data.email) {
    errors.email = 'Email requis';
  } else {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || 'Email invalide';
    }
  }
  
  if (data.phone) {
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error || 'Téléphone invalide';
    }
  }
  
  if (data.monaScore < 0 || data.monaScore > 100) {
    errors.monaScore = 'Score MONA doit être entre 0 et 100';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

// =====================================================
// VALIDATION DES CAMPAGNES
// =====================================================

export function validateCampaign(data: any): { isValid: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!data.title || data.title.length < 5) {
    errors.title = 'Titre trop court (minimum 5 caractères)';
  }
  
  if (!data.description || data.description.length < 10) {
    errors.description = 'Description trop courte (minimum 10 caractères)';
  }
  
  if (!data.budget || data.budget <= 0) {
    errors.budget = 'Budget doit être positif';
  }
  
  if (!data.startDate) {
    errors.startDate = 'Date de début requise';
  }
  
  if (!data.endDate) {
    errors.endDate = 'Date de fin requise';
  }
  
  if (data.startDate && data.endDate && new Date(data.startDate) >= new Date(data.endDate)) {
    errors.endDate = 'Date de fin doit être après la date de début';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

// =====================================================
// VALIDATION DES ÉVÉNEMENTS SPARK
// =====================================================

export function validateSparkEvent(data: any): { isValid: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!data.title || data.title.length < 5) {
    errors.title = 'Titre trop court (minimum 5 caractères)';
  }
  
  if (!data.description || data.description.length < 10) {
    errors.description = 'Description trop courte (minimum 10 caractères)';
  }
  
  if (!data.location || data.location.length < 3) {
    errors.location = 'Localisation trop courte (minimum 3 caractères)';
  }
  
  if (!data.maxParticipants || data.maxParticipants < 1) {
    errors.maxParticipants = 'Au moins 1 participant requis';
  }
  
  if (data.maxParticipants > 50) {
    errors.maxParticipants = 'Maximum 50 participants';
  }
  
  if (!data.budget || data.budget <= 0) {
    errors.budget = 'Budget doit être positif';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

// =====================================================
// VALIDATIONS SPÉCIFIQUES MONA x SPARK
// =====================================================

export function validateMonaScore(score: number): { isValid: boolean; error?: string } {
  if (score < 0 || score > 100) {
    return { isValid: false, error: 'Score MONA doit être entre 0 et 100' };
  }
  return { isValid: true };
}

export function validateSocialMetrics(metrics: Record<string, number>): { isValid: boolean; errors?: string[] } {
  const errors: string[] = [];
  
  if (metrics.followers < 0) errors.push('Followers ne peut pas être négatif');
  if (metrics.engagement < 0 || metrics.engagement > 100) errors.push('Engagement doit être entre 0 et 100%');
  if (metrics.reach < 0) errors.push('Reach ne peut pas être négatif');
  
  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

export function validateBudget(budget: number, type: 'campaign' | 'event' | 'artist'): { isValid: boolean; error?: string } {
  const minBudgets = {
    campaign: 100,
    event: 500,
    artist: 50
  };
  
  if (budget < minBudgets[type]) {
    return { isValid: false, error: `Budget minimum pour ${type}: ${minBudgets[type]}€` };
  }
  
  return { isValid: true };
}

// =====================================================
// UTILITAIRES DE VALIDATION
// =====================================================

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function validateRequired(value: any, fieldName: string): { isValid: boolean; error?: string } {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, error: `${fieldName} est requis` };
  }
  return { isValid: true };
}

export function validateLength(value: string, min: number, max: number, fieldName: string): { isValid: boolean; error?: string } {
  if (value.length < min) {
    return { isValid: false, error: `${fieldName} doit contenir au moins ${min} caractères` };
  }
  if (value.length > max) {
    return { isValid: false, error: `${fieldName} doit contenir maximum ${max} caractères` };
  }
  return { isValid: true };
}

// =====================================================
// CONSTANTES DE VALIDATION
// =====================================================

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+33|0)[1-9](\d{8})$/,
  URL: /^https?:\/\/.+/,
  MONA_SCORE: /^[0-9]{1,3}$/,
  BUDGET: /^[0-9]+(\.[0-9]{2})?$/
} as const;

export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  TITLE_MIN: 5,
  TITLE_MAX: 200,
  DESCRIPTION_MIN: 10,
  DESCRIPTION_MAX: 1000,
  PHONE_MAX: 15,
  EMAIL_MAX: 255
} as const;
