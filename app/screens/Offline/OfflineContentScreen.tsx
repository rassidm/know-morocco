import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface OfflineContentScreenProps extends AppScreenProps<"OfflineContent"> {}

/**
 * Offline Content Screen
 * Download and manage content for offline access
 */
export const OfflineContentScreen: FC<OfflineContentScreenProps> = function OfflineContentScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text preset="heading" text="Offline Content" />
      <Text preset="default" text="Download content for offline access." />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

export default OfflineContentScreen
