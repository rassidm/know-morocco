# Know Morocco - Project Context

## Project Overview

**Know Morocco** is a React Native mobile application built with the [Ignite](https://github.com/infinitered/ignite) boilerplate from Infinite Red. The app is designed to showcase information about Morocco's monuments, food/restaurants, history, and culture, specifically targeting tourists visiting Morocco for the 2030 World Cup.

### Product Vision
> "Walk through Morocco and discover its rich heritage automatically – no searching required. Your personal cultural guide that works even without internet."

### Core Objectives
| Objective | Success Metric |
|-----------|---------------|
| Deliver location-based cultural content | Users receive relevant knowledge cards within 100m of points of interest |
| Support offline access | 100% of content accessible without internet after initial load |
| Generate ad revenue | AdMob integration with banner + interstitial ads |
| Launch before World Cup 2030 | MVP ready 3 months before event start |

---

## Tech Stack

### Mobile Application
| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | React Native with Expo | 0.83.4 / SDK ~55.0.9 |
| **Language** | TypeScript | ~5.9.2 |
| **Navigation** | React Navigation | v7 (Native Stack + Bottom Tabs) |
| **State Management** | React Context + Zustand | Context for Auth/Theme, Zustand for app state |
| **Styling** | NativeWind (Tailwind for RN) + Custom theming | Design tokens with Moroccan-inspired colors |
| **Local Storage** | WatermelonDB + MMKV | WatermelonDB for offline-first data, MMKV for preferences |
| **Internationalization** | i18next with react-i18next | English, French, Spanish |
| **Forms** | React Hook Form | Boilerplate ready |
| **Animation** | react-native-reanimated, react-native-worklets | v3+ |
| **Fonts** | Space Grotesk (via @expo-google-fonts) | System fonts fallback |

### Backend & Services
| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend/BaaS** | Supabase | PostgreSQL database, authentication, file storage |
| **Authentication** | Supabase Auth + Google OAuth 2.0 | JWT sessions, persistent login |
| **Local Database** | WatermelonDB | Offline-first architecture with bidirectional sync |
| **Location/Geofencing** | react-native-background-geolocation | 100m geofence radius, background location |
| **Ads** | react-native-google-mobile-ads | Banner + Interstitial ads (AdMob) |
| **File Storage** | Supabase Storage | Images and audio files for knowledge cards |

### Development Environment
| Tool | Purpose |
|------|---------|
| Expo | App development and testing |
| Supabase Studio | Database management and RLS policies |
| Android Studio | Android emulator and builds |
| Xcode | iOS simulator and builds (macOS required) |
| Git + GitHub | Version control |
| Reactotron | Debugging in development |

### Testing Stack
| Type | Tool |
|------|------|
| **Unit Tests** | Jest with @testing-library/react-native |
| **E2E Testing** | Maestro |
| **Test Files** | Located in `test/` directory |

---

## Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                      React Native App                        │
│  (Android + iOS - Single Codebase)                          │
├─────────────────────────────────────────────────────────────┤
│  UI Layer        │  State Management  │  Local Storage      │
│  - React Native  │  - React Context   │  - WatermelonDB     │
│  - Native Wind   │  - Zustand         │  - MMKV             │
│                  │                    │                     │
│  Services        │  Native Modules    │  AdMob              │
│  - Supabase      │  - Location        │  - Google Mobile    │
│  - Auth          │  - Geofencing      │    Ads              │
│                  │  - Notifications   │                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS / Real-time
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                        │
├─────────────────────────────────────────────────────────────┤
│  Auth            │  Database        │  Storage              │
│  - Google OAuth  │  - PostgreSQL    │  - Images             │
│  - JWT Sessions  │  - RLS Policies  │  - Audio Files        │
└─────────────────────────────────────────────────────────────┘
```

### Folder Structure
```
app/
├── components/         # Reusable UI components (cards, buttons, inputs)
├── config/             # App configuration (Supabase, AdMob, feature flags)
├── context/            # React Context providers (Auth, Theme)
├── devtools/           # Reactotron configuration
├── i18n/               # Internationalization setup (en, fr, es)
├── navigators/         # React Navigation setup (Auth Stack, App Stack, Tabs)
├── screens/            # Screen components
│   ├── Auth/           # Login screen (Google OAuth)
│   ├── Home/           # Knowledge card feed, swipe navigation
│   ├── Nearby/         # Manual location browse
│   ├── Profile/        # User settings, language preference, favorites
│   └── Offline/        # Offline mode indicator screens
├── services/           # API services (Supabase client, apisauce)
├── store/              # Zustand stores (app state, sync queue)
├── db/                 # WatermelonDB schema and models
├── theme/              # Design tokens, colors, typography
├── hooks/              # Custom hooks (useLocation, useSync, useAds)
└── utils/              # Utility functions (formatting, helpers)

assets/
├── images/             # Static images, icons, category icons
├── audio/              # Local audio files (if any)
└── fonts/              # Custom fonts

test/
├── setup.ts            # Global test configuration
├── components/         # Component unit tests
├── screens/            # Screen tests
└── e2e/                # Maestro flow tests

.maestro/
└── flows/              # E2E test flows
```

### Key Architectural Patterns
- **Path Aliases:** `@/*` maps to `./app/*`, `@assets/*` maps to `./assets/*`
- **Custom Hooks:** Extensive use of hooks for theming (`useAppTheme`), navigation persistence, storage, location, and sync
- **Navigation Persistence:** App state is persisted across sessions using MMKV
- **Theming:** Dual light/dark mode support with imperative theming capabilities
- **Offline-First:** Local WatermelonDB is the source of truth; syncs with Supabase when online
- **Sync Queue:** Pending operations queued locally and synced when connection restored

---

## Data Model

### Supabase Database Schema

#### `users` Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | References: auth.users |
| email | text (unique) | User email from Google OAuth |
| name | text | User display name |
| avatar_url | text | Google profile picture URL |
| preferred_language | enum | 'en', 'fr', 'es' |
| created_at | timestamp | Account creation time |

#### `categories` Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Category identifier |
| name | text | Enum: 'monuments', 'food', 'history', 'culture' |
| icon | text | URL to category icon |
| display_order | int | Sort order in UI |

#### `knowledge_cards` Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Card identifier |
| category_id | uuid (FK) | References: categories.id |
| title_en/fr/es | text | Localized titles |
| description_en/fr/es | text | Localized descriptions |
| image_url | text | Supabase storage URL |
| audio_url | text | Supabase storage URL |
| latitude | decimal | Location coordinate |
| longitude | decimal | Location coordinate |
| geofence_radius | int | Meters (default: 100) |
| city | text | For filtering/organization |
| is_active | boolean | Soft delete flag |
| created_at/updated_at | timestamp | Audit timestamps |

#### `user_interactions` Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Interaction identifier |
| user_id | uuid (FK) | References: users.id |
| knowledge_card_id | uuid (FK) | References: knowledge_cards.id |
| viewed_at | timestamp | When card was viewed |
| is_favorite | boolean | User-saved content |

### Row Level Security (RLS) Policies
| Table | Policy | Description |
|-------|--------|-------------|
| `users` | Users can read/update own profile | `auth.uid() = id` |
| `knowledge_cards` | Public read access | All authenticated users can read |
| `user_interactions` | Users can only access own interactions | `auth.uid() = user_id` |

### Local Storage Schema (WatermelonDB)
Mirror the Supabase schema locally with sync timestamps:
- `knowledge_cards_local` - Cached cards with `last_synced_at`
- `categories_local` - Cached categories
- `sync_queue` - Pending operations to sync when online

---

## Core Features

### 1. User Authentication
| Attribute | Specification |
|-----------|---------------|
| **Method** | Google OAuth 2.0 only |
| **Requirement** | Required for all users (no guest mode) |
| **Session** | Persistent login across app restarts |
| **Platform** | Supabase Auth |

### 2. Knowledge Cards Display
| Attribute | Specification |
|-----------|---------------|
| **Content Fields** | title, description, image, audio, category, location |
| **Categories** | Monuments, Food/Restaurants, History, Culture |
| **Languages** | French, English, Spanish (user selectable) |
| **Display Format** | Card-based UI with swipe navigation |

### 3. Location-Based Content Delivery (Hybrid Mode)
| Attribute | Specification |
|-----------|---------------|
| **Geofencing Radius** | 100 meters around point of interest |
| **Trigger** | Automatic notification when entering geofence |
| **Manual Mode** | User can browse nearby content without entering geofence |
| **Library** | `react-native-background-geolocation` |

### 4. Offline Mode & Data Synchronization
| Attribute | Specification |
|-----------|---------------|
| **Local Storage** | WatermelonDB for local caching |
| **Sync Strategy** | Local-first, bidirectional sync when online |
| **Content Preload** | All knowledge cards downloadable for offline access |
| **Sync Trigger** | Automatic on network reconnection |
| **Conflict Resolution** | Last write wins strategy |

### 5. AdMob Monetization
| Attribute | Specification |
|-----------|---------------|
| **Ad Network** | Google AdMob |
| **Ad Types** | Bottom banner (always visible) + Interstitial (after every 4 cards) |
| **Library** | `react-native-google-mobile-ads` |
| **Frequency Cap** | Interstitial maximum once per 5 minutes |

### 6. Language Selection
| Attribute | Specification |
|-----------|---------------|
| **Supported Languages** | English, French, Spanish |
| **Default** | Device language (if supported) or English |
| **Storage** | User preference saved in Supabase profile |

---

## UI Design System

### Color Palette (Moroccan-Inspired)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Moroccan Blue) | #1E5F9E | Headers, buttons, active states |
| Secondary (Terracotta) | #C17B5D | Accents, highlights, cards |
| Gold | #D4AF37 | Premium features, special markers |
| Background | #F8F5F0 | Main background |
| Text Primary | #2D2D2D | Body text |
| Text Secondary | #6B6B6B | Subtitles, captions |
| Success | #4CAF50 | Sync complete, positive actions |
| Warning | #FF9800 | Offline mode, cautions |
| Error | #F44336 | Error states, alerts |

### Typography
| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| Heading 1 | 24pt | Bold | Screen titles |
| Heading 2 | 20pt | Bold | Section headers |
| Body | 16pt | Regular | Main content |
| Caption | 14pt | Light | Metadata, timestamps |
| Font Family | System fonts | - | San Francisco (iOS), Roboto (Android) |

### Key Screens
| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| **Splash** | App loading | Logo, loading indicator |
| **Login** | Google OAuth | "Sign in with Google" button |
| **Home** | Knowledge card feed | Current card, swipe controls, category filter |
| **Language Select** | Choose app language | 3 language options with flags |
| **Nearby** | Manual location browse | List of nearby cards, distance indicator |
| **Profile** | User settings | Language preference, logout, favorites |
| **Offline Indicator** | Show connection status | Banner when offline |

---

## Building and Running

### Prerequisites
- Node.js >= 20.0.0
- npm (with `--legacy-peer-deps` flag for dependency installation)
- Expo CLI
- EAS CLI (for builds)
- Supabase account and project setup
- Google OAuth credentials (for Supabase Auth)
- AdMob account and app IDs (for production)

### Environment Variables
Create a `.env` file (not committed to git):
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
ADMOB_APP_ID=your_admob_app_id
ADMOB_BANNER_UNIT_ID=your_banner_ad_unit_id
ADMOB_INTERSTITIAL_UNIT_ID=your_interstitial_ad_unit_id
```

### Installation
```bash
npm install --legacy-peer-deps
```

### Development
```bash
# Start the development server
npm run start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Building for Production
```bash
# iOS
npm run build:ios:sim      # Simulator build
npm run build:ios:device   # Device build (development)
npm run build:ios:prod     # Production build

# Android
npm run build:android:sim     # Simulator build
npm run build:android:device  # Device build (development)
npm run build:android:prod    # Production build
```

### Code Quality
```bash
# Type checking
npm run compile

# Linting (auto-fix)
npm run lint

# Linting (check only)
npm run lint:check

# Dependency visualization
npm run depcruise              # Text output
npm run depcruise:graph        # SVG/PNG graph output

# Run tests
npm run test
npm run test:watch            # Watch mode

# E2E tests (Maestro)
npm run test:maestro
```

### ADB Reverse (Android Development)
```bash
npm run adb
```
Sets up ADB reverse for ports: 9090, 3000, 9001, 8081

---

## Development Conventions

### Code Style
- **ESLint:** Custom configuration extending `expo`, `@typescript-eslint/recommended`, `react-native/all`, and `prettier`
- **Prettier:**
  - Print width: 100
  - No semicolons
  - Double quotes
  - Trailing commas: all
- **TypeScript:** Strict mode enabled with `noImplicitAny`, `noImplicitReturns`, `noImplicitThis`

### Import Organization
Imports are ordered as follows:
1. React/React Native/Expo (external)
2. External libraries (Supabase, Zustand, AdMob, etc.)
3. Internal modules (`@/`)
4. Parent/sibling imports
5. Index imports

### Component Patterns
- **Functional Components:** All components use functional style with hooks
- **Custom Components:** Avoid direct `Text`, `Button`, `TextInput` from `react-native` - use custom wrappers from `@/components`
- **SafeAreaView:** Use from `react-native-safe-area-context`, not `react-native`
- **Theming:** Use `useAppTheme()` hook and `themed()` function for consistent styling

### Testing Practices
- **Unit Tests:** Jest with React Native Testing Library
- **Test Files:** Located in `test/` directory
- **Mock Setup:** `test/setup.ts` provides global test configuration
- **E2E:** Maestro flows in `.maestro/flows/`

### File Naming
- Components: PascalCase (e.g., `MyComponent.tsx`, `KnowledgeCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`, `syncData.ts`)
- Screens: PascalCase with `Screen` suffix (e.g., `LoginScreen.tsx`, `HomeScreen.tsx`)
- Navigators: PascalCase with `Navigator` suffix (e.g., `AppNavigator.tsx`)
- Models: PascalCase (e.g., `KnowledgeCard.ts`, `User.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`, `useLocation.ts`)

### Context Providers
The app uses several context providers wrapped around the root:
1. `SafeAreaProvider` - Safe area insets
2. `KeyboardProvider` - Keyboard handling
3. `AuthProvider` - Authentication state (Supabase)
4. `ThemeProvider` - Theme management (light/dark)
5. `QueryClientProvider` - React Query client (if used for Supabase queries)

### Internationalization
- i18next configured for multi-language support (en, fr, es)
- Locale-specific date formatting via `date-fns`
- Translation files in `app/i18n/` with structure:
  - `i18n.ts` - Main configuration
  - `en.ts`, `fr.ts`, `es.ts` - Language-specific translations
  - `translate.ts` - Translation helper functions

---

## Security Considerations

### Authentication Security
| Requirement | Implementation |
|-------------|----------------|
| Token Storage | Supabase SDK handles secure storage |
| Session Management | JWT tokens with automatic refresh |
| OAuth Scope | Request minimal permissions from Google |

### Data Security
| Requirement | Implementation |
|-------------|----------------|
| API Keys | Store in environment variables, never in code |
| Database Access | Row Level Security (RLS) on all tables |
| Data Transmission | HTTPS only (Supabase default) |
| Local Data | Encrypted storage for sensitive user data |

### Privacy Compliance
| Requirement | Implementation |
|-------------|----------------|
| Location Permission | Request with clear explanation of use |
| AdMob ATT (iOS) | App Tracking Transparency prompt on first launch |
| Data Retention | User data deleted on account deletion |
| Privacy Policy | Required for App Store and Play Store submission |

### AdMob Security
- Use official `react-native-google-mobile-ads` library
- Never click your own ads (violates AdMob policy)
- Implement frequency capping to prevent ad fraud
- Use test ad unit IDs during development

---

## Key Configuration Files

| File | Purpose |
|------|---------|
| `app.config.ts` | Expo configuration with custom plugins |
| `tsconfig.json` | TypeScript configuration with path aliases |
| `.eslintrc.js` | ESLint rules and overrides |
| `.prettierrc` | Prettier formatting rules |
| `jest.config.js` | Jest test configuration |
| `eas.json` | EAS Build profiles |
| `metro.config.js` | Metro bundler configuration |
| `.dependency-cruiser.js` | Dependency graph rules |
| `.env.example` | Environment variables template |

---

## Useful Patterns

### Accessing Theme
```typescript
import { useAppTheme } from "@/theme/context"

const { theme, themeContext, themed } = useAppTheme()
const styles = themed({ container: { flex: 1 } })
```

### Navigation
```typescript
import { useNavigation } from "@react-navigation/native"
import type { AppStackParamList } from "@/navigators/navigationTypes"

const navigation = useNavigation<AppStackParamList>()
navigation.navigate("Welcome")
```

### Storage (MMKV for preferences)
```typescript
import * as storage from "@/utils/storage"
import { useMMKVString } from "react-native-mmkv"

const [value, setValue] = useMMKVString("key", storage)
```

### Supabase Client
```typescript
import { createClient } from '@supabase/supabase-js'
import { ENV } from '@/config/env'

export const supabase = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_ANON_KEY
)
```

### Zustand Store Example
```typescript
import { create } from 'zustand'

interface AppState {
  language: 'en' | 'fr' | 'es'
  setLanguage: (lang: 'en' | 'fr' | 'es') => void
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}))
```

### WatermelonDB Model Example
```typescript
import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

class KnowledgeCard extends Model {
  static table = 'knowledge_cards'

  @field('title') title: string
  @field('description') description: string
  @field('image_url') imageUrl: string
  @field('audio_url') audioUrl: string
  @field('latitude') latitude: number
  @field('longitude') longitude: number
  @field('last_synced_at') lastSyncedAt: number

  @relation('categories', 'category_id') category: Category
}
```

---

## Development Phases

### Phase 1: Foundation (Weeks 1-4)
- Week 1: Project setup, Supabase configuration, Google OAuth integration
- Week 2: Database schema creation, RLS policies, basic navigation
- Week 3: Knowledge cards UI, language selection, content display
- Week 4: Local storage setup (WatermelonDB), basic offline capability

**Milestone:** User can log in, view cards, switch languages

### Phase 2: Location & Offline (Weeks 5-8)
- Week 5: Location services integration, geofencing setup
- Week 6: Automatic content triggering based on location
- Week 7: Offline sync implementation, content preloading
- Week 8: Testing and bug fixes for location/offline features

**Milestone:** Full offline functionality, location-based cards working

### Phase 3: Monetization & Polish (Weeks 9-12)
- Week 9: AdMob integration (banner ads)
- Week 10: Interstitial ads (after 4 cards), frequency capping
- Week 11: UI polish, animations, error handling
- Week 12: App Store/Play Store preparation, testing on devices

**Milestone:** Revenue-generating app ready for beta testing

### Phase 4: Launch (Weeks 13-16)
- Week 13: Beta testing with small user group
- Week 14: Bug fixes based on feedback
- Week 15: App Store and Play Store submission
- Week 16: Launch and monitoring

**Milestone:** Public launch on both app stores

---

## Notes

- The boilerplate includes demo screens (DemoShowroom, DemoDebug, DemoPodcastList, DemoCommunity) for reference
- Reactotron is configured for debugging in development only
- The app uses inline requires for performance optimization
- Privacy manifests are configured for iOS (NSPrivacyAccessedAPICategoryUserDefaults)
- iOS App Tracking Transparency (ATT) must be implemented for AdMob
- Test ad unit IDs should be used during development
- Location permission requires clear justification for background usage
- All content is served from Supabase (no app update needed for content changes)

---

## Implementation Resources

When implementing project features, **always consult these key documents** for detailed guidance:

| Document | Purpose | Location |
|----------|---------|----------|
| **Implementation Guide** | Complete guide for code-generation LLM with 62 feature files, step-by-step instructions, mock data patterns, and testing checklists | `IMPLEMENTATION_GUIDE.md` |
| **Implementation Blueprint** | High-level implementation plan with phase breakdown, feature dependencies, development workflow, and success metrics | `IMPLEMENTATION_BLUEPRINT.md` |

### How to Use These Resources

1. **Start with the Blueprint** - Review `IMPLEMENTATION_BLUEPRINT.md` for the high-level plan and phase structure
2. **Follow the Feature Files** - Each feature in `context/features/XXX-feature-name.md` contains detailed implementation steps
3. **Use Mock Data First** - Implement UI with mock data before backend integration (as described in the Guide)
4. **Complete Testing** - Run the testing checklist for each feature before moving to the next

### Feature Implementation Order

Features are numbered 001-062 and should be implemented in **numerical order** to respect dependencies:

- **Phase 1 (Foundation):** Features 001-008 ✅
- **Phase 2 (Authentication):** Features 009-012
- **Phase 3 (Core Components):** Features 013-018
- **Phase 4 (Knowledge Cards):** Features 019-024
- **Phase 5 (Database):** Features 025-029
- **Phase 6 (Content):** Features 030-035
- **Phase 7 (Language):** Features 036-039
- **Phase 8 (Location):** Features 040-044
- **Phase 9 (Offline):** Features 045-049
- **Phase 10 (Ads):** Features 050-053
- **Phase 11 (Profile):** Features 054-057
- **Phase 12 (Polish):** Features 058-062

**Next Feature to Implement:** Check `context/features/` directory for the next uncompleted feature file.

---

## Available Skills

When implementing tasks, **always check and use available skills** from `.qwen/skills/` directory. Skills provide specialized capabilities and domain knowledge for common tasks.

### How to Use Skills
- Invoke skills using the `skill` tool with the skill name only (no arguments)
- Example: `skill: "building-native-ui"` or `skill: "native-data-fetching"`
- Skills should be invoked **immediately** when relevant to the task at hand

### Available Skills in This Project

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `building-native-ui` | Complete guide for building beautiful apps with Expo Router | UI components, navigation, animations, native tabs |
| `cleanup` | Clean up project housekeeping tasks | Add "run" to execute fixes |
| `expo-api-routes` | Guidelines for creating API routes in Expo Router with EAS Hosting | Backend API endpoints |
| `expo-cicd-workflows` | EAS workflow YAML files for CI/CD | Build pipelines, deployment automation |
| `expo-deployment` | Deploying Expo apps to stores and web | App Store, Play Store, web hosting |
| `expo-dev-client` | Build and distribute Expo development clients | Local builds, TestFlight |
| `expo-tailwind-setup` | Set up Tailwind CSS v4 in Expo with NativeWind v5 | Universal styling |
| `expo-ui-jetpack-compose` | Use Jetpack Compose Views and modifiers | Android native UI integration |
| `expo-ui-swift-ui` | Use SwiftUI Views and modifiers | iOS native UI integration |
| `feature` | Manage current feature workflow | Start, review, explain or complete features |
| `github` | GitHub patterns using gh CLI | PRs, stacked PRs, code review, branching |
| `list-components` | List project components | Discover existing components |
| `native-data-fetching` | Network requests, API calls, data fetching | fetch API, React Query, SWR, error handling, caching |
| `react-native-best-practices` | React Native performance optimization | FPS, TTI, bundle size, memory leaks, animations |
| `research` | Run a research task to generate documentation | Generate project documentation |
| `upgrading-expo` | Guidelines for upgrading Expo SDK versions | Fixing dependency issues |
| `use-dom` | Use Expo DOM components | Run web code in webview on native |

### Skill Usage Guidelines
1. **Check for relevant skills first** before implementing any task
2. **Invoke skills immediately** when they are relevant - don't just announce them
3. **Use skill's base directory** when executing scripts or loading referenced files
4. **Do not invoke a skill that is already running**
5. **Only use skills listed** in `.qwen/skills/` directory
