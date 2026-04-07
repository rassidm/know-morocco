import { View, ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Spinner } from "./Spinner"

export interface LoadingScreenProps {
  /**
   * Loading message (i18n key)
   */
  messageTx?: TxKeyPath
  /**
   * Loading message (direct text)
   */
  message?: string
  /**
   * Whether to show full screen overlay
   */
  fullscreen?: boolean
}

/**
 * Loading Screen Component - Full screen loading indicator
 */
export function LoadingScreen({ messageTx, message, fullscreen = true }: LoadingScreenProps) {
  const { themed } = useAppTheme()

  if (fullscreen) {
    return (
      <Screen
        preset="fixed"
        contentContainerStyle={themed($centerContent)}
        safeAreaEdges={["top", "bottom"]}
      >
        <Spinner size="large" />
        {(messageTx || message) && <Text tx={messageTx} text={message} style={themed($message)} />}
      </Screen>
    )
  }

  return (
    <View style={themed($inlineContainer)}>
      <Spinner />
      {(messageTx || message) && <Text tx={messageTx} text={message} />}
    </View>
  )
}

const $centerContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: spacing.md,
})

const $message: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  textAlign: "center",
})

const $inlineContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: 16,
}
