/**
 * Supabase Database Types
 *
 * These types will be auto-generated from Supabase using:
 * npx supabase gen types typescript --project-id your-project-id
 *
 * For now, we define basic types for development
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: UsersRow
        Insert: UsersInsert
        Update: UsersUpdate
      }
      categories: {
        Row: CategoriesRow
        Insert: CategoriesInsert
        Update: CategoriesUpdate
      }
      knowledge_cards: {
        Row: KnowledgeCardsRow
        Insert: KnowledgeCardsInsert
        Update: KnowledgeCardsUpdate
      }
      user_interactions: {
        Row: UserInteractionsRow
        Insert: UserInteractionsInsert
        Update: UserInteractionsUpdate
      }
    }
    Views: {}
    Functions: {}
    Enums: {
      category_name: "monuments" | "food" | "history" | "culture"
      language_code: "en" | "fr" | "es"
    }
  }
}

// Users Table Types
export interface UsersRow {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  preferred_language: "en" | "fr" | "es" | null
  created_at: string
}

export interface UsersInsert {
  id: string
  email: string
  name?: string | null
  avatar_url?: string | null
  preferred_language?: "en" | "fr" | "es" | null
  created_at?: string
}

export interface UsersUpdate {
  email?: string
  name?: string | null
  avatar_url?: string | null
  preferred_language?: "en" | "fr" | "es" | null
}

// Categories Table Types
export interface CategoriesRow {
  id: string
  name: "monuments" | "food" | "history" | "culture"
  icon: string | null
  display_order: number
  created_at: string
}

export interface CategoriesInsert {
  id?: string
  name: "monuments" | "food" | "history" | "culture"
  icon?: string | null
  display_order?: number
  created_at?: string
}

export interface CategoriesUpdate {
  name?: "monuments" | "food" | "history" | "culture"
  icon?: string | null
  display_order?: number
}

// Knowledge Cards Table Types
export interface KnowledgeCardsRow {
  id: string
  category_id: string
  title_en: string | null
  title_fr: string | null
  title_es: string | null
  description_en: string | null
  description_fr: string | null
  description_es: string | null
  image_url: string | null
  audio_url: string | null
  latitude: number | null
  longitude: number | null
  geofence_radius: number | null
  city: string | null
  is_active: boolean | null
  created_at: string
  updated_at: string
}

export interface KnowledgeCardsInsert {
  id?: string
  category_id: string
  title_en?: string | null
  title_fr?: string | null
  title_es?: string | null
  description_en?: string | null
  description_fr?: string | null
  description_es?: string | null
  image_url?: string | null
  audio_url?: string | null
  latitude?: number | null
  longitude?: number | null
  geofence_radius?: number | null
  city?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface KnowledgeCardsUpdate {
  category_id?: string
  title_en?: string | null
  title_fr?: string | null
  title_es?: string | null
  description_en?: string | null
  description_fr?: string | null
  description_es?: string | null
  image_url?: string | null
  audio_url?: string | null
  latitude?: number | null
  longitude?: number | null
  geofence_radius?: number | null
  city?: string | null
  is_active?: boolean | null
}

// User Interactions Table Types
export interface UserInteractionsRow {
  id: string
  user_id: string
  knowledge_card_id: string
  viewed_at: string
  is_favorite: boolean | null
}

export interface UserInteractionsInsert {
  id?: string
  user_id: string
  knowledge_card_id: string
  viewed_at?: string
  is_favorite?: boolean | null
}

export interface UserInteractionsUpdate {
  user_id?: string
  knowledge_card_id?: string
  viewed_at?: string
  is_favorite?: boolean | null
}
