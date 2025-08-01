import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

interface ArtistCardProps {
  artist: {
    id: string;
    name: string;
    avatar?: string;
    genre?: string;
    location?: string;
    followers?: number;
    monaScore?: number;
    status?: 'active' | 'inactive' | 'featured';
  };
  onClick?: () => void;
  className?: string;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  onClick,
  className = '',
}) => {
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'featured':
        return <Badge variant="success" size="sm">En vedette</Badge>;
      case 'active':
        return <Badge variant="info" size="sm">Actif</Badge>;
      case 'inactive':
        return <Badge variant="warning" size="sm">Inactif</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg ${className}`}
      onClick={onClick}
      hover={!!onClick}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-lg">
            {artist.avatar ? (
              <img 
                src={artist.avatar} 
                alt={artist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              artist.name.charAt(0).toUpperCase()
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {artist.name}
            </h3>
            {getStatusBadge(artist.status)}
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            {artist.genre && (
              <p className="truncate">
                <span className="font-medium">Genre:</span> {artist.genre}
              </p>
            )}
            {artist.location && (
              <p className="truncate">
                <span className="font-medium">Localisation:</span> {artist.location}
              </p>
            )}
            {artist.followers && (
              <p className="truncate">
                <span className="font-medium">Abonnés:</span> {artist.followers.toLocaleString()}
              </p>
            )}
          </div>

          {artist.monaScore && (
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Score MONA</span>
                <span className="text-lg font-bold text-purple-600">
                  {artist.monaScore}/100
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${artist.monaScore}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}; 