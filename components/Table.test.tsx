import { render, screen, fireEvent } from '@testing-library/react';
import { Table, TableColumn, TableFilter, TableSearch } from './Table';
import '@testing-library/jest-dom';

type Row = { id: number; name: string };

const columns: TableColumn<Row>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
];

const data: Row[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('Table component', () => {
  it('renders headers and rows', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('handles search input', () => {
    const search: TableSearch = { value: '', onChange: vi.fn() };
    render(<Table columns={columns} data={data} search={search} />);
    const input = screen.getByPlaceholderText('جستجو...');
    fireEvent.change(input, { target: { value: 'Al' } });
    expect(search.onChange).toHaveBeenCalledWith('Al');
  });

  it('handles filter dropdown', () => {
    const filter: TableFilter = {
      key: 'name',
      label: 'Name',
      value: '',
      onChange: vi.fn(),
      options: [
        { value: 'Alice', label: 'Alice' },
        { value: 'Bob', label: 'Bob' },
      ],
    };
    render(<Table columns={columns} data={data} filters={[filter]} />);
    fireEvent.click(screen.getByText('Name'));
    fireEvent.click(screen.getByText('Alice'));
    expect(filter.onChange).toHaveBeenCalledWith('Alice');
  });

  it('calls onRowClick when row clicked', () => {
    const onRowClick = vi.fn();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    fireEvent.click(screen.getByText('Alice'));
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });
});
