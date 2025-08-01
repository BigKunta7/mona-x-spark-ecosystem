import React from 'react';

interface SocialMetric {
  platform: string;
  followers: number;
  engagement: number;
  growth: number;
  icon?: string;
}

interface SocialMetricsDisplayProps {
  metrics: SocialMetric[];
  className?: string;
  variant?: 'grid' | 'list' | 'cards';
  showGrowth?: boolean;
  showEngagement?: boolean;
}

export const SocialMetricsDisplay: React.FC<SocialMetricsDisplayProps> = ({
  metrics,
  className = '',
  variant = 'grid',
  showGrowth = true,
  showEngagement = true,
}) => {
  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      instagram: '📸',
      tiktok: '🎵',
      youtube: '📺',
      twitter: '🐦',
      facebook: '📘',
      linkedin: '💼',
      twitch: '🎮',
      spotify: '🎧',
      soundcloud: '🎵',
      default: '📱',
    };
    return icons[platform.toLowerCase()] || icons.default;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return '↗️';
    if (growth < 0) return '↘️';
    return '→';
  };

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getPlatformIcon(metric.platform)}</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {metric.platform}
                </span>
              </div>
              {showGrowth && (
                <div className={`flex items-center space-x-1 text-sm ${getGrowthColor(metric.growth)}`}>
                  <span>{getGrowthIcon(metric.growth)}</span>
                  <span>{Math.abs(metric.growth)}%</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Abonnés</span>
                <span className="font-bold text-gray-900">
                  {metric.followers.toLocaleString()}
                </span>
              </div>
              
              {showEngagement && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="font-medium text-gray-900">
                    {metric.engagement.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-xl">{getPlatformIcon(metric.platform)}</span>
              <div>
                <div className="font-medium text-gray-900 capitalize">
                  {metric.platform}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.followers.toLocaleString()} abonnés
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-right">
              {showEngagement && (
                <div>
                  <div className="text-sm text-gray-600">Engagement</div>
                  <div className="font-medium text-gray-900">
                    {metric.engagement.toFixed(1)}%
                  </div>
                </div>
              )}
              
              {showGrowth && (
                <div>
                  <div className="text-sm text-gray-600">Croissance</div>
                  <div className={`font-medium ${getGrowthColor(metric.growth)}`}>
                    {getGrowthIcon(metric.growth)} {Math.abs(metric.growth)}%
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {metrics.map((metric, index) => (
        <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-2xl mb-2">
            {getPlatformIcon(metric.platform)}
          </div>
          
          <div className="font-semibold text-gray-900 capitalize mb-1">
            {metric.platform}
          </div>
          
          <div className="text-lg font-bold text-gray-900 mb-1">
            {metric.followers.toLocaleString()}
          </div>
          
          <div className="text-sm text-gray-600 mb-2">
            abonnés
          </div>
          
          {showEngagement && (
            <div className="text-sm text-gray-600 mb-1">
              Engagement: {metric.engagement.toFixed(1)}%
            </div>
          )}
          
          {showGrowth && (
            <div className={`text-sm ${getGrowthColor(metric.growth)}`}>
              {getGrowthIcon(metric.growth)} {Math.abs(metric.growth)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 