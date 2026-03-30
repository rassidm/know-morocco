# Feature: Authentication Context and State Management

## Metadata

- **Feature ID:** 006
- **Phase:** 1 - Foundation Setup
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 001 (Project Configuration), 005 (Supabase Client)

---

## Goals

Create the authentication context provider that manages user authentication state throughout the app. This feature provides a centralized way to access auth state, login, logout, and handle session management with Supabase Auth.

### Acceptance Criteria

- [ ] AuthContext created with TypeScript types
- [ ] AuthProvider component wraps app
- [ ] useAuth hook created for accessing auth state
- [ ] Session persistence configured
- [ ] Auth state listener set up
- [ ] Loading state during auth check
- [ ] isAuthenticated flag available
- [ ] User object accessible when authenticated

---

## Implementation Steps

### Step 1: Create Auth Context Types

**File:** `app/context/AuthContext.types.ts`
```typescript
import type { User, Session } from '@supabase/supabase-js'

/**
 * Authentication context value interface
 */
export interface AuthContextValue {
  /** Current authenticated user */
  user: User | null
  /** Current session */
  session: Session | null
  /** Whether user is authenticated */
  isAuthenticated: boolean
  /** Whether auth state is loading */
  isLoading: boolean
  /** Sign in function */
  signIn: () => Promise<{ success: boolean; error?: string }>
  /** Sign out function */
  signOut: () => Promise<void>
  /** Refresh session */
  refreshSession: () => Promise<void>
}

/**
 * Auth provider props
 */
export interface AuthProviderProps {
  children: React.ReactNode
}
```

---

### Step 2: Create Auth Context Provider

**File:** `app/context/AuthContext.tsx`
```typescript
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase, getSession, getUser, signOut as supabaseSignOut } from '@/services/supabase'
import type { AuthContextValue, AuthProviderProps } from './AuthContext.types'

/**
 * Create auth context with undefined default
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * Initial auth state
 */
const INITIAL_AUTH_STATE = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
}

/**
 * Auth Provider Component
 * Wraps the app and provides authentication state
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<Omit<AuthContextValue, 'signIn' | 'signOut' | 'refreshSession'>>(
    INITIAL_AUTH_STATE
  )

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        // Get initial session
        const session = await getSession()
        const user = await getUser()

        if (isMounted) {
          setAuthState({
            user: user || null,
            session: session || null,
            isAuthenticated: !!session && !!user,
            isLoading: false,
          })
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (isMounted) {
          setAuthState({
            ...INITIAL_AUTH_STATE,
            isLoading: false,
          })
        }
      }
    }

    initializeAuth()

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)

        if (isMounted) {
          switch (event) {
            case 'SIGNED_IN':
              setAuthState((prev) => ({
                ...prev,
                session: session || null,
                user: session?.user || null,
                isAuthenticated: true,
                isLoading: false,
              }))
              break

            case 'SIGNED_OUT':
              setAuthState({
                ...INITIAL_AUTH_STATE,
                isLoading: false,
              })
              break

            case 'TOKEN_REFRESHED':
              setAuthState((prev) => ({
                ...prev,
                session: session || null,
              }))
              break

            case 'USER_UPDATED':
              setAuthState((prev) => ({
                ...prev,
                user: session?.user || null,
              }))
              break

            default:
              // For other events, just update session
              setAuthState((prev) => ({
                ...prev,
                session: session || null,
                isLoading: false,
              }))
          }
        }
      }
    )

    // Cleanup subscription on unmount
    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Sign in with Google OAuth
   */
  const signIn = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'knowmorocco://callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Sign in error:', error)
        return {
          success: false,
          error: error.message,
        }
      }

      return { success: true }
    } catch (err) {
      const error = err as AuthError
      console.error('Sign in failed:', error)
      return {
        success: false,
        error: error.message || 'Failed to sign in',
      }
    }
  }, [])

  /**
   * Sign out
   */
  const signOut = useCallback(async () => {
    try {
      await supabaseSignOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }, [])

  /**
   * Refresh session
   */
  const refreshSession = useCallback(async () => {
    try {
      const session = await getSession()
      const user = await getUser()

      setAuthState((prev) => ({
        ...prev,
        session: session || null,
        user: user || null,
        isAuthenticated: !!session && !!user,
      }))
    } catch (error) {
      console.error('Session refresh error:', error)
    }
  }, [])

  const value: AuthContextValue = {
    ...authState,
    signIn,
    signOut,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
```

---

### Step 3: Create Auth Helper Functions

**File:** `app/context/authHelpers.ts`
```typescript
import { supabase } from '@/services/supabase'

/**
 * Check if user is authenticated (synchronous check of cached session)
 */
export function isAuthCached(): boolean {
  const session = supabase.auth.sessionFromStorage()
  return !!session
}

/**
 * Get current user ID if authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id ?? null
}

/**
 * Get auth token for API requests
 */
export async function getAuthToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

/**
 * Wait for authentication
 */
export async function waitForAuth(timeout = 5000): Promise<boolean> {
  const startTime = Date.now()
  
  while (Date.now() - startTime < timeout) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      return true
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  
  return false
}

export default {
  isAuthCached,
  getCurrentUserId,
  getAuthToken,
  waitForAuth,
}
```

---

### Step 4: Integrate Auth Provider into App

Update the main app file to wrap with AuthProvider.

**File:** `app/app.tsx`

Ensure the component tree is wrapped correctly:

```typescript
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/theme/context'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from '@/navigators/RootNavigator'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  )
}
```

---

### Step 5: Update Root Navigator to Use Auth State

The RootNavigator (created in Feature 003) should already use the auth context. Verify it imports correctly:

**File:** `app/navigators/RootNavigator.tsx`

```typescript
import { useAuth } from '@/context/AuthContext'

// Use useAuth() to get isAuthenticated and isLoading
```

---

## Mock Data (If Applicable)

Not applicable - this is an auth infrastructure feature.

---

## Integration Points

### Connects To

- **Feature 005** - Uses Supabase client for auth operations
- **Feature 003** - RootNavigator uses auth state
- **Feature 007** - MMKV may be used for additional auth persistence

### Used By

- **Feature 009** - Auth Service
- **Feature 010** - Login Screen
- **Feature 011** - Auth Wiring
- All screens that need auth state

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] App launches without auth errors
- [ ] AuthProvider wraps the app correctly
- [ ] `useAuth()` hook returns correct values
- [ ] isLoading is true during auth check
- [ ] isLoading is false after auth check completes
- [ ] isAuthenticated is false when not logged in
- [ ] Auth state listener is set up correctly
- [ ] No memory leaks (subscription cleaned up on unmount)

---

## Notes

- The auth context uses Supabase's onAuthStateChange for real-time updates
- Session persistence is handled by Supabase SDK
- The `isLoading` state prevents showing wrong screens during auth check
- Consider adding auth state persistence across app updates in a future iteration

---

## References

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [React Context API](https://react.dev/reference/react/useContext)
- [OAuth 2.0 PKCE Flow](https://supabase.com/docs/guides/auth/auth-pkce-flow)
- [Google OAuth with Supabase](https://supabase.com/docs/guides/auth/social-login/auth-google)
