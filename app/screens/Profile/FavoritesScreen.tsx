import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface FavoritesScreenProps extends AppScreenProps<"Favorites"> {}

/**
 * Favorites Screen
 * User's saved knowledge cards
 */
export const FavoritesScreen: FC<FavoritesScreenProps> = function FavoritesScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text preset="heading" text="Favorites" />
      <Text preset="default" text="Your saved knowledge cards." />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

export default FavoritesScreen
