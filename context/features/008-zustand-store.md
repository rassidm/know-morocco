# Feature: Zustand Store Setup

## Metadata

- **Feature ID:** 008
- **Phase:** 1 - Foundation Setup
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 001 (Project Configuration), 007 (Storage Layer)

---

## Goals

Set up Zustand for global state management. This feature provides a lightweight, centralized store for app-wide state like language preference, sync status, card view state, and other shared data.

### Acceptance Criteria

- [ ] Zustand installed
- [ ] Store types defined
- [ ] Main app store created
- [ ] Store persists with MMKV
- [ ] Store hooks exported
- [ ] Store modules organized
- [ ] Actions and selectors typed

---

## Implementation Steps

### Step 1: Install Zustand

```bash
npm install zustand
```

Note: This may already be installed. Verify in package.json.

---

### Step 2: Create Store Types

**File:** `app/store/store.types.ts`
```typescript
import type { LanguageCode } from '@/i18n'

/**
 * App state interface
 */
export interface AppState {
  // Language
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  
  // Theme
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  
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
  type: 'create' | 'update' | 'delete'
  table: string
  data: any
  createdAt: number
  retryCount: number
}

/**
 * Sync queue state
 */
export interface SyncQueueState {
  queue: SyncQueueItem[]
  addToQueue: (item: Omit<SyncQueueItem, 'id' | 'createdAt' | 'retryCount'>) => void
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
```

---

### Step 3: Create Main App Store

**File:** `app/store/appStore.ts`
```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'
import type { AppState } from './store.types'
import { STORAGE_KEYS } from '@/utils/storage'

/**
 * MMKV storage instance for Zustand persistence
 */
const mmkv = new MMKV({ id: 'zustand-storage' })

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
 * Initial state
 */
const initialState: Omit<AppState, keyof Omit<AppState, 'reset'>> = {
  language: 'en',
  theme: 'system',
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
      name: STORAGE_KEYS.LANGUAGE, // Use a generic key
      storage: zustandStorage,
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        onboardingComplete: state.onboardingComplete,
        favoriteCardIds: state.favoriteCardIds,
        locationEnabled: state.locationEnabled,
      }), // Only persist selected fields
    }
  )
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
```

---

### Step 4: Create Sync Queue Store

**File:** `app/store/syncQueueStore.ts`
```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'
import type { SyncQueueState, SyncQueueItem } from './store.types'
import { STORAGE_KEYS } from '@/utils/storage'

/**
 * MMKV storage instance
 */
const mmkv = new MMKV({ id: 'sync-queue-storage' })

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
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Sync Queue Store
 */
export const useSyncQueueStore = create<SyncQueueState>()(
  persist(
    (set, get) => ({
      queue: [],
      
      addToQueue: (item) => {
        const newItem: SyncQueueItem = {
          ...item,
          id: generateId(),
          createdAt: Date.now(),
          retryCount: 0,
        }
        set((state) => ({
          queue: [...state.queue, newItem],
        }))
      },
      
      removeFromQueue: (id) => {
        set((state) => ({
          queue: state.queue.filter((item) => item.id !== id),
        }))
      },
      
      clearQueue: () => {
        set({ queue: [] })
      },
      
      getQueue: () => {
        return get().queue
      },
    }),
    {
      name: STORAGE_KEYS.SYNC_QUEUE,
      storage: zustandStorage,
    }
  )
)

/**
 * Selectors
 */
export const selectQueue = (state: SyncQueueState) => state.queue
export const selectQueueLength = (state: SyncQueueState) => state.queue.length
export const selectHasPendingSync = (state: SyncQueueState) => state.queue.length > 0

export default useSyncQueueStore
```

---

### Step 5: Create Ad Store

**File:** `app/store/adStore.ts`
```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'
import type { AdState } from './store.types'
import { STORAGE_KEYS } from '@/utils/storage'

/**
 * MMKV storage instance
 */
const mmkv = new MMKV({ id: 'ad-storage' })

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
    }
  )
)

export default useAdStore
```

---

### Step 6: Create Store Index File

**File:** `app/store/index.ts`
```typescript
// Store exports
export { useAppStore, selectLanguage, selectTheme, selectOnboardingComplete } from './appStore'
export { useSyncQueueStore, selectQueue, selectHasPendingSync } from './syncQueueStore'
export { useAdStore } from './adStore'

// Types
export type { AppState, SyncQueueState, SyncQueueItem, AdState } from './store.types'
```

---

## Mock Data (If Applicable)

Not applicable - this is a state management infrastructure feature.

---

## Integration Points

### Connects To

- **Feature 007** - Uses MMKV for persistence
- **Feature 004** - Language state syncs with i18n
- **Feature 052** - Ad store controls interstitial display

### Used By

- **Feature 034** - Home Screen Integration
- **Feature 037** - Language Service
- **Feature 056** - Favorites Feature
- All features that need global state

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] useAppStore initializes correctly
- [ ] State updates trigger re-renders
- [ ] Persistence works (state survives app restart)
- [ ] Selectors return correct values
- [ ] Sync queue store adds/removes items
- [ ] Ad store tracks impressions correctly
- [ ] shouldShowInterstitial respects frequency cap

---

## Notes

- Zustand is lighter and simpler than Redux
- MMKV provides fast, synchronous storage
- Only essential state is persisted to avoid storage bloat
- Consider adding middleware for logging in development

---

## References

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)
- [State Management Best Practices](https://react.dev/learn/managing-state)
