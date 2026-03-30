# Know Morocco - Implementation Blueprint

## Executive Summary

This blueprint provides a detailed, step-by-step plan for building the Know Morocco mobile application - a React Native app that delivers location-based cultural content to tourists visiting Morocco for the 2030 World Cup.

**Product Vision:** "Walk through Morocco and discover its rich heritage automatically – no searching required. Your personal cultural guide that works even without internet."

---

## Architecture Overview

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React Native + Expo | Cross-platform mobile app |
| **Navigation** | React Navigation v7 | Stack + Bottom Tabs |
| **State** | Zustand + React Context | App state + Auth/Theme |
| **Local DB** | WatermelonDB | Offline-first caching |
| **Preferences** | MMKV | Fast key-value storage |
| **Backend** | Supabase | Auth, Database, Storage |
| **Location** | react-native-background-geolocation | Geofencing |
| **Ads** | react-native-google-mobile-ads | Monetization |
| **i18n** | i18next | Multi-language support |

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      React Native App                        │
├─────────────────────────────────────────────────────────────┤
│  UI Components   │  Screens         │  Navigators           │
│  - Cards         │  - Auth          │  - Auth Stack         │
│  - Buttons       │  - Home          │  - App Stack          │
│  - Inputs        │  - Profile       │  - Bottom Tabs        │
│                  │  - Nearby        │                       │
├─────────────────────────────────────────────────────────────┤
│  Context         │  Store           │  Hooks                │
│  - AuthContext   │  - useAppStore   │  - useLocation        │
│  - ThemeContext  │  - Sync Queue    │  - useSync            │
│                  │                  │  - useAds             │
├─────────────────────────────────────────────────────────────┤
│  Services        │  Database        │  Config               │
│  - Supabase      │  - WatermelonDB  │  - Env                │
│  - apisauce      │  - Models        │  - Feature Flags      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                        │
├─────────────────────────────────────────────────────────────┤
│  Auth (Google OAuth) │  PostgreSQL  │  Storage (Images/Audio)│
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Foundation Setup (Features 1-8)
**Goal:** Establish project infrastructure, configuration, and basic navigation

| Feature | Name | Description |
|---------|------|-------------|
| 001 | Project Configuration | Environment variables, app config, path aliases |
| 002 | Theme System | Design tokens, colors, typography, theming context |
| 003 | Navigation Foundation | Auth stack, App stack, Bottom tabs structure |
| 004 | i18n Setup | Multi-language configuration (en, fr, es) |
| 005 | Supabase Client | Database connection, environment config |
| 006 | Auth Context | Authentication state management, session persistence |
| 007 | Storage Layer | MMKV for preferences, basic hooks |
| 008 | Zustand Store | App-wide state management |

**Milestone:** App launches with navigation, theme, and basic infrastructure

---

### Phase 2: Authentication & User Management (Features 9-12)
**Goal:** Implement Google OAuth authentication and user profile management

| Feature | Name | Description |
|---------|------|-------------|
| 009 | Auth Service | Supabase auth integration, Google OAuth |
| 010 | Login Screen | Google sign-in UI with mock data |
| 011 | Auth Wiring | Connect login screen to auth service |
| 012 | User Profile Service | User CRUD operations, profile sync |

**Milestone:** Users can sign in with Google and profile is created

---

### Phase 3: Core UI Components (Features 13-18)
**Goal:** Build reusable UI component library with mock data

| Feature | Name | Description |
|---------|------|-------------|
| 013 | Button Components | Primary, secondary, icon buttons with theming |
| 014 | Text Components | Custom Text, Heading, Caption components |
| 015 | Card Components | KnowledgeCard base structure with mock data |
| 016 | Input Components | TextInput, SearchInput with validation |
| 017 | Loading Components | Spinner, Skeleton loaders |
| 018 | Icon Components | Icon wrapper, category icons |

**Milestone:** Complete component library ready for screens

---

### Phase 4: Knowledge Cards System (Features 19-24)
**Goal:** Implement knowledge card display with mock content

| Feature | Name | Description |
|---------|------|-------------|
| 019 | Knowledge Card Model | TypeScript interfaces, mock data factory |
| 020 | Card Content Display | Title, description, image with placeholder |
| 021 | Audio Player Component | Play/pause controls, progress bar |
| 022 | Card Swipe Navigation | Gesture handling, dismiss animation |
| 023 | Category Filter | Filter chips, category selection UI |
| 024 | Home Screen | Main feed with mock cards |

**Milestone:** Knowledge cards display and interact with mock data

---

### Phase 5: Database Schema & Models (Features 25-29)
**Goal:** Set up WatermelonDB and Supabase database schemas

| Feature | Name | Description |
|---------|------|-------------|
| 025 | Supabase Schema | SQL migrations for all tables |
| 026 | RLS Policies | Row-level security configuration |
| 027 | WatermelonDB Schema | Local database schema definition |
| 028 | Database Models | KnowledgeCard, Category, User models |
| 029 | Database Service | CRUD operations, query helpers |

**Milestone:** Database layer ready for data operations

---

### Phase 6: Content Management (Features 30-35)
**Goal:** Connect knowledge cards to real data from Supabase

| Feature | Name | Description |
|---------|------|-------------|
| 030 | Knowledge Card Service | Fetch cards from Supabase |
| 031 | Category Service | Fetch and cache categories |
| 032 | Content Sync Service | Bidirectional sync logic |
| 033 | Sync Queue | Pending operations queue |
| 034 | Home Screen Integration | Replace mock data with real data |
| 035 | Pull-to-Refresh | Manual sync trigger |

**Milestone:** Real content loads from Supabase

---

### Phase 7: Language Selection (Features 36-39)
**Goal:** Implement multi-language support and user preference

