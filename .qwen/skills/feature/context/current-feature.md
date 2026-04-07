# Current Feature: Button Components - Primary, Secondary, Icon (Feature 013)

## Status
In Progress

## Goals
- PrimaryButton component with filled style
- SecondaryButton component with outlined style
- IconButton component for icon-only actions
- Loading state with spinner indicator
- Disabled state with reduced opacity
- All buttons use theme colors
- Accessibility labels supported
- Pressable feedback (scale/opacity animation)

## Notes
- Phase 3 - Core UI Components
- Dependencies: 002 (Theme System)
- Existing Button component from Ignite boilerplate can be enhanced or replaced
- Button should support both i18n keys (tx) and direct text
- Consider adding ripple effect for Android
- All buttons should be minimum 44x44 touch target for accessibility

## History
<!-- Append completed features here (most recent at bottom) -->
- **Feature 012 - User Profile Service - CRUD Operations** - Complete
  - Added UserProfile, UserProfileUpdate, and ProfileResult types in app/types/user.ts
  - Created userProfileService with createProfile, getProfile, updateProfile, deleteProfile
  - Added getOrCreateProfile for auto-creating profiles on first login
  - Created mock user profile service for development
  - Integrated profile loading into AuthContext (initialization + SIGNED_IN event)
  - Handled null fields to match actual Supabase schema
  - TypeScript compiles without errors
  - ESLint passes without errors
- **Feature 004 - Internationalization (i18n) Setup** - Complete
  - Added Know Morocco translations to en.ts, fr.ts, es.ts (15 sections each)
  - Created useTranslation hook with changeLanguage and currentLanguage
  - Added SUPPORTED_LANGUAGES metadata with codes, names, native names, flags
  - Added getLanguageName and getLanguageFlag helper functions
  - Created i18nTypes.ts to break circular dependency
  - Fixed type annotations on ar.ts, hi.ts, ja.ts, ko.ts demo files
  - TypeScript compiles without errors
  - ESLint passes without errors
- **Feature 003 - Navigation Foundation Setup** - Complete
  - Created comprehensive navigation types (RootStack, AuthStack, AppTabs, AppStack)
  - Created AuthNavigator with Login and Welcome screens
  - Created TabNavigator with Home, Nearby, Profile tabs
  - Created RootNavigator for auth/app switching
  - Created 8 placeholder screens (Home, Nearby, Profile, KnowledgeCard, CardDetail, LanguageSelect, Settings, Favorites, OfflineContent)
  - Created storage utility with MMKV
  - Updated navigationUtilities to use new types
  - TypeScript compiles without errors
  - ESLint passes without errors
