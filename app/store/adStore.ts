import { MMKV } from "react-native-mmkv"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import { STORAGE_KEYS } from "@/utils/storage"

import type { AdState } from "./store.types"

/**
 * MMKV storage instance
 */
const mmkv = new MMKV({ id: "ad-storage" })

/**
 * Zustand storage adapter
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
 * Ad Store
 * Tracks ad impressions and controls interstitial frequency
 */
export const useAdStore = create<AdState>()(
  persist(
    (set, get) => ({
      impressionsCount: 0,
      lastInterstitialAt: null,

      incrementImpression: () => {
        set((state) => ({
          impressionsCount: state.impressionsCount + 1,
        }))
      },

      setLastInterstitial: (timestamp) => {
        set({ lastInterstitialAt: timestamp })
      },

      shouldShowInterstitial: () => {
        const { impressionsCount, lastInterstitialAt } = get()

        // Show after every 4 card views
        if (impressionsCount % 4 !== 0) {
          return false
        }

        // Check frequency cap (5 minutes)
        if (lastInterstitialAt) {
          const minutesSinceLast = (Date.now() - lastInterstitialAt) / 1000 / 60
          if (minutesSinceLast < 5) {
            return false
          }
        }

        return true
      },
    }),
    {
      name: STORAGE_KEYS.AD_IMPRESSIONS,
      storage: zustandStorage,
      partialize: (state) => ({
        impressionsCount: state.impressionsCount,
        lastInterstitialAt: state.lastInterstitialAt,
      }),
    },
  ),
)

export default useAdStore
