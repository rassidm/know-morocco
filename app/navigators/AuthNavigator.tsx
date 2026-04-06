import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { LoginScreen } from "@/screens/LoginScreen"
import { WelcomeScreen } from "@/screens/WelcomeScreen"

import type { AuthStackParamList } from "./navigationTypes"

const Stack = createNativeStackNavigator<AuthStackParamList>()

/**
 * Auth Navigator
 * Handles authentication flow (login, welcome)
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
    </Stack.Navigator>
  )
}

export default AuthNavigator
