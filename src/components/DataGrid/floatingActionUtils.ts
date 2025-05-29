import type { FloatingActionItem } from './types';
import { createExportExcelAction } from './excelUtils';

/**
 * Create a floating action item for exporting selected data to Excel
 */
export const createExportSelectedToExcelAction = <T = any>(
  options?: {
    filename?: string;
    sheetName?: string;
    columnMapping?: Record<string, string>;
    formatters?: Record<string, (value: any, row?: T) => any>;
    // Customization options
    label?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'primary' | 'danger' | 'success';
    className?: string;
    customButton?: React.ComponentType<{
      onClick: () => void;
      disabled?: boolean;
      className?: string;
      children: React.ReactNode;
    }>;
  }
): FloatingActionItem<T> => ({
  label: options?.label || 'Export to Excel',
  icon: options?.icon || '📗',
  variant: options?.variant || 'primary',
  className: options?.className,
  customButton: options?.customButton,
  onClick: (selectedData) => {
    if (selectedData.length === 0) {
      console.warn('No data selected for export');
      return;
    }
    
    const exportAction = createExportExcelAction({
      filename: options?.filename || `selected_data_${new Date().toISOString().split('T')[0]}.xlsx`,
      sheetName: options?.sheetName || 'Selected Data',
      columnMapping: options?.columnMapping,
      formatters: options?.formatters,
      includeHeaders: true,
      autoWidth: true,
      freezeHeader: true,
    });
    
    exportAction.onClick(selectedData);
  }
});

/**
 * Create a floating action item for exporting selected data to CSV
 */
export const createExportSelectedToCSVAction = <T = any>(
  options?: {
    filename?: string;
    columnMapping?: Record<string, string>;
    delimiter?: string;
    // Customization options
    label?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'primary' | 'danger' | 'success';
    className?: string;
    customButton?: React.ComponentType<{
      onClick: () => void;
      disabled?: boolean;
      className?: string;
      children: React.ReactNode;
    }>;
  }
): FloatingActionItem<T> => ({
  label: options?.label || 'Export to CSV',
  icon: options?.icon || '📄',
  variant: options?.variant || 'default',
  className: options?.className,
  customButton: options?.customButton,
  onClick: (selectedData) => {
    if (selectedData.length === 0) {
      console.warn('No data selected for export');
      return;
    }
    
    const {
      filename = `selected_data_${new Date().toISOString().split('T')[0]}.csv`,
      columnMapping = {},
      delimiter = ','
    } = options || {};
    
    // Get all unique keys from selected data
    const allKeys = Array.from(
      new Set(selectedData.flatMap(row => Object.keys(row as any)))
    );
    
    // Prepare headers
    const headers = allKeys.map(key => columnMapping[key] || key);
    
    // Prepare data rows
    const rows = selectedData.map(row =>
      allKeys.map(key => {
        const value = (row as any)[key];
        // Escape commas and quotes for CSV
        if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      })
    );
    
    // Combine headers and data
    const csvContent = [headers, ...rows]
      .map(row => row.join(delimiter))
      .join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`CSV file exported: ${filename}`);
  }
});

/**
 * Create a separator for floating action items
 */
export const createFloatingActionSeparator = (): FloatingActionItem => ({
  separator: true,
  label: '',
  onClick: () => {}
});

/**
 * Create a simple bundle with only Excel and CSV export actions
 */
export const createCommonFloatingActions = <T = any>(
  options?: {
    enableExportExcel?: boolean;
    enableExportCSV?: boolean;
    excelOptions?: {
      filename?: string;
      columnMapping?: Record<string, string>;
      formatters?: Record<string, (value: any, row?: T) => any>;
      // Excel customization
      label?: string;
      icon?: React.ReactNode;
      variant?: 'default' | 'primary' | 'danger' | 'success';
      className?: string;
      customButton?: React.ComponentType<{
        onClick: () => void;
        disabled?: boolean;
        className?: string;
        children: React.ReactNode;
      }>;
    };
    csvOptions?: {
      filename?: string;
      columnMapping?: Record<string, string>;
      delimiter?: string;
      // CSV customization
      label?: string;
      icon?: React.ReactNode;
      variant?: 'default' | 'primary' | 'danger' | 'success';
      className?: string;
      customButton?: React.ComponentType<{
        onClick: () => void;
        disabled?: boolean;
        className?: string;
        children: React.ReactNode;
      }>;
    };
    // Legacy support
    exportOptions?: {
      filename?: string;
      columnMapping?: Record<string, string>;
      formatters?: Record<string, (value: any, row?: T) => any>;
    };
  }
): FloatingActionItem<T>[] => {
  const {
    enableExportExcel = true,
    enableExportCSV = true,
    excelOptions = {},
    csvOptions = {},
    exportOptions = {} // For backward compatibility
  } = options || {};
  
  const actions: FloatingActionItem<T>[] = [];
  
  // Export actions
  if (enableExportExcel) {
    actions.push(createExportSelectedToExcelAction({
      ...exportOptions, // Backward compatibility
      ...excelOptions   // New specific options override
    }));
  }
  
  if (enableExportCSV) {
    actions.push(createExportSelectedToCSVAction({
      ...exportOptions, // Backward compatibility
      ...csvOptions     // New specific options override
    }));
  }
  
  return actions;
};