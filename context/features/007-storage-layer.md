# Feature: Storage Layer - MMKV Setup

## Metadata

- **Feature ID:** 007
- **Phase:** 1 - Foundation Setup
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 001 (Project Configuration)

---

## Goals

Set up MMKV for fast, persistent key-value storage. This feature provides the foundation for storing user preferences, app settings, and cached data that needs to persist across app restarts.

### Acceptance Criteria

- [ ] MMKV installed and configured
- [ ] Storage wrapper module created
- [ ] useMMKV hook created for React components
- [ ] Typed storage helpers (string, number, boolean, object)
- [ ] Storage keys defined in constants
- [ ] Clear storage function for logout
- [ ] Error handling for storage operations

---

## Implementation Steps

### Step 1: Install MMKV

```bash
npm install react-native-mmkv
```

Note: This may already be installed per the project context.

---

### Step 2: Create Storage Module

**File:** `app/utils/storage.ts`
```typescript
import { MMKV } from 'react-native-mmkv'

/**
 * MMKV storage instance
 */
export const storage = new MMKV({
  id: 'know-morocco-storage',
  encryptionKey: undefined, // Add encryption key if needed for sensitive data
})

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: 'auth.token',
  AUTH_REFRESH_TOKEN: 'auth.refresh_token',
  AUTH_USER_ID: 'auth.user_id',
  
  // Preferences
  THEME_MODE: 'theme.mode',
  LANGUAGE: 'preferences.language',
  ONBOARDING_COMPLETE: 'onboarding.complete',
  
  // App State
  LAST_OPENED: 'app.last_opened',
  APP_VERSION: 'app.version',
  FEATURE_FLAGS: 'app.feature_flags',
  
  // Cache
  KNOWLEDGE_CARDS_CACHE: 'cache.knowledge_cards',
  CATEGORIES_CACHE: 'cache.categories',
  LOCATION_CACHE: 'cache.location',
  
  // Sync
  LAST_SYNC: 'sync.last_sync',
  SYNC_QUEUE: 'sync.queue',
  
  // Ads
  AD_IMPRESSIONS: 'ads.impressions',
  LAST_INTERSTITIAL: 'ads.last_interstitial',
} as const

/**
 * String storage
 */
export const stringStorage = {
  set: (key: string, value: string): void => {
    try {
      storage.set(key, value)
    } catch (error) {
      console.error('Error setting string value:', error)
    }
  },

  get: (key: string): string | undefined => {
    try {
      return storage.getString(key)
    } catch (error) {
      console.error('Error getting string value:', error)
      return undefined
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error('Error removing string value:', error)
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
      console.error('Error setting number value:', error)
    }
  },

  get: (key: string, defaultValue: number = 0): number => {
    try {
      return storage.getNumber(key) ?? defaultValue
    } catch (error) {
      console.error('Error getting number value:', error)
      return defaultValue
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error('Error removing number value:', error)
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
      console.error('Error setting boolean value:', error)
    }
  },

  get: (key: string, defaultValue: boolean = false): boolean => {
    try {
      return storage.getBoolean(key) ?? defaultValue
    } catch (error) {
      console.error('Error getting boolean value:', error)
      return defaultValue
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error('Error removing boolean value:', error)
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
      console.error('Error setting object value:', error)
    }
  },

  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const value = storage.getString(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (error) {
      console.error('Error getting object value:', error)
      return defaultValue
    }
  },

  remove: (key: string): void => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error('Error removing object value:', error)
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
    console.error('Error clearing storage:', error)
  }
}

/**
 * Clear specific keys (useful for partial cleanup)
 */
export function clearKeys(keys: string[]): void {
  try {
    keys.forEach((key) => storage.delete(key))
  } catch (error) {
    console.error('Error clearing keys:', error)
  }
}

/**
 * Get all keys
 */
export function getAllKeys(): string[] {
  try {
    return storage.getAllKeys()
  } catch (error) {
    console.error('Error getting all keys:', error)
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
    console.error('Error checking key existence:', error)
    return false
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
```

---

### Step 3: Create useMMKV Hook

