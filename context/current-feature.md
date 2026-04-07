# Current Feature

## Status

<!-- Not Started | In Progress | Completed -->

Not Started

## Goals

<!-- Add feature goals here -->

## Notes

<!-- Add any notes about the feature -->

## History

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
