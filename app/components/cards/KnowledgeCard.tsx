import { ViewStyle, type StyleProp } from "react-native"

import type { KnowledgeCardDisplay } from "@/models/KnowledgeCard"

import { BaseCard } from "./BaseCard"
import { CardActions } from "./CardActions"
import { CardContentDisplay } from "./CardContentDisplay"

export interface KnowledgeCardProps {
  /**
   * Card data to display
   */
  card: KnowledgeCardDisplay
  /**
   * Called when card is pressed
   */
  onPress?: () => void
  /**
   * Custom action elements
   */
  actions?: React.ReactNode
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Knowledge Card Component - Complete card with content display
 */
export function KnowledgeCard({ card, onPress, actions, style }: KnowledgeCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress()
    }
  }

  return (
    <BaseCard variant="elevated" pressable onPress={handlePress} style={style}>
      <CardContentDisplay card={card} />

      {actions && <CardActions>{actions}</CardActions>}
    </BaseCard>
  )
}

// Export sub-components for custom usage
KnowledgeCard.Base = BaseCard
KnowledgeCard.Content = CardContentDisplay
KnowledgeCard.Actions = CardActions
