import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

interface MarketplaceBlockCardProps {
  block: {
    id: string;
    title: string;
    description?: string;
    type: 'service' | 'product' | 'experience' | 'collaboration';
    price?: number;
    currency?: string;
    category: string;
    artist: {
      name: string;
      avatar?: string;
    };
    rating?: number;
    reviews?: number;
    status: 'available' | 'booked' | 'completed' | 'cancelled';
    featured?: boolean;
    image?: string;
    tags?: string[];
  };
  onClick?: () => void;
  className?: string;
}

export const MarketplaceBlockCard: React.FC<MarketplaceBlockCardProps> = ({
  block,
  onClick,
  className = '',
}) => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'service':
        return <Badge variant="info" size="sm">Service</Badge>;
      case 'product':
        return <Badge variant="success" size="sm">Produit</Badge>;
      case 'experience':
        return <Badge variant="warning" size="sm">Expérience</Badge>;
      case 'collaboration':
        return <Badge variant="error" size="sm">Collaboration</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="success" size="sm">Disponible</Badge>;
      case 'booked':
        return <Badge variant="warning" size="sm">Réservé</Badge>;
      case 'completed':
        return <Badge variant="info" size="sm">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="error" size="sm">Annulé</Badge>;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg ${className}`}
      onClick={onClick}
      hover={!!onClick}
    >
      <div className="space-y-4">
        {/* Image */}
        {block.image && (
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img 
              src={block.image} 
              alt={block.title}
              className="w-full h-full object-cover"
            />
            {block.featured && (
              <div className="absolute top-2 right-2">
                <Badge variant="success" size="sm">En vedette</Badge>
              </div>
            )}
          </div>
        )}

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {block.title}
            </h3>
            <div className="flex flex-col items-end space-y-1">
              {getTypeBadge(block.type)}
              {getStatusBadge(block.status)}
            </div>
          </div>
          
          {block.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {block.description}
            </p>
          )}
        </div>

        {/* Artist Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-semibold">
            {block.artist.avatar ? (
              <img 
                src={block.artist.avatar} 
                alt={block.artist.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              block.artist.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {block.artist.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {block.category}
            </p>
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          {block.price && (
            <div className="text-lg font-bold text-gray-900">
              {block.price.toLocaleString()} {block.currency || '€'}
            </div>
          )}
          
          {block.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex">
                {renderStars(block.rating)}
              </div>
              {block.reviews && (
                <span className="text-xs text-gray-500">
                  ({block.reviews})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        {block.tags && block.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {block.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
            {block.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{block.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}; 