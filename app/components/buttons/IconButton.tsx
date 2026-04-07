import { ComponentType } from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface IconButtonProps {
  /**
   * Icon component to render
   */
  Icon: ComponentType<{ color: string; size: number }>
  /**
   * Button size
   */
  size?: "small" | "medium" | "large"
  /**
   * Button variant style
   */
  variant?: "default" | "filled" | "ghost"
  /**
   * Whether button is disabled
   */
  disabled?: boolean
  /**
   * Accessibility label
   */
  accessibilityLabel?: string
  /**
   * Button press handler
   */
  onPress: () => void
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Test ID
   */
  testID?: string
}

const $sizes = {
  small: { buttonSize: 32, iconSize: 16 },
  medium: { buttonSize: 40, iconSize: 20 },
  large: { buttonSize: 48, iconSize: 24 },
}

/**
 * Icon Button - Icon-only actions
 * Used for actions that are represented by an icon only, such as close, back, or settings
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
        disabled && $disabledState,
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

const $disabledState: ViewStyle = {
  opacity: 0.5,
}
