import { ReactNode } from "react"
import { ViewStyle, StyleProp, View } from "react-native"

import { Body } from "@/components/text/Body"
import { Caption } from "@/components/text/Caption"
import { Heading } from "@/components/text/Heading"
import { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface CardContentProps {
  /**
   * Card title (i18n key)
   */
  titleTx?: TxKeyPath
  /**
   * Card title (direct text)
   */
  title?: string
  /**
   * Card description (i18n key)
   */
  descriptionTx?: TxKeyPath
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
      {(titleTx || title) && <Heading level={3} tx={titleTx} text={title} style={themed($title)} />}

      {(descriptionTx || description) && (
        <Body tx={descriptionTx} text={description} style={themed($description)} />
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
