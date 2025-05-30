import type { DataGridTheme, ThemeConfig, ThemeCustomization } from './types';

// Default/Modern theme
const defaultTheme: DataGridTheme = {
  name: 'default',
  displayName: 'Default Modern',
  description: 'Clean, modern design inspired by contemporary data interfaces',
  config: {
    shared: {
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
      },
      typography: {
        fontFamily: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif',
        fontFamilyMono: '"JetBrains Mono", "Fira Code", "Monaco", "Consolas", monospace',
        fontSizeXs: '11px',
        fontSizeSm: '12px',
        fontSizeMd: '13px',
        fontSizeLg: '14px',
        fontSizeXl: '16px',
        fontWeightNormal: '400',
        fontWeightMedium: '500',
        fontWeightSemibold: '600',
        fontWeightBold: '700',
        lineHeightTight: '1.25',
        lineHeightNormal: '1.5',
        lineHeightRelaxed: '1.75',
      },
      borders: {
        width: '1px',
        widthThick: '2px',
        radius: '6px',
        radiusSm: '4px',
        radiusLg: '8px',
        radiusFull: '9999px',
      },
      shadows: {
        none: 'none',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        inner: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        focus: '0 0 0 3px rgba(59, 130, 246, 0.15)',
      },
      transitions: {
        fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      zIndex: {
        dropdown: 1000,
        tooltip: 1100,
        modal: 1200,
        popover: 1300,
        overlay: 1400,
        max: 9999,
      },
      components: {
        headerHeight: '48px',
        headerPadding: '12px 16px',
        headerBorderRadius: '6px 6px 0 0',
        cellPadding: '12px 16px',
        cellMinHeight: '44px',
        floatingDockBorderRadius: '12px',
        floatingDockPadding: '12px 20px',
        floatingDockShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        floatingDockBackdrop: 'blur(10px)',
        paginationHeight: '52px',
        paginationPadding: '12px 16px',
        filterHeight: '32px',
        filterPadding: '0 8px',
      },
      cssVars: {
        '--datagrid-font-family': '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif',
        '--datagrid-border-radius': '6px',
        '--datagrid-border-width': '1px',
        '--datagrid-transition': '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    light: {
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8fafc',
        bgHeader: '#f1f5f9',
        bgHover: '#f0f8ff',
        bgRowHover: '#f5f9ff',
        bgCellFocus: '#fff2cc',
        bgSelected: '#e7f3ff',
        bgAccent: '#3b82f6',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        textMuted: '#94a3b8',
        textAccent: '#3b82f6',
        textInverse: '#ffffff',
        borderColor: '#e2e8f0',
        borderHeader: '#cbd5e1',
        borderFocus: '#3b82f6',
        borderAccent: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        primaryLight: '#dbeafe',
        buttonPrimary: '#3b82f6',
        buttonPrimaryHover: '#2563eb',
        buttonSecondary: '#e2e8f0',
        buttonSecondaryHover: '#cbd5e1',
        buttonDanger: '#ef4444',
        buttonDangerHover: '#dc2626',
        buttonSuccess: '#10b981',
        buttonSuccessHover: '#059669',
      },
      cssVars: {
        '--datagrid-bg-primary': '#ffffff',
        '--datagrid-bg-header': '#f1f5f9',
        '--datagrid-bg-hover': '#f0f8ff',
        '--datagrid-text-primary': '#1e293b',
        '--datagrid-text-secondary': '#64748b',
        '--datagrid-border-color': '#e2e8f0',
        '--datagrid-accent-color': '#3b82f6',
      },
    },
    dark: {
      colors: {
        bgPrimary: '#0f172a',
        bgSecondary: '#1e293b',
        bgHeader: '#334155',
        bgHover: '#475569',
        bgRowHover: '#374151',
        bgCellFocus: '#4b5563',
        bgSelected: '#1e40af',
        bgAccent: '#3b82f6',
        textPrimary: '#f8fafc',
        textSecondary: '#cbd5e1',
        textMuted: '#94a3b8',
        textAccent: '#60a5fa',
        textInverse: '#0f172a',
        borderColor: '#334155',
        borderHeader: '#475569',
        borderFocus: '#3b82f6',
        borderAccent: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        primaryLight: '#1e40af',
        buttonPrimary: '#3b82f6',
        buttonPrimaryHover: '#2563eb',
        buttonSecondary: '#374151',
        buttonSecondaryHover: '#4b5563',
        buttonDanger: '#ef4444',
        buttonDangerHover: '#dc2626',
        buttonSuccess: '#10b981',
        buttonSuccessHover: '#059669',
      },
      cssVars: {
        '--datagrid-bg-primary': '#0f172a',
        '--datagrid-bg-header': '#334155',
        '--datagrid-bg-hover': '#475569',
        '--datagrid-text-primary': '#f8fafc',
        '--datagrid-text-secondary': '#cbd5e1',
        '--datagrid-border-color': '#334155',
        '--datagrid-accent-color': '#3b82f6',
      },
    },
  },
};

