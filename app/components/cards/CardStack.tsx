import { useState, useCallback } from "react"
import { View, type ViewStyle, type StyleProp } from "react-native"

import { Caption } from "@/components/text/Caption"
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { SwipeableCard } from "./SwipeableCard"

interface CardStackProps {
  /**
   * Array of cards to display
   */
  cards: KnowledgeCardDisplay[]
  /**
   * Current card index
   */
  currentIndex: number
  /**
   * Called when index changes
   */
  onIndexChange: (index: number) => void
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

export type { CardStackProps }

/**
 * Card Stack Component - Manages swipe navigation between cards
 */
export function CardStack({ cards, currentIndex, onIndexChange, style }: CardStackProps) {
  const { themed } = useAppTheme()
  const [animating, setAnimating] = useState(false)

  const handleSwipeLeft = useCallback(() => {
    if (animating || currentIndex <= 0) return

    setAnimating(true)
    const newIndex = currentIndex - 1
    onIndexChange(newIndex)

    // Reset animation flag after transition
    setTimeout(() => setAnimating(false), 300)
  }, [animating, currentIndex, onIndexChange])

  const handleSwipeRight = useCallback(() => {
    if (animating || currentIndex >= cards.length - 1) return

    setAnimating(true)
    const newIndex = currentIndex + 1
    onIndexChange(newIndex)

    // Reset animation flag after transition
    setTimeout(() => setAnimating(false), 300)
  }, [animating, currentIndex, cards.length, onIndexChange])

  // Handle edge cases
  if (cards.length === 0) {
    return (
      <View style={[themed($emptyContainer), style]}>
        <Caption text="No cards available" />
      </View>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <View style={[themed($container), style]}>
      <SwipeableCard
        card={currentCard}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />

      {/* Card Counter */}
      <View style={themed($counter)}>
        <Caption text={`${currentIndex + 1} / ${cards.length}`} />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingVertical: spacing.md,
})

const $emptyContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $counter: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  bottom: spacing.lg,
  alignSelf: "center",
})
