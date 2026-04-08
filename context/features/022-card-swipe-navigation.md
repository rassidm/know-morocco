# Feature: Card Swipe Navigation - Gesture Handling

## Metadata

- **Feature ID:** 022
- **Phase:** 4 - Knowledge Cards System
- **Status:** Not Started
- **Estimated Time:** 60 minutes
- **Dependencies:** 020 (Card Content Display)

---

## Goals

Implement swipe gesture handling for knowledge cards, allowing users to navigate between cards with horizontal swipe gestures. This creates the Tinder-like card browsing experience that is central to the Know Morocco app's UX.

### Acceptance Criteria

- [ ] SwipeableCard component with horizontal swipe gestures
- [ ] Card animates smoothly during swipe (translate + rotate)
- [ ] Swipe left/right triggers navigation to previous/next card
- [ ] Visual indicators show swipe direction
- [ ] Haptic feedback on swipe threshold
- [ ] Swipe cancellation (return to center if not swiped far enough)
- [ ] Works with flat list of cards

---

## Implementation Steps

### Step 1: Create SwipeableCard Component

**File:** `app/components/cards/SwipeableCard.tsx`

```typescript
import { useState, useCallback } from "react"
import { Dimensions, ViewStyle, StyleProp } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated"
import * as Haptics from "expo-haptics"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
import { CardContentDisplay } from "@/components/cards/CardContentDisplay"
import { AudioPlayer } from "@/components/audio/AudioPlayer"

const SCREEN_WIDTH = Dimensions.get("window").width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3
const MAX_ROTATION = 15

interface SwipeableCardProps {
  /**
   * Card data to display
   */
  card: KnowledgeCardDisplay
  /**
   * Called when card is swiped left (previous)
   */
  onSwipeLeft?: () => void
  /**
   * Called when card is swiped right (next)
   */
  onSwipeRight?: () => void
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Swipeable Card Component - Card with swipe gesture navigation
 */
export function SwipeableCard({
  card,
  onSwipeLeft,
  onSwipeRight,
  style,
}: SwipeableCardProps) {
  const { themed } = useAppTheme()

  // Shared values for animation
  const translateX = useSharedValue(0)
  const rotate = useSharedValue(0)
  const isSwiping = useSharedValue(false)

  // Track starting position
  const startX = useSharedValue(0)

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX
      rotate.value = interpolate(
        translateX.value,
        [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        [-MAX_ROTATION, 0, MAX_ROTATION],
        Extrapolation.CLAMP
      )
      isSwiping.value = true
    })
    .onEnd((event) => {
      const swipeDistance = translateX.value
      const velocity = event.velocityX

      // Check if swipe threshold or velocity is met
      const shouldSwipe =
        Math.abs(swipeDistance) > SWIPE_THRESHOLD || Math.abs(velocity) > 1000

      if (shouldSwipe) {
        // Trigger haptic feedback
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium)

        if (swipeDistance < 0 && onSwipeLeft) {
          // Swipe left - previous card
          runOnJS(onSwipeLeft)()
        } else if (swipeDistance > 0 && onSwipeRight) {
          // Swipe right - next card
          runOnJS(onSwipeRight)()
        }
      } else {
        // Return to center
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 })
        rotate.value = withSpring(0, { damping: 15, stiffness: 150 })
      }
    })
    .runOnJS(true)

  // Animated styles
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }))

  // Swipe direction indicators
  const leftIndicatorOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }))

  const rightIndicatorOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }))

  return (
    <GestureHandlerRootView>
      <View style={themed($swipeContainer)}>
        {/* Left Swipe Indicator */}
        <Animated.View style={[themed($swipeIndicator), themed($leftIndicator), leftIndicatorOpacity]}>
          <Animated.Text style={themed($swipeText)}>← Previous</Animated.Text>
        </Animated.View>

        {/* Right Swipe Indicator */}
        <Animated.View style={[themed($swipeIndicator), themed($rightIndicator), rightIndicatorOpacity]}>
          <Animated.Text style={themed($swipeText)}>Next →</Animated.Text>
        </Animated.View>

        {/* Swipeable Card */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[themed($card), animatedCardStyle, style]}>
            <CardContentDisplay card={card} />

            {card.audio_url && (
              <AudioPlayer audioUrl={card.audio_url} label="Listen to narration" />
            )}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

const $swipeContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $card: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: SCREEN_WIDTH - spacing.xl * 2,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
})

const $swipeIndicator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: 80,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
})

const $leftIndicator: ThemedStyle<ViewStyle> = () => ({
  left: 0,
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  backgroundColor: "rgba(30, 95, 158, 0.1)",
})

const $rightIndicator: ThemedStyle<ViewStyle> = () => ({
  right: 0,
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
  backgroundColor: "rgba(193, 123, 93, 0.1)",
})

const $swipeText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  fontSize: 18,
  fontWeight: "bold",
  color: colors.textPrimary,
})
```

