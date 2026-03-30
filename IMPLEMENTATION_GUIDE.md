# Know Morocco - Implementation Guide for Code Generation LLM

## Overview

This guide provides all the context and instructions needed for a code-generation LLM to implement the Know Morocco app feature by feature. The project is broken down into 62 small, iterative features that build on each other.

---

## How to Use This Guide

### For Each Feature Implementation:

1. **Read the Feature File**: Open the specific feature markdown file (e.g., `001-project-configuration.md`)
2. **Understand Dependencies**: Check which features must be completed first
3. **Follow Implementation Steps**: Each step has specific file paths and code requirements
4. **Use Mock Data First**: Implement UI with mock data before backend integration
5. **Run Tests**: Complete the testing checklist for each feature
6. **Commit**: Git commit after each feature completes

### Feature File Location

All feature files are in: `context/features/`

Naming convention: `XXX-feature-name.md` where XXX is the feature number (001-062)

---

## Project Structure

```
know-morocco/
├── app/
│   ├── components/         # UI components (buttons, cards, inputs)
│   ├── config/             # Configuration (env, supabase, admob)
│   ├── context/            # React Context (Auth, Theme)
│   ├── devtools/           # Reactotron setup
│   ├── i18n/               # Internationalization (en, fr, es)
│   ├── navigators/         # React Navigation setup
│   ├── screens/            # Screen components
│   ├── services/           # API services (Supabase, auth)
│   ├── store/              # Zustand stores
│   ├── db/                 # WatermelonDB schema
│   ├── theme/              # Design tokens, colors
│   ├── hooks/              # Custom hooks
│   └── utils/              # Utility functions
├── assets/
│   ├── images/             # Static images, icons
│   ├── audio/              # Audio files
│   └── fonts/              # Custom fonts
├── types/
│   └── database.types.ts   # Supabase database types
├── test/
│   ├── components/         # Component tests
│   └── screens/            # Screen tests
├── context/
│   └── features/           # Feature implementation files
└── package.json
```

---

## Technology Stack Summary

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | React Native + Expo | Cross-platform mobile |
| **Language** | TypeScript | Type-safe JavaScript |
| **Navigation** | React Navigation v7 | Stack + Bottom Tabs |
| **State** | Zustand + Context | Global + local state |
| **Local DB** | WatermelonDB | Offline-first caching |
| **Storage** | MMKV | Fast key-value storage |
| **Backend** | Supabase | Auth, Database, Storage |
| **Auth** | Supabase + Google OAuth | User authentication |
| **Location** | react-native-background-geolocation | Geofencing |
| **Ads** | react-native-google-mobile-ads | Monetization |
| **i18n** | i18next | Multi-language (en, fr, es) |
| **Styling** | NativeWind + Custom | Tailwind-style + theme |

---

## Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Type checking
npm run compile

# Linting
npm run lint

# Run tests
npm run test
```

---

## Code Style Guidelines

### Imports Order

1. React/React Native/Expo
2. External libraries
3. Internal modules (`@/`)
4. Parent/sibling imports
5. Index imports

### Example Component Structure

```typescript
import React, { useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAppTheme } from '@/theme/context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

import type { MyComponentProps } from './MyComponent.types'

/**
 * MyComponent Description
 */
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  const { theme, themed } = useAppTheme()
  const [state, setState] = useState<Type>('default')

  const handleAction = useCallback(() => {
    // Implementation
  }, [dependencies])

  return (
    <ThemedView variant="surface" style={styles.container}>
      <ThemedText variant="heading">Title</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})

