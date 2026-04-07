import { ViewStyle } from "react-native"

import { Skeleton } from "./Skeleton"

export interface SkeletonImageProps {
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
    <Skeleton width={width || "100%"} height={height} borderRadius={borderRadius} style={style} />
  )
}
