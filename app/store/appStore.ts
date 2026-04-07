import { MMKV } from "react-native-mmkv"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { LanguageCode } from "@/i18n"
import { STORAGE_KEYS } from "@/utils/storage"

import type { AppState } from "./store.types"

/**
 * MMKV storage instance for Zustand persistence
 */
const mmkv = new MMKV({ id: "zustand-storage" })

/**
 * Zustand storage adapter for MMKV
 */
const zustandStorage = createJSONStorage<any>(() => ({
  getItem: (name) => {
    const value = mmkv.getString(name)
    return value || null
  },
  setItem: (name, value) => {
    mmkv.set(name, value)
  },
  removeItem: (name) => {
    mmkv.delete(name)
  },
}))

/**
 * Initial state (data-only, no actions)
 */
interface InitialState {
  language: LanguageCode
  theme: "light" | "dark" | "system"
  onboardingComplete: boolean
  isSyncing: boolean
  lastSyncAt: number | null
  syncError: string | null
  viewedCardIds: string[]
  favoriteCardIds: string[]
  cardsViewedCount: number
  locationEnabled: boolean
  offlineMode: boolean
}

const initialState: InitialState = {
  language: "en" as LanguageCode,
  theme: "system",
  onboardingComplete: false,
  isSyncing: false,
  lastSyncAt: null,
  syncError: null,
  viewedCardIds: [],
  favoriteCardIds: [],
  cardsViewedCount: 0,
  locationEnabled: true,
  offlineMode: false,
}

/**
 * App Store
 */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Language
      setLanguage: (language) => set({ language }),

      // Theme
      setTheme: (theme) => set({ theme }),

      // Onboarding
      setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),

      // Sync
      setSyncing: (syncing) => set({ isSyncing: syncing }),
      setLastSyncAt: (timestamp) => set({ lastSyncAt: timestamp }),
      setSyncError: (error) => set({ syncError: error }),

      // Cards
      addViewedCard: (cardId) => {
        const viewedCardIds = get().viewedCardIds
        if (!viewedCardIds.includes(cardId)) {
          set({
            viewedCardIds: [...viewedCardIds, cardId],
            cardsViewedCount: get().cardsViewedCount + 1,
          })
        }
      },

      addFavoriteCard: (cardId) => {
        const favoriteCardIds = get().favoriteCardIds
        if (!favoriteCardIds.includes(cardId)) {
          set({ favoriteCardIds: [...favoriteCardIds, cardId] })
        }
      },

      removeFavoriteCard: (cardId) => {
        const favoriteCardIds = get().favoriteCardIds
        set({ favoriteCardIds: favoriteCardIds.filter((id) => id !== cardId) })
      },

      isFavorite: (cardId) => {
        return get().favoriteCardIds.includes(cardId)
      },

      // Location
      setLocationEnabled: (enabled) => set({ locationEnabled: enabled }),

      // Offline
      setOfflineMode: (mode) => set({ offlineMode: mode }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: STORAGE_KEYS.LANGUAGE,
      storage: zustandStorage,
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        onboardingComplete: state.onboardingComplete,
        favoriteCardIds: state.favoriteCardIds,
        locationEnabled: state.locationEnabled,
      }),
    },
  ),
)

/**
 * Selectors for common state access
 */
export const selectLanguage = (state: AppState) => state.language
export const selectTheme = (state: AppState) => state.theme
export const selectOnboardingComplete = (state: AppState) => state.onboardingComplete
export const selectIsSyncing = (state: AppState) => state.isSyncing
export const selectLastSyncAt = (state: AppState) => state.lastSyncAt
export const selectFavoriteCardIds = (state: AppState) => state.favoriteCardIds
export const selectViewedCardIds = (state: AppState) => state.viewedCardIds
export const selectCardsViewedCount = (state: AppState) => state.cardsViewedCount
export const selectLocationEnabled = (state: AppState) => state.locationEnabled
export const selectOfflineMode = (state: AppState) => state.offlineMode

export default useAppStore
