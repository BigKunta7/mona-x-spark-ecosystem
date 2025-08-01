import React from 'react';

interface PlatformData {
  name: string;
  icon: string;
  color: string;
  metrics: {
    streams: number;
    followers: number;
    engagement: number;
    growth: number;
  };
  rank?: number;
}

interface PlatformComparisonProps {
  platforms: PlatformData[];
  selectedMetric: 'streams' | 'followers' | 'engagement' | 'growth';
  onMetricChange: (metric: 'streams' | 'followers' | 'engagement' | 'growth') => void;
}

export default function PlatformComparison({ 
  platforms, 
  selectedMetric, 
  onMetricChange 
}: PlatformComparisonProps) {
  const formatMetric = (value: number, metric: string): string => {
    switch (metric) {
      case 'streams':
      case 'followers':
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value.toString();
      case 'engagement':
      case 'growth':
        return `${value.toFixed(1)}%`;
      default:
        return value.toString();
    }
  };

  const getMetricLabel = (metric: string): string => {
    switch (metric) {
      case 'streams': return 'Streams';
      case 'followers': return 'Followers';
      case 'engagement': return 'Engagement';
      case 'growth': return 'Croissance';
      default: return metric;
    }
  };

  const maxValue = Math.max(...platforms.map(p => p.metrics[selectedMetric]));

  return (
    <div className="chart-container">
      {/* Header with Metric Selector */}
      <div className="chart-header">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Comparaison Plateformes
          </h3>
          <p className="text-sm text-slate-400">
            Performance cross-platform
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {(['streams', 'followers', 'engagement', 'growth'] as const).map(metric => (
            <button
              key={metric}
              onClick={() => onMetricChange(metric)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                selectedMetric === metric
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {getMetricLabel(metric)}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Bars */}
      <div className="space-y-4">
        {platforms
          .sort((a, b) => b.metrics[selectedMetric] - a.metrics[selectedMetric])
          .map((platform, index) => {
            const percentage = (platform.metrics[selectedMetric] / maxValue) * 100;
            
            return (
              <div key={platform.name} className="flex items-center space-x-4">
                {/* Rank */}
                <div className="w-6 text-center">
                  <span className="text-sm font-bold text-slate-400">
                    #{index + 1}
                  </span>
                </div>

                {/* Platform Info */}
                <div className="flex items-center space-x-3 w-32">
                  <div 
                    className="platform-icon"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.icon}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {platform.name}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 relative">
                  <div className="progress-bar h-6 bg-white/5">
                    <div 
                      className="progress-fill h-6 flex items-center justify-end pr-3"
                      style={{ 
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, ${platform.color}40, ${platform.color})`
                      }}
                    >
                      <span className="text-xs font-semibold text-white">
                        {formatMetric(platform.metrics[selectedMetric], selectedMetric)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="w-16 text-right">
                  <span className={`text-xs font-semibold ${
                    platform.metrics.growth >= 0 ? 'trending-up' : 'trending-down'
                  }`}>
                    {platform.metrics.growth >= 0 ? '+' : ''}{platform.metrics.growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-white">
              {platforms.length}
            </p>
            <p className="text-xs text-slate-400">Plateformes</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {formatMetric(platforms.reduce((acc, p) => acc + p.metrics[selectedMetric], 0), selectedMetric)}
            </p>
            <p className="text-xs text-slate-400">Total</p>
          </div>
          <div>
            <p className="text-lg font-bold trending-up">
              +{(platforms.reduce((acc, p) => acc + p.metrics.growth, 0) / platforms.length).toFixed(1)}%
            </p>
            <p className="text-xs text-slate-400">Croissance Moy.</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {Math.max(...platforms.map(p => p.metrics[selectedMetric])) === platforms[0]?.metrics[selectedMetric] ? platforms[0]?.name : 'N/A'}
            </p>
            <p className="text-xs text-slate-400">Leader</p>
          </div>
        </div>
      </div>
    </div>
  );
}