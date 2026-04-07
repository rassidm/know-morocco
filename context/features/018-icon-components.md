# Feature: Icon Components - Icon Wrapper, Category Icons

## Metadata

- **Feature ID:** 018
- **Phase:** 3 - Core UI Components
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 002 (Theme System)

---

## Goals

Create icon components for the Know Morocco app, including a base IconWrapper component for consistent icon styling and a set of category icons for monuments, food, history, and culture. This feature provides a unified icon system that can be used throughout the application with proper theme integration.

### Acceptance Criteria

- [ ] IconWrapper component with size variants
- [ ] Category icons for Monuments, Food, History, Culture
- [ ] Icon supports color customization
- [ ] Icon supports accessibility labels
- [ ] Icon scales properly with size variants
- [ ] All icons use theme colors
- [ ] Icon button variant with pressable state

---

## Implementation Steps

### Step 1: Create IconWrapper Component

**File:** `app/components/icons/IconWrapper.tsx`

```typescript
import { ComponentType } from "react"
import { View, ViewStyle, StyleProp, Pressable, PressableStateCallbackType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

type IconSize = "xs" | "sm" | "md" | "lg" | "xl"
type IconVariant = "default" | "filled" | "outlined" | "button"

interface IconWrapperProps {
  /**
   * Icon size
   */
  size?: IconSize
  /**
   * Icon variant
   */
  variant?: IconVariant
  /**
   * Icon color (uses theme tint by default)
   */
  color?: string
  /**
   * Accessibility label
   */
  accessibilityLabel?: string
  /**
   * Whether icon is pressable
   */
  pressable?: boolean
  /**
   * Press handler
   */
  onPress?: () => void
  /**
   * Icon component or element
   */
  children: ComponentType<{ size: number; color: string }> | React.ReactNode
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Test ID
   */
  testID?: string
}

const $sizes: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

/**
 * Icon Wrapper Component - Consistent icon styling
 */
export function IconWrapper({
  size = "md",
  variant = "default",
  color,
  accessibilityLabel,
  pressable = false,
  onPress,
  children,
  style,
  testID,
}: IconWrapperProps) {
  const { themed, theme } = useAppTheme()
  const iconSize = $sizes[size]
  const iconColor = color || theme.colors.tint

  const iconStyle: ThemedStyleArray<ViewStyle> = [
    themed($baseIcon),
    { width: iconSize, height: iconSize },
    themed($variants[variant]),
    style,
  ]

  const renderIcon = () => {
    if (typeof children === "function") {
      const IconComponent = children
      return <IconComponent size={iconSize} color={iconColor} />
    }

    return children
  }

  if (pressable || onPress) {
    return (
      <Pressable
        style={iconStyle}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {({ pressed }: PressableStateCallbackType) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            {renderIcon()}
          </View>
        )}
      </Pressable>
    )
  }

  return (
    <View
      style={iconStyle}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {renderIcon()}
    </View>
  )
}

const $baseIcon: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "center",
  alignItems: "center",
})

const $variants: Record<IconVariant, ThemedStyle<ViewStyle>> = {
  default: () => ({}),
  filled: ({ colors }) => ({
    backgroundColor: colors.palette.primary100,
    borderRadius: 8,
  }),
  outlined: ({ colors }) => ({
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  }),
  button: ({ colors, spacing }) => ({
    padding: spacing.xs,
    borderRadius: 8,
    backgroundColor: colors.palette.neutral200,
  }),
}
```

---

### Step 2: Create Category Icons

**File:** `app/components/icons/CategoryIcon.tsx`

