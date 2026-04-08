/**
 * Knowledge Card data model
 * Mirrors Supabase `knowledge_cards` table structure
 */
export interface KnowledgeCard {
  /** Unique card identifier */
  id: string
  /** Category reference ID */
  category_id: string
  /** Card titles by language */
  title_en: string
  title_fr: string
  title_es: string
  /** Card descriptions by language */
  description_en: string
  description_fr: string
  description_es: string
  /** Image URL (Supabase storage) */
  image_url: string | null
  /** Audio URL (Supabase storage) */
  audio_url: string | null
  /** Geographic coordinates */
  latitude: number
  longitude: number
  /** Geofence trigger radius in meters */
  geofence_radius: number
  /** City/location tag */
  city: string
  /** Soft delete flag */
  is_active: boolean
  /** Creation timestamp */
  created_at: string
  /** Last update timestamp */
  updated_at: string
  /** Last sync timestamp (local only) */
  last_synced_at?: string
}

/**
 * Display-ready knowledge card (after localization)
 */
export interface KnowledgeCardDisplay {
  id: string
  title: string
  description: string
  image_url: string | null
  audio_url: string | null
  category_id: string
  category_name: string
  city: string
  latitude: number
  longitude: number
  distance?: string // Calculated distance from user
  is_favorite: boolean
}

/**
 * Category data model
 * Mirrors Supabase `categories` table structure
 */
export interface Category {
  /** Unique category identifier */
  id: string
  /** Category name key */
  name: "monuments" | "food" | "history" | "culture"
  /** Icon identifier */
  icon: string
  /** Display order in UI */
  display_order: number
}

/**
 * Card metadata for display purposes
 */
export interface CardMetadata {
  distance?: string
  category_name: string
  city: string
  is_favorite: boolean
  last_viewed?: string
}

/**
 * Type guard to validate KnowledgeCard object
 */
export function isKnowledgeCard(obj: unknown): obj is KnowledgeCard {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "category_id" in obj &&
    "title_en" in obj &&
    "latitude" in obj &&
    "longitude" in obj
  )
}

/**
 * Extract localized title from KnowledgeCard
 */
export function getCardTitle(card: KnowledgeCard, language: "en" | "fr" | "es" = "en"): string {
  const key = `title_${language}` as const
  return card[key] || card.title_en
}

/**
 * Extract localized description from KnowledgeCard
 */
export function getCardDescription(
  card: KnowledgeCard,
  language: "en" | "fr" | "es" = "en",
): string {
  const key = `description_${language}` as const
  return card[key] || card.description_en
}

/**
 * Convert KnowledgeCard to display-ready format
 */
export function toCardDisplay(
  card: KnowledgeCard,
  language: "en" | "fr" | "es" = "en",
  options?: {
    category_name?: string
    distance?: string
    is_favorite?: boolean
  },
): KnowledgeCardDisplay {
  return {
    id: card.id,
    title: getCardTitle(card, language),
    description: getCardDescription(card, language),
    image_url: card.image_url,
    audio_url: card.audio_url,
    category_id: card.category_id,
    category_name: options?.category_name || "",
    city: card.city,
    latitude: card.latitude,
    longitude: card.longitude,
    distance: options?.distance,
    is_favorite: options?.is_favorite ?? false,
  }
}
