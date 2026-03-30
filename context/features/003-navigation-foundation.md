# Feature: Navigation Foundation Setup

## Metadata

- **Feature ID:** 003
- **Phase:** 1 - Foundation Setup
- **Status:** Not Started
- **Estimated Time:** 60 minutes
- **Dependencies:** 001 (Project Configuration), 002 (Theme System)

---

## Goals

Set up the complete navigation structure for the Know Morocco app using React Navigation v7. This includes creating the authentication stack, main app stack, and bottom tab navigator with proper TypeScript types and screen organization.

### Acceptance Criteria

- [ ] Navigation types defined with TypeScript
- [ ] Auth stack navigator created (Login screen)
- [ ] App stack navigator created (Main screens)
- [ ] Bottom tabs navigator created (Home, Nearby, Profile)
- [ ] Navigation state persistence with MMKV
- [ ] Screen components created as placeholders
- [ ] Navigation hooks typed correctly
- [ ] Deep linking configuration ready

---

## Implementation Steps

### Step 1: Define Navigation Types

Create TypeScript types for all navigation routes and params.

**File:** `app/navigators/navigationTypes.ts`
```typescript
import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenParams } from '@react-navigation/bottom-tabs'

/**
 * Root Stack Parameter List
 * Handles auth flow vs authenticated app flow
 */
export type RootStackParamList = {
  Auth: undefined
  App: NavigatorScreenParams<AppTabParamList>
  NotFound: undefined
}

/**
 * Authentication Stack Parameter List
 */
export type AuthStackParamList = {
  Login: undefined
  Welcome: undefined
}

/**
 * App Tab Navigator Parameter List
 */
export type AppTabParamList = {
  Home: undefined
  Nearby: undefined
  Profile: undefined
}

/**
 * Main App Stack Parameter List (inside tabs)
 */
export type AppStackParamList = {
  Home: undefined
  KnowledgeCard: { cardId: string; title?: string }
  LanguageSelect: undefined
  Settings: undefined
  Favorites: undefined
  OfflineContent: undefined
  CardDetail: { cardId: string }
}

/**
 * Type helpers for screens
 */
export type RootScreenProps<S extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  S
>

export type AuthScreenProps<S extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  S
>

export type AppScreenProps<S extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  S
>

export type TabScreenProps<S extends keyof AppTabParamList> = NativeStackScreenProps<
  AppTabParamList,
  S
>

/**
 * Declaration merging for React Navigation
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
```

---

### Step 2: Create Auth Stack Navigator

Create the navigation stack for authentication flow.

**File:** `app/navigators/AuthNavigator.tsx`
```typescript
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from './navigationTypes'

// Import screens
import LoginScreen from '@/screens/Auth/LoginScreen'
import WelcomeScreen from '@/screens/Auth/WelcomeScreen'

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
        animation: 'fade',
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Sign In',
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
```

---

### Step 3: Create Bottom Tab Navigator

Create the main tab navigator for authenticated users.

**File:** `app/navigators/TabNavigator.tsx`
```typescript
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet } from 'react-native'
import { AppTabParamList } from './navigationTypes'
import { useAppTheme } from '@/theme/context'
import { ThemedText } from '@/components/ThemedText'

// Import tab screens
import HomeScreen from '@/screens/Home/HomeScreen'
import NearbyScreen from '@/screens/Nearby/NearbyScreen'
import ProfileScreen from '@/screens/Profile/ProfileScreen'

// Import icons (using react-native-vector-icons or custom icons)
// For now, we'll use simple text placeholders
const Tab = createBottomTabNavigator<AppTabParamList>()

interface TabIconProps {
  name: string
  focused: boolean
}

function TabIcon({ name, focused }: TabIconProps) {
  const { theme } = useAppTheme()

  return (
    <View style={styles.iconContainer}>
      <ThemedText
        size="xs"
        weight={focused ? 'semibold' : 'regular'}
        color={focused ? 'primary' : 'muted'}
      >
        {name}
      </ThemedText>
    </View>
  )
}

/**
 * Tab Navigator
 * Main navigation for authenticated users
 */
export function TabNavigator() {
  const { theme, themed } = useAppTheme()

  const tabOptions = themed({
    screenOptions: {
      tabBarStyle: {
        backgroundColor: theme.colors.backgroundSurface,
        borderTopColor: theme.colors.border,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        height: 60,
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textMuted,
      headerStyle: {
        backgroundColor: theme.colors.backgroundSurface,
      },
      headerTintColor: theme.colors.textPrimary,
      headerTitleStyle: {
        fontWeight: '600',
      },
    },
  })

  return (
    <Tab.Navigator
      screenOptions={tabOptions.screenOptions}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{
          title: 'Nearby',
          tabBarIcon: ({ focused }) => <TabIcon name="Nearby" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default TabNavigator
```

