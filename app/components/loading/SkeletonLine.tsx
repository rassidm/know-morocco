import { View, ViewStyle } from "react-native"

import { Skeleton } from "./Skeleton"

export interface SkeletonLineProps {
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
  return (
    <View style={[{ gap: spacing }, style]}>
      {Array.from({ length: lines }).map((_, index) => {
        const width = index === lines - 1 ? lastLineWidth : widths?.[index] || "100%"

        return <Skeleton key={index} width={width} height={14} />
      })}
    </View>
  )
}
