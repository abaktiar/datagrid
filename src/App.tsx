import React, { useState, useMemo, useCallback } from 'react';
import {
  DataGrid,
  createEssentialTableActions,
  createExportExcelAction,
  createExportCsvAction,
  createExportJsonAction,
  createPrintAction,
  createCopyAllDataAction,
  createRefreshAction,
  createShowStatsAction,
  createTableSeparator,
  excelExportPresets,
  createFilteredExcelExport,
  createSummaryExcelExport,
  createQuickExcelExport,
  createColumnSpecificExcelExport,
} from './components/DataGrid';
import { generateSampleData } from './utils/sampleData';
import { DemoControls } from './components/DemoControls';
import './App.css';

// Generate large sample data
const allData = generateSampleData(1000);

function App() {
  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          align: 'center',
          tooltip: 'Unique identifier for each record',
          className: 'id-header',
        },
        filterConfig: {
          enabled: true,
          placeholder: 'Filter by ID...',
          type: 'number',
        },
        cellConfig: {
          align: 'center',
          className: 'id-cell',
          style: { fontWeight: 'bold', color: '#666' },
          contextMenu: {
            items: [
              {
                label: 'Copy ID',
                icon: '📋',
                onClick: (value) => navigator.clipboard.writeText(String(value)),
              },
              {
                label: 'View Details',
                icon: '👁️',
                onClick: (value, row) => alert(`Viewing details for ID: ${value}\nName: ${row.name}`),
              },
            ],
          },
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          icon: '👤',
          tooltip: 'Employee full name',
        },
        filterConfig: {
          enabled: true,
          placeholder: 'Search names...',
          type: 'text',
        },
        cellConfig: {
          truncate: true,
          tooltip: true,
          className: (value, row) => (value.length > 15 ? 'long-name' : 'short-name'),
          contextMenu: {
            items: [
              {
                label: 'Copy Name',
                icon: '📋',
                onClick: (value) => navigator.clipboard.writeText(value),
              },
              {
                label: 'Send Message',
                icon: '💬',
                onClick: (value, row) => alert(`Sending message to ${value} at ${row.email}`),
              },
              { separator: true },
              {
                label: 'View Profile',
                icon: '👤',
                onClick: (value, row) => alert(`Opening profile for ${value}`),
              },
            ],
          },
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          icon: '📧',
          tooltip: 'Employee email address',
        },
        filterConfig: {
          enabled: false, // Disabled filter for this column
        },
        cellConfig: {
          truncate: true,
          tooltip: true,
          onClick: (value) => window.open(`mailto:${value}`),
          style: { color: '#0066cc', cursor: 'pointer' },
          contextMenu: {
            items: [
              {
                label: 'Copy Email',
                icon: '📋',
                onClick: (value) => navigator.clipboard.writeText(value),
              },
              {
                label: 'Send Email',
                icon: '📧',
                onClick: (value) => window.open(`mailto:${value}`),
              },
              {
                label: 'Add to Contacts',
                icon: '👥',
                onClick: (value, row) => alert(`Adding ${row.name} (${value}) to contacts`),
              },
            ],
          },
        },
      },
      {
        accessorKey: 'age',
        header: 'Age',
        size: 80,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          align: 'center',
          tooltip: 'Employee age in years',
        },
        filterConfig: {
          enabled: false, // Disabled filter for age column
        },
        cellConfig: {
          align: 'center',
          format: (value) => `${value} yrs`,
          style: (value) => ({
            color: value < 30 ? '#10b981' : value > 50 ? '#ef4444' : '#6b7280',
            fontWeight: 'bold',
          }),
        },
      },
      {
        accessorKey: 'department',
        header: 'Department',
        size: 150,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          icon: '🏢',
          tooltip: 'Employee department',
        },
        cellConfig: {
          truncate: true,
          className: 'department-cell',
        },
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        size: 120,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          icon: '💰',
          align: 'right',
          tooltip: 'Annual salary in USD',
        },
        cellConfig: {
          align: 'right',
          format: (value) =>
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(value),
          style: (value) => ({
            fontWeight: 'bold',
            color: value > 100000 ? '#10b981' : '#6b7280',
          }),
        },
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        size: 120,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          icon: '📅',
          tooltip: 'Employee start date',
        },
        cellConfig: {
          format: (value) => new Date(value).toLocaleDateString(),
          tooltip: (value) =>
            `Started on ${new Date(value).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}`,
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        enableSorting: true,
        enableFiltering: true,
        headerConfig: {
          icon: '🔄',
          align: 'center',
          tooltip: 'Employee status',
        },
        filterConfig: {
          enabled: true,
          placeholder: 'Filter status...',
          type: 'text',
        },
        cellConfig: {
          align: 'center',
          format: (value) => {
            const statusColors = {
              Active: '#10b981',
              Inactive: '#ef4444',
              Pending: '#f59e0b',
            };
            return (
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: statusColors[value as keyof typeof statusColors] || '#6b7280',
                }}>
                {value}
              </span>
            );
          },
          tooltip: (value) => `Employee is currently ${value.toLowerCase()}`,
          contextMenu: {
            items: [
              {
                label: 'Activate',
                icon: '✅',
                onClick: (value, row) => alert(`Activating ${row.name}`),
                disabled: (value) => value === 'Active',
              },
              {
                label: 'Deactivate',
                icon: '❌',
                onClick: (value, row) => alert(`Deactivating ${row.name}`),
                disabled: (value) => value === 'Inactive',
              },
              {
                label: 'Set Pending',
                icon: '⏳',
                onClick: (value, row) => alert(`Setting ${row.name} to pending`),
                disabled: (value) => value === 'Pending',
              },
              { separator: true },
              {
                label: 'View History',
                icon: '📊',
                onClick: (value, row) => alert(`Viewing status history for ${row.name}`),
              },
            ],
          },
        },
      },
    ],
    []
  );
  // Demo configuration state
  const [config, setConfig] = useState({
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableGlobalSearch: true,
    density: 'comfortable' as 'compact' | 'comfortable' | 'spacious',
    theme: 'light' as 'light' | 'dark',
    pageSize: 10,
    paginationType: 'frontend' as 'frontend' | 'backend',
    dataSize: 50,
    searchPosition: 'top' as 'top' | 'bottom' | 'none',
    searchPlaceholder: 'Search all columns...',
    showSearchIcon: true,
    searchDebounce: 300,
  });

  // Simulate backend pagination
  const [backendState, setBackendState] = useState({
    pageIndex: 0,
    pageSize: config.pageSize,
    totalRows: allData.length,
  });

  // Get data based on pagination type
  const data = useMemo(() => {
    if (config.paginationType === 'backend') {
      const start = backendState.pageIndex * backendState.pageSize;
      const end = start + backendState.pageSize;
      return allData.slice(0, config.dataSize).slice(start, end);
    } else {
      return allData.slice(0, config.dataSize);
    }
  }, [config.paginationType, config.dataSize, backendState]);

  const handleConfigChange = useCallback((key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));

    // Reset backend pagination when changing page size
    if (key === 'pageSize') {
      setBackendState((prev) => ({ ...prev, pageSize: value, pageIndex: 0 }));
    }
  }, []);

  const handleBackendPaginationChange = useCallback((pagination: any) => {
    setBackendState((prev) => ({
      ...prev,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    }));
  }, []);

  return (
    <div className='app'>
      <h1>@abaktiar/datagrid Demo</h1>

      <DemoControls config={config} onConfigChange={handleConfigChange} />

      <div className='demo-container'>
        <DataGrid
          data={data}
          columns={columns}
          enableSorting={config.enableSorting}
          enableFiltering={config.enableFiltering}
          enablePagination={config.enablePagination}
          enableRowSelection={config.enableRowSelection}
          enableColumnResizing={config.enableColumnResizing}
          enableGlobalSearch={config.enableGlobalSearch}
          density={config.density}
          theme={config.theme}
          pageSize={config.pageSize}
          searchConfig={{
            enabled: config.enableGlobalSearch,
            placeholder: config.searchPlaceholder,
            position: config.searchPosition,
            showIcon: config.showSearchIcon,
            debounceMs: config.searchDebounce,
          }}
          tableContextMenu={{
            items: [
              // === BASIC EXPORT ACTIONS ===
              createExportCsvAction('employee_data.csv', 'Export to CSV', '📊'),
              createExportJsonAction('employee_data.json', 'Export to JSON', '📄'),

              createTableSeparator(),

              // === EXCEL EXPORT SHOWCASE ===
              // Basic Excel Export with full customization
              createExportExcelAction(
                {
                  filename: 'employee_data.xlsx',
                  sheetName: 'Employees',
                  columnMapping: {
                    id: 'Employee ID',
                    name: 'Full Name',
                    email: 'Email Address',
                    age: 'Age (Years)',
                    department: 'Department',
                    salary: 'Annual Salary',
                    startDate: 'Start Date',
                    status: 'Employment Status',
                  },
                  formatters: {
                    salary: (value) => Number(value) || 0,
                    startDate: (value) => new Date(value),
                    age: (value) => Number(value) || 0,
                  },
                  freezeHeader: true,
                  autoWidth: true,
                  addSummaryRow: (data) => ({
                    name: 'TOTALS',
                    salary: data.reduce((sum, row) => sum + (row.salary || 0), 0),
                    age: Math.round(data.reduce((sum, row) => sum + (row.age || 0), 0) / data.length),
                  }),
                },
                'Export Full Employee Data',
                '📑'
              ),

              // Quick Excel Export (minimal config)
              createQuickExcelExport('quick_export.xlsx', 'Quick Excel Export', '⚡'),

              // Filtered Export (Active employees only)
              createFilteredExcelExport(
                (row) => row.status === 'Active',
                'active_employees.xlsx',
                'Export Active Employees',
                '✅'
              ),

              // Column-specific export
              createColumnSpecificExcelExport(
                ['name', 'email', 'department', 'salary'],
                {
                  name: 'Full Name',
                  email: 'Email Address',
                  department: 'Department',
                  salary: 'Annual Salary',
                },
                'contact_list.xlsx',
                'Export Contact List',
                '📇'
              ),

              createTableSeparator(),

              // === UTILITY ACTIONS ===
              createCopyAllDataAction('Copy All Data', '📋'),
              createShowStatsAction('Show Table Statistics', '📊'),
              createPrintAction('Print Table', '🖨️'),

              createTableSeparator(),

              // === CUSTOM ACTIONS ===
              createRefreshAction(
                () => {
                  alert('Refreshing employee data...');
                  // In real app: refetchData();
                },
                'Refresh Data',
                '�'
              ),

              // Custom business action
              {
                label: 'Generate Payroll Report',
                icon: '💰',
                onClick: (data) => {
                  const activeEmployees = data.filter((emp) => emp.status === 'Active');
                  const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
                  alert(
                    `Payroll Report:\n• Active Employees: ${
                      activeEmployees.length
                    }\n• Total Annual Payroll: $${totalPayroll.toLocaleString()}\n• Average Salary: $${Math.round(
                      totalPayroll / activeEmployees.length
                    ).toLocaleString()}`
                  );
                },
              },

              // Custom export with data transformation
              {
                label: 'Export Salary Analysis',
                icon: '📈',
                onClick: (data) => {
                  // Transform data for salary analysis
                  const analysisData = data.map((emp) => ({
                    name: emp.name,
                    department: emp.department,
                    salary: emp.salary,
                    salaryCategory: emp.salary > 100000 ? 'High' : emp.salary > 70000 ? 'Medium' : 'Low',
                    aboveAverage: emp.salary > data.reduce((sum, e) => sum + e.salary, 0) / data.length,
                    yearsOfService: Math.floor(
                      (new Date().getTime() - new Date(emp.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365)
                    ),
                  }));

                  // Create custom Excel export
                  const customExport = createExportExcelAction({
                    filename: 'salary_analysis.xlsx',
                    sheetName: 'Salary Analysis',
                    columnMapping: {
                      name: 'Employee Name',
                      department: 'Department',
                      salary: 'Annual Salary',
                      salaryCategory: 'Salary Category',
                      aboveAverage: 'Above Average',
                      yearsOfService: 'Years of Service',
                    },
                    formatters: {
                      salary: (value) => Number(value),
                      aboveAverage: (value) => (value ? 'Yes' : 'No'),
                    },
                    addSummaryRow: (data) => ({
                      name: 'SUMMARY',
                      salary: data.reduce((sum, row) => sum + row.salary, 0),
                      salaryCategory: `${data.filter((r) => r.salaryCategory === 'High').length} High`,
                      aboveAverage: `${data.filter((r) => r.aboveAverage).length} employees`,
                      yearsOfService: Math.round(data.reduce((sum, row) => sum + row.yearsOfService, 0) / data.length),
                    }),
                    freezeHeader: true,
                    autoWidth: true,
                  });

                  customExport.onClick(analysisData);
                },
              },
            ],
          }}
          // Backend pagination props
          {...(config.paginationType === 'backend' && {
            pagination: {
              pageIndex: backendState.pageIndex,
              pageSize: backendState.pageSize,
            },
            onPaginationChange: handleBackendPaginationChange,
            rowCount: config.dataSize,
            manualPagination: true,
            manualSorting: true,
            manualFiltering: true,
          })}
        />
      </div>
    </div>
  );
}

export default App;
