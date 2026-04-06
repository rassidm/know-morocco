import { supabase } from "@/services/supabase"

/**
 * Check if user is authenticated (synchronous check of cached session)
 * Note: Supabase SDK v2 doesn't expose sessionFromStorage synchronously,
 * so this always returns false. Use isAuthenticated from useAuth instead.
 */
export function isAuthCached(): boolean {
  return false
}

/**
 * Get current user ID if authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user?.id ?? null
}

/**
 * Get auth token for API requests
 */
export async function getAuthToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

/**
 * Wait for authentication
 */
export async function waitForAuth(timeout = 5000): Promise<boolean> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
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
