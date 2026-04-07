import { ReactNode } from "react"

import { BaseCard, BaseCardProps } from "./BaseCard"
import { CardActions, CardActionsProps } from "./CardActions"
import { CardContent, CardContentProps } from "./CardContent"
import { CardImage, CardImageProps } from "./CardImage"

export interface KnowledgeCardProps {
  /**
   * Props for the base card container
   */
  card?: Partial<BaseCardProps>
  /**
   * Props for the card image
   */
  image?: CardImageProps
  /**
   * Props for the card content
   */
  content?: CardContentProps
  /**
   * Props for the card actions
   */
  actions?: CardActionsProps
  /**
   * Custom children content (overrides structured props)
   */
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
