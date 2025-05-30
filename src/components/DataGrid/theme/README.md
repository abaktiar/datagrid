# DataGrid Theme System

A comprehensive theming system for the DataGrid component that supports both CSS custom properties and JavaScript-based theme customization.

## Features

- 🎨 **Multiple Theme Presets** - 6+ built-in themes (Default, Material, Minimal, GitHub, Corporate, Glassmorphism)
- 🌓 **Light/Dark Mode Support** - Automatic system preference detection
- 🎯 **CSS Custom Properties** - Works with any CSS framework or vanilla CSS
- ⚡ **Runtime Theme Switching** - Change themes dynamically without page reload
- 🔧 **Deep Customization** - Override any aspect of the theme
- 📱 **Responsive Design** - Built-in responsive breakpoints
- ♿ **Accessibility** - High contrast mode and reduced motion support
- 🚀 **Framework Agnostic** - Works with or without Tailwind CSS

## Quick Start

### 1. Basic Usage with Theme Provider

```tsx
import React from 'react';
import { DataGrid, DataGridThemeProvider } from '@abaktiar/datagrid';

function App() {
  return (
    <DataGridThemeProvider defaultTheme="default" defaultVariant="light">
      <DataGrid data={data} columns={columns} />
    </DataGridThemeProvider>
  );
}
```

### 2. Using Predefined Themes

```tsx
import { DataGridThemeProvider } from '@abaktiar/datagrid';

// Available themes: default, material, minimal, github, corporate, glassmorphism
<DataGridThemeProvider defaultTheme="material" defaultVariant="dark">
  <DataGrid data={data} columns={columns} />
</DataGridThemeProvider>
```

### 3. Dynamic Theme Switching

```tsx
import { useDataGridTheme, getAvailableThemes } from '@abaktiar/datagrid';

function ThemeSelector() {
  const { setTheme, setVariant, currentTheme, variant } = useDataGridTheme();
  
  return (
    <div>
      <select onChange={(e) => setTheme(e.target.value)}>
        {getAvailableThemes().map(theme => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
      </select>
      
      <button onClick={() => setVariant(variant === 'light' ? 'dark' : 'light')}>
        Toggle {variant === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}
```

## Theme Customization

### CSS Custom Properties (Recommended)

The easiest way to customize themes is by overriding CSS custom properties:

```css
:root {
  /* Primary Colors */
  --datagrid-color-primary: #8b5cf6;
  --datagrid-color-primary-hover: #7c3aed;
  
  /* Background Colors */
  --datagrid-bg-primary: #ffffff;
  --datagrid-bg-header: #f8fafc;
  --datagrid-bg-hover: #f0f8ff;
  
  /* Text Colors */
  --datagrid-text-primary: #1e293b;
  --datagrid-text-secondary: #64748b;
  
  /* Spacing */
  --datagrid-cell-padding: 16px 20px;
  --datagrid-header-height: 52px;
  
  /* Typography */
  --datagrid-font-family: "SF Pro Display", system-ui, sans-serif;
  --datagrid-font-size-md: 14px;
  
  /* Borders */
  --datagrid-border-radius: 8px;
  --datagrid-border-color: #e2e8f0;
}

/* Dark theme overrides */
.datagrid-theme-dark {
  --datagrid-bg-primary: #0f172a;
  --datagrid-bg-header: #334155;
  --datagrid-text-primary: #f8fafc;
  --datagrid-border-color: #334155;
}
```

### JavaScript Theme API

For advanced customization, use the JavaScript API:

```tsx
import { createCustomTheme, defaultThemes } from '@abaktiar/datagrid';

// Create a custom theme
const myCustomTheme = createCustomTheme(defaultThemes.default.config, {
  shared: {
    typography: {
      fontFamily: '"Inter", sans-serif',
      fontSizeMd: '14px',
    },
    borders: {
      radius: '12px',
    }
  },
  light: {
    colors: {
      primary: '#ff6b6b',
      primaryHover: '#ff5252',
      bgPrimary: '#ffffff',
      bgHeader: '#f8f9fa',
      textPrimary: '#2d3748',
    }
  },
  dark: {
    colors: {
      primary: '#ff8a80',
      primaryHover: '#ff7043',
      bgPrimary: '#1a202c',
      bgHeader: '#2d3748',
      textPrimary: '#e2e8f0',
    }
  }
});

// Apply the theme
<DataGridThemeProvider defaultTheme={myCustomTheme}>
  <DataGrid data={data} columns={columns} />
</DataGridThemeProvider>
```

### Runtime Theme Updates

```tsx
import { useDataGridTheme } from '@abaktiar/datagrid';

function CustomThemeControls() {
  const { customizeTheme, resetTheme } = useDataGridTheme();
  
  const applyGreenTheme = () => {
    customizeTheme({
      light: {
        colors: {
          primary: '#10b981',
          primaryHover: '#059669',
          bgAccent: '#10b981',
        }
      }
    });
  };
  
  return (
    <div>
      <button onClick={applyGreenTheme}>Apply Green Theme</button>
      <button onClick={resetTheme}>Reset to Default</button>
    </div>
  );
}
```

