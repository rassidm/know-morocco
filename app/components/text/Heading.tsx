import { type ReactNode } from "react"
import { type StyleProp, type TextStyle } from "react-native"

import { Text, type TextProps } from "@/components/Text"

interface HeadingProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Heading level
   */
  level?: 1 | 2 | 3 | 4
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components
   */
  children?: ReactNode
}

const $h1: TextStyle = { fontSize: 32, lineHeight: 40, fontWeight: "700" }
const $h2: TextStyle = { fontSize: 28, lineHeight: 36, fontWeight: "700" }
const $h3: TextStyle = { fontSize: 24, lineHeight: 32, fontWeight: "600" }
const $h4: TextStyle = { fontSize: 20, lineHeight: 28, fontWeight: "600" }

const $headingStyles: Record<number, TextStyle> = {
  1: $h1,
  2: $h2,
  3: $h3,
  4: $h4,
}

/**
 * Heading Component - For titles and section headers
 */
export function Heading({ level = 1, style, ...rest }: HeadingProps) {
  return (
    <Text
      preset="heading"
      weight="bold"
      size={level <= 2 ? "xxl" : "xl"}
      style={[$headingStyles[level], style]}
      {...rest}
    />
  )
}
