import React from 'react';

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  helpText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  error,
  required = false,
  className = '',
  helpText,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
}; 