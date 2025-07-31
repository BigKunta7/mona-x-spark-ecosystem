// MONA x SPARK - Package Shared
// Composants, types et utilitaires partagés pour l'écosystème

// =====================================================
// TYPES PARTAGÉS
// =====================================================

export * from './types';

// =====================================================
// UTILITAIRES PARTAGÉS
// =====================================================

export * from './utils';

// =====================================================
// HOOKS REACT
// =====================================================

export * from './hooks';

// =====================================================
// COMPOSANTS REACT
// =====================================================

export * from './components';

// =====================================================
// STYLES
// =====================================================

export * from './styles';

// =====================================================
// VERSION ET MÉTADONNÉES
// =====================================================

export const SHARED_VERSION = '1.0.0';
export const SHARED_DESCRIPTION = 'Package partagé pour l\'écosystème MONA x SPARK';

// =====================================================
// EXPORTS SPÉCIFIQUES PAR CATÉGORIE
// =====================================================

// Types principaux
export type { User, Artist, MonaCampaign, SparkEvent } from './types';

// Utilitaires principaux
export { formatCurrency, formatDate, validateEmail } from './utils';

// Hooks principaux (à implémenter)
// export { useArtistData, useCampaignData } from './hooks';

// Composants principaux (à implémenter)
// export { ArtistCard, CampaignCard } from './components'; 