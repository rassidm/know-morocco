import { ReactNode } from "react"
import { View, ViewStyle, StyleProp } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface CardActionsProps {
  /**
   * Action buttons/content
   */
  children: ReactNode
  /**
   * Layout direction
   */
  direction?: "horizontal" | "vertical"
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Card Actions Component - Action buttons container
 */
export function CardActions({ children, direction = "horizontal", style }: CardActionsProps) {
  const { themed } = useAppTheme()

  return (
    <View style={[themed($actionsContainer), direction === "vertical" && $vertical, style]}>
      {children}
    </View>
  )
}

const $actionsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginTop: spacing.md,
  justifyContent: "flex-end",
})

const $vertical: ViewStyle = {
  flexDirection: "column",
  gap: 8,
}
