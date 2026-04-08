# Feature: Category Filter - Filter Chips, Selection

## Metadata

- **Feature ID:** 023
- **Phase:** 4 - Knowledge Cards System
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 019 (Knowledge Card Model)

---

## Goals

Create category filter components that allow users to filter knowledge cards by category (Monuments, Food, History, Culture). This provides horizontal scrollable filter chips with selection states, enabling users to quickly focus on content types they're interested in.

### Acceptance Criteria

- [ ] CategoryFilter component with horizontal scrollable chips
- [ ] Each chip shows category name and icon
- [ ] Selected state visually distinct (filled vs outlined)
- [ ] Tapping chip toggles selection
- [ ] "All" chip to clear filters
- [ ] Smooth horizontal scrolling
- [ ] Component supports theme colors

---

## Implementation Steps

### Step 1: Create CategoryChip Component

**File:** `app/components/filters/CategoryChip.tsx`

```typescript
import { TouchableOpacity, ViewStyle, StyleProp, Text } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"
import { Icon } from "@/components/icons/Icon"

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
   * Icon name for category
   */
  iconName: string
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

/**
 * Category Chip Component - Individual filter chip with icon
 */
export function CategoryChip({
  category,
  label,
  iconName,
  selected,
  onPress,
  style,
}: CategoryChipProps) {
  const { themed, theme } = useAppTheme()

  const chipStyle: ThemedStyleArray<ViewStyle> = [
    themed($chip),
    selected ? themed($chipSelected) : themed($chipUnselected),
    style,
  ]

  const textColor = selected ? theme.colors.palette.neutral100 : theme.colors.textPrimary

  return (
    <TouchableOpacity
      style={chipStyle}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Filter by ${label}`}
    >
      <Icon name={iconName} size={16} color={textColor} />
      <Text style={[themed($chipText), { color: textColor }]}>{label}</Text>
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

const $chipText: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  fontSize: 14,
  fontWeight: "600",
  marginLeft: spacing.xs,
})
```

---

### Step 2: Create CategoryFilter Component

**File:** `app/components/filters/CategoryFilter.tsx`

```typescript
import { ScrollView, View, ViewStyle, StyleProp } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { Category } from "@/models/KnowledgeCard"
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

/**
 * Category mapping for display
 */
const CATEGORY_CONFIG: Record<CategoryName, { label: string; icon: string }> = {
  all: { label: "All", icon: "grid" },
  monuments: { label: "Monuments", icon: "monument" },
  food: { label: "Food", icon: "restaurant" },
  history: { label: "History", icon: "history" },
  culture: { label: "Culture", icon: "culture" },
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

  // Map category ID to name
  const getCategoryName = (id: string): CategoryName => {
    const category = categories.find((c) => c.id === id)
    return (category?.name ?? "all") as CategoryName
  }

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
              iconName={config.icon}
              selected={isSelected}
              onPress={() => onSelectCategory(chip.id)}
              style={themed($chipMargin)}
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

const $chipMargin: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.sm,
})
```

---

### Step 3: Create useCategoryFilter Hook

**File:** `app/hooks/useCategoryFilter.ts`

```typescript
import { useState, useCallback, useMemo } from "react"
import type { KnowledgeCardDisplay, Category } from "@/models/KnowledgeCard"

interface UseCategoryFilterOptions {
  /**
   * All available categories
   */
  categories: Category[]
  /**
   * Initial selected category (optional)
   */
  initialCategoryId?: string | "all"
}

/**
 * Hook for managing category filter state
 */
export function useCategoryFilter({
  categories,
  initialCategoryId = "all",
}: UseCategoryFilterOptions) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "all">(
    initialCategoryId
  )

  const selectCategory = useCallback((categoryId: string | "all") => {
    setSelectedCategoryId(categoryId)
  }, [])

  const clearFilter = useCallback(() => {
    setSelectedCategoryId("all")
  }, [])

  const isFiltered = selectedCategoryId !== "all"

  // Filter cards by selected category
  const filterCards = useCallback(
    (cards: KnowledgeCardDisplay[]): KnowledgeCardDisplay[] => {
      if (!isFiltered) return cards

      return cards.filter((card) => card.category_id === selectedCategoryId)
    },
    [selectedCategoryId, isFiltered]
  )

  // Get selected category name
  const selectedCategoryName = useMemo(() => {
    if (selectedCategoryId === "all") return "All"
    const category = categories.find((c) => c.id === selectedCategoryId)
    return category?.name ?? "All"
  }, [selectedCategoryId, categories])

  return {
    selectedCategoryId,
    selectCategory,
    clearFilter,
    isFiltered,
    filterCards,
    selectedCategoryName,
  }
}
```

---

## Mock Data

```typescript
import type { Category } from "@/models/KnowledgeCard"

// Mock categories for filter testing
export const MOCK_FILTER_CATEGORIES: Category[] = [
  { id: "cat-monuments", name: "monuments", icon: "monument", display_order: 1 },
  { id: "cat-food", name: "food", icon: "restaurant", display_order: 2 },
  { id: "cat-history", name: "history", icon: "history", display_order: 3 },
  { id: "cat-culture", name: "culture", icon: "culture", display_order: 4 },
]
```

---

## Integration Points

### Connects To

- **Feature 019** - Knowledge Card Model (Category type)
- **Feature 018** - Icon Components (category icons)

### Used By

- **Feature 024** - Home Screen (filter cards by category)
- **Feature 044** - Nearby Screen (filter nearby cards)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] CategoryFilter renders with all categories
- [ ] "All" chip displays first
- [ ] Chips show correct labels and icons
- [ ] Selected chip has distinct visual style
- [ ] Tapping chip selects category
- [ ] Tapping selected chip does not deselect (must tap "All" to clear)
- [ ] ScrollView scrolls horizontally without vertical scroll
- [ ] useCategoryFilter hook filters cards correctly
- [ ] clearFilter resets to "all"
- [ ] Accessibility labels are correct

---

## Notes

- "All" filter is always present as first chip
- Chip selection is single-select (not multi-select)
- Icons map to category names (defined in CATEGORY_CONFIG)
- Horizontal scrolling prevents layout issues with many categories
- Future enhancement: add multi-select support
- Future enhancement: add category count badges

---

## References

- [React Native ScrollView](https://reactnative.dev/docs/scrollview)
- [Feature 019 - Knowledge Card Model](./019-knowledge-card-model.md)
- [Feature 018 - Icon Components](./018-icon-components.md)
