import { ReactNode } from "react"
import { ViewStyle, StyleProp, Pressable, PressableProps, View } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

type CardVariant = "elevated" | "outlined" | "filled"

export interface BaseCardProps extends Omit<PressableProps, "style"> {
  /**
   * Card variant
   */
  variant?: CardVariant
  /**
   * Whether card is pressable
   */
  pressable?: boolean
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Card content
   */
  children: ReactNode
  /**
   * Test ID
   */
  testID?: string
}

/**
 * Base Card Component - Container for card content
 */
export function BaseCard({
  variant = "elevated",
  pressable = false,
  style,
  children,
  testID,
  ...pressableProps
}: BaseCardProps) {
  const { themed } = useAppTheme()

  const $cardStyle: StyleProp<ViewStyle> = [themed($baseCard), themed($variants[variant]), style]

  if (pressable) {
    return (
      <Pressable style={$cardStyle} testID={testID} {...pressableProps}>
        {children}
      </Pressable>
    )
  }

  return (
    <View style={$cardStyle} testID={testID}>
      {children}
    </View>
  )
}

const $baseCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: 12,
  overflow: "hidden",
  padding: spacing.md,
})

const $variants: Record<CardVariant, ThemedStyle<ViewStyle>> = {
  elevated: ({ colors, spacing }) => ({
    backgroundColor: colors.palette.neutral100,
    shadowColor: colors.palette.neutral800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  }),
  outlined: ({ colors }) => ({
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.border,
  }),
  filled: ({ colors }) => ({
    backgroundColor: colors.palette.neutral200,
  }),
}
