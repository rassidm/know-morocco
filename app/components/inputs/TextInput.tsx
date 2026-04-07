import { useState, forwardRef } from "react"
/* eslint-disable no-restricted-imports -- Need RN TextInput for wrapper */
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native"
/* eslint-enable no-restricted-imports */

import { Text } from "@/components/Text"
import { Caption } from "@/components/text/Caption"
import { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  /**
   * Input label (displayed above input)
   */
  label?: string
  /**
   * i18n key for label
   */
  labelTx?: TxKeyPath
  /**
   * Error message
   */
  error?: string
  /**
   * i18n key for error message
   */
  errorTx?: TxKeyPath
  /**
   * Helper text (displayed below input)
   */
  helper?: string
  /**
   * i18n key for helper text
   */
  helperTx?: TxKeyPath
  /**
   * Whether input is disabled
   */
  disabled?: boolean
  /**
   * Whether input is readonly
   */
  readonly?: boolean
  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Custom input style
   */
  inputStyle?: StyleProp<TextStyle>
  /**
   * Right accessory component
   */
  RightAccessory?: React.ComponentType<{ focused: boolean }>
  /**
   * Test ID
   */
  testID?: string
}

/**
 * TextInput Component - Base input with label and error
 */
export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      labelTx,
      error,
      errorTx,
      helper,
      helperTx,
      disabled = false,
      readonly = false,
      containerStyle,
      inputStyle,
      RightAccessory,
      testID,
      ...rest
    },
    ref,
  ) => {
    const { themed } = useAppTheme()
    const [focused, setFocused] = useState(false)

    const handleFocus = () => setFocused(true)
    const handleBlur = () => setFocused(false)

    const hasError = !!error || !!errorTx

    return (
      <View style={[$container, containerStyle]}>
        {(label || labelTx) && (
          <Text
            tx={labelTx}
            text={label}
            preset="formLabel"
            style={[$label, disabled && themed($disabledLabel)]}
          />
        )}

        <View
          style={[
            themed($inputContainer),
            focused && themed($focusedContainer),
            hasError && themed($errorContainer),
            disabled && themed($disabledContainer),
          ]}
        >
          <RNTextInput
            ref={ref}
            style={[themed($input), inputStyle]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled && !readonly}
            selectTextOnFocus={!readonly}
            testID={testID}
            placeholderTextColor={themed($placeholder).color}
            {...rest}
          />

          {RightAccessory && <RightAccessory focused={focused} />}
        </View>

        {(hasError || helper || helperTx) && (
          <Caption
            tx={hasError ? errorTx : helperTx}
            text={hasError ? error : helper}
            style={hasError && themed($errorText)}
          />
        )}
      </View>
    )
  },
)

TextInput.displayName = "TextInput"

const $container: ViewStyle = {
  gap: 6,
}

const $label: TextStyle = {
  marginBottom: 4,
}

const $disabledLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $inputContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 8,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  backgroundColor: colors.palette.neutral100,
})

const $focusedContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.tint,
  borderWidth: 2,
})

const $errorContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.error,
})

const $disabledContainer: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.5,
})

const $input: ThemedStyle<TextStyle> = ({ spacing }) => ({
  flex: 1,
  fontSize: 16,
  lineHeight: 24,
  padding: 0,
  marginRight: spacing.xs,
})

const $placeholder: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral400,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
})
