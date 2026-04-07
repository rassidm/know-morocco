import { type ReactNode } from "react"
import { type StyleProp, type TextStyle } from "react-native"

import { Text, type TextProps } from "@/components/Text"

interface BodyProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Body variant
   */
  variant?: "large" | "default" | "small"
  /**
   * Whether text is secondary (muted color)
   */
  secondary?: boolean
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components
   */
  children?: ReactNode
}

const $bodyLarge: TextStyle = { fontSize: 18, lineHeight: 26 }
const $bodyDefault: TextStyle = { fontSize: 16, lineHeight: 24 }
const $bodySmall: TextStyle = { fontSize: 14, lineHeight: 20 }

const $bodyStyles: Record<string, TextStyle> = {
  large: $bodyLarge,
  default: $bodyDefault,
  small: $bodySmall,
}

/**
 * Body Component - For main content text
 */
export function Body({ variant = "default", secondary, style, ...rest }: BodyProps) {
  return (
    <Text
      preset="default"
      weight="normal"
      size="md"
      color={secondary ? "textDim" : undefined}
      style={[$bodyStyles[variant], style]}
      {...rest}
    />
  )
}
