import React, { createContext, useContext, useEffect, useState } from 'react';
import type { DataGridTheme, ThemeConfig, ThemeVariant } from './types';
import { defaultThemes, createCustomTheme } from './themes';
import { applyThemeToDOM } from './utils';

interface ThemeContextValue {
  currentTheme: DataGridTheme;
  variant: ThemeVariant;
  setTheme: (theme: DataGridTheme | string) => void;
  setVariant: (variant: ThemeVariant) => void;
  customizeTheme: (customizations: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string | DataGridTheme;
  defaultVariant?: ThemeVariant;
  containerRef?: React.RefObject<HTMLElement>;
}

export const DataGridThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'default',
  defaultVariant = 'light',
  containerRef,
}) => {
  const [currentTheme, setCurrentTheme] = useState<DataGridTheme>(() => {
    if (typeof defaultTheme === 'string') {
      return defaultThemes[defaultTheme] || defaultThemes.default;
    }
    return defaultTheme;
  });
  
  const [variant, setVariant] = useState<ThemeVariant>(defaultVariant);

  const setTheme = (theme: DataGridTheme | string) => {
    if (typeof theme === 'string') {
      const predefinedTheme = defaultThemes[theme];
      if (predefinedTheme) {
        setCurrentTheme(predefinedTheme);
      } else {
        console.warn(`Theme "${theme}" not found. Available themes:`, Object.keys(defaultThemes));
      }
    } else {
      setCurrentTheme(theme);
    }
  };

  const customizeTheme = (customizations: Partial<ThemeConfig>) => {
    setCurrentTheme(prev => createCustomTheme(prev.config, customizations));
  };

  const resetTheme = () => {
    setCurrentTheme(defaultThemes.default);
    setVariant('light');
  };

  // Apply theme to DOM
  useEffect(() => {
    applyThemeToDOM(currentTheme, variant, containerRef?.current);
  }, [currentTheme, variant, containerRef]);

  const value: ThemeContextValue = {
    currentTheme,
    variant,
    setTheme,
    setVariant,
    customizeTheme,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDataGridTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDataGridTheme must be used within a DataGridThemeProvider');
  }
  return context;
};

// Hook for getting CSS variables
export const useThemeVars = () => {
  const { currentTheme, variant } = useDataGridTheme();
  
  return {
    getCSSVar: (key: string) => {
      const config = variant === 'dark' ? currentTheme.config.dark : currentTheme.config.light;
      return config.cssVars?.[key] || currentTheme.config.shared.cssVars?.[key];
    },
    getAllVars: () => {
      const sharedVars = currentTheme.config.shared.cssVars || {};
      const variantVars = (variant === 'dark' ? currentTheme.config.dark : currentTheme.config.light).cssVars || {};
      return { ...sharedVars, ...variantVars };
    }
  };
};