---

### Step 2: Create CardStack Component

**File:** `app/components/cards/CardStack.tsx`

```typescript
import { useState, useCallback } from "react"
import { View, ViewStyle, StyleProp } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
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
```

---

### Step 3: Create useSwipe Hook

**File:** `app/hooks/useSwipe.ts`

```typescript
import { useState, useCallback } from "react"

interface UseSwipeOptions {
  /**
   * Total number of items
   */
  total: number
  /**
   * Initial index
   */
  initialIndex?: number
  /**
   * Called when index changes
   */
  onIndexChange?: (index: number) => void
}

/**
 * Hook for managing swipe navigation state
 */
export function useSwipe({ total, initialIndex = 0, onIndexChange }: UseSwipeOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      onIndexChange?.(newIndex)
    }
  }, [currentIndex, total, onIndexChange])

  const goPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      onIndexChange?.(newIndex)
    }
  }, [currentIndex, onIndexChange])

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < total) {
        setCurrentIndex(index)
        onIndexChange?.(index)
      }
    },
    [total, onIndexChange]
  )

  const reset = useCallback(() => {
    setCurrentIndex(initialIndex)
    onIndexChange?.(initialIndex)
  }, [initialIndex, onIndexChange])

  return {
    currentIndex,
    canGoNext: currentIndex < total - 1,
    canGoPrevious: currentIndex > 0,
    goNext,
    goPrevious,
    goTo,
    reset,
  }
}
```

---

## Mock Data

```typescript
// Reuse MOCK_KNOWLEDGE_CARDS from Feature 019
// No additional mock data needed - component uses same card structure
```

---

## Integration Points

### Connects To

- **Feature 020** - Card Content Display (renders card content)
- **Feature 019** - Knowledge Card Model (card data structure)

### Used By

- **Feature 024** - Home Screen (main swipe feed)
- **Feature 044** - Nearby Screen (swipe between nearby cards)
- **Feature 060** - Animations (enhanced transitions)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] SwipeableCard renders with card data
- [ ] Pan gesture tracks horizontal movement
- [ ] Card rotates during swipe (max 15 degrees)
- [ ] Swipe past threshold triggers navigation
- [ ] Swipe below threshold returns to center
- [ ] Left swipe calls onSwipeLeft callback
- [ ] Right swipe calls onSwipeRight callback
- [ ] Haptic feedback triggers on successful swipe
- [ ] Visual indicators fade in during swipe
- [ ] CardStack manages index correctly
- [ ] Counter shows correct position
- [ ] Edge cases handled (first/last card)
- [ ] useSwipe hook manages state correctly

---

## Notes

- Uses `react-native-gesture-handler` for gesture recognition
- Uses `react-native-reanimated` for smooth animations
- Uses `expo-haptics` for tactile feedback
- Threshold is 30% of screen width
- Max rotation is 15 degrees for subtle effect
- Spring animation for smooth return to center
- Component is optimized for performance with shared values
- Future enhancement: add vertical swipe to dismiss
- Future enhancement: add undo swipe feature

---

## References

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- [Feature 020 - Card Content Display](./020-card-content-display.md)
