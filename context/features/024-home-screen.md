# Feature: Home Screen - Main Feed with Mock Cards

## Metadata

- **Feature ID:** 024
- **Phase:** 4 - Knowledge Cards System
- **Status:** Not Started
- **Estimated Time:** 60 minutes
- **Dependencies:** 020 (Card Content Display), 021 (Audio Player), 022 (Card Swipe Navigation), 023 (Category Filter)

---

## Goals

Build the main Home screen that displays a swipeable feed of knowledge cards with category filtering. This screen integrates all Phase 4 components into a cohesive user experience, serving as the primary interface for browsing cultural content.

### Acceptance Criteria

- [ ] HomeScreen renders with header and card feed
- [ ] CategoryFilter displays at top of screen
- [ ] Cards display in swipeable stack
- [ ] Filtering by category updates card feed
- [ ] Empty state shows when no cards match filter
- [ ] Screen responds to theme changes
- [ ] Safe area insets respected
- [ ] AdMob banner placeholder at bottom

---

## Implementation Steps

### Step 1: Create HomeScreen Component

**File:** `app/screens/Home/HomeScreen.tsx`

```typescript
import { useState, useCallback } from "react"
import { View, SafeAreaView, ViewStyle, StyleProp } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Heading } from "@/components/text/Heading"
import { Caption } from "@/components/text/Caption"
import { CardStack } from "@/components/cards/CardStack"
import { CategoryFilter } from "@/components/filters/CategoryFilter"
import { MOCK_KNOWLEDGE_CARDS, MOCK_CATEGORIES } from "@/models"
import { useCategoryFilter } from "@/hooks/useCategoryFilter"
import { BannerAdPlaceholder } from "@/components/ads/BannerAdPlaceholder"

/**
 * Home Screen - Main feed with swipeable cards
 */
export function HomeScreen() {
  const { themed } = useAppTheme()
  const insets = useSafeAreaInsets()

  // Filter state
  const { selectedCategoryId, selectCategory, filterCards, isFiltered } =
    useCategoryFilter({
      categories: MOCK_CATEGORIES,
    })

  // Filter cards based on selection
  const filteredCards = filterCards(MOCK_KNOWLEDGE_CARDS)

  // Current card index
  const [cardIndex, setCardIndex] = useState(0)

  // Handle index change
  const handleIndexChange = useCallback((index: number) => {
    setCardIndex(index)
  }, [])

  // Reset index when filter changes
  const handleSelectCategory = useCallback(
    (categoryId: string | "all") => {
      selectCategory(categoryId)
      setCardIndex(0) // Reset to first card
    },
    [selectCategory]
  )

  return (
    <SafeAreaView style={[themed($container), { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={themed($header)}>
        <Heading level={1} text="Discover Morocco" style={themed($title)} />
        <Caption text="Swipe to explore monuments, food, history, and culture" />
      </View>

      {/* Category Filter */}
      <CategoryFilter
        categories={MOCK_CATEGORIES}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
      />

      {/* Active Filter Indicator */}
      {isFiltered && (
        <View style={themed($activeFilter)}>
          <Caption text="Filtering by category" />
        </View>
      )}

      {/* Card Stack */}
      <View style={themed($cardContainer)}>
        {filteredCards.length > 0 ? (
          <CardStack
            cards={filteredCards}
            currentIndex={cardIndex}
            onIndexChange={handleIndexChange}
          />
        ) : (
          <View style={themed($emptyState)}>
            <Caption text="No cards found for this category" style={themed($emptyText)} />
          </View>
        )}
      </View>

      {/* AdMob Banner Placeholder */}
      <BannerAdPlaceholder />
    </SafeAreaView>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $header: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  backgroundColor: colors.palette.primary500,
})

const $title: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral100,
  marginBottom: spacing.xs,
})

const $cardContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $activeFilter: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary100,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
})

const $emptyState: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $emptyText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.textSecondary,
})
```

---

### Step 2: Create BannerAdPlaceholder Component

**File:** `app/components/ads/BannerAdPlaceholder.tsx`

```typescript
import { View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { Caption } from "@/components/text/Caption"

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

const $text: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.textSecondary,
})
```

---

### Step 3: Update Navigation to Include HomeScreen

**File:** `app/navigators/AppNavigator.tsx` (update)

Add Home screen to the app stack:

```typescript
import { HomeScreen } from "@/screens/Home/HomeScreen"

// Add to stack navigator
<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
```

---

### Step 4: Create Screen Index Export

**File:** `app/screens/Home/index.ts`

```typescript
export { HomeScreen } from "./HomeScreen"
```

---

## Mock Data

```typescript
// Reuse existing mock data:
// - MOCK_KNOWLEDGE_CARDS (from Feature 019)
// - MOCK_CATEGORIES (from Feature 019)

// Example test data for verification
export const HOME_SCREEN_TEST_DATA = {
  totalCards: 6,
  categories: 4,
  filteredCards: {
    monuments: 2,
    food: 2,
    history: 1,
    culture: 1,
  },
}
```

---

## Integration Points

### Connects To

- **Feature 020** - Card Content Display (renders card content)
- **Feature 021** - Audio Player (audio playback in cards)
- **Feature 022** - Card Swipe Navigation (swipe gesture handling)
- **Feature 023** - Category Filter (filter chips)
- **Feature 051** - AdMob Banner (placeholder for future integration)

### Used By

- **Feature 034** - Home Screen Integration (real data)
- **Feature 035** - Pull-to-Refresh (manual sync trigger)
- **Feature 060** - Animations (enhanced transitions)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] HomeScreen renders without errors
- [ ] Header displays with title and subtitle
- [ ] CategoryFilter shows all 4 categories + "All"
- [ ] Tapping category chip filters cards
- [ ] CardStack shows correct number of filtered cards
- [ ] Swipe navigation works (left/right)
- [ ] Empty state shows when no cards match filter
- [ ] Card index resets when filter changes
- [ ] BannerAdPlaceholder renders at bottom
- [ ] Safe area insets applied correctly
- [ ] Screen responds to theme changes (light/dark)
- [ ] No console errors or warnings

---

## Notes

- Screen uses MOCK data - will be replaced with real data in Feature 034
- BannerAdPlaceholder is temporary placeholder for Feature 051
- Card index resets to 0 when filter changes for better UX
- Screen is ready for AdMob integration later
- Future enhancement: add pull-to-refresh in Feature 035
- Future enhancement: add search functionality
- Performance: Consider using FlashList for large card collections

---

## References

- [React Native SafeAreaView](https://github.com/th3rdwave/react-native-safe-area-context)
- [Feature 020 - Card Content Display](./020-card-content-display.md)
- [Feature 022 - Card Swipe Navigation](./022-card-swipe-navigation.md)
- [Feature 023 - Category Filter](./023-category-filter.md)
