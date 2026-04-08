# Feature: Knowledge Card Model - TypeScript Interfaces

## Metadata

- **Feature ID:** 019
- **Phase:** 4 - Knowledge Cards System
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 001 (Project Configuration)

---

## Goals

Define the core TypeScript interfaces and types for knowledge cards that will be used throughout the app. This provides a single source of truth for the data model, ensuring type safety across all components, services, and screens that interact with knowledge card data.

### Acceptance Criteria

- [ ] `KnowledgeCard` interface with all fields from Supabase schema
- [ ] `Category` interface with localization support
- [ ] `CardMetadata` interface for display metadata (distance, category name)
- [ ] Type guards for runtime validation
- [ ] Mock data factories for testing
- [ ] All interfaces exported from centralized location

---

## Implementation Steps

### Step 1: Create KnowledgeCard Interface

**File:** `app/models/KnowledgeCard.ts`

```typescript
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
export function getCardTitle(
  card: KnowledgeCard,
  language: "en" | "fr" | "es" = "en"
): string {
  const key = `title_${language}` as const
  return card[key] || card.title_en
}

/**
 * Extract localized description from KnowledgeCard
 */
export function getCardDescription(
  card: KnowledgeCard,
  language: "en" | "fr" | "es" = "en"
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
  }
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
```

---

### Step 2: Create Mock Data Factories

**File:** `app/models/__mocks__/knowledgeCards.ts`

```typescript
import type { KnowledgeCard, Category } from "@/models/KnowledgeCard"

/**
 * Factory to create mock knowledge cards
 */
export function createMockCard(
  overrides: Partial<KnowledgeCard> = {}
): KnowledgeCard {
  const now = new Date().toISOString()
  return {
    id: `card-${Math.random().toString(36).slice(2, 9)}`,
    category_id: "cat-monuments",
    title_en: "Hassan II Mosque",
    title_fr: "Mosquée Hassan II",
    title_es: "Mezquita Hassan II",
    description_en:
      "One of the largest mosques in the world, located in Casablanca, Morocco. Completed in 1993, it features a 210-meter minaret, the tallest in the world.",
    description_fr:
      "L'une des plus grandes mosquées du monde, située à Casablanca, Maroc. Achevée en 1993, elle dispose d'un minaret de 210 mètres, le plus haut du monde.",
    description_es:
      "Una de las mezquitas más grandes del mundo, ubicada en Casablanca, Marruecos. Completada en 1993, cuenta con un minarete de 210 metros, el más alto del mundo.",
    image_url: "https://picsum.photos/seed/mosque/800/600",
    audio_url: null,
    latitude: 33.6083,
    longitude: -7.6329,
    geofence_radius: 100,
    city: "Casablanca",
    is_active: true,
    created_at: now,
    updated_at: now,
    ...overrides,
  }
}

/**
 * Factory to create mock categories
 */
export function createMockCategory(
  overrides: Partial<Category> = {}
): Category {
  return {
    id: `cat-${Math.random().toString(36).slice(2, 9)}`,
    name: "monuments",
    icon: "monument",
    display_order: 1,
    ...overrides,
  }
}

/**
 * Pre-built mock categories
 */
export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-monuments", name: "monuments", icon: "monument", display_order: 1 },
  { id: "cat-food", name: "food", icon: "restaurant", display_order: 2 },
  { id: "cat-history", name: "history", icon: "history", display_order: 3 },
  { id: "cat-culture", name: "culture", icon: "culture", display_order: 4 },
]

/**
 * Pre-built mock knowledge cards
 */
export const MOCK_KNOWLEDGE_CARDS: KnowledgeCard[] = [
  createMockCard({
    id: "card-001",
    category_id: "cat-monuments",
    title_en: "Hassan II Mosque",
    title_fr: "Mosquée Hassan II",
    title_es: "Mezquita Hassan II",
    description_en:
      "One of the largest mosques in the world, located in Casablanca. Completed in 1993 with a 210m minaret.",
    image_url: "https://picsum.photos/seed/mosque/800/600",
    latitude: 33.6083,
    longitude: -7.6329,
    city: "Casablanca",
  }),
  createMockCard({
    id: "card-002",
    category_id: "cat-food",
    title_en: "Traditional Tagine",
    title_fr: "Tajine Traditionnel",
    title_es: "Tajine Tradicional",
    description_en:
      "Morocco's iconic dish - slow-cooked stew with meat, vegetables, and aromatic spices in a distinctive conical pot.",
    image_url: "https://picsum.photos/seed/tagine/800/600",
    latitude: 31.6295,
    longitude: -7.9811,
    city: "Marrakech",
  }),
  createMockCard({
    id: "card-003",
    category_id: "cat-history",
    title_en: "Volubilis Roman Ruins",
    title_fr: "Ruines Romaines de Volubilis",
    title_es: "Ruinas Romanas de Volubilis",
    description_en:
      "Ancient Roman archaeological site with well-preserved mosaics and ruins dating back to the 3rd century BC.",
    image_url: "https://picsum.photos/seed/volubilis/800/600",
    latitude: 34.0733,
    longitude: -5.5533,
    city: "Meknes",
  }),
  createMockCard({
    id: "card-004",
    category_id: "cat-culture",
    title_en: "Blue City of Chefchaouen",
    title_fr: "Ville Bleue de Chefchaouen",
    title_es: "Ciudad Azul de Chefchaouen",
    description_en:
      "Famous for its striking blue-washed buildings in the Rif Mountains, creating a magical atmosphere.",
    image_url: "https://picsum.photos/seed/chefchaouen/800/600",
    latitude: 35.1688,
    longitude: -5.2636,
    city: "Chefchaouen",
  }),
  createMockCard({
    id: "card-005",
    category_id: "cat-monuments",
    title_en: "Koutoubia Mosque",
    title_fr: "Mosquée Koutoubia",
    title_es: "Mezquita Koutoubia",
    description_en:
      "Largest mosque in Marrakech, famous for its 77-meter minaret that inspired the Giralda in Seville.",
    image_url: "https://picsum.photos/seed/koutoubia/800/600",
    latitude: 31.6237,
    longitude: -7.9936,
    city: "Marrakech",
  }),
  createMockCard({
    id: "card-006",
    category_id: "cat-food",
    title_en: "Moroccan Mint Tea Ceremony",
    title_fr: "Cérémonie du Thé à la Menthe",
    title_es: "Ceremonia del Té de Menta",
    description_en:
      "Traditional Moroccan hospitality - sweet green tea with fresh mint, poured from height to create foam.",
    image_url: "https://picsum.photos/seed/tea/800/600",
    latitude: 31.6295,
    longitude: -7.9811,
    city: "Marrakech",
  }),
]
```

