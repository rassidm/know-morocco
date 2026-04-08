import { TouchableOpacity, type ViewStyle, type TextStyle, type StyleProp } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

type CategoryName = "all" | "monuments" | "food" | "history" | "culture"

interface CategoryChipProps {
  /**
   * Category identifier
   */
  category: CategoryName
  /**
   * Display label
   */
  label: string
  /**
   * Emoji icon for category
   */
  iconEmoji: string
  /**
   * Whether chip is selected
   */
  selected: boolean
  /**
   * Called when chip is tapped
   */
  onPress: () => void
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

export type { CategoryChipProps }

/**
 * Category Chip Component - Individual filter chip with icon
 */
export function CategoryChip({
  category: _category,
  label,
  iconEmoji,
  selected,
  onPress,
  style,
}: CategoryChipProps) {
  const { themed, theme } = useAppTheme()

  const chipStyle: StyleProp<ViewStyle> = [
    themed($chip),
    selected ? themed($chipSelected) : themed($chipUnselected),
    style,
  ]

  const textColor = selected ? theme.colors.palette.neutral100 : theme.colors.text

  return (
    <TouchableOpacity
      style={chipStyle}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Filter by ${label}`}
    >
      <Text style={$icon}>{iconEmoji}</Text>
      <Text style={[$chipText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  )
}

const $chip: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderRadius: 20,
  borderWidth: 1,
})

const $chipSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
  borderColor: colors.palette.primary500,
})

const $chipUnselected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.border,
})

const $chipText: TextStyle = {
  fontSize: 14,
  fontWeight: "600",
}

const $icon: TextStyle = {
  fontSize: 16,
  lineHeight: 16,
}
