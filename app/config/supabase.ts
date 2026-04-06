/**
 * Supabase Configuration
 *
 * This module re-exports from the services layer to maintain
 * backward compatibility. The actual Supabase client implementation
 * lives in `app/services/supabase.ts`.
 *
 * For new code, prefer importing from `@/services/supabase` directly.
 */

export {
  supabase,
  getSupabaseClient,
  getSession,
  getUser,
  getAccessToken,
  signOut,
} from "@/services/supabase"
