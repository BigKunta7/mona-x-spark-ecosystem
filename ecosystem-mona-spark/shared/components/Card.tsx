import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
  hover = false,
}) => {
  const baseClasses = 'rounded-lg border border-gray-200 bg-white';
  
  const variantClasses = {
    default: 'shadow-sm',
    elevated: 'shadow-lg',
    outlined: 'shadow-none border-2',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-1' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${clickableClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}; 