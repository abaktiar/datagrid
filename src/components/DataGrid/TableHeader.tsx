import React from 'react'
import { flexRender, type Table } from '@tanstack/react-table'
import type { DataGridColumn } from './types'

export interface TableHeaderProps<T = any> {
  table: Table<T>
  className?: string
  customRenderer?: (column: DataGridColumn<T>) => React.ReactNode
}

export function TableHeader<T = any>({
  table,
  className = '',
  customRenderer
}: TableHeaderProps<T>) {
  return (
    <thead className={`datagrid-header ${className}`}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id} className="datagrid-header-row">
          {headerGroup.headers.map(header => {
            const column = header.column.columnDef as DataGridColumn<T>
            const canSort = header.column.getCanSort()
            const sortDirection = header.column.getIsSorted()

            const headerConfig = column.headerConfig;
            const headerClassName = `datagrid-header-cell ${canSort ? 'sortable' : ''} ${
              sortDirection ? `sorted-${sortDirection}` : ''
            } ${headerConfig?.className || ''}`;
            const headerStyle = {
              width: header.getSize(),
              minWidth: header.column.columnDef.minSize,
              maxWidth: header.column.columnDef.maxSize,
              textAlign: headerConfig?.align || 'left',
              ...headerConfig?.style,
            };

            return (
              <th
                key={header.id}
                className={headerClassName}
                style={headerStyle}
                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                title={headerConfig?.tooltip}>
                <div className='datagrid-header-content'>
                  {(customRenderer && customRenderer(column)) || (
                    <>
                      {header.isPlaceholder ? null : (
                        <span className='datagrid-header-text'>
                          {headerConfig?.icon && (
                            <span className='datagrid-header-icon' style={{ marginRight: '6px' }}>
                              {headerConfig.icon}
                            </span>
                          )}
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                      {canSort && (
                        <span className='datagrid-sort-indicator'>
                          {sortDirection === 'asc' && (
                            <svg
                              className='sort-asc'
                              width='12'
                              height='12'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'>
                              <path d='m7 14 5-5 5 5' />
                            </svg>
                          )}
                          {sortDirection === 'desc' && (
                            <svg
                              className='sort-desc'
                              width='12'
                              height='12'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'>
                              <path d='m17 10-5 5-5-5' />
                            </svg>
                          )}
                          {!sortDirection && (
                            <svg
                              className='sort-none'
                              width='12'
                              height='12'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'>
                              <path d='m7 14 5-5 5 5' />
                              <path d='m7 10 5 5 5-5' />
                            </svg>
                          )}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Column filter */}
                {header.column.getCanFilter() && column.filterConfig?.enabled === true && (
                  <div className={`datagrid-column-filter ${column.filterConfig?.className || ''}`}>
                    <input
                      type={column.filterConfig?.type || 'text'}
                      value={(header.column.getFilterValue() ?? '') as string}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                      placeholder={column.filterConfig?.placeholder || `Filter ${header.id}...`}
                      className='datagrid-filter-input'
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                {/* Column resizer */}
                {header.column.getCanResize() && (
                  <div
                    className='datagrid-column-resizer'
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                  />
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  )
}
