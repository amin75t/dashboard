import { FC, SVGProps } from "react";

export type TableColumn<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, idx: number) => React.ReactNode;
  className?: string;
};

export type TableFilter = {
  key: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
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
  filters: TableFilter[];
  search?: TableSearch;
  rowClassName?: (row: T, idx: number) => string;
  onRowClick?: (row: T, idx: number) => void;
  emptyText?: React.ReactNode;
}
export type RowType = {
  id: string;
  name: string;
  lab: string;
  hs: string;
  pay: string;
  date: string;
  status: string;
};