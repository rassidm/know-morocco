import { ReactNode } from "react"
import { type StyleProp, type TextStyle } from "react-native"

import { Text, type TextProps } from "@/components/Text"

interface LabelProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Label variant
   */
  variant?: "default" | "badge"
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components
   */
  children?: ReactNode
}

const $labelDefault: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
}

const $labelBadge: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  textTransform: "uppercase",
  letterSpacing: 0.5,
}

/**
 * Label Component - For form labels and badges
 */
export function Label({ variant = "default", style, ...rest }: LabelProps) {
  const $labelStyle = variant === "badge" ? $labelBadge : $labelDefault

  return (
    <Text preset="formLabel" weight="medium" size="sm" style={[$labelStyle, style]} {...rest} />
  )
}
