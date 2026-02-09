/**
 * Color Tokens
 * 
 * Comprehensive color system with support for light and dark modes.
 * Colors are organized by function and include semantic naming.
 */

/**
 * Primary brand color scale
 */
export const primary = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
} as const;

/**
 * Secondary accent color scale
 */
export const secondary = {
  50: '#f3e5f5',
  100: '#e1bee7',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0',
  600: '#8e24aa',
  700: '#7b1fa2',
  800: '#6a1b9a',
  900: '#4a148c',
} as const;

/**
 * Neutral/gray scale
 */
export const neutral = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
} as const;

/**
 * Success/positive state colors
 */
export const success = {
  50: '#e8f5e9',
  100: '#c8e6c9',
  200: '#a5d6a7',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  600: '#43a047',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20',
} as const;

/**
 * Error/danger state colors
 */
export const error = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
} as const;

/**
 * Warning state colors
 */
export const warning = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
} as const;

/**
 * Info state colors
 */
export const info = {
  50: '#e1f5fe',
  100: '#b3e5fc',
  200: '#81d4fa',
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  600: '#039be5',
  700: '#0288d1',
  800: '#0277bd',
  900: '#01579b',
} as const;

/**
 * Semantic color mappings for light mode
 */
export const semanticLight = {
  // Text colors
  textPrimary: neutral[900],
  textSecondary: neutral[600],
  textDisabled: neutral[400],
  textInverse: neutral[50],
  
  // Background colors
  background: '#ffffff',
  backgroundSecondary: neutral[50],
  backgroundTertiary: neutral[100],
  
  // Surface colors
  surfacePrimary: '#ffffff',
  surfaceSecondary: neutral[50],
  surfaceElevated: '#ffffff',
  
  // Border colors
  border: neutral[300],
  borderLight: neutral[200],
  borderStrong: neutral[400],
  
  // Interactive colors
  interactive: primary[600],
  interactiveHover: primary[700],
  interactiveActive: primary[800],
  
  // State colors
  success: success[600],
  error: error[600],
  warning: warning[600],
  info: info[600],
} as const;

/**
 * Semantic color mappings for dark mode
 */
export const semanticDark = {
  // Text colors
  textPrimary: neutral[50],
  textSecondary: neutral[300],
  textDisabled: neutral[600],
  textInverse: neutral[900],
  
  // Background colors
  background: '#121212',
  backgroundSecondary: '#1e1e1e',
  backgroundTertiary: '#2a2a2a',
  
  // Surface colors
  surfacePrimary: '#1e1e1e',
  surfaceSecondary: '#2a2a2a',
  surfaceElevated: '#2a2a2a',
  
  // Border colors
  border: neutral[700],
  borderLight: neutral[800],
  borderStrong: neutral[600],
  
  // Interactive colors
  interactive: primary[400],
  interactiveHover: primary[300],
  interactiveActive: primary[200],
  
  // State colors
  success: success[400],
  error: error[400],
  warning: warning[400],
  info: info[400],
} as const;

/**
 * All color tokens exported
 */
export const colors = {
  primary,
  secondary,
  neutral,
  success,
  error,
  warning,
  info,
  light: semanticLight,
  dark: semanticDark,
} as const;

export type ColorScale = typeof primary;
export type SemanticColors = typeof semanticLight;









