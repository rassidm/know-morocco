# Feature: Card Components - KnowledgeCard Base Structure

## Metadata

- **Feature ID:** 015
- **Phase:** 3 - Core UI Components
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 013 (Button Components), 014 (Text Components)

---

## Goals

Create the base card component structure that will be used to display knowledge cards throughout the Know Morocco app. This feature provides a flexible card component with support for images, text content, action buttons, and proper theme integration, forming the foundation for the knowledge card system.

### Acceptance Criteria

- [ ] BaseCard component with container styling
- [ ] CardImage component for card imagery
- [ ] CardContent component for title, description, metadata
- [ ] CardActions component for action buttons
- [ ] Card supports elevated and outlined variants
- [ ] Card has proper spacing and rounded corners
- [ ] Card is accessible and testable
- [ ] All components use theme colors

---

## Implementation Steps

### Step 1: Create BaseCard Component

**File:** `app/components/cards/BaseCard.tsx`

```typescript
import { ReactNode } from "react"
import { ViewStyle, StyleProp, Pressable, PressableProps } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

type CardVariant = "elevated" | "outlined" | "filled"

interface BaseCardProps extends Omit<PressableProps, "style"> {
  /**
   * Card variant
   */
  variant?: CardVariant
  /**
   * Whether card is pressable
   */
  pressable?: boolean
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Card content
   */
  children: ReactNode
  /**
   * Test ID
   */
  testID?: string
}

/**
 * Base Card Component - Container for card content
 */
export function BaseCard({
  variant = "elevated",
  pressable = false,
  style,
  children,
  testID,
  ...pressableProps
}: BaseCardProps) {
  const { themed } = useAppTheme()

  const cardStyle: ThemedStyleArray<ViewStyle> = [
    themed($baseCard),
    themed($variants[variant]),
    style,
  ]

  if (pressable) {
    return (
      <Pressable style={cardStyle} testID={testID} {...pressableProps}>
        {children}
      </Pressable>
    )
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  )
}

const $baseCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: 12,
  overflow: "hidden",
  padding: spacing.md,
})

const $variants: Record<CardVariant, ThemedStyle<ViewStyle>> = {
  elevated: ({ colors, spacing }) => ({
    backgroundColor: colors.palette.neutral100,
    shadowColor: colors.palette.neutral800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  }),
  outlined: ({ colors }) => ({
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.border,
  }),
  filled: ({ colors }) => ({
    backgroundColor: colors.palette.neutral200,
  }),
}
```

---

### Step 2: Create CardImage Component

**File:** `app/components/cards/CardImage.tsx`

```typescript
import { Image, ImageStyle, StyleProp } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface CardImageProps {
  /**
   * Image source (local or remote)
   */
  source: number | { uri: string }
  /**
   * Image height
   */
  height?: number
  /**
   * Custom style override
   */
  style?: StyleProp<ImageStyle>
  /**
   * Resize mode
   */
  resizeMode?: "cover" | "contain" | "stretch" | "center"
  /**
   * Alt text for accessibility
   */
  alt?: string
}

/**
 * Card Image Component - Displays card imagery
 */
export function CardImage({
  source,
  height = 200,
  style,
  resizeMode = "cover",
  alt = "",
}: CardImageProps) {
  const { themed } = useAppTheme()

  return (
    <Image
      source={source}
      style={[themed($cardImage), { height }, style]}
      resizeMode={resizeMode}
      accessibilityLabel={alt}
      accessibilityRole="image"
    />
  )
}

const $cardImage: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: "100%",
  borderRadius: 8,
  marginBottom: spacing.md,
})
```

---

### Step 3: Create CardContent Component

**File:** `app/components/cards/CardContent.tsx`

```typescript
import { ReactNode } from "react"
import { ViewStyle, StyleProp, View } from "react-native"

import { Heading } from "@/components/text/Heading"
import { Body } from "@/components/text/Body"
import { Caption } from "@/components/text/Caption"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface CardContentProps {
  /**
   * Card title (i18n key)
   */
  titleTx?: string
  /**
   * Card title (direct text)
   */
  title?: string
  /**
   * Card description (i18n key)
   */
  descriptionTx?: string
  /**
   * Card description (direct text)
   */
  description?: string
  /**
   * Metadata/caption text
   */
  metadata?: string
  /**
   * Custom content (overrides title/description)
   */
  children?: ReactNode
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Card Content Component - Title, description, and metadata
 */
export function CardContent({
  titleTx,
  title,
  descriptionTx,
  description,
  metadata,
  children,
  style,
}: CardContentProps) {
  const { themed } = useAppTheme()

  if (children) {
    return <View style={style}>{children}</View>
  }

  return (
    <View style={[$contentContainer, style]}>
      {(titleTx || title) && (
        <Heading level={3} tx={titleTx as any} text={title} style={themed($title)} />
      )}

      {(descriptionTx || description) && (
        <Body tx={descriptionTx as any} text={description} style={themed($description)} />
      )}

      {metadata && <Caption text={metadata} style={themed($metadata)} />}
    </View>
  )
}

const $contentContainer: ViewStyle = {
  gap: 8,
}

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $description: ThemedStyle<ViewStyle> = () => ({
  // No additional styles needed
})

const $metadata: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})
```

