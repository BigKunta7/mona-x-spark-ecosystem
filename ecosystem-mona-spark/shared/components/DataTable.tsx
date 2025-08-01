import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from './Table';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  className = '',
  emptyMessage = 'Aucune donnée disponible',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.key} align={column.align}>
              {column.header}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align}>
                {column.render ? column.render(item) : (item as any)[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 