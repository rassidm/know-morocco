import type { KnowledgeCard, Category } from "@/models/KnowledgeCard"

/**
 * Factory to create mock knowledge cards
 */
export function createMockCard(overrides: Partial<KnowledgeCard> = {}): KnowledgeCard {
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
export function createMockCategory(overrides: Partial<Category> = {}): Category {
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
