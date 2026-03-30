# Feature: Theme System and Design Tokens

## Metadata

- **Feature ID:** 002
- **Phase:** 1 - Foundation Setup
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 001 (Project Configuration)

---

## Goals

Implement the complete theme system for Know Morocco with Moroccan-inspired design tokens, including colors, typography, spacing, and a theming context that supports light/dark mode. This feature establishes the visual foundation that all UI components will build upon.

### Acceptance Criteria

- [ ] Design tokens defined (colors, spacing, typography)
- [ ] Theme context provider created with light/dark mode support
- [ ] `useAppTheme` hook created for accessing theme
- [ ] `themed()` helper function for styling components
- [ ] Theme persistence with MMKV
- [ ] Dark mode colors defined
- [ ] Typography scale implemented
- [ ] Spacing scale implemented

---

## Implementation Steps

### Step 1: Define Design Tokens

Create the design tokens file with Moroccan-inspired colors and spacing.

**File:** `app/theme/tokens.ts`
```typescript
/**
 * Design Tokens for Know Morocco
 * Moroccan-inspired color palette and spacing system
 */

export const colors = {
  // Primary Colors - Moroccan Blue
  primary: '#1E5F9E',
  primaryLight: '#3D7CB8',
  primaryDark: '#154270',
  primaryMuted: '#5B8FB9',

  // Secondary Colors - Terracotta
  secondary: '#C17B5D',
  secondaryLight: '#D4957A',
  secondaryDark: '#9E5F45',

  // Accent Colors - Gold
  accent: '#D4AF37',
  accentLight: '#E5C55A',
  accentDark: '#B89628',

  // Neutral Colors
  background: '#F8F5F0',
  backgroundLight: '#FFFCF9',
  backgroundDark: '#1A1A1A',
  surface: '#FFFFFF',
  surfaceDark: '#2D2D2D',

  // Text Colors
  textPrimary: '#2D2D2D',
  textPrimaryDark: '#F5F5F5',
  textSecondary: '#6B6B6B',
  textSecondaryDark: '#A0A0A0',
  textMuted: '#9CA3AF',

  // Status Colors
  success: '#4CAF50',
  successLight: '#81C784',
  warning: '#FF9800',
  warningLight: '#FFB74D',
  error: '#F44336',
  errorLight: '#E57373',
  info: '#2196F3',
  infoLight: '#64B5F6',

  // Border Colors
  border: '#E5E7EB',
  borderDark: '#4A4A4A',

  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Category Colors
  categoryMonuments: '#1E5F9E',
  categoryFood: '#C17B5D',
  categoryHistory: '#D4AF37',
  categoryCulture: '#8B5CF6',
}

export const spacing = {
  // Base spacing unit: 4px
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,

  // Specific spacings
  buttonPadding: 16,
  cardPadding: 16,
  screenPadding: 20,
}

export const typography = {
  // Font Families
  fontFamily: {
    primary: 'System', // Will be overridden by platform
    heading: 'SpaceGrotesk-Bold',
    body: 'SpaceGrotesk-Regular',
  },

  // Font Sizes (in pixels)
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
  },

  // Font Weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
}

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
}

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
}

export const zIndices = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal: 400,
  popover: 500,
  toast: 600,
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  zIndices,
  breakpoints,
}
```

---

### Step 2: Create Theme Types

Define TypeScript types for the theme system.

