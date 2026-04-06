import type { PostgrestError } from "@supabase/supabase-js"

import { supabase } from "./supabase"

/**
 * Standard database operation result
 */
export interface DatabaseResult<T> {
  data: T | null
  error: PostgrestError | null
  success: boolean
}

/**
 * Handle database errors consistently
 */
export function handleDatabaseError(error: PostgrestError | null): void {
  if (error) {
    console.error("Database error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })
  }
}

/**
 * Wrap a database call with error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  errorMessage?: string,
): Promise<DatabaseResult<T>> {
  try {
    const { data, error } = await operation()

    if (error) {
      handleDatabaseError(error)
      return { data: null, error, success: false }
    }

    return { data, error: null, success: true }
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error")
    console.error(errorMessage || "Database operation failed:", error)
    return {
      data: null,
      error: {
        name: "DatabaseError",
        message: error.message,
        details: error.stack || "",
        hint: "",
        code: "UNKNOWN_ERROR",
      },
      success: false,
    }
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await supabase.auth.getSession()
  return !!session.data.session
}

/**
 * Require authentication - throw error if not authenticated
 */
export async function requireAuth(): Promise<string> {
  const session = await supabase.auth.getSession()
  if (!session.data.session) {
    throw new Error("Authentication required")
  }
  return session.data.session.user.id
}

export default {
  handleDatabaseError,
  withErrorHandling,
  isAuthenticated,
  requireAuth,
}
