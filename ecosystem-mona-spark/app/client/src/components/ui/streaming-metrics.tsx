import React from 'react';

interface StreamingMetric {
  platform: string;
  streams: number;
  growth: number;
  share: number;
  icon: string;
  color: string;
}

interface StreamingMetricsProps {
  metrics: StreamingMetric[];
  totalStreams: number;
  period: string;
}

export default function StreamingMetrics({ metrics, totalStreams, period }: StreamingMetricsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatGrowth = (growth: number): string => {
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}%`;
  };

  return (
    <div className="streaming-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Streaming Analytics
          </h3>
          <p className="text-sm text-slate-400">
            {period} • {formatNumber(totalStreams)} streams totaux
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🎵</span>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              {formatNumber(totalStreams)}
            </p>
            <p className="text-xs text-slate-400">Total Streams</p>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.platform} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
            {/* Platform Info */}
            <div className="flex items-center space-x-3">
              <div 
                className="platform-icon"
                style={{ backgroundColor: metric.color }}
              >
                {metric.icon}
              </div>
              <div>
                <p className="font-medium text-white">{metric.platform}</p>
                <p className="text-sm text-slate-400">
                  {formatNumber(metric.streams)} streams
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center space-x-6">
              {/* Share */}
              <div className="text-center">
                <p className="text-sm font-semibold text-white">
                  {metric.share.toFixed(1)}%
                </p>
                <p className="text-xs text-slate-400">Part</p>
              </div>

              {/* Growth */}
              <div className="text-center">
                <p className={`text-sm font-semibold ${
                  metric.growth >= 0 ? 'trending-up' : 'trending-down'
                }`}>
                  {formatGrowth(metric.growth)}
                </p>
                <p className="text-xs text-slate-400">Croissance</p>
              </div>

              {/* Progress Bar */}
              <div className="w-20">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${metric.share}%`,
                      background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {metrics.length}
            </p>
            <p className="text-xs text-slate-400">Plateformes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold trending-up">
              +{(metrics.reduce((acc, m) => acc + m.growth, 0) / metrics.length).toFixed(1)}%
            </p>
            <p className="text-xs text-slate-400">Croissance Moy.</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {Math.max(...metrics.map(m => m.share)).toFixed(0)}%
            </p>
            <p className="text-xs text-slate-400">Top Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}