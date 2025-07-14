import React, { useMemo, useState } from 'react';

export type TableColumn<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, idx: number) => React.ReactNode;
  className?: string;
};

export type TableFilter = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
};

export type TableSearch = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  filters?: TableFilter[];
  search?: TableSearch;
  rowClassName?: (row: T, idx: number) => string;
  onRowClick?: (row: T, idx: number) => void;
  emptyText?: React.ReactNode;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  filters,
  search,
  rowClassName,
  onRowClick,
  emptyText = 'داده‌ای وجود ندارد',
}: TableProps<T>) {
  // Filter and search logic (delegated to parent via props)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-x-auto p-4">
      {/* Filters and Search */}
      {(filters?.length || search) && (
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {filters?.map((filter) => (
              <div key={filter.key} className="relative">
                <button
                  className="border rounded-lg px-3 py-1 bg-white flex items-center gap-2 min-w-[120px]"
                  onClick={() => setDropdownOpen(dropdownOpen === filter.key ? null : filter.key)}
                  type="button"
                >
                  <span>{filter.label}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen === filter.key && (
                  <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg min-w-[120px]">
                    {filter.options.map((opt) => (
                      <div
                        key={opt.value}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter.value === opt.value ? 'font-bold text-primary-600' : ''}`}
                        onClick={() => {
                          filter.onChange(opt.value);
                          setDropdownOpen(null);
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {search && (
            <div className="relative">
              <input
                className="border rounded-lg px-3 py-1 w-56 focus:outline-none focus:ring"
                type="text"
                value={search.value}
                onChange={e => search.onChange(e.target.value)}
                placeholder={search.placeholder || 'جستجو...'}
              />
              <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
          )}
        </div>
      )}
      {/* Table */}
      <table className="w-full text-right border-separate border-spacing-y-2">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className={`py-2 px-3 font-bold text-gray-700 ${col.className || ''}`}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-400">{emptyText}</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={rowClassName ? rowClassName(row, idx) : ''}
                onClick={onRowClick ? () => onRowClick(row, idx) : undefined}
                style={{ cursor: onRowClick ? 'pointer' : undefined }}
              >
                {columns.map((col) => (
                  <td key={col.key as string} className={`py-2 px-3 ${col.className || ''}`}>
                    {col.render ? col.render(row, idx) : row[col.key as keyof T]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 