**File:** `app/hooks/useMMKV.ts`
```typescript
import { useState, useCallback, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '@/utils/storage'

/**
 * Hook for reactive MMKV storage
 */
export function useMMKV<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, () => void] {
  // Initialize state
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = storage.getString(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  // Listen for changes
  useEffect(() => {
    const unsubscribe = storage.addOnValueChangedListener((changedKey) => {
      if (changedKey === key) {
        try {
          const stored = storage.getString(key)
          setValue(stored ? JSON.parse(stored) : defaultValue)
        } catch {
          setValue(defaultValue)
        }
      }
    })

    return unsubscribe
  }, [key, defaultValue])

  // Set value
  const setStoredValue = useCallback(
    (newValue: T) => {
      try {
        storage.set(key, JSON.stringify(newValue))
      } catch (error) {
        console.error('Error setting MMKV value:', error)
      }
    },
    [key]
  )

  // Remove value
  const removeValue = useCallback(() => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error('Error removing MMKV value:', error)
    }
  }, [key])

  return [value, setStoredValue, removeValue]
}

/**
 * Hook for string values
 */
export function useMMKVString(
  key: string,
  defaultValue: string = ''
): [string, (value: string) => void, () => void] {
  const [value, setValue] = useState<string>(() => {
    try {
      return storage.getString(key) || defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    const unsubscribe = storage.addOnValueChangedListener((changedKey) => {
      if (changedKey === key) {
        setValue(storage.getString(key) || defaultValue)
      }
    })

    return unsubscribe
  }, [key, defaultValue])

  const setStoredValue = useCallback(
    (newValue: string) => {
      try {
        storage.set(key, newValue)
      } catch (error) {
        console.error('Error setting MMKV string:', error)
      }
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error('Error removing MMKV string:', error)
    }
  }, [key])

  return [value, setStoredValue, removeValue]
}

/**
 * Hook for boolean values
 */
export function useMMKVBoolean(
  key: string,
  defaultValue: boolean = false
): [boolean, (value: boolean) => void, () => void] {
  const [value, setValue] = useState<boolean>(() => {
    try {
      return storage.getBoolean(key) ?? defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    const unsubscribe = storage.addOnValueChangedListener((changedKey) => {
      if (changedKey === key) {
        setValue(storage.getBoolean(key) ?? defaultValue)
      }
    })

    return unsubscribe
  }, [key, defaultValue])

  const setStoredValue = useCallback(
    (newValue: boolean) => {
      try {
        storage.set(key, newValue)
      } catch (error) {
        console.error('Error setting MMKV boolean:', error)
      }
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error('Error removing MMKV boolean:', error)
    }
  }, [key])

  return [value, setStoredValue, removeValue]
}

export default useMMKV
```

---

### Step 4: Create Storage Helper Functions

**File:** `app/utils/storageHelpers.ts`
```typescript
import { objectStorage, stringStorage, numberStorage, booleanStorage } from './storage'

/**
 * App preferences storage helpers
 */
export const preferencesStorage = {
  // Language
  getLanguage: (): string => stringStorage.get('preferences.language', 'en'),
  setLanguage: (language: string): void => stringStorage.set('preferences.language', language),
  
  // Theme
  getTheme: (): string => stringStorage.get('theme.mode', 'light'),
  setTheme: (theme: string): void => stringStorage.set('theme.mode', theme),
  
  // Onboarding
  isOnboardingComplete: (): boolean => booleanStorage.get('onboarding.complete', false),
  setOnboardingComplete: (): void => booleanStorage.set('onboarding.complete', true),
  
  // App version
  getAppVersion: (): string => stringStorage.get('app.version', ''),
  setAppVersion: (version: string): void => stringStorage.set('app.version', version),
}

/**
 * Cache storage helpers
 */
export const cacheStorage = {
  // Knowledge cards
  getKnowledgeCards: <T>(): T | null => objectStorage.get('cache.knowledge_cards', null),
  setKnowledgeCards: <T>(cards: T): void => objectStorage.set('cache.knowledge_cards', cards),
  
  // Categories
  getCategories: <T>(): T | null => objectStorage.get('cache.categories', null),
  setCategories: <T>(categories: T): void => objectStorage.set('cache.categories', categories),
  
  // Clear cache
  clearCache: (): void => {
    objectStorage.remove('cache.knowledge_cards')
    objectStorage.remove('cache.categories')
    objectStorage.remove('cache.location')
  },
}

/**
 * Sync storage helpers
 */
export const syncStorage = {
  getLastSync: (): number => numberStorage.get('sync.last_sync', 0),
  setLastSync: (timestamp: number): void => numberStorage.set('sync.last_sync', timestamp),
  
  getSyncQueue: <T>(): T | null => objectStorage.get('sync.queue', null),
  setSyncQueue: <T>(queue: T): void => objectStorage.set('sync.queue', queue),
}

/**
 * Ad storage helpers
 */
export const adStorage = {
  getImpressions: (): number => numberStorage.get('ads.impressions', 0),
  incrementImpressions: (): void => {
    const current = numberStorage.get('ads.impressions', 0)
    numberStorage.set('ads.impressions', current + 1)
  },
  
  getLastInterstitial: (): number => numberStorage.get('ads.last_interstitial', 0),
  setLastInterstitial: (timestamp: number): void => numberStorage.set('ads.last_interstitial', timestamp),
}

export default {
  preferencesStorage,
  cacheStorage,
  syncStorage,
  adStorage,
}
```

---

## Mock Data (If Applicable)

Not applicable - this is a storage infrastructure feature.

---

## Integration Points

### Connects To

- **Feature 001** - Uses environment configuration
- **Feature 002** - Theme context uses MMKV for persistence
- **Feature 008** - Zustand store may use MMKV for persistence

### Used By

- **Feature 037** - Language Service
- **Feature 054** - Profile Screen
- All features that need persistent storage

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] MMKV initializes without errors
- [ ] String storage works correctly
- [ ] Number storage works correctly
- [ ] Boolean storage works correctly
- [ ] Object storage serializes/deserializes correctly
- [ ] useMMKV hook updates on value changes
- [ ] Clear all storage works
- [ ] Storage keys are defined correctly

---

## Notes

- MMKV is significantly faster than AsyncStorage
- Data is stored in memory-mapped files for performance
- Consider adding encryption for sensitive data
- Storage is synchronous, which is different from AsyncStorage

---

## References

- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [MMKV Documentation](https://github.com/Tencent/MMKV)
- [Storage Best Practices](https://reactnative.dev/docs/storage)
