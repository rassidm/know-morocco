# Current Feature

## Feature: User Profile Service - CRUD Operations

**Feature ID:** 012
**Phase:** 2 - Authentication & User Management
**Dependencies:** 005 (Supabase Client), 006 (Auth Context), 009 (Auth Service)

## Status

<!-- Not Started | In Progress | Completed -->

Not Started

## Goals

Create the user profile service that manages user profile data in Supabase. This feature handles creating, reading, updating, and deleting user profiles after authentication, including preferences like language selection and theme.

### Acceptance Criteria

- [ ] UserProfile type defined with all fields
- [ ] createProfile function creates user record in Supabase
- [ ] getProfile function fetches user profile
- [ ] updateProfile function updates user preferences
- [ ] deleteProfile function removes user data
- [ ] Profile auto-created on first login
- [ ] Error handling for all operations
- [ ] Profile service tested with mock data

## Notes

- Profile should be auto-created on first login to avoid empty states
- Language preference will be used by Feature 037 (Language Service)
- Consider adding profile caching for offline access
- RLS policies should allow users to read/update their own profile only
- Estimated Time: 45 minutes

## History

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

### Feature 012 - User Profile Service - CRUD Operations
