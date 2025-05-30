import React from 'react'
import './DemoControls.css'

interface DemoConfig {
  enableSorting: boolean;
  enableFiltering: boolean;
  enablePagination: boolean;
  enableRowSelection: boolean;
  enableColumnResizing: boolean;
  enableGlobalSearch: boolean;
  density: 'compact' | 'comfortable' | 'spacious';
  theme: 'light' | 'dark';
  pageSize: number;
  paginationType: 'frontend' | 'backend';
  dataSize: number;
  searchPosition: 'top' | 'bottom' | 'none';
  searchPlaceholder: string;
  showSearchIcon: boolean;
  searchDebounce: number;
  // Floating Action Dock configuration
  enableFloatingDock: boolean;
  floatingDockPosition: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center';
  showSelectionCount: boolean;
  // Theme System configuration
  themePreset:
    | 'default'
    | 'material'
    | 'minimal'
    | 'github'
    | 'corporate'
    | 'shadcn'
    | 'glassmorphism'
    | 'uniform'
    | 'custom';
  themeVariant: 'light' | 'dark' | 'auto';
  // Custom theme builder
  customTheme: {
    primaryColor: string;
    backgroundColor: string;
    headerColor: string;
    borderRadius: string;
    fontSize: string;
  };
}

interface DemoControlsProps {
  config: DemoConfig;
  onConfigChange: (key: string, value: any) => void;
}

