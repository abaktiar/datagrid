import React from 'react';
import { DataGrid, createCommonFloatingActions, type FloatingActionItem } from '../';

// Example 1: Custom Button Component
const CustomActionButton = ({ 
  onClick, 
  disabled, 
  children,
  className 
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
    }}
  >
    {children}
  </button>
);

// Example 2: Icon-only Button
const IconButton = ({ 
  onClick, 
  disabled, 
  children 
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '6px',
      padding: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '32px',
      minHeight: '32px',
    }}
  >
    {children}
  </button>
);

// Example usage in your component
export const CustomFloatingDockExample = () => {
  const handleDelete = (selectedData: any[], selectedIndices: number[]) => {
    console.log('Deleting:', selectedData);
  };

  const customFloatingActions: FloatingActionItem[] = [
    // Mix built-in and custom buttons
    ...createCommonFloatingActions({
      enableExportExcel: true,
      enableExportCSV: false, // Disable built-in CSV export
    }),

    // Custom CSV export with custom button
    {
      label: 'Export CSV',
      icon: '📄',
      customButton: CustomActionButton,
      onClick: (selectedData) => {
        // Your custom CSV export logic
        console.log('Custom CSV export for:', selectedData);
      },
    },

    // Separator
    { separator: true, label: '', onClick: () => {} },

    // Icon-only copy button
    {
      label: 'Copy',
      icon: '📋',
      customButton: IconButton,
      onClick: (selectedData) => {
        const text = JSON.stringify(selectedData, null, 2);
        navigator.clipboard.writeText(text);
      },
    },

    // Custom delete with confirmation
    {
      label: 'Delete',
      icon: '🗑️',
      customButton: ({ onClick, disabled, children }) => (
        <button
          onClick={onClick}
          disabled={disabled}
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            fontSize: '13px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {children}
        </button>
      ),
      onClick: handleDelete,
    },

    // Custom business action
    {
      label: 'Archive',
      icon: '📦',
      variant: 'default',
      onClick: (selectedData) => {
        console.log('Archiving:', selectedData);
      },
    },
  ];

  return (
    <DataGrid
      data={[]}
      columns={[]}
      enableRowSelection={true}
      floatingActionDock={{
        enabled: true,
        position: 'bottom-center',
        showCount: true,
        items: customFloatingActions,
      }}
    />
  );
};

/*
// Different ways to create floating action items:

// 1. Use built-in utility
const builtInActions = createCommonFloatingActions(handleDelete);

// 2. Mix built-in with custom
const mixedActions = [
  ...createCommonFloatingActions(handleDelete, { enableDelete: false }),
  {
    label: 'Custom Delete',
    icon: '🗑️',
    customButton: MyCustomButton,
    onClick: handleDelete,
  }
];

// 3. Fully custom
const fullyCustomActions: FloatingActionItem[] = [
  {
    label: 'Export',
    icon: '📊',
    customButton: MyButton,
    onClick: (data) => exportData(data),
  },
  { separator: true, label: '', onClick: () => {} },
  {
    label: 'Delete',
    icon: '🗑️',
    variant: 'danger', // Uses built-in styling
    onClick: handleDelete,
  }
];

// 4. Custom button with custom styling
const customStyledAction = {
  label: 'Special Action',
  icon: '⭐',
  customButton: ({ onClick, disabled, children }) => (
    <div 
      onClick={onClick}
      style={{ 
        // Your custom styles
        background: 'linear-gradient(45deg, #gold, #orange)',
        borderRadius: '20px',
        padding: '10px 20px',
        cursor: 'pointer'
      }}
    >
      {children}
    </div>
  ),
  onClick: (data) => doSomething(data),
};
*/