# Usage Examples for @abaktiar/datagrid

This file contains practical examples of how to use the `@abaktiar/datagrid` package.

## 🚀 Quick Start Example

```tsx
import React from 'react';
import { DataGrid, DataGridColumn } from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'Active' | 'Inactive';
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, status: 'Inactive' },
];

const columns: DataGridColumn<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
    enableSorting: true,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    size: 200,
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 250,
    enableFiltering: true,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    size: 100,
    enableSorting: true,
    cellConfig: {
      align: 'center',
      format: (value) => `${value} years`,
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    cellConfig: {
      format: (value) => (
        <span 
          style={{ 
            color: value === 'Active' ? 'green' : 'red',
            fontWeight: 'bold' 
          }}
        >
          {value}
        </span>
      ),
    },
  },
];

export function BasicExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic DataGrid Example</h2>
      <DataGrid
        data={sampleData}
        columns={columns}
        enableSorting
        enableFiltering
        enablePagination
        enableRowSelection
        pageSize={10}
        theme="light"
        density="comfortable"
      />
    </div>
  );
}
```

## 🎯 Advanced Example with Context Menus

```tsx
import React from 'react';
import { 
  DataGrid, 
  DataGridColumn,
  createCopyValueAction,
  createEmailAction,
  createCommonCellActions,
  createExportCsvAction,
  createExportJsonAction,
  createExcelExportBundle
} from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  salary: number;
  joinDate: string;
}

const employeeData: Employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1-234-567-8900',
    department: 'Engineering',
    salary: 85000,
    joinDate: '2023-01-15',
  },
  // Add more sample data...
];

const employeeColumns: DataGridColumn<Employee>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
    enableSorting: true,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 150,
    enableSorting: true,
    enableFiltering: true,
    cellConfig: {
      contextMenu: {
        items: [
          createCopyValueAction(),
          ...createCommonCellActions(),
        ],
      },
    },
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    size: 150,
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 250,
    enableFiltering: true,
    cellConfig: {
      contextMenu: {
        items: [
          createCopyValueAction(),
          createEmailAction(),
        ],
      },
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    size: 150,
    cellConfig: {
      format: (value) => value || 'N/A',
    },
  },
  {
    accessorKey: 'department',
    header: 'Department',
    size: 150,
    enableFiltering: true,
    filterConfig: {
      type: 'select',
      options: ['Engineering', 'Marketing', 'Sales', 'HR'],
    },
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
    size: 120,
    enableSorting: true,
    cellConfig: {
      align: 'right',
      format: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
    },
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    size: 120,
    enableSorting: true,
    cellConfig: {
      format: (value) => new Date(value).toLocaleDateString(),
    },
  },
];

const tableContextMenu = {
  items: [
    createExportCsvAction('employees.csv'),
    createExportJsonAction('employees.json'),
    ...createExcelExportBundle(),
  ],
};

export function AdvancedExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Advanced DataGrid with Context Menus</h2>
      <DataGrid
        data={employeeData}
        columns={employeeColumns}
        enableSorting
        enableFiltering
        enablePagination
        enableRowSelection
        enableGlobalSearch
        pageSize={15}
        pageSizeOptions={[10, 15, 25, 50]}
        theme="light"
        density="comfortable"
        tableContextMenu={tableContextMenu}
        searchConfig={{
          enabled: true,
          placeholder: 'Search employees...',
          position: 'top',
          showIcon: true,
          debounceMs: 300,
        }}
        onRowClick={(row) => {
          console.log('Row clicked:', row);
        }}
        onRowDoubleClick={(row) => {
          alert(`Viewing details for ${row.firstName} ${row.lastName}`);
        }}
      />
    </div>
  );
}
```

## 🎛️ Controlled State Example

```tsx
import React, { useState } from 'react';
import { 
  DataGrid, 
  DataGridColumn,
  type SortingState,
  type PaginationState,
  type RowSelectionState 
} from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const productData: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, inStock: true },
  { id: 2, name: 'Mouse', category: 'Electronics', price: 29.99, inStock: true },
  { id: 3, name: 'Keyboard', category: 'Electronics', price: 79.99, inStock: false },
];

const productColumns: DataGridColumn<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    size: 200,
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    size: 150,
    enableFiltering: true,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 120,
    enableSorting: true,
    cellConfig: {
      align: 'right',
      format: (value) => `$${value.toFixed(2)}`,
    },
  },
  {
    accessorKey: 'inStock',
    header: 'In Stock',
    size: 100,
    cellConfig: {
      align: 'center',
      format: (value) => value ? '✅' : '❌',
    },
  },
];

export function ControlledExample() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Controlled State Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>State Information:</h3>
        <p><strong>Selected Rows:</strong> {Object.keys(rowSelection).length}</p>
        <p><strong>Current Page:</strong> {pagination.pageIndex + 1}</p>
        <p><strong>Page Size:</strong> {pagination.pageSize}</p>
        <p><strong>Global Filter:</strong> {globalFilter || 'None'}</p>
        <p><strong>Sorting:</strong> {sorting.length > 0 ? JSON.stringify(sorting) : 'None'}</p>
      </div>

      <DataGrid
        data={productData}
        columns={productColumns}
        enableSorting
        enableFiltering
        enablePagination
        enableRowSelection
        enableGlobalSearch
        
        // Controlled state
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        onPaginationChange={setPagination}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        
        pageSizeOptions={[5, 10, 20]}
        theme="light"
        density="comfortable"
      />
    </div>
  );
}
```

