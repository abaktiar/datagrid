import React from 'react'
import './DemoControls.css'

interface DemoConfig {
  enableSorting: boolean
  enableFiltering: boolean
  enablePagination: boolean
  enableRowSelection: boolean
  enableColumnResizing: boolean
  enableGlobalSearch: boolean
  density: 'compact' | 'comfortable' | 'spacious'
  theme: 'light' | 'dark'
  pageSize: number
  paginationType: 'frontend' | 'backend'
  dataSize: number
  searchPosition: 'top' | 'bottom' | 'none'
  searchPlaceholder: string
  showSearchIcon: boolean
  searchDebounce: number
}

interface DemoControlsProps {
  config: DemoConfig
  onConfigChange: (key: string, value: any) => void
}

export function DemoControls({ config, onConfigChange }: DemoControlsProps) {
  const handleCheckboxChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange(key, e.target.checked)
  }

  const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    onConfigChange(key, e.target.value)
  }

  const handleNumberChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange(key, parseInt(e.target.value))
  }

  return (
    <div className={`demo-controls datagrid-theme-${config.theme}`}>
      <h2>DataGrid Configuration</h2>

      <div className="controls-grid">
        {/* Feature Toggles */}
        <div className="control-section">
          <h3>Features</h3>
          <div className="control-group">
            <label className="control-item">
              <input
                type="checkbox"
                checked={config.enableSorting}
                onChange={handleCheckboxChange('enableSorting')}
                className="demo-checkbox"
              />
              <span>Enable Sorting</span>
            </label>

            <label className="control-item">
              <input
                type="checkbox"
                checked={config.enableFiltering}
                onChange={handleCheckboxChange('enableFiltering')}
                className="demo-checkbox"
              />
              <span>Enable Filtering</span>
            </label>

            <label className="control-item">
              <input
                type="checkbox"
                checked={config.enablePagination}
                onChange={handleCheckboxChange('enablePagination')}
                className="demo-checkbox"
              />
              <span>Enable Pagination</span>
            </label>

            <label className="control-item">
              <input
                type="checkbox"
                checked={config.enableRowSelection}
                onChange={handleCheckboxChange('enableRowSelection')}
                className="demo-checkbox"
              />
              <span>Enable Row Selection</span>
            </label>
          </div>
        </div>

        {/* Column Features */}
        <div className="control-section">
          <h3>Column Features</h3>
          <div className="control-group">
            <label className="control-item">
              <input
                type="checkbox"
                checked={config.enableColumnResizing}
                onChange={handleCheckboxChange('enableColumnResizing')}
                className="demo-checkbox"
              />
              <span>Column Resizing</span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="control-section">
          <h3>Appearance</h3>
          <div className="control-group">
            <label className="control-item">
              <span>Density:</span>
              <select
                value={config.density}
                onChange={handleSelectChange('density')}
                className="demo-select"
              >
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </label>

            <label className="control-item">
              <span>Theme:</span>
              <select
                value={config.theme}
                onChange={handleSelectChange('theme')}
                className="demo-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
        </div>

        {/* Search Configuration */}
        <div className="control-section">
          <h3>Search Configuration</h3>
          <div className="control-group">
            <label className="control-item">
              <input
                type="checkbox"
                checked={config.enableGlobalSearch}
                onChange={handleCheckboxChange('enableGlobalSearch')}
                className="demo-checkbox"
              />
              <span>Enable Global Search</span>
            </label>

            <label className="control-item">
              <span>Search Position:</span>
              <select
                value={config.searchPosition}
                onChange={handleSelectChange('searchPosition')}
                className="demo-select"
                disabled={!config.enableGlobalSearch}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="none">None</option>
              </select>
            </label>

            <label className="control-item">
              <input
                type="checkbox"
                checked={config.showSearchIcon}
                onChange={handleCheckboxChange('showSearchIcon')}
                className="demo-checkbox"
                disabled={!config.enableGlobalSearch}
              />
              <span>Show Search Icon</span>
            </label>
          </div>
        </div>

        {/* Data & Pagination */}
        <div className="control-section">
          <h3>Data & Pagination</h3>
          <div className="control-group">
            <label className="control-item">
              <span>Data Size:</span>
              <select
                value={config.dataSize}
                onChange={handleSelectChange('dataSize')}
                className="demo-select"
              >
                <option value={10}>10 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
                <option value={500}>500 rows</option>
                <option value={1000}>1000 rows</option>
              </select>
            </label>

            <label className="control-item">
              <span>Pagination Type:</span>
              <select
                value={config.paginationType}
                onChange={handleSelectChange('paginationType')}
                className="demo-select"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend (Simulated)</option>
              </select>
            </label>

            <label className="control-item">
              <span>Page Size:</span>
              <select
                value={config.pageSize}
                onChange={handleSelectChange('pageSize')}
                className="demo-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
