# Current Feature

## Feature 022 - Card Swipe Navigation - Gesture Handling

## Status

<!-- Not Started | In Progress | Completed -->

In Progress

## Goals

- Build SwipeableCard component with horizontal swipe gestures
- Card animates smoothly during swipe (translate + rotate)
- Swipe left/right triggers navigation to previous/next card
- Visual indicators show swipe direction
- Haptic feedback on swipe threshold
- Swipe cancellation (return to center if not swiped far enough)
- Works with flat list of cards

## Notes

- Uses `react-native-gesture-handler` for gesture recognition
- Uses `react-native-reanimated` for smooth animations
- Uses `expo-haptics` for tactile feedback
- Threshold is 30% of screen width
- Max rotation is 15 degrees for subtle effect
- Spring animation for smooth return to center
- Component is optimized for performance with shared values
- Future enhancement: add vertical swipe to dismiss
- Future enhancement: add undo swipe feature
- Dependency: Feature 020 (Card Content Display) must be complete

### Implementation Steps

1. **Create SwipeableCard Component** (`app/components/cards/SwipeableCard.tsx`)
2. **Create CardStack Component** (`app/components/cards/CardStack.tsx`)
3. **Create useSwipe Hook** (`app/hooks/useSwipe.ts`)

## History

### Feature 021 - Audio Player Component - Play/Pause Controls

**Completed:** 2026-04-08

**Summary:**
Built an audio player component for knowledge card audio narration. Created AudioPlayer component with play/pause toggle, loading state, error handling, progress indicator with time display (mm:ss format), and proper audio cleanup on unmount. Created reusable useAudio hook for audio playback state management. Integrated AudioPlayer into CardContentDisplay below description, conditionally rendered when audio_url exists. Uses expo-av for audio playback with proper accessibility labels. Removed unnecessary eslint-disable comment flagged during review.

**Files Created:**
- `app/components/audio/AudioPlayer.tsx` — Audio player with play/pause/stop controls, progress bar, time display, error/loading states
- `app/hooks/useAudio.ts` — Reusable hook for audio playback state management
- `app/components/audio/index.ts` — Barrel export

**Files Modified:**
- `app/components/cards/CardContentDisplay.tsx` — Added AudioPlayer integration below description

**Notes:**
- Installed `expo-av` package for audio playback
- Audio is NOT preloaded to save bandwidth - loads on first play
- Component manages its own sound instance lifecycle with cleanup on unmount
- Error state displays when audio fails to load
- Progress indicator updates during playback with position/duration display
- Accessibility labels for play/pause/stop buttons
- Review fix: Removed unnecessary `eslint-disable no-restricted-imports` comment

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 020 - Card Content Display - Title, Description, Image

**Completed:** 2026-04-08

**Summary:**
Built the CardContentDisplay component that renders localized title, description, and image for knowledge cards. Component includes image loading states (loading placeholder, error fallback for null/invalid URLs), text truncation (title: 2 lines, description: 3 lines), category badge, location badge with city, and distance indicator. Created imageLoader utility with `prefetchImage()`, `isValidImageUrl()`, and `getFallbackImage()` helpers. Updated KnowledgeCard component to use `KnowledgeCardDisplay` prop and integrate CardContentDisplay internally. All components fully themed with proper type safety (ViewStyle, ImageStyle, TextStyle).

**Files Created:**
- `app/components/cards/CardContentDisplay.tsx` — Main content display component with image loading, badges, truncation
- `app/utils/imageLoader.ts` — Image utilities (prefetch, validate, fallback)

**Files Modified:**
- `app/components/cards/KnowledgeCard.tsx` — Updated to use KnowledgeCardDisplay prop and CardContentDisplay
- `app/components/cards/index.ts` — Added CardContentDisplay export

**Notes:**
- Fixed TypeScript type issues: used separate ViewStyle/ImageStyle/TextStyle for different style objects
- Fixed missing color properties: used `secondary600` instead of non-existent `secondary800`, `primary600` instead of `primary700`, `textDim` instead of `textSecondary`
- Removed unused imports (`ReactNode`, `onFavorite`) to satisfy ESLint
- `getFallbackImage()` references placeholder asset that will be added later

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 019 - Knowledge Card Model - TypeScript Interfaces

**Completed:** 2026-04-08

