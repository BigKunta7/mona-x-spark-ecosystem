import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

interface SparkEventCardProps {
  event: {
    id: string;
    title: string;
    description?: string;
    date: string;
    time?: string;
    location?: string;
    type: 'concert' | 'meetup' | 'workshop' | 'streaming' | 'exhibition';
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    attendees?: number;
    maxAttendees?: number;
    featured?: boolean;
    image?: string;
  };
  onClick?: () => void;
  className?: string;
}

export const SparkEventCard: React.FC<SparkEventCardProps> = ({
  event,
  onClick,
  className = '',
}) => {
  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'concert':
        return <Badge variant="success" size="sm">Concert</Badge>;
      case 'meetup':
        return <Badge variant="info" size="sm">Meetup</Badge>;
      case 'workshop':
        return <Badge variant="warning" size="sm">Atelier</Badge>;
      case 'streaming':
        return <Badge variant="error" size="sm">Streaming</Badge>;
      case 'exhibition':
        return <Badge variant="default" size="sm">Exposition</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="info" size="sm">À venir</Badge>;
      case 'ongoing':
        return <Badge variant="success" size="sm">En cours</Badge>;
      case 'completed':
        return <Badge variant="default" size="sm">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="error" size="sm">Annulé</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg ${className}`}
      onClick={onClick}
      hover={!!onClick}
    >
      <div className="space-y-4">
        {/* Image */}
        {event.image && (
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {event.featured && (
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
              {event.title}
            </h3>
            <div className="flex flex-col items-end space-y-1">
              {getEventTypeBadge(event.type)}
              {getStatusBadge(event.status)}
            </div>
          </div>
          
          {event.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>

        {/* Date and Time */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.date)}</span>
          </div>
          {event.time && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{event.time}</span>
            </div>
          )}
        </div>

        {/* Location */}
        {event.location && (
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        )}

        {/* Attendees */}
        {event.attendees !== undefined && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Participants</span>
            <span className="font-medium text-gray-900">
              {event.attendees.toLocaleString()}
              {event.maxAttendees && ` / ${event.maxAttendees.toLocaleString()}`}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}; 