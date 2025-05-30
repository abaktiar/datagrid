import type { DataGridTheme, ThemeVariant, CSSVariableMap, ColorConfig, SpacingConfig, TypographyConfig, SharedThemeConfig } from './types';

/**
 * Apply theme to DOM by setting CSS custom properties
 */
export const applyThemeToDOM = (
  theme: DataGridTheme,
  variant: ThemeVariant,
  container?: HTMLElement | null
): void => {
  const target = container || document.documentElement;
  
  // Get the appropriate variant configuration
  const variantConfig = variant === 'dark' ? theme.config.dark : theme.config.light;
  const sharedConfig = theme.config.shared;
  
  // Apply shared CSS variables
  if (sharedConfig.cssVars) {
    Object.entries(sharedConfig.cssVars).forEach(([key, value]) => {
      target.style.setProperty(key, value);
    });
  }
  
  // Apply variant-specific CSS variables
  if (variantConfig.cssVars) {
    Object.entries(variantConfig.cssVars).forEach(([key, value]) => {
      target.style.setProperty(key, value);
    });
  }
  
  // Apply color variables with CSS custom property names
  const colorVars = generateColorCSSVars(variantConfig.colors);
  Object.entries(colorVars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
  
  // Apply spacing variables
  const spacingVars = generateSpacingCSSVars(sharedConfig.spacing);
  Object.entries(spacingVars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
  
  // Apply typography variables
  const typographyVars = generateTypographyCSSVars(sharedConfig.typography);
  Object.entries(typographyVars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
  
  // Apply other component variables
  const componentVars = generateComponentCSSVars(sharedConfig);
  Object.entries(componentVars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
  
  // Set theme class for CSS selectors
  if (container) {
    container.className = container.className.replace(/\bdatagrid-theme-\w+\b/g, '');
    container.classList.add(`datagrid-theme-${variant}`);
  } else {
    document.documentElement.className = document.documentElement.className.replace(/\bdatagrid-theme-\w+\b/g, '');
    document.documentElement.classList.add(`datagrid-theme-${variant}`);
  }
};

/**
 * Generate CSS variables for colors
 */
const generateColorCSSVars = (colors: ColorConfig): CSSVariableMap => {
  return {
    '--datagrid-bg-primary': colors.bgPrimary,
    '--datagrid-bg-secondary': colors.bgSecondary,
    '--datagrid-bg-header': colors.bgHeader,
    '--datagrid-bg-hover': colors.bgHover,
    '--datagrid-bg-row-hover': colors.bgRowHover,
    '--datagrid-bg-cell-focus': colors.bgCellFocus,
    '--datagrid-bg-selected': colors.bgSelected,
    '--datagrid-bg-accent': colors.bgAccent,
    
    '--datagrid-text-primary': colors.textPrimary,
    '--datagrid-text-secondary': colors.textSecondary,
    '--datagrid-text-muted': colors.textMuted,
    '--datagrid-text-accent': colors.textAccent,
    '--datagrid-text-inverse': colors.textInverse,
    
    '--datagrid-border-color': colors.borderColor,
    '--datagrid-border-header': colors.borderHeader,
    '--datagrid-border-focus': colors.borderFocus,
    '--datagrid-border-accent': colors.borderAccent,
    
    '--datagrid-color-success': colors.success,
    '--datagrid-color-warning': colors.warning,
    '--datagrid-color-error': colors.error,
    '--datagrid-color-info': colors.info,
    
    '--datagrid-color-primary': colors.primary,
    '--datagrid-color-primary-hover': colors.primaryHover,
    '--datagrid-color-primary-light': colors.primaryLight,
    
    '--datagrid-button-primary': colors.buttonPrimary,
    '--datagrid-button-primary-hover': colors.buttonPrimaryHover,
    '--datagrid-button-secondary': colors.buttonSecondary,
    '--datagrid-button-secondary-hover': colors.buttonSecondaryHover,
    '--datagrid-button-danger': colors.buttonDanger,
    '--datagrid-button-danger-hover': colors.buttonDangerHover,
    '--datagrid-button-success': colors.buttonSuccess,
    '--datagrid-button-success-hover': colors.buttonSuccessHover,
  };
};

/**
 * Generate CSS variables for spacing
 */
const generateSpacingCSSVars = (spacing: SpacingConfig): CSSVariableMap => {
  return {
    '--datagrid-spacing-xs': spacing.xs,
    '--datagrid-spacing-sm': spacing.sm,
    '--datagrid-spacing-md': spacing.md,
    '--datagrid-spacing-lg': spacing.lg,
    '--datagrid-spacing-xl': spacing.xl,
    '--datagrid-spacing-xxl': spacing.xxl,
  };
};

/**
 * Generate CSS variables for typography
 */
const generateTypographyCSSVars = (typography: TypographyConfig): CSSVariableMap => {
  return {
    '--datagrid-font-family': typography.fontFamily,
    '--datagrid-font-family-mono': typography.fontFamilyMono,
    
    '--datagrid-font-size-xs': typography.fontSizeXs,
    '--datagrid-font-size-sm': typography.fontSizeSm,
    '--datagrid-font-size-md': typography.fontSizeMd,
    '--datagrid-font-size-lg': typography.fontSizeLg,
    '--datagrid-font-size-xl': typography.fontSizeXl,
    
    '--datagrid-font-weight-normal': typography.fontWeightNormal,
    '--datagrid-font-weight-medium': typography.fontWeightMedium,
    '--datagrid-font-weight-semibold': typography.fontWeightSemibold,
    '--datagrid-font-weight-bold': typography.fontWeightBold,
    
    '--datagrid-line-height-tight': typography.lineHeightTight,
    '--datagrid-line-height-normal': typography.lineHeightNormal,
    '--datagrid-line-height-relaxed': typography.lineHeightRelaxed,
  };
};

/**
 * Generate CSS variables for component-specific styles
 */
const generateComponentCSSVars = (sharedConfig: SharedThemeConfig): CSSVariableMap => {
  return {
    // Borders
    '--datagrid-border-width': sharedConfig.borders.width,
    '--datagrid-border-width-thick': sharedConfig.borders.widthThick,
    '--datagrid-border-radius': sharedConfig.borders.radius,
    '--datagrid-border-radius-sm': sharedConfig.borders.radiusSm,
    '--datagrid-border-radius-lg': sharedConfig.borders.radiusLg,
    '--datagrid-border-radius-full': sharedConfig.borders.radiusFull,
    
    // Shadows
    '--datagrid-shadow-none': sharedConfig.shadows.none,
    '--datagrid-shadow-sm': sharedConfig.shadows.sm,
    '--datagrid-shadow-md': sharedConfig.shadows.md,
    '--datagrid-shadow-lg': sharedConfig.shadows.lg,
    '--datagrid-shadow-xl': sharedConfig.shadows.xl,
    '--datagrid-shadow-inner': sharedConfig.shadows.inner,
    '--datagrid-shadow-focus': sharedConfig.shadows.focus,
    
    // Transitions
    '--datagrid-transition-fast': sharedConfig.transitions.fast,
    '--datagrid-transition-normal': sharedConfig.transitions.normal,
    '--datagrid-transition-slow': sharedConfig.transitions.slow,
    '--datagrid-transition-ease-in': sharedConfig.transitions.easeIn,
    '--datagrid-transition-ease-out': sharedConfig.transitions.easeOut,
    '--datagrid-transition-ease-in-out': sharedConfig.transitions.easeInOut,
    '--datagrid-transition-ease-elastic': sharedConfig.transitions.easeElastic,
    
    // Component dimensions
    '--datagrid-header-height': sharedConfig.components.headerHeight,
    '--datagrid-header-padding': sharedConfig.components.headerPadding,
    '--datagrid-cell-padding': sharedConfig.components.cellPadding,
    '--datagrid-cell-min-height': sharedConfig.components.cellMinHeight,
    '--datagrid-floating-dock-border-radius': sharedConfig.components.floatingDockBorderRadius,
    '--datagrid-floating-dock-padding': sharedConfig.components.floatingDockPadding,
    '--datagrid-floating-dock-shadow': sharedConfig.components.floatingDockShadow,
    '--datagrid-pagination-height': sharedConfig.components.paginationHeight,
    '--datagrid-pagination-padding': sharedConfig.components.paginationPadding,
    '--datagrid-filter-height': sharedConfig.components.filterHeight,
    '--datagrid-filter-padding': sharedConfig.components.filterPadding,
  };
};

/**
 * Convert theme colors to Tailwind CSS classes
 */
export const generateTailwindClasses = (theme: DataGridTheme, variant: ThemeVariant): Record<string, string> => {
  // This would map theme colors to Tailwind classes
  // For now, return predefined mappings as Tailwind integration would require more setup
  if (variant === 'dark') {
    return {
      'bg-primary': 'bg-slate-900',
      'bg-header': 'bg-slate-800',
      'text-primary': 'text-slate-100',
      'text-secondary': 'text-slate-400',
      'border-color': 'border-slate-700',
    };
  }
  
  return {
    'bg-primary': 'bg-white',
    'bg-header': 'bg-slate-50',
    'text-primary': 'text-slate-900',
    'text-secondary': 'text-slate-600',
    'border-color': 'border-slate-200',
    // Add more mappings as needed
  };
};

/**
 * Get computed CSS custom property value
 */
export const getCSSVar = (property: string, element?: HTMLElement): string => {
  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(property).trim();
};

/**
 * Set CSS custom property value
 */
export const setCSSVar = (property: string, value: string, element?: HTMLElement): void => {
  const target = element || document.documentElement;
  target.style.setProperty(property, value);
};

/**
 * Remove CSS custom property
 */
export const removeCSSVar = (property: string, element?: HTMLElement): void => {
  const target = element || document.documentElement;
  target.style.removeProperty(property);
};

/**
 * Detect system theme preference
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

/**
 * Listen for system theme changes
 */
export const watchSystemTheme = (callback: (theme: 'light' | 'dark') => void): (() => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handler);
  
  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
};

/**
 * Export theme as CSS string
 */
export const exportThemeAsCSS = (theme: DataGridTheme, variant: ThemeVariant): string => {
  const variantConfig = variant === 'dark' ? theme.config.dark : theme.config.light;
  const sharedConfig = theme.config.shared;
  
  const allVars = {
    ...generateColorCSSVars(variantConfig.colors),
    ...generateSpacingCSSVars(sharedConfig.spacing),
    ...generateTypographyCSSVars(sharedConfig.typography),
    ...generateComponentCSSVars(sharedConfig),
    ...sharedConfig.cssVars,
    ...variantConfig.cssVars,
  };
  
  const cssRules = Object.entries(allVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  
  return `:root {\n${cssRules}\n}`;
};