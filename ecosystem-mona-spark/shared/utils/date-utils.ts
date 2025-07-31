// Utilitaires de gestion des dates pour MONA x SPARK

// =====================================================
// FORMATAGE DES DATES
// =====================================================

export function formatDate(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('fr-FR');
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('fr-FR');
}

export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = now.getTime() - dateObj.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Hier';
  if (diffDays === -1) return 'Demain';
  if (diffDays > 0) return `Il y a ${diffDays} jour(s)`;
  if (diffDays < 0) return `Dans ${Math.abs(diffDays)} jour(s)`;
  
  return formatDate(dateObj);
}

// =====================================================
// VALIDATION DES DATES
// =====================================================

export function isValidDate(date: any): boolean {
  if (!date) return false;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
}

export function isFutureDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj > new Date();
}

export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj < new Date();
}

// =====================================================
// CALCULS DE DATES
// =====================================================

export function addDaysToDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDaysBetween(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// =====================================================
// DATES SPÉCIFIQUES MONA x SPARK
// =====================================================

export function getSparkEventDuration(startDate: Date, endDate: Date): string {
  const days = getDaysBetween(startDate, endDate);
  if (days === 0) return '1 jour';
  if (days === 1) return '2 jours';
  return `${days + 1} jours`;
}

export function formatDeadline(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffDays = getDaysBetween(now, dateObj);
  
  if (diffDays < 0) return 'En retard';
  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Demain';
  if (diffDays <= 7) return `Dans ${diffDays} jour(s)`;
  
  return formatDate(dateObj);
}

// =====================================================
// CONSTANTES DE DATES
// =====================================================

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
  ISO: 'yyyy-MM-dd'
} as const;

export const RELATIVE_LABELS = {
  TODAY: 'Aujourd\'hui',
  YESTERDAY: 'Hier',
  TOMORROW: 'Demain',
  OVERDUE: 'En retard',
  UPCOMING: 'À venir'
} as const;
