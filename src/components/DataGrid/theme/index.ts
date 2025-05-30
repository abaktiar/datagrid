// Export all theme-related types
export type {
  DataGridTheme,
  ThemeConfig,
  ThemeVariant,
  ThemeCustomization,
  ColorConfig,
  SpacingConfig,
  TypographyConfig,
  BorderConfig,
  ShadowConfig,
  TransitionConfig,
  ComponentConfig,
  SharedThemeConfig,
  ThemeVariantConfig,
  CSSVariableMap,
  TailwindClassMap,
  ThemePreset,
  ComponentThemeProps,
  DensityMode,
  DensityConfig,
  AnimationConfig,
  BreakpointConfig,
  CompleteThemeConfig,
} from './types';

// Export theme provider and hooks
export {
  DataGridThemeProvider,
  useDataGridTheme,
  useThemeVars,
} from './ThemeProvider';

// Export predefined themes and utilities
export {
  defaultThemes,
  createCustomTheme,
  validateTheme,
  getTheme,
  getAvailableThemes,
} from './themes';

// Export theme utilities
export {
  applyThemeToDOM,
  generateTailwindClasses,
  getCSSVar,
  setCSSVar,
  removeCSSVar,
  getSystemTheme,
  watchSystemTheme,
  exportThemeAsCSS,
} from './utils';

// Export theme presets
import type { ThemePreset, DataGridTheme, ThemeVariant } from './types';
import { defaultThemes } from './themes';
import { applyThemeToDOM } from './utils';

export const THEME_PRESETS: Record<ThemePreset, string> = {
  default: 'Default Modern',
  modern: 'Modern Clean',
  minimal: 'Minimal Clean',
  corporate: 'Corporate Professional',
  github: 'GitHub Style',
  material: 'Material Design',
  glassmorphism: 'Glassmorphism',
  retro: 'Retro Style',
};

// CSS custom properties mapping for easy usage
export const CSS_VARS = {
  // Colors
  BG_PRIMARY: '--datagrid-bg-primary',
  BG_HEADER: '--datagrid-bg-header',
  BG_HOVER: '--datagrid-bg-hover',
  TEXT_PRIMARY: '--datagrid-text-primary',
  TEXT_SECONDARY: '--datagrid-text-secondary',
  BORDER_COLOR: '--datagrid-border-color',
  ACCENT_COLOR: '--datagrid-color-primary',
  
  // Spacing
  SPACING_XS: '--datagrid-spacing-xs',
  SPACING_SM: '--datagrid-spacing-sm',
  SPACING_MD: '--datagrid-spacing-md',
  SPACING_LG: '--datagrid-spacing-lg',
  
  // Typography
  FONT_FAMILY: '--datagrid-font-family',
  FONT_SIZE_SM: '--datagrid-font-size-sm',
  FONT_SIZE_MD: '--datagrid-font-size-md',
  FONT_SIZE_LG: '--datagrid-font-size-lg',
  
  // Borders & Shadows
  BORDER_RADIUS: '--datagrid-border-radius',
  BORDER_WIDTH: '--datagrid-border-width',
  SHADOW_SM: '--datagrid-shadow-sm',
  SHADOW_MD: '--datagrid-shadow-md',
  
  // Transitions
  TRANSITION_FAST: '--datagrid-transition-fast',
  TRANSITION_NORMAL: '--datagrid-transition-normal',
} as const;

// Tailwind CSS class mappings for users who prefer utility classes
export const TAILWIND_CLASSES = {
  // Background classes
  bgPrimary: 'bg-white dark:bg-slate-900',
  bgHeader: 'bg-slate-50 dark:bg-slate-800',
  bgHover: 'hover:bg-slate-100 dark:hover:bg-slate-700',
  
  // Text classes
  textPrimary: 'text-slate-900 dark:text-slate-100',
  textSecondary: 'text-slate-600 dark:text-slate-400',
  textMuted: 'text-slate-400 dark:text-slate-500',
  
  // Border classes
  border: 'border-slate-200 dark:border-slate-700',
  borderFocus: 'border-blue-500 dark:border-blue-400',
  
  // Spacing classes
  paddingCell: 'px-4 py-3',
  paddingHeader: 'px-4 py-3',
  
  // Rounded corners
  rounded: 'rounded-md',
  roundedFull: 'rounded-full',
  
  // Shadows
  shadow: 'shadow-sm',
  shadowLg: 'shadow-lg',
} as const;

// Quick theme application helper
export const applyQuickTheme = (themeName: ThemePreset, variant: ThemeVariant = 'light') => {
  const theme = defaultThemes[themeName];
  if (theme) {
    applyThemeToDOM(theme, variant);
  } else {
    console.warn(`Theme "${themeName}" not found`);
  }
};

// CSS-in-JS style object generator for inline styles
export const createStyleObject = (theme: DataGridTheme, variant: ThemeVariant) => {
  const variantConfig = variant === 'dark' ? theme.config.dark : theme.config.light;
  
  return {
    container: {
      backgroundColor: variantConfig.colors.bgPrimary,
      color: variantConfig.colors.textPrimary,
      fontFamily: theme.config.shared.typography.fontFamily,
      fontSize: theme.config.shared.typography.fontSizeMd,
    },
    header: {
      backgroundColor: variantConfig.colors.bgHeader,
      borderColor: variantConfig.colors.borderHeader,
      fontWeight: theme.config.shared.typography.fontWeightSemibold,
    },
    cell: {
      borderColor: variantConfig.colors.borderColor,
      padding: theme.config.shared.components.cellPadding,
    },
    button: {
      primary: {
        backgroundColor: variantConfig.colors.buttonPrimary,
        color: variantConfig.colors.textInverse,
        borderRadius: theme.config.shared.borders.radius,
      },
      secondary: {
        backgroundColor: variantConfig.colors.buttonSecondary,
        color: variantConfig.colors.textPrimary,
        borderRadius: theme.config.shared.borders.radius,
      },
    },
  };
};