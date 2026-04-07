import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { LoginScreen } from "@/screens/Auth/LoginScreen"
import { OAuthCallbackScreen } from "@/screens/Auth/OAuthCallbackScreen"
import { WelcomeScreen } from "@/screens/WelcomeScreen"

import type { AuthStackParamList } from "./navigationTypes"

const Stack = createNativeStackNavigator<AuthStackParamList>()

/**
 * Auth Navigator
 * Handles authentication flow (login, welcome, OAuth callback)
 */
export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="OAuthCallback" component={OAuthCallbackScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
