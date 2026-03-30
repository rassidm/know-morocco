# Feature: Login Screen UI with Mock Data

## Metadata

- **Feature ID:** 010
- **Phase:** 2 - Authentication & User Management
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 002 (Theme System), 003 (Navigation), 004 (i18n)

---

## Goals

Create the Login screen UI with mock authentication flow. This feature provides the visual interface for users to sign in with Google, using mock data for initial testing before connecting to the real auth service.

### Acceptance Criteria

- [ ] Login screen displays app logo and tagline
- [ ] "Sign in with Google" button visible
- [ ] Button shows loading state during sign-in
- [ ] Mock authentication flow works
- [ ] Success navigates to Home screen
- [ ] Error shows alert with retry option
- [ ] All text uses i18n translations
- [ ] Screen is themed (light/dark mode)

---

## Implementation Steps

### Step 1: Create Login Screen Component

**File:** `app/screens/Auth/LoginScreen.tsx`
```typescript
import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Alert, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useAppTheme } from '@/theme/context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/Button'
import { useTranslation } from '@/i18n'
import { mockAuthService } from '@/services/authService.mock'
import type { AuthScreenProps } from '@/navigators/navigationTypes'

/**
 * Login Screen
 * Google OAuth authentication entry point
 */
export function LoginScreen({}: AuthScreenProps<'Login'>) {
  const { theme, themed } = useAppTheme()
  const navigation = useNavigation<AuthScreenProps<'Login'>['navigation']>()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle sign in with Google
   */
  const handleSignIn = useCallback(async () => {
    setIsLoading(true)

    try {
      // Use mock auth service for now
      const result = await mockAuthService.signInWithGoogle()

      if (result.success) {
        // Navigate to home after successful sign in
        // In real implementation, this will be handled by auth context
        Alert.alert(
          t('auth.loginSuccess'),
          t('auth.welcome'),
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to app (will be wired in Feature 011)
                console.log('Navigate to Home')
              },
            },
          ]
        )
      } else {
        Alert.alert(
          t('auth.loginError'),
          result.error || t('errors.generic'),
          [{ text: t('status.retry') }]
        )
      }
    } catch (error) {
      Alert.alert(
        t('auth.loginError'),
        t('errors.generic'),
        [{ text: t('status.retry') }]
      )
    } finally {
      setIsLoading(false)
    }
  }, [t])

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ThemedView variant="surface" style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: theme.colors.primaryMuted }]}>
            <ThemedText size="4xl" weight="bold" color="inverse">
              🇲🇦
            </ThemedText>
          </View>
          
          <ThemedText variant="heading" style={styles.title}>
            {t('auth.title')}
          </ThemedText>
          
          <ThemedText variant="body" color="secondary" style={styles.subtitle}>
            {t('auth.subtitle')}
          </ThemedText>
        </View>

        {/* Login Button */}
        <View style={styles.footer}>
          <Button
            variant="primary"
            size="large"
            onPress={handleSignIn}
            disabled={isLoading}
            loading={isLoading}
            icon="google"
            style={styles.button}
          >
            {isLoading ? t('auth.signingIn') : t('auth.signInWithGoogle')}
          </Button>

          {/* Terms and Privacy */}
          <ThemedText variant="caption" style={styles.terms} color="muted">
            {t('auth.termsAccept')}
          </ThemedText>
        </View>
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
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    marginBottom: 16,
  },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 16,
  },
})

export default LoginScreen
```

---

### Step 2: Add Missing i18n Translations

Update the translation files to include login screen strings.

**File:** `app/i18n/en.ts`

Add to the `auth` section:
```typescript
auth: {
  // ... existing fields
  termsAccept: 'By signing in, you agree to our Terms of Service and Privacy Policy',
}
```

**File:** `app/i18n/fr.ts`

Add to the `auth` section:
```typescript
auth: {
  // ... existing fields
  termsAccept: 'En vous connectant, vous acceptez nos Conditions d\'utilisation et Politique de confidentialité',
}
```

**File:** `app/i18n/es.ts`

Add to the `auth` section:
```typescript
auth: {
  // ... existing fields
  termsAccept: 'Al iniciar sesión, aceptas nuestros Términos de servicio y Política de privacidad',
}
```

---

### Step 3: Create Button Component (Placeholder)

Since Feature 013 (Button Components) hasn't been completed yet, create a simple button placeholder.

