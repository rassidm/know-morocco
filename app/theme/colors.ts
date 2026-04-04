/**
 * Light theme colors - Moroccan-inspired palette
 */
const palette = {
  // Primary - Moroccan Blue
  primary100: "#E8F0F8",
  primary200: "#B8D4EC",
  primary300: "#8BB8E0",
  primary400: "#5B9BD5",
  primary500: "#1E5F9E",
  primary600: "#154270",

  // Secondary - Terracotta
  secondary100: "#F5E6DE",
  secondary200: "#E8C5B0",
  secondary300: "#D4957A",
  secondary400: "#C17B5D",
  secondary500: "#9E5F45",
  secondary600: "#7A4835",

  // Accent - Gold
  accent100: "#FFF8E1",
  accent200: "#FFE9A3",
  accent300: "#F5D76E",
  accent400: "#D4AF37",
  accent500: "#B89628",
  accent600: "#8C7220",

  // Neutral - Warm sand tones
  neutral100: "#FFFCF9",
  neutral200: "#F8F5F0",
  neutral300: "#E5E7EB",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#6B6B6B",
  neutral700: "#3C3836",
  neutral800: "#2D2D2D",
  neutral900: "#1A1A1A",

  // Status colors
  success100: "#E8F5E9",
  success500: "#4CAF50",
  success600: "#81C784",
  warning100: "#FFF3E0",
  warning500: "#FF9800",
  warning600: "#FFB74D",
  error100: "#FFEBEE",
  error500: "#F44336",
  error600: "#E57373",
  info100: "#E3F2FD",
  info500: "#2196F3",
  info600: "#64B5F6",

  // Category colors
  categoryMonuments: "#1E5F9E",
  categoryFood: "#C17B5D",
  categoryHistory: "#D4AF37",
  categoryCulture: "#8B5CF6",

  // Overlay
  overlay20: "rgba(0, 0, 0, 0.2)",
  overlay50: "rgba(0, 0, 0, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral300,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.error500,
  /**
   * Error Background.
   */
  errorBackground: palette.error100,
} as const
