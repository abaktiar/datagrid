import React from 'react';
import { DataGrid, createCommonFloatingActions, createExportSelectedToExcelAction, createExportSelectedToCSVAction, createFloatingActionSeparator } from '../';

// Example: Custom button with Material Design style
const MaterialButton = ({ onClick, disabled, children, className }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
    style={{
      background: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    {children}
  </button>
);

// Example: Glassmorphism style button
const GlassButton = ({ onClick, disabled, children }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '12px',
      padding: '10px 16px',
      color: '#333',
      fontSize: '13px',
      fontWeight: '500',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    {children}
  </button>
);

// Example: Neon/Gaming style button
const NeonButton = ({ onClick, disabled, children }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: 'linear-gradient(45deg, #ff006e, #8338ec)',
      border: '2px solid #ff006e',
      borderRadius: '8px',
      padding: '8px 16px',
      color: 'white',
      fontSize: '13px',
      fontWeight: '600',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    }}
  >
    {children}
  </button>
);

export const FloatingDockCustomizationExamples = () => {
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Floating Dock Customization Examples</h2>
      
      {/* Example 1: Icon and Label Customization */}
      <h3>1. Custom Icons and Labels</h3>
      <DataGrid
        data={sampleData}
        columns={columns}
        enableRowSelection={true}
        floatingActionDock={{
          enabled: true,
          items: createCommonFloatingActions({
            excelOptions: {
              label: '📊 Download Spreadsheet',
              icon: '💾',
              variant: 'success',
            },
            csvOptions: {
              label: '📋 Export Data',
              icon: '⬇️',
              variant: 'primary',
            },
          }),
        }}
      />

      {/* Example 2: Custom Button Components */}
      <h3>2. Custom Button Components</h3>
      <DataGrid
        data={sampleData}
        columns={columns}
        enableRowSelection={true}
        floatingActionDock={{
          enabled: true,
          items: [
            createExportSelectedToExcelAction({
              label: 'Material Export',
              icon: '📗',
              customButton: MaterialButton,
            }),
            createExportSelectedToCSVAction({
              label: 'Glass Export',
              icon: '💎',
              customButton: GlassButton,
            }),
          ],
        }}
      />

      {/* Example 3: Mixed Styling Approaches */}
      <h3>3. Mixed Styling Approaches</h3>
      <DataGrid
        data={sampleData}
        columns={columns}
        enableRowSelection={true}
        floatingActionDock={{
          enabled: true,
          items: [
            // Built-in styling with variant
            createExportSelectedToExcelAction({
              label: 'Standard Excel',
              icon: '📗',
              variant: 'success',
            }),
            
            createFloatingActionSeparator(),
            
            // Custom button component
            createExportSelectedToCSVAction({
              label: 'Neon CSV',
              icon: '⚡',
              customButton: NeonButton,
            }),
            
            createFloatingActionSeparator(),
            
            // Custom action with inline styling
            {
              label: 'Custom Action',
              icon: '🚀',
              variant: 'primary',
              className: 'my-custom-button-class',
              onClick: (data) => {
                alert(`Custom action for ${data.length} items!`);
              },
            },
          ],
        }}
      />

      {/* Example 4: Themed Button Sets */}
      <h3>4. Themed Button Sets</h3>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
        
        {/* Corporate Theme */}
        <div>
          <h4>Corporate Theme</h4>
          <DataGrid
            data={sampleData.slice(0, 1)}
            columns={columns}
            enableRowSelection={true}
            floatingActionDock={{
              enabled: true,
              items: createCommonFloatingActions({
                excelOptions: {
                  label: 'Excel Report',
                  icon: '📊',
                  variant: 'primary',
                },
                csvOptions: {
                  label: 'CSV Export',
                  icon: '📄',
                  variant: 'default',
                },
              }),
            }}
          />
        </div>

        {/* Gaming Theme */}
        <div>
          <h4>Gaming Theme</h4>
          <DataGrid
            data={sampleData.slice(0, 1)}
            columns={columns}
            enableRowSelection={true}
            floatingActionDock={{
              enabled: true,
              items: [
                createExportSelectedToExcelAction({
                  label: 'Export Data',
                  icon: '⚡',
                  customButton: NeonButton,
                }),
                createExportSelectedToCSVAction({
                  label: 'Save File',
                  icon: '💾',
                  customButton: NeonButton,
                }),
              ],
            }}
          />
        </div>
      </div>

      {/* Documentation */}
      <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Available Customization Options:</h3>
        <pre style={{ background: '#fff', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
{`// Basic customization
createExportSelectedToExcelAction({
  // File options
  filename: 'my-export.xlsx',
  columnMapping: { id: 'ID', name: 'Full Name' },
  
  // Visual customization
  label: 'Custom Label',
  icon: '🚀' | <CustomIcon />,
  variant: 'primary' | 'success' | 'danger' | 'default',
  className: 'my-custom-class',
  
  // Complete custom button
  customButton: MyCustomButtonComponent,
})

// Using createCommonFloatingActions
createCommonFloatingActions({
  excelOptions: {
    label: 'Download Excel',
    icon: '📊',
    variant: 'success',
    customButton: MaterialButton,
  },
  csvOptions: {
    label: 'Export CSV', 
    icon: '📄',
    variant: 'primary',
    customButton: GlassButton,
  },
})`}
        </pre>
      </div>
    </div>
  );
};