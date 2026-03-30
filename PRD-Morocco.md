# 📱 Morocco World Cup 2030 Tourism App
# Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** March 23, 2026  
**Author:** PRD Creation Assistant  
**Status:** Ready for Development  

---

## 1. App Overview and Objectives 🎯

### 1.1 Product Vision
A mobile application that enhances the experience of tourists and soccer game attendees visiting Morocco for the 2030 World Cup by delivering context-aware knowledge cards about the country's monuments, food/restaurants, history, and culture.

### 1.2 Core Objectives
| Objective | Success Metric |
|-----------|---------------|
| Deliver location-based cultural content | Users receive relevant knowledge cards within 100m of points of interest |
| Support offline access | 100% of content accessible without internet after initial load |
| Generate ad revenue | AdMob integration with banner + interstitial ads |
| Launch before World Cup 2030 | MVP ready 3 months before event start |

### 1.3 Value Proposition
> "Walk through Morocco and discover its rich heritage automatically – no searching required. Your personal cultural guide that works even without internet."

---

## 2. Target Audience 👥

### 2.1 Primary Users
| Segment | Characteristics | Needs |
|---------|-----------------|-------|
| **World Cup Attendees** | International tourists, ages 18-55, attending soccer matches | Quick cultural insights between matches, easy navigation |
| **General Tourists** | Leisure travelers exploring Morocco | Deep cultural understanding, restaurant recommendations |
| **Culture Enthusiasts** | History/culture focused travelers | Detailed historical context, authentic experiences |

### 2.2 User Personas
**Persona 1: The Match Fan**
- Visits Morocco primarily for World Cup games
- Has limited time between matches
- Wants quick, engaging cultural content
- May have limited data roaming

**Persona 2: The Explorer**
- Spending 1-2 weeks in Morocco
- Actively seeking cultural experiences
- Wants comprehensive information
- Values offline accessibility

---

## 3. Core Features and Functionality ⭐

### 3.1 Feature: User Authentication
| Attribute | Specification |
|-----------|---------------|
| **Method** | Google OAuth 2.0 only |
| **Requirement** | Required for all users (no guest mode) |
| **Session** | Persistent login across app restarts |
| **Platform** | Supabase Auth |

**Acceptance Criteria:**
- [ ] Users can sign in with Google account on both Android and iOS
- [ ] Session persists after app close/reopen
- [ ] Failed auth shows clear error message with retry option
- [ ] Logout clears all local data and requires re-authentication

---

### 3.2 Feature: Knowledge Cards Display
| Attribute | Specification |
|-----------|---------------|
| **Content Fields** | title (string), description (text), image (URL), audio (URL), category (enum), location (lat/lng) |
| **Categories** | Monuments, Food/Restaurants, History, Culture |
| **Languages** | French, English, Spanish (user selectable) |
| **Display Format** | Card-based UI with swipe navigation |

**Acceptance Criteria:**
- [ ] Cards display all content fields correctly
- [ ] Language switch updates all card content immediately
- [ ] Images load with placeholder during fetch
- [ ] Audio player embedded in card with play/pause controls
- [ ] Cards are dismissible after viewing

---

### 3.3 Feature: Location-Based Content Delivery (Hybrid Mode)
| Attribute | Specification |
|-----------|---------------|
| **Geofencing Radius** | 100 meters around point of interest |
| **Trigger** | Automatic notification when entering geofence |
| **Manual Mode** | User can browse nearby content without entering geofence |
| **Library Recommendation** | `react-native-background-geolocation` or `react-native-geofencing` |

**Acceptance Criteria:**
- [ ] App detects user location within 100m accuracy
- [ ] Push notification triggered when entering geofence (with user permission)
- [ ] Manual "Nearby Content" button shows cards within 500m radius
- [ ] Location services work in background (with permission)
- [ ] Battery optimization implemented to prevent drain

---

