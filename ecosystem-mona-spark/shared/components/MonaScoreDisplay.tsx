import React from 'react';

interface MonaScoreDisplayProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showPercentage?: boolean;
  className?: string;
  variant?: 'default' | 'circular' | 'linear';
}

export const MonaScoreDisplay: React.FC<MonaScoreDisplayProps> = ({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = true,
  showPercentage = true,
  className = '',
  variant = 'default',
}) => {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (score >= 60) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    if (score >= 40) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (variant === 'circular') {
    const radius = size === 'lg' ? 60 : size === 'md' ? 50 : 40;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="relative">
          <svg className="transform -rotate-90" width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
            {/* Background circle */}
            <circle
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ease-out ${getScoreColor(score)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`font-bold ${getScoreColor(score)} ${sizeClasses[size]}`}>
                {score}
              </div>
              {showPercentage && (
                <div className="text-xs text-gray-500">
                  {percentage.toFixed(0)}%
                </div>
              )}
            </div>
          </div>
        </div>
        {showLabel && (
          <div className="mt-2 text-sm font-medium text-gray-700">
            Score MONA
          </div>
        )}
      </div>
    );
  }

  if (variant === 'linear') {
    return (
      <div className={`space-y-2 ${className}`}>
        {showLabel && (
          <div className="flex items-center justify-between">
            <span className={`font-medium text-gray-700 ${sizeClasses[size]}`}>
              Score MONA
            </span>
            <span className={`font-bold ${getScoreColor(score)} ${sizeClasses[size]}`}>
              {score}/{maxScore}
              {showPercentage && ` (${percentage.toFixed(0)}%)`}
            </span>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(score)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex-shrink-0">
        <div className={`font-bold ${getScoreColor(score)} ${sizeClasses[size]}`}>
          {score}
        </div>
        {showPercentage && (
          <div className="text-xs text-gray-500">
            {percentage.toFixed(0)}%
          </div>
        )}
      </div>
      
      <div className="flex-1">
        {showLabel && (
          <div className={`font-medium text-gray-700 ${sizeClasses[size]}`}>
            Score MONA
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(score)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}; 