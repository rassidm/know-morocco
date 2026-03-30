# Know Morocco - Project Summary and Getting Started

## 🎯 Project Overview

**Know Morocco** is a React Native mobile application that delivers location-based cultural content to tourists visiting Morocco for the 2030 World Cup.

**Vision:** "Walk through Morocco and discover its rich heritage automatically – no searching required. Your personal cultural guide that works even without internet."

---

## 📁 What's in This Repository

### Documentation Files

| File | Purpose |
|------|---------|
| `PRD-Morocco.md` | Product Requirements Document - full product specs |
| `QWEN.md` | Project context - tech stack, architecture, conventions |
| `IMPLEMENTATION_BLUEPRINT.md` | High-level implementation plan with phases |
| `IMPLEMENTATION_GUIDE.md` | Detailed guide for code-generation LLM |
| `context/features/COMPLETE_FEATURE_LIST.md` | All 62 features with dependencies |
| `README.md` | Project README with quick start guide |

### Feature Files

All feature implementation files are in: `context/features/`

**Completed Features (Phase 1):**
- `001-project-configuration.md` - Environment setup
- `002-theme-system.md` - Theme and design tokens
- `003-navigation-foundation.md` - React Navigation setup
- `004-internationalization-setup.md` - i18n (en, fr, es)
- `005-supabase-client.md` - Supabase client setup
- `006-auth-context.md` - Auth state management
- `007-storage-layer.md` - MMKV storage
- `008-zustand-store.md` - Zustand global state
- `009-auth-service.md` - Google OAuth service
- `010-login-screen.md` - Login UI with mock data

**Remaining Features (11-62):**
See `COMPLETE_FEATURE_LIST.md` for full list

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** >= 20.0.0
- **npm:** with `--legacy-peer-deps` flag
- **Expo CLI:** `npm install -g expo-cli`
- **EAS CLI:** `npm install -g eas-cli`
- **Supabase account:** Create project at supabase.com
- **Google OAuth credentials:** From Google Cloud Console
- **Development environment:**
  - iOS: Xcode (macOS required)
  - Android: Android Studio

### Installation

```bash
# Clone the repository
cd know-morocco

# Install dependencies
npm install --legacy-peer-deps

# Create .env file
cp .env.example .env
# Edit .env with your credentials
```

### Environment Variables

Create `.env` file with:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
ADMOB_APP_ID=ca-app-pub-xxx~xxx
ADMOB_BANNER_UNIT_ID=ca-app-pub-xxx/xxx
ADMOB_INTERSTITIAL_UNIT_ID=ca-app-pub-xxx/xxx
ENABLE_LOCATION_SERVICES=true
ENABLE_ADS=true
ENABLE_ANALYTICS=false
```

### Running the App

```bash
# Start development server
npm run start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

---

## 📋 Implementation Roadmap

### Phase 1: Foundation ✅ COMPLETE

**Features 1-8** - App infrastructure

- [x] 001: Project Configuration
- [x] 002: Theme System
- [x] 003: Navigation Foundation
- [x] 004: i18n Setup
- [x] 005: Supabase Client
- [x] 006: Auth Context
- [x] 007: Storage Layer
- [x] 008: Zustand Store

**Milestone:** App launches with navigation, theme, and basic infrastructure

---

### Phase 2: Authentication (Current Phase)

**Features 9-12** - User authentication

- [x] 009: Auth Service
- [x] 010: Login Screen UI
- [ ] 011: Auth Wiring
- [ ] 012: User Profile Service

**Milestone:** Users can sign in with Google

**Next Steps:**
1. Complete Feature 011 (connect login to real auth)
2. Complete Feature 012 (user profile CRUD)
3. Test Google OAuth flow end-to-end

---

### Phase 3: Core Components

**Features 13-18** - UI component library

- [ ] 013: Button Components
- [ ] 014: Text Components
- [ ] 015: Card Components
- [ ] 016: Input Components
- [ ] 017: Loading Components
- [ ] 018: Icon Components

**Milestone:** Complete component library ready for screens

---

### Phase 4: Knowledge Cards

**Features 19-24** - Core feature

- [ ] 019: Knowledge Card Model
- [ ] 020: Card Content Display
- [ ] 021: Audio Player
- [ ] 022: Card Swipe Navigation
- [ ] 023: Category Filter
- [ ] 024: Home Screen

**Milestone:** Knowledge cards display and interact with mock data

---

### Phase 5: Database

**Features 25-29** - Data layer

- [ ] 025: Supabase Schema
- [ ] 026: RLS Policies
- [ ] 027: WatermelonDB Schema
- [ ] 028: Database Models
- [ ] 029: Database Service

**Milestone:** Database layer ready for data operations

---

### Phase 6: Content Management

**Features 30-35** - Real data

- [ ] 030: Knowledge Card Service
- [ ] 031: Category Service
- [ ] 032: Content Sync Service
- [ ] 033: Sync Queue
- [ ] 034: Home Screen Integration
- [ ] 035: Pull-to-Refresh

**Milestone:** Real content loads from Supabase

---

### Phase 7: Language Selection

**Features 36-39** - Multi-language

