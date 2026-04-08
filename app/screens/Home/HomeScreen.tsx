import { useCallback, useMemo, useState } from "react"
import { View, type ViewStyle, type TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { BannerAdPlaceholder } from "@/components/ads/BannerAdPlaceholder"
import { CardStack } from "@/components/cards/CardStack"
import { CategoryFilter } from "@/components/filters/CategoryFilter"
import { Caption } from "@/components/text/Caption"
import { Heading } from "@/components/text/Heading"
import { MOCK_CATEGORIES, MOCK_KNOWLEDGE_CARDS, toCardDisplay } from "@/models"
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

/**
 * Home Screen - Main feed with swipeable cards
 */
export function HomeScreen() {
  const { themed } = useAppTheme()
  const insets = useSafeAreaInsets()

  // Filter state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "all">("all")

  // Convert mock cards to display format
  const allDisplayCards = useMemo(
    (): KnowledgeCardDisplay[] => MOCK_KNOWLEDGE_CARDS.map((card) => toCardDisplay(card, "en")),
    [],
  )

  // Filter cards based on selection
  const filteredCards = useMemo(
    (): KnowledgeCardDisplay[] =>
      selectedCategoryId === "all"
        ? allDisplayCards
        : allDisplayCards.filter((card) => card.category_id === selectedCategoryId),
    [allDisplayCards, selectedCategoryId],
  )

  // Current card index
  const [cardIndex, setCardIndex] = useState(0)

  // Handle index change
  const handleIndexChange = useCallback((index: number) => {
    setCardIndex(index)
  }, [])

  // Reset index when filter changes
  const handleSelectCategory = useCallback((categoryId: string | "all") => {
    setSelectedCategoryId(categoryId)
    setCardIndex(0)
  }, [])

  const isFiltered = selectedCategoryId !== "all"

  // Get friendly category name
  const selectedCategoryName = useMemo(() => {
    if (selectedCategoryId === "all") return "All"
    const category = MOCK_CATEGORIES.find((c) => c.id === selectedCategoryId)
    return category?.name ?? "Unknown"
  }, [selectedCategoryId])

  return (
    <View style={themed($container)}>
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
          <Caption text={`Showing: ${selectedCategoryName}`} />
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
      <View style={{ paddingBottom: insets.bottom }}>
        <BannerAdPlaceholder />
      </View>
    </View>
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

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
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

const $emptyText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