| Feature | Name | Description |
|---------|------|-------------|
| 036 | Language Selector UI | Language selection modal/screen |
| 037 | Language Service | i18n integration, language switching |
| 038 | Profile Language Sync | Save preference to Supabase |
| 039 | Content Localization | Dynamic content translation |

**Milestone:** Users can switch languages and content updates

---

### Phase 8: Location Services (Features 40-44)
**Goal:** Implement geofencing and location-based content

| Feature | Name | Description |
|---------|------|-------------|
| 040 | Location Permission | Permission request UI and logic |
| 041 | Location Service | Background geolocation setup |
| 042 | Geofence Detection | Enter/exit event handling |
| 043 | Nearby Content Logic | Filter cards by distance |
| 044 | Nearby Screen | Manual browse nearby UI |

**Milestone:** Location-based content triggering works

---

### Phase 9: Offline Mode (Features 45-49)
**Goal:** Full offline functionality with sync

| Feature | Name | Description |
|---------|------|-------------|
| 045 | Network Detection | Online/offline status hook |
| 046 | Offline Indicator | UI banner for offline state |
| 047 | Content Preload | Download all content for city/region |
| 048 | Auto-Sync on Reconnect | Background sync trigger |
| 049 | Conflict Resolution | Last-write-wins implementation |

**Milestone:** App works fully offline

---

### Phase 10: AdMob Integration (Features 50-53)
**Goal:** Monetization with banner and interstitial ads

| Feature | Name | Description |
|---------|------|-------------|
| 050 | AdMob Configuration | App IDs, test IDs, initialization |
| 051 | Banner Ad Component | Bottom banner integration |
| 052 | Interstitial Ad Logic | Show after 4 cards, frequency cap |
| 053 | ATT Prompt | iOS App Tracking Transparency |

**Milestone:** Ads display correctly

---

### Phase 11: Profile & Settings (Features 54-57)
**Goal:** User profile management and app settings

| Feature | Name | Description |
|---------|------|-------------|
| 054 | Profile Screen | User info display, avatar |
| 055 | Settings Screen | App settings UI |
| 056 | Favorites Feature | Save favorite cards |
| 057 | Logout Flow | Clear data, sign out |

**Milestone:** Complete profile management

---

### Phase 12: Polish & Testing (Features 58-62)
**Goal:** Final polish, testing, and launch preparation

| Feature | Name | Description |
|---------|------|-------------|
| 058 | Error Handling | Global error boundaries, user feedback |
| 059 | Loading States | Skeleton screens, progress indicators |
| 060 | Animations | Card transitions, micro-interactions |
| 061 | Unit Tests | Component and service tests |
| 062 | E2E Tests | Maestro flow tests |

**Milestone:** Production-ready app

---

## Feature Dependencies Graph

```
Phase 1 (Foundation)
├── 001 → 002 → 003 → 004
├── 001 → 005 → 006
├── 001 → 007 → 008
└── All Phase 1 features → Phase 2+

Phase 2 (Auth)
├── 006 → 009 → 010 → 011
└── 011 → Phase 3+

Phase 3 (Components)
├── 002 → 013 → 014 → 015 → 016 → 017 → 018
└── All → Phase 4

Phase 4 (Cards)
├── 015 → 019 → 020 → 021 → 022 → 023 → 024
└── 024 → Phase 6

Phase 5 (Database)
├── 005 → 025 → 026 → 027 → 028 → 029
└── 029 → Phase 6

Phase 6 (Content)
├── 024 + 029 → 030 → 031 → 032 → 033 → 034 → 035
└── 034 → Phase 7

Phase 7 (Language)
├── 004 → 036 → 037 → 038 → 039
└── 039 → Phase 8

Phase 8 (Location)
├── 034 → 040 → 041 → 042 → 043 → 044
└── 044 → Phase 9

Phase 9 (Offline)
├── 032 → 045 → 046 → 047 → 048 → 049
└── 049 → Phase 10

Phase 10 (Ads)
├── 001 → 050 → 051 → 052 → 053
└── 051 → Phase 11

Phase 11 (Profile)
├── 006 → 054 → 055 → 056 → 057
└── 057 → Phase 12

Phase 12 (Polish)
└── 058 → 059 → 060 → 061 → 062
```

---

## Development Workflow

### For Each Feature

1. **Read the feature file** - Understand goals and requirements
2. **Create/modify components** - Build UI with mock data first
3. **Test with mock data** - Verify UI works correctly
4. **Implement backend logic** - Add services, database operations
5. **Replace mock data** - Connect UI to real data
6. **Wire into app** - Integrate with navigation and state
7. **Test end-to-end** - Verify feature works in context

### Best Practices

- **Small iterations** - Each feature should be completable in 1-2 hours
- **Test as you go** - Run lint and compile after each change
- **Commit frequently** - Git commit after each feature completes
- **No hanging code** - Every feature integrates with previous work
- **Mock first** - UI with mock data before backend logic

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Build succeeds | No TypeScript errors, no lint errors |
| App launches | Runs on iOS simulator and Android emulator |
| Navigation works | All screens accessible |
| Auth works | Google sign-in creates user |
| Content displays | Knowledge cards show real data |
| Offline works | App functions without internet |
| Location works | Geofencing triggers content |
| Ads display | Banner and interstitial ads show |

---

## Next Steps

1. Start with **Feature 001** - Project Configuration
2. Follow the feature files in numerical order
3. Each feature file contains:
   - Goals and requirements
   - Step-by-step implementation tasks
   - Mock data (if applicable)
   - Integration points
   - Testing checklist

**Begin implementation with feature file: `context/features/001-project-configuration.md`**
