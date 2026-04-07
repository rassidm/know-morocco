# Current Feature

## Status

<!-- Not Started | In Progress | Completed -->

No active feature

## History

### Feature 009 - Auth Service (Google OAuth Integration)

**Completed:** 2026-04-07

**Summary:**
Created the authentication service that handles Google OAuth sign-in, sign-out, and session management with Supabase Auth. Provides backend logic for the Login screen.

**Files Created:**
- `app/services/authService.ts` - Main auth service with signInWithGoogle, signOut, getSession, getCurrentUser, refreshSession, handleOAuthCallback, isAuthenticated, waitForAuth
- `app/services/authLinking.ts` - Deep linking utilities (subscribeToAuthLinks, openAuthUrl, handleAuthDeepLink)
- `app/services/authService.mock.ts` - Mock auth service for development/testing with MOCK_USER and MOCK_SESSION

**Files Modified:**
- `app.json` - Updated scheme to "knowmorocco", added Android intentFilters for deep linking, added iOS associatedDomains

**Notes:**
- Google OAuth must be configured in Supabase dashboard before testing (Authentication → Providers → Google)
- Deep linking scheme changed from "know-morocco" to "knowmorocco" for consistency with auth callback URL

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 008 - Zustand Store Setup

**Completed:** 2026-04-07

**Summary:**
Set up Zustand for global state management with MMKV persistence. Provides lightweight, centralized store for app-wide state like language preference, sync status, card view state, and ad tracking.

**Files Created:**
- `app/store/store.types.ts` - TypeScript interfaces for `AppState`, `SyncQueueState`, `SyncQueueItem`, `AdState`
- `app/store/appStore.ts` - Main Zustand store with persist middleware, language/theme/sync/cards/location/offline state, and typed selectors
- `app/store/syncQueueStore.ts` - Sync queue store for pending operations with add/remove/clear/get actions
- `app/store/adStore.ts` - Ad impression tracking with frequency capping (interstitial every 4 cards, 5 min cap)
- `app/store/index.ts` - Barrel export for all stores and types

**Notes:**
- Fixed TypeScript error: replaced complex `Omit<AppState, keyof Pick<...>>` with explicit `InitialState` interface
- Each store uses its own MMKV instance with unique ID for isolation
- `partialize` used to persist only essential fields, avoiding storage bloat

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 007 - Storage Layer (MMKV Setup)

**Completed:** 2026-04-07

**Summary:**
Set up MMKV for fast, persistent key-value storage as the foundation for storing user preferences, app settings, and cached data.

**Files Created:**
- `app/utils/storage.ts` - Core MMKV storage module with `STORAGE_KEYS` constants, typed storage helpers (string, number, boolean, object), utility functions (clearAllStorage, clearKeys, getAllKeys, contains), and async save/load for navigation state persistence
- `app/utils/storageHelpers.ts` - Higher-level helpers (preferencesStorage, cacheStorage, syncStorage, adStorage)
- `app/hooks/useMMKV.ts` - React hooks for reactive MMKV storage (useMMKV, useMMKVString, useMMKVBoolean) with value change listeners

**Files Modified:**
- `app/utils/storage/index.ts` - Converted to barrel file re-exporting from new storage.ts with backward-compatible sync wrappers (loadString, saveString, save, load, remove, clear) for existing test file

**Notes:**
- Fixed MMKV v3 Listener API: `addOnValueChangedListener` returns a `Listener` with `.remove()` method
- Resolved module resolution conflict between `storage.ts` (file) and `storage/` (directory)

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 006 - Authentication Context and State Management

**Completed:** 2026-04-06

**Summary:**
Implemented the complete authentication context with Supabase Auth integration:
- Created AuthContext types (`app/context/AuthContext.types.ts`) with TypeScript interfaces
- Created AuthProvider (`app/context/AuthContext.tsx`) with session management, auth state listener, and Google OAuth sign-in
- Created auth helpers (`app/context/authHelpers.ts`) with utility functions
- AuthProvider already integrated in `app/app.tsx` (existing wrapper)
- RootNavigator and AppNavigator already use `useAuth()` hook
- Replaced Ignite boilerplate email/password LoginScreen with Google OAuth UI
- Updated WelcomeScreen to use `signOut` instead of old `logout`
- TypeScript compiles without errors
- ESLint passes