**Summary:**
Created the core TypeScript interfaces and types for knowledge cards as the single source of truth for the data model. Built `KnowledgeCard` (16 fields mirroring Supabase schema), `KnowledgeCardDisplay` (localized display-ready format), `Category` (4 categories: monuments, food, history, culture), and `CardMetadata` interfaces. Added helper functions: `isKnowledgeCard()` type guard, `getCardTitle()` and `getCardDescription()` for localized text extraction, and `toCardDisplay()` for conversion. Created mock factories (`createMockCard`, `createMockCategory`) and pre-built test data with 6 diverse cards and 4 categories.

**Files Created:**
- `app/models/KnowledgeCard.ts` — Core interfaces and helper functions
- `app/models/__mocks__/knowledgeCards.ts` — Mock factories and pre-built test data
- `app/models/index.ts` — Barrel export

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 018 - Icon Components - Icon Wrapper, Category Icons

**Completed:** 2026-04-08

**Summary:**
Created the core TypeScript interfaces and types for knowledge cards as the single source of truth for the data model. Built `KnowledgeCard` (16 fields mirroring Supabase schema), `KnowledgeCardDisplay` (localized display-ready format), `Category` (4 categories: monuments, food, history, culture), and `CardMetadata` interfaces. Added helper functions: `isKnowledgeCard()` type guard, `getCardTitle()` and `getCardDescription()` for localized text extraction, and `toCardDisplay()` for conversion. Created mock factories (`createMockCard`, `createMockCategory`) and pre-built test data with 6 diverse cards and 4 categories.

**Files Created:**
- `app/models/KnowledgeCard.ts` — Core interfaces and helper functions
- `app/models/__mocks__/knowledgeCards.ts` — Mock factories and pre-built test data
- `app/models/index.ts` — Barrel export

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 018 - Icon Components - Icon Wrapper, Category Icons

**Completed:** 2026-04-07

**Summary:**
Created a unified icon system with IconWrapper (base icon container with 5 sizes, 4 variants including pressable button), CategoryIcon (monuments/food/history/culture with category-specific colors), and IconSet (16 common app icons). All use emoji placeholders with proper accessibility and theme integration.

**Files Created:**
- `app/components/icons/IconWrapper.tsx` — Base icon wrapper with 5 sizes (xs/sm/md/lg/xl), 4 variants (default/filled/outlined/button), color customization, pressable support with opacity feedback
- `app/components/icons/CategoryIcon.tsx` — Category-specific icons for monuments, food, history, culture with predefined colors
- `app/components/icons/IconSet.tsx` — Common app icons (search, close, back, forward, home, settings, profile, favorite, share, download, play, pause, location, language, theme, notification)
- `app/components/icons/index.ts` — Barrel export for all icon components

**Notes:**
- Fixed TypeScript syntax for `$pressedIcon` curried function pattern
- Added `eslint-disable` comments for RN Text import since emoji rendering needs native Text component
- Category colors map unused for now but exported for external use (prefixed with `_` to satisfy lint)
- Emoji placeholders can be replaced with vector icons (react-native-vector-icons) or SVG icons later

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 017 - Loading Components - Spinner, Skeleton

**Completed:** 2026-04-07

**Summary:**
Created loading indicator components with animated feedback. Built Spinner (rotating indicator with small/medium/large sizes and overlay variant), Skeleton (pulse-animating placeholder), SkeletonLine (multi-line text skeleton), SkeletonImage (image placeholder skeleton), and LoadingScreen (full-screen or inline loading with optional message). All use React Native Animated API with proper accessibility attributes.

**Files Created:**
- `app/components/loading/Spinner.tsx` — Rotating spinner with 3 sizes (small/medium/large), overlay variant, custom color support, Animated API
- `app/components/loading/Skeleton.tsx` — Pulsing placeholder with configurable width/height/borderRadius, Animated opacity sequence
- `app/components/loading/SkeletonLine.tsx` — Multi-line text skeleton with configurable line count, widths, spacing, and last-line width
- `app/components/loading/SkeletonImage.tsx` — Image placeholder skeleton wrapping Skeleton with image-specific defaults
- `app/components/loading/LoadingScreen.tsx` — Full-screen or inline loading indicator with message, uses Screen component
- `app/components/loading/index.ts` — Barrel export for all loading components

**Notes:**
- Fixed TypeScript type issues: used `colors.palette.overlay50` (not `colors.overlay50`), narrowed Skeleton width/height types for Animated compatibility
- Extracted spinner border colors to themed style function to satisfy ESLint `no-inline-styles` and `no-color-literals` rules
- All animations use React Native Animated API with `useNativeDriver: true` for performance
- Spinner uses `Animated.loop(Animated.timing(...))` for continuous rotation
- Skeleton uses `Animated.sequence([...])` for pulse effect

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 016 - Input Components - TextInput, SearchInput, TextArea

