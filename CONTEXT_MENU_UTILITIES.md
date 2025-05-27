# DataGrid Context Menu Utilities

This document provides comprehensive documentation for the context menu utilities bundled with the DataGrid component. These utilities provide ready-to-use context menu actions that can be easily plugged into your DataGrid implementation.

## 📋 **Table of Contents**

1. [Cell Context Menu Utilities](#cell-context-menu-utilities)
2. [Table Context Menu Utilities](#table-context-menu-utilities)
3. [Excel Export Utilities](#excel-export-utilities)
4. [Usage Examples](#usage-examples)
5. [Custom Utilities](#custom-utilities)

## 🔧 **Cell Context Menu Utilities**

### Basic Actions

#### `createCopyValueAction(label?, icon?)`
Copies the cell value to clipboard.

```typescript
import { createCopyValueAction } from './components/DataGrid'

const copyAction = createCopyValueAction('Copy Value', '📋')
```

#### `createCopyRowAction(label?, icon?)`
Copies the entire row as JSON to clipboard.

```typescript
const copyRowAction = createCopyRowAction('Copy Row', '📄')
```

#### `createCopyFormattedAction(formatter, label?, icon?)`
Copies a formatted version of the cell value.

```typescript
const copyFormattedAction = createCopyFormattedAction(
  (value, row) => `${row.name}: ${value}`,
  'Copy Formatted',
  '📋'
)
```

### Communication Actions

#### `createEmailAction(label?, icon?)`
Opens email client with the cell value as recipient.

```typescript
const emailAction = createEmailAction('Send Email', '📧')
```

#### `createPhoneAction(label?, icon?)`
Opens phone dialer with the cell value.

```typescript
const phoneAction = createPhoneAction('Call', '📞')
```

#### `createOpenUrlAction(label?, icon?)`
Opens the cell value as a URL in a new tab.

```typescript
const urlAction = createOpenUrlAction('Open Link', '🔗')
```

### Search Actions

#### `createGoogleSearchAction(label?, icon?)`
Searches Google for the cell value.

```typescript
const searchAction = createGoogleSearchAction('Search Google', '🔍')
```

### Bundle Actions

#### `createCommonCellActions()`
Returns a bundle of common cell actions.

```typescript
const commonActions = createCommonCellActions()
// Includes: Copy Value, Copy Row, Separator, Google Search
```

## 📊 **Table Context Menu Utilities**

### Export Actions

#### `createExportCsvAction(filename?, label?, icon?)`
Exports table data to CSV format.

```typescript
const csvExport = createExportCsvAction('data.csv', 'Export to CSV', '📊')
```

#### `createExportJsonAction(filename?, label?, icon?)`
Exports table data to JSON format.

```typescript
const jsonExport = createExportJsonAction('data.json', 'Export to JSON', '📄')
```

### Table Management Actions

#### `createPrintAction(label?, icon?)`
Prints the current table.

```typescript
const printAction = createPrintAction('Print Table', '🖨️')
```

#### `createCopyAllDataAction(label?, icon?)`
Copies all table data as JSON to clipboard.

```typescript
const copyAllAction = createCopyAllDataAction('Copy All Data', '📋')
```

#### `createRefreshAction(onRefresh, label?, icon?)`
Triggers a data refresh callback.

```typescript
const refreshAction = createRefreshAction(
  () => fetchData(),
  'Refresh Data',
  '🔄'
)
```

### Selection Actions

#### `createSelectAllAction(onSelectAll, label?, icon?)`
Selects all rows in the table.

```typescript
const selectAllAction = createSelectAllAction(
  () => selectAllRows(),
  'Select All',
  '☑️'
)
```

#### `createClearSelectionAction(onClearSelection, label?, icon?)`
Clears all row selections.

```typescript
const clearSelectionAction = createClearSelectionAction(
  () => clearSelections(),
  'Clear Selection',
  '❌'
)
```

### Utility Actions

#### `createShowStatsAction(label?, icon?)`
Shows table statistics in an alert.

```typescript
const statsAction = createShowStatsAction('Show Statistics', '📊')
```

### Bundle Actions

#### `createCommonTableActions(options?)`
Returns a bundle of common table actions.

```typescript
const commonTableActions = createCommonTableActions({
  onRefresh: () => fetchData(),
  onSelectAll: () => selectAllRows(),
  onClearSelection: () => clearSelections(),
  includeStats: true
})
```

## 📗 **Excel Export Utilities**

### Basic Excel Export

#### `createExportExcelAction(options?, label?, icon?)`
Exports data to Excel with advanced formatting options.

```typescript
import { createExportExcelAction, excelFormatters, commonColumnMappings } from './components/DataGrid'

const excelExport = createExportExcelAction({
  filename: 'employee_data.xlsx',
  sheetName: 'Employees',
  columnMapping: commonColumnMappings.user,
  formatters: {
    salary: excelFormatters.currency,
    startDate: excelFormatters.date,
    isActive: excelFormatters.boolean
  }
})
```

### Advanced Excel Export

#### `createExportMultiSheetExcelAction(sheetsConfig, filename?, label?, icon?)`
Exports multiple sheets to a single Excel file.

```typescript
const multiSheetExport = createExportMultiSheetExcelAction([
  {
    data: employeeData,
    sheetName: 'Employees',
    options: { columnMapping: commonColumnMappings.user }
  },
  {
    data: departmentData,
    sheetName: 'Departments',
    options: { excludeColumns: ['internalId'] }
  }
], 'company_data.xlsx')
```

#### `createExportSelectedExcelAction(getSelectedData, options?, label?, icon?)`
Exports only selected rows to Excel.

```typescript
const exportSelectedExcel = createExportSelectedExcelAction(
  () => getSelectedRows(),
  { filename: 'selected_data.xlsx' }
)
```

### Excel Formatters

Pre-built formatters for common data types:

```typescript
import { excelFormatters } from './components/DataGrid'

const formatters = {
  price: excelFormatters.currency,
  percentage: excelFormatters.percentage,
  birthDate: excelFormatters.date,
  isActive: excelFormatters.boolean,
  count: excelFormatters.number,
  description: excelFormatters.text
}
```

### Column Mappings

Pre-defined column mappings for common use cases:

```typescript
import { commonColumnMappings } from './components/DataGrid'

// Available mappings:
// - commonColumnMappings.user
// - commonColumnMappings.product  
// - commonColumnMappings.order
```

## 🚀 **Usage Examples**

### Complete Cell Context Menu

```typescript
import {
  createCopyValueAction,
  createEmailAction,
  createGoogleSearchAction,
  createSeparator
} from './components/DataGrid'

const emailColumn = {
  accessorKey: 'email',
  header: 'Email',
  cellConfig: {
    contextMenu: {
      items: [
        createCopyValueAction(),
        createEmailAction(),
        createSeparator(),
        createGoogleSearchAction()
      ]
    }
  }
}
```

### Complete Table Context Menu

```typescript
import {
  createCommonTableActions,
  createExportExcelAction,
  createTableSeparator
} from './components/DataGrid'

const tableContextMenu = {
  items: [
    ...createCommonTableActions({
      onRefresh: () => refetchData(),
      onSelectAll: () => table.toggleAllRowsSelected(true),
      onClearSelection: () => table.toggleAllRowsSelected(false)
    }),
    createTableSeparator(),
    createExportExcelAction({
      filename: 'export.xlsx',
      columnMapping: {
        id: 'ID',
        name: 'Full Name',
        email: 'Email Address'
      }
    })
  ]
}
```

### Custom Action with Conditional Logic

```typescript
const customAction = {
  label: 'Archive User',
  icon: '📦',
  onClick: (value, row) => {
    if (row.status === 'active') {
      archiveUser(row.id)
    } else {
      alert('User is already archived')
    }
  },
  disabled: (value, row) => row.status !== 'active'
}
```

## 🛠 **Custom Utilities**

### Creating Custom Cell Actions

```typescript
import type { ContextMenuItem } from './components/DataGrid'

export const createCustomAction = <T = any>(
  customHandler: (value: any, row: T) => void,
  label: string = 'Custom Action',
  icon: string = '⚡'
): ContextMenuItem<T> => ({
  label,
  icon,
  onClick: customHandler
})
```

### Creating Custom Table Actions

```typescript
import type { TableContextMenuItem } from './components/DataGrid'

export const createCustomTableAction = <T = any>(
  customHandler: (data: T[]) => void,
  label: string = 'Custom Table Action',
  icon: string = '⚡'
): TableContextMenuItem<T> => ({
  label,
  icon,
  onClick: customHandler
})
```

## 🎯 **Best Practices**

1. **Use Bundles**: Start with `createCommonCellActions()` and `createCommonTableActions()` for quick setup
2. **Consistent Icons**: Use consistent emoji or icon fonts across your application
3. **Error Handling**: Wrap async operations (like clipboard access) in try-catch blocks
4. **User Feedback**: Provide visual feedback for actions (toasts, alerts, etc.)
5. **Conditional Actions**: Use the `disabled` property to conditionally enable/disable actions
6. **Separators**: Use separators to group related actions logically

## 📦 **Import Summary**

```typescript
import {
  // Cell actions
  createCopyValueAction,
  createCopyRowAction,
  createEmailAction,
  createPhoneAction,
  createGoogleSearchAction,
  
  // Table actions
  createExportCsvAction,
  createExportJsonAction,
  createPrintAction,
  createRefreshAction,
  createSelectAllAction,
  createClearSelectionAction,
  createShowStatsAction,
  
  // Excel utilities
  createExportExcelAction,
  createExportMultiSheetExcelAction,
  createExportSelectedExcelAction,
  excelFormatters,
  commonColumnMappings,
  
  // Utility functions
  createSeparator,
  createTableSeparator,
  createCommonCellActions,
  createCommonTableActions,
  
  // Types
  type ContextMenuItem,
  type TableContextMenuItem,
  type ExcelExportOptions
} from './components/DataGrid'
```

This comprehensive set of utilities provides everything you need to create powerful, user-friendly context menus for your DataGrid implementation!
