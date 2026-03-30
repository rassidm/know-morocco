# Feature: Project Configuration and Environment Setup

## Metadata

- **Feature ID:** 001
- **Phase:** 1 - Foundation Setup
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** None

---

## Goals

Establish the foundational configuration for the Know Morocco app including environment variables, Supabase configuration, AdMob configuration, and path aliases. This feature sets up the configuration layer that all other features will depend on.

### Acceptance Criteria

- [ ] `.env` file created with all required environment variables
- [ ] `.env.example` file created for version control
- [ ] Environment configuration module created with validation
- [ ] Supabase configuration module created
- [ ] AdMob configuration module created
- [ ] Path aliases verified in tsconfig.json
- [ ] TypeScript compiles without errors

---

## Implementation Steps

### Step 1: Create Environment Files

Create `.env.example` file in the project root with placeholder values:

**File:** `.env.example`
```
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# AdMob Configuration
ADMOB_APP_ID=ca-app-pub-xxxxxxxx~xxxxxxxx
ADMOB_BANNER_UNIT_ID=ca-app-pub-xxxxxxxx/xxxxxxxx
ADMOB_INTERSTITIAL_UNIT_ID=ca-app-pub-xxxxxxxx/xxxxxxxx

# Google OAuth (configured in Supabase)
GOOGLE_CLIENT_ID=your-google-client-id

# Feature Flags
ENABLE_LOCATION_SERVICES=true
ENABLE_ADS=true
ENABLE_ANALYTICS=false
```

**Action:** Create `.env` file with actual values (do not commit to git)

---

### Step 2: Create Environment Configuration Module

Create a typed environment configuration module that validates and exports environment variables.

**File:** `app/config/env.ts`
```typescript
import { Platform } from 'react-native'
import Constants from 'expo-constants'

/**
 * Environment configuration interface
 */
export interface EnvConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  admobAppId: string
  admobBannerUnitId: string
  admobInterstitialUnitId: string
  enableLocationServices: boolean
  enableAds: boolean
  enableAnalytics: boolean
  isDev: boolean
}

/**
 * Get environment variable from expo-constants
 */
function getEnvVar(key: string): string | undefined {
  return Constants.expoConfig?.extra?.[key] || process.env[key]
}

/**
 * Get boolean environment variable
 */
function getBoolEnvVar(key: string, defaultValue: boolean): boolean {
  const value = getEnvVar(key)
  if (value === undefined) return defaultValue
  return value === 'true' || value === '1'
}

/**
 * Validate required environment variables
 */
function validateEnvVars() {
  const requiredVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY']
  const missingVars = requiredVars.filter((varName) => !getEnvVar(varName))
  
  if (missingVars.length > 0) {
    console.warn(
      `Missing environment variables: ${missingVars.join(', ')}. ` +
      'Some features may not work.'
    )
  }
}

// Validate on module load
validateEnvVars()

/**
 * Environment configuration object
 */
export const ENV: EnvConfig = {
  supabaseUrl: getEnvVar('SUPABASE_URL') || '',
  supabaseAnonKey: getEnvVar('SUPABASE_ANON_KEY') || '',
  admobAppId: getEnvVar('ADMOB_APP_ID') || '',
  admobBannerUnitId: getEnvVar('ADMOB_BANNER_UNIT_ID') || '',
  admobInterstitialUnitId: getEnvVar('ADMOB_INTERSTITIAL_UNIT_ID') || '',
  enableLocationServices: getBoolEnvVar('ENABLE_LOCATION_SERVICES', true),
  enableAds: getBoolEnvVar('ENABLE_ADS', true),
  enableAnalytics: getBoolEnvVar('ENABLE_ANALYTICS', false),
  isDev: __DEV__,
}

/**
 * Test AdMob IDs for development
 */
export const TEST_ADMOB_IDS = {
  banner: Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
  }),
  interstitial: Platform.select({
    ios: 'ca-app-pub-3940256099942544/4411468910',
    android: 'ca-app-pub-3940256099942544/1033173712',
  }),
}

export default ENV
```

---

### Step 3: Create Supabase Configuration Module

Create the Supabase client configuration.

**File:** `app/config/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'
import { ENV } from './env'
import type { Database } from '@/types/database.types'

/**
 * Supabase client instance
 */
export const supabase = createClient<Database>(
  ENV.supabaseUrl,
  ENV.supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)

/**
 * Get the current user's access token
 */
export async function getAccessToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export default supabase
```

---

### Step 4: Create AdMob Configuration Module

Create the AdMob configuration helper.

