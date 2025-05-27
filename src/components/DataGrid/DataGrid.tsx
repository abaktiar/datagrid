import React, { useMemo, useState, useCallback, memo } from 'react';
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
      header: ({ table }: { table: any }) => (
        <input
          type='checkbox'
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className='datagrid-checkbox'
        />
      ),
      cell: ({ row }: { row: any }) => (
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

  const table = useReactTable({
    data,
    columns: finalColumns as any,
    state: {
      sorting,
      columnFilters,
      pagination,
      rowSelection,
      globalFilter,
    },
    onSortingChange: onSortingChange ?? setInternalSorting,
    onColumnFiltersChange: onColumnFiltersChange ?? setInternalColumnFilters,
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    onGlobalFilterChange: onGlobalFilterChange ?? setInternalGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting && !manualSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering && !manualFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination && !manualPagination ? getPaginationRowModel() : undefined,

    // Manual operations for server-side
    manualSorting,
    manualFiltering,
    manualPagination,

    // Row count for server-side pagination
    ...(manualPagination && rowCount !== undefined && { rowCount }),

    enableRowSelection,
    enableMultiRowSelection,
    enableSorting,
    enableFilters: enableFiltering,
    enableGlobalFilter: enableFiltering,
    enableColumnResizing,

    // Enable smooth real-time column resizing
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
  });

  const containerClasses = ['datagrid-container', `datagrid-density-${density}`, `datagrid-theme-${theme}`, className]
    .filter(Boolean)
    .join(' ');

  const tableClasses = ['datagrid-table', tableClassName].filter(Boolean).join(' ');

  if (loading && LoadingComponent) {
    return <LoadingComponent />;
  }

  if (data.length === 0 && EmptyComponent) {
    return <EmptyComponent />;
  }

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

  const tableContent = (
    <div className='datagrid-table-container' onContextMenu={handleTableRightClick}>
      <table
        className={tableClasses}
        data-resizing={table.getState().columnSizingInfo.isResizingColumn ? 'true' : 'false'}
      >
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
