import React from 'react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  error?: string;
  className?: string;
}

export default function ChartContainer({
  title,
  subtitle,
  children,
  actions,
  loading = false,
  error,
  className = ''
}: ChartContainerProps) {
  if (loading) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-header">
          <div className="skeleton w-32 h-6"></div>
          {subtitle && <div className="skeleton w-48 h-4 mt-2"></div>}
        </div>
        <div className="skeleton w-full h-64 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-header">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <span className="text-4xl mb-4 block">⚠️</span>
            <p className="text-slate-400 mb-2">Erreur de chargement</p>
            <p className="text-sm text-slate-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`chart-container ${className}`}>
      {/* Header */}
      <div className="chart-header">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>

      {/* Chart Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}