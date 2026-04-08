# Feature: Card Content Display - Title, Description, Image

## Metadata

- **Feature ID:** 020
- **Phase:** 4 - Knowledge Cards System
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 015 (Card Components), 019 (Knowledge Card Model)

---

## Goals

Build the content display component for knowledge cards that renders localized titles, descriptions, and images. This component integrates with the card model interfaces and handles multi-language content rendering with proper image loading states.

### Acceptance Criteria

- [ ] CardContentDisplay component renders title, description, and image
- [ ] Component accepts `KnowledgeCardDisplay` as primary prop
- [ ] Localized text displays correctly based on language prop
- [ ] Image shows loading placeholder while fetching
- [ ] Image handles missing/null URLs gracefully
- [ ] Text truncation for long descriptions (max 3 lines)
- [ ] Component is fully themed

---

## Implementation Steps

### Step 1: Create CardContentDisplay Component

**File:** `app/components/cards/CardContentDisplay.tsx`

```typescript
import { View, ViewStyle, StyleProp, Image } from "react-native"
import { useState } from "react"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
import { Heading } from "@/components/text/Heading"
import { Body } from "@/components/text/Body"
import { Caption } from "@/components/text/Caption"
import { CardImage } from "@/components/cards/CardImage"

interface CardContentDisplayProps {
  /**
   * Card data to display
   */
  card: KnowledgeCardDisplay
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
  /**
   * Whether to show image
   */
  showImage?: boolean
  /**
   * Whether to truncate description
   */
  truncateDescription?: boolean
}

/**
 * Card Content Display Component
 * Renders localized title, description, and image for knowledge cards
 */
export function CardContentDisplay({
  card,
  style,
  showImage = true,
  truncateDescription = true,
}: CardContentDisplayProps) {
  const { themed } = useAppTheme()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <View style={[themed($container), style]}>
      {/* Image Section */}
      {showImage && (
        <View style={themed($imageSection)}>
          {card.image_url && !imageError ? (
            <>
              {imageLoading && (
                <View style={themed($imagePlaceholder)}>
                  <Caption text="Loading..." style={themed($placeholderText)} />
                </View>
              )}
              <Image
                source={{ uri: card.image_url }}
                style={themed($image)}
                resizeMode="cover"
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false)
                  setImageError(true)
                }}
                accessibilityLabel={card.title}
              />
            </>
          ) : (
            <View style={themed($imagePlaceholder)}>
              <Caption
                text="No image available"
                style={themed($placeholderText)}
              />
            </View>
          )}
        </View>
      )}

      {/* Title Section */}
      <Heading
        level={2}
        text={card.title}
        style={themed($title)}
        numberOfLines={2}
      />

      {/* Category Badge */}
      {card.category_name && (
        <View style={themed($categoryBadge)}>
          <Caption text={card.category_name.toUpperCase()} style={themed($categoryText)} />
        </View>
      )}

      {/* Description Section */}
      <Body
        text={card.description}
        style={themed($description)}
        numberOfLines={truncateDescription ? 3 : undefined}
      />

      {/* Location Badge */}
      {card.city && (
        <View style={themed($locationBadge)}>
          <Caption text={`📍 ${card.city}`} style={themed($locationText)} />
        </View>
      )}

      {/* Distance Indicator */}
      {card.distance && (
        <Caption text={`${card.distance} away`} style={themed($distance)} />
      )}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  gap: spacing.sm,
})

const $imageSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $image: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: 200,
  borderRadius: 8,
})

const $imagePlaceholder: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  height: 200,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral300,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const $placeholderText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.palette.neutral600,
})

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $categoryBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.secondary100,
  alignSelf: "flex-start",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderRadius: 4,
})

const $categoryText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.palette.secondary800,
  fontWeight: "600",
})

const $description: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $locationBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary100,
  alignSelf: "flex-start",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderRadius: 4,
  marginTop: spacing.xs,
})

const $locationText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.palette.primary700,
})

const $distance: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  color: colors.textSecondary,
  marginTop: spacing.xs,
})
```

---

### Step 2: Create CardImageLoader Helper

**File:** `app/utils/imageLoader.ts`

