import { useState, useCallback } from "react"

interface UseSwipeOptions {
  /**
   * Total number of items
   */
  total: number
  /**
   * Initial index
   */
  initialIndex?: number
  /**
   * Called when index changes
   */
  onIndexChange?: (index: number) => void
}

/**
 * Hook for managing swipe navigation state
 */
export function useSwipe({ total, initialIndex = 0, onIndexChange }: UseSwipeOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      onIndexChange?.(newIndex)
    }
  }, [currentIndex, total, onIndexChange])

  const goPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      onIndexChange?.(newIndex)
    }
  }, [currentIndex, onIndexChange])

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < total) {
        setCurrentIndex(index)
        onIndexChange?.(index)
      }
    },
    [total, onIndexChange],
  )

  const reset = useCallback(() => {
    setCurrentIndex(initialIndex)
    onIndexChange?.(initialIndex)
  }, [initialIndex, onIndexChange])

  return {
    currentIndex,
    canGoNext: currentIndex < total - 1,
    canGoPrevious: currentIndex > 0,
    goNext,
    goPrevious,
    goTo,
    reset,
  }
}
