import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { Theme, ResolvedTheme } from './ThemeProvider';

export interface UseThemeReturn {
  /** Current theme setting: 'light', 'dark', or 'system' */
  theme: Theme;
  /** Actual resolved theme: 'light' or 'dark' */
  resolvedTheme: ResolvedTheme;
  /** Set a specific theme */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark modes */
  toggleTheme: () => void;
}

/**
 * useTheme - Access and control the current theme
 * 
 * Custom hook for consuming theme context.
 * Provides current theme state and functions to change it.
 * 
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {resolvedTheme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}









