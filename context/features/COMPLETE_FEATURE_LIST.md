# Know Morocco - Complete Feature List

## Overview

This document provides a complete list of all 62 features needed to build the Know Morocco app. Each feature is numbered and organized by phase. Features marked with **(Created)** have detailed implementation files in the `context/features/` folder.

---

## Phase 1: Foundation Setup (Features 1-8) ✅ COMPLETE

| ID | Feature Name | Status | File |
|----|--------------|--------|------|
| 001 | Project Configuration and Environment Setup | ✅ Created | `001-project-configuration.md` |
| 002 | Theme System and Design Tokens | ✅ Created | `002-theme-system.md` |
| 003 | Navigation Foundation Setup | ✅ Created | `003-navigation-foundation.md` |
| 004 | Internationalization (i18n) Setup | ✅ Created | `004-internationalization-setup.md` |
| 005 | Supabase Client and Database Setup | ✅ Created | `005-supabase-client.md` |
| 006 | Authentication Context and State Management | ✅ Created | `006-auth-context.md` |
| 007 | Storage Layer - MMKV Setup | ✅ Created | `007-storage-layer.md` |
| 008 | Zustand Store Setup | ✅ Created | `008-zustand-store.md` |

**Phase 1 Milestone:** App launches with navigation, theme, and basic infrastructure

---

## Phase 2: Authentication & User Management (Features 9-12)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 009 | Auth Service - Google OAuth Integration | Not Started | 45 min |
| 010 | Login Screen UI with Mock Data | Not Started | 30 min |
| 011 | Auth Wiring - Connect Login to Service | Not Started | 30 min |
| 012 | User Profile Service - CRUD Operations | Not Started | 45 min |

**Phase 2 Milestone:** Users can sign in with Google and profile is created

### Feature Dependencies
- 009 depends on: 005, 006
- 010 depends on: 002, 003, 004
- 011 depends on: 009, 010
- 012 depends on: 005, 006

---

## Phase 3: Core UI Components (Features 13-18)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 013 | Button Components - Primary, Secondary, Icon | Not Started | 45 min |
| 014 | Text Components - Custom Text, Heading, Caption | Not Started | 30 min |
| 015 | Card Components - KnowledgeCard Base Structure | Not Started | 45 min |
| 016 | Input Components - TextInput, SearchInput | Not Started | 30 min |
| 017 | Loading Components - Spinner, Skeleton | Not Started | 30 min |
| 018 | Icon Components - Icon Wrapper, Category Icons | Not Started | 30 min |

**Phase 3 Milestone:** Complete component library ready for screens

### Feature Dependencies
- 013 depends on: 002
- 014 depends on: 002
- 015 depends on: 013, 014
- 016 depends on: 002
- 017 depends on: 002
- 018 depends on: 002

---

## Phase 4: Knowledge Cards System (Features 19-24)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 019 | Knowledge Card Model - TypeScript Interfaces | Not Started | 30 min |
| 020 | Card Content Display - Title, Description, Image | Not Started | 45 min |
| 021 | Audio Player Component - Play/Pause Controls | Not Started | 45 min |
| 022 | Card Swipe Navigation - Gesture Handling | Not Started | 60 min |
| 023 | Category Filter - Filter Chips, Selection | Not Started | 30 min |
| 024 | Home Screen - Main Feed with Mock Cards | Not Started | 60 min |

**Phase 4 Milestone:** Knowledge cards display and interact with mock data

### Feature Dependencies
- 019 depends on: 001
- 020 depends on: 015, 019
- 021 depends on: 020
- 022 depends on: 020
- 023 depends on: 019
- 024 depends on: 020, 021, 022, 023

---

## Phase 5: Database Schema & Models (Features 25-29)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 025 | Supabase Schema - SQL Migrations | Not Started | 60 min |
| 026 | RLS Policies - Row-Level Security | Not Started | 45 min |
| 027 | WatermelonDB Schema - Local Database | Not Started | 60 min |
| 028 | Database Models - KnowledgeCard, Category, User | Not Started | 45 min |
| 029 | Database Service - CRUD Operations | Not Started | 60 min |

