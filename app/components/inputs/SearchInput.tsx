import { forwardRef } from "react"
import { View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { TextInput, TextInputProps } from "./TextInput"

export interface SearchInputProps extends Omit<
  TextInputProps,
  "RightAccessory" | "label" | "labelTx"
> {
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
  const { onSearch: _onSearch, debounceMs: _debounceMs, ...rest } = props

  return (
    <TextInput
      ref={ref}
      placeholder="Search..."
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="web-search"
      returnKeyType="search"
      RightAccessory={SearchIcon}
      {...rest}
    />
  )
})

SearchInput.displayName = "SearchInput"

function SearchIcon({ focused }: { focused: boolean }) {
  const { themed } = useAppTheme()

  return (
    <View style={[$searchIcon, focused && $iconFocused]}>
      <View style={themed($iconCircle)}>🔍</View>
    </View>
  )
}

const $searchIcon: ViewStyle = {
  marginLeft: 8,
}

const $iconFocused: ViewStyle = {
  opacity: 0.7,
}

const $iconCircle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: spacing.xs,
})
