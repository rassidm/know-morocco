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