**Phase 5 Milestone:** Database layer ready for data operations

### Feature Dependencies
- 025 depends on: 005
- 026 depends on: 025
- 027 depends on: 001
- 028 depends on: 027
- 029 depends on: 005, 028

---

## Phase 6: Content Management (Features 30-35)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 030 | Knowledge Card Service - Fetch from Supabase | Not Started | 45 min |
| 031 | Category Service - Fetch and Cache | Not Started | 30 min |
| 032 | Content Sync Service - Bidirectional Sync | Not Started | 90 min |
| 033 | Sync Queue - Pending Operations | Not Started | 45 min |
| 034 | Home Screen Integration - Real Data | Not Started | 60 min |
| 035 | Pull-to-Refresh - Manual Sync Trigger | Not Started | 30 min |

**Phase 6 Milestone:** Real content loads from Supabase

### Feature Dependencies
- 030 depends on: 005, 019
- 031 depends on: 005
- 032 depends on: 030, 031
- 033 depends on: 032
- 034 depends on: 024, 030
- 035 depends on: 034

---

## Phase 7: Language Selection (Features 36-39)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 036 | Language Selector UI - Modal/Screen | Not Started | 45 min |
| 037 | Language Service - i18n Integration | Not Started | 30 min |
| 038 | Profile Language Sync - Save to Supabase | Not Started | 30 min |
| 039 | Content Localization - Dynamic Translation | Not Started | 45 min |

**Phase 7 Milestone:** Users can switch languages and content updates

### Feature Dependencies
- 036 depends on: 004, 002
- 037 depends on: 004, 008
- 038 depends on: 037, 012
- 039 depends on: 037, 030

---

## Phase 8: Location Services (Features 40-44)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 040 | Location Permission - Request UI | Not Started | 30 min |
| 041 | Location Service - Background Geolocation | Not Started | 90 min |
| 042 | Geofence Detection - Enter/Exit Events | Not Started | 60 min |
| 043 | Nearby Content Logic - Filter by Distance | Not Started | 45 min |
| 044 | Nearby Screen - Manual Browse UI | Not Started | 60 min |

**Phase 8 Milestone:** Location-based content triggering works

### Feature Dependencies
- 040 depends on: 001
- 041 depends on: 040
- 042 depends on: 041
- 043 depends on: 030, 041
- 044 depends on: 043

---

## Phase 9: Offline Mode (Features 45-49)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 045 | Network Detection - Online/Offline Hook | Not Started | 30 min |
| 046 | Offline Indicator - UI Banner | Not Started | 30 min |
| 047 | Content Preload - Download for Offline | Not Started | 60 min |
| 048 | Auto-Sync on Reconnect | Not Started | 45 min |
| 049 | Conflict Resolution - Last-Write-Wins | Not Started | 45 min |

**Phase 9 Milestone:** App works fully offline

### Feature Dependencies
- 045 depends on: 001
- 046 depends on: 045
- 047 depends on: 030, 027
- 048 depends on: 045, 032
- 049 depends on: 032

---

## Phase 10: AdMob Integration (Features 50-53)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 050 | AdMob Configuration - App IDs, Init | Not Started | 30 min |
| 051 | Banner Ad Component - Bottom Banner | Not Started | 45 min |
| 052 | Interstitial Ad Logic - After 4 Cards | Not Started | 45 min |
| 053 | ATT Prompt - iOS App Tracking Transparency | Not Started | 30 min |

**Phase 10 Milestone:** Ads display correctly

### Feature Dependencies
- 050 depends on: 001
- 051 depends on: 050
- 052 depends on: 051, 008
- 053 depends on: 050

---

