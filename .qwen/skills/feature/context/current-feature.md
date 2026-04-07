# Current Feature

<!-- Load a feature with: /feature load <feature-file.md> -->

## Status
Not Started

## Goals
<!-- Bullet points of what success looks like -->

## Notes
<!-- Additional context, constraints, or details from spec -->

## History
<!-- Append completed features here (most recent at bottom) -->
- **Feature 013 - Button Components - Primary, Secondary, Icon** - Complete
  - Created BaseButton component with variant (primary, secondary, outline, ghost) and size (small, medium, large) support
  - Added PrimaryButton for main CTAs with filled style using theme tint color
  - Added SecondaryButton for alternative actions with neutral background
  - Added OutlineButton for less prominent actions with border style
  - Added IconButton for icon-only actions with circular sizing
  - Support loading state with ActivityIndicator replacing text/icons
  - Support disabled state with reduced opacity (0.5)
  - All buttons use theme colors for consistency
  - Added accessibility labels and proper ARIA roles
  - Implement press feedback with opacity animation (0.8 on press)
  - Support both i18n keys (tx) and direct text
  - Support left and right icon accessories
  - Created barrel exports for easy importing
  - TypeScript compiles without errors
  - ESLint passes without errors
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
