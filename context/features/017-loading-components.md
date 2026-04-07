# Feature: Loading Components - Spinner, Skeleton

## Metadata

- **Feature ID:** 017
- **Phase:** 3 - Core UI Components
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 002 (Theme System)

---

## Goals

Create loading indicator components for the Know Morocco app, including a Spinner component for indeterminate loading states and Skeleton components for content placeholder during async operations. These components provide visual feedback to users while content is being fetched or processed.

### Acceptance Criteria

- [ ] Spinner component with size variants
- [ ] Skeleton component for content placeholder
- [ ] SkeletonLine variant for text blocks
- [ ] SkeletonImage variant for image placeholders
- [ ] Animation for loading states
- [ ] Theme-aware colors
- [ ] Accessible loading indicators
- [ ] Composable loading screen component

---

## Implementation Steps

### Step 1: Create Spinner Component

**File:** `app/components/loading/Spinner.tsx`

```typescript
import { useEffect, useRef } from "react"
import { View, ViewStyle, StyleProp, Animated } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

type SpinnerSize = "small" | "medium" | "large"
type SpinnerVariant = "default" | "overlay"

interface SpinnerProps {
  /**
   * Spinner size
   */
  size?: SpinnerSize
  /**
   * Spinner variant
   */
  variant?: SpinnerVariant
  /**
   * Custom color override
   */
  color?: string
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Accessibility label
   */
  accessibilityLabel?: string
  /**
   * Test ID
   */
  testID?: string
}

const $sizes: Record<SpinnerSize, { size: number; strokeWidth: number }> = {
  small: { size: 20, strokeWidth: 2 },
  medium: { size: 32, strokeWidth: 3 },
  large: { size: 48, strokeWidth: 4 },
}

/**
 * Spinner Component - Loading indicator
 */
export function Spinner({
  size = "medium",
  variant = "default",
  color,
  style,
  accessibilityLabel = "Loading",
  testID,
}: SpinnerProps) {
  const { themed, theme } = useAppTheme()
  const sizeConfig = $sizes[size]
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    )
    spin.start()

    return () => spin.stop()
  }, [spinValue])

  const spinRotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const spinnerColor = color || theme.colors.tint

  return (
    <View
      style={[
        variant === "overlay" && themed($overlay),
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Animated.View
        style={[
          themed($spinner),
          {
            width: sizeConfig.size,
            height: sizeConfig.size,
            borderRadius: sizeConfig.size / 2,
            borderWidth: sizeConfig.strokeWidth,
            borderTopColor: spinnerColor,
            borderRightColor: spinnerColor,
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            transform: [{ rotate: spinRotation }],
          },
        ]}
      />
    </View>
  )
}

const $spinner: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $overlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: colors.overlay50,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
})
```

---

### Step 2: Create Skeleton Component

**File:** `app/components/loading/Skeleton.tsx`

```typescript
import { useEffect, useRef } from "react"
import { View, ViewStyle, StyleProp, Animated } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface SkeletonProps {
  /**
   * Skeleton width (defaults to 100%)
   */
  width?: number | string
  /**
   * Skeleton height
   */
  height?: number | string
  /**
   * Border radius
   */
  borderRadius?: number
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Test ID
   */
  testID?: string
}

/**
 * Skeleton Component - Content placeholder during loading
 */
export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 4,
  style,
  testID,
}: SkeletonProps) {
  const { themed, theme } = useAppTheme()
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true,
      }),
    ])

    const loop = Animated.loop(pulse)
    loop.start()

    return () => loop.stop()
  }, [opacity])

  return (
    <Animated.View
      style={[
        themed($skeleton),
        {
          width,
          height,
          borderRadius,
          opacity,
          backgroundColor: theme.colors.palette.neutral300,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel="Loading content"
      testID={testID}
    />
  )
}

const $skeleton: ViewStyle = {
  overflow: "hidden",
}
```

---

### Step 3: Create SkeletonLine Component

**File:** `app/components/loading/SkeletonLine.tsx`

```typescript
import { View, ViewStyle } from "react-native"

import { Skeleton } from "./Skeleton"
import { useAppTheme } from "@/theme/context"

interface SkeletonLineProps {
  /**
   * Number of lines
   */
  lines?: number
  /**
   * Line widths (array of numbers or percentages)
   */
  widths?: Array<number | string>
  /**
   * Spacing between lines
   */
  spacing?: number
  /**
   * Last line width
   */
  lastLineWidth?: number | string
  /**
   * Container style
   */
  style?: ViewStyle
}

/**
 * Skeleton Line Component - Multiple lines for text content
 */
export function SkeletonLine({
  lines = 3,
  widths,
  spacing = 8,
  lastLineWidth = "75%",
  style,
}: SkeletonLineProps) {
  const { theme } = useAppTheme()

  return (
    <View style={[{ gap: spacing }, style]}>
      {Array.from({ length: lines }).map((_, index) => {
        const width = index === lines - 1
          ? lastLineWidth
          : widths?.[index] || "100%"

        return <Skeleton key={index} width={width} height={14} />
      })}
    </View>
  )
}
```

