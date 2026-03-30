# Feature: Auth Service - Google OAuth Integration

## Metadata

- **Feature ID:** 009
- **Phase:** 2 - Authentication & User Management
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 005 (Supabase Client), 006 (Auth Context)

---

## Goals

Create the authentication service that handles Google OAuth sign-in, sign-out, and session management with Supabase Auth. This feature provides the backend logic that the Login screen will use.

### Acceptance Criteria

- [ ] Google OAuth provider configured in Supabase
- [ ] signInWithGoogle function implemented
- [ ] signOut function implemented
- [ ] Session refresh function implemented
- [ ] Auth error handling
- [ ] Deep linking configured for OAuth callback
- [ ] Auth service tested with mock flow

---

## Implementation Steps

### Step 1: Configure Google OAuth in Supabase

**Action:** Configure Google OAuth in your Supabase project:

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add Google OAuth credentials:
   - **Client ID:** From Google Cloud Console
   - **Client Secret:** From Google Cloud Console
4. Add authorized redirect URLs:
   - `knowmorocco://callback` (for deep linking)
   - For development: `http://localhost:19006` (Expo)

**Google Cloud Console Setup:**
1. Create a new project or select existing
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`

---

### Step 2: Create Auth Service Module

**File:** `app/services/authService.ts`
```typescript
import { supabase } from './supabase'
import type { User, Session, AuthError } from '@supabase/supabase-js'
import { ENV } from '@/config/env'

/**
 * Auth service result types
 */
export interface AuthResult {
  success: boolean
  user?: User | null
  session?: Session | null
  error?: string
}

export interface SignInResult {
  success: boolean
  error?: string
  url?: string
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<SignInResult> {
  try {
    console.log('Starting Google OAuth sign-in...')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Deep link for mobile app
        redirectTo: ENV.isDev 
          ? 'http://localhost:19006' 
          : 'knowmorocco://callback',
        
        // Request offline access for refresh token
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        
        // Skip opening URL automatically (we'll handle it)
        skipBrowserRedirect: false,
      },
    })

    if (error) {
      console.error('Google OAuth error:', error)
      return {
        success: false,
        error: error.message,
      }
    }

    console.log('OAuth URL:', data.url)
    
    return {
      success: true,
      url: data.url,
    }
  } catch (err) {
    const error = err as AuthError
    console.error('Sign in failed:', error)
    return {
      success: false,
      error: error.message || 'Failed to sign in with Google',
    }
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<AuthResult> {
  try {
    console.log('Signing out...')

    const { error } = await supabase.auth.signOut({
      scope: 'global', // Sign out from all sessions
    })

    if (error) {
      console.error('Sign out error:', error)
      return {
        success: false,
        error: error.message,
      }
    }

    console.log('Sign out successful')
    
    return {
      success: true,
      user: null,
      session: null,
    }
  } catch (err) {
    const error = err as AuthError
    console.error('Sign out failed:', error)
    return {
      success: false,
      error: error.message || 'Failed to sign out',
    }
  }
}

/**
 * Get current session
 */
export async function getSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Get session error:', error)
      return null
    }
    
    return session
  } catch (err) {
    console.error('Get session failed:', err)
    return null
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Get user error:', error)
      return null
    }
    
    return user
  } catch (err) {
    console.error('Get user failed:', err)
    return null
  }
}

/**
 * Refresh session
 */
export async function refreshSession(): Promise<AuthResult> {
  try {
    const session = await getSession()
    const user = await getCurrentUser()

    if (!session || !user) {
      return {
        success: false,
        error: 'No active session',
      }
    }

    return {
      success: true,
      user,
      session,
    }
  } catch (err) {
    const error = err as AuthError
    console.error('Session refresh failed:', error)
    return {
      success: false,
      error: error.message || 'Failed to refresh session',
    }
  }
}

/**
 * Handle OAuth callback (for deep linking)
 */
export async function handleOAuthCallback(url: string): Promise<AuthResult> {
  try {
    console.log('Handling OAuth callback:', url)

    // Extract hash from URL
    const hash = url.split('#')[1]
    if (!hash) {
      return {
        success: false,
        error: 'No hash in callback URL',
      }
    }

    // Parse hash parameters
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken) {
      return {
        success: false,
        error: 'No access token in callback',
      }
    }

    // Set session from URL
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Callback session error:', error)
      return {
        success: false,
        error: error.message,
      }
    }

    const user = await getCurrentUser()

    return {
      success: true,
      user,
      session: session || undefined,
    }
  } catch (err) {
    const error = err as AuthError
    console.error('OAuth callback failed:', error)
    return {
      success: false,
      error: error.message || 'Failed to handle callback',
    }
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}

/**
 * Wait for authentication (polling)
 */
