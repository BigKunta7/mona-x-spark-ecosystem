import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    description?: string;
    status: 'draft' | 'active' | 'paused' | 'completed';
    budget?: number;
    spent?: number;
    startDate?: string;
    endDate?: string;
    targetAudience?: string;
    performance?: {
      impressions: number;
      clicks: number;
      conversions: number;
    };
  };
  onClick?: () => void;
  className?: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onClick,
  className = '',
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>;
      case 'paused':
        return <Badge variant="warning" size="sm">En pause</Badge>;
      case 'completed':
        return <Badge variant="info" size="sm">Terminée</Badge>;
      case 'draft':
        return <Badge variant="default" size="sm">Brouillon</Badge>;
      default:
        return null;
    }
  };

  const getProgressPercentage = () => {
    if (!campaign.budget || !campaign.spent) return 0;
    return Math.min((campaign.spent / campaign.budget) * 100, 100);
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg ${className}`}
      onClick={onClick}
      hover={!!onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {campaign.title}
            </h3>
            {campaign.description && (
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {campaign.description}
              </p>
            )}
          </div>
          {getStatusBadge(campaign.status)}
        </div>

        {/* Budget Progress */}
        {campaign.budget && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Budget utilisé</span>
              <span className="font-medium text-gray-900">
                {campaign.spent?.toLocaleString() || 0}€ / {campaign.budget.toLocaleString()}€
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {campaign.performance && (
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-200">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {campaign.performance.impressions.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Impressions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {campaign.performance.clicks.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Clics</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {campaign.performance.conversions.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Conversions</div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {campaign.startDate && (
              <span>Début: {new Date(campaign.startDate).toLocaleDateString()}</span>
            )}
            {campaign.targetAudience && (
              <span>Cible: {campaign.targetAudience}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}; 