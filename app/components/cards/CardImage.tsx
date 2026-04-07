import { ImageStyle, StyleProp, Image } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface CardImageProps {
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
