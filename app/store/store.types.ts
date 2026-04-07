import type { LanguageCode } from "@/i18n"

/**
 * App state interface
 */
export interface AppState {
  // Language
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void

  // Theme
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void

  // Onboarding
  onboardingComplete: boolean
  setOnboardingComplete: (complete: boolean) => void

  // Sync
  isSyncing: boolean
  lastSyncAt: number | null
  syncError: string | null
  setSyncing: (syncing: boolean) => void
  setLastSyncAt: (timestamp: number | null) => void
  setSyncError: (error: string | null) => void

  // Cards
  viewedCardIds: string[]
  favoriteCardIds: string[]
  cardsViewedCount: number
  addViewedCard: (cardId: string) => void
  addFavoriteCard: (cardId: string) => void
  removeFavoriteCard: (cardId: string) => void
  isFavorite: (cardId: string) => boolean

  // Location
  locationEnabled: boolean
  setLocationEnabled: (enabled: boolean) => void

  // Offline
  offlineMode: boolean
  setOfflineMode: (mode: boolean) => void

  // Reset
  reset: () => void
}

/**
 * Sync queue item
 */
export interface SyncQueueItem {
  id: string
  type: "create" | "update" | "delete"
  table: string
  data: unknown
  createdAt: number
  retryCount: number
}

/**
 * Sync queue state
 */
export interface SyncQueueState {
  queue: SyncQueueItem[]
  addToQueue: (item: Omit<SyncQueueItem, "id" | "createdAt" | "retryCount">) => void
  removeFromQueue: (id: string) => void
  clearQueue: () => void
  getQueue: () => SyncQueueItem[]
}

/**
 * Ad state
 */
export interface AdState {
  impressionsCount: number
  lastInterstitialAt: number | null
  incrementImpression: () => void
  setLastInterstitial: (timestamp: number | null) => void
  shouldShowInterstitial: () => boolean
}