**File:** `app/theme/types.ts`
```typescript
import { colors, spacing, typography, borderRadius, shadows } from './tokens'

export type ColorKey = keyof typeof colors

export interface ThemeColors {
  [key: string]: string
}

export interface Spacing {
  [key: string]: number
}

export interface Typography {
  fontFamily: {
    primary: string
    heading: string
    body: string
  }
  fontSize: {
    [key: string]: number
  }
  fontWeight: {
    [key: string]: string
  }
  lineHeight: {
    [key: string]: number
  }
}

export interface BorderRadius {
  [key: string]: number
}

export interface Shadow {
  shadowColor: string
  shadowOffset: { width: number; height: number }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}

export interface Shadows {
  sm: Shadow
  md: Shadow
  lg: Shadow
  xl: Shadow
}

export type ThemeContext = 'light' | 'dark'

export interface Theme {
  colors: ThemeColors
  spacing: Spacing
  typography: Typography
  borderRadius: BorderRadius
  shadows: Shadows
  context: ThemeContext
}

export interface ThemedStyle<T> {
  light: T
  dark: T
}

export type ThemedStyles<T = any> = {
  [K in keyof T]: T[K] | ThemedStyle<T[K]>
}
```

---

### Step 3: Create Light and Dark Themes

Create the actual theme objects for light and dark modes.

**File:** `app/theme/themes.ts`
```typescript
import { Theme } from './types'
import { colors, spacing, typography, borderRadius, shadows } from './tokens'

/**
 * Light Theme
 */
export const lightTheme: Theme = {
  colors: {
    // Primary
    primary: colors.primary,
    primaryLight: colors.primaryLight,
    primaryDark: colors.primaryDark,
    primaryMuted: colors.primaryMuted,

    // Secondary
    secondary: colors.secondary,
    secondaryLight: colors.secondaryLight,
    secondaryDark: colors.secondaryDark,

    // Accent
    accent: colors.accent,
    accentLight: colors.accentLight,
    accentDark: colors.accentDark,

    // Backgrounds
    background: colors.background,
    backgroundLight: colors.backgroundLight,
    backgroundSurface: colors.surface,
    backgroundCard: colors.surface,

    // Text
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    textMuted: colors.textMuted,
    textInverse: '#FFFFFF',

    // Borders
    border: colors.border,
    borderLight: '#F3F4F6',
    borderDark: colors.borderDark,

    // Status
    success: colors.success,
    successLight: colors.successLight,
    warning: colors.warning,
    warningLight: colors.warningLight,
    error: colors.error,
    errorLight: colors.errorLight,
    info: colors.info,
    infoLight: colors.infoLight,

    // Overlay
    overlay: colors.overlay,
    overlayLight: colors.overlayLight,

    // Category
    categoryMonuments: colors.categoryMonuments,
    categoryFood: colors.categoryFood,
    categoryHistory: colors.categoryHistory,
    categoryCulture: colors.categoryCulture,

    // Special
    cardBackground: colors.surface,
    inputBackground: colors.surface,
    buttonBackground: colors.primary,
    buttonText: '#FFFFFF',
  },
  spacing,
  typography,
  borderRadius,
  shadows,
  context: 'light',
}

/**
 * Dark Theme
 */
export const darkTheme: Theme = {
  colors: {
    // Primary
    primary: colors.primaryLight,
    primaryLight: colors.primaryMuted,
    primaryDark: colors.primary,
    primaryMuted: colors.primaryMuted,

    // Secondary
    secondary: colors.secondaryLight,
    secondaryLight: '#E0A085',
    secondaryDark: colors.secondary,

    // Accent
    accent: colors.accentLight,
    accentLight: '#F5D76E',
    accentDark: colors.accent,

    // Backgrounds
    background: colors.backgroundDark,
    backgroundLight: '#252525',
    backgroundSurface: colors.surfaceDark,
    backgroundCard: '#2D2D2D',

    // Text
    textPrimary: colors.textPrimaryDark,
    textSecondary: colors.textSecondaryDark,
    textMuted: colors.textMuted,
    textInverse: '#000000',

    // Borders
    border: colors.borderDark,
    borderLight: '#3D3D3D',
    borderDark: '#1A1A1A',

    // Status
    success: colors.successLight,
    successLight: '#66BB6A',
    warning: colors.warningLight,
    warningLight: '#FFCC80',
    error: colors.errorLight,
    errorLight: '#EF5350',
    info: colors.infoLight,
    infoLight: '#42A5F5',

    // Overlay
    overlay: 'rgba(255, 255, 255, 0.5)',
    overlayLight: 'rgba(255, 255, 255, 0.3)',

    // Category
    categoryMonuments: colors.primaryMuted,
    categoryFood: colors.secondaryLight,
    categoryHistory: colors.accentLight,
    categoryCulture: '#A78BFA',

    // Special
    cardBackground: '#2D2D2D',
    inputBackground: '#3D3D3D',
    buttonBackground: colors.primaryLight,
    buttonText: '#000000',
  },
  spacing,
  typography,
  borderRadius,
  shadows,
  context: 'dark',
}

export default { lightTheme, darkTheme }
```

