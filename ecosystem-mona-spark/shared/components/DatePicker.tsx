import React from 'react';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  min?: string;
  max?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Sélectionner une date...',
  disabled = false,
  className = '',
  error = false,
  min,
  max,
}) => {
  return (
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      min={min}
      max={max}
      className={`
        block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
        ${className}
      `}
      placeholder={placeholder}
    />
  );
}; 