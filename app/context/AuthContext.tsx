import { useCallback, useContext, useEffect, useState } from "react"
import { createContext } from "react"
import type { AuthError } from "@supabase/supabase-js"

import { getSession, getUser, signOut as supabaseSignOut, supabase } from "@/services/supabase"

import type { AuthContextValue, AuthProviderProps } from "./AuthContext.types"

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
  const [authState, setAuthState] =
    useState<Omit<AuthContextValue, "signIn" | "signOut" | "refreshSession">>(INITIAL_AUTH_STATE)

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
        console.error("Error initializing auth:", error)
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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event)

      if (isMounted) {
        switch (_event) {
          case "SIGNED_IN":
            setAuthState((prev) => ({
              ...prev,
              session: session || null,
              user: session?.user || null,
              isAuthenticated: true,
              isLoading: false,
            }))
            break

          case "SIGNED_OUT":
            setAuthState({
              ...INITIAL_AUTH_STATE,
              isLoading: false,
            })
            break

          case "TOKEN_REFRESHED":
            setAuthState((prev) => ({
              ...prev,
              session: session || null,
            }))
            break

          case "USER_UPDATED":
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
    })

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
      const { data: _data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "knowmorocco://callback",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        console.error("Sign in error:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      return { success: true }
    } catch (err) {
      const error = err as AuthError
      console.error("Sign in failed:", error)
      return {
        success: false,
        error: error.message || "Failed to sign in",
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
      console.error("Sign out error:", error)
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
      console.error("Session refresh error:", error)
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
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthProvider
