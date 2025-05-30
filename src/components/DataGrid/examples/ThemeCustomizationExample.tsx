import React, { useState } from 'react';
import { DataGrid } from '../DataGrid';
import {
  DataGridThemeProvider,
  useDataGridTheme,
  defaultThemes,
  createCustomTheme,
  applyQuickTheme
} from '../theme';
import type { DataGridColumn } from '../types';
import type { ThemePreset, ColorConfig } from '../theme/types';

// Sample data for the demo
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', joinDate: '2023-05-12' },
];

const columns: DataGridColumn<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80
  } as any,
  {
    accessorKey: 'name',
    header: 'Name',
    size: 150
  } as any,
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200
  } as any,
  {
    accessorKey: 'role',
    header: 'Role',
    size: 100
  } as any,
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    cellConfig: {
      format: (value: string) => (
        <span className={`status-badge status-${value}`}>
          {value}
        </span>
      )
    }
  } as any,
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    size: 120
  } as any,
];

// Theme Control Panel Component
const ThemeControlPanel: React.FC = () => {
  const { currentTheme, variant, setTheme, setVariant, customizeTheme, resetTheme } = useDataGridTheme();
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>('default');

  const handlePresetChange = (preset: ThemePreset) => {
    setSelectedPreset(preset);
    setTheme(preset);
  };

  const handleVariantChange = (newVariant: 'light' | 'dark') => {
    setVariant(newVariant);
  };

  const applyCustomizations = () => {
    // Example customizations
    const customizations = {
      light: {
        colors: {
          primary: '#10b981', // Green primary
          primaryHover: '#059669',
          bgAccent: '#10b981',
          textAccent: '#10b981',
          borderAccent: '#10b981',
          buttonPrimary: '#10b981',
          buttonPrimaryHover: '#059669',
        }
      }
    };
    
    customizeTheme(customizations as any);
  };

  return (
    <div className="theme-control-panel" style={{
      padding: '20px',
      background: 'var(--datagrid-bg-header)',
      border: '1px solid var(--datagrid-border-color)',
      borderRadius: 'var(--datagrid-border-radius)',
      marginBottom: '20px',
      fontFamily: 'var(--datagrid-font-family)',
    }}>
      <h3 style={{ marginTop: 0, color: 'var(--datagrid-text-primary)' }}>
        Theme Customization Panel
      </h3>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {/* Theme Preset Selection */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 600,
            color: 'var(--datagrid-text-primary)'
          }}>
            Theme Preset:
          </label>
          <select 
            value={selectedPreset} 
            onChange={(e) => handlePresetChange(e.target.value as ThemePreset)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--datagrid-border-color)',
              borderRadius: 'var(--datagrid-border-radius)',
              backgroundColor: 'var(--datagrid-bg-primary)',
              color: 'var(--datagrid-text-primary)',
              fontFamily: 'var(--datagrid-font-family)',
            }}
          >
            <option value="default">Default Modern</option>
            <option value="material">Material Design</option>
            <option value="minimal">Minimal Clean</option>
            <option value="github">GitHub Style</option>
            <option value="corporate">Corporate</option>
            <option value="glassmorphism">Glassmorphism</option>
          </select>
        </div>

        {/* Theme Variant Selection */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 600,
            color: 'var(--datagrid-text-primary)'
          }}>
            Theme Variant:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleVariantChange('light')}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--datagrid-border-color)',
                borderRadius: 'var(--datagrid-border-radius)',
                backgroundColor: variant === 'light' ? 'var(--datagrid-color-primary)' : 'var(--datagrid-bg-primary)',
                color: variant === 'light' ? 'var(--datagrid-text-inverse)' : 'var(--datagrid-text-primary)',
                cursor: 'pointer',
                fontFamily: 'var(--datagrid-font-family)',
                transition: 'all 0.2s ease',
              }}
            >
              Light
            </button>
            <button
              onClick={() => handleVariantChange('dark')}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--datagrid-border-color)',
                borderRadius: 'var(--datagrid-border-radius)',
                backgroundColor: variant === 'dark' ? 'var(--datagrid-color-primary)' : 'var(--datagrid-bg-primary)',
                color: variant === 'dark' ? 'var(--datagrid-text-inverse)' : 'var(--datagrid-text-primary)',
                cursor: 'pointer',
                fontFamily: 'var(--datagrid-font-family)',
                transition: 'all 0.2s ease',
              }}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 600,
            color: 'var(--datagrid-text-primary)'
          }}>
            Actions:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={applyCustomizations}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--datagrid-color-success)',
                borderRadius: 'var(--datagrid-border-radius)',
                backgroundColor: 'var(--datagrid-color-success)',
                color: 'white',
                cursor: 'pointer',
                fontFamily: 'var(--datagrid-font-family)',
                transition: 'all 0.2s ease',
              }}
            >
              Apply Green Theme
            </button>
            <button
              onClick={resetTheme}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--datagrid-border-color)',
                borderRadius: 'var(--datagrid-border-radius)',
                backgroundColor: 'var(--datagrid-bg-primary)',
                color: 'var(--datagrid-text-primary)',
                cursor: 'pointer',
                fontFamily: 'var(--datagrid-font-family)',
                transition: 'all 0.2s ease',
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Current Theme Info */}
      <div style={{
        padding: '12px',
        backgroundColor: 'var(--datagrid-bg-primary)',
        border: '1px solid var(--datagrid-border-color)',
        borderRadius: 'var(--datagrid-border-radius)',
        fontSize: '14px',
        color: 'var(--datagrid-text-secondary)',
      }}>
        <strong>Current Theme:</strong> {currentTheme.displayName} ({variant})
        <br />
        <strong>Description:</strong> {currentTheme.description}
      </div>
    </div>
  );
};

