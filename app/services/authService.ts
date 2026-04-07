import type { AuthError, Session, User } from "@supabase/supabase-js"

import { supabase } from "./supabase"

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
    console.log("Starting Google OAuth sign-in...")

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Deep link for mobile app
        redirectTo: "knowmorocco://callback",

        // Request offline access for refresh token
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("Google OAuth error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    console.log("OAuth URL:", data.url)

    return {
      success: true,
      url: data.url,
    }
  } catch (err) {
    const error = err as AuthError
    console.error("Sign in failed:", error)
    return {
      success: false,
      error: error.message || "Failed to sign in with Google",
    }
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<AuthResult> {
  try {
    console.log("Signing out...")

    const { error } = await supabase.auth.signOut({
      scope: "global", // Sign out from all sessions
    })

    if (error) {
      console.error("Sign out error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    console.log("Sign out successful")

    return {
      success: true,
      user: null,
      session: null,
    }
  } catch (err) {
    const error = err as AuthError
    console.error("Sign out failed:", error)
    return {
      success: false,
      error: error.message || "Failed to sign out",
    }
  }
}

/**
 * Get current session
 */
export async function getSession(): Promise<Session | null> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Get session error:", error)
      return null
    }

    return session
  } catch (err) {
    console.error("Get session failed:", err)
    return null
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error("Get user error:", error)
      return null
    }

    return user
  } catch (err) {
    console.error("Get user failed:", err)
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
        error: "No active session",
      }
    }

    return {
      success: true,
      user,
      session,
    }
  } catch (err) {
    const error = err as AuthError
    console.error("Session refresh failed:", error)
    return {
      success: false,
      error: error.message || "Failed to refresh session",
    }
  }
}

/**
 * Handle OAuth callback (for deep linking)
 */
export async function handleOAuthCallback(url: string): Promise<AuthResult> {
  try {
    console.log("Handling OAuth callback:", url)

    // Extract hash from URL
    const hash = url.split("#")[1]
    if (!hash) {
      return {
        success: false,
        error: "No hash in callback URL",
      }
    }

    // Parse hash parameters
    const params = new URLSearchParams(hash)
    const accessToken = params.get("access_token")

    if (!accessToken) {
      return {
        success: false,
        error: "No access token in callback",
      }
    }

    // Get session after OAuth redirect
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Callback session error:", error)
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
    console.error("OAuth callback failed:", error)
    return {
      success: false,
      error: error.message || "Failed to handle callback",
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