**Files Created:**
- `app/context/AuthContext.types.ts` - TypeScript interfaces for auth context
- `app/context/authHelpers.ts` - Auth utility functions (isAuthCached, getCurrentUserId, getAuthToken, waitForAuth)

**Files Modified:**
- `app/context/AuthContext.tsx` - Replaced MMKV-based boilerplate with Supabase Auth provider
- `app/screens/LoginScreen.tsx` - Converted from email/password form to Google OAuth button
- `app/screens/WelcomeScreen.tsx` - Updated `logout` to `signOut`

**Verification:**
- TypeScript compiles without errors (`npx tsc --noEmit` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 005 - Supabase Client and Database Setup

**Completed:** 2026-04-06

**Summary:**
Implemented the complete Supabase client infrastructure:
- Created Supabase client singleton (`app/services/supabase.ts`) with PKCE auth flow
- Created database query helpers (`app/services/databaseHelpers.ts`) with error handling wrappers
- Created storage helper (`app/services/storage.ts`) for file upload/download operations
- Created test connection function (`app/services/testConnection.ts`) for connectivity verification
- Integrated existing database types from `types/database.types.ts`
- All auth helpers (getSession, getUser, getAccessToken, signOut) implemented
- Consolidated duplicate `app/config/supabase.ts` into re-export barrel
- TypeScript compiles without errors
- ESLint passes

**Files Created:**
- `app/services/supabase.ts` - Main Supabase client singleton with auth helpers
- `app/services/databaseHelpers.ts` - Error handling wrappers and auth utilities
- `app/services/storage.ts` - File storage helpers (upload, download, delete, list)
- `app/services/testConnection.ts` - Connection testing function

**Files Modified:**
- `app/config/supabase.ts` - Converted to re-export barrel (eliminated duplicate)

**Verification:**
- TypeScript compiles without errors (`npx tsc --noEmit` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 002 - Theme System and Design Tokens

**Completed:** 2026-04-04

**Summary:**
Implemented the complete theme system with Moroccan-inspired design tokens:
- Updated `colors.ts` with Moroccan Blue (#1E5F9E), Terracotta (#C17B5D), Gold (#D4AF37) palette
- Updated `colorsDark.ts` with dark theme variants
- Updated `spacing.ts` and `spacingDark.ts` with consistent spacing scale
- Preserved existing `types.ts`, `context.tsx`, `theme.ts` architecture (Ignite boilerplate)
- Fixed `DemoIcon.tsx` references from `angry500` to `error500`
- TypeScript compiles without errors
- ESLint passes

**Files Modified:**
- `app/theme/colors.ts` - Moroccan-inspired light theme colors
- `app/theme/colorsDark.ts` - Moroccan-inspired dark theme colors
- `app/theme/spacing.ts` - Updated spacing scale
- `app/theme/spacingDark.ts` - Updated dark theme spacing
- `app/screens/DemoShowroomScreen/demos/DemoIcon.tsx` - Fixed palette references

**Verification:**
- TypeScript compiles without errors (`npx tsc --noEmit` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 001 - Project Configuration and Environment Setup

**Completed:** 2026-03-29

**Summary:**
Established foundational configuration for the Know Morocco app including:
- Environment variables (`.env` and `.env.example`)
- Environment configuration module (`app/config/env.ts`) with validation
- Supabase client configuration (`app/config/supabase.ts`)
- AdMob configuration helpers (`app/config/admob.ts`)
- Extended path aliases in `tsconfig.json`
- Database type definitions (`types/database.types.ts`)

**Files Created:**
- `.env.example`
- `.env`
- `app/config/env.ts`
- `app/config/supabase.ts`
- `app/config/admob.ts`
- `types/database.types.ts`

**Files Modified:**
- `.gitignore` (added `.env`)
- `tsconfig.json` (added path aliases)
- `package.json` (added `@supabase/supabase-js`)

**Verification:**
- TypeScript compiles without errors (`npm run compile`)
- ESLint passes (`npm run lint`)