export default MyComponent
```

### Naming Conventions

- **Components:** PascalCase (e.g., `KnowledgeCard.tsx`)
- **Screens:** PascalCase + `Screen` suffix (e.g., `HomeScreen.tsx`)
- **Hooks:** camelCase + `use` prefix (e.g., `useAuth.ts`)
- **Utils:** camelCase (e.g., `formatDate.ts`)
- **Types:** PascalCase (e.g., `KnowledgeCard.ts`)

---

## Implementation Phases

### Phase 1: Foundation (Features 1-8) ✅ COMPLETE

**Status:** Feature files created

**Goal:** App launches with navigation, theme, and basic infrastructure

**Features:**
- 001: Project Configuration
- 002: Theme System
- 003: Navigation Foundation
- 004: i18n Setup
- 005: Supabase Client
- 006: Auth Context
- 007: Storage Layer
- 008: Zustand Store

---

### Phase 2: Authentication (Features 9-12)

**Goal:** Users can sign in with Google

**Features:**
- 009: Auth Service - Google OAuth (✅ Created)
- 010: Login Screen UI
- 011: Auth Wiring
- 012: User Profile Service

**Implementation Notes:**
- Use mock auth for initial UI development
- Configure Google OAuth in Supabase dashboard
- Test deep linking for OAuth callback

---

### Phase 3: Core Components (Features 13-18)

**Goal:** Complete UI component library

**Features:**
- 013: Button Components
- 014: Text Components (partially done in Feature 002)
- 015: Card Components
- 016: Input Components
- 017: Loading Components
- 018: Icon Components

**Implementation Notes:**
- All components must support theming
- Use `useAppTheme()` hook
- Create with mock data first

---

### Phase 4: Knowledge Cards (Features 19-24)

**Goal:** Knowledge cards display with mock data

**Features:**
- 019: Knowledge Card Model
- 020: Card Content Display
- 021: Audio Player
- 022: Card Swipe Navigation
- 023: Category Filter
- 024: Home Screen

**Implementation Notes:**
- Create mock card data factory
- Implement swipe gestures with react-native-gesture-handler
- Audio player uses expo-av

---

### Phase 5: Database (Features 25-29)

**Goal:** Database layer ready

**Features:**
- 025: Supabase Schema
- 026: RLS Policies
- 027: WatermelonDB Schema
- 028: Database Models
- 029: Database Service

**Implementation Notes:**
- Create SQL migrations for Supabase
- Set up RLS policies for security
- WatermelonDB for offline-first

---

### Phase 6: Content (Features 30-35)

**Goal:** Real content from Supabase

**Features:**
- 030: Knowledge Card Service
- 031: Category Service
- 032: Content Sync Service
- 033: Sync Queue
- 034: Home Screen Integration
- 035: Pull-to-Refresh

**Implementation Notes:**
- Replace mock data with real Supabase queries
- Implement bidirectional sync
- Handle offline queue

---

### Phase 7: Language (Features 36-39)

**Goal:** Multi-language support

**Features:**
- 036: Language Selector UI
- 037: Language Service
- 038: Profile Language Sync
- 039: Content Localization

**Implementation Notes:**
- Use i18n from Feature 004
- Save preference to Supabase
- Update content language dynamically

---

### Phase 8: Location (Features 40-44)

**Goal:** Location-based content

**Features:**
- 040: Location Permission
- 041: Location Service
- 042: Geofence Detection
- 043: Nearby Content Logic
- 044: Nearby Screen

**Implementation Notes:**
- Request permissions with clear explanation
- Use react-native-background-geolocation
- Filter cards by distance

---

### Phase 9: Offline (Features 45-49)

**Goal:** Full offline functionality

**Features:**
- 045: Network Detection
- 046: Offline Indicator
- 047: Content Preload
- 048: Auto-Sync on Reconnect
- 049: Conflict Resolution

**Implementation Notes:**
- Use @react-native-community/netinfo
- Download content to WatermelonDB
- Last-write-wins conflict resolution

---

### Phase 10: Ads (Features 50-53)

**Goal:** AdMob monetization

**Features:**
- 050: AdMob Configuration
- 051: Banner Ad Component
- 052: Interstitial Ad Logic
- 053: ATT Prompt

**Implementation Notes:**
- Use test ad IDs in development
- Frequency cap: 5 minutes
- ATT required for iOS

---

### Phase 11: Profile (Features 54-57)

**Goal:** Profile management

**Features:**
- 054: Profile Screen
- 055: Settings Screen
- 056: Favorites Feature
- 057: Logout Flow

**Implementation Notes:**
- Display user info from Supabase
- Favorites stored locally + synced
- Logout clears all local data

---

### Phase 12: Polish (Features 58-62)

**Goal:** Production-ready

**Features:**
- 058: Error Handling
- 059: Loading States
- 060: Animations
- 061: Unit Tests
- 062: E2E Tests

**Implementation Notes:**
- Error boundaries for crashes
- Skeleton loaders
- react-native-reanimated
- Jest + Maestro tests

---

## Mock Data Patterns

### Knowledge Card Mock Factory

```typescript
export function createMockKnowledgeCard(
  overrides?: Partial<KnowledgeCard>
): KnowledgeCard {
  return {
    id: `card-${Date.now()}`,
    category: 'monuments',
    title: 'Example Monument',
    description: 'A beautiful historical site',
    imageUrl: 'https://picsum.photos/400/300',
    audioUrl: null,
    latitude: 31.6295,
    longitude: -7.9811,
    city: 'Marrakech',
    // ... apply overrides
    ...overrides,
  }
}
```

### User Mock Factory

```typescript
export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    avatarUrl: 'https://i.pravatar.cc/300',
    preferredLanguage: 'en',
    ...overrides,
  }
}
```

---

## Testing Strategy

### Unit Tests (Jest)

```typescript
// Example component test
import { render, fireEvent } from '@testing-library/react-native'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent prop1="value" />)
    expect(getByText('Expected Text')).toBeTruthy()
  })

  it('handles press', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <MyComponent onPress={onPress} testID="button" />
    )
    fireEvent.press(getByTestId('button'))
    expect(onPress).toHaveBeenCalled()
  })
})
```

### E2E Tests (Maestro)

```yaml
# .maestro/flows/login.yaml
appId: com.knowmorocco
---
- launchApp
- assertVisible: 'Welcome to Know Morocco'
- tapOn: 'Sign in with Google'
- assertVisible: 'Home'
```

---

## Common Patterns

### Using Theme

```typescript
import { useAppTheme } from '@/theme/context'

