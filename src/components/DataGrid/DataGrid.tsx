import React, { useMemo, useState, useCallback, memo, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type ColumnDef,
  type Table,
  type Row,
} from '@tanstack/react-table';

import type { DataGridProps, DataGridColumn } from './types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { GlobalFilter } from './GlobalFilter';
import { TableContextMenu } from './TableContextMenu';
import './DataGrid.css';

const DataGridComponent = function DataGrid<T = unknown>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableRowSelection = false,
  enableColumnResizing = true,
  enableGlobalSearch = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  rowCount,
  enableMultiRowSelection = true,
  density = 'comfortable',
  theme = 'light',
  sorting: controlledSorting,
  onSortingChange,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange,
  pagination: controlledPagination,
  onPaginationChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  globalFilter: controlledGlobalFilter,
  onGlobalFilterChange,
  searchConfig = {
    enabled: true,
    placeholder: 'Search all columns...',
    position: 'top',
    showIcon: true,
    debounceMs: 300,
  },
  tableContextMenu,
  onTableRightClick,
  onRowClick,
  onRowDoubleClick,
  onCellClick,
  loading = false,
  loadingComponent: LoadingComponent,
  emptyComponent: EmptyComponent,
  errorComponent: _ErrorComponent,
  customCellRenderer,
  customHeaderRenderer,
  className = '',
  tableClassName = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  cellClassName = '',
  // Advanced features
  enableInlineEditing: _enableInlineEditing = false,
  enableExpandableRows: _enableExpandableRows = false,
  enableGrouping: _enableGrouping = false,
  enableAggregation: _enableAggregation = false,
  enableExport: _enableExport = false,
  // Server-side operations
  manualSorting = false,
  manualFiltering = false,
  manualPagination = false,
}: DataGridProps<T>) {
  // Internal state for uncontrolled mode
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([]);
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');

  // Table context menu state
  const [tableContextMenuState, setTableContextMenuState] = useState<{
    visible: boolean;
    position: { x: number; y: number };
  } | null>(null);

  // Ref for detecting table overflow
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const sorting = controlledSorting ?? internalSorting;
  const columnFilters = controlledColumnFilters ?? internalColumnFilters;
  const pagination = controlledPagination ?? internalPagination;
  const rowSelection = controlledRowSelection ?? internalRowSelection;
  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter;

  // Prepare columns with default settings
  const processedColumns = useMemo(() => {
    return columns.map((col: DataGridColumn<T>) => ({
      ...col,
      enableSorting: col.enableSorting ?? enableSorting,
      enableColumnFilter: col.enableFiltering ?? enableFiltering,
      enableResizing: col.enableResizing ?? enableColumnResizing,
      enableHiding: col.enableHiding ?? true,
      size: col.size ?? 150,
      minSize: col.minSize ?? 50,
      maxSize: col.maxSize ?? 500,
    }));
  }, [columns, enableSorting, enableFiltering, enableColumnResizing]);

  // Add row selection column if enabled
  const finalColumns = useMemo(() => {
    if (!enableRowSelection) return processedColumns;

    const selectionColumn: DataGridColumn<T> = {
      id: 'select',
      accessorKey: 'select',
      header: ({ table }: { table: Table<T> }) => (
        <input
          type='checkbox'
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className='datagrid-checkbox'
        />
      ),
      cell: ({ row }: { row: Row<T> }) => (
        <input
          type='checkbox'
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className='datagrid-checkbox'
        />
      ),
      size: 50,
      enableSorting: false,
      enableFiltering: false,
      enableResizing: false,
      enableHiding: false,
    } as DataGridColumn<T>;

    return [selectionColumn, ...processedColumns];
  }, [processedColumns, enableRowSelection]);

  // Create React Table instance
  const table = useReactTable({
    data,
    columns: finalColumns as ColumnDef<T>[], // Cast to ColumnDef to match TanStack Table requirements
    state: {
      sorting,
      columnFilters,
      pagination,
      rowSelection,
      globalFilter,
    },
    enableRowSelection,
    enableColumnResizing,
    onSortingChange: onSortingChange || setInternalSorting,
    onColumnFiltersChange: onColumnFiltersChange || setInternalColumnFilters,
    onPaginationChange: onPaginationChange || setInternalPagination,
    onRowSelectionChange: onRowSelectionChange || setInternalRowSelection,
    onGlobalFilterChange: onGlobalFilterChange || setInternalGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    manualSorting,
    manualFiltering,
    manualPagination,
    autoResetPageIndex: false,
    rowCount: manualPagination ? rowCount : undefined,
  });

  // CSS classes
  const containerClasses = `datagrid-container datagrid-density-${density} datagrid-theme-${theme} ${className}`;
  const tableClasses = `datagrid-table ${tableClassName}`;

  // Handle table right-click
  const handleTableRightClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      if (onTableRightClick) {
        onTableRightClick(event);
      }

      if (tableContextMenu?.items && tableContextMenu.items.length > 0) {
        setTableContextMenuState({
          visible: true,
          position: { x: event.clientX, y: event.clientY },
        });
      }
    },
    [onTableRightClick, tableContextMenu]
  );

  // Check for horizontal overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (tableContainerRef.current) {
        const container = tableContainerRef.current;
        const hasOverflow = container.scrollWidth > container.clientWidth;
        setHasHorizontalOverflow(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // Also check when table data changes
    const observer = new ResizeObserver(checkOverflow);
    if (tableContainerRef.current) {
      observer.observe(tableContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkOverflow);
      observer.disconnect();
    };
  }, [data, finalColumns]);

  const tableContent = (
    <div
      ref={tableContainerRef}
      className={`datagrid-table-container ${hasHorizontalOverflow ? 'overflow-content' : 'fits-content'}`}
      onContextMenu={handleTableRightClick}>
      <table
        className={tableClasses}
        data-resizing={table.getState().columnSizingInfo.isResizingColumn ? 'true' : 'false'}>
        <TableHeader table={table} className={headerClassName} customRenderer={customHeaderRenderer} />
        <TableBody
          table={table}
          className={bodyClassName}
          rowClassName={rowClassName}
          cellClassName={cellClassName}
          customCellRenderer={customCellRenderer}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          onCellClick={onCellClick}
        />
      </table>
    </div>
  );

  // Render search component
  const renderSearch = () => {
    if (!enableGlobalSearch || !searchConfig?.enabled || searchConfig?.position === 'none') {
      return null;
    }

    return (
      <div className={`datagrid-toolbar ${searchConfig?.className || ''}`}>
        <GlobalFilter
          value={globalFilter}
          onChange={setInternalGlobalFilter}
          placeholder={searchConfig?.placeholder || 'Search all columns...'}
          showIcon={searchConfig?.showIcon}
          debounceMs={searchConfig?.debounceMs}
        />
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      {searchConfig?.position === 'top' && renderSearch()}

      {tableContent}

      {searchConfig?.position === 'bottom' && renderSearch()}
      {enablePagination && <TablePagination table={table} pageSizeOptions={pageSizeOptions} />}

      {/* Table Context Menu */}
      {tableContextMenuState?.visible && tableContextMenu && (
        <TableContextMenu
          items={tableContextMenu.items}
          position={tableContextMenuState.position}
          onClose={() => setTableContextMenuState(null)}
          data={data}
          className={tableContextMenu.className}
        />
      )}
    </div>
  );
};

// Memoize the DataGrid component for performance
export const DataGrid = memo(DataGridComponent) as typeof DataGridComponent;
