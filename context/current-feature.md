# Current Feature

## Feature: Input Components - TextInput, SearchInput

**Feature ID:** 016
**Phase:** 3 - Core UI Components
**Dependencies:** 002 (Theme System)

## Status

<!-- Not Started | In Progress | Completed -->

Completed

## Goals

Create input components for the Know Morocco app, including a base TextInput component and a specialized SearchInput component. These components will provide consistent form styling, validation support, accessibility, and proper theme integration for all text input needs throughout the application.

### Acceptance Criteria

- [x] Base TextInput component with label and error support
- [x] SearchInput component with search icon and clear button
- [x] Input validation error display
- [x] Disabled and readonly states
- [x] Placeholder text styling
- [x] Focus state visual feedback
- [x] All inputs use theme colors
- [x] Accessibility labels supported

## Notes

- TextInput uses forwardRef to support imperative methods
- Consider adding character count limit in the future
- SearchInput could integrate with debounce hook for performance
- Validation logic will be handled by parent components or forms
- Estimated Time: 30 minutes

## History

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