---

### Step 4: Create SkeletonImage Component

**File:** `app/components/loading/SkeletonImage.tsx`

```typescript
import { ViewStyle } from "react-native"

import { Skeleton } from "./Skeleton"

interface SkeletonImageProps {
  /**
   * Image width
   */
  width?: number
  /**
   * Image height
   */
  height?: number
  /**
   * Border radius
   */
  borderRadius?: number
  /**
   * Container style
   */
  style?: ViewStyle
}

/**
 * Skeleton Image Component - Image placeholder during loading
 */
export function SkeletonImage({
  width,
  height = 200,
  borderRadius = 8,
  style,
}: SkeletonImageProps) {
  return (
    <Skeleton
      width={width || "100%"}
      height={height}
      borderRadius={borderRadius}
      style={style}
    />
  )
}
```

---

### Step 5: Create LoadingScreen Component

**File:** `app/components/loading/LoadingScreen.tsx`

```typescript
import { View, ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Spinner } from "./Spinner"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface LoadingScreenProps {
  /**
   * Loading message (i18n key)
   */
  messageTx?: string
  /**
   * Loading message (direct text)
   */
  message?: string
  /**
   * Whether to show full screen overlay
   */
  fullscreen?: boolean
}

/**
 * Loading Screen Component - Full screen loading indicator
 */
export function LoadingScreen({
  messageTx,
  message,
  fullscreen = true,
}: LoadingScreenProps) {
  const { themed } = useAppTheme()

  if (fullscreen) {
    return (
      <Screen
        preset="fixed"
        contentContainerStyle={themed($centerContent)}
        safeAreaEdges={["top", "bottom"]}
      >
        <Spinner size="large" />
        {(messageTx || message) && (
          <Text
            tx={messageTx as any}
            text={message}
            style={themed($message)}
          />
        )}
      </Screen>
    )
  }

  return (
    <View style={themed($inlineContainer)}>
      <Spinner />
      {(messageTx || message) && (
        <Text
          tx={messageTx as any}
          text={message}
          style={themed($inlineMessage)}
        />
      )}
    </View>
  )
}

const $centerContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: spacing.md,
})

const $message: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  textAlign: "center",
})

const $inlineContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: 16,
}

const $inlineMessage: ViewStyle = {
  textAlign: "center",
}
```

---

### Step 6: Create Loading Barrel Export

**File:** `app/components/loading/index.ts`

```typescript
export { Spinner } from "./Spinner"
export type { SpinnerProps } from "./Spinner"

export { Skeleton } from "./Skeleton"
export type { SkeletonProps } from "./Skeleton"

export { SkeletonLine } from "./SkeletonLine"
export type { SkeletonLineProps } from "./SkeletonLine"

export { SkeletonImage } from "./SkeletonImage"
export type { SkeletonImageProps } from "./SkeletonImage"

export { LoadingScreen } from "./LoadingScreen"
export type { LoadingScreenProps } from "./LoadingScreen"
```

---

## Mock Data

No mock data needed for this feature.

---

## Integration Points

### Connects To

- **Feature 002** - Uses theme system for colors

### Used By

- **Feature 019** - Knowledge Card Model (skeleton loading)
- **Feature 024** - Home Screen (loading states)
- **Feature 034** - Home Screen Integration (skeleton screens)
- **Feature 059** - Loading States (enhanced skeletons)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Spinner animates smoothly
- [ ] Spinner size variants render correctly
- [ ] Skeleton pulses with animation
- [ ] SkeletonLine shows multiple lines
- [ ] SkeletonImage renders as placeholder
- [ ] LoadingScreen shows centered content
- [ ] LoadingScreen inline mode works
- [ ] All components use theme colors
- [ ] Accessibility labels are announced

---

## Notes

- Spinner uses Animated API for smooth rotation animation
- Skeleton uses pulse animation for visual feedback
- Consider using react-native-reanimated for better performance in the future
- Loading states should be replaced with actual content when data loads

---

## References

- [React Native Animated](https://reactnative.dev/docs/animated)
- [Loading UX Best Practices](https://www.nngroup.com/articles/response-times-3-important-limits/)
- [Feature 002 - Theme System](./002-theme-system.md)
