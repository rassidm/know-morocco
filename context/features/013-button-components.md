# Feature: Button Components - Primary, Secondary, Icon

## Metadata

- **Feature ID:** 013
- **Phase:** 3 - Core UI Components
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 002 (Theme System)

---

## Goals

Create a comprehensive set of button components for the Know Morocco app. This feature provides primary, secondary, outline, and icon buttons with loading states, disabled states, and proper accessibility support. These components will be used throughout the app for all user actions.

### Acceptance Criteria

- [ ] PrimaryButton component with filled style
- [ ] SecondaryButton component with outlined style
- [ ] IconButton component for icon-only actions
- [ ] Loading state with spinner indicator
- [ ] Disabled state with reduced opacity
- [ ] All buttons use theme colors
- [ ] Accessibility labels supported
- [ ] Pressable feedback (scale/opacity animation)

---

## Implementation Steps

### Step 1: Create Base Button Component

**File:** `app/components/buttons/BaseButton.tsx`

```typescript
import { ComponentType, ReactNode } from "react"
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost"
type ButtonSize = "small" | "medium" | "large"

export interface ButtonProps {
  /**
   * Button variant style
   */
  variant?: ButtonVariant
  /**
   * Button size
   */
  size?: ButtonSize
  /**
   * Button text (i18n key)
   */
  tx?: string
  /**
   * Button text (direct string)
   */
  text?: string
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom text style override
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Whether button is disabled
   */
  disabled?: boolean
  /**
   * Whether button is loading
   */
  loading?: boolean
  /**
   * Left icon component
   */
  LeftIcon?: ComponentType<{ color: string; size: number }>
  /**
   * Right icon component
   */
  RightIcon?: ComponentType<{ color: string; size: number }>
  /**
   * Accessibility label
   */
  accessibilityLabel?: string
  /**
   * Button press handler
   */
  onPress: () => void
  /**
   * Children (alternative to tx/text)
   */
  children?: ReactNode
  /**
   * Test ID
   */
  testID?: string
}

const $sizeStyles: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  small: { height: 40, paddingHorizontal: 16, fontSize: 14 },
  medium: { height: 48, paddingHorizontal: 24, fontSize: 16 },
  large: { height: 56, paddingHorizontal: 32, fontSize: 18 },
}

/**
 * Base Button Component
 */
export function BaseButton({
  variant = "primary",
  size = "medium",
  tx,
  text,
  style,
  textStyle,
  disabled = false,
  loading = false,
  LeftIcon,
  RightIcon,
  accessibilityLabel,
  onPress,
  children,
  testID,
}: ButtonProps) {
  const { themed, theme } = useAppTheme()
  const sizeConfig = $sizeStyles[size]

  const $buttonStyle: ThemedStyleArray<ViewStyle> = [
    themed($baseButton),
    {
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingHorizontal,
    },
    themed($variants[variant]),
    disabled && themed($disabled),
    style,
  ]

  const $textStyle: ThemedStyleArray<TextStyle> = [
    themed($baseText),
    { fontSize: sizeConfig.fontSize },
    themed($textVariants[variant]),
    disabled && themed($disabledText),
    textStyle,
  ]

  return (
    <Pressable
      style={$buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || text || tx}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
    >
      {({ pressed }) => (
        <View style={[$contentContainer, { opacity: pressed ? 0.8 : 1 }]}>
          {loading ? (
            <ActivityIndicator color={variant === "outline" ? theme.colors.tint : theme.colors.text} />
          ) : (
            <>
              {LeftIcon && <LeftIcon color={getTextColor(variant, disabled)} size={sizeConfig.fontSize} />}
              
              {children || <Text tx={tx as any} text={text} style={$textStyle} />}
              
              {RightIcon && <RightIcon color={getTextColor(variant, disabled)} size={sizeConfig.fontSize} />}
            </>
          )}
        </View>
      )}
    </Pressable>
  )
}

function getTextColor(variant: ButtonVariant, disabled: boolean): string {
  if (disabled) return "#999"
  switch (variant) {
    case "primary":
      return "#FFF"
    case "secondary":
      return "#333"
    case "outline":
      return "#1E5F9E"
    case "ghost":
      return "#1E5F9E"
    default:
      return "#333"
  }
}

const $contentContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
}

const $baseButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.md,
})

const $variants: Record<ButtonVariant, ThemedStyle<ViewStyle>> = {
  primary: ({ colors }) => ({
    backgroundColor: colors.tint,
  }),
  secondary: ({ colors }) => ({
    backgroundColor: colors.palette.neutral200,
  }),
  outline: ({ colors }) => ({
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.tint,
  }),
  ghost: () => ({
    backgroundColor: "transparent",
  }),
}

const $disabled: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.5,
})

const $baseText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.medium,
})

const $textVariants: Record<ButtonVariant, ThemedStyle<TextStyle>> = {
  primary: ({ colors }) => ({
    color: colors.palette.neutral100,
  }),
  secondary: ({ colors }) => ({
    color: colors.text,
  }),
  outline: ({ colors }) => ({
    color: colors.tint,
  }),
  ghost: ({ colors }) => ({
    color: colors.tint,
  }),
}

const $disabledText: ThemedStyle<TextStyle> = () => ({
  opacity: 0.6,
})
```

