import { createClient } from "@supabase/supabase-js"

import { ENV } from "./env"
import type { Database } from "../../types/database.types"

/**
 * Supabase client instance
 */
export const supabase = createClient<Database>(ENV.supabaseUrl, ENV.supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

/**
 * Get the current user's access token
 */
export async function getAccessToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export default supabase
