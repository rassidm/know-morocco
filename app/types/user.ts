/**
 * User profile types for Supabase users table
 */

/**
 * User profile stored in Supabase
 */
export interface UserProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  preferred_language: "en" | "fr" | "es" | null
  created_at: string
}

/**
 * User profile update payload
 */
export interface UserProfileUpdate {
  name?: string | null
  avatar_url?: string | null
  preferred_language?: "en" | "fr" | "es" | null
}

/**
 * Profile service result
 */
export interface ProfileResult {
  success: boolean
  profile?: UserProfile
  error?: string
}