---

### Step 4: Create Theme Context Provider

Create the React context for theme management.

**File:** `app/theme/context.tsx`
```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { Theme, ThemeContext } from './types'
import { lightTheme, darkTheme } from './themes'

/**
 * MMKV storage instance for theme persistence
 */
export const storage = new MMKV()

const THEME_STORAGE_KEY = 'theme.mode'

interface ThemeContextValue {
  theme: Theme
  themeContext: ThemeContext
  toggleTheme: () => void
  setTheme: (context: ThemeContext) => void
  themed: <T extends Record<string, any>>(styles: ThemedStyles<T>) => T
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeContext
}

/**
 * Theme Provider Component
 * Wraps the app and provides theme context
 */
export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme()
  const [themeContext, setThemeContext] = useState<ThemeContext>(() => {
    const stored = storage.getString(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    return defaultTheme
  })

  // Determine which theme to use
  const theme = themeContext === 'dark' ? darkTheme : lightTheme

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    const newTheme = themeContext === 'light' ? 'dark' : 'light'
    setThemeContext(newTheme)
    storage.set(THEME_STORAGE_KEY, newTheme)
  }

  /**
   * Set a specific theme
   */
  const setTheme = (context: ThemeContext) => {
    setThemeContext(context)
    storage.set(THEME_STORAGE_KEY, context)
  }

  /**
   * Helper function to apply themed styles
   */
  const themed = <T extends Record<string, any>>(styles: ThemedStyles<T>): T => {
    const result = {} as T
    for (const key in styles) {
      const style = styles[key]
      if (typeof style === 'object' && style !== null && 'light' in style && 'dark' in style) {
        result[key] = style[themeContext] as T[keyof T]
      } else {
        result[key] = style as T[keyof T]
      }
    }
    return result
  }

  const value: ThemeContextValue = {
    theme,
    themeContext,
    toggleTheme,
    setTheme,
    themed,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Hook to access theme context
 */
export function useAppTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeProvider
```

---

### Step 5: Create Themed Components

Create base components that automatically use the theme.

**File:** `app/components/ThemedView.tsx`
```typescript
import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'
import { useAppTheme } from '@/theme/context'

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'card' | 'surface' | 'overlay'
}

/**
 * ThemedView Component
 * A View that automatically applies theme colors
 */
export function ThemedView({ style, variant = 'default', ...props }: ThemedViewProps) {
  const { theme, themed } = useAppTheme()

  const baseStyles = themed({
    default: { backgroundColor: theme.colors.background },
    card: { backgroundColor: theme.colors.cardBackground },
    surface: { backgroundColor: theme.colors.backgroundSurface },
    overlay: { backgroundColor: theme.colors.overlay },
  })

  return <View style={[{ flex: 1 }, baseStyles[variant], style]} {...props} />
}

export default ThemedView
```

