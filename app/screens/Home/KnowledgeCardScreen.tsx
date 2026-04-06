import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface KnowledgeCardScreenProps extends AppScreenProps<"KnowledgeCard"> {}

/**
 * Knowledge Card Screen
 * Displays a single knowledge card with full details
 */
export const KnowledgeCardScreen: FC<KnowledgeCardScreenProps> = function KnowledgeCardScreen(
  props,
) {
  const { themed } = useAppTheme()
  const { cardId, title } = props.route.params

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text preset="heading" text={`Knowledge Card: ${title || cardId}`} />
      <Text preset="default" text="Card details will appear here." />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

export default KnowledgeCardScreen
