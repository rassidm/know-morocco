import { MMKV } from "react-native-mmkv"

/**
 * MMKV storage instance
 */
export const storage = new MMKV({
  id: "know-morocco-storage",
  encryptionKey: undefined, // Add encryption key if needed for sensitive data
})

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: "auth.token",
  AUTH_REFRESH_TOKEN: "auth.refresh_token",
  AUTH_USER_ID: "auth.user_id",

  // Preferences
  THEME_MODE: "theme.mode",
  LANGUAGE: "preferences.language",
  ONBOARDING_COMPLETE: "onboarding.complete",

  // App State
  LAST_OPENED: "app.last_opened",
  APP_VERSION: "app.version",
  FEATURE_FLAGS: "app.feature_flags",

  // Cache
  KNOWLEDGE_CARDS_CACHE: "cache.knowledge_cards",
  CATEGORIES_CACHE: "cache.categories",
  LOCATION_CACHE: "cache.location",

  // Sync
  LAST_SYNC: "sync.last_sync",
  SYNC_QUEUE: "sync.queue",

  // Ads
  AD_IMPRESSIONS: "ads.impressions",
  LAST_INTERSTITIAL: "ads.last_interstitial",
} as const

/**
 * String storage
 */
export const stringStorage = {
  set: (key: string, value: string): void => {
    try {
      storage.set(key, value)
    } catch (error) {
      console.error("Error setting string value:", error)
    }
  },

  get: (key: string, defaultValue: string = ""): string => {
    try {
      return storage.getString(key) ?? defaultValue
    } catch (error) {
      console.error("Error getting string value:", error)
      return defaultValue
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error("Error removing string value:", error)
    }
  },
}

/**
 * Number storage
 */
export const numberStorage = {
  set: (key: string, value: number): void => {
    try {
      storage.set(key, value)
    } catch (error) {
      console.error("Error setting number value:", error)
    }
  },

  get: (key: string, defaultValue: number = 0): number => {
    try {
      return storage.getNumber(key) ?? defaultValue
    } catch (error) {
      console.error("Error getting number value:", error)
      return defaultValue
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error("Error removing number value:", error)
    }
  },
}

/**
 * Boolean storage
 */
export const booleanStorage = {
  set: (key: string, value: boolean): void => {
    try {
      storage.set(key, value)
    } catch (error) {
      console.error("Error setting boolean value:", error)
    }
  },

  get: (key: string, defaultValue: boolean = false): boolean => {
    try {
      return storage.getBoolean(key) ?? defaultValue
    } catch (error) {
      console.error("Error getting boolean value:", error)
      return defaultValue
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error("Error removing boolean value:", error)
    }
  },
}

/**
 * Object storage (JSON serialization)
 */
export const objectStorage = {
  set: <T>(key: string, value: T): void => {
    try {
      storage.set(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error setting object value:", error)
    }
  },

  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const value = storage.getString(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (error) {
      console.error("Error getting object value:", error)
      return defaultValue
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error("Error removing object value:", error)
    }
  },
}

/**
 * Clear all storage (useful for logout)
 */
export function clearAllStorage(): void {
  try {
    storage.clearAll()
  } catch (error) {
    console.error("Error clearing storage:", error)
  }
}

/**
 * Clear specific keys (useful for partial cleanup)
 */
export function clearKeys(keys: string[]): void {
  try {
    keys.forEach((key) => storage.delete(key))
  } catch (error) {
    console.error("Error clearing keys:", error)
  }
}

/**
 * Get all keys
 */
export function getAllKeys(): string[] {
  try {
    return storage.getAllKeys()
  } catch (error) {
    console.error("Error getting all keys:", error)
    return []
  }
}

/**
 * Check if key exists
 */
export function contains(key: string): boolean {
  try {
    return storage.contains(key)
  } catch (error) {
    console.error("Error checking key existence:", error)
    return false
  }
}

/**
 * Save navigation state (for navigation persistence)
 */
export async function save(key: string, value: unknown): Promise<void> {
  try {
    storage.set(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error saving value:", error)
  }
}

/**
 * Load navigation state (for navigation persistence)
 */
export async function load(key: string): Promise<unknown | null> {
  try {
    const value = storage.getString(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.error("Error loading value:", error)
    return null
  }
}

export default {
  storage,
  STORAGE_KEYS,
  stringStorage,
  numberStorage,
  booleanStorage,
  objectStorage,
  clearAllStorage,
  clearKeys,
  getAllKeys,
  contains,
}
