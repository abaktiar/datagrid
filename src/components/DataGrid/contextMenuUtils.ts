import type { ContextMenuItem, TableContextMenuItem } from './types'

// ============================================================================
// CELL CONTEXT MENU UTILITIES
// ============================================================================

/**
 * Copy cell value to clipboard
 */
export const createCopyValueAction = <T = any>(
  label: string = 'Copy Value',
  icon: string = '📋'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: async (value) => {
    try {
      await navigator.clipboard.writeText(String(value))
      console.log('Value copied to clipboard:', value)
    } catch (err) {
      console.error('Failed to copy value:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = String(value)
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }
})

/**
 * Copy entire row as JSON
 */
export const createCopyRowAction = <T = any>(
  label: string = 'Copy Row',
  icon: string = '📄'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: async (value, row) => {
    try {
      const jsonString = JSON.stringify(row, null, 2)
      await navigator.clipboard.writeText(jsonString)
      console.log('Row copied to clipboard:', row)
    } catch (err) {
      console.error('Failed to copy row:', err)
    }
  }
})

/**
 * Copy formatted value (for display purposes)
 */
export const createCopyFormattedAction = <T = any>(
  formatter: (value: any, row: T) => string,
  label: string = 'Copy Formatted',
  icon: string = '📋'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: async (value, row) => {
    try {
      const formattedValue = formatter(value, row)
      await navigator.clipboard.writeText(formattedValue)
      console.log('Formatted value copied:', formattedValue)
    } catch (err) {
      console.error('Failed to copy formatted value:', err)
    }
  }
})

/**
 * Open email client (for email columns)
 */
export const createEmailAction = <T = any>(
  label: string = 'Send Email',
  icon: string = '📧'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: (value) => {
    window.open(`mailto:${value}`)
  }
})

/**
 * Open phone dialer (for phone columns)
 */
export const createPhoneAction = <T = any>(
  label: string = 'Call',
  icon: string = '📞'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: (value) => {
    window.open(`tel:${value}`)
  }
})

/**
 * Open URL (for URL columns)
 */
export const createOpenUrlAction = <T = any>(
  label: string = 'Open Link',
  icon: string = '🔗'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: (value) => {
    window.open(value, '_blank')
  }
})

/**
 * Search Google for the value
 */
export const createGoogleSearchAction = <T = any>(
  label: string = 'Search Google',
  icon: string = '🔍'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: (value) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(String(value))}`
    window.open(searchUrl, '_blank')
  }
})

// ============================================================================
// TABLE CONTEXT MENU UTILITIES
// ============================================================================

/**
 * Export data to CSV
 */
export const createExportCsvAction = <T = any>(
  filename?: string,
  label: string = 'Export to CSV',
  icon: string = '📊'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: (data) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = (row as any)[header]
          // Escape commas and quotes in CSV
          const stringValue = String(value || '')
          return stringValue.includes(',') || stringValue.includes('"')
            ? `"${stringValue.replace(/"/g, '""')}"`
            : stringValue
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename || `export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
})

/**
 * Export data to JSON
 */
export const createExportJsonAction = <T = any>(
  filename?: string,
  label: string = 'Export to JSON',
  icon: string = '📄'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: (data) => {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename || `export_${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
})

/**
 * Print table
 */
export const createPrintAction = <T = any>(
  label: string = 'Print Table',
  icon: string = '🖨️'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: () => {
    window.print()
  }
})

/**
 * Copy all data as JSON
 */
export const createCopyAllDataAction = <T = any>(
  label: string = 'Copy All Data',
  icon: string = '📋'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: async (data) => {
    try {
      const jsonString = JSON.stringify(data, null, 2)
      await navigator.clipboard.writeText(jsonString)
      console.log('All data copied to clipboard')
    } catch (err) {
      console.error('Failed to copy data:', err)
    }
  }
})

/**
 * Refresh/reload data
 */
