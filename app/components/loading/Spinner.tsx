import { useEffect, useRef } from "react"
import { View, ViewStyle, StyleProp, Animated, StyleSheet } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export type SpinnerSize = "small" | "medium" | "large"
export type SpinnerVariant = "default" | "overlay"

export interface SpinnerProps {
  /**
   * Spinner size
   */
  size?: SpinnerSize
  /**
   * Spinner variant
   */
  variant?: SpinnerVariant
  /**
   * Custom color override
   */
  color?: string
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Accessibility label
   */
  accessibilityLabel?: string
  /**
   * Test ID
   */
  testID?: string
}

const $sizes: Record<SpinnerSize, { size: number; strokeWidth: number }> = {
  small: { size: 20, strokeWidth: 2 },
  medium: { size: 32, strokeWidth: 3 },
  large: { size: 48, strokeWidth: 4 },
}

/**
 * Spinner Component - Loading indicator
 */
export function Spinner({
  size = "medium",
  variant = "default",
  color,
  style,
  accessibilityLabel = "Loading",
  testID,
}: SpinnerProps) {
  const { themed, theme } = useAppTheme()
  const sizeConfig = $sizes[size]
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    )
    spin.start()

    return () => spin.stop()
  }, [spinValue])

  const spinRotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const spinnerColor = color || theme.colors.tint

  return (
    <View
      style={[variant === "overlay" && themed($overlay), style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Animated.View
        style={[
          themed($spinner),
          themed($spinnerBorder(spinnerColor)),
          {
            width: sizeConfig.size,
            height: sizeConfig.size,
            borderRadius: sizeConfig.size / 2,
            borderWidth: sizeConfig.strokeWidth,
            transform: [{ rotate: spinRotation }],
          },
        ]}
      />
    </View>
  )
}

const $spinner: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $spinnerBorder =
  (activeColor: string): ThemedStyle<ViewStyle> =>
  ({ colors }) => ({
    borderTopColor: activeColor,
    borderRightColor: activeColor,
    borderBottomColor: colors.transparent,
    borderLeftColor: colors.transparent,
  })

const $overlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: colors.palette.overlay50,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
})
