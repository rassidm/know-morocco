import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useAuth } from "@/context/AuthContext"

import { AuthNavigator } from "./AuthNavigator"
import type { RootStackParamList } from "./navigationTypes"
import { TabNavigator } from "./TabNavigator"

const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * Root Navigator
 * Manages navigation between auth and app flows based on authentication state
 */
export function RootNavigator() {
  const { isAuthenticated } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="App" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
