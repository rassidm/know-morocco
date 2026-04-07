# Feature: Auth Wiring - Connect Login to Service

## Metadata

- **Feature ID:** 011
- **Phase:** 2 - Authentication & User Management
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 009 (Auth Service), 010 (Login Screen)

---

## Goals

Wire the Login screen to the real auth service instead of the mock service. This feature connects the UI layer created in Feature 010 to the authentication service created in Feature 009, enabling real Google OAuth authentication.

### Acceptance Criteria

- [ ] LoginScreen uses real authService instead of mockAuthService
- [ ] Loading state works during OAuth flow
- [ ] Success shows appropriate feedback
- [ ] Error handling shows user-friendly messages
- [ ] Auth state updates in AuthContext
- [ ] Navigation to Home works after successful login
- [ ] All text uses i18n translations

---

## Implementation Steps

### Step 1: Update LoginScreen to Use Real Auth

**File:** `app/screens/Auth/LoginScreen.tsx`

Change from:
```typescript
import { mockAuthService } from "@/services/authService.mock"
```

To:
```typescript
import authService from "@/services/authService"
import { useAuth } from "@/context/AuthContext"
```

Update the `handleSignIn` function to:
1. Call `authService.signInWithGoogle()` instead of mock
2. Use `useAuth()` context to get the auth state
3. Handle the OAuth URL redirect properly
4. Show appropriate loading and error states

**Key changes:**
- Remove mock auth service import
- Import real authService and useAuth hook
- Update handleSignIn to use real OAuth flow
- Add deep linking handler for OAuth callback
- Update success/error handling for real auth responses

---

### Step 2: Add OAuth Callback Handler

**File:** `app/screens/Auth/OAuthCallbackScreen.tsx`

Create a simple screen to handle the OAuth callback:

```typescript
import { useEffect, useState } from "react"
import { View, ActivityIndicator } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useAuth } from "@/context/AuthContext"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useTranslation } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { AuthScreenProps } from "@/navigators/navigationTypes"

export function OAuthCallbackScreen({}: AuthScreenProps<"OAuthCallback">) {
  const [error, setError] = useState<string | null>(null)
  const { themed } = useAppTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    // Handle OAuth callback URL
    const handleCallback = async () => {
      // Auth context should handle this automatically
      // Just wait for auth state to update
    }

    handleCallback()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={themed($container)}>
      {error ? (
        <Text text={error} preset="heading" />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </Screen>
  )
}

const $container = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
```

---

### Step 3: Update Auth Navigator

**File:** `app/navigators/AuthNavigator.tsx`

Add the OAuthCallback screen to the auth stack:

```typescript
import { OAuthCallbackScreen } from "@/screens/Auth/OAuthCallbackScreen"

// Add to Stack.Navigator:
<Stack.Screen name="OAuthCallback" component={OAuthCallbackScreen} />
```

---

### Step 4: Update Navigation After Login

**File:** `app/screens/Auth/LoginScreen.tsx`

After successful authentication, navigate to the Home screen using the Root navigator:

```typescript
import type { RootStackParamList } from "@/navigators/navigationTypes"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

// On success:
navigation.navigate("App")
```

---

### Step 5: Add Loading and Error States

Update the LoginScreen to show proper loading and error states:

```typescript
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

// In handleSignIn:
setIsLoading(true)
setError(null)

try {
  const result = await authService.signInWithGoogle()
  
  if (!result.success) {
    setError(result.error || t("auth.loginError"))
  }
  // Success will be handled by auth context listener
} catch (err) {
  setError(t("auth.loginError"))
} finally {
  setIsLoading(false)
}
```

---

## Integration Points

### Connects To

- **Feature 009** - Uses authService.signInWithGoogle()
- **Feature 006** - Uses useAuth() context for state
- **Feature 010** - Replaces mock auth in LoginScreen
- **Feature 003** - Navigation to Home screen

### Used By

- **Feature 012** - User Profile Service (needs authenticated user)
- **Feature 054** - Profile Screen (shows logged-in user)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] LoginScreen imports real authService
- [ ] Google OAuth flow initiates correctly
- [ ] Loading state shows during OAuth
- [ ] Error messages display on failure
- [ ] Success navigates to Home screen
- [ ] AuthContext updates with user data
- [ ] Deep linking handles OAuth callback

---

## Notes

- This feature wires existing UI (010) to existing service (009)
- AuthContext from Feature 006 should already be listening to auth state changes
- OAuth redirect URL must be configured in Supabase dashboard
- Test with both real Google OAuth and mock service (can toggle for dev)
- Consider adding retry logic for network failures

---

## References

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth)
- [React Navigation Deep Linking](https://reactnavigation.org/docs/deep-linking/)
- [Feature 009 - Auth Service](./009-auth-service.md)
- [Feature 010 - Login Screen](./010-login-screen.md)
