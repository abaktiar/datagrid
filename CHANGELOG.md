# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-05-29

### Added
- 🚀 **Floating Action Dock** - A powerful floating button system for bulk operations on selected rows
- 🎨 **Button Customization System** - Complete customization support for floating action buttons
  - Custom icons (text or React components)
  - Built-in color variants (primary, success, danger, default)
  - Custom CSS classes
  - Complete custom button components
- 📊 **Enhanced Export Functions**
  - `createExportSelectedToExcelAction()` - Excel export for selected rows with full customization
  - `createExportSelectedToCSVAction()` - CSV export for selected rows with customization
  - `createFloatingActionSeparator()` - Visual separators for organizing floating actions
  - `createCommonFloatingActions()` - Bundle of common floating actions
- ⚡ **Smooth Animations** - Polished enter/exit animations for floating dock
  - Slide-up entrance animation
  - Smooth slide-down exit animation
  - No jitter or visual glitches
  - Configurable animation timing
- 🔧 **Flexible Configuration Options**
  - Dock positioning (6 positions: top/bottom + left/center/right)
  - Show/hide selection count
  - Custom styling support
  - Mixed action types (built-in + custom)
- 📚 **Comprehensive Examples**
  - Material Design style buttons
  - Glassmorphism style buttons
  - Neon/Gaming theme buttons
  - Corporate vs Gaming theme comparisons
  - Complete customization documentation

### Enhanced
- **Package Description** - Updated to highlight floating action dock capabilities
- **Keywords** - Added relevant npm keywords for better discoverability
- **TypeScript Support** - Enhanced type definitions for floating actions
- **Documentation** - Comprehensive README updates with examples and API reference

### Technical Improvements
- **Performance** - Optimized re-renders and animation performance
- **Memory Management** - Proper cleanup of floating dock state
- **Accessibility** - Support for custom ARIA attributes through custom components
- **Theme Support** - Floating dock respects light/dark theme settings

## [1.0.1] - 2025-05-28

### Fixed
- Bug fixes and performance improvements
- Enhanced TypeScript definitions
- Improved error handling

## [1.0.0] - 2025-05-27

### Added
- Initial release of @abaktiar/datagrid
- 🎯 **Full TypeScript Support** - Comprehensive type definitions
- ⚡ **TanStack Table Integration** - High-performance table with virtualization
- 🎨 **Multiple Themes** - Light, dark, and auto themes
- 📊 **Rich Data Operations** - Sorting, filtering, pagination, global search
- 🖱️ **Context Menus** - Right-click context menus for cells and tables
- 📤 **Excel Export** - Comprehensive Excel export functionality
- 🔧 **Flexible Configuration** - Extensive customization options
- 📱 **Responsive Design** - Mobile-friendly with overflow handling
- 🎛️ **Advanced Features** - Row selection, column resizing, density options

### Features
- Column sorting and filtering
- Global search functionality
- Row selection (single and multiple)
- Column resizing
- Pagination (frontend and backend)
- Context menu system
- Excel/CSV/JSON export
- Multiple density options
- Theme system
- Virtualization for large datasets

---

## [Unreleased]

### Planned Features
- More built-in floating action utilities
- Drag and drop support
- Advanced filtering UI
- Column grouping
- Row grouping
- Tree data support
- More export formats
- Advanced theming system