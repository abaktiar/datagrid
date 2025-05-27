import * as XLSX from 'xlsx'
import type { TableContextMenuItem } from './types'

export interface ExcelExportOptions<T = any> {
  filename?: string
  sheetName?: string
  includeHeaders?: boolean

  // Column customization
  columnMapping?: Record<string, string> // Map internal keys to display names
  excludeColumns?: string[]
  includeColumns?: string[] // Only include these columns (overrides excludeColumns)
  columnOrder?: string[] // Custom column order

  // Data transformation
  dataTransformer?: (data: T[]) => any[] // Transform entire dataset
  rowTransformer?: (row: T, index: number) => any // Transform individual rows
  cellTransformers?: Record<string, (value: any, row: T, key: string) => any> // Transform specific cells

  // Filtering
  dataFilter?: (row: T, index: number) => boolean // Filter which rows to include

  // Formatting
  formatters?: Record<string, (value: any, row?: T) => any>

  // Advanced customization
  beforeExport?: (data: T[]) => T[] | Promise<T[]> // Pre-process data before export
  afterTransform?: (transformedData: any[]) => any[] // Post-process transformed data

  // Excel-specific options
  autoWidth?: boolean // Auto-size columns
  freezeHeader?: boolean // Freeze header row
  addSummaryRow?: boolean | ((data: T[]) => Record<string, any>) // Add summary/totals row

  // Styling (basic support)
  styling?: {
    headerStyle?: XLSX.CellStyle
    dataStyle?: XLSX.CellStyle
  }
}

/**
 * Export data to Excel with advanced formatting options
 */
export const createExportExcelAction = <T = any>(
  options: ExcelExportOptions<T> = {},
  label: string = 'Export to Excel',
  icon: string = '📗'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: async (data) => {
    if (data.length === 0) {
      console.warn('No data to export')
      return
    }

    try {
      const {
        filename = `export_${new Date().toISOString().split('T')[0]}.xlsx`,
        sheetName = 'Sheet1',
        includeHeaders = true,
        columnMapping = {},
        excludeColumns = [],
        includeColumns,
        columnOrder,
        dataTransformer,
        rowTransformer,
        cellTransformers = {},
        dataFilter,
        formatters = {},
        beforeExport,
        afterTransform,
        autoWidth = true,
        freezeHeader = false,
        addSummaryRow = false,
      } = options

      // Step 1: Pre-process data if needed
      let processedData = beforeExport ? await beforeExport(data) : data

      // Step 2: Filter data if needed
      if (dataFilter) {
        processedData = processedData.filter(dataFilter)
      }

      // Step 3: Transform entire dataset if needed
      if (dataTransformer) {
        processedData = dataTransformer(processedData)
      }

      // Step 4: Transform individual rows if needed
      if (rowTransformer) {
        processedData = processedData.map(rowTransformer)
      }

      // Step 5: Determine columns to include
      let allKeys = Array.from(
        new Set(processedData.flatMap(row => Object.keys(row as any)))
      )

      if (includeColumns) {
        allKeys = includeColumns.filter(key => allKeys.includes(key))
      } else if (excludeColumns.length > 0) {
        allKeys = allKeys.filter(key => !excludeColumns.includes(key))
      }

      // Step 6: Apply custom column order if specified
      if (columnOrder) {
        const orderedKeys = columnOrder.filter(key => allKeys.includes(key))
        const remainingKeys = allKeys.filter(key => !columnOrder.includes(key))
        allKeys = [...orderedKeys, ...remainingKeys]
      }

      // Step 7: Prepare headers
      const headers = allKeys.map(key => columnMapping[key] || key)

      // Step 8: Prepare data rows with cell transformations
      const rows = processedData.map(row =>
        allKeys.map(key => {
          let value = (row as any)[key]

          // Apply cell transformer if exists
          if (cellTransformers[key]) {
            value = cellTransformers[key](value, row as T, key)
          }

          // Apply formatter if exists
          if (formatters[key]) {
            value = formatters[key](value, row as T)
          }

          return value
        })
      )

      // Step 9: Add summary row if requested
      let finalRows = rows
      if (addSummaryRow) {
        if (typeof addSummaryRow === 'function') {
          const summaryData = addSummaryRow(processedData)
          const summaryRow = allKeys.map(key => summaryData[key] || '')
          finalRows = [...rows, summaryRow]
        } else {
          // Auto-generate summary for numeric columns
          const summaryRow = allKeys.map(key => {
            const values = processedData.map(row => (row as any)[key]).filter(v => typeof v === 'number')
            return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) : ''
          })
          finalRows = [...rows, summaryRow]
        }
      }

      // Step 10: Post-process transformed data if needed
      if (afterTransform) {
        finalRows = afterTransform(finalRows)
      }

      // Step 11: Combine headers and data
      const worksheetData = includeHeaders ? [headers, ...finalRows] : finalRows

      // Step 12: Create workbook and worksheet
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

      // Step 13: Auto-size columns if enabled
      if (autoWidth) {
        const columnWidths = allKeys.map((key, index) => {
          const headerLength = headers[index]?.length || 0
          const maxDataLength = Math.max(
            ...finalRows.map(row => String(row[index] || '').length)
          )
          return { wch: Math.max(headerLength, maxDataLength, 10) }
        })
        worksheet['!cols'] = columnWidths
      }

      // Step 14: Freeze header if enabled
      if (freezeHeader && includeHeaders) {
        worksheet['!freeze'] = { xSplit: 0, ySplit: 1 }
      }

      // Step 15: Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

      // Step 16: Write file
      XLSX.writeFile(workbook, filename)

      console.log(`Excel file exported: ${filename}`)
    } catch (error) {
      console.error('Failed to export Excel file:', error)
      alert('Failed to export Excel file. Please try again.')
    }
  }
})

