# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-05-28

### Added
- Initial release of @abaktiar/datagrid
- Comprehensive React DataGrid component with TypeScript support
- Built on TanStack Table v8 for high performance
- Full feature set including:
  - **Data Operations**: Sorting, filtering, pagination, global search
  - **Row Selection**: Single and multi-row selection support
  - **Column Features**: Resizing, hiding, custom formatting
  - **Context Menus**: Rich right-click menus for cells and tables
  - **Export Capabilities**: CSV, JSON, and Excel export functionality
  - **Theming**: Light/dark themes with multiple density options
  - **Responsive Design**: Mobile-friendly with overflow handling
  - **Performance**: Virtualization support for large datasets
  - **Accessibility**: ARIA compliance and keyboard navigation
  - **Customization**: Extensive styling and behavior customization options

### Features
- **Core DataGrid Component**: Main table component with comprehensive props
- **TypeScript Support**: Full type definitions for all interfaces and props
- **Context Menu Utilities**: Pre-built actions for common operations
- **Excel Export Utilities**: Advanced Excel export with formatting options
- **Styling System**: CSS custom properties for easy theming
- **Event Handlers**: Comprehensive callback system for user interactions
- **Loading States**: Built-in loading indicators and empty state handling
- **Search Configuration**: Flexible global search with debouncing
- **Server-Side Operations**: Support for manual pagination, sorting, and filtering

### Technical Details
- Built with React 19+ and TypeScript 5.8+
- Uses @tanstack/react-table ^8.21.3 for table logic
- Includes @tanstack/react-virtual ^3.13.9 for virtualization
- XLSX ^0.18.5 for Excel export functionality
- Vite-based build system with optimized output
- ESM and CJS module formats supported
- CSS included with optional import
- Comprehensive TypeScript declarations

### Package Information
- Package name: `@abaktiar/datagrid`
- Author: abaktiar
- License: MIT
- Repository: https://github.com/abaktiar/datagrid
- NPM: https://www.npmjs.com/package/@abaktiar/datagrid

## [Unreleased]

### Planned Features
- Inline editing support
- Expandable rows functionality
- Column grouping and aggregation
- Virtual scrolling for columns
- Advanced filtering UI
- Print optimization
- Additional export formats (PDF)
- Advanced theming system
- RTL language support