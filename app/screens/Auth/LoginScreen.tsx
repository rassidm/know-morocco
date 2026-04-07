import { useState, useCallback } from "react"
import { Alert, View, TextStyle, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { useTranslation } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

/**
 * Login Screen
 * Google OAuth authentication entry point
 */
export function LoginScreen() {
  const { theme, themed } = useAppTheme()
  const { t } = useTranslation()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle sign in with Google
   */
  const handleSignIn = useCallback(async () => {
    setIsLoading(true)

    try {
      const result = await signIn()

      if (!result.success) {
        Alert.alert(t("auth.loginError"), result.error || t("errors.generic"), [
          { text: t("status.retry") },
        ])
      }
      // Success is handled by AuthContext listener which updates state
      // and RootNavigator navigates to App
    } catch {
      Alert.alert(t("auth.loginError"), t("errors.generic"), [{ text: t("status.retry") }])
    } finally {
      setIsLoading(false)
    }
  }, [signIn, t])

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      {/* Logo and Title */}
      <View style={themed($header)}>
        <View
          style={[themed($logoContainer), { backgroundColor: theme.colors.palette.primary100 }]}
        >
          <Text size="xxl" weight="bold" style={themed($logoText)}>
            🇲🇦
          </Text>
        </View>

        <Text testID="login-heading" tx="auth:title" preset="heading" style={themed($title)} />

        <Text tx="auth:subtitle" preset="subheading" style={themed($subtitle)} />
      </View>

      {/* Login Button */}
      <View style={themed($footer)}>
        <Button
          testID="google-sign-in-button"
          tx={isLoading ? "auth:signingIn" : "auth:signInWithGoogle"}
          style={themed($button)}
          preset="filled"
          onPress={handleSignIn}
          disabled={isLoading}
        />

        {/* Terms and Privacy */}
        <Text tx="auth:termsAccept" style={themed($terms)} />
      </View>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.xl,
  paddingTop: spacing.xxl,
})

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 120,
  height: 120,
  borderRadius: 60,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.xxl,
})

const $logoText: ThemedStyle<TextStyle> = () => ({
  fontSize: 60,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
  textAlign: "center",
})

const $subtitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
  textAlign: "center",
})

const $footer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xxl,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $terms: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  textAlign: "center",
  color: colors.textDim,
  marginTop: spacing.md,
})

export default LoginScreen