const { theme, themeContext, themed } = useAppTheme()

// Access theme colors
const backgroundColor = theme.colors.background

// Create themed styles
const styles = themed({
  container: {
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
  },
})
```

### Using Zustand Store

```typescript
import { useAppStore } from '@/store'

// Access state
const language = useAppStore((state) => state.language)
const setLanguage = useAppStore((state) => state.setLanguage)

// Update state
setLanguage('fr')
```

### Using Supabase

```typescript
import { supabase } from '@/services/supabase'

// Query data
const { data, error } = await supabase
  .from('knowledge_cards')
  .select('*')
  .eq('city', 'Marrakech')
  .limit(10)
```

### Using i18n

```typescript
import { useTranslation } from '@/i18n'

const { t, currentLanguage, changeLanguage } = useTranslation()

// Use translations
const title = t('auth.title')
const greeting = t('home.welcome', { name: 'John' })

// Change language
await changeLanguage('fr')
```

---

## Environment Setup

### Required Environment Variables

Create `.env` file:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
ADMOB_APP_ID=ca-app-pub-xxx~xxx
ADMOB_BANNER_UNIT_ID=ca-app-pub-xxx/xxx
ADMOB_INTERSTITIAL_UNIT_ID=ca-app-pub-xxx/xxx
```

### Supabase Setup

1. Create Supabase project
2. Enable Google OAuth provider
3. Create database tables (see Feature 025)
4. Set up RLS policies (see Feature 026)
5. Create storage buckets for images/audio

---

## Troubleshooting

### Common Issues

**Issue:** Navigation not working
- **Solution:** Ensure NavigationContainer wraps all screens

**Issue:** Theme not applying
- **Solution:** Check ThemeProvider wraps the component tree

**Issue:** Supabase connection fails
- **Solution:** Verify environment variables are loaded

**Issue:** i18n translations not showing
- **Solution:** Ensure i18n is imported before app renders

**Issue:** WatermelonDB sync fails
- **Solution:** Check schema matches between local and remote

---

## Next Steps

1. **Start with Feature 010** (Login Screen UI)
2. Follow numerical order
3. Complete testing checklist for each feature
4. Commit after each feature
5. Run `npm run compile` and `npm run lint` frequently

---

## Support Resources

- **PRD:** `PRD-Morocco.md`
- **Project Context:** `QWEN.md`
- **Feature List:** `context/features/COMPLETE_FEATURE_LIST.md`
- **Implementation Blueprint:** `IMPLEMENTATION_BLUEPRINT.md`

---

## Contact

For questions about feature implementation, refer to the specific feature file or the project documentation.
