'use client';

import { createContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const STORAGE_KEY = 'theme';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * ThemeProvider - Manages theme state and persistence
 * 
 * Provides theme context to all children components.
 * Handles light/dark mode switching with system preference detection.
 * Persists theme preference to localStorage.
 * 
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }, []);

  // Resolve actual theme based on current setting
  const resolveTheme = useCallback((currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Apply theme to document
  const applyTheme = (newResolvedTheme: ResolvedTheme) => {
    const root = document.documentElement;
    root.setAttribute(THEME_ATTRIBUTE, newResolvedTheme);
    setResolvedTheme(newResolvedTheme);
  };

  // Set theme and persist to storage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    const resolved = resolveTheme(newTheme);
    applyTheme(resolved);
    
    // Persist to localStorage
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      // Handle localStorage not available
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  // Toggle between light and dark (skip system)
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Try to load from localStorage
        const stored = localStorage.getItem(storageKey) as Theme | null;
        const initialTheme = stored || defaultTheme;
        
        setThemeState(initialTheme);
        const resolved = resolveTheme(initialTheme);
        applyTheme(resolved);
      } catch (error) {
        // Handle localStorage not available
        console.warn('Failed to load theme from localStorage:', error);
        const resolved = resolveTheme(defaultTheme);
        applyTheme(resolved);
      }
      
      setMounted(true);
    };

    initializeTheme();
  }, [defaultTheme, storageKey, resolveTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light';
      applyTheme(newResolvedTheme);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

