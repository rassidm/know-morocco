import demoEn from "./demo-en"

const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    logIn: "Log In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToLogIn: "Tap to log in!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },

  // Know Morocco - App metadata
  app: {
    name: "Know Morocco",
    tagline: "Discover Morocco's Rich Heritage",
  },

  // Know Morocco - Navigation
  navigation: {
    home: "Home",
    nearby: "Nearby",
    profile: "Profile",
    settings: "Settings",
    favorites: "Favorites",
    back: "Back",
    close: "Close",
    done: "Done",
  },

  // Know Morocco - Authentication
  auth: {
    title: "Welcome to Know Morocco",
    subtitle: "Your personal cultural guide",
    signInWithGoogle: "Sign in with Google",
    signingIn: "Signing in...",
    completingAuth: "Completing authentication...",
    authTimeout: "Authentication timed out. Please try again.",
    signOut: "Sign Out",
    signOutConfirm: "Are you sure you want to sign out?",
    welcome: "Welcome!",
    loginRequired: "Please sign in to continue",
    loginSuccess: "Successfully signed in!",
    loginError: "Failed to sign in. Please try again.",
    termsAccept: "By signing in, you agree to our Terms of Service and Privacy Policy",
  },

  // Know Morocco - Home Screen
  home: {
    title: "Discover Morocco",
    subtitle: "Swipe to explore knowledge cards",
    noCards: "No more cards nearby",
    checkNearby: "Check nearby content",
    loading: "Loading cards...",
    refresh: "Pull to refresh",
    categoryFilter: "Filter by category",
  },

  // Know Morocco - Knowledge Cards
  card: {
    monuments: "Monuments",
    food: "Food & Restaurants",
    history: "History",
    culture: "Culture",
    learnMore: "Learn More",
    playAudio: "Play Audio",
    pauseAudio: "Pause Audio",
    dismiss: "Dismiss",
    next: "Next",
    previous: "Previous",
    of: "of",
    favorite: "Favorite",
    unfavorite: "Remove from Favorites",
    share: "Share",
    distance: "{{distance}}m away",
  },

  // Know Morocco - Nearby Screen
  nearby: {
    title: "Nearby Content",
    subtitle: "Browse cultural sites around you",
    noLocation: "Location access required",
    locationDenied: "Location access was denied. Please enable it in settings.",
    enableLocation: "Enable Location",
    searching: "Searching for nearby content...",
    noResults: "No content found nearby",
    trySearch: "Try searching for a specific location",
    search: "Search",
    distance: "Distance",
    sortBy: "Sort by",
    nearest: "Nearest",
    farthest: "Farthest",
  },

  // Know Morocco - Profile Screen
  profile: {
    title: "Profile",
    editProfile: "Edit Profile",
    language: "Language",
    selectLanguage: "Select Language",
    theme: "Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    systemTheme: "System Default",
    notifications: "Notifications",
    offlineContent: "Offline Content",
    manageDownloads: "Manage Downloads",
    about: "About",
    version: "Version",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    help: "Help & Support",
    contactUs: "Contact Us",
    rateApp: "Rate App",
    signOut: "Sign Out",
  },

  // Know Morocco - Language Selection
  language: {
    title: "Select Language",
    subtitle: "Choose your preferred language",
    current: "Current",
    english: "English",
    french: "French",
    spanish: "Spanish",
    saved: "Language saved!",
  },

  // Know Morocco - Settings
  settings: {
    title: "Settings",
    general: "General",
    language: "Language",
    theme: "Theme",
    notifications: "Notifications",
    location: "Location Services",
    privacy: "Privacy",
    data: "Data & Storage",
    about: "About",
    version: "App Version",
    build: "Build Number",
  },

  // Know Morocco - Offline Mode
  offline: {
    title: "Offline Content",
    subtitle: "Download content for offline access",
    downloading: "Downloading...",
    downloaded: "Downloaded",
    notDownloaded: "Not Downloaded",
    downloadAll: "Download All",
    deleteAll: "Delete All",
    download: "Download",
    delete: "Delete",
    size: "Size",
    lastUpdated: "Last Updated",
    noContent: "No offline content available",
    storageFull: "Storage full. Please free up space.",
    downloadComplete: "Download complete!",
    downloadError: "Download failed. Please try again.",
  },

  // Know Morocco - Status Messages
  status: {
    loading: "Loading...",
    success: "Success!",
    error: "Error",
    retry: "Retry",
    cancel: "Cancel",
    confirm: "Confirm",
    saved: "Saved!",
    deleted: "Deleted!",
    updated: "Updated!",
    noInternet: "No internet connection",
    offline: "You're offline",
    online: "Back online",
    syncing: "Syncing...",
    syncComplete: "Sync complete",
    syncError: "Sync failed",
  },

  // Know Morocco - Categories
  categories: {
    all: "All",
    monuments: "Monuments",
    food: "Food",
    history: "History",
    culture: "Culture",
  },

  // Know Morocco - Accessibility
  a11y: {
    close: "Close",
    open: "Open",
    menu: "Menu",
    back: "Go back",
    next: "Next",
    previous: "Previous",
    play: "Play",
    pause: "Pause",
    favorite: "Add to favorites",
    unfavorite: "Remove from favorites",
    share: "Share",
    download: "Download",
    delete: "Delete",
    refresh: "Refresh",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
  },

  // Know Morocco - Time & Dates
  time: {
    now: "Now",
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    minutesAgo: "{{minutes}} minutes ago",
    hoursAgo: "{{hours}} hours ago",
    daysAgo: "{{days}} days ago",
    weeksAgo: "{{weeks}} weeks ago",
    monthsAgo: "{{months}} months ago",
    yearsAgo: "{{years}} years ago",
  },

  // Know Morocco - Ads
  ads: {
    sponsored: "Sponsored",
    learnMore: "Learn More",
    close: "Close Ad",
  },

  ...demoEn,
}

export default en
export type Translations = typeof en
