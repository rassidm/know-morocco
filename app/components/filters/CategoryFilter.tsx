import { ScrollView, View, type ViewStyle, type StyleProp } from "react-native"

import type { Category } from "@/models/KnowledgeCard"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { CategoryChip } from "./CategoryChip"

type CategoryName = "all" | "monuments" | "food" | "history" | "culture"

interface CategoryFilterProps {
  /**
   * Available categories
   */
  categories: Category[]
  /**
   * Currently selected category ID (or "all")
   */
  selectedCategoryId: string | "all"
  /**
   * Called when category is selected
   */
  onSelectCategory: (categoryId: string | "all") => void
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

export type { CategoryFilterProps }

/**
 * Category mapping for display
 */
const CATEGORY_CONFIG: Record<CategoryName, { label: string; icon: string }> = {
  all: { label: "All", icon: "📋" },
  monuments: { label: "Monuments", icon: "🏛️" },
  food: { label: "Food", icon: "🍽️" },
  history: { label: "History", icon: "📜" },
  culture: { label: "Culture", icon: "🎭" },
}

/**
 * Category Filter Component - Horizontal scrollable filter chips
 */
export function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
  style,
}: CategoryFilterProps) {
  const { themed } = useAppTheme()

  // Build chip list (always includes "All" first)
  const chips: Array<{ id: string | "all"; name: CategoryName }> = [
    { id: "all", name: "all" },
    ...categories.map((cat) => ({ id: cat.id, name: cat.name as CategoryName })),
  ]

  return (
    <View style={[themed($container), style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={themed($scrollContent)}
      >
        {chips.map((chip) => {
          const config = CATEGORY_CONFIG[chip.name]
          const isSelected = selectedCategoryId === chip.id

          return (
            <CategoryChip
              key={chip.id}
              category={chip.name}
              label={config.label}
              iconEmoji={config.icon}
              selected={isSelected}
              onPress={() => onSelectCategory(chip.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $scrollContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  gap: spacing.sm,
})