export const createRefreshAction = <T = any>(
  onRefresh: () => void,
  label: string = 'Refresh Data',
  icon: string = '🔄'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: () => {
    onRefresh()
  }
})

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a separator for context menus
 */
export const createSeparator = (): ContextMenuItem<any> => ({
  label: '',
  separator: true,
  onClick: () => {}
})

/**
 * Create a separator for table context menus
 */
export const createTableSeparator = (): TableContextMenuItem<any> => ({
  label: '',
  separator: true,
  onClick: () => {}
})

/**
 * Bundle of common cell context menu actions
 */
export const createCommonCellActions = <T = any>(): ContextMenuItem<T>[] => [
  createCopyValueAction(),
  createCopyRowAction(),
  createSeparator(),
  createGoogleSearchAction(),
]

/**
 * Select all rows action
 */
export const createSelectAllAction = <T = any>(
  onSelectAll: () => void,
  label: string = 'Select All',
  icon: string = '☑️'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: () => {
    onSelectAll()
  }
})

/**
 * Clear selection action
 */
export const createClearSelectionAction = <T = any>(
  onClearSelection: () => void,
  label: string = 'Clear Selection',
  icon: string = '❌'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: () => {
    onClearSelection()
  }
})

/**
 * Filter data action
 */
export const createFilterAction = <T = any>(
  onFilter: (data: T[]) => void,
  filterFn: (data: T[]) => T[],
  label: string = 'Apply Filter',
  icon: string = '🔍'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: (data) => {
    const filteredData = filterFn(data)
    onFilter(filteredData)
  }
})

/**
 * Sort data action
 */
export const createSortAction = <T = any>(
  onSort: (data: T[]) => void,
  sortFn: (data: T[]) => T[],
  label: string = 'Sort Data',
  icon: string = '🔄'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: (data) => {
    const sortedData = sortFn(data)
    onSort(sortedData)
  }
})

/**
 * Show statistics action
 */
export const createShowStatsAction = <T = any>(
  label: string = 'Show Statistics',
  icon: string = '📊'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: (data) => {
    const stats = {
      totalRows: data.length,
      columns: data.length > 0 ? Object.keys(data[0]).length : 0,
      firstRow: data[0] || null,
      lastRow: data[data.length - 1] || null,
    }

    const message = `
Table Statistics:
• Total Rows: ${stats.totalRows}
• Total Columns: ${stats.columns}
• First Row: ${JSON.stringify(stats.firstRow, null, 2)}
• Last Row: ${JSON.stringify(stats.lastRow, null, 2)}
    `.trim()

    alert(message)
  }
})

/**
 * Create essential table actions (more useful than the previous common actions)
 */
export const createEssentialTableActions = <T = any>(
  options: {
    enableExports?: boolean
    enablePrint?: boolean
    onRefresh?: () => void
    customActions?: TableContextMenuItem<T>[]
  } = {}
): TableContextMenuItem<T>[] => {
  const {
    enableExports = true,
    enablePrint = false,
    onRefresh,
    customActions = []
  } = options

  const actions: TableContextMenuItem<T>[] = []

  // Export actions (most useful)
  if (enableExports) {
    actions.push(
      createExportCsvAction(),
      createExportJsonAction()
    )
  }

  // Print action (less commonly used)
  if (enablePrint) {
    if (actions.length > 0) actions.push(createTableSeparator())
    actions.push(createPrintAction())
  }

  // Custom actions
  if (customActions.length > 0) {
    if (actions.length > 0) actions.push(createTableSeparator())
    actions.push(...customActions)
  }

  // Refresh action
  if (onRefresh) {
    if (actions.length > 0) actions.push(createTableSeparator())
    actions.push(createRefreshAction(onRefresh))
  }

  return actions
}

/**
 * @deprecated Use createEssentialTableActions instead.
 * The original createCommonTableActions included too many actions that are rarely useful.
 */
export const createCommonTableActions = createEssentialTableActions