### 3.4 Feature: Offline Mode & Data Synchronization
| Attribute | Specification |
|-----------|---------------|
| **Local Storage** | WatermelonDB or MMKV for local caching |
| **Sync Strategy** | Local-first, bidirectional sync when online |
| **Content Preload** | All knowledge cards downloadable for offline access |
| **Sync Trigger** | Automatic on network reconnection |

**Acceptance Criteria:**
- [ ] App functions fully without internet after initial content load
- [ ] "Offline Mode" indicator visible in UI when no connection
- [ ] Content syncs automatically when connection restored
- [ ] User can manually trigger "Download All Content" for specific cities/regions
- [ ] Conflicts resolved with "last write wins" strategy

**Technical Implementation Notes:**
- Local database is the source of truth
- Implement sync queue for pending operations
- Provide clear user feedback during sync status
- Use exponential backoff for failed sync attempts

---

### 3.5 Feature: AdMob Monetization
| Attribute | Specification |
|-----------|---------------|
| **Ad Network** | Google AdMob |
| **Ad Types** | Bottom banner (always visible) + Interstitial (after every 4 cards) |
| **Library** | `react-native-google-mobile-ads` |
| **Frequency Cap** | Interstitial maximum once per 5 minutes to prevent annoyance |

**Acceptance Criteria:**
- [ ] Banner ad displays at bottom of knowledge card screen
- [ ] Interstitial ad shows after user views 4 knowledge cards
- [ ] Ads do not block critical app functionality
- [ ] Ad loading failures handled gracefully (app continues without ads)
- [ ] iOS App Tracking Transparency (ATT) prompt implemented

**Technical Implementation Notes:**
- Initialize AdMob on app launch
- Use test ad unit IDs during development
- Implement ad preload for interstitials to reduce wait time
- Track ad impressions for revenue optimization (client-side only, no analytics backend)

---

### 3.6 Feature: Language Selection
| Attribute | Specification |
|-----------|---------------|
| **Supported Languages** | English, French, Spanish |
| **Default** | Device language (if supported) or English |
| **Storage** | User preference saved in Supabase profile |

**Acceptance Criteria:**
- [ ] Language selector accessible from main menu
- [ ] All UI text and knowledge cards update on language change
- [ ] Preference persists across app sessions
- [ ] Missing translations fall back to English

---

## 4. Technical Stack Recommendations 🛠️

### 4.1 Architecture Overview
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

### 4.2 Technology Choices

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Mobile Framework** | React Native | Cross-platform, single codebase, large community |
| **Backend/BaaS** | Supabase | Built-in auth, PostgreSQL database, file storage, generous free tier |
| **Authentication** | Supabase Auth + Google OAuth | Simplified implementation, secure, handles token refresh |
| **Local Database** | WatermelonDB | Offline-first architecture, syncs with Supabase |
| **State Management** | Zustand or React Context | Lightweight, sufficient for MVP complexity |
| **Styling** | NativeWind (Tailwind for RN) | Fast development, consistent styling |
| **Navigation** | React Navigation | Industry standard, well-maintained |
| **Location/Geofencing** | react-native-background-geolocation | Reliable geofencing, background support |
| **Ads** | react-native-google-mobile-ads | Official AdMob library, active maintenance |
| **Language** | i18next | Mature i18n solution for React Native |

### 4.3 Development Environment
| Tool | Purpose |
|------|---------|
| Expo (or bare React Native) | App development and testing |
| Supabase Studio | Database management |
| Android Studio | Android emulator and builds |
| Xcode | iOS simulator and builds |
| Git + GitHub | Version control |

---

## 5. Conceptual Data Model 📊

### 5.1 Supabase Database Schema

