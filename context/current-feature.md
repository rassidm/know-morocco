# Current Feature

## Status

Complete

## Goals

Implement the complete theme system for Know Morocco with Moroccan-inspired design tokens, including colors, typography, spacing, and a theming context that supports light/dark mode.

### Acceptance Criteria
- [x] Design tokens defined (colors, spacing, typography)
- [x] Theme context provider created with light/dark mode support
- [x] `useAppTheme` hook created for accessing theme
- [x] `themed()` helper function for styling components
- [x] Theme persistence with MMKV
- [x] Dark mode colors defined
- [x] Typography scale implemented
- [x] Spacing scale implemented

## Notes

- Adapted the spec to work with the existing Ignite boilerplate theme architecture
- The existing `ThemedStyle<T>` function-based API was preserved (used by 74+ files)
- Moroccan-inspired colors replaced the default Ignite palette
- `angry500` palette color renamed to `error500` for consistency

## History

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