```typescript
import { IconWrapper, IconWrapperProps } from "./IconWrapper"

type Category = "monuments" | "food" | "history" | "culture"

interface CategoryIconProps extends Omit<IconWrapperProps, "children" | "accessibilityLabel"> {
  /**
   * Category type
   */
  category: Category
}

const categoryIcons: Record<Category, string> = {
  monuments: "🏛️",
  food: "🍽️",
  history: "📜",
  culture: "🎭",
}

const categoryColors: Record<Category, string> = {
  monuments: "#1E5F9E",
  food: "#C17B5D",
  history: "#D4AF37",
  culture: "#8B5CF6",
}

/**
 * Category Icon Component - Icons for knowledge categories
 */
export function CategoryIcon({ category, ...rest }: CategoryIconProps) {
  const icon = categoryIcons[category]
  const color = categoryColors[category]

  return (
    <IconWrapper
      accessibilityLabel={`${category} category`}
      {...rest}
    >
      <CategoryIconElement icon={icon} color={color} />
    </IconWrapper>
  )
}

function CategoryIconElement({ icon, color }: { icon: string; color: string }) {
  return (
    <IconWrapper color={color}>
      {icon}
    </IconWrapper>
  )
}
```

---

### Step 3: Create IconSet Component

**File:** `app/components/icons/IconSet.tsx`

```typescript
import { IconWrapper, IconWrapperProps } from "./IconWrapper"

type IconName =
  | "search"
  | "close"
  | "back"
  | "forward"
  | "home"
  | "settings"
  | "profile"
  | "favorite"
  | "share"
  | "download"
  | "play"
  | "pause"
  | "location"
  | "language"
  | "theme"
  | "notification"

interface IconSetProps extends Omit<IconWrapperProps, "children"> {
  /**
   * Icon name
   */
  name: IconName
}

const iconMap: Record<IconName, string> = {
  search: "🔍",
  close: "✕",
  back: "←",
  forward: "→",
  home: "🏠",
  settings: "⚙️",
  profile: "👤",
  favorite: "❤️",
  share: "📤",
  download: "⬇️",
  play: "▶️",
  pause: "⏸️",
  location: "📍",
  language: "🌐",
  theme: "🎨",
  notification: "🔔",
}

/**
 * Icon Set Component - Common app icons
 */
export function IconSet({ name, ...rest }: IconSetProps) {
  const icon = iconMap[name]

  return (
    <IconWrapper accessibilityLabel={`${name} icon`} {...rest}>
      {icon}
    </IconWrapper>
  )
}
```

---

### Step 4: Create Icons Barrel Export

**File:** `app/components/icons/index.ts`

```typescript
export { IconWrapper } from "./IconWrapper"
export type { IconWrapperProps } from "./IconWrapper"

export { CategoryIcon } from "./CategoryIcon"
export type { CategoryIconProps } from "./CategoryIcon"

export { IconSet } from "./IconSet"
export type { IconSetProps } from "./IconSet"
```

---

## Mock Data

```typescript
// Category icon mapping
export const CATEGORY_ICONS = {
  monuments: "🏛️",
  food: "🍽️",
  history: "📜",
  culture: "🎭",
}

// Category color mapping
export const CATEGORY_COLORS = {
  monuments: "#1E5F9E",
  food: "#C17B5D",
  history: "#D4AF37",
  culture: "#8B5CF6",
}
```

---

## Integration Points

### Connects To

- **Feature 002** - Uses theme system for colors

### Used By

- **Feature 023** - Category Filter (category icons)
- **Feature 024** - Home Screen (action icons)
- **Feature 044** - Nearby Screen (location icon)
- **Feature 054** - Profile Screen (settings icons)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] IconWrapper renders with all size variants
- [ ] IconWrapper filled variant shows background
- [ ] IconWrapper outlined variant shows border
- [ ] IconWrapper button variant is pressable
- [ ] CategoryIcon shows correct icon and color
- [ ] CategoryIcon accessibility label is correct
- [ ] IconSet shows correct icon for name
- [ ] All icons scale properly
- [ ] Colors can be overridden

---

## Notes

- Using emoji as placeholder icons for now
- Can be replaced with vector icons (e.g., react-native-vector-icons) later
- Consider adding custom SVG icon support in the future
- Icons should maintain aspect ratio

---

## References

- [React Native Pressable](https://reactnative.dev/docs/pressable)
- [Accessibility for Images](https://reactnative.dev/docs/accessibility)
- [Feature 002 - Theme System](./002-theme-system.md)