---

### Step 4: Create CardActions Component

**File:** `app/components/cards/CardActions.tsx`

```typescript
import { ReactNode } from "react"
import { View, ViewStyle, StyleProp } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface CardActionsProps {
  /**
   * Action buttons/content
   */
  children: ReactNode
  /**
   * Layout direction
   */
  direction?: "horizontal" | "vertical"
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Card Actions Component - Action buttons container
 */
export function CardActions({
  children,
  direction = "horizontal",
  style,
}: CardActionsProps) {
  const { themed } = useAppTheme()

  return (
    <View
      style={[
        themed($actionsContainer),
        direction === "vertical" && $vertical,
        style,
      ]}
    >
      {children}
    </View>
  )
}

const $actionsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginTop: spacing.md,
  justifyContent: "flex-end",
})

const $vertical: ViewStyle = {
  flexDirection: "column",
  gap: 8,
}
```

---

### Step 5: Create KnowledgeCard Composite Component

**File:** `app/components/cards/KnowledgeCard.tsx`

```typescript
import { ReactNode } from "react"

import { BaseCard, BaseCardProps } from "./BaseCard"
import { CardImage, CardImageProps } from "./CardImage"
import { CardContent, CardContentProps } from "./CardContent"
import { CardActions, CardActionsProps } from "./CardActions"

interface KnowledgeCardProps {
  card?: BaseCardProps
  image?: CardImageProps
  content?: CardContentProps
  actions?: CardActionsProps
  children?: ReactNode
}

/**
 * Knowledge Card Component - Composite card for knowledge cards
 */
export function KnowledgeCard({ card, image, content, actions, children }: KnowledgeCardProps) {
  return (
    <BaseCard {...card}>
      {image && <CardImage {...image} />}
      {content && <CardContent {...content} />}
      {actions && <CardActions {...actions} />}
      {children}
    </BaseCard>
  )
}

// Export sub-components for custom usage
KnowledgeCard.Base = BaseCard
KnowledgeCard.Image = CardImage
KnowledgeCard.Content = CardContent
KnowledgeCard.Actions = CardActions
```

---

### Step 6: Create Cards Barrel Export

**File:** `app/components/cards/index.ts`

```typescript
export { BaseCard } from "./BaseCard"
export type { BaseCardProps } from "./BaseCard"

export { CardImage } from "./CardImage"
export type { CardImageProps } from "./CardImage"

export { CardContent } from "./CardContent"
export type { CardContentProps } from "./CardContent"

export { CardActions } from "./CardActions"
export type { CardActionsProps } from "./CardActions"

export { KnowledgeCard } from "./KnowledgeCard"
```

---

## Mock Data

```typescript
// Mock knowledge card data
export const MOCK_KNOWLEDGE_CARD = {
  id: "card-001",
  title: "Hassan II Mosque",
  description: "One of the largest mosques in the world, located in Casablanca, Morocco. Completed in 1993, it features a 210-meter minaret, the tallest in the world.",
  image: "https://picsum.photos/seed/mosque/800/600",
  category: "monuments",
  latitude: 33.6083,
  longitude: -7.6329,
  distance: "1.2km",
  audio_url: null,
}
```

---

## Integration Points

### Connects To

- **Feature 013** - Uses Button components in CardActions
- **Feature 014** - Uses Heading, Body, Caption components

### Used By

- **Feature 020** - Card Content Display
- **Feature 024** - Home Screen (main card display)
- **Feature 044** - Nearby Screen (card list)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] BaseCard renders with all variants
- [ ] CardImage displays images with correct aspect ratio
- [ ] CardContent renders title, description, and metadata
- [ ] CardActions layouts buttons correctly
- [ ] KnowledgeCard composite works with all props
- [ ] Elevated variant shows shadow
- [ ] Outlined variant shows border
- [ ] Card is responsive to theme changes

---

## Notes

- Card components are designed to be composable and flexible
- Image component should handle loading states in future features
- Card will be extended with swipe gestures in Feature 022
- Consider adding skeleton loading state for async content

---

## References

- [React Native View](https://reactnative.dev/docs/view)
- [React Native Image](https://reactnative.dev/docs/image)
- [Feature 013 - Button Components](./013-button-components.md)
- [Feature 014 - Text Components](./014-text-components.md)