**Completed:** 2026-04-07

**Summary:**
Created input components for forms and search functionality. Built TextInput (base input with label, error, helper text, disabled/readonly states, focus styling), SearchInput (specialized search input with icon), and TextArea (multi-line input). All components use forwardRef for imperative access and theme-based styling.

**Files Created:**
- `app/components/inputs/TextInput.tsx` — Base input with label, error/helper text, disabled/readonly states, focus border color change, RightAccessory slot
- `app/components/inputs/SearchInput.tsx` — Search-specific input with search icon, autoCapitalize="none", autoCorrect=false, web-search keyboard type
- `app/components/inputs/TextArea.tsx` — Multi-line input with configurable numberOfLines and minHeight
- `app/components/inputs/index.ts` — Barrel export for all input components

**Notes:**
- Used `/* eslint-disable no-restricted-imports */` for RN TextInput import since this is the wrapper component itself
- SearchInput's `onSearch` and `debounceMs` props are reserved for future integration with debounce hook
- TextArea uses dynamic style function for minHeight based on numberOfLines

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 015 - Card Components - KnowledgeCard Base Structure

**Completed:** 2026-04-07

**Summary:**
Created the base card component structure for knowledge cards with flexible, composable components. Built BaseCard (container with elevated/outlined/filled variants), CardImage (image display), CardContent (title/description/metadata), CardActions (button container), and KnowledgeCard (composite component). All components use theme colors and proper accessibility attributes.

**Files Created:**
- `app/components/cards/BaseCard.tsx` — Container with 3 variants (elevated/outlined/filled), pressable support via Pressable
- `app/components/cards/CardImage.tsx` — Image component with configurable height, resize mode, and accessibility
- `app/components/cards/CardContent.tsx` — Title (via Heading), description (via Body), and metadata (via Caption) with i18n support
- `app/components/cards/CardActions.tsx` — Horizontal/vertical layout for action buttons
- `app/components/cards/KnowledgeCard.tsx` — Composite component combining all sub-components with compound export pattern
- `app/components/cards/index.ts` — Barrel export for all card components

**Notes:**
- Fixed TypeScript type issue: used `StyleProp<ViewStyle>` instead of `ThemedStyleArray` for style props after `themed()` resolution
- CardContent properly types `titleTx` and `descriptionTx` with `TxKeyPath` for i18n type safety
- KnowledgeCard uses compound component pattern (`KnowledgeCard.Base`, `.Image`, `.Content`, `.Actions`) for flexible usage

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 014 - Text Components - Custom Text, Heading, Caption

**Completed:** 2026-04-07

**Summary:**
Created a set of text components providing consistent typography across the app: Heading (4 levels), Body (3 variants + secondary), Caption, and Label (default + badge). Extended base Text component with semantic `color` prop.

**Files Created:**
- `app/components/text/Heading.tsx` — 4 heading levels (h1-h4) for titles and section headers
- `app/components/text/Body.tsx` — 3 variants (large/default/small) with optional muted secondary color
- `app/components/text/Caption.tsx` — Small metadata text with dimmed color
- `app/components/text/Label.tsx` — Form labels and uppercase badge variant
- `app/components/text/index.ts` — Barrel export

**Files Modified:**
- `app/components/Text.tsx` — Added `color` prop supporting semantic color names (`textDim`, `text`, `tint`, `tintInactive`, `error`, `errorBackground`)

**Notes:**
- All components extend base `Text` component, inheriting i18n (`tx` prop) and theme integration
- Inline styles extracted to named style objects for ESLint compliance
- Weight values use `"normal"` (not `"regular"`) to match typography config

**Verification:**
- TypeScript compiles without errors (`npm run compile` exit code 0)
- ESLint passes (`npm run lint` exit code 0)

### Feature 013 - Button Components - Base, Primary, Secondary, Outline, IconButton

**Completed:** 2026-04-07

**Summary:**
Created a set of button components providing consistent styling across the app: BaseButton (core button with variants and sizes), PrimaryButton, SecondaryButton, OutlineButton, and IconButton. All buttons support loading states, disabled states, and i18n.

### Feature 012 - User Profile Service - CRUD Operations

**Completed:** 2026-04-06

**Summary:**
Created the user profile service with Supabase integration for managing user profiles, preferences, and language settings.
