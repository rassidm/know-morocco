import { useEffect, useRef } from "react"
import { ViewStyle, StyleProp, Animated } from "react-native"

import { useAppTheme } from "@/theme/context"

export interface SkeletonProps {
  /**
   * Skeleton width (defaults to 100%)
   */
  width?: number | string
  /**
   * Skeleton height
   */
  height?: number | string
  /**
   * Border radius
   */
  borderRadius?: number
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Test ID
   */
  testID?: string
}

/**
 * Skeleton Component - Content placeholder during loading
 */
export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 4,
  style,
  testID,
}: SkeletonProps) {
  const { themed, theme } = useAppTheme()
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true,
      }),
    ])

    const loop = Animated.loop(pulse)
    loop.start()

    return () => loop.stop()
  }, [opacity])

  return (
    <Animated.View
      style={[
        themed($skeleton),
        {
          width: typeof width === "string" ? (width as `${number}%` | "auto") : width,
          height: typeof height === "string" ? (height as `${number}%` | "auto") : height,
          borderRadius,
          opacity,
          backgroundColor: theme.colors.palette.neutral300,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel="Loading content"
      testID={testID}
    />
  )
}

const $skeleton: ViewStyle = {
  overflow: "hidden",
}
