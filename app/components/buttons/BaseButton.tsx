import { ComponentType, ReactNode } from "react"
import { ActivityIndicator, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

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

const $sizeStyles: Record<
  ButtonSize,
  { height: number; paddingHorizontal: number; fontSize: number }
> = {
  small: { height: 40, paddingHorizontal: 16, fontSize: 14 },
  medium: { height: 48, paddingHorizontal: 24, fontSize: 16 },
  large: { height: 56, paddingHorizontal: 32, fontSize: 18 },
}

/**
 * Base Button Component
 * A comprehensive button component with support for multiple variants, sizes,
 * loading states, disabled states, and icon accessories.
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

  const $buttonStyle = [
    themed($baseButton),
    {
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingHorizontal,
    },
    themed($variants[variant]),
    disabled && themed($disabled),
    style,
  ]

  const $textStyle = [
    themed($baseText),
    { fontSize: sizeConfig.fontSize },
    themed($textVariants[variant]),
    disabled && themed($disabledText),
    textStyle,
  ]

  const iconColor = getTextColor(variant, disabled, theme.colors.tint)

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
        <View style={[$contentContainer, pressed && $pressedState]}>
          {loading ? (
            <ActivityIndicator
              color={variant === "outline" || variant === "ghost" ? theme.colors.tint : "#FFF"}
            />
          ) : (
            <>
              {LeftIcon && <LeftIcon color={iconColor} size={sizeConfig.fontSize} />}

              {children || <Text tx={tx as any} text={text} style={$textStyle} />}

              {RightIcon && <RightIcon color={iconColor} size={sizeConfig.fontSize} />}
            </>
          )}
        </View>
      )}
    </Pressable>
  )
}

function getTextColor(variant: ButtonVariant, disabled: boolean, tint: string): string {
  if (disabled) return "#999"
  switch (variant) {
    case "primary":
      return "#FFF"
    case "secondary":
      return "#333"
    case "outline":
      return tint
    case "ghost":
      return tint
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

const $pressedState: ViewStyle = {
  opacity: 0.8,
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