```typescript
/**
 * Image loading utilities for knowledge cards
 */

/**
 * Prefetch image from URL
 */
export async function prefetchImage(url: string | null): Promise<boolean> {
  if (!url) return false

  try {
    const { Image } = await import("react-native")
    const result = await Image.prefetch(url)
    return result
  } catch {
    return false
  }
}

/**
 * Validate image URL
 */
export function isValidImageUrl(url: string | null): boolean {
  if (!url) return false

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Get fallback image (local placeholder)
 */
export function getFallbackImage(): number {
  // Return local placeholder asset
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@assets/images/placeholder.png")
}
```

---

### Step 3: Integrate with KnowledgeCard Component

**File:** `app/components/cards/KnowledgeCard.tsx` (update)

Update the existing KnowledgeCard component to use CardContentDisplay:

```typescript
import { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
import { CardContentDisplay } from "./CardContentDisplay"
import { BaseCard } from "./BaseCard"
import { CardActions } from "./CardActions"

interface KnowledgeCardProps {
  card: KnowledgeCardDisplay
  onPress?: () => void
  onFavorite?: () => void
  actions?: React.ReactNode
}

/**
 * Knowledge Card Component - Complete card with content display
 */
export function KnowledgeCard({
  card,
  onPress,
  onFavorite,
  actions,
}: KnowledgeCardProps) {
  return (
    <BaseCard variant="elevated" pressable onPress={onPress}>
      <CardContentDisplay card={card} />

      {actions && <CardActions>{actions}</CardActions>}
    </BaseCard>
  )
}

KnowledgeCard.Content = CardContentDisplay
```

---

## Mock Data

```typescript
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"

// Mock card display data for testing
export const MOCK_CARD_DISPLAY: KnowledgeCardDisplay = {
  id: "card-001",
  title: "Hassan II Mosque",
  description:
    "One of the largest mosques in the world, located in Casablanca, Morocco. Completed in 1993, it features a 210-meter minaret, the tallest in the world. The mosque can accommodate 105,000 worshippers and is built over the Atlantic Ocean.",
  image_url: "https://picsum.photos/seed/mosque/800/600",
  audio_url: null,
  category_id: "cat-monuments",
  category_name: "Monuments",
  city: "Casablanca",
  latitude: 33.6083,
  longitude: -7.6329,
  distance: "1.2km",
  is_favorite: false,
}

// Mock card without image
export const MOCK_CARD_NO_IMAGE: KnowledgeCardDisplay = {
  ...MOCK_CARD_DISPLAY,
  id: "card-002",
  image_url: null,
  title: "Card Without Image",
}

// Mock card with long description
export const MOCK_CARD_LONG_TEXT: KnowledgeCardDisplay = {
  ...MOCK_CARD_DISPLAY,
  id: "card-003",
  title: "Very Long Title That Should Be Truncated After Two Lines",
  description:
    "This is a very long description that should be truncated after three lines to maintain consistent card height and prevent layout issues in the card feed. It contains additional information that may not be immediately visible to users in the feed view but can be accessed by tapping on the card to view full details.",
}
```

---

## Integration Points

### Connects To

- **Feature 015** - Card Components (BaseCard, CardImage)
- **Feature 019** - Knowledge Card Model (KnowledgeCardDisplay type)
- **Feature 014** - Text Components (Heading, Body, Caption)

### Used By

- **Feature 021** - Audio Player Component (extends this component)
- **Feature 022** - Card Swipe Navigation
- **Feature 024** - Home Screen

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] CardContentDisplay renders with all card fields
- [ ] Title displays and truncates at 2 lines
- [ ] Description displays and truncates at 3 lines when enabled
- [ ] Image loads and displays correctly
- [ ] Image shows placeholder while loading
- [ ] Image shows fallback when URL is null or invalid
- [ ] Category badge displays correctly
- [ ] Location badge displays when city is present
- [ ] Distance displays when distance prop is provided
- [ ] Component responds to theme changes
- [ ] Accessibility labels set correctly

---

## Notes

- Image loading states handled with useState hooks
- Description truncation uses `numberOfLines` prop on Body component
- Component designed to work with both local and remote images
- Future enhancement: add image zoom on tap
- Consider adding skeleton loading state for async content

---

## References

- [React Native Image](https://reactnative.dev/docs/image)
- [Feature 015 - Card Components](./015-card-components.md)
- [Feature 019 - Knowledge Card Model](./019-knowledge-card-model.md)
