import type { Session, User } from "@supabase/supabase-js"

import type { AuthResult, SignInResult } from "./authService"

/**
 * Mock user for development
 */
const MOCK_USER: User = {
  id: "mock-user-id",
  email: "test@example.com",
  user_metadata: {
    name: "Test User",
    avatar_url: "https://i.pravatar.cc/300",
  },
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as unknown as User

/**
 * Mock session for development
 */
const MOCK_SESSION: Session = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  user: MOCK_USER,
}

/**
 * Mock auth service for development/testing
 */
export const mockAuthService = {
  /**
   * Mock sign in
   */
  signInWithGoogle: async (): Promise<SignInResult> => {
    console.log("[MOCK] Signing in with Google...")

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
    console.log("[MOCK] Signing out...")

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
  getSession: async (): Promise<Session | null> => {
    console.log("[MOCK] Getting session...")
    return MOCK_SESSION
  },

  /**
   * Mock get current user
   */
  getCurrentUser: async (): Promise<User | null> => {
    console.log("[MOCK] Getting user...")
    return MOCK_USER
  },

  /**
   * Mock refresh session
   */
  refreshSession: async (): Promise<AuthResult> => {
    console.log("[MOCK] Refreshing session...")
    return {
      success: true,
      user: MOCK_USER,
      session: MOCK_SESSION,
    }
  },

  /**
   * Mock handle OAuth callback
   */
  handleOAuthCallback: async (): Promise<AuthResult> => {
    console.log("[MOCK] Handling OAuth callback...")
    return {
      success: true,
      user: MOCK_USER,
      session: MOCK_SESSION,
    }
  },

  /**
   * Mock isAuthenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    return true
  },

  /**
   * Mock waitForAuth
   */
  waitForAuth: async (): Promise<boolean> => {
    return true
  },
}

export default mockAuthService
