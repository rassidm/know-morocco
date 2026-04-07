import type { User, Session } from "@supabase/supabase-js"

import type { UserProfile } from "@/types/user"

/**
 * Authentication context value interface
 */
export interface AuthContextValue {
  /** Current authenticated user */
  user: User | null
  /** Current session */
  session: Session | null
  /** Current user profile */
  profile: UserProfile | null
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
