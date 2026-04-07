import type { ProfileResult, UserProfile, UserProfileUpdate } from "@/types/user"

import { supabase } from "./supabase"

/**
 * Create user profile after first login
 */
export async function createProfile(userId: string, email: string): Promise<ProfileResult> {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: userId,
        email,
        name: email.split("@")[0],
        preferred_language: "en",
      } as never)
      .select()
      .maybeSingle()

    if (error) {
      console.error("Create profile error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data) {
      return {
        success: false,
        error: "No data returned from insert",
      }
    }

    return {
      success: true,
      profile: data as unknown as UserProfile,
    }
  } catch (err) {
    console.error("Create profile failed:", err)
    return {
      success: false,
      error: "Failed to create profile",
    }
  }
}

/**
 * Get user profile by ID
 */
export async function getProfile(userId: string): Promise<ProfileResult> {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).maybeSingle()

    if (error) {
      if (error.code === "PGRST116") {
        // Profile doesn't exist
        return {
          success: false,
          error: "Profile not found",
        }
      }

      console.error("Get profile error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data) {
      return {
        success: false,
        error: "Profile not found",
      }
    }

    return {
      success: true,
      profile: data as unknown as UserProfile,
    }
  } catch (err) {
    console.error("Get profile failed:", err)
    return {
      success: false,
      error: "Failed to fetch profile",
    }
  }
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  updates: UserProfileUpdate,
): Promise<ProfileResult> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatePayload: Record<string, any> = {
      ...updates,
    }

    const { data, error } = await supabase
      .from("users")
      .update(updatePayload as never)
      .eq("id", userId)
      .select()
      .maybeSingle()

    if (error) {
      console.error("Update profile error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data) {
      return {
        success: false,
        error: "No data returned from update",
      }
    }

    return {
      success: true,
      profile: data as unknown as UserProfile,
    }
  } catch (err) {
    console.error("Update profile failed:", err)
    return {
      success: false,
      error: "Failed to update profile",
    }
  }
}

/**
 * Delete user profile
 */
export async function deleteProfile(userId: string): Promise<ProfileResult> {
  try {
    const { error } = await supabase.from("users").delete().eq("id", userId)

    if (error) {
      console.error("Delete profile error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
    }
  } catch (err) {
    console.error("Delete profile failed:", err)
    return {
      success: false,
      error: "Failed to delete profile",
    }
  }
}

/**
 * Get or create profile (auto-create on first login)
 */
export async function getOrCreateProfile(userId: string, email: string): Promise<ProfileResult> {
  const result = await getProfile(userId)

  if (!result.success && result.error === "Profile not found") {
    return createProfile(userId, email)
  }

  return result
}

export default {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getOrCreateProfile,
}