export function DemoControls({ config, onConfigChange }: DemoControlsProps) {
  const handleCheckboxChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange(key, e.target.checked);
  };

  const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    onConfigChange(key, e.target.value);
  };

  const handleNumberChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange(key, parseInt(e.target.value));
  };

  return (
    <div className={`demo-controls datagrid-theme-${config.theme}`}>
      <h2>DataGrid Configuration</h2>

      <div className='controls-grid'>
        {/* Feature Toggles */}
        <div className='control-section'>
          <h3>Features</h3>
          <div className='control-group'>
            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.enableSorting}
                onChange={handleCheckboxChange('enableSorting')}
                className='demo-checkbox'
              />
              <span>Enable Sorting</span>
            </label>

            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.enableFiltering}
                onChange={handleCheckboxChange('enableFiltering')}
                className='demo-checkbox'
              />
              <span>Enable Filtering</span>
            </label>

            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.enablePagination}
                onChange={handleCheckboxChange('enablePagination')}
                className='demo-checkbox'
              />
              <span>Enable Pagination</span>
            </label>

            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.enableRowSelection}
                onChange={handleCheckboxChange('enableRowSelection')}
                className='demo-checkbox'
              />
              <span>Enable Row Selection</span>
            </label>
          </div>
        </div>

        {/* Column Features */}
        <div className='control-section'>
          <h3>Column Features</h3>
          <div className='control-group'>
            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.enableColumnResizing}
                onChange={handleCheckboxChange('enableColumnResizing')}
                className='demo-checkbox'
              />
              <span>Column Resizing</span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className='control-section'>
          <h3>Appearance</h3>
          <div className='control-group'>
            <label className='control-item'>
              <span>Density:</span>
              <select value={config.density} onChange={handleSelectChange('density')} className='demo-select'>
                <option value='compact'>Compact</option>
                <option value='comfortable'>Comfortable</option>
                <option value='spacious'>Spacious</option>
              </select>
            </label>

            <label className='control-item'>
              <span>Theme:</span>
              <select value={config.theme} onChange={handleSelectChange('theme')} className='demo-select'>
                <option value='light'>Light</option>
                <option value='dark'>Dark</option>
              </select>
            </label>
          </div>
        </div>

        {/* Theme System */}
        <div className='control-section'>
          <h3>🎨 Theme System</h3>
          <div className='control-group'>
            <label className='control-item'>
              <span>Theme Preset:</span>
              <select value={config.themePreset} onChange={handleSelectChange('themePreset')} className='demo-select'>
                <option value='default'>Default Modern</option>
                <option value='material'>Material Design</option>
                <option value='minimal'>Minimal Clean</option>
                <option value='github'>GitHub Style</option>
                <option value='corporate'>Corporate</option>
                <option value='shadcn'>ShadCN/UI</option>
                <option value='glassmorphism'>Glassmorphism</option>
                <option value='uniform'>Uniform Background</option>
                <option value='custom'>🎨 Custom Builder</option>
              </select>
            </label>

            <label className='control-item'>
              <span>Theme Variant:</span>
              <select value={config.themeVariant} onChange={handleSelectChange('themeVariant')} className='demo-select'>
                <option value='light'>Light</option>
                <option value='dark'>Dark</option>
                <option value='auto'>Auto (System)</option>
              </select>
            </label>
          </div>

          {/* Custom Theme Builder */}
          {config.themePreset === 'custom' && (
            <div
              className='control-group'
              style={{
                marginTop: '16px',
                padding: '16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
              }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>🛠️ Custom Theme Builder</h4>

              <label className='control-item'>
                <span>Primary Color:</span>
                <input
                  type='color'
                  value={config.customTheme.primaryColor}
                  onChange={(e) =>
                    onConfigChange('customTheme', { ...config.customTheme, primaryColor: e.target.value })
                  }
                  className='demo-input'
                  style={{ width: '60px', height: '32px', padding: '2px', borderRadius: '4px' }}
                />
              </label>

              <label className='control-item'>
                <span>Background Color:</span>
                <input
                  type='color'
                  value={config.customTheme.backgroundColor}
                  onChange={(e) =>
                    onConfigChange('customTheme', { ...config.customTheme, backgroundColor: e.target.value })
                  }
                  className='demo-input'
                  style={{ width: '60px', height: '32px', padding: '2px', borderRadius: '4px' }}
                />
              </label>

              <label className='control-item'>
                <span>Header Color:</span>
                <input
                  type='color'
                  value={config.customTheme.headerColor}
                  onChange={(e) =>
                    onConfigChange('customTheme', { ...config.customTheme, headerColor: e.target.value })
                  }
                  className='demo-input'
                  style={{ width: '60px', height: '32px', padding: '2px', borderRadius: '4px' }}
                />
              </label>

              <label className='control-item'>
                <span>Border Radius:</span>
                <select
                  value={config.customTheme.borderRadius}
                  onChange={(e) =>
                    onConfigChange('customTheme', { ...config.customTheme, borderRadius: e.target.value })
                  }
                  className='demo-select'>
                  <option value='0px'>Sharp (0px)</option>
                  <option value='4px'>Small (4px)</option>
                  <option value='8px'>Medium (8px)</option>
                  <option value='12px'>Large (12px)</option>
                  <option value='16px'>Extra Large (16px)</option>
                </select>
              </label>

              <label className='control-item'>
                <span>Font Size:</span>
                <select
                  value={config.customTheme.fontSize}
                  onChange={(e) => onConfigChange('customTheme', { ...config.customTheme, fontSize: e.target.value })}
                  className='demo-select'>
                  <option value='12px'>Small (12px)</option>
                  <option value='13px'>Medium (13px)</option>
                  <option value='14px'>Large (14px)</option>
                  <option value='16px'>Extra Large (16px)</option>
                </select>
              </label>
            </div>
          )}
        </div>

        {/* Search Configuration */}
        <div className='control-section'>
          <h3>Search Configuration</h3>
          <div className='control-group'>
            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.enableGlobalSearch}
                onChange={handleCheckboxChange('enableGlobalSearch')}
                className='demo-checkbox'
              />
              <span>Enable Global Search</span>
            </label>

            <label className='control-item'>
              <span>Search Position:</span>
              <select
                value={config.searchPosition}
                onChange={handleSelectChange('searchPosition')}
                className='demo-select'
                disabled={!config.enableGlobalSearch}>
                <option value='top'>Top</option>
                <option value='bottom'>Bottom</option>
                <option value='none'>None</option>
              </select>
            </label>

            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.showSearchIcon}
                onChange={handleCheckboxChange('showSearchIcon')}
                className='demo-checkbox'
                disabled={!config.enableGlobalSearch}
              />
              <span>Show Search Icon</span>
            </label>
          </div>
        </div>

        {/* Data & Pagination */}
        <div className='control-section'>
          <h3>Data & Pagination</h3>
          <div className='control-group'>
            <label className='control-item'>
              <span>Data Size:</span>
              <select value={config.dataSize} onChange={handleSelectChange('dataSize')} className='demo-select'>
                <option value={10}>10 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
                <option value={500}>500 rows</option>
                <option value={1000}>1000 rows</option>
              </select>
            </label>

            <label className='control-item'>
              <span>Pagination Type:</span>
              <select
                value={config.paginationType}
                onChange={handleSelectChange('paginationType')}
                className='demo-select'>
                <option value='frontend'>Frontend</option>
                <option value='backend'>Backend (Simulated)</option>
              </select>
            </label>

            <label className='control-item'>
              <span>Page Size:</span>
              <select value={config.pageSize} onChange={handleSelectChange('pageSize')} className='demo-select'>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
          </div>
        </div>

        {/* Floating Action Dock */}
        <div className='control-section'>
          <h3>Floating Action Dock</h3>
          <div className='control-group'>
            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.enableFloatingDock}
                onChange={handleCheckboxChange('enableFloatingDock')}
                className='demo-checkbox'
                disabled={!config.enableRowSelection}
              />
              <span>Enable Floating Dock</span>
            </label>

            <label className='control-item'>
              <span>Dock Position:</span>
              <select
                value={config.floatingDockPosition}
                onChange={handleSelectChange('floatingDockPosition')}
                className='demo-select'
                disabled={!config.enableFloatingDock || !config.enableRowSelection}>
                <option value='bottom-left'>Bottom Left</option>
                <option value='bottom-center'>Bottom Center</option>
                <option value='bottom-right'>Bottom Right</option>
                <option value='top-left'>Top Left</option>
                <option value='top-center'>Top Center</option>
                <option value='top-right'>Top Right</option>
              </select>
            </label>

            <label className='control-item'>
              <input
                type='checkbox'
                checked={config.showSelectionCount}
                onChange={handleCheckboxChange('showSelectionCount')}
                className='demo-checkbox'
                disabled={!config.enableFloatingDock || !config.enableRowSelection}
              />
              <span>Show Selection Count</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