## 📱 Responsive Example

```tsx
import React from 'react';
import { DataGrid, DataGridColumn } from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';

interface MobileData {
  id: number;
  title: string;
  status: string;
  date: string;
}

const mobileData: MobileData[] = [
  { id: 1, title: 'Task 1', status: 'Complete', date: '2025-01-15' },
  { id: 2, title: 'Task 2', status: 'Pending', date: '2025-01-16' },
];

const mobileColumns: DataGridColumn<MobileData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    size: 200,
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    cellConfig: {
      className: (value) => `status-${value.toLowerCase()}`,
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    size: 120,
    enableSorting: true,
    cellConfig: {
      format: (value) => new Date(value).toLocaleDateString(),
    },
  },
];

export function ResponsiveExample() {
  return (
    <div style={{ padding: '10px', maxWidth: '100%' }}>
      <h2>Responsive Mobile-Friendly Example</h2>
      <DataGrid
        data={mobileData}
        columns={mobileColumns}
        enableSorting
        enablePagination
        pageSize={5}
        theme="light"
        density="compact" // Better for mobile
        searchConfig={{
          enabled: true,
          position: 'top',
          placeholder: 'Search...',
        }}
        className="mobile-friendly-grid"
      />
      
      <style jsx>{`
        .mobile-friendly-grid {
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .mobile-friendly-grid {
            font-size: 12px;
          }
        }
        
        .status-complete {
          color: green;
          font-weight: bold;
        }
        
        .status-pending {
          color: orange;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
```

## 🔧 Custom Styling Example

```tsx
import React from 'react';
import { DataGrid, DataGridColumn } from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';

interface StyledData {
  id: number;
  name: string;
  score: number;
  grade: string;
}

const styledData: StyledData[] = [
  { id: 1, name: 'Alice', score: 95, grade: 'A' },
  { id: 2, name: 'Bob', score: 87, grade: 'B' },
  { id: 3, name: 'Charlie', score: 78, grade: 'C' },
];

const styledColumns: DataGridColumn<StyledData>[] = [
  {
    accessorKey: 'id',
    header: 'Student ID',
    size: 100,
    headerConfig: {
      className: 'header-id',
    },
  },
  {
    accessorKey: 'name',
    header: 'Student Name',
    size: 200,
    cellConfig: {
      className: 'cell-name',
      style: { fontWeight: 'bold' },
    },
  },
  {
    accessorKey: 'score',
    header: 'Score',
    size: 100,
    cellConfig: {
      align: 'center',
      className: (value) => value >= 90 ? 'high-score' : value >= 80 ? 'good-score' : 'low-score',
      style: (value) => ({
        backgroundColor: value >= 90 ? '#e8f5e8' : value >= 80 ? '#fff3cd' : '#f8d7da',
        fontWeight: 'bold',
      }),
    },
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    size: 80,
    cellConfig: {
      align: 'center',
      format: (value) => (
        <div style={{ 
          display: 'inline-block',
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: value === 'A' ? '#28a745' : value === 'B' ? '#ffc107' : '#dc3545',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {value}
        </div>
      ),
    },
  },
];

export function CustomStyledExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Custom Styled DataGrid</h2>
      <DataGrid
        data={styledData}
        columns={styledColumns}
        enableSorting
        theme="light"
        density="comfortable"
        className="custom-datagrid"
        tableClassName="custom-table"
        headerClassName="custom-header"
        bodyClassName="custom-body"
      />
      
      <style jsx>{`
        .custom-datagrid {
          border: 2px solid #007bff;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .custom-table {
          font-family: 'Arial', sans-serif;
        }
        
        .custom-header {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
        }
        
        .header-id {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .cell-name {
          color: #495057;
        }
        
        .high-score {
          color: #155724;
        }
        
        .good-score {
          color: #856404;
        }
        
        .low-score {
          color: #721c24;
        }
      `}</style>
    </div>
  );
}
```

## 🎯 How to Test These Examples

1. Create a new React project:
```bash
npx create-react-app test-datagrid --template typescript
cd test-datagrid
```

2. Install the package:
```bash
npm install @abaktiar/datagrid
```

3. Replace the contents of `src/App.tsx` with any of the examples above.

4. Start the development server:
```bash
npm start
```

## 📝 Notes

- All examples use TypeScript for better type safety
- The package includes both light and dark themes
- Context menus work on right-click
- The DataGrid is responsive and mobile-friendly
- Extensive customization options are available for styling