// Material Design theme
const materialTheme: DataGridTheme = {
  name: 'material',
  displayName: 'Material Design',
  description: 'Google Material Design inspired theme with elevation and depth',
  config: {
    ...defaultTheme.config,
    shared: {
      ...defaultTheme.config.shared,
      typography: {
        ...defaultTheme.config.shared.typography,
        fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
        fontWeightMedium: '500',
        fontWeightBold: '700',
      },
      borders: {
        ...defaultTheme.config.shared.borders,
        radius: '4px',
        radiusSm: '2px',
        radiusLg: '8px',
      },
      shadows: {
        ...defaultTheme.config.shared.shadows,
        sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        focus: '0 0 0 2px rgba(33, 150, 243, 0.3)',
      },
      components: {
        ...defaultTheme.config.shared.components,
        headerHeight: '56px',
        headerPadding: '16px 24px',
        cellPadding: '16px 24px',
        cellMinHeight: '52px',
      },
    },
    light: {
      ...defaultTheme.config.light,
      colors: {
        ...defaultTheme.config.light.colors,
        bgPrimary: '#fafafa',
        bgSecondary: '#f5f5f5',
        bgHeader: '#e3f2fd',
        bgHover: '#bbdefb',
        bgRowHover: '#e1f5fe',
        bgCellFocus: '#fff3e0',
        bgSelected: '#e8f5e8',
        primary: '#1976d2',
        primaryHover: '#1565c0',
        primaryLight: '#e3f2fd',
        bgAccent: '#1976d2',
        textPrimary: '#212121',
        textSecondary: '#757575',
        textAccent: '#1976d2',
        borderColor: '#e0e0e0',
        borderHeader: '#bbdefb',
        borderAccent: '#1976d2',
        buttonPrimary: '#1976d2',
        buttonPrimaryHover: '#1565c0',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
      },
      cssVars: {
        '--datagrid-bg-primary': '#fafafa',
        '--datagrid-bg-header': '#e3f2fd',
        '--datagrid-bg-hover': '#bbdefb',
        '--datagrid-text-primary': '#212121',
        '--datagrid-text-secondary': '#757575',
        '--datagrid-border-color': '#e0e0e0',
        '--datagrid-accent-color': '#1976d2',
      },
    },
    dark: {
      ...defaultTheme.config.dark,
      colors: {
        ...defaultTheme.config.dark.colors,
        bgPrimary: '#121212',
        bgSecondary: '#1e1e1e',
        bgHeader: '#263238',
        bgHover: '#37474f',
        bgRowHover: '#424242',
        bgCellFocus: '#455a64',
        bgSelected: '#2e7d32',
        primary: '#90caf9',
        primaryHover: '#64b5f6',
        primaryLight: '#1565c0',
        bgAccent: '#90caf9',
        textPrimary: '#ffffff',
        textSecondary: '#b0bec5',
        textAccent: '#90caf9',
        borderColor: '#424242',
        borderHeader: '#37474f',
        borderAccent: '#90caf9',
        buttonPrimary: '#90caf9',
        buttonPrimaryHover: '#64b5f6',
        success: '#66bb6a',
        warning: '#ffb74d',
        error: '#ef5350',
      },
      cssVars: {
        '--datagrid-bg-primary': '#121212',
        '--datagrid-bg-header': '#263238',
        '--datagrid-bg-hover': '#37474f',
        '--datagrid-text-primary': '#ffffff',
        '--datagrid-text-secondary': '#b0bec5',
        '--datagrid-border-color': '#424242',
        '--datagrid-accent-color': '#90caf9',
      },
    },
  },
};

