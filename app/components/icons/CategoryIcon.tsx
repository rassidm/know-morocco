/* eslint-disable no-restricted-imports -- Emoji rendering needs RN Text */
import { Text, TextStyle } from "react-native"
/* eslint-enable no-restricted-imports */

import { IconWrapper, IconWrapperProps } from "./IconWrapper"

export type Category = "monuments" | "food" | "history" | "culture"

export interface CategoryIconProps extends Omit<
  IconWrapperProps,
  "children" | "accessibilityLabel"
> {
  /**
   * Category type
   */
  category: Category
}

const categoryIcons: Record<Category, string> = {
  monuments: "🏛️",
  food: "🍽️",
  history: "📜",
  culture: "🎭",
}

const categoryColors: Record<Category, string> = {
  monuments: "#1E5F9E",
  food: "#C17B5D",
  history: "#D4AF37",
  culture: "#8B5CF6",
}

/**
 * Category Icon Component - Icons for knowledge categories
 */
export function CategoryIcon({ category, ...rest }: CategoryIconProps) {
  const icon = categoryIcons[category]
  const _color = categoryColors[category]

  return (
    <IconWrapper accessibilityLabel={`${category} category`} {...rest}>
      <Text style={$iconText}>{icon}</Text>
    </IconWrapper>
  )
}

const $iconText: TextStyle = {
  fontSize: 20,
  lineHeight: 24,
}
