import { FC, useState } from "react"
import { Alert, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useTranslation } from "@/i18n"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { mockAuthService } from "@/services/authService.mock"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

const loginLogo = require("@assets/images/logo.png")

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const { themed } = useAppTheme()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  async function handleGoogleSignIn() {
    setIsLoading(true)

    try {
      // Use mock auth service for now (Feature 010 - UI with mock data)
      const result = await mockAuthService.signInWithGoogle()

      if (result.success) {
        // Navigate to home after successful sign in
        Alert.alert(t("auth.loginSuccess"), t("auth.welcome"), [
          {
            text: "OK",
            onPress: () => {
              // Navigate to app (will be wired in Feature 011)
              console.log("Navigate to Home")
            },
          },
        ])
      } else {
        Alert.alert(t("auth.loginError"), result.error || t("errors.generic"), [
          { text: t("status.retry") },
        ])
      }
    } catch {
      Alert.alert(t("auth.loginError"), t("errors.generic"), [{ text: t("status.retry") }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={themed($logoContainer)}>
        <Image style={themed($logo)} source={loginLogo} resizeMode="contain" />
      </View>

      <Text testID="login-heading" tx="auth:title" preset="heading" style={themed($title)} />
      <Text tx="auth:subtitle" preset="subheading" style={themed($subtitle)} />

      <Button
        testID="google-sign-in-button"
        tx={isLoading ? "auth:signingIn" : "auth:signInWithGoogle"}
        style={themed($signInButton)}
        preset="reversed"
        onPress={handleGoogleSignIn}
        disabled={isLoading}
      />

      <Text tx="auth:termsAccept" style={themed($terms)} />
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
  alignItems: "center",
})

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $logo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 120,
  width: "100%",
  marginBottom: spacing.xl,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
  textAlign: "center",
})

const $subtitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
  textAlign: "center",
})

const $signInButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
  width: "100%",
})

const $terms: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  textAlign: "center",
  color: colors.textDim,
  marginTop: spacing.xl,
  fontSize: 12,
})