// CSS customization examples component
const CSSCustomizationExamples: React.FC = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: 'var(--datagrid-text-primary)' }}>
        CSS Customization Examples
      </h3>
      
      {/* Example 1: CSS Custom Properties */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ color: 'var(--datagrid-text-primary)' }}>
          1. Using CSS Custom Properties
        </h4>
        <pre style={{
          background: 'var(--datagrid-bg-secondary)',
          padding: '12px',
          borderRadius: 'var(--datagrid-border-radius)',
          fontSize: '12px',
          overflow: 'auto',
          color: 'var(--datagrid-text-primary)',
        }}>
{`:root {
  /* Change primary color to purple */
  --datagrid-color-primary: #8b5cf6;
  --datagrid-color-primary-hover: #7c3aed;
  
  /* Customize spacing */
  --datagrid-cell-padding: 16px 20px;
  
  /* Custom font */
  --datagrid-font-family: "SF Pro Display", system-ui, sans-serif;
  
  /* Custom border radius */
  --datagrid-border-radius: 12px;
}`}
        </pre>
      </div>

      {/* Example 2: JavaScript API */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ color: 'var(--datagrid-text-primary)' }}>
          2. Using JavaScript Theme API
        </h4>
        <pre style={{
          background: 'var(--datagrid-bg-secondary)',
          padding: '12px',
          borderRadius: 'var(--datagrid-border-radius)',
          fontSize: '12px',
          overflow: 'auto',
          color: 'var(--datagrid-text-primary)',
        }}>
{`import { createCustomTheme, applyThemeToDOM } from '@abaktiar/datagrid/theme';

// Create custom theme
const myTheme = createCustomTheme(defaultThemes.default.config, {
  light: {
    colors: {
      primary: '#ff6b6b',
      primaryHover: '#ff5252',
      bgHeader: '#f8f9fa',
    }
  }
});

// Apply theme
applyThemeToDOM(myTheme, 'light');`}
        </pre>
      </div>

      {/* Example 3: Tailwind Integration */}
      <div>
        <h4 style={{ color: 'var(--datagrid-text-primary)' }}>
          3. Tailwind CSS Integration
        </h4>
        <pre style={{
          background: 'var(--datagrid-bg-secondary)',
          padding: '12px',
          borderRadius: 'var(--datagrid-border-radius)',
          fontSize: '12px',
          overflow: 'auto',
          color: 'var(--datagrid-text-primary)',
        }}>
{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'datagrid-primary': 'var(--datagrid-color-primary)',
        'datagrid-bg': 'var(--datagrid-bg-primary)',
      }
    }
  }
}

// Usage in components
<div className="bg-datagrid-bg text-datagrid-primary">
  Custom styled content
