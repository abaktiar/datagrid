import React from 'react'
import type { Table } from '@tanstack/react-table'

export interface TablePaginationProps<T = any> {
  table: Table<T>
  pageSizeOptions?: number[]
}

export function TablePagination<T = any>({
  table,
  pageSizeOptions = [5, 10, 20, 50, 100]
}: TablePaginationProps<T>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const pageCount = table.getPageCount()
  const totalRows = table.getFilteredRowModel().rows.length
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  const canPreviousPage = table.getCanPreviousPage()
  const canNextPage = table.getCanNextPage()

  return (
    <div className="datagrid-pagination">
      <div className="datagrid-pagination-info">
        <span className="datagrid-pagination-text">
          Showing {startRow} to {endRow} of {totalRows} entries
        </span>
      </div>

      <div className="datagrid-pagination-controls">
        <div className="datagrid-page-size">
          <label htmlFor="page-size-select" className="datagrid-page-size-label">
            Show:
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="datagrid-page-size-select"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="datagrid-page-navigation">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!canPreviousPage}
            className="datagrid-page-button"
            title="First page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m11 17-5-5 5-5"/>
              <path d="m18 17-5-5 5-5"/>
            </svg>
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage}
            className="datagrid-page-button"
            title="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          <div className="datagrid-page-info">
            <span className="datagrid-page-current">
              Page {pageIndex + 1} of {pageCount}
            </span>
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!canNextPage}
            className="datagrid-page-button"
            title="Next page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>

          <button
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!canNextPage}
            className="datagrid-page-button"
            title="Last page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 17 5-5-5-5"/>
              <path d="m13 17 5-5-5-5"/>
            </svg>
          </button>
        </div>

        <div className="datagrid-page-jump">
          <label htmlFor="page-jump-input" className="datagrid-page-jump-label">
            Go to:
          </label>
          <input
            id="page-jump-input"
            type="number"
            min={1}
            max={pageCount}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="datagrid-page-jump-input"
          />
        </div>
      </div>
    </div>
  )
}
