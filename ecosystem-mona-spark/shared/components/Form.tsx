import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  method?: 'GET' | 'POST';
  action?: string;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className = '',
  method = 'POST',
  action,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      method={method}
      action={action}
      className={`space-y-6 ${className}`}
    >
      {children}
    </form>
  );
}; 