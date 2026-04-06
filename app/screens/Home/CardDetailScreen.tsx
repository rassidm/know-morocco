import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface CardDetailScreenProps extends AppScreenProps<"CardDetail"> {}

/**
 * Card Detail Screen
 * Detailed view of a knowledge card
 */
export const CardDetailScreen: FC<CardDetailScreenProps> = function CardDetailScreen(props) {
  const { themed } = useAppTheme()
  const { cardId } = props.route.params

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text preset="heading" text={`Card Detail: ${cardId}`} />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

export default CardDetailScreen