## Available CSS Custom Properties

### Colors
```css
/* Background Colors */
--datagrid-bg-primary: Main background color
--datagrid-bg-secondary: Secondary background (striped rows)
--datagrid-bg-header: Header background
--datagrid-bg-hover: Hover state background
--datagrid-bg-row-hover: Row hover background
--datagrid-bg-cell-focus: Focused cell background
--datagrid-bg-selected: Selected row background
--datagrid-bg-accent: Accent color background

/* Text Colors */
--datagrid-text-primary: Primary text color
--datagrid-text-secondary: Secondary text color
--datagrid-text-muted: Muted text color
--datagrid-text-accent: Accent text color
--datagrid-text-inverse: Inverse text color (for dark backgrounds)

/* Border Colors */
--datagrid-border-color: Default border color
--datagrid-border-header: Header border color
--datagrid-border-focus: Focus state border color
--datagrid-border-accent: Accent border color

/* Button Colors */
--datagrid-button-primary: Primary button background
--datagrid-button-primary-hover: Primary button hover state
--datagrid-button-secondary: Secondary button background
--datagrid-button-secondary-hover: Secondary button hover state
--datagrid-button-danger: Danger button background
--datagrid-button-success: Success button background
```

### Typography
```css
--datagrid-font-family: Main font family
--datagrid-font-family-mono: Monospace font family
--datagrid-font-size-xs: Extra small font size (11px)
--datagrid-font-size-sm: Small font size (12px)
--datagrid-font-size-md: Medium font size (13px)
--datagrid-font-size-lg: Large font size (14px)
--datagrid-font-size-xl: Extra large font size (16px)
--datagrid-font-weight-normal: Normal font weight (400)
--datagrid-font-weight-medium: Medium font weight (500)
--datagrid-font-weight-semibold: Semibold font weight (600)
--datagrid-font-weight-bold: Bold font weight (700)
```

### Spacing
```css
--datagrid-spacing-xs: Extra small spacing (4px)
--datagrid-spacing-sm: Small spacing (8px)
--datagrid-spacing-md: Medium spacing (12px)
--datagrid-spacing-lg: Large spacing (16px)
--datagrid-spacing-xl: Extra large spacing (20px)
--datagrid-spacing-xxl: Extra extra large spacing (24px)
```

### Component Dimensions
```css
--datagrid-header-height: Header row height (48px)
--datagrid-header-padding: Header cell padding (12px 16px)
--datagrid-cell-padding: Body cell padding (12px 16px)
--datagrid-cell-min-height: Minimum cell height (44px)
--datagrid-floating-dock-border-radius: Floating dock border radius (12px)
--datagrid-floating-dock-padding: Floating dock padding (12px 20px)
--datagrid-pagination-height: Pagination bar height (52px)
--datagrid-filter-height: Filter input height (32px)
```

### Borders & Shadows
```css
--datagrid-border-width: Default border width (1px)
--datagrid-border-radius: Default border radius (6px)
--datagrid-border-radius-sm: Small border radius (4px)
--datagrid-border-radius-lg: Large border radius (8px)
--datagrid-shadow-sm: Small shadow
--datagrid-shadow-md: Medium shadow
--datagrid-shadow-lg: Large shadow
--datagrid-shadow-focus: Focus state shadow
```

## Density Modes

Control the spacing and size of table elements:

```tsx
<DataGrid 
  data={data} 
  columns={columns} 
  density="compact" // compact | comfortable | spacious
/>
```

Or with CSS:
```css
.datagrid-density-compact {
  --datagrid-cell-padding: 8px 12px;
  --datagrid-font-size-md: 12px;
}

.datagrid-density-spacious {
  --datagrid-cell-padding: 16px 20px;
  --datagrid-font-size-md: 14px;
}
```

## Tailwind CSS Integration

If you're using Tailwind CSS, you can map CSS custom properties to Tailwind classes:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'datagrid': {
          primary: 'var(--datagrid-color-primary)',
          bg: 'var(--datagrid-bg-primary)',
          text: 'var(--datagrid-text-primary)',
          border: 'var(--datagrid-border-color)',
        }
      },
      fontFamily: {
        'datagrid': 'var(--datagrid-font-family)',
      },
      spacing: {
        'datagrid-sm': 'var(--datagrid-spacing-sm)',
        'datagrid-md': 'var(--datagrid-spacing-md)',
        'datagrid-lg': 'var(--datagrid-spacing-lg)',
      }
    }
  }
}
```

Then use in your components:
```tsx
<div className="bg-datagrid-bg text-datagrid-text border-datagrid-border">
  Custom styled content matching DataGrid theme
