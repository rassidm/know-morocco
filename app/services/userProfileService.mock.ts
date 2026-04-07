import type { ProfileResult, UserProfile, UserProfileUpdate } from "@/types/user"

const MOCK_PROFILE: UserProfile = {
  id: "mock-user-123",
  email: "test@example.com",
  name: "Test User",
  avatar_url: "https://i.pravatar.cc/300",
  preferred_language: "en",
  created_at: new Date().toISOString(),
}

let mockProfile: UserProfile = { ...MOCK_PROFILE }

export const mockUserProfileService = {
  createProfile: async (_userId: string, _email: string): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, profile: mockProfile }
  },

  getProfile: async (_userId: string): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { success: true, profile: mockProfile }
  },

  updateProfile: async (_userId: string, updates: UserProfileUpdate): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    mockProfile = { ...mockProfile, ...updates }
    return { success: true, profile: mockProfile }
  },

  deleteProfile: async (): Promise<ProfileResult> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    mockProfile = { ...MOCK_PROFILE }
    return { success: true }
  },

  getOrCreateProfile: async (_userId: string, _email: string): Promise<ProfileResult> => {
    return mockUserProfileService.getProfile("")
  },
}

export default mockUserProfileService
