import { forwardRef } from "react"
/* eslint-disable no-restricted-imports -- Need RN TextInput for wrapper */
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  StyleProp,
} from "react-native"
/* eslint-enable no-restricted-imports */

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { TextInput } from "./TextInput"

export interface TextAreaProps extends Omit<RNTextInputProps, "style" | "multiline"> {
  /**
   * Number of visible lines
   */
  numberOfLines?: number
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
}

/**
 * TextArea Component - Multi-line text input
 */
export const TextArea = forwardRef<RNTextInput, TextAreaProps>((props, ref) => {
  const { numberOfLines = 4, style, ...rest } = props
  const { themed } = useAppTheme()

  return (
    <TextInput
      ref={ref}
      multiline
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      inputStyle={[themed($textArea(numberOfLines)), style]}
      {...rest}
    />
  )
})

TextArea.displayName = "TextArea"

const $textArea =
  (lines: number): ThemedStyle<TextStyle> =>
  ({ spacing }) => ({
    minHeight: lines * 24 + spacing.lg,
  })
