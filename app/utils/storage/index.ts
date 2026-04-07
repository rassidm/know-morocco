/**
 * Re-export from the new storage module for backward compatibility.
 * All storage functionality is now provided by ../storage.ts (parent file).
 * This barrel file maintains compatibility with existing imports.
 */

export {
  storage as mmkvInstance,
  STORAGE_KEYS,
  stringStorage,
  numberStorage,
  booleanStorage,
  objectStorage,
  clearAllStorage,
  clearKeys,
  getAllKeys,
  contains,
} from "../storage"

// Re-export the main storage instance as 'storage' for the test file
export { storage } from "../storage"

/**
 * Loads a string from storage (sync).
 * @deprecated Use stringStorage.get() from the main storage module instead.
 */
export function loadString(key: string): string | null {
  const { storage } = require("../storage")
  try {
    return storage.getString(key) ?? null
  } catch {
    return null
  }
}

/**
 * Saves a string to storage (sync).
 * @deprecated Use stringStorage.set() from the main storage module instead.
 */
export function saveString(key: string, value: string): boolean {
  const { storage } = require("../storage")
  try {
    storage.set(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse (sync).
 * @deprecated Use objectStorage.get() from the main storage module instead.
 */
export function load<T>(key: string): T | null {
  let almostThere: string | null = null
  try {
    almostThere = loadString(key)
    return JSON.parse(almostThere ?? "") as T
  } catch {
    return (almostThere as T) ?? null
  }
}

/**
 * Saves an object to storage (sync).
 * @deprecated Use objectStorage.set() from the main storage module instead.
 */
export function save(key: string, value: unknown): boolean {
  try {
    saveString(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 * @deprecated Use stringStorage.remove() or objectStorage.remove() instead.
 */
export function remove(key: string): void {
  const { storage } = require("../storage")
  try {
    storage.delete(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 * @deprecated Use clearAllStorage() instead.
 */
export function clear(): void {
  const { clearAllStorage } = require("../storage")
  clearAllStorage()
}
