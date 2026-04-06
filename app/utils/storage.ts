import { MMKV } from "react-native-mmkv"

/**
 * MMKV storage instance for app-wide storage
 */
export const storage = new MMKV()

/**
 * Save a value to storage
 * @param key - The key to store the value under
 * @param value - The value to store (will be JSON stringified if not a string)
 */
export function save(key: string, value: unknown) {
  try {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value)
    storage.set(key, stringValue)
  } catch (error) {
    console.error(`Failed to save storage key: ${key}`, error)
  }
}

/**
 * Load a value from storage
 * @param key - The key to load
 * @returns The parsed value, or undefined if not found
 */
export function load<T>(key: string): T | undefined {
  try {
    const value = storage.getString(key)
    return value ? JSON.parse(value) : undefined
  } catch (error) {
    console.error(`Failed to load storage key: ${key}`, error)
    return undefined
  }
}

/**
 * Remove a value from storage
 * @param key - The key to remove
 */
export function remove(key: string) {
  try {
    storage.delete(key)
  } catch (error) {
    console.error(`Failed to remove storage key: ${key}`, error)
  }
}

/**
 * Clear all storage
 */
export function clear() {
  try {
    storage.clearAll()
  } catch (error) {
    console.error("Failed to clear storage", error)
  }
}

export default {
  storage,
  save,
  load,
  remove,
  clear,
}
