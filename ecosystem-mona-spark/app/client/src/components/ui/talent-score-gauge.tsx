import React, { useEffect, useState } from 'react';

interface TalentScoreGaugeProps {
  score: number;
  maxScore?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export default function TalentScoreGauge({ 
  score, 
  maxScore = 120, 
  label = "Score MONA",
  size = 'md',
  showDetails = true 
}: TalentScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const percentage = (animatedScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreCategory = (score: number): { label: string; color: string } => {
    if (score >= 95) return { label: 'SPARK-READY', color: 'rgb(16, 185, 129)' };
    if (score >= 80) return { label: 'PREMIUM', color: 'rgb(99, 102, 241)' };
    if (score >= 60) return { label: 'CO-PROD', color: 'rgb(59, 130, 246)' };
    if (score >= 40) return { label: 'STARTER', color: 'rgb(245, 158, 11)' };
    return { label: 'PROSPECT', color: 'rgb(239, 68, 68)' };
  };

  const category = getScoreCategory(score);
  
  const sizes = {
    sm: { width: 80, height: 80, radius: 35, strokeWidth: 6, fontSize: 'text-lg' },
    md: { width: 120, height: 120, radius: 45, strokeWidth: 8, fontSize: 'text-2xl' },
    lg: { width: 160, height: 160, radius: 65, strokeWidth: 10, fontSize: 'text-3xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className="talent-gauge flex flex-col items-center">
      {/* SVG Gauge */}
      <div className="relative" style={{ width: currentSize.width, height: currentSize.height }}>
        <svg
          width={currentSize.width}
          height={currentSize.height}
          className="transform -rotate-90"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="talent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={category.color} />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background Circle */}
          <circle
            cx={currentSize.width / 2}
            cy={currentSize.height / 2}
            r={currentSize.radius}
            className="talent-gauge-bg"
            strokeWidth={currentSize.strokeWidth}
          />
          
          {/* Progress Circle */}
          <circle
            cx={currentSize.width / 2}
            cy={currentSize.height / 2}
            r={currentSize.radius}
            className="talent-gauge-fill"
            strokeWidth={currentSize.strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            filter="url(#glow)"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
              stroke: 'url(#talent-gradient)'
            }}
          />
        </svg>
        
        {/* Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold text-white ${currentSize.fontSize}`}>
            {Math.round(animatedScore)}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            /{maxScore}
          </span>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="mt-4 text-center">
          <h4 className="font-semibold text-white mb-1">{label}</h4>
          <div className="flex items-center justify-center space-x-2">
            <span 
              className="badge text-xs"
              style={{ 
                backgroundColor: `${category.color}20`,
                color: category.color,
                border: `1px solid ${category.color}40`
              }}
            >
              {category.label}
            </span>
            <span className="text-xs text-slate-400">
              {percentage.toFixed(1)}%
            </span>
          </div>
          
          {/* Progress Indicators */}
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Prochain niveau</span>
              <span className="text-white font-medium">
                {score >= 95 ? 'Maximum atteint' : 
                 score >= 80 ? `${95 - score} pts pour SPARK-READY` :
                 score >= 60 ? `${80 - score} pts pour PREMIUM` :
                 score >= 40 ? `${60 - score} pts pour CO-PROD` :
                 `${40 - score} pts pour STARTER`}
              </span>
            </div>
            {score < 95 && (
              <div className="progress-bar h-1">
                <div 
                  className="progress-fill h-1"
                  style={{ 
                    width: `${((score % 20) / 20) * 100}%`,
                    background: category.color
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}