</div>`}
        </pre>
      </div>
    </div>
  );
};

// Main example component
export const ThemeCustomizationExample: React.FC = () => {
  return (
    <DataGridThemeProvider defaultTheme="default" defaultVariant="light">
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--datagrid-bg-primary)',
        color: 'var(--datagrid-text-primary)',
        padding: '20px',
        fontFamily: 'var(--datagrid-font-family)',
        transition: 'all 0.3s ease',
      }}>
        <h1 style={{ marginBottom: '20px', color: 'var(--datagrid-text-primary)' }}>
          DataGrid Theme Customization Demo
        </h1>
        
        <ThemeControlPanel />
        
        <CSSCustomizationExamples />
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--datagrid-text-primary)' }}>
            Themed DataGrid Example
          </h3>
          <DataGrid
            data={sampleData}
            columns={columns}
            enableRowSelection={true}
            enableSorting={true}
            enableFiltering={true}
            enablePagination={true}
            pageSize={5}
            floatingActionDock={{
              enabled: true,
              position: 'bottom-center',
              showCount: true,
              items: [
                {
                  label: 'Export Selected',
                  icon: '📊',
                  variant: 'primary',
                  onClick: (selectedData) => {
                    console.log('Exporting:', selectedData);
                    alert(`Exporting ${selectedData.length} items`);
                  },
                },
                {
                  label: 'Delete Selected',
                  icon: '🗑️',
                  variant: 'danger',
                  onClick: (selectedData) => {
                    console.log('Deleting:', selectedData);
                    alert(`Deleting ${selectedData.length} items`);
                  },
                },
              ],
            }}
          />
        </div>

        {/* Status badge styles using CSS variables */}
        <style>{`
          .status-badge {
            padding: 4px 8px;
            border-radius: var(--datagrid-border-radius-sm);
            font-size: var(--datagrid-font-size-xs);
            font-weight: var(--datagrid-font-weight-medium);
            text-transform: uppercase;
          }
          
          .status-active {
            background-color: var(--datagrid-color-success);
            color: white;
          }
          
          .status-inactive {
            background-color: var(--datagrid-text-muted);
            color: white;
          }
        `}</style>
      </div>
    </DataGridThemeProvider>
  );
};

// Standalone customization examples for documentation
export const ThemeCustomizationDocs = {
  // Example 1: Simple color customization
  SimpleColorCustomization: () => {
    const customTheme = createCustomTheme(defaultThemes.default.config, {
      light: {
        colors: {
          primary: '#e91e63',
          primaryHover: '#c2185b',
          bgAccent: '#e91e63',
        } as Partial<ColorConfig>
      }
    });

    return (
      <DataGridThemeProvider defaultTheme={customTheme}>
        <DataGrid data={sampleData} columns={columns} />
      </DataGridThemeProvider>
    );
  },

  // Example 2: Complete custom theme
  CompleteCustomTheme: () => {
    const corporateTheme = createCustomTheme(defaultThemes.default.config, {
      shared: {
        typography: {
          fontFamily: '"Roboto", "Arial", sans-serif',
        }
      },
      light: {
        colors: {
          bgPrimary: '#ffffff',
          bgHeader: '#f5f7fa',
          primary: '#2563eb',
          primaryHover: '#1d4ed8',
          borderColor: '#d1d5db',
        } as Partial<ColorConfig>
      }
    });

    return (
      <DataGridThemeProvider defaultTheme={corporateTheme}>
        <DataGrid data={sampleData} columns={columns} />
      </DataGridThemeProvider>
    );
  },

  // Example 3: Quick theme switching
  QuickThemeSwitching: () => {
    const [currentTheme, setCurrentTheme] = useState<ThemePreset>('default');
    
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          {(['default', 'material', 'minimal', 'github'] as ThemePreset[]).map((theme) => (
            <button
              key={theme}
              onClick={() => {
                setCurrentTheme(theme);
                applyQuickTheme(theme);
              }}
              style={{
                marginRight: '8px',
                padding: '8px 16px',
                backgroundColor: currentTheme === theme ? '#3b82f6' : '#e5e7eb',
                color: currentTheme === theme ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {theme}
            </button>
          ))}
        </div>
        <DataGrid data={sampleData} columns={columns} />
      </div>
    );
  },
};

export default ThemeCustomizationExample;