export async function waitForAuth(timeout = 10000): Promise<boolean> {
  const startTime = Date.now()
  
  while (Date.now() - startTime < timeout) {
    const authenticated = await isAuthenticated()
    if (authenticated) {
      return true
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  
  return false
}

export default {
  signInWithGoogle,
  signOut,
  getSession,
  getCurrentUser,
  refreshSession,
  handleOAuthCallback,
  isAuthenticated,
  waitForAuth,
}
```

---

### Step 3: Configure Deep Linking for OAuth

**File:** `app.config.ts`

Ensure deep linking is configured:

```typescript
export default {
  expo: {
    scheme: 'knowmorocco',
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'knowmorocco',
            host: 'callback',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
    // ... rest of config
  },
}
```

---

### Step 4: Create Auth Linking Configuration

**File:** `app/services/authLinking.ts`
```typescript
import * as Linking from 'expo-linking'
import { handleOAuthCallback } from './authService'

/**
 * Auth linking prefix
 */
export const authPrefix = 'knowmorocco://callback'

/**
 * Subscribe to auth deep links
 */
export function subscribeToAuthLinks(
  callback: (url: string) => void
): () => void {
  const handleUrl = async ({ url }: { url: string }) => {
    if (url.startsWith(authPrefix)) {
      console.log('Auth deep link received:', url)
      callback(url)
    }
  }

  // Subscribe to linking events
  const subscription = Linking.addEventListener('url', handleUrl)

  // Check for initial URL (app opened from cold start)
  Linking.getInitialURL().then((url) => {
    if (url && url.startsWith(authPrefix)) {
      console.log('Initial auth URL:', url)
      callback(url)
    }
  })

  return () => {
    subscription.remove()
  }
}

/**
 * Open auth URL
 */
export async function openAuthUrl(url: string): Promise<void> {
  try {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      console.error('Cannot open URL:', url)
      // Fallback: copy to clipboard
      await Linking.openURL(`https://copy-to-clipboard.com/${url}`)
    }
  } catch (error) {
    console.error('Error opening auth URL:', error)
  }
}

export default {
  authPrefix,
  subscribeToAuthLinks,
  openAuthUrl,
}
```

---

### Step 5: Create Mock Auth Service (for Development)

**File:** `app/services/authService.mock.ts`
```typescript
import type { AuthResult, SignInResult } from './authService'

/**
 * Mock user for development
 */
const MOCK_USER = {
  id: 'mock-user-id',
  email: 'test@example.com',
  name: 'Test User',
  avatar_url: 'https://i.pravatar.cc/300',
  created_at: new Date().toISOString(),
}

/**
 * Mock auth service for development/testing
 */
export const mockAuthService = {
  /**
   * Mock sign in
   */
  signInWithGoogle: async (): Promise<SignInResult> => {
    console.log('[MOCK] Signing in with Google...')
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    return {
      success: true,
    }
  },

  /**
   * Mock sign out
   */
  signOut: async (): Promise<AuthResult> => {
    console.log('[MOCK] Signing out...')
    
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    return {
      success: true,
      user: null,
      session: null,
    }
  },

  /**
   * Mock get session
   */
  getSession: async () => {
    console.log('[MOCK] Getting session...')
    return null
  },

  /**
   * Mock get current user
   */
  getCurrentUser: async () => {
    console.log('[MOCK] Getting user...')
    return null
  },

  /**
   * Mock refresh session
   */
  refreshSession: async (): Promise<AuthResult> => {
    console.log('[MOCK] Refreshing session...')
    return {
      success: false,
      error: 'No session',
    }
  },

  /**
   * Mock handle OAuth callback
   */
  handleOAuthCallback: async (): Promise<AuthResult> => {
    console.log('[MOCK] Handling OAuth callback...')
    return {
      success: true,
      user: MOCK_USER as any,
      session: {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh',
        user: MOCK_USER,
      } as any,
    }
  },

  /**
   * Mock isAuthenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    return false
  },

  /**
   * Mock waitForAuth
   */
  waitForAuth: async (): Promise<boolean> => {
    return false
  },
}

export default mockAuthService
```

---

## Mock Data (If Applicable)

See `authService.mock.ts` for mock auth service implementation.

---

## Integration Points

### Connects To

- **Feature 005** - Uses Supabase client
- **Feature 006** - Auth context will use this service
- **Feature 010** - Login screen will call sign-in functions

### Used By

- **Feature 010** - Login Screen
- **Feature 011** - Auth Wiring
- **Feature 012** - User Profile Service

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] signInWithGoogle returns success result
- [ ] signOut clears session
- [ ] getSession returns null when not authenticated
- [ ] getCurrentUser returns null when not authenticated
- [ ] Deep linking subscription works
- [ ] Mock auth service can be used for development
- [ ] Error handling works for network failures

---

## Notes

- Google OAuth must be configured in Supabase dashboard before testing
- Deep linking requires proper URL scheme configuration
- Use mock auth service during initial development
- Consider adding additional OAuth providers (Facebook, Apple) in the future

---

## References

- [Supabase Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Expo Linking](https://docs.expo.dev/versions/latest/sdk/linking/)
- [OAuth 2.0 PKCE Flow](https://supabase.com/docs/guides/auth/auth-pkce-flow)
- [Deep Linking Best Practices](https://developer.android.com/training/app-links/deep-linking)