---

### Step 2: Create Button Variants

**File:** `app/components/buttons/PrimaryButton.tsx`

```typescript
import { BaseButton, ButtonProps } from "./BaseButton"

interface PrimaryButtonProps extends Omit<ButtonProps, "variant"> {}

/**
 * Primary Button - Main call-to-action
 */
export function PrimaryButton(props: PrimaryButtonProps) {
  return <BaseButton variant="primary" {...props} />
}
```

**File:** `app/components/buttons/SecondaryButton.tsx`

```typescript
import { BaseButton, ButtonProps } from "./BaseButton"

interface SecondaryButtonProps extends Omit<ButtonProps, "variant"> {}

/**
 * Secondary Button - Alternative actions
 */
export function SecondaryButton(props: SecondaryButtonProps) {
  return <BaseButton variant="secondary" {...props} />
}
```

**File:** `app/components/buttons/OutlineButton.tsx`

```typescript
import { BaseButton, ButtonProps } from "./BaseButton"

interface OutlineButtonProps extends Omit<ButtonProps, "variant"> {}

/**
 * Outline Button - Less prominent actions
 */
export function OutlineButton(props: OutlineButtonProps) {
  return <BaseButton variant="outline" {...props} />
}
```

---

### Step 3: Create IconButton Component

**File:** `app/components/buttons/IconButton.tsx`

```typescript
import { ComponentType } from "react"
import { Pressable, ViewStyle, StyleProp } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface IconButtonProps {
  Icon: ComponentType<{ color: string; size: number }>
  size?: "small" | "medium" | "large"
  variant?: "default" | "filled" | "ghost"
  disabled?: boolean
  accessibilityLabel?: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  testID?: string
}

const $sizes = {
  small: { buttonSize: 32, iconSize: 16 },
  medium: { buttonSize: 40, iconSize: 20 },
  large: { buttonSize: 48, iconSize: 24 },
}

/**
 * Icon Button - Icon-only actions
 */
export function IconButton({
  Icon,
  size = "medium",
  variant = "ghost",
  disabled = false,
  accessibilityLabel,
  onPress,
  style,
  testID,
}: IconButtonProps) {
  const { themed, theme } = useAppTheme()
  const sizeConfig = $sizes[size]

  return (
    <Pressable
      style={[
        themed($iconButton),
        {
          width: sizeConfig.buttonSize,
          height: sizeConfig.buttonSize,
          borderRadius: sizeConfig.buttonSize / 2,
        },
        variant === "filled" && themed($filledVariant),
        disabled && { opacity: 0.5 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Icon color={theme.colors.tint} size={sizeConfig.iconSize} />
    </Pressable>
  )
}

const $iconButton: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "center",
  alignItems: "center",
})

const $filledVariant: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary100,
})
```

---

### Step 4: Create Button Barrel Export

**File:** `app/components/buttons/index.ts`

```typescript
export { BaseButton } from "./BaseButton"
export type { ButtonProps } from "./BaseButton"

export { PrimaryButton } from "./PrimaryButton"
export { SecondaryButton } from "./SecondaryButton"
export { OutlineButton } from "./OutlineButton"
export { IconButton } from "./IconButton"
```

---

## Mock Data

No mock data needed for this feature.

---

## Integration Points

### Connects To

- **Feature 002** - Uses theme system for colors and typography

### Used By

- **Feature 010** - Login Screen (sign-in button)
- **Feature 015** - Card Components (action buttons)
- **Feature 024** - Home Screen (CTA buttons)
- **Feature 054** - Profile Screen (settings buttons)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] PrimaryButton renders with correct colors
- [ ] SecondaryButton renders with outline style
- [ ] OutlineButton renders with transparent background
- [ ] IconButton renders icon only with proper sizing
- [ ] Loading state shows spinner instead of text
- [ ] Disabled state reduces opacity
- [ ] Press animation provides visual feedback
- [ ] Accessibility labels work correctly
- [ ] All size variants render correctly

---

## Notes

- Existing Button component from Ignite boilerplate can be enhanced or replaced
- Button should support both i18n keys (tx) and direct text
- Consider adding ripple effect for Android
- All buttons should be minimum 44x44 touch target for accessibility

---

## References

- [React Native Pressable](https://reactnative.dev/docs/pressable)
- [Accessibility Guidelines](https://reactnative.dev/docs/accessibility)
- [Feature 002 - Theme System](./002-theme-system.md)