// Minimal theme
const minimalTheme: DataGridTheme = {
  name: 'minimal',
  displayName: 'Minimal Clean',
  description: 'Ultra-clean minimal design with subtle accents',
  config: {
    ...defaultTheme.config,
    shared: {
      ...defaultTheme.config.shared,
      borders: {
        ...defaultTheme.config.shared.borders,
        width: '1px',
        radius: '0px',
        radiusSm: '0px',
        radiusLg: '0px',
      },
      shadows: {
        ...defaultTheme.config.shared.shadows,
        sm: 'none',
        md: '0 1px 3px rgba(0, 0, 0, 0.1)',
        lg: '0 2px 6px rgba(0, 0, 0, 0.1)',
      },
    },
    light: {
      ...defaultTheme.config.light,
      colors: {
        ...defaultTheme.config.light.colors,
        bgHeader: '#ffffff',
        bgHover: '#f9fafb',
        bgRowHover: '#f9fafb',
        borderColor: '#e5e7eb',
        borderHeader: '#e5e7eb',
        primary: '#000000',
        primaryHover: '#374151',
        textAccent: '#000000',
        borderAccent: '#000000',
        buttonPrimary: '#000000',
        buttonPrimaryHover: '#374151',
      },
    },
  },
};

// GitHub theme
const githubTheme: DataGridTheme = {
  name: 'github',
  displayName: 'GitHub Style',
  description: 'GitHub interface inspired design',
  config: {
    ...defaultTheme.config,
    shared: {
      ...defaultTheme.config.shared,
      typography: {
        ...defaultTheme.config.shared.typography,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      },
    },
    light: {
      ...defaultTheme.config.light,
      colors: {
        ...defaultTheme.config.light.colors,
        bgPrimary: '#ffffff',
        bgHeader: '#f6f8fa',
        bgHover: '#f6f8fa',
        bgRowHover: '#f6f8fa',
        borderColor: '#d0d7de',
        borderHeader: '#d0d7de',
        textPrimary: '#24292f',
        textSecondary: '#57606a',
        primary: '#0969da',
        primaryHover: '#0860ca',
        textAccent: '#0969da',
        borderAccent: '#0969da',
        buttonPrimary: '#0969da',
        buttonPrimaryHover: '#0860ca',
      },
    },
    dark: {
      ...defaultTheme.config.dark,
      colors: {
        ...defaultTheme.config.dark.colors,
        bgPrimary: '#0d1117',
        bgHeader: '#161b22',
        bgHover: '#21262d',
        bgRowHover: '#21262d',
        borderColor: '#30363d',
        borderHeader: '#30363d',
        textPrimary: '#f0f6fc',
        textSecondary: '#8b949e',
        primary: '#58a6ff',
        primaryHover: '#409eff',
        textAccent: '#58a6ff',
        borderAccent: '#58a6ff',
        buttonPrimary: '#58a6ff',
        buttonPrimaryHover: '#409eff',
      },
    },
  },
};

// Corporate theme
const corporateTheme: DataGridTheme = {
  name: 'corporate',
  displayName: 'Corporate Professional',
  description: 'Professional corporate design for business applications',
  config: {
    ...defaultTheme.config,
    light: {
      ...defaultTheme.config.light,
      colors: {
        ...defaultTheme.config.light.colors,
        bgPrimary: '#ffffff',
        bgHeader: '#f8f9fa',
        bgHover: '#e9ecef',
        bgRowHover: '#f8f9fa',
        borderColor: '#dee2e6',
        borderHeader: '#ced4da',
        textPrimary: '#212529',
        textSecondary: '#6c757d',
        primary: '#0d6efd',
        primaryHover: '#0b5ed7',
        textAccent: '#0d6efd',
        borderAccent: '#0d6efd',
        buttonPrimary: '#0d6efd',
        buttonPrimaryHover: '#0b5ed7',
      },
    },
  },
};

