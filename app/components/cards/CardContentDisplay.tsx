import { useState } from "react"
import {
  View,
  Image,
  type ViewStyle,
  type ImageStyle,
  type TextStyle,
  type StyleProp,
} from "react-native"

import { AudioPlayer } from "@/components/audio/AudioPlayer"
import { Body } from "@/components/text/Body"
import { Caption } from "@/components/text/Caption"
import { Heading } from "@/components/text/Heading"
import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

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
              <Caption text="No image available" style={themed($placeholderText)} />
            </View>
          )}
        </View>
      )}

      {/* Title Section */}
      <Heading level={2} text={card.title} style={themed($title)} numberOfLines={2} />

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

      {/* Audio Player Section */}
      {card.audio_url && <AudioPlayer audioUrl={card.audio_url} label="Listen to narration" />}

      {/* Location Badge */}
      {card.city && (
        <View style={themed($locationBadge)}>
          <Caption text={`\u{1F4CD} ${card.city}`} style={themed($locationText)} />
        </View>
      )}

      {/* Distance Indicator */}
      {card.distance && <Caption text={`${card.distance} away`} style={themed($distance)} />}
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

const $image: ThemedStyle<ImageStyle> = () => ({
  width: "100%",
  height: 200,
  borderRadius: 8,
})

const $imagePlaceholder: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: "100%",
  height: 200,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral300,
  justifyContent: "center",
  alignItems: "center",
})

const $placeholderText: ThemedStyle<TextStyle> = ({ colors }) => ({
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

const $categoryText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.secondary600,
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

const $locationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary600,
})

const $distance: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginTop: spacing.xs,
})