</div>
```

## Theme Presets

### Default (Modern)
- Clean, contemporary design
- Blue accent colors
- Optimized for readability and modern interfaces

### Material Design
- Google Material Design principles
- Roboto font family
- Characteristic shadows and animations

### Minimal
- Ultra-clean design
- No rounded corners
- Black/white color scheme
- Perfect for professional documents

### GitHub
- GitHub interface inspired
- System fonts
- Subtle backgrounds and borders

### Corporate
- Professional business design
- Conservative color palette
- Optimized for corporate environments

### Glassmorphism
- Modern translucent design
- Backdrop blur effects
- Frosted glass appearance

## System Integration

### Automatic Theme Detection
```tsx
import { getSystemTheme, watchSystemTheme } from '@abaktiar/datagrid';

// Get current system preference
const systemTheme = getSystemTheme(); // 'light' | 'dark'

// Watch for changes
const unsubscribe = watchSystemTheme((theme) => {
  console.log('System theme changed to:', theme);
});

// Cleanup
unsubscribe();
```

### Theme Export/Import
```tsx
import { exportThemeAsCSS } from '@abaktiar/datagrid';

// Export current theme as CSS
const cssString = exportThemeAsCSS(currentTheme, 'light');
console.log(cssString);
// Output: :root { --datagrid-color-primary: #3b82f6; ... }
```

## Accessibility Features

The theme system includes built-in accessibility features:

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --datagrid-border-width: 2px;
    --datagrid-text-primary: #000000;
    --datagrid-border-color: #000000;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .datagrid-container * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management
All interactive elements have proper focus indicators using CSS custom properties:
```css
.datagrid-checkbox:focus {
  box-shadow: var(--datagrid-shadow-focus);
}
```

## Best Practices

### 1. Use Theme Provider at App Level
```tsx
// App.tsx
function App() {
  return (
    <DataGridThemeProvider defaultTheme="default" defaultVariant="auto">
      <Router>
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
    </DataGridThemeProvider>
  );
}
```

### 2. Create Brand-Consistent Themes
```tsx
const brandTheme = createCustomTheme(defaultThemes.default.config, {
  shared: {
    typography: {
      fontFamily: '"Your Brand Font", sans-serif',
    }
  },
  light: {
    colors: {
      primary: '#your-brand-color',
      primaryHover: '#your-brand-color-hover',
    }
  }
});
```

### 3. Test Accessibility
- Test with high contrast mode enabled
- Verify keyboard navigation works
- Check color contrast ratios
- Test with screen readers

### 4. Performance Optimization
- Use CSS custom properties instead of JavaScript theme switching when possible
- Minimize theme object creation in render functions
- Memoize theme configurations

## Migration Guide

### From v1.x CSS Classes
If you were using custom CSS classes with the old version:

**Before:**
```css
.datagrid-table {
  background: #ffffff;
}
.datagrid-header {
  background: #f5f5f5;
}
```

**After:**
```css
:root {
  --datagrid-bg-primary: #ffffff;
  --datagrid-bg-header: #f5f5f5;
}
```

### From Inline Styles
**Before:**
```tsx
<DataGrid 
  tableClassName="custom-table"
  headerClassName="custom-header"
/>
```

**After:**
```tsx
<DataGridThemeProvider 
  defaultTheme={customTheme}
  defaultVariant="light"
>
  <DataGrid data={data} columns={columns} />
</DataGridThemeProvider>
```

## API Reference

### Components

#### `DataGridThemeProvider`
```tsx
interface DataGridThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string | DataGridTheme;
  defaultVariant?: ThemeVariant;
  containerRef?: React.RefObject<HTMLElement>;
}
```

### Hooks

#### `useDataGridTheme()`
```tsx
interface ThemeContextValue {
  currentTheme: DataGridTheme;
  variant: ThemeVariant;
  setTheme: (theme: DataGridTheme | string) => void;
  setVariant: (variant: ThemeVariant) => void;
  customizeTheme: (customizations: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}
```

#### `useThemeVars()`
```tsx
interface ThemeVarsValue {
  getCSSVar: (key: string) => string | undefined;
  getAllVars: () => Record<string, string>;
}
```

### Utility Functions

#### `createCustomTheme(baseConfig, customizations)`
Creates a new theme by merging customizations with a base theme.

#### `applyThemeToDOM(theme, variant, container?)`
Applies theme CSS custom properties to the DOM.

#### `getSystemTheme()`
Returns the current system theme preference.

#### `watchSystemTheme(callback)`
Watches for system theme changes.

#### `exportThemeAsCSS(theme, variant)`
Exports a theme as a CSS string.

## Examples

Check out the complete examples in the `/examples` directory:
- `ThemeCustomizationExample.tsx` - Comprehensive theming demo
- Basic theme switching
- Custom theme creation
- CSS customization examples

## Contributing

When contributing to the theme system:

1. Ensure new CSS custom properties follow the `--datagrid-*` naming convention
2. Add both light and dark variants for color properties
3. Update type definitions in `types.ts`
4. Test with all predefined themes
5. Verify accessibility compliance
6. Update documentation

## License

MIT License - see LICENSE file for details.