// ShadCN theme
const shadcnTheme: DataGridTheme = {
  name: 'shadcn',
  displayName: 'ShadCN/UI',
  description: 'Modern design system inspired by shadcn/ui components',
  config: {
    ...defaultTheme.config,
    shared: {
      ...defaultTheme.config.shared,
      typography: {
        ...defaultTheme.config.shared.typography,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      },
      borders: {
        ...defaultTheme.config.shared.borders,
        radius: '8px',
        radiusSm: '6px',
        radiusLg: '12px',
      },
      shadows: {
        ...defaultTheme.config.shared.shadows,
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        focus: '0 0 0 2px rgb(0 0 0), 0 0 0 4px hsl(210 40% 96%)',
      },
      components: {
        ...defaultTheme.config.shared.components,
        headerHeight: '40px',
        headerPadding: '8px 12px',
        cellPadding: '8px 12px',
        cellMinHeight: '40px',
      },
    },
    light: {
      ...defaultTheme.config.light,
      colors: {
        ...defaultTheme.config.light.colors,
        bgPrimary: 'hsl(0 0% 100%)',
        bgSecondary: 'hsl(210 40% 98%)',
        bgHeader: 'hsl(210 40% 98%)',
        bgHover: 'hsl(210 40% 96%)',
        bgRowHover: 'hsl(210 40% 96%)',
        bgCellFocus: 'hsl(210 40% 96%)',
        bgSelected: 'hsl(210 40% 96%)',
        bgAccent: 'hsl(222.2 84% 4.9%)',
        textPrimary: 'hsl(222.2 84% 4.9%)',
        textSecondary: 'hsl(215.4 16.3% 46.9%)',
        textMuted: 'hsl(215.4 16.3% 46.9%)',
        textAccent: 'hsl(222.2 84% 4.9%)',
        textInverse: 'hsl(210 40% 98%)',
        borderColor: 'hsl(214.3 31.8% 91.4%)',
        borderHeader: 'hsl(214.3 31.8% 91.4%)',
        borderFocus: 'hsl(222.2 84% 4.9%)',
        borderAccent: 'hsl(222.2 84% 4.9%)',
        primary: 'hsl(222.2 84% 4.9%)',
        primaryHover: 'hsl(222.2 84% 4.9% / 0.9)',
        primaryLight: 'hsl(210 40% 96%)',
        buttonPrimary: 'hsl(222.2 84% 4.9%)',
        buttonPrimaryHover: 'hsl(222.2 84% 4.9% / 0.9)',
        buttonSecondary: 'hsl(210 40% 96%)',
        buttonSecondaryHover: 'hsl(210 40% 94%)',
        success: 'hsl(142.1 76.2% 36.3%)',
        warning: 'hsl(47.9 95.8% 53.1%)',
        error: 'hsl(0 84.2% 60.2%)',
        info: 'hsl(221.2 83.2% 53.3%)',
      },
      cssVars: {
        '--datagrid-bg-primary': 'hsl(0 0% 100%)',
        '--datagrid-bg-header': 'hsl(210 40% 98%)',
        '--datagrid-bg-hover': 'hsl(210 40% 96%)',
        '--datagrid-text-primary': 'hsl(222.2 84% 4.9%)',
        '--datagrid-text-secondary': 'hsl(215.4 16.3% 46.9%)',
        '--datagrid-border-color': 'hsl(214.3 31.8% 91.4%)',
        '--datagrid-accent-color': 'hsl(222.2 84% 4.9%)',
      },
    },
    dark: {
      ...defaultTheme.config.dark,
      colors: {
        ...defaultTheme.config.dark.colors,
        bgPrimary: 'hsl(222.2 84% 4.9%)',
        bgSecondary: 'hsl(217.2 32.6% 17.5%)',
        bgHeader: 'hsl(217.2 32.6% 17.5%)',
        bgHover: 'hsl(215 27.9% 16.9%)',
        bgRowHover: 'hsl(215 27.9% 16.9%)',
        bgCellFocus: 'hsl(215 27.9% 16.9%)',
        bgSelected: 'hsl(215 27.9% 16.9%)',
        bgAccent: 'hsl(210 40% 98%)',
        textPrimary: 'hsl(210 40% 98%)',
        textSecondary: 'hsl(215 20.2% 65.1%)',
        textMuted: 'hsl(215.4 16.3% 56.9%)',
        textAccent: 'hsl(210 40% 98%)',
        textInverse: 'hsl(222.2 84% 4.9%)',
        borderColor: 'hsl(217.2 32.6% 17.5%)',
        borderHeader: 'hsl(217.2 32.6% 17.5%)',
        borderFocus: 'hsl(210 40% 98%)',
        borderAccent: 'hsl(210 40% 98%)',
        primary: 'hsl(210 40% 98%)',
        primaryHover: 'hsl(210 40% 98% / 0.9)',
        primaryLight: 'hsl(215 27.9% 16.9%)',
        buttonPrimary: 'hsl(210 40% 98%)',
        buttonPrimaryHover: 'hsl(210 40% 98% / 0.9)',
        buttonSecondary: 'hsl(217.2 32.6% 17.5%)',
        buttonSecondaryHover: 'hsl(215 27.9% 16.9%)',
        success: 'hsl(142.1 70.6% 45.3%)',
        warning: 'hsl(47.9 95.8% 53.1%)',
        error: 'hsl(0 72.2% 50.6%)',
        info: 'hsl(221.2 83.2% 53.3%)',
      },
      cssVars: {
        '--datagrid-bg-primary': 'hsl(222.2 84% 4.9%)',
        '--datagrid-bg-header': 'hsl(217.2 32.6% 17.5%)',
        '--datagrid-bg-hover': 'hsl(215 27.9% 16.9%)',
        '--datagrid-text-primary': 'hsl(210 40% 98%)',
        '--datagrid-text-secondary': 'hsl(215 20.2% 65.1%)',
        '--datagrid-border-color': 'hsl(217.2 32.6% 17.5%)',
        '--datagrid-accent-color': 'hsl(210 40% 98%)',
      },
    },
  },
};

