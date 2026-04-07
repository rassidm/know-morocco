# Current Feature

## Feature: Loading Components - Spinner, Skeleton

**Feature ID:** 017
**Phase:** 3 - Core UI Components
**Dependencies:** 002 (Theme System)

## Status

<!-- Not Started | In Progress | Completed -->

Completed

## Goals

Create loading indicator components for the Know Morocco app, including a Spinner component for indeterminate loading states and Skeleton components for content placeholder during async operations. These components provide visual feedback to users while content is being fetched or processed.

### Acceptance Criteria

- [x] Spinner component with size variants
- [x] Skeleton component for content placeholder
- [x] SkeletonLine variant for text blocks
- [x] SkeletonImage variant for image placeholders
- [x] Animation for loading states
- [x] Theme-aware colors
- [x] Accessible loading indicators
- [x] Composable loading screen component

## Notes

- Spinner uses Animated API for smooth rotation animation
- Skeleton uses pulse animation for visual feedback
- Consider using react-native-reanimated for better performance in the future
- Loading states should be replaced with actual content when data loads
- Estimated Time: 30 minutes

## History

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