---

### Step 4: Create App Stack Navigator

Create the main app stack that wraps the tab navigator.

**File:** `app/navigators/AppNavigator.tsx`
```typescript
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList, AppTabParamList } from './navigationTypes'
import { TabNavigator } from './TabNavigator'

// Import additional screens (not in tabs)
import KnowledgeCardScreen from '@/screens/Home/KnowledgeCardScreen'
import LanguageSelectScreen from '@/screens/Profile/LanguageSelectScreen'
import SettingsScreen from '@/screens/Profile/SettingsScreen'
import FavoritesScreen from '@/screens/Profile/FavoritesScreen'
import OfflineContentScreen from '@/screens/Offline/OfflineContentScreen'
import CardDetailScreen from '@/screens/Home/CardDetailScreen'

const Stack = createNativeStackNavigator<AppStackParamList & { MainTabs: undefined }>()

/**
 * App Navigator
 * Main navigation stack for authenticated users
 */
export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="MainTabs"
    >
      {/* Main Tab Navigator */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: 'Know Morocco',
        }}
      />

      {/* Full-screen modal screens */}
      <Stack.Screen
        name="KnowledgeCard"
        component={KnowledgeCardScreen}
        options={{
          presentation: 'card',
          title: 'Knowledge Card',
        }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={{
          presentation: 'modal',
          title: 'Card Details',
        }}
      />
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelectScreen}
        options={{
          presentation: 'modal',
          title: 'Select Language',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'card',
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          presentation: 'card',
          title: 'Favorites',
        }}
      />
      <Stack.Screen
        name="OfflineContent"
        component={OfflineContentScreen}
        options={{
          presentation: 'card',
          title: 'Offline Content',
        }}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
```

---

### Step 5: Create Root Navigator

Create the root navigator that switches between auth and app stacks.

**File:** `app/navigators/RootNavigator.tsx`
```typescript
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './navigationTypes'
import { AuthNavigator } from './AuthNavigator'
import { AppNavigator } from './AppNavigator'
import { useAuth } from '@/context/AuthContext'

const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * Root Navigator
 * Manages navigation between auth and app flows
 */
export function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth()

  // Show nothing while checking auth state
  if (isLoading) {
    return null
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
```

---

### Step 6: Create Navigation Persistence

Add MMKV-based navigation state persistence.

**File:** `app/navigators/navigationPersistence.ts`
```typescript
import { MMKV } from 'react-native-mmkv'
import { createNavigationPersistence } from 'react-navigation-persisted-state'

/**
 * MMKV storage instance for navigation state
 */
export const navigationStorage = new MMKV()

const NAVIGATION_STATE_KEY = 'navigation.state'

/**
 * Navigation persistence configuration
 */
export const navigationPersistence = {
  saveState: (state: any) => {
    try {
      navigationStorage.set(NAVIGATION_STATE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save navigation state:', error)
    }
  },

  restoreState: () => {
    try {
      const state = navigationStorage.getString(NAVIGATION_STATE_KEY)
      return state ? JSON.parse(state) : undefined
    } catch (error) {
      console.error('Failed to restore navigation state:', error)
      return undefined
    }
  },

  clearState: () => {
    try {
      navigationStorage.delete(NAVIGATION_STATE_KEY)
    } catch (error) {
      console.error('Failed to clear navigation state:', error)
    }
  },
}

export default navigationPersistence
```

---

### Step 7: Create Placeholder Screen Components

Create placeholder screens for all routes.

