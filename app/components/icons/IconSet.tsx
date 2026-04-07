/* eslint-disable no-restricted-imports -- Emoji rendering needs RN Text */
import { Text, TextStyle } from "react-native"
/* eslint-enable no-restricted-imports */

import { IconWrapper, IconWrapperProps } from "./IconWrapper"

export type IconName =
  | "search"
  | "close"
  | "back"
  | "forward"
  | "home"
  | "settings"
  | "profile"
  | "favorite"
  | "share"
  | "download"
  | "play"
  | "pause"
  | "location"
  | "language"
  | "theme"
  | "notification"

export interface IconSetProps extends Omit<IconWrapperProps, "children"> {
  /**
   * Icon name
   */
  name: IconName
}

const iconMap: Record<IconName, string> = {
  search: "🔍",
  close: "✕",
  back: "←",
  forward: "→",
  home: "🏠",
  settings: "⚙️",
  profile: "👤",
  favorite: "❤️",
  share: "📤",
  download: "⬇️",
  play: "▶️",
  pause: "⏸️",
  location: "📍",
  language: "🌐",
  theme: "🎨",
  notification: "🔔",
}

/**
 * Icon Set Component - Common app icons
 */
export function IconSet({ name, ...rest }: IconSetProps) {
  const icon = iconMap[name]

  return (
    <IconWrapper accessibilityLabel={`${name} icon`} {...rest}>
      <Text style={$iconText}>{icon}</Text>
    </IconWrapper>
  )
}

const $iconText: TextStyle = {
  fontSize: 18,
  lineHeight: 22,
}
