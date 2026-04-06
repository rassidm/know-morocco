import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

const loginLogo = require("@assets/images/logo.png")

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const { signIn, isLoading } = useAuth()

  const { themed } = useAppTheme()

  async function handleGoogleSignIn() {
    const result = await signIn()
    if (!result.success) {
      console.error("Sign in failed:", result.error)
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
        tx="auth:signInWithGoogle"
        style={themed($signInButton)}
        preset="reversed"
        onPress={handleGoogleSignIn}
        disabled={isLoading}
      />
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
