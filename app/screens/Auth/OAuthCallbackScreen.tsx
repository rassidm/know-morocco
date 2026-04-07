import { useEffect, useState } from "react"
import { ActivityIndicator, TextStyle, ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import type { AuthScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

/**
 * OAuth Callback Screen
 * Handles the OAuth callback URL and waits for auth state to update
 */
export function OAuthCallbackScreen(_props: AuthScreenProps<"OAuthCallback">) {
  const { themed } = useAppTheme()
  const { isAuthenticated, isLoading } = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If already authenticated, navigation will handle redirect via RootNavigator
    if (isAuthenticated) {
      return
    }

    // Set a timeout in case auth state doesn't update
    const timer = setTimeout(() => {
      setError("Authentication timed out. Please try again.")
    }, 15000) // 15 second timeout

    return () => clearTimeout(timer)
  }, [isAuthenticated])

  if (error) {
    return (
      <Screen
        preset="fixed"
        contentContainerStyle={themed($container)}
        safeAreaEdges={["top", "bottom"]}
      >
        <Text text={error} preset="heading" style={themed($errorText)} />
      </Screen>
    )
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={themed($container)}
      safeAreaEdges={["top", "bottom"]}
    >
      <ActivityIndicator size="large" />
      <Text
        text={isLoading ? "Signing you in..." : "Completing authentication..."}
        style={themed($loadingText)}
      />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
})

const $loadingText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  textAlign: "center",
})

const $errorText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginBottom: spacing.xl,
})

export default OAuthCallbackScreen
