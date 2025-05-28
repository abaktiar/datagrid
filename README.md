# @abaktiar/datagrid

A powerful, feature-rich React DataGrid component with TypeScript support, built on TanStack Table.

[![npm version](https://badge.fury.io/js/%40abaktiar%2Fdatagrid.svg)](https://badge.fury.io/js/%40abaktiar%2Fdatagrid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **🎯 TypeScript Support** - Fully typed with comprehensive TypeScript definitions
- **⚡ High Performance** - Built on TanStack Table with virtualization support
- **🎨 Customizable Styling** - Multiple themes (light/dark) and density options
- **📊 Rich Data Operations** - Sorting, filtering, pagination, and global search
- **🖱️ Context Menus** - Powerful right-click context menus for cells and tables
- **📤 Export Capabilities** - Export to CSV, JSON, and Excel formats
- **🔧 Flexible Configuration** - Extensive customization options
- **📱 Responsive Design** - Mobile-friendly with overflow handling
- **🎛️ Advanced Features** - Row selection, column resizing, and more

## 📦 Installation

```bash
npm install @abaktiar/datagrid
```

or

```bash
yarn add @abaktiar/datagrid
```

or

```bash
pnpm add @abaktiar/datagrid
```

## 🏗️ Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom
```

## 📚 Basic Usage

```tsx
import React from 'react';
import { DataGrid, DataGridColumn } from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  // ... more data
];

const columns: DataGridColumn<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    size: 200,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 250,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    size: 100,
  },
];

function App() {
  return (
    <DataGrid
      data={data}
      columns={columns}
      enableSorting
      enableFiltering
      enablePagination
      enableRowSelection
      pageSize={10}
    />
  );
}

export default App;
```

## 🎨 Styling

Import the CSS file in your application:

```tsx
import '@abaktiar/datagrid/styles';
```

## 🔧 Advanced Usage

### Context Menus

```tsx
import { 
  DataGrid, 
  createCopyValueAction, 
  createEmailAction,
  createCommonCellActions 
} from '@abaktiar/datagrid';

const columns: DataGridColumn<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cellConfig: {
      contextMenu: {
        items: [
          createCopyValueAction(),
          createEmailAction(),
          ...createCommonCellActions(),
        ],
      },
    },
  },
];
```

### Excel Export

```tsx
import { 
  DataGrid, 
  createExportExcelAction,
  createExcelExportBundle 
} from '@abaktiar/datagrid';

const tableContextMenu = {
  items: [
    createExportExcelAction('users.xlsx'),
    ...createExcelExportBundle(),
  ],
};

<DataGrid
  data={data}
  columns={columns}
  tableContextMenu={tableContextMenu}
/>
```

### Custom Cell Formatting

```tsx
const columns: DataGridColumn<User>[] = [
  {
    accessorKey: 'age',
    header: 'Age',
    cellConfig: {
      format: (value) => `${value} years old`,
      style: (value) => ({
        color: value < 30 ? 'green' : 'blue',
        fontWeight: 'bold',
      }),
    },
  },
];
```

### Controlled State

```tsx
import React, { useState } from 'react';
import { DataGrid, SortingState, PaginationState } from '@abaktiar/datagrid';

function ControlledDataGrid() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <DataGrid
      data={data}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
      pagination={pagination}
      onPaginationChange={setPagination}
      manualPagination
      rowCount={totalRows}
    />
  );
}
```

## 📖 API Reference

### DataGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of data objects |
| `columns` | `DataGridColumn<T>[]` | **required** | Column definitions |
| `enableSorting` | `boolean` | `true` | Enable column sorting |
| `enableFiltering` | `boolean` | `true` | Enable column filtering |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `enableRowSelection` | `boolean` | `false` | Enable row selection |
| `enableColumnResizing` | `boolean` | `true` | Enable column resizing |
| `enableGlobalSearch` | `boolean` | `true` | Enable global search |
| `pageSize` | `number` | `10` | Default page size |
| `density` | `'compact' \| 'comfortable' \| 'spacious'` | `'comfortable'` | Table density |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Theme |
| `loading` | `boolean` | `false` | Show loading indicator |

### Column Configuration

```tsx
interface DataGridColumn<T> {
  accessorKey: string;
  header: string;
  size?: number;
  minSize?: number;
  maxSize?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableResizing?: boolean;
  
  // Cell configuration
  cellConfig?: {
    format?: (value: any, row: T) => React.ReactNode;
    style?: React.CSSProperties | ((value: any, row: T) => React.CSSProperties);
    className?: string | ((value: any, row: T) => string);
    align?: 'left' | 'center' | 'right';
    tooltip?: boolean | ((value: any, row: T) => string);
    contextMenu?: {
      items: ContextMenuItem<T>[];
    };
  };
  
  // Header configuration
  headerConfig?: {
    align?: 'left' | 'center' | 'right';
    className?: string;
    tooltip?: string;
  };
}
```

## 🛠️ Utility Functions

### Context Menu Actions

- `createCopyValueAction()` - Copy cell value to clipboard
- `createCopyRowAction()` - Copy entire row data
- `createEmailAction()` - Open email client
- `createPhoneAction()` - Handle phone number actions
- `createOpenUrlAction()` - Open URLs in new tab
- `createGoogleSearchAction()` - Search value on Google

### Table Actions

- `createExportCsvAction()` - Export table to CSV
- `createExportJsonAction()` - Export table to JSON
- `createExportExcelAction()` - Export table to Excel
- `createPrintAction()` - Print table
- `createRefreshAction()` - Refresh table data

### Excel Export Utilities

- `createExcelExportBundle()` - Complete Excel export menu
- `createQuickExcelExport()` - Quick export function
- `excelExportPresets` - Predefined export configurations

## 🎨 Theming & Customization

The DataGrid supports multiple themes and customization options:

```tsx
<DataGrid
  data={data}
  columns={columns}
  theme="dark"
  density="compact"
  className="my-custom-grid"
  tableClassName="my-table"
  headerClassName="my-header"
  bodyClassName="my-body"
/>
```

### CSS Custom Properties

You can customize the appearance using CSS custom properties:

```css
:root {
  --datagrid-primary-color: #3b82f6;
  --datagrid-border-color: #e5e7eb;
  --datagrid-header-bg: #f9fafb;
  --datagrid-row-hover-bg: #f3f4f6;
}
```

## 🔍 Search Configuration

```tsx
<DataGrid
  data={data}
  columns={columns}
  searchConfig={{
    enabled: true,
    placeholder: 'Search users...',
    position: 'top',
    showIcon: true,
    debounceMs: 300,
  }}
/>
```

## 📱 Responsive Design

The DataGrid automatically handles overflow and provides smooth scrolling on mobile devices:

```tsx
<DataGrid
  data={data}
  columns={columns}
  density="compact" // Better for mobile
  searchConfig={{ position: 'top' }}
/>
```

## 🚀 Performance Tips

1. **Use `memo`** for custom cell renderers
2. **Virtualization** is automatically handled for large datasets
3. **Debounced search** reduces unnecessary re-renders
4. **Column sizing** - Set appropriate default sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/abaktiar/datagrid)
- [npm Package](https://www.npmjs.com/package/@abaktiar/datagrid)
- [Issues](https://github.com/abaktiar/datagrid/issues)

## 📝 Changelog

### 1.0.0
- Initial release
- Full TypeScript support
- TanStack Table integration
- Context menu functionality
- Excel export capabilities
- Responsive design
- Multiple themes and densities

---

Made with ❤️ by [abaktiar](https://github.com/abaktiar)
