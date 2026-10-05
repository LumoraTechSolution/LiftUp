'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  title?: string;
  description?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  actions?: (row: T) => React.ReactNode;
  pageSize?: number;
}

export function DataTable<T extends { id: string }>({
  title,
  description,
  columns,
  data,
  searchPlaceholder = 'Search...',
  onSearch,
  actions,
  pageSize = 10,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data
  const filteredData = data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key];
      return String(value).toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  // Sort data
  let sortedData = [...filteredData];
  if (sortKey) {
    sortedData.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    onSearch?.(query);
  };

  return (
    <Card className="bg-card border-border">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-foreground">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-input border-border text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 hover:bg-muted/50">
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      className={cn(
                        'text-left font-medium text-foreground px-4 py-3',
                        col.className
                      )}
                    >
                      <button
                        onClick={() => col.sortable && handleSort(col.key)}
                        className={cn(
                          'flex items-center gap-2',
                          col.sortable && 'cursor-pointer hover:text-primary'
                        )}
                      >
                        {col.label}
                        {col.sortable && sortKey === col.key && (
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform',
                              sortOrder === 'desc' && 'rotate-180'
                            )}
                          />
                        )}
                      </button>
                    </th>
                  ))}
                  {actions && <th className="text-right font-medium text-foreground px-4 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border hover:bg-muted/20 transition-colors"
                    >
                      {columns.map((col) => (
                        <td
                          key={String(col.key)}
                          className={cn('px-4 py-3 text-foreground', col.className)}
                        >
                          {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                        </td>
                      ))}
                      {actions && (
                        <td className="text-right px-4 py-3">{actions(row)}</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-border"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className={
                        currentPage === i + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'border-border'
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-border"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