```
┌──────────────────────────────────────────────────────────────┐
│                         USERS                                │
├──────────────────────────────────────────────────────────────┤
│ id (uuid, PK)         │ References: auth.users               │
│ email (text, unique)  │                                      │
│ name (text)           │                                      │
│ avatar_url (text)     │                                      │
│ preferred_language    │ Enum: 'en', 'fr', 'es'               │
│ created_at (timestamp)│                                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      CATEGORIES                              │
├──────────────────────────────────────────────────────────────┤
│ id (uuid, PK)         │                                      │
│ name (text)           │ Enum: 'monuments', 'food',           │
│                       │        'history', 'culture'          │
│ icon (text)           │ URL to category icon                 │
│ display_order (int)   │                                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE_CARDS                           │
├──────────────────────────────────────────────────────────────┤
│ id (uuid, PK)         │                                      │
│ category_id (uuid, FK)│ References: categories.id            │
│ title_en (text)       │ English title                        │
│ title_fr (text)       │ French title                         │
│ title_es (text)       │ Spanish title                        │
│ description_en (text) │ English description                  │
│ description_fr (text) │ French description                   │
│ description_es (text) │ Spanish description                  │
│ image_url (text)      │ Supabase storage URL                 │
│ audio_url (text)      │ Supabase storage URL                 │
│ latitude (decimal)    │ Location coordinate                  │
│ longitude (decimal)   │ Location coordinate                  │
│ geofence_radius (int) │ Meters (default: 100)                │
│ city (text)           │ For filtering/organization           │
│ is_active (boolean)   │ Soft delete flag                     │
│ created_at (timestamp)│                                      │
│ updated_at (timestamp)│                                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    USER_INTERACTIONS                         │
├──────────────────────────────────────────────────────────────┤
│ id (uuid, PK)         │                                      │
│ user_id (uuid, FK)    │ References: users.id                 │
│ knowledge_card_id     │ References: knowledge_cards.id       │
│ viewed_at (timestamp) │                                      │
│ is_favorite (boolean) │ User-saved content                   │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Row Level Security (RLS) Policies

| Table | Policy | Description |
|-------|--------|-------------|
| `users` | Users can read/update own profile | `auth.uid() = id` |
| `knowledge_cards` | Public read access | All authenticated users can read |
| `user_interactions` | Users can only access own interactions | `auth.uid() = user_id` |

### 5.3 Local Storage Schema (WatermelonDB)
Mirror the Supabase schema locally with sync timestamps:
- `knowledge_cards_local` - Cached cards with `last_synced_at`
- `categories_local` - Cached categories
- `sync_queue` - Pending operations to sync when online

---

## 6. UI Design Principles 🎨

### 6.1 Design Philosophy
- **Clean & Minimal:** Focus on content, not chrome
- **Tourism-Focused:** Warm colors inspired by Moroccan culture (terracotta, blue, gold)
- **Card-Based Layout:** Swipeable knowledge cards as primary interaction
- **Accessibility:** Support dynamic text sizes, high contrast mode

### 6.2 Key Screens

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| **Splash** | App loading | Logo, loading indicator |
| **Login** | Google OAuth | "Sign in with Google" button |
| **Home** | Knowledge card feed | Current card, swipe controls, category filter |
| **Language Select** | Choose app language | 3 language options with flags |
| **Nearby** | Manual location browse | List of nearby cards, distance indicator |
| **Profile** | User settings | Language preference, logout, favorites |
| **Offline Indicator** | Show connection status | Banner when offline |

### 6.3 Color Palette (Suggested)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Moroccan Blue) | #1E5F9E | Headers, buttons |
| Secondary (Terracotta) | #C17B5D | Accents, highlights |
| Background | #F8F5F0 | Main background |
| Text Primary | #2D2D2D | Body text |
| Text Secondary | #6B6B6B | Subtitles |
| Success | #4CAF50 | Sync complete |
| Warning | #FF9800 | Offline mode |

### 6.4 Typography
- **Headings:** Bold, 20-24pt
- **Body:** Regular, 16pt
- **Captions:** Light, 14pt
- **Font Family:** System fonts (San Francisco on iOS, Roboto on Android)

---

## 7. Security Considerations 🔒

### 7.1 Authentication Security
| Requirement | Implementation |
|-------------|----------------|
| Token Storage | Supabase SDK handles secure storage |
| Session Management | JWT tokens with automatic refresh |
| OAuth Scope | Request minimal permissions from Google |

### 7.2 Data Security
| Requirement | Implementation |
|-------------|----------------|
| API Keys | Store in environment variables, never in code |
| Database Access | Row Level Security (RLS) on all tables |
| Data Transmission | HTTPS only (Supabase default) |
| Local Data | Encrypted storage for sensitive user data |

### 7.3 Privacy Compliance
| Requirement | Implementation |
|-------------|----------------|
| Location Permission | Request with clear explanation of use |
| AdMob ATT (iOS) | App Tracking Transparency prompt on first launch |
| Data Retention | User data deleted on account deletion |
| Privacy Policy | Required for App Store and Play Store submission |

### 7.4 AdMob Security
- Use official `react-native-google-mobile-ads` library
- Never click your own ads (violates AdMob policy)
- Implement frequency capping to prevent ad fraud

---

## 8. Development Phases/Milestones 📅

### Phase 1: Foundation (Weeks 1-4)
| Week | Deliverables |
|------|-------------|
| 1 | Project setup, Supabase configuration, Google OAuth integration |
| 2 | Database schema creation, RLS policies, basic navigation |
| 3 | Knowledge cards UI, language selection, content display |
| 4 | Local storage setup (WatermelonDB), basic offline capability |

**Milestone:** User can log in, view cards, switch languages

---

### Phase 2: Location & Offline (Weeks 5-8)
| Week | Deliverables |
|------|-------------|
| 5 | Location services integration, geofencing setup |
| 6 | Automatic content triggering based on location |
| 7 | Offline sync implementation, content preloading |
| 8 | Testing and bug fixes for location/offline features |

**Milestone:** Full offline functionality, location-based cards working

---

### Phase 3: Monetization & Polish (Weeks 9-12)
| Week | Deliverables |
|------|-------------|
| 9 | AdMob integration (banner ads) |
| 10 | Interstitial ads (after 4 cards), frequency capping |
| 11 | UI polish, animations, error handling |
| 12 | App Store/Play Store preparation, testing on devices |

**Milestone:** Revenue-generating app ready for beta testing

---

### Phase 4: Launch (Weeks 13-16)
| Week | Deliverables |
|------|-------------|
| 13 | Beta testing with small user group |
| 14 | Bug fixes based on feedback |
| 15 | App Store and Play Store submission |
| 16 | Launch and monitoring |

**Milestone:** Public launch on both app stores

---

## 9. Potential Challenges and Solutions ⚠️

### 9.1 Challenge: Offline Data Synchronization
| Risk | Mitigation |
|------|------------|
| Data conflicts when syncing | Use "last write wins" strategy with timestamps |
| Large content downloads | Implement progressive loading and chunking |
| Sync failures | Exponential backoff retry logic |
| User confusion on sync status | Clear UI indicators for sync state |

**Recommended Approach:**
- Local database is source of truth
- Queue all writes locally first, sync when online
- Show sync status indicator in UI

---

### 9.2 Challenge: AdMob Integration
| Risk | Mitigation |
|------|------------|
| Ad loading failures | Graceful fallback (app continues without ads) |
| Policy violations | Follow AdMob placement guidelines strictly |
| iOS ATT rejection | Implement App Tracking Transparency correctly |
| Revenue lower than expected | A/B test ad frequency and placement |

**Recommended Approach:**
- Use test ad units during development
- Preload interstitial ads for instant display
- Implement frequency capping (max 1 interstitial per 5 minutes)

---

### 9.3 Challenge: Geofencing Accuracy
| Risk | Mitigation |
|------|------------|
| Battery drain from location tracking | Use significant location change API, not continuous |
| Inaccurate triggers | Set reasonable geofence radius (100m) |
| Permission denied | Clear explanation of why location is needed |
| Background limitations | Follow iOS/Android background location guidelines |

**Recommended Approach:**
- Use `react-native-background-geolocation` for reliability
- Request "Always" permission with clear justification
- Provide manual "Check Nearby" option as fallback

---

### 9.4 Challenge: Content Management at Scale
| Risk | Mitigation |
|------|------------|
| Manual content entry is slow | Create CSV import tool for bulk upload |
| Content updates require app update | All content served from Supabase (no app update needed) |
| Multi-language content gaps | Fall back to English if translation missing |
| Image/audio storage costs | Optimize file sizes, use CDN |

---

## 10. Future Expansion Possibilities 🚀

### 10.1 Phase 2 Features (Post-MVP)
| Feature | Description | Priority |
|---------|-------------|----------|
| **Admin Dashboard** | Web-based CMS for content management | High |
| **User Favorites** | Save cards for later viewing | Medium |
| **Push Notifications** | Event reminders, nearby alerts | Medium |
| **User Reviews** | Allow ratings on restaurants/monuments | Low |
| **Additional Languages** | Arabic, German, Italian | Medium |

### 10.2 Phase 3 Features (Growth)
| Feature | Description |
|---------|-------------|
| **Map Integration** | Add Google Maps/Mapbox for navigation |
| **Social Sharing** | Share cards on social media |
| **AR Experiences** | Augmented reality at monuments |
| **Partnership Integrations** | Restaurant bookings, tour reservations |
| **Analytics Dashboard** | User behavior insights (with consent) |

### 10.3 Monetization Expansion
| Strategy | Description |
|----------|-------------|
| **Premium Tier** | Ad-free experience with exclusive content |
| **Sponsored Cards** | Paid placements for restaurants/tours |
| **Affiliate Links** | Commission on bookings made through app |
| **White Label** | License platform to other tourism boards |

---

## 11. Cost Estimation 💰

### 11.1 Development Costs (Solo Developer)
| Item | Cost | Notes |
|------|------|-------|
| **Your Time** | Variable | Estimated 300-400 hours for MVP |
| **Mac Computer** | $1,000-2,000 | Required for iOS builds (if not owned) |
| **Test Devices** | $500-1,000 | Android + iOS devices for testing |

### 11.2 Recurring Costs
| Service | Free Tier | Paid Tier (if needed) |
|---------|-----------|----------------------|
| **Supabase** | Free up to 500MB database, 50K MAU | $25/month (Pro) |
| **Apple Developer** | N/A | $99/year |
| **Google Play Console** | N/A | $25 one-time |
| **AdMob** | Free (revenue share model) | N/A |
| **Total Monthly** | ~$0 (free tier) | ~$125/month |

### 11.3 Revenue Projections (Estimates)
| Metric | Conservative | Optimistic |
|--------|--------------|------------|
| **Downloads (Year 1)** | 10,000 | 50,000 |
| **MAU** | 3,000 | 15,000 |
| **Ad Revenue per MAU** | $0.50/month | $1.50/month |
| **Monthly Revenue** | $1,500 | $22,500 |

*Note: Ad revenue varies significantly based on user geography, ad fill rate, and engagement.*

---

## Appendix A: API & Integration Documentation Links 🔗

| Technology | Documentation |
|------------|---------------|
| Supabase | https://supabase.com/docs |
| Supabase Auth (React Native) | https://supabase.com/docs/guides/getting-started/quickstarts/react-native |
| React Native | https://reactnative.dev/docs/getting-started |
| WatermelonDB | https://nozbe.github.io/WatermelonDB/ |
| React Native Google Mobile Ads | https://docs.page/invertase/react-native-google-mobile-ads |
| React Native Background Geolocation | https://github.com/transistorsoft/react-native-background-geolocation |
| AdMob Policies | https://support.google.com/admob/answer/6128543 |

---

## Appendix B: Acceptance Criteria Checklist ✅

### MVP Launch Criteria
- [ ] User can authenticate via Google OAuth on both platforms
- [ ] Knowledge cards display correctly in all 3 languages
- [ ] Location-based content triggers within 100m accuracy
- [ ] App functions fully offline after content preload
- [ ] Banner ads display on all screens
- [ ] Interstitial ads show after every 4 cards
- [ ] App passes App Store and Play Store review
- [ ] No critical bugs (crash rate < 1%)

---

**Document End**

---

*Generated by PRD Creation Assistant | March 23, 2026*