/**
 * Export data to Excel with multiple sheets
 */
export const createExportMultiSheetExcelAction = <T = any>(
  sheetsConfig: Array<{
    data: T[]
    sheetName: string
    options?: Omit<ExcelExportOptions, 'filename' | 'sheetName'>
  }>,
  filename?: string,
  label: string = 'Export to Excel (Multi-Sheet)',
  icon: string = '📊'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: () => {
    if (sheetsConfig.length === 0) {
      console.warn('No sheets configured for export')
      return
    }

    const workbook = XLSX.utils.book_new()
    const finalFilename = filename || `multi_sheet_export_${new Date().toISOString().split('T')[0]}.xlsx`

    sheetsConfig.forEach(({ data, sheetName, options = {} }) => {
      if (data.length === 0) return

      const {
        includeHeaders = true,
        columnMapping = {},
        excludeColumns = [],
        formatters = {},
      } = options

      // Get all unique keys from data
      const allKeys = Array.from(
        new Set(data.flatMap(row => Object.keys(row as any)))
      ).filter(key => !excludeColumns.includes(key))

      // Prepare headers
      const headers = allKeys.map(key => columnMapping[key] || key)

      // Prepare data rows
      const rows = data.map(row =>
        allKeys.map(key => {
          const value = (row as any)[key]
          return formatters[key] ? formatters[key](value) : value
        })
      )

      // Combine headers and data
      const worksheetData = includeHeaders ? [headers, ...rows] : rows

      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

      // Auto-size columns
      const columnWidths = allKeys.map((key, index) => {
        const headerLength = headers[index]?.length || 0
        const maxDataLength = Math.max(
          ...rows.map(row => String(row[index] || '').length)
        )
        return { wch: Math.max(headerLength, maxDataLength, 10) }
      })
      worksheet['!cols'] = columnWidths

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    })

    // Write file
    XLSX.writeFile(workbook, finalFilename)

    console.log(`Multi-sheet Excel file exported: ${finalFilename}`)
  }
})

/**
 * Export filtered/selected data to Excel
 */
export const createExportSelectedExcelAction = <T = any>(
  getSelectedData: () => T[],
  options: ExcelExportOptions = {},
  label: string = 'Export Selected to Excel',
  icon: string = '📗'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: () => {
    const selectedData = getSelectedData()
    if (selectedData.length === 0) {
      console.warn('No selected data to export')
      return
    }

    // Use the regular export function with selected data
    const exportAction = createExportExcelAction(options, label, icon)
    exportAction.onClick(selectedData)
  },
  disabled: () => {
    const selectedData = getSelectedData()
    return selectedData.length === 0
  }
})

/**
 * Create a comprehensive Excel export bundle
 */
export const createExcelExportBundle = <T = any>(
  getSelectedData?: () => T[],
  customOptions?: ExcelExportOptions
): TableContextMenuItem<T>[] => {
  const actions: TableContextMenuItem<T>[] = [
    createExportExcelAction(customOptions),
  ]

  if (getSelectedData) {
    actions.push(
      createExportSelectedExcelAction(getSelectedData, customOptions)
    )
  }

  return actions
}

/**
 * Utility to format common data types for Excel
 */
export const excelFormatters = {
  currency: (value: number) => Number(value) || 0,
  percentage: (value: number) => (Number(value) || 0) / 100,
  date: (value: string | Date) => {
    const date = new Date(value)
    return isNaN(date.getTime()) ? value : date
  },
  boolean: (value: boolean) => value ? 'Yes' : 'No',
  number: (value: any) => Number(value) || 0,
  text: (value: any) => String(value || ''),
}

/**
 * Helper functions for common Excel export scenarios
 */

