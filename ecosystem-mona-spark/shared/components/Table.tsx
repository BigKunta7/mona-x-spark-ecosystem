import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
  striped?: boolean;
  hover?: boolean;
}

export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  striped = false,
  hover = false,
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  );
};

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, className = '' }) => (
  <thead className={`bg-gray-50 ${className}`}>
    {children}
  </thead>
);

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
  striped?: boolean;
  hover?: boolean;
}

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className = '',
  striped = false,
  hover = false,
}) => (
  <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
    {children}
  </tbody>
);

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  onClick,
}) => (
  <tr
    className={`${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </tr>
);

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  align = 'left',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${alignClasses[align]} ${className}`}>
      {children}
    </td>
  );
};

interface TableHeaderCellProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  className = '',
  align = 'left',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${alignClasses[align]} ${className}`}>
      {children}
    </th>
  );
}; 