// Glassmorphism theme
const glassmorphismTheme: DataGridTheme = {
  name: 'glassmorphism',
  displayName: 'Glassmorphism',
  description: 'Modern glassmorphism design with backdrop blur effects',
  config: {
    ...defaultTheme.config,
    shared: {
      ...defaultTheme.config.shared,
      borders: {
        ...defaultTheme.config.shared.borders,
        radius: '12px',
        radiusSm: '8px',
        radiusLg: '16px',
      },
      components: {
        ...defaultTheme.config.shared.components,
        floatingDockBackdrop: 'blur(20px)',
      },
    },
    light: {
      ...defaultTheme.config.light,
      colors: {
        ...defaultTheme.config.light.colors,
        bgPrimary: 'rgba(255, 255, 255, 0.8)',
        bgHeader: 'rgba(255, 255, 255, 0.6)',
        bgHover: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.18)',
        borderHeader: 'rgba(255, 255, 255, 0.25)',
      },
    },
    dark: {
      ...defaultTheme.config.dark,
      colors: {
        ...defaultTheme.config.dark.colors,
        bgPrimary: 'rgba(15, 23, 42, 0.8)',
        bgHeader: 'rgba(30, 41, 59, 0.6)',
        bgHover: 'rgba(51, 65, 85, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderHeader: 'rgba(255, 255, 255, 0.15)',
      },
    },
  },
};