// Quick export with minimal configuration
export const createQuickExcelExport = <T = any>(
  filename?: string,
  label: string = 'Export to Excel',
  icon: string = '📗'
) => createExportExcelAction<T>({ filename }, label, icon)

// Export with data filtering
export const createFilteredExcelExport = <T = any>(
  filter: (row: T, index: number) => boolean,
  filename?: string,
  label: string = 'Export Filtered Data',
  icon: string = '📗'
) => createExportExcelAction<T>({ dataFilter: filter, filename }, label, icon)

// Export with custom data transformation
export const createTransformedExcelExport = <T = any>(
  transformer: (data: T[]) => any[],
  filename?: string,
  label: string = 'Export Transformed Data',
  icon: string = '📗'
) => createExportExcelAction<T>({ dataTransformer: transformer, filename }, label, icon)

// Export with summary row
export const createSummaryExcelExport = <T = any>(
  summaryGenerator?: (data: T[]) => Record<string, any>,
  filename?: string,
  label: string = 'Export with Summary',
  icon: string = '📊'
) => createExportExcelAction<T>({
  addSummaryRow: summaryGenerator || true,
  filename
}, label, icon)

// Export specific columns only
export const createColumnSpecificExcelExport = <T = any>(
  columns: string[],
  columnMapping?: Record<string, string>,
  filename?: string,
  label: string = 'Export Selected Columns',
  icon: string = '📗'
) => createExportExcelAction<T>({
  includeColumns: columns,
  columnMapping,
  filename
}, label, icon)

/**
 * Advanced Excel export configurations for common business scenarios
 */
export const excelExportPresets = {
  // Financial report with totals
  financial: <T = any>(options?: Partial<ExcelExportOptions<T>>) => createExportExcelAction<T>({
    addSummaryRow: true,
    freezeHeader: true,
    formatters: {
      amount: excelFormatters.currency,
      total: excelFormatters.currency,
      price: excelFormatters.currency,
      cost: excelFormatters.currency,
    },
    ...options
  }),

  // Employee report
  employee: <T = any>(options?: Partial<ExcelExportOptions<T>>) => createExportExcelAction<T>({
    columnMapping: {
      id: 'Employee ID',
      name: 'Full Name',
      email: 'Email Address',
      department: 'Department',
      salary: 'Annual Salary',
      startDate: 'Start Date',
      status: 'Employment Status',
    },
    formatters: {
      salary: excelFormatters.currency,
      startDate: excelFormatters.date,
    },
    freezeHeader: true,
    ...options
  }),

  // Sales report
  sales: <T = any>(options?: Partial<ExcelExportOptions<T>>) => createExportExcelAction<T>({
    columnMapping: {
      id: 'Sale ID',
      customerId: 'Customer ID',
      productId: 'Product ID',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      total: 'Total Amount',
      saleDate: 'Sale Date',
      status: 'Status',
    },
    formatters: {
      unitPrice: excelFormatters.currency,
      total: excelFormatters.currency,
      saleDate: excelFormatters.date,
    },
    addSummaryRow: (data: any[]) => ({
      quantity: data.reduce((sum, row) => sum + (row.quantity || 0), 0),
      total: data.reduce((sum, row) => sum + (row.total || 0), 0),
    }),
    freezeHeader: true,
    ...options
  }),

  // Inventory report
  inventory: <T = any>(options?: Partial<ExcelExportOptions<T>>) => createExportExcelAction<T>({
    columnMapping: {
      id: 'Product ID',
      name: 'Product Name',
      sku: 'SKU',
      category: 'Category',
      quantity: 'Stock Quantity',
      price: 'Unit Price',
      value: 'Total Value',
      lastUpdated: 'Last Updated',
    },
    formatters: {
      price: excelFormatters.currency,
      value: excelFormatters.currency,
      lastUpdated: excelFormatters.date,
    },
    cellTransformers: {
      value: (value, row: any) => (row.quantity || 0) * (row.price || 0),
    },
    addSummaryRow: (data: any[]) => ({
      quantity: data.reduce((sum, row) => sum + (row.quantity || 0), 0),
      value: data.reduce((sum, row) => sum + ((row.quantity || 0) * (row.price || 0)), 0),
    }),
    freezeHeader: true,
    ...options
  }),
}

/**
 * Predefined column mappings for common use cases
 */
export const commonColumnMappings = {
  user: {
    id: 'ID',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    createdAt: 'Created Date',
    updatedAt: 'Updated Date',
  },
  product: {
    id: 'Product ID',
    name: 'Product Name',
    price: 'Price',
    category: 'Category',
    inStock: 'In Stock',
    createdAt: 'Created Date',
  },
  order: {
    id: 'Order ID',
    customerId: 'Customer ID',
    total: 'Total Amount',
    status: 'Order Status',
    orderDate: 'Order Date',
    shippingDate: 'Shipping Date',
  }
}