**File:** `app/components/ThemedText.tsx`
```typescript
import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'
import { useAppTheme } from '@/theme/context'

interface ThemedTextProps extends TextProps {
  variant?: 'default' | 'heading' | 'body' | 'caption' | 'title' | 'subtitle'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'success' | 'warning' | 'error'
}

/**
 * ThemedText Component
 * A Text component that automatically applies theme colors and typography
 */
export function ThemedText({
  style,
  variant = 'default',
  size = 'md',
  weight = 'regular',
  color = 'primary',
  ...props
}: ThemedTextProps) {
  const { theme, themed } = useAppTheme()

  const baseStyles = themed({
    default: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.fontSize[size],
      fontFamily: theme.typography.fontFamily.body,
      fontWeight: theme.typography.fontWeight[weight] as any,
      lineHeight: theme.typography.fontSize[size] * theme.typography.lineHeight.normal,
    },
    heading: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.fontSize['2xl'],
      fontFamily: theme.typography.fontFamily.heading,
      fontWeight: theme.typography.fontWeight.bold,
      lineHeight: theme.typography.fontSize['2xl'] * theme.typography.lineHeight.tight,
    },
    body: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.body,
      fontWeight: theme.typography.fontWeight.regular,
      lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
    },
    caption: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      fontFamily: theme.typography.fontFamily.body,
      fontWeight: theme.typography.fontWeight.light,
      lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.relaxed,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.fontSize.xl,
      fontFamily: theme.typography.fontFamily.heading,
      fontWeight: theme.typography.fontWeight.semibold,
      lineHeight: theme.typography.fontSize.xl * theme.typography.lineHeight.tight,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.body,
      fontWeight: theme.typography.fontWeight.medium,
      lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
    },
  })

  const colorStyles = {
    primary: theme.colors.textPrimary,
    secondary: theme.colors.textSecondary,
    muted: theme.colors.textMuted,
    inverse: theme.colors.textInverse,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  }

  return (
    <Text
      style={[
        baseStyles[variant],
        { color: colorStyles[color] },
        style
      ]}
      {...props}
    />
  )
}

export default ThemedText
```

---

### Step 6: Create Theme Index File

Export all theme-related modules from a single file.

**File:** `app/theme/index.ts`
```typescript
// Theme exports
export { ThemeProvider, useAppTheme, storage } from './context'
export { lightTheme, darkTheme } from './themes'
export { colors, spacing, typography, borderRadius, shadows } from './tokens'
export type {
  Theme,
  ThemeContext,
  ThemeColors,
  ThemedStyle,
  ThemedStyles,
} from './types'

// Component exports
export { ThemedView } from '@/components/ThemedView'
export { ThemedText } from '@/components/ThemedText'
```

---

### Step 7: Integrate Theme Provider into App

Update the main app file to wrap with ThemeProvider.

**File:** `app/app.tsx`

Find the existing providers and ensure ThemeProvider is added:

```typescript
import { ThemeProvider } from '@/theme/context'

// In the component tree, wrap with ThemeProvider:
// <ThemeProvider>
//   <OtherProviders>
//     <App />
//   </OtherProviders>
// </ThemeProvider>
```

---

## Mock Data (If Applicable)

Not applicable - this is a theme infrastructure feature.

---

## Integration Points

### Connects To

- **Feature 001** - Uses MMKV from storage setup
- **Feature 007** - Storage layer for theme persistence

### Used By

- **Feature 013** - Button Components
- **Feature 014** - Text Components
- **Feature 015** - Card Components
- All UI components that need theming

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] App launches without theme-related errors
- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly
- [ ] Theme toggle works
- [ ] Theme persists after app restart
- [ ] `useAppTheme()` hook returns correct values
- [ ] `themed()` function applies correct theme styles
- [ ] ThemedView renders with correct background color
- [ ] ThemedText renders with correct colors and typography

---

## Notes

- The theme system uses MMKV for fast, persistent storage
- System color scheme is detected but can be overridden
- The `themed()` function allows conditional styling based on theme
- Consider adding more theme variants (e.g., high contrast) in the future
- Space Grotesk font needs to be loaded via expo-font (handled in font loading feature)

---

## References

- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [React Native useColorScheme](https://reactnative.dev/docs/appearance#usecolorscheme)
- [Design Tokens](https://www.w3.org/design-tokens/)
- [Moroccan Color Palette Inspiration](https://www.canva.com/colors/color-palettes/moroccan/)
