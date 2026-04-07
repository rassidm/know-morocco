import { objectStorage, stringStorage, numberStorage, booleanStorage } from "./storage"

/**
 * App preferences storage helpers
 */
export const preferencesStorage = {
  // Language
  getLanguage: (): string => stringStorage.get("preferences.language", "en"),
  setLanguage: (language: string): void => stringStorage.set("preferences.language", language),

  // Theme
  getTheme: (): string => stringStorage.get("theme.mode", "light"),
  setTheme: (theme: string): void => stringStorage.set("theme.mode", theme),

  // Onboarding
  isOnboardingComplete: (): boolean => booleanStorage.get("onboarding.complete", false),
  setOnboardingComplete: (): void => booleanStorage.set("onboarding.complete", true),

  // App version
  getAppVersion: (): string => stringStorage.get("app.version", ""),
  setAppVersion: (version: string): void => stringStorage.set("app.version", version),
}

/**
 * Cache storage helpers
 */
export const cacheStorage = {
  // Knowledge cards
  getKnowledgeCards: <T>(): T | null => objectStorage.get("cache.knowledge_cards", null),
  setKnowledgeCards: <T>(cards: T): void => objectStorage.set("cache.knowledge_cards", cards),

  // Categories
  getCategories: <T>(): T | null => objectStorage.get("cache.categories", null),
  setCategories: <T>(categories: T): void => objectStorage.set("cache.categories", categories),

  // Clear cache
  clearCache: (): void => {
    objectStorage.remove("cache.knowledge_cards")
    objectStorage.remove("cache.categories")
    objectStorage.remove("cache.location")
  },
}

/**
 * Sync storage helpers
 */
export const syncStorage = {
  getLastSync: (): number => numberStorage.get("sync.last_sync", 0),
  setLastSync: (timestamp: number): void => numberStorage.set("sync.last_sync", timestamp),

  getSyncQueue: <T>(): T | null => objectStorage.get("sync.queue", null),
  setSyncQueue: <T>(queue: T): void => objectStorage.set("sync.queue", queue),
}

/**
 * Ad storage helpers
 */
export const adStorage = {
  getImpressions: (): number => numberStorage.get("ads.impressions", 0),
  incrementImpressions: (): void => {
    const current = numberStorage.get("ads.impressions", 0)
    numberStorage.set("ads.impressions", current + 1)
  },

  getLastInterstitial: (): number => numberStorage.get("ads.last_interstitial", 0),
  setLastInterstitial: (timestamp: number): void =>
    numberStorage.set("ads.last_interstitial", timestamp),
}

export default {
  preferencesStorage,
  cacheStorage,
  syncStorage,
  adStorage,
}
