import { createClient, SupabaseClient } from "@supabase/supabase-js"

import { ENV } from "@/config/env"

import type { Database } from "../../types/database.types"

/**
 * Supabase client instance
 * This is a singleton - only one instance should exist
 */
let supabaseInstance: SupabaseClient<Database> | null = null

/**
 * Get or create Supabase client instance
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(ENV.supabaseUrl, ENV.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
      db: {
        schema: "public",
      },
    })
  }
  return supabaseInstance
}

/**
 * Export the client instance directly for convenience
 */
export const supabase = getSupabaseClient()

/**
 * Get the current session
 */
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) {
    console.error("Error getting session:", error)
    return null
  }
  return session
}

/**
 * Get the current user
 */
export async function getUser() {
  try {
    const session = await getSession()
    if (!session) {
      return null
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.error("Error getting user:", error)
      return null
    }
    return user
  } catch (err) {
    // AuthSessionMissingError is expected when no session exists
    console.warn("No active session:", err)
    return null
  }
}

/**
 * Get access token for API calls
 */
export async function getAccessToken() {
  const session = await getSession()
  return session?.access_token ?? null
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Error signing out:", error)
    return false
  }
  return true
}

export default supabase
