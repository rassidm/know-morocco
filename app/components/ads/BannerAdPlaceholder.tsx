import { View, type ViewStyle, type TextStyle } from "react-native"

import { Caption } from "@/components/text/Caption"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

/**
 * Banner Ad Placeholder - Placeholder for AdMob banner (Feature 051)
 */
export function BannerAdPlaceholder() {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <Caption text="Ad Banner (coming soon)" style={themed($text)} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 50,
  backgroundColor: colors.palette.neutral200,
  justifyContent: "center",
  alignItems: "center",
  borderTopWidth: 1,
  borderTopColor: colors.border,
  paddingVertical: spacing.xs,
})

const $text: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
