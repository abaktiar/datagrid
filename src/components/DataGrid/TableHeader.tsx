import React, { useCallback, useRef, useEffect, useState } from 'react'
import { flexRender, type Table, type Header } from '@tanstack/react-table'
import type { DataGridColumn } from './types'

export interface TableHeaderProps<T = unknown> {
  table: Table<T>
  className?: string
  customRenderer?: (column: DataGridColumn<T>) => React.ReactNode
}

interface ResizeState<T = unknown> {
  isResizing: boolean
  startX: number
  startWidth: number
  header: Header<T, unknown> | null
  currentWidth: number
}

export function TableHeader<T = unknown>({
  table,
  className = '',
  customRenderer
}: TableHeaderProps<T>) {
  const [resizeState, setResizeState] = useState<ResizeState<T>>({
    isResizing: false,
    startX: 0,
    startWidth: 0,
    header: null,
    currentWidth: 0
  })

  const tableRef = useRef<HTMLTableSectionElement>(null)
  const resizeTimeoutRef = useRef<number | undefined>(undefined)

  // Optimized resize handler that batches updates
  const handleResize = useCallback((header: Header<T, unknown>, newWidth: number) => {
    // Clear any pending updates
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    // Update the visual width immediately for smooth feedback
    const headerElement = tableRef.current?.querySelector(`[data-column-id="${header.id}"]`) as HTMLElement
    if (headerElement) {
      headerElement.style.width = `${newWidth}px`
    }

    // Batch the actual table state update to avoid excessive re-renders
    resizeTimeoutRef.current = window.setTimeout(() => {
      table.setColumnSizing(prev => ({
        ...prev,
        [header.column.id]: newWidth
      }))
    }, 16) // ~60fps batching
  }, [table])

  // Mouse move handler with immediate visual feedback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!resizeState.isResizing || !resizeState.header) return

    e.preventDefault()
    e.stopPropagation()
    
    const deltaX = e.clientX - resizeState.startX
    const newWidth = Math.max(
      resizeState.header.column.columnDef.minSize ?? 50,
      Math.min(
        resizeState.header.column.columnDef.maxSize ?? 1000,
        resizeState.startWidth + deltaX
      )
    )

    // Update current width for immediate visual feedback
    setResizeState(prev => ({ ...prev, currentWidth: newWidth }))
    
    // Apply resize with batching
    handleResize(resizeState.header, newWidth)
  }, [resizeState.isResizing, resizeState.header, resizeState.startX, resizeState.startWidth, handleResize])

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    if (resizeState.isResizing) {
      // Final update to ensure consistency
      if (resizeState.header && resizeState.currentWidth > 0) {
        table.setColumnSizing(prev => ({
          ...prev,
          [resizeState.header!.column.id]: resizeState.currentWidth
        }))
      }

      setResizeState(prev => ({
        ...prev,
        isResizing: false,
        header: null,
        currentWidth: 0
      }))
      
      // Re-enable text selection and reset cursor
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      
      // Clean up any pending timeouts
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
        resizeTimeoutRef.current = undefined
      }

      // Remove the data-resizing attribute for smooth transitions
      if (tableRef.current) {
        const table = tableRef.current.closest('.datagrid-table') as HTMLTableElement
        if (table) {
          table.removeAttribute('data-resizing')
        }
      }
    }
  }, [resizeState.isResizing, resizeState.header, resizeState.currentWidth, table])

  // Touch handlers for mobile support
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!resizeState.isResizing || !resizeState.header) return

    e.preventDefault()
    const touch = e.touches[0]
    if (touch) {
      const deltaX = touch.clientX - resizeState.startX
      const newWidth = Math.max(
        resizeState.header.column.columnDef.minSize ?? 50,
        Math.min(
          resizeState.header.column.columnDef.maxSize ?? 1000,
          resizeState.startWidth + deltaX
        )
      )

      setResizeState(prev => ({ ...prev, currentWidth: newWidth }))
      handleResize(resizeState.header, newWidth)
    }
  }, [resizeState.isResizing, resizeState.header, resizeState.startX, resizeState.startWidth, handleResize])

  const handleTouchEnd = useCallback(() => {
    handleMouseUp()
  }, [handleMouseUp])

  // Add/remove event listeners
  useEffect(() => {
    if (resizeState.isResizing) {
      // Use passive: false to ensure preventDefault works
      document.addEventListener('mousemove', handleMouseMove, { passive: false })
      document.addEventListener('mouseup', handleMouseUp, { passive: false })
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd, { passive: false })
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [resizeState.isResizing, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  // Start resize handler
  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent, header: Header<T, unknown>) => {
    e.preventDefault()
    e.stopPropagation()

    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
    if (typeof clientX !== 'number') return
    
    const currentWidth = header.getSize()
    
    setResizeState({
      isResizing: true,
      startX: clientX,
      startWidth: currentWidth,
      header,
      currentWidth
    })

    // Disable text selection during resize
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
    
    // Set data attribute for styling coordination
    if (tableRef.current) {
      const table = tableRef.current.closest('.datagrid-table') as HTMLTableElement
      if (table) {
        table.setAttribute('data-resizing', 'true')
      }
    }
  }, [])

  return (
    <thead ref={tableRef} className={`datagrid-header ${className}`}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className='datagrid-header-row'>
          {headerGroup.headers.map((header) => {
            const column = header.column.columnDef as DataGridColumn<T>
            const canSort = header.column.getCanSort()
            const sortDirection = header.column.getIsSorted()
            const isColumnResizing = resizeState.isResizing && resizeState.header?.id === header.id
            const isAnyColumnResizing = resizeState.isResizing

            const headerConfig = column.headerConfig
            const headerClassName = `datagrid-header-cell ${canSort ? 'sortable' : ''} ${
              sortDirection ? `sorted-${sortDirection}` : ''
            } ${isColumnResizing ? 'resizing' : ''} ${isAnyColumnResizing ? 'table-resizing' : ''} ${headerConfig?.className || ''}`
            
            // Use current width during resize for immediate feedback
            const displayWidth = isColumnResizing && resizeState.currentWidth > 0 
              ? resizeState.currentWidth 
              : header.getSize()
            
            const headerStyle = {
              width: displayWidth,
              minWidth: header.column.columnDef.minSize,
              maxWidth: header.column.columnDef.maxSize,
              textAlign: headerConfig?.align || 'left',
              ...headerConfig?.style,
            }

            return (
              <th
                key={header.id}
                data-column-id={header.id}
                className={headerClassName}
                style={headerStyle}
                onClick={canSort && !isAnyColumnResizing ? header.column.getToggleSortingHandler() : undefined}
                title={headerConfig?.tooltip}
                data-resizing={isColumnResizing ? 'true' : 'false'}>
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

                {/* Enhanced Column resizer */}
                {header.column.getCanResize() && (
                  <div
                    className={`datagrid-column-resizer ${isColumnResizing ? 'active' : ''}`}
                    onMouseDown={(e) => handleResizeStart(e, header)}
                    onTouchStart={(e) => handleResizeStart(e, header)}
                    aria-label={`Resize ${header.id} column`}
                    role="separator"
                    tabIndex={-1}
                  >
                    <div className="datagrid-column-resizer-handle" />
                  </div>
                )}
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}