**File:** `app/screens/Auth/LoginScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '@/theme/context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

interface LoginScreenProps {}

/**
 * Login Screen
 * Google OAuth authentication
 */
export function LoginScreen({}: LoginScreenProps) {
  const { theme } = useAppTheme()

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ThemedView variant="surface" style={styles.content}>
        <ThemedText variant="heading" style={styles.title}>
          Welcome to Know Morocco
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.subtitle}>
          Discover Morocco's rich heritage
        </ThemedText>
        {/* Login button will be added in Feature 010 */}
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
})

export default LoginScreen
```

**File:** `app/screens/Auth/WelcomeScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Welcome!</ThemedText>
        <ThemedText variant="body">Your cultural journey begins here.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
})

export default WelcomeScreen
```

**File:** `app/screens/Home/HomeScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Home</ThemedText>
        <ThemedText variant="body">Knowledge cards will appear here.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default HomeScreen
```

**File:** `app/screens/Home/KnowledgeCardScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function KnowledgeCardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Knowledge Card</ThemedText>
        <ThemedText variant="body">Card details will appear here.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
})

export default KnowledgeCardScreen
```

**File:** `app/screens/Home/CardDetailScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function CardDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Card Detail</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default CardDetailScreen
```

**File:** `app/screens/Nearby/NearbyScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function NearbyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Nearby</ThemedText>
        <ThemedText variant="body">Browse nearby cultural sites.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default NearbyScreen
```

**File:** `app/screens/Profile/ProfileScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Profile</ThemedText>
        <ThemedText variant="body">Manage your account settings.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default ProfileScreen
```

**File:** `app/screens/Profile/LanguageSelectScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function LanguageSelectScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Select Language</ThemedText>
        <ThemedText variant="body">Choose your preferred language.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default LanguageSelectScreen
```

**File:** `app/screens/Profile/SettingsScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Settings</ThemedText>
        <ThemedText variant="body">App settings and preferences.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default SettingsScreen
```

**File:** `app/screens/Profile/FavoritesScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Favorites</ThemedText>
        <ThemedText variant="body">Your saved knowledge cards.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default FavoritesScreen
```

**File:** `app/screens/Offline/OfflineContentScreen.tsx`
```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

export function OfflineContentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="heading">Offline Content</ThemedText>
        <ThemedText variant="body">Download content for offline access.</ThemedText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})

export default OfflineContentScreen
```

---

### Step 8: Update App.tsx with Navigation

Integrate the navigation system into the main app file.

**File:** `app/app.tsx`

Ensure the app is wrapped with NavigationContainer:

```typescript
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from '@/navigators/RootNavigator'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/theme/context'

// In the component tree:
// <ThemeProvider>
//   <AuthProvider>
//     <NavigationContainer>
//       <RootNavigator />
//     </NavigationContainer>
//   </AuthProvider>
// </ThemeProvider>
```

---

## Mock Data (If Applicable)

Not applicable - this is a navigation infrastructure feature.

---

## Integration Points

### Connects To

- **Feature 002** - Uses theme system for styling
- **Feature 006** - Auth context for determining auth state
- **Feature 007** - MMKV for navigation state persistence

### Used By

- **Feature 010** - Login Screen
- **Feature 024** - Home Screen
- All screen components

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] App launches without navigation errors
- [ ] Auth stack displays when not authenticated
- [ ] App stack displays when authenticated
- [ ] Bottom tabs are visible and clickable
- [ ] Navigation between tabs works
- [ ] Push navigation to detail screens works
- [ ] Back navigation works correctly
- [ ] Navigation state persists after app restart
- [ ] All screen placeholders render without errors

---

## Notes

- React Navigation v7 uses native stack by default for better performance
- Navigation state persistence helps users return to where they left off
- The placeholder screens will be filled with real functionality in subsequent features
- Consider adding gesture handling for swipe-to-go-back in a future iteration

---

## References

- [React Navigation v7 Documentation](https://reactnavigation.org/docs/getting-started/)
- [React Navigation TypeScript Guide](https://reactnavigation.org/docs/typescript/)
- [Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator/)
- [Bottom Tab Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)
