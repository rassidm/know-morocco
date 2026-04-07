import { MMKV } from "react-native-mmkv"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import { STORAGE_KEYS } from "@/utils/storage"

import type { SyncQueueState, SyncQueueItem } from "./store.types"

/**
 * MMKV storage instance
 */
const mmkv = new MMKV({ id: "sync-queue-storage" })

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
    },
  ),
)

/**
 * Selectors
 */
export const selectQueue = (state: SyncQueueState) => state.queue
export const selectQueueLength = (state: SyncQueueState) => state.queue.length
export const selectHasPendingSync = (state: SyncQueueState) => state.queue.length > 0

export default useSyncQueueStore
