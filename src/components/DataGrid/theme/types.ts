export type ThemeVariant = 'light' | 'dark' | 'auto';

export interface ColorConfig {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgHeader: string;
  bgHover: string;
  bgRowHover: string;
  bgCellFocus: string;
  bgSelected: string;
  bgAccent: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAccent: string;
  textInverse: string;
  
  // Border colors
  borderColor: string;
  borderHeader: string;
  borderFocus: string;
  borderAccent: string;
  
  // State colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Accent colors
  primary: string;
  primaryHover: string;
  primaryLight: string;
  
  // Interactive colors
  buttonPrimary: string;
  buttonPrimaryHover: string;
  buttonSecondary: string;
  buttonSecondaryHover: string;
  buttonDanger: string;
  buttonDangerHover: string;
  buttonSuccess: string;
  buttonSuccessHover: string;
}

export interface SpacingConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface TypographyConfig {
  fontFamily: string;
  fontFamilyMono: string;
  
  // Font sizes
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontSizeXl: string;
  
  // Font weights
  fontWeightNormal: string;
  fontWeightMedium: string;
  fontWeightSemibold: string;
  fontWeightBold: string;
  
  // Line heights
  lineHeightTight: string;
  lineHeightNormal: string;
  lineHeightRelaxed: string;
}

export interface BorderConfig {
  width: string;
  widthThick: string;
  radius: string;
  radiusSm: string;
  radiusLg: string;
  radiusFull: string;
}

export interface ShadowConfig {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
  focus: string;
}

export interface TransitionConfig {
  fast: string;
  normal: string;
  slow: string;
  
  // Easing functions
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  easeElastic: string;
}

export interface ZIndexConfig {
  dropdown: number;
  tooltip: number;
  modal: number;
  popover: number;
  overlay: number;
  max: number;
}

export interface ComponentConfig {
  // Header specific
  headerHeight: string;
  headerPadding: string;
  headerBorderRadius: string;
  
  // Cell specific
  cellPadding: string;
  cellMinHeight: string;
  
  // Floating dock specific
  floatingDockBorderRadius: string;
  floatingDockPadding: string;
  floatingDockShadow: string;
  floatingDockBackdrop: string;
  
  // Pagination specific
  paginationHeight: string;
  paginationPadding: string;
  
  // Filter specific
  filterHeight: string;
  filterPadding: string;
}

export interface ThemeVariantConfig {
  colors: ColorConfig;
  cssVars?: Record<string, string>;
  tailwindClasses?: Record<string, string>;
}

export interface SharedThemeConfig {
  spacing: SpacingConfig;
  typography: TypographyConfig;
  borders: BorderConfig;
  shadows: ShadowConfig;
  transitions: TransitionConfig;
  zIndex: ZIndexConfig;
  components: ComponentConfig;
  cssVars?: Record<string, string>;
  tailwindClasses?: Record<string, string>;
}

export interface ThemeConfig {
  shared: SharedThemeConfig;
  light: ThemeVariantConfig;
  dark: ThemeVariantConfig;
}

export interface DataGridTheme {
  name: string;
  displayName: string;
  description?: string;
  config: ThemeConfig;
}

// Utility types for customization
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeCustomization = DeepPartial<ThemeConfig>;

// CSS Variable mapping
export interface CSSVariableMap {
  [key: string]: string;
}

// Tailwind class mapping
export interface TailwindClassMap {
  [key: string]: string;
}

// Theme preset types
export type ThemePreset = 'default' | 'modern' | 'minimal' | 'corporate' | 'github' | 'material' | 'glassmorphism' | 'retro';

// Component-specific theme props
export interface ComponentThemeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  shadow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Density configuration
export type DensityMode = 'compact' | 'comfortable' | 'spacious';

export interface DensityConfig {
  compact: {
    cellPadding: string;
    fontSize: string;
    lineHeight: string;
  };
  comfortable: {
    cellPadding: string;
    fontSize: string;
    lineHeight: string;
  };
  spacious: {
    cellPadding: string;
    fontSize: string;
    lineHeight: string;
  };
}

// Animation configuration
export interface AnimationConfig {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
  keyframes: Record<string, string>;
}

// Responsive breakpoints
export interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

// Export combined interface for theme definition
export interface CompleteThemeConfig extends ThemeConfig {
  density: DensityConfig;
  animations: AnimationConfig;
  breakpoints: BreakpointConfig;
}