**File:** `app/components/Button.tsx`
```typescript
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native'
import { useAppTheme } from '@/theme/context'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  icon?: 'google' | 'apple' | 'facebook'
  style?: ViewStyle
  testID?: string
}

/**
 * Button Component
 * Temporary implementation until Feature 013
 */
export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  testID,
}: ButtonProps) {
  const { theme } = useAppTheme()

  const buttonStyles = {
    primary: {
      backgroundColor: theme.colors.buttonBackground,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: theme.colors.backgroundSurface,
      borderColor: theme.colors.border,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
    },
  }

  const textStyles = {
    primary: { color: theme.colors.buttonText },
    secondary: { color: theme.colors.textPrimary },
    outline: { color: theme.colors.primary },
  }

  const sizeStyles = {
    small: { paddingVertical: 8, paddingHorizontal: 16 },
    medium: { paddingVertical: 12, paddingHorizontal: 24 },
    large: { paddingVertical: 16, paddingHorizontal: 32 },
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyles[variant],
        sizeStyles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={textStyles[variant].color} />
      ) : (
        <Text style={[styles.text, textStyles[variant]]}>
          {icon === 'google' && '🔍 '}
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
})

export default Button
```

---

### Step 4: Update Welcome Screen (Optional)

**File:** `app/screens/Auth/WelcomeScreen.tsx`

Create a simple welcome screen that can be shown before login:

```typescript
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useAppTheme } from '@/theme/context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/Button'
import { useTranslation } from '@/i18n'
import type { AuthScreenProps } from '@/navigators/navigationTypes'

export function WelcomeScreen({}: AuthScreenProps<'Welcome'>) {
  const { theme } = useAppTheme()
  const navigation = useNavigation<AuthScreenProps<'Welcome'>['navigation']>()
  const { t } = useTranslation()

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ThemedView variant="surface" style={styles.content}>
        <View style={styles.header}>
          <ThemedText variant="heading">🇲🇦</ThemedText>
          <ThemedText variant="title" style={styles.title}>
            {t('app.name')}
          </ThemedText>
          <ThemedText variant="body" color="secondary">
            {t('app.tagline')}
          </ThemedText>
        </View>

        <View style={styles.footer}>
          <Button
            variant="primary"
            size="large"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          >
            {t('auth.signInWithGoogle')}
          </Button>
        </View>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: { marginBottom: 16 },
})

export default WelcomeScreen
```

---

### Step 5: Update Auth Navigator

Ensure the AuthNavigator starts with Welcome or Login screen.

**File:** `app/navigators/AuthNavigator.tsx`

```typescript
<Stack.Navigator
  screenOptions={{ headerShown: false }}
  initialRouteName="Login" // or "Welcome"
>
  <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
</Stack.Navigator>
```

---

## Mock Data

### Mock Auth Service

Already created in Feature 009: `app/services/authService.mock.ts`

### Mock User Data

```typescript
export const MOCK_USER = {
  id: 'mock-user-123',
  email: 'test@example.com',
  name: 'Test User',
  avatar_url: 'https://i.pravatar.cc/300',
  preferred_language: 'en' as const,
  created_at: new Date().toISOString(),
}
```

---

## Integration Points

### Connects To

- **Feature 002** - Uses theme system for styling
- **Feature 003** - Navigation to Home screen
- **Feature 004** - i18n for translations
- **Feature 009** - Auth service for sign-in logic

### Used By

- **Feature 011** - Auth Wiring (connect to real auth)
- **Feature 054** - Profile Screen (shows logged-in user)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Login screen renders correctly
- [ ] App logo and title display
- [ ] "Sign in with Google" button visible
- [ ] Button shows loading state when pressed
- [ ] Mock sign-in shows success alert
- [ ] Error handling shows retry option
- [ ] All text uses i18n translations
- [ ] Theme colors apply correctly (light/dark)
- [ ] Navigation to Home works (after mock success)

---

## Notes

- This is a UI-first implementation with mock data
- Real auth service will be wired in Feature 011
- Button component is a placeholder until Feature 013
- Consider adding social login buttons (Apple, Facebook) in the future

---

## References

- [React Navigation](https://reactnavigation.org/docs/getting-started/)
- [Expo Safe Area Context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/)
- [React Native Alert](https://reactnative.dev/docs/alert)
- [Google Sign-In Branding](https://developers.google.com/identity/branding-guidelines)
