import { ComponentType, ReactNode } from "react"
import { View, ViewStyle, StyleProp, Pressable, PressableStateCallbackType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl"
export type IconVariant = "default" | "filled" | "outlined" | "button"

export interface IconWrapperProps {
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
  children: ComponentType<{ size: number; color: string }> | ReactNode
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

  const iconStyle: StyleProp<ViewStyle> = [
    themed($baseIcon),
    { width: iconSize, height: iconSize },
    themed($variants[variant]),
    style,
  ]

  const renderIcon = () => {
    if (typeof children === "function") {
      const IconComponent = children as ComponentType<{ size: number; color: string }>
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
          <View style={themed($pressedIcon(pressed))}>{renderIcon()}</View>
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

const $pressedIcon =
  (pressed: boolean): ThemedStyle<ViewStyle> =>
  () => ({
    opacity: pressed ? 0.6 : 1,
  })
