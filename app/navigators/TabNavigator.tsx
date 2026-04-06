import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { HomeScreen } from "@/screens/Home/HomeScreen"
import { NearbyScreen } from "@/screens/Nearby/NearbyScreen"
import { ProfileScreen } from "@/screens/Profile/ProfileScreen"
import { useAppTheme } from "@/theme/context"

import type { AppTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<AppTabParamList>()

/**
 * Tab Navigator
 * Main navigation for authenticated users
 */
export function TabNavigator() {
  const { theme } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.tint,
        tabBarInactiveTintColor: theme.colors.textDim,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused: _focused, color: _color, size: _size }) => {
            // TODO: Replace with actual icons
            return null
          },
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{
          title: "Nearby",
          tabBarIcon: ({ focused: _focused, color: _color, size: _size }) => {
            // TODO: Replace with actual icons
            return null
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused: _focused, color: _color, size: _size }) => {
            // TODO: Replace with actual icons
            return null
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
