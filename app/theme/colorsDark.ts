/**
 * Dark theme colors - Moroccan-inspired palette
 */
const palette = {
  // Primary - Moroccan Blue (lighter for dark theme)
  primary600: "#E8F0F8",
  primary500: "#B8D4EC",
  primary400: "#8BB8E0",
  primary300: "#5B9BD5",
  primary200: "#1E5F9E",
  primary100: "#154270",

  // Secondary - Terracotta (lighter for dark theme)
  secondary600: "#F5E6DE",
  secondary500: "#E8C5B0",
  secondary400: "#D4957A",
  secondary300: "#C17B5D",
  secondary200: "#9E5F45",
  secondary100: "#7A4835",

  // Accent - Gold (lighter for dark theme)
  accent600: "#FFF8E1",
  accent500: "#FFE9A3",
  accent400: "#F5D76E",
  accent300: "#D4AF37",
  accent200: "#B89628",
  accent100: "#8C7220",

  // Neutral - Dark theme inverses
  neutral900: "#FFFCF9",
  neutral800: "#F8F5F0",
  neutral700: "#E5E7EB",
  neutral600: "#B6ACA6",
  neutral500: "#978F8A",
  neutral400: "#6B6B6B",
  neutral300: "#3C3836",
  neutral200: "#2D2D2D",
  neutral100: "#1A1A1A",

  // Status colors (lighter variants for dark theme)
  success600: "#E8F5E9",
  success500: "#81C784",
  success100: "#4CAF50",
  warning600: "#FFF3E0",
  warning500: "#FFB74D",
  warning100: "#FF9800",
  error600: "#FFEBEE",
  error500: "#E57373",
  error100: "#F44336",
  info600: "#E3F2FD",
  info500: "#64B5F6",
  info100: "#2196F3",

  // Category colors (lighter for dark theme)
  categoryMonuments: "#5B9BD5",
  categoryFood: "#D4957A",
  categoryHistory: "#F5D76E",
  categoryCulture: "#A78BFA",

  // Overlay
  overlay20: "rgba(255, 255, 255, 0.2)",
  overlay50: "rgba(255, 255, 255, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.error500,
  errorBackground: palette.error100,
} as const
