import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'mona' | 'spark' | 'success' | 'warning' | 'error';
  subtitle?: string;
  loading?: boolean;
}

export default function KPICard({
  title,
  value,
  change,
  icon,
  trend = 'neutral',
  color = 'mona',
  subtitle,
  loading = false
}: KPICardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      }
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'mona':
        return 'from-indigo-500/10 to-emerald-500/10 border-indigo-500/20';
      case 'spark':
        return 'from-amber-500/10 to-pink-500/10 border-amber-500/20';
      case 'success':
        return 'from-green-500/10 to-emerald-500/10 border-green-500/20';
      case 'warning':
        return 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20';
      case 'error':
        return 'from-red-500/10 to-pink-500/10 border-red-500/20';
      default:
        return 'from-slate-500/10 to-slate-400/10 border-slate-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendClass = (trend: string) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'trending-neutral';
    }
  };

  if (loading) {
    return (
      <div className="kpi-card">
        <div className="flex items-start justify-between mb-4">
          <div className="skeleton w-20 h-4"></div>
          <div className="skeleton w-8 h-8 rounded-lg"></div>
        </div>
        <div className="skeleton w-24 h-8 mb-2"></div>
        <div className="skeleton w-16 h-3"></div>
      </div>
    );
  }

  return (
    <div className={`kpi-card bg-gradient-to-br ${getColorClasses(color)} hover:scale-105 transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
        <div className="text-2xl opacity-80">
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="mb-3">
        <p className="text-3xl font-bold text-white mb-1">
          {formatValue(value)}
        </p>
        
        {/* Change Indicator */}
        {change && (
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {getTrendIcon(trend)}
            </span>
            <span className={`text-sm font-semibold ${getTrendClass(trend)}`}>
              {change.value >= 0 ? '+' : ''}{change.value.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-400">
              vs {change.period}
            </span>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="progress-bar h-1">
          <div 
            className="progress-fill h-1"
            style={{ 
              width: `${Math.min((typeof value === 'number' ? value : 0) / 1000 * 100, 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}