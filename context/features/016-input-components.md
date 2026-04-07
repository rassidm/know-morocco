# Feature: Input Components - TextInput, SearchInput

## Metadata

- **Feature ID:** 016
- **Phase:** 3 - Core UI Components
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 002 (Theme System)

---

## Goals

Create input components for the Know Morocco app, including a base TextInput component and a specialized SearchInput component. These components will provide consistent form styling, validation support, accessibility, and proper theme integration for all text input needs throughout the application.

### Acceptance Criteria

- [ ] Base TextInput component with label and error support
- [ ] SearchInput component with search icon and clear button
- [ ] Input validation error display
- [ ] Disabled and readonly states
- [ ] Placeholder text styling
- [ ] Focus state visual feedback
- [ ] All inputs use theme colors
- [ ] Accessibility labels supported

---

## Implementation Steps

### Step 1: Create Base TextInput Component

**File:** `app/components/inputs/TextInput.tsx`

```typescript
import { useState, forwardRef, ForwardedRef } from "react"
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  Pressable,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import { Caption } from "@/components/text/Caption"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  /**
   * Input label (displayed above input)
   */
  label?: string
  /**
   * i18n key for label
   */
  labelTx?: string
  /**
   * Error message
   */
  error?: string
  /**
   * i18n key for error message
   */
  errorTx?: string
  /**
   * Helper text (displayed below input)
   */
  helper?: string
  /**
   * i18n key for helper text
   */
  helperTx?: string
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
    ref
  ) => {
    const { themed } = useAppTheme()
    const [focused, setFocused] = useState(false)

    const handleFocus = () => setFocused(true)
    const handleBlur = () => setFocused(false)

    const hasError = !!error || !!errorTx
    const showHelper = !!helper || !!helperTx || (hasError && !error)

    return (
      <View style={[$container, containerStyle]}>
        {(label || labelTx) && (
          <Text
            tx={labelTx as any}
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

        {showHelper && (
          <Caption
            tx={hasError ? (errorTx as any) : (helperTx as any)}
            text={hasError ? error : helper}
            style={[hasError && themed($errorText)]}
          />
        )}
      </View>
    )
  }
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

const $input: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  flex: 1,
  fontSize: 16,
  lineHeight: 24,
  fontFamily: typography.primary.regular,
  padding: 0,
  marginRight: spacing.xs,
})

const $placeholder: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral400,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
})
```

---

### Step 2: Create SearchInput Component

**File:** `app/components/inputs/SearchInput.tsx`

```typescript
import { forwardRef } from "react"
import { View, Pressable, ViewStyle, TextStyle } from "react-native"

import { TextInput, TextInputProps } from "./TextInput"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface SearchInputProps extends Omit<TextInputProps, "RightAccessory" | "label" | "labelTx"> {
  /**
   * Search handler callback
   */
  onSearch?: (query: string) => void
  /**
   * Debounce delay (ms)
   */
  debounceMs?: number
}

/**
 * Search Input Component - Specialized input for search
 */
export const SearchInput = forwardRef((props: SearchInputProps, ref: any) => {
  const { themed } = useAppTheme()
  const { onSearch, debounceMs = 300, ...rest } = props

  return (
    <TextInput
      ref={ref}
      placeholder="Search..."
      placeholderTx="common:search"
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="web-search"
      returnKeyType="search"
      RightAccessory={({ focused }) => (
        <SearchIcon focused={focused} />
      )}
      {...rest}
    />
  )
})

SearchInput.displayName = "SearchInput"

function SearchIcon({ focused }: { focused: boolean }) {
  const { theme } = useAppTheme()

  return (
    <View style={[$searchIcon, focused && { opacity: 0.7 }]}>
      {/* Search icon - can be replaced with actual icon component */}
      <View style={themed($iconCircle)}>
        🔍
      </View>
    </View>
  )
}

const $searchIcon: ViewStyle = {
  marginLeft: 8,
}

const $iconCircle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: spacing.xs,
})
```

---

### Step 3: Create TextArea Component

**File:** `app/components/inputs/TextArea.tsx`

```typescript
import { forwardRef } from "react"
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, TextStyle } from "react-native"

import { TextInput } from "./TextInput"
import type { ThemedStyle } from "@/theme/types"

interface TextAreaProps extends Omit<RNTextInputProps, "style" | "multiline"> {
  /**
   * Number of visible lines
   */
  numberOfLines?: number
  /**
   * Custom style override
   */
  style?: any
}

/**
 * TextArea Component - Multi-line text input
 */
export const TextArea = forwardRef((props: TextAreaProps, ref: any) => {
  const { numberOfLines = 4, ...rest } = props

  return (
    <TextInput
      ref={ref}
      multiline
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      style={[$textArea, rest.style]}
      {...rest}
    />
  )
})

TextArea.displayName = "TextArea"

const $textArea: ThemedStyle<TextStyle> = ({ spacing }) => ({
  minHeight: numberOfLines * 24 + spacing.lg,
})
```

---

### Step 4: Create Inputs Barrel Export

**File:** `app/components/inputs/index.ts`

```typescript
export { TextInput } from "./TextInput"
export type { TextInputProps } from "./TextInput"

export { SearchInput } from "./SearchInput"
export type { SearchInputProps } from "./SearchInput"

export { TextArea } from "./TextArea"
export type { TextAreaProps } from "./TextArea"
```

---

## Mock Data

No mock data needed for this feature.

---

## Integration Points

### Connects To

- **Feature 002** - Uses theme system for colors and typography

### Used By

- **Feature 023** - Category Filter (search input)
- **Feature 044** - Nearby Screen (search input)
- **Feature 054** - Profile Screen (form inputs)
- **Feature 055** - Settings Screen (search and form inputs)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] TextInput renders with label
- [ ] TextInput shows error message when provided
- [ ] TextInput shows helper text
- [ ] TextInput focus state changes border color
- [ ] TextInput disabled state reduces opacity
- [ ] TextInput readonly state prevents editing
- [ ] SearchInput renders with search icon
- [ ] SearchInput has correct keyboard type
- [ ] TextArea renders as multi-line input
- [ ] All inputs support placeholder text
- [ ] Accessibility labels work correctly

---

## Notes

- TextInput uses forwardRef to support imperative methods
- Consider adding character count limit in the future
- SearchInput could integrate with debounce hook for performance
- Validation logic will be handled by parent components or forms

---

## References

- [React Native TextInput](https://reactnative.dev/docs/textinput)
- [Form Accessibility Guidelines](https://www.w3.org/WAI/tutorials/forms/)
- [Feature 002 - Theme System](./002-theme-system.md)
