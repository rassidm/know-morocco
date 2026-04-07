import { useState, useCallback, useEffect } from "react"

import { storage } from "@/utils/storage"

/**
 * Hook for reactive MMKV storage
 */
export function useMMKV<T>(key: string, defaultValue: T): [T, (value: T) => void, () => void] {
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
    const listener = storage.addOnValueChangedListener((changedKey) => {
      if (changedKey === key) {
        try {
          const stored = storage.getString(key)
          setValue(stored ? JSON.parse(stored) : defaultValue)
        } catch {
          setValue(defaultValue)
        }
      }
    })

    return () => listener.remove()
  }, [key, defaultValue])

  // Set value
  const setStoredValue = useCallback(
    (newValue: T) => {
      try {
        storage.set(key, JSON.stringify(newValue))
      } catch (error) {
        console.error("Error setting MMKV value:", error)
      }
    },
    [key],
  )

  // Remove value
  const removeValue = useCallback(() => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error("Error removing MMKV value:", error)
    }
  }, [key])

  return [value, setStoredValue, removeValue]
}

/**
 * Hook for string values
 */
export function useMMKVString(
  key: string,
  defaultValue: string = "",
): [string, (value: string) => void, () => void] {
  const [value, setValue] = useState<string>(() => {
    try {
      return storage.getString(key) || defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((changedKey) => {
      if (changedKey === key) {
        setValue(storage.getString(key) || defaultValue)
      }
    })

    return () => listener.remove()
  }, [key, defaultValue])

  const setStoredValue = useCallback(
    (newValue: string) => {
      try {
        storage.set(key, newValue)
      } catch (error) {
        console.error("Error setting MMKV string:", error)
      }
    },
    [key],
  )

  const removeValue = useCallback(() => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error("Error removing MMKV string:", error)
    }
  }, [key])

  return [value, setStoredValue, removeValue]
}

/**
 * Hook for boolean values
 */
export function useMMKVBoolean(
  key: string,
  defaultValue: boolean = false,
): [boolean, (value: boolean) => void, () => void] {
  const [value, setValue] = useState<boolean>(() => {
    try {
      return storage.getBoolean(key) ?? defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((changedKey) => {
      if (changedKey === key) {
        setValue(storage.getBoolean(key) ?? defaultValue)
      }
    })

    return () => listener.remove()
  }, [key, defaultValue])

  const setStoredValue = useCallback(
    (newValue: boolean) => {
      try {
        storage.set(key, newValue)
      } catch (error) {
        console.error("Error setting MMKV boolean:", error)
      }
    },
    [key],
  )

  const removeValue = useCallback(() => {
    try {
      storage.delete(key)
    } catch (error) {
      console.error("Error removing MMKV boolean:", error)
    }
  }, [key])

  return [value, setStoredValue, removeValue]
}

export default useMMKV
