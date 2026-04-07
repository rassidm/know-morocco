import { ReactNode } from "react"
import { type StyleProp, type TextStyle } from "react-native"

import { Text, type TextProps } from "@/components/Text"

interface CaptionProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components
   */
  children?: ReactNode
}

const $caption: TextStyle = {
  fontSize: 12,
  lineHeight: 18,
}

/**
 * Caption Component - For metadata and secondary text
 */
export function Caption({ style, ...rest }: CaptionProps) {
  return (
    <Text
      preset="formHelper"
      weight="normal"
      size="sm"
      color="textDim"
      style={[$caption, style]}
      {...rest}
    />
  )
}
