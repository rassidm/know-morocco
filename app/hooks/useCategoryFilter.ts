import { useState, useCallback, useMemo } from "react"

import type { KnowledgeCardDisplay, Category } from "@/models/KnowledgeCard"

interface UseCategoryFilterOptions {
  /**
   * All available categories
   */
  categories: Category[]
  /**
   * Initial selected category (optional)
   */
  initialCategoryId?: string | "all"
}

/**
 * Hook for managing category filter state
 */
export function useCategoryFilter({
  categories,
  initialCategoryId = "all",
}: UseCategoryFilterOptions) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "all">(initialCategoryId)

  const selectCategory = useCallback((categoryId: string | "all") => {
    setSelectedCategoryId(categoryId)
  }, [])

  const clearFilter = useCallback(() => {
    setSelectedCategoryId("all")
  }, [])

  const isFiltered = selectedCategoryId !== "all"

  // Filter cards by selected category
  const filterCards = useCallback(
    (cards: KnowledgeCardDisplay[]): KnowledgeCardDisplay[] => {
      if (!isFiltered) return cards

      return cards.filter((card) => card.category_id === selectedCategoryId)
    },
    [selectedCategoryId, isFiltered],
  )

  // Get selected category name
  const selectedCategoryName = useMemo(() => {
    if (selectedCategoryId === "all") return "All"
    const category = categories.find((c) => c.id === selectedCategoryId)
    return category?.name ?? "All"
  }, [selectedCategoryId, categories])

  return {
    selectedCategoryId,
    selectCategory,
    clearFilter,
    isFiltered,
    filterCards,
    selectedCategoryName,
  }
}
