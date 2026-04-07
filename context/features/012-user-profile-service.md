# Feature: User Profile Service - CRUD Operations

## Metadata

- **Feature ID:** 012
- **Phase:** 2 - Authentication & User Management
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 005 (Supabase Client), 006 (Auth Context), 009 (Auth Service)

---

## Goals

Create the user profile service that manages user profile data in Supabase. This feature handles creating, reading, updating, and deleting user profiles after authentication, including preferences like language selection and theme.

### Acceptance Criteria

- [ ] UserProfile type defined with all fields
- [ ] createProfile function creates user record in Supabase
- [ ] getProfile function fetches user profile
- [ ] updateProfile function updates user preferences
- [ ] deleteProfile function removes user data
- [ ] Profile auto-created on first login
- [ ] Error handling for all operations
- [ ] Profile service tested with mock data

---

## Implementation Steps

### Step 1: Define UserProfile Type

**File:** `app/types/user.ts`

```typescript
import type { User as SupabaseUser } from "@supabase/supabase-js"

/**
 * User profile stored in Supabase
 */
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar_url: string | null
  preferred_language: "en" | "fr" | "es"
  created_at: string
  updated_at: string
}

/**
 * User profile update payload
 */
export interface UserProfileUpdate {
  name?: string
  avatar_url?: string | null
  preferred_language?: "en" | "fr" | "es"
}

/**
 * Profile service result
 */
export interface ProfileResult {
  success: boolean
  profile?: UserProfile
  error?: string
}
```

---

### Step 2: Create User Profile Service

**File:** `app/services/userProfileService.ts`

```typescript
import { supabase } from "./supabase"
import type { UserProfile, UserProfileUpdate, ProfileResult } from "@/types/user"

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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Create profile error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      profile: data as UserProfile,
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
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()

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

    return {
      success: true,
      profile: data as UserProfile,
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
  updates: UserProfileUpdate
): Promise<ProfileResult> {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Update profile error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      profile: data as UserProfile,
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
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId)

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
export async function getOrCreateProfile(
  userId: string,
  email: string
): Promise<ProfileResult> {
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
```

---

### Step 3: Create Mock User Profile Service

**File:** `app/services/userProfileService.mock.ts`

```typescript
import type { UserProfile, ProfileResult, UserProfileUpdate } from "@/types/user"

const MOCK_PROFILE: UserProfile = {
  id: "mock-user-123",
  email: "test@example.com",
  name: "Test User",
  avatar_url: "https://i.pravatar.cc/300",
  preferred_language: "en",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

let mockProfile = { ...MOCK_PROFILE }

export const mockUserProfileService = {
  createProfile: async (): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, profile: mockProfile }
  },

  getProfile: async (): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { success: true, profile: mockProfile }
  },

  updateProfile: async (userId: string, updates: UserProfileUpdate): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    mockProfile = { ...mockProfile, ...updates }
    return { success: true, profile: mockProfile }
  },

  deleteProfile: async (): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    mockProfile = { ...MOCK_PROFILE }
    return { success: true }
  },

  getOrCreateProfile: async (): Promise<ProfileResult> => {
    return mockUserProfileService.getProfile()
  },
}

export default mockUserProfileService
```

---

### Step 4: Integrate with Auth Context

**File:** `app/context/AuthContext.tsx`

Update the auth context to auto-create profile on first login:

```typescript
import { getOrCreateProfile } from "@/services/userProfileService"
import type { UserProfile } from "@/types/user"

// Add to AuthContext state:
profile: UserProfile | null

// In the auth state listener, after user is authenticated:
if (user) {
  const profileResult = await getOrCreateProfile(user.id, user.email || "")
  if (profileResult.success) {
    setProfile(profileResult.profile)
  }
}
```

---

## Mock Data

```typescript
// Mock user profile
export const MOCK_USER_PROFILE = {
  id: "mock-user-123",
  email: "test@example.com",
  name: "Test User",
  avatar_url: "https://i.pravatar.cc/300",
  preferred_language: "en",
  created_at: "2026-04-07T10:00:00.000Z",
  updated_at: "2026-04-07T10:00:00.000Z",
}
```

---

## Integration Points

### Connects To

- **Feature 005** - Uses Supabase client
- **Feature 006** - AuthContext will use getOrCreateProfile
- **Feature 009** - Called after successful authentication

### Used By

- **Feature 010** - Login Screen (profile creation after login)
- **Feature 037** - Language Service (uses preferred_language)
- **Feature 054** - Profile Screen (displays and edits profile)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] createProfile creates user in Supabase
- [ ] getProfile fetches existing user
- [ ] getProfile returns "not found" for new user
- [ ] updateProfile changes user preferences
- [ ] deleteProfile removes user record
- [ ] getOrCreateProfile auto-creates on first call
- [ ] Mock service returns consistent data
- [ ] Error handling works for network failures

---

## Notes

- Profile should be auto-created on first login to avoid empty states
- Language preference will be used by Feature 037 (Language Service)
- Consider adding profile caching for offline access
- RLS policies should allow users to read/update their own profile only

---

## References

- [Supabase Database Documentation](https://supabase.com/docs/guides/database)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Feature 009 - Auth Service](./009-auth-service.md)
- [Feature 010 - Login Screen](./010-login-screen.md)