**File:** `app/config/admob.ts`
```typescript
import { Platform } from 'react-native'
import { ENV, TEST_ADMOB_IDS } from './env'

/**
 * Get the appropriate AdMob app ID
 */
export function getAdMobAppId(): string {
  if (ENV.isDev) {
    return Platform.select({
      ios: TEST_ADMOB_IDS.banner!.split('/')[0],
      android: TEST_ADMOB_IDS.banner!.split('/')[0],
      default: ENV.admobAppId,
    }) || ENV.admobAppId
  }
  return ENV.admobAppId
}

/**
 * Get the appropriate banner ad unit ID
 */
export function getBannerAdUnitId(): string {
  if (ENV.isDev && ENV.enableAds) {
    return Platform.select({
      ios: TEST_ADMOB_IDS.banner!,
      android: TEST_ADMOB_IDS.banner!,
      default: ENV.admobBannerUnitId,
    }) || ENV.admobBannerUnitId
  }
  return ENV.admobBannerUnitId
}

/**
 * Get the appropriate interstitial ad unit ID
 */
export function getInterstitialAdUnitId(): string {
  if (ENV.isDev && ENV.enableAds) {
    return Platform.select({
      ios: TEST_ADMOB_IDS.interstitial!,
      android: TEST_ADMOB_IDS.interstitial!,
      default: ENV.admobInterstitialUnitId,
    }) || ENV.admobInterstitialUnitId
  }
  return ENV.admobInterstitialUnitId
}

/**
 * Check if ads are enabled
 */
export function areAdsEnabled(): boolean {
  return ENV.enableAds && !ENV.isDev
}

/**
 * Check if test ads should be shown
 */
export function shouldShowTestAds(): boolean {
  return ENV.isDev && ENV.enableAds
}

export default {
  getAdMobAppId,
  getBannerAdUnitId,
  getInterstitialAdUnitId,
  areAdsEnabled,
  shouldShowTestAds,
}
```

---

### Step 5: Verify Path Aliases

Ensure tsconfig.json has the correct path aliases.

**File:** `tsconfig.json`

Verify these settings exist:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"],
      "@assets/*": ["./assets/*"],
      "@components/*": ["./app/components/*"],
      "@config/*": ["./app/config/*"],
      "@context/*": ["./app/context/*"],
      "@hooks/*": ["./app/hooks/*"],
      "@i18n/*": ["./app/i18n/*"],
      "@navigators/*": ["./app/navigators/*"],
      "@screens/*": ["./app/screens/*"],
      "@services/*": ["./app/services/*"],
      "@store/*": ["./app/store/*"],
      "@db/*": ["./app/db/*"],
      "@theme/*": ["./app/theme/*"],
      "@utils/*": ["./app/utils/*"],
      "@types/*": ["./types/*"]
    }
  }
}
```

---

### Step 6: Create Database Types File (Placeholder)

Create a placeholder for Supabase database types.

**File:** `types/database.types.ts`
```typescript
/**
 * Supabase Database Types
 * 
 * These types will be auto-generated from Supabase using:
 * npx supabase gen types typescript --project-id your-project-id
 * 
 * For now, we define basic types for development
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
      category_name: 'monuments' | 'food' | 'history' | 'culture'
      language_code: 'en' | 'fr' | 'es'
    }
  }
}

// Users Table Types
export interface UsersRow {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  preferred_language: 'en' | 'fr' | 'es' | null
  created_at: string
}

export interface UsersInsert {
  id: string
  email: string
  name?: string | null
  avatar_url?: string | null
  preferred_language?: 'en' | 'fr' | 'es' | null
  created_at?: string
}

export interface UsersUpdate {
  email?: string
  name?: string | null
  avatar_url?: string | null
  preferred_language?: 'en' | 'fr' | 'es' | null
}

// Categories Table Types
export interface CategoriesRow {
  id: string
  name: 'monuments' | 'food' | 'history' | 'culture'
  icon: string | null
  display_order: number
  created_at: string
}

export interface CategoriesInsert {
  id?: string
  name: 'monuments' | 'food' | 'history' | 'culture'
  icon?: string | null
  display_order?: number
  created_at?: string
}

export interface CategoriesUpdate {
  name?: 'monuments' | 'food' | 'history' | 'culture'
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
```

---

## Mock Data (If Applicable)

Not applicable for this configuration feature.

---

## Integration Points

### Connects To

- None (this is a foundational feature)

### Used By

- **Feature 005** - Supabase Client Setup
- **Feature 050** - AdMob Configuration
- All features that require environment variables

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] `.env.example` file exists with all required variables
- [ ] `.env` file created (not committed to git)
- [ ] `ENV` object exports correctly
- [ ] Supabase client can be imported without errors
- [ ] AdMob config functions return expected values
- [ ] Path aliases work (try importing with `@/`)
- [ ] No console warnings on app startup

---

## Notes

- The `.env` file should **never** be committed to git - it's in `.gitignore`
- Use test AdMob IDs during development to avoid policy violations
- Supabase types will need to be regenerated when database schema changes
- Consider using `react-native-config` as an alternative to `expo-constants` for env vars

---

## References

- [Expo Constants Documentation](https://docs.expo.dev/versions/latest/sdk/constants/)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [React Native Google Mobile Ads](https://docs.page/invertase/react-native-google-mobile-ads)
- [TypeScript Path Aliases](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