## Phase 11: Profile & Settings (Features 54-57)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 054 | Profile Screen - User Info, Avatar | Not Started | 45 min |
| 055 | Settings Screen - App Settings UI | Not Started | 45 min |
| 056 | Favorites Feature - Save Cards | Not Started | 45 min |
| 057 | Logout Flow - Clear Data, Sign Out | Not Started | 30 min |

**Phase 11 Milestone:** Complete profile management

### Feature Dependencies
- 054 depends on: 006, 012
- 055 depends on: 054
- 056 depends on: 008, 030
- 057 depends on: 006, 007

---

## Phase 12: Polish & Testing (Features 58-62)

| ID | Feature Name | Status | Estimated Time |
|----|--------------|--------|----------------|
| 058 | Error Handling - Error Boundaries | Not Started | 45 min |
| 059 | Loading States - Skeleton Screens | Not Started | 45 min |
| 060 | Animations - Card Transitions | Not Started | 60 min |
| 061 | Unit Tests - Component and Service Tests | Not Started | 120 min |
| 062 | E2E Tests - Maestro Flow Tests | Not Started | 120 min |

**Phase 12 Milestone:** Production-ready app

### Feature Dependencies
- 058 depends on: 002
- 059 depends on: 017
- 060 depends on: 022
- 061 depends on: All previous features
- 062 depends on: All previous features

---

## Implementation Order

### Recommended Sequence

```
Week 1-2: Phase 1 + Phase 2
├── 001 → 002 → 003 → 004 → 005 → 006 → 007 → 008
└── 009 → 010 → 011 → 012

Week 3-4: Phase 3 + Phase 4
├── 013 → 014 → 015 → 016 → 017 → 018
└── 019 → 020 → 021 → 022 → 023 → 024

Week 5-6: Phase 5 + Phase 6
├── 025 → 026 → 027 → 028 → 029
└── 030 → 031 → 032 → 033 → 034 → 035

Week 7: Phase 7 + Phase 8
├── 036 → 037 → 038 → 039
└── 040 → 041 → 042 → 043 → 044

Week 8: Phase 9
└── 045 → 046 → 047 → 048 → 049

Week 9: Phase 10
└── 050 → 051 → 052 → 053

Week 10: Phase 11
└── 054 → 055 → 056 → 057

Week 11-12: Phase 12
└── 058 → 059 → 060 → 061 → 062
```

---

## Total Estimated Time

| Phase | Features | Estimated Time |
|-------|----------|----------------|
| Phase 1 | 8 | 4.5 hours |
| Phase 2 | 4 | 2.5 hours |
| Phase 3 | 6 | 3.5 hours |
| Phase 4 | 6 | 4.5 hours |
| Phase 5 | 5 | 4.5 hours |
| Phase 6 | 6 | 4.5 hours |
| Phase 7 | 4 | 2.5 hours |
| Phase 8 | 5 | 4.5 hours |
| Phase 9 | 5 | 3.5 hours |
| Phase 10 | 4 | 2.5 hours |
| Phase 11 | 4 | 2.5 hours |
| Phase 12 | 5 | 6.5 hours |
| **Total** | **62** | **~46 hours** |

Note: This is implementation time only. Add 20-30% for testing, debugging, and iteration.

---

## Critical Path

The following features form the critical path (must be completed in order):

```
001 → 005 → 006 → 009 → 011 → 013 → 015 → 019 → 020 → 024 → 030 → 034
```

Any delay in these features will delay the entire project.

---

## Next Steps

1. Start with Feature 009 (Auth Service)
2. Follow the numerical order
3. Complete each feature's testing checklist before moving on
4. Commit after each feature is complete
5. Run `npm run compile` and `npm run lint` frequently

---

## Feature File Template

All feature files follow the template in `context/features/feature-template.md`:

- Metadata (ID, Phase, Dependencies, Time)
- Goals and Acceptance Criteria
- Implementation Steps (with file paths)
- Mock Data (if applicable)
- Integration Points
- Testing Checklist
- Notes and References
