import type { ColumnDef, SortingState, ColumnFiltersState, PaginationState, RowSelectionState, OnChangeFn } from '@tanstack/react-table'

export interface DataGridColumn<T = any> extends ColumnDef<T> {
  accessorKey?: string;
  size?: number;
  minSize?: number;
  maxSize?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableResizing?: boolean;
  enableHiding?: boolean;
  filterType?: 'text' | 'number' | 'select' | 'date' | 'custom';
  filterOptions?: string[];

  // Column header configuration
  headerConfig?: {
    className?: string;
    style?: React.CSSProperties;
    tooltip?: string;
    icon?: React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    align?: 'left' | 'center' | 'right';
    sticky?: boolean;
  };

  // Column filter configuration
  filterConfig?: {
    enabled?: boolean;
    placeholder?: string;
    type?: 'text' | 'number' | 'select' | 'date';
    options?: string[];
    className?: string;
    debounceMs?: number;
  };

  // Column cell configuration
  cellConfig?: {
    className?: string | ((value: any, row: T) => string);
    style?: React.CSSProperties | ((value: any, row: T) => React.CSSProperties);
    align?: 'left' | 'center' | 'right';
    wrap?: boolean;
    truncate?: boolean;
    tooltip?: boolean | ((value: any, row: T) => string);
    editable?: boolean;
    format?: (value: any, row: T) => React.ReactNode;
    onClick?: (value: any, row: T) => void;
    onDoubleClick?: (value: any, row: T) => void;
    onRightClick?: (value: any, row: T, event: React.MouseEvent) => void;
    contextMenu?: {
      items: ContextMenuItem<T>[];
      className?: string;
    };
  };
}

export interface ContextMenuItem<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (value: any, row: T) => void;
  disabled?: boolean | ((value: any, row: T) => boolean);
  separator?: boolean;
  className?: string;
}

export interface TableContextMenuItem<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (data: T[]) => void;
  disabled?: boolean | ((data: T[]) => boolean);
  separator?: boolean;
  className?: string;
}

export interface DataGridProps<T = any> {
  data: T[];
  columns: DataGridColumn<T>[];

  // Feature toggles
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnResizing?: boolean;
  enableGlobalSearch?: boolean;

  // Pagination options
  pageSize?: number;
  pageSizeOptions?: number[];
  rowCount?: number; // For server-side pagination

  // Selection options
  enableMultiRowSelection?: boolean;

  // Styling options
  density?: 'compact' | 'comfortable' | 'spacious';
  theme?: 'light' | 'dark' | 'auto';

  // State management (controlled mode)
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  // Global filter
  globalFilter?: string;
  onGlobalFilterChange?: (filter: string) => void;

  // Search configuration
  searchConfig?: {
    enabled?: boolean;
    placeholder?: string;
    position?: 'top' | 'bottom' | 'none';
    showIcon?: boolean;
    debounceMs?: number;
    className?: string;
  };

  // Table-level context menu
  tableContextMenu?: {
    items: TableContextMenuItem<T>[];
    className?: string;
  };
  onTableRightClick?: (event: React.MouseEvent) => void;

  // Event callbacks
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  onCellClick?: (cell: any, row: T) => void;

  // Loading and empty states
  loading?: boolean;
  loadingComponent?: React.ComponentType;
  emptyComponent?: React.ComponentType;
  errorComponent?: React.ComponentType<{ error: Error }>;

  // Custom renderers
  customCellRenderer?: (cell: any, row: T, column: DataGridColumn<T>) => React.ReactNode;
  customHeaderRenderer?: (column: DataGridColumn<T>) => React.ReactNode;

  // CSS classes
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: T) => string);
  cellClassName?: string | ((cell: any, row: T, column: DataGridColumn<T>) => string);

  // Advanced features
  enableInlineEditing?: boolean;
  enableExpandableRows?: boolean;
  enableGrouping?: boolean;
  enableAggregation?: boolean;
  enableExport?: boolean;

  // Server-side operations
  manualSorting?: boolean;
  manualFiltering?: boolean;
  manualPagination?: boolean;
}

export interface DataGridState {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  pagination: PaginationState
  rowSelection: RowSelectionState
  globalFilter: string
  columnVisibility: Record<string, boolean>
  columnOrder: string[]
  columnSizing: Record<string, number>
}
