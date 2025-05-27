import React, { useState } from 'react';
import { flexRender, type Table } from '@tanstack/react-table';
import type { DataGridColumn } from './types';
import { ContextMenu } from './ContextMenu';

export interface TableBodyProps<T = any> {
  table: Table<T>;
  className?: string;
  rowClassName?: string | ((row: T) => string);
  cellClassName?: string | ((cell: any, row: T, column: DataGridColumn<T>) => string);
  customCellRenderer?: (cell: any, row: T, column: DataGridColumn<T>) => React.ReactNode;
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  onCellClick?: (cell: any, row: T) => void;
}

export function TableBody<T = any>({
  table,
  className = '',
  rowClassName = '',
  cellClassName = '',
  customCellRenderer,
  onRowClick,
  onRowDoubleClick,
  onCellClick,
}: TableBodyProps<T>) {
  const rows = table.getRowModel().rows;
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    position: { x: number; y: number };
    cellValue: any;
    rowData: T;
    column: DataGridColumn<T>;
  } | null>(null);

  const getRowClassName = (row: T) => {
    if (typeof rowClassName === 'function') {
      return `datagrid-body-row ${rowClassName(row)}`;
    }
    return `datagrid-body-row ${rowClassName}`;
  };

  const getCellClassName = (cell: any, row: T, column: DataGridColumn<T>) => {
    if (typeof cellClassName === 'function') {
      return `datagrid-body-cell ${cellClassName(cell, row, column)}`;
    }
    return `datagrid-body-cell ${cellClassName}`;
  };

  return (
    <>
      <tbody className={`datagrid-body ${className}`}>
        {rows.map((row) => (
          <tr
            key={row.id}
            className={getRowClassName(row.original)}
            onClick={() => onRowClick?.(row.original)}
            onDoubleClick={() => onRowDoubleClick?.(row.original)}>
            {row.getVisibleCells().map((cell) => {
              const column = cell.column.columnDef as DataGridColumn<T>;
              const cellConfig = column.cellConfig;
              const cellValue = cell.getValue();

              // Build cell className
              let cellClassNames = getCellClassName(cellValue, row.original, column);
              if (cellConfig?.className) {
                if (typeof cellConfig.className === 'function') {
                  cellClassNames += ` ${cellConfig.className(cellValue, row.original)}`;
                } else {
                  cellClassNames += ` ${cellConfig.className}`;
                }
              }

              // Build cell style
              let cellStyle: React.CSSProperties = {
                width: cell.column.getSize(),
                minWidth: cell.column.columnDef.minSize,
                maxWidth: cell.column.columnDef.maxSize,
                textAlign: cellConfig?.align || 'left',
              };

              if (cellConfig?.style) {
                if (typeof cellConfig.style === 'function') {
                  cellStyle = { ...cellStyle, ...cellConfig.style(cellValue, row.original) };
                } else {
                  cellStyle = { ...cellStyle, ...cellConfig.style };
                }
              }

              // Handle cell content
              let cellContent = customCellRenderer
                ? customCellRenderer(cellValue, row.original, column)
                : cellConfig?.format
                ? cellConfig.format(cellValue, row.original)
                : flexRender(cell.column.columnDef.cell, cell.getContext());

              // Handle tooltip
              let cellTitle: string | undefined;
              if (cellConfig?.tooltip) {
                if (typeof cellConfig.tooltip === 'function') {
                  cellTitle = cellConfig.tooltip(cellValue, row.original);
                } else if (cellConfig.tooltip === true) {
                  cellTitle = String(cellValue);
                }
              }

              return (
                <td
                  key={cell.id}
                  className={cellClassNames}
                  style={cellStyle}
                  title={cellTitle}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (cellConfig?.onClick) {
                      cellConfig.onClick(cellValue, row.original);
                    } else {
                      onCellClick?.(cellValue, row.original);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    if (cellConfig?.onDoubleClick) {
                      cellConfig.onDoubleClick(cellValue, row.original);
                    }
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (cellConfig?.onRightClick) {
                      cellConfig.onRightClick(cellValue, row.original, e);
                    }

                    if (cellConfig?.contextMenu?.items && cellConfig.contextMenu.items.length > 0) {
                      setContextMenu({
                        visible: true,
                        position: { x: e.clientX, y: e.clientY },
                        cellValue,
                        rowData: row.original,
                        column,
                      });
                    }
                  }}>
                  <div
                    className={`datagrid-cell-content ${cellConfig?.wrap ? 'wrap' : ''} ${
                      cellConfig?.truncate ? 'truncate' : ''
                    }`}>
                    {cellContent}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}

        {rows.length === 0 && (
          <tr className='datagrid-empty-row'>
            <td colSpan={table.getAllColumns().length} className='datagrid-empty-cell'>
              <div className='datagrid-empty-content'>No data available</div>
            </td>
          </tr>
        )}
      </tbody>

      {/* Context Menu */}
      {contextMenu?.visible && contextMenu.column.cellConfig?.contextMenu && (
        <ContextMenu
          items={contextMenu.column.cellConfig.contextMenu.items}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
          cellValue={contextMenu.cellValue}
          rowData={contextMenu.rowData}
          className={contextMenu.column.cellConfig.contextMenu.className}
        />
      )}
    </>
  );
}