// Uniform theme - single background for all rows
const uniformTheme: DataGridTheme = {
  name: 'uniform',
  displayName: 'Uniform Background',
  description: 'Clean design with uniform background for all rows and header',
  config: {
    ...defaultTheme.config,
    light: {
      ...defaultTheme.config.light,
      colors: {
        ...defaultTheme.config.light.colors,
        bgPrimary: '#ffffff',
        bgSecondary: '#ffffff', // Same as primary for uniform look
        bgHeader: '#ffffff', // Same as body for uniform look
        bgHover: '#f8fafc',
        bgRowHover: '#f8fafc',
        bgCellFocus: '#f0f8ff',
        borderColor: '#e2e8f0',
        borderHeader: '#e2e8f0',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        textAccent: '#3b82f6',
        borderAccent: '#3b82f6',
        buttonPrimary: '#3b82f6',
        buttonPrimaryHover: '#2563eb',
      },
      cssVars: {
        '--datagrid-bg-primary': '#ffffff',
        '--datagrid-bg-secondary': '#ffffff',
        '--datagrid-bg-header': '#ffffff',
        '--datagrid-bg-hover': '#f8fafc',
        '--datagrid-text-primary': '#1e293b',
        '--datagrid-text-secondary': '#64748b',
        '--datagrid-border-color': '#e2e8f0',
        '--datagrid-accent-color': '#3b82f6',
      },
    },
    dark: {
      ...defaultTheme.config.dark,
      colors: {
        ...defaultTheme.config.dark.colors,
        bgPrimary: '#1e293b',
        bgSecondary: '#1e293b', // Same as primary for uniform look
        bgHeader: '#1e293b', // Same as body for uniform look
        bgHover: '#334155',
        bgRowHover: '#334155',
        bgCellFocus: '#475569',
        borderColor: '#475569',
        borderHeader: '#475569',
        textPrimary: '#f8fafc',
        textSecondary: '#cbd5e1',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        textAccent: '#60a5fa',
        borderAccent: '#3b82f6',
        buttonPrimary: '#3b82f6',
        buttonPrimaryHover: '#2563eb',
      },
      cssVars: {
        '--datagrid-bg-primary': '#1e293b',
        '--datagrid-bg-secondary': '#1e293b',
        '--datagrid-bg-header': '#1e293b',
        '--datagrid-bg-hover': '#334155',
        '--datagrid-text-primary': '#f8fafc',
        '--datagrid-text-secondary': '#cbd5e1',
        '--datagrid-border-color': '#475569',
        '--datagrid-accent-color': '#3b82f6',
      },
    },
  },
};

// Export all themes
export const defaultThemes: Record<string, DataGridTheme> = {
  default: defaultTheme,
  material: materialTheme,
  minimal: minimalTheme,
  github: githubTheme,
  corporate: corporateTheme,
  shadcn: shadcnTheme,
  glassmorphism: glassmorphismTheme,
  uniform: uniformTheme,
};

// Utility function to create custom theme
export const createCustomTheme = (
  baseConfig: ThemeConfig,
  customizations: ThemeCustomization
): DataGridTheme => {
  // Simple deep merge using JSON parse/stringify for now
  // This can be optimized with a proper deep merge library in production
  const mergedConfig: ThemeConfig = JSON.parse(
    JSON.stringify({
      shared: {
        ...baseConfig.shared,
        ...customizations.shared,
        colors: {
          ...baseConfig.shared.cssVars,
          ...customizations.shared?.cssVars,
        },
      },
      light: {
        ...baseConfig.light,
        ...customizations.light,
        colors: {
          ...baseConfig.light.colors,
          ...customizations.light?.colors,
        },
      },
      dark: {
        ...baseConfig.dark,
        ...customizations.dark,
        colors: {
          ...baseConfig.dark.colors,
          ...customizations.dark?.colors,
        },
      },
    })
  );
  
  return {
    name: 'custom',
    displayName: 'Custom Theme',
    description: 'User-customized theme',
    config: mergedConfig,
  };
};

// Theme validation
export const validateTheme = (theme: DataGridTheme): boolean => {
  try {
    const requiredKeys = ['name', 'displayName', 'config'];
    const hasRequiredKeys = requiredKeys.every(key => key in theme);
    
    if (!hasRequiredKeys) return false;
    
    const configKeys = ['shared', 'light', 'dark'];
    const hasConfigKeys = configKeys.every(key => key in theme.config);
    
    return hasConfigKeys;
  } catch {
    return false;
  }
};

// Get theme by name
export const getTheme = (name: string): DataGridTheme | null => {
  return defaultThemes[name] || null;
};

// Get all available theme names
export const getAvailableThemes = (): string[] => {
  return Object.keys(defaultThemes);
};