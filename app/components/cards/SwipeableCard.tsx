import { Dimensions, type ViewStyle, type TextStyle, type StyleProp } from "react-native"
import * as Haptics from "expo-haptics"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated"

import { CardContentDisplay } from "@/components/cards/CardContentDisplay"
import { Caption } from "@/components/text/Caption"
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

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

export type { SwipeableCardProps }

/**
 * Swipeable Card Component - Card with swipe gesture navigation
 */
export function SwipeableCard({ card, onSwipeLeft, onSwipeRight, style }: SwipeableCardProps) {
  const { themed } = useAppTheme()

  // Shared values for animation
  const translateX = useSharedValue(0)
  const rotate = useSharedValue(0)

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
        Extrapolation.CLAMP,
      )
    })
    .onEnd((event) => {
      const swipeDistance = translateX.value
      const velocity = event.velocityX

      // Check if swipe threshold or velocity is met
      const shouldSwipe = Math.abs(swipeDistance) > SWIPE_THRESHOLD || Math.abs(velocity) > 1000

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
    transform: [{ translateX: translateX.value }, { rotate: `${rotate.value}deg` }],
  }))

  // Swipe direction indicators
  const leftIndicatorOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }))

  const rightIndicatorOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }))

  return (
    <Animated.View style={themed($swipeContainer)}>
      {/* Left Swipe Indicator */}
      <Animated.View
        style={[themed($swipeIndicator), themed($leftIndicator), leftIndicatorOpacity]}
      >
        <Caption text="← Previous" style={themed($swipeText)} />
      </Animated.View>

      {/* Right Swipe Indicator */}
      <Animated.View
        style={[themed($swipeIndicator), themed($rightIndicator), rightIndicatorOpacity]}
      >
        <Caption text="Next →" style={themed($swipeText)} />
      </Animated.View>

      {/* Swipeable Card */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[themed($card), animatedCardStyle, style]}>
          <CardContentDisplay card={card} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
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

const $swipeIndicator: ThemedStyle<ViewStyle> = () => ({
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

const $swipeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 18,
  fontWeight: "bold",
  color: colors.text,
})