- [ ] 036: Language Selector UI
- [ ] 037: Language Service
- [ ] 038: Profile Language Sync
- [ ] 039: Content Localization

**Milestone:** Users can switch languages

---

### Phase 8: Location Services

**Features 40-44** - Geofencing

- [ ] 040: Location Permission
- [ ] 041: Location Service
- [ ] 042: Geofence Detection
- [ ] 043: Nearby Content Logic
- [ ] 044: Nearby Screen

**Milestone:** Location-based content triggering

---

### Phase 9: Offline Mode

**Features 45-49** - Offline-first

- [ ] 045: Network Detection
- [ ] 046: Offline Indicator
- [ ] 047: Content Preload
- [ ] 048: Auto-Sync on Reconnect
- [ ] 049: Conflict Resolution

**Milestone:** App works fully offline

---

### Phase 10: AdMob Integration

**Features 50-53** - Monetization

- [ ] 050: AdMob Configuration
- [ ] 051: Banner Ad Component
- [ ] 052: Interstitial Ad Logic
- [ ] 053: ATT Prompt

**Milestone:** Ads display correctly

---

### Phase 11: Profile & Settings

**Features 54-57** - User management

- [ ] 054: Profile Screen
- [ ] 055: Settings Screen
- [ ] 056: Favorites Feature
- [ ] 057: Logout Flow

**Milestone:** Complete profile management

---

### Phase 12: Polish & Testing

**Features 58-62** - Production ready

- [ ] 058: Error Handling
- [ ] 059: Loading States
- [ ] 060: Animations
- [ ] 061: Unit Tests
- [ ] 062: E2E Tests

**Milestone:** Production-ready app

---

## 🔧 Development Workflow

### For Each Feature

1. **Read the feature file** in `context/features/XXX-feature-name.md`
2. **Check dependencies** - ensure previous features are complete
3. **Implement steps** - follow the implementation steps in order
4. **Test** - complete the testing checklist
5. **Commit** - git commit with descriptive message
6. **Move to next feature**

### Code Quality

```bash
# Before committing
npm run compile  # TypeScript check
npm run lint     # ESLint check
npm run test     # Run tests
```

### Git Workflow

```bash
# After completing a feature
git add .
git commit -m "feat: implement Feature XXX - Feature Name

- Created component X
- Added service Y
- Updated Z configuration

Refs: #XXX"
git push
```

---

## 📚 Key Resources

### Documentation

- **Product Requirements:** `PRD-Morocco.md`
- **Project Context:** `QWEN.md`
- **Feature List:** `context/features/COMPLETE_FEATURE_LIST.md`
- **Implementation Guide:** `IMPLEMENTATION_GUIDE.md`

### External Links

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [WatermelonDB](https://nozbe.github.io/WatermelonDB/)

---

## 🎨 Tech Stack Summary

| Layer | Technology |
|-------|------------|
| **Framework** | React Native 0.83.4 + Expo SDK 55 |
| **Language** | TypeScript 5.9 |
| **Navigation** | React Navigation v7 |
| **State** | Zustand + React Context |
| **Local DB** | WatermelonDB + MMKV |
| **Backend** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth + Google OAuth |
| **Location** | react-native-background-geolocation |
| **Ads** | react-native-google-mobile-ads |
| **i18n** | i18next (en, fr, es) |
| **Styling** | NativeWind + Custom theme |

---

## 🎯 Success Criteria

### MVP Launch Criteria

- [ ] User can authenticate via Google OAuth
- [ ] Knowledge cards display in 3 languages
- [ ] Location-based content triggers within 100m
- [ ] App functions fully offline
- [ ] Banner ads display
- [ ] Interstitial ads show after 4 cards
- [ ] App passes App Store / Play Store review
- [ ] Crash rate < 1%

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Dependencies fail to install
- **Solution:** Use `npm install --legacy-peer-deps`

**Issue:** App won't start on Android
- **Solution:** Run `npm run prebuild:clean` then try again

**Issue:** TypeScript errors
- **Solution:** Run `npm run compile` to see all errors

**Issue:** Supabase connection fails
- **Solution:** Check `.env` file has correct credentials

**Issue:** Navigation not working
- **Solution:** Ensure NavigationContainer wraps all screens

---

## 📞 Getting Help

### For Implementation Questions

1. Check the feature file for the specific feature
2. Review `IMPLEMENTATION_GUIDE.md` for patterns
3. Consult `QWEN.md` for project conventions
4. Check external documentation links

### For Bug Reports

1. Create a new issue with:
   - Feature number
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

---

## 🚀 Next Steps

### Immediate (This Session)

1. ✅ Feature 001-010: Complete (foundation + login UI)
2. ⏭️ Feature 011: Wire login to real auth service
3. ⏭️ Feature 012: Create user profile service

### This Week

- Complete Phase 2 (Authentication)
- Start Phase 3 (Core Components)

### This Month

- Complete Phases 1-4
- Have working knowledge cards with mock data

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Ignite](https://github.com/infinitered/ignite) boilerplate
- Powered by [Supabase](https://supabase.com)
- Location services by [react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation)

---

**Last Updated:** March 29, 2026
**Version:** 1.0