---

### Step 3: Create Models Barrel Export

**File:** `app/models/index.ts`

```typescript
export {
  isKnowledgeCard,
  getCardTitle,
  getCardDescription,
  toCardDisplay,
} from "./KnowledgeCard"
export type {
  KnowledgeCard,
  KnowledgeCardDisplay,
  Category,
  CardMetadata,
} from "./KnowledgeCard"

// Mock data (for development/testing only)
export {
  createMockCard,
  createMockCategory,
  MOCK_CATEGORIES,
  MOCK_KNOWLEDGE_CARDS,
} from "./__mocks__/knowledgeCards"
```

---

## Mock Data

See Step 2 for complete mock data factories including:
- `createMockCard()` - Create individual mock cards with overrides
- `createMockCategory()` - Create mock categories with overrides
- `MOCK_CATEGORIES` - Pre-built category array
- `MOCK_KNOWLEDGE_CARDS` - Pre-built card array with 6 diverse examples

---

## Integration Points

### Connects To

- **Feature 001** - Project configuration (path aliases)
- **Feature 004** - i18n (language keys for localization)

### Used By

- **Feature 020** - Card Content Display
- **Feature 023** - Category Filter
- **Feature 024** - Home Screen
- **Feature 030** - Knowledge Card Service

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] `isKnowledgeCard()` correctly validates objects
- [ ] `getCardTitle()` returns correct language variant
- [ ] `getCardDescription()` falls back to English if missing
- [ ] `toCardDisplay()` converts correctly with options
- [ ] Mock factories generate valid objects
- [ ] Mock data arrays contain expected items

---

## Notes

- Interfaces mirror Supabase schema to simplify future database integration
- Localization keys (`_en`, `_fr`, `_es`) match i18n configuration
- Mock data uses picsum.photos for placeholder images
- Type guard function will be useful for runtime validation of API responses

---

## References

- [Supabase Schema (Feature 025)](./025-supabase-schema.md)
- [TypeScript Interfaces Documentation](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [Feature 004 - Internationalization Setup](./004-internationalization-setup.md)
