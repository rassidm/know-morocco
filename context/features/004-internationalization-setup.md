# Feature: Internationalization (i18n) Setup

## Metadata

- **Feature ID:** 004
- **Phase:** 1 - Foundation Setup
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 001 (Project Configuration), 002 (Theme System)

---

## Goals

Set up complete internationalization support for the Know Morocco app with English, French, and Spanish languages. This feature establishes the i18n infrastructure that allows all UI text to be translated and switched dynamically based on user preference.

### Acceptance Criteria

- [ ] i18next configured for React Native
- [ ] Translation files created for English (en)
- [ ] Translation files created for French (fr)
- [ ] Translation files created for Spanish (es)
- [ ] Language detection from device locale
- [ ] Language switching functionality
- [ ] Translation hook created
- [ ] Date/time localization configured
- [ ] RTL support ready (if needed in future)

---

## Implementation Steps

### Step 1: Install Required Dependencies

Install the necessary i18n packages:

```bash
npm install i18next react-i18next expo-localization intl-pluralrules
```

Note: These packages may already be installed in the project. Verify in package.json.

---

### Step 2: Create i18n Configuration

Create the main i18n configuration file.

**File:** `app/i18n/i18n.ts`
```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import { Platform } from 'react-native'

// Import translations
import en from './en'
import fr from './fr'
import es from './es'

/**
 * Supported languages
 */
export type LanguageCode = 'en' | 'fr' | 'es'

/**
 * Language metadata
 */
export interface Language {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
]

/**
 * Get language name from code
 */
export function getLanguageName(code: string): string {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code)?.name || 'English'
}

/**
 * Get language flag from code
 */
export function getLanguageFlag(code: string): string {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code)?.flag || '🇬🇧'
}

/**
 * Detect device language
 * Falls back to English if device language is not supported
 */
function getDeviceLanguage(): LanguageCode {
  const deviceLocale = Localization.getLocales()[0]
  const deviceLanguage = deviceLocale?.languageCode?.toLowerCase()

  // Check if device language is supported
  if (deviceLanguage && SUPPORTED_LANGUAGES.some((lang) => lang.code === deviceLanguage)) {
    return deviceLanguage as LanguageCode
  }

  // Default to English
  return 'en'
}

/**
 * Initialize i18next
 */
i18n
  .use(initReactI18next)
  .init({
    // Supported languages
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es'],

    // Translation resources
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
    },

    // React-specific settings
    react: {
      useSuspense: false,
    },

    // Interpolation
    interpolation: {
      escapeValue: false, // React already handles escaping
    },

    // Compatibility settings
    compatibilityJSON: 'v3',

    // Pluralization
    pluralSeparator: '_',

    // Debug mode (disable in production)
    debug: __DEV__,
  })

// Set RTL direction based on language
export function isRTL(): boolean {
  // Currently no RTL languages, but ready for future (e.g., Arabic)
  return false
}

// Export for use in app
export default i18n
```

---

### Step 3: Create English Translations

Create the English translation file with all app strings.

**File:** `app/i18n/en.ts`
```typescript
/**
 * English Translations
 */
const en = {
  // App metadata
  app: {
    name: 'Know Morocco',
    tagline: 'Discover Morocco\'s Rich Heritage',
  },

  // Navigation
  navigation: {
    home: 'Home',
    nearby: 'Nearby',
    profile: 'Profile',
    settings: 'Settings',
    favorites: 'Favorites',
    back: 'Back',
    close: 'Close',
    done: 'Done',
  },

  // Authentication
  auth: {
    title: 'Welcome to Know Morocco',
    subtitle: 'Your personal cultural guide',
    signInWithGoogle: 'Sign in with Google',
    signingIn: 'Signing in...',
    signOut: 'Sign Out',
    signOutConfirm: 'Are you sure you want to sign out?',
    welcome: 'Welcome!',
    loginRequired: 'Please sign in to continue',
    loginSuccess: 'Successfully signed in!',
    loginError: 'Failed to sign in. Please try again.',
  },

  // Home Screen
  home: {
    title: 'Discover Morocco',
    subtitle: 'Swipe to explore knowledge cards',
    noCards: 'No more cards nearby',
    checkNearby: 'Check nearby content',
    loading: 'Loading cards...',
    refresh: 'Pull to refresh',
    categoryFilter: 'Filter by category',
  },

  // Knowledge Cards
  card: {
    monuments: 'Monuments',
    food: 'Food & Restaurants',
    history: 'History',
    culture: 'Culture',
    learnMore: 'Learn More',
    playAudio: 'Play Audio',
    pauseAudio: 'Pause Audio',
    dismiss: 'Dismiss',
    next: 'Next',
    previous: 'Previous',
    of: 'of',
    favorite: 'Favorite',
    unfavorite: 'Remove from Favorites',
    share: 'Share',
    distance: '{{distance}}m away',
  },

  // Nearby Screen
  nearby: {
    title: 'Nearby Content',
    subtitle: 'Browse cultural sites around you',
    noLocation: 'Location access required',
    locationDenied: 'Location access was denied. Please enable it in settings.',
    enableLocation: 'Enable Location',
    searching: 'Searching for nearby content...',
    noResults: 'No content found nearby',
    trySearch: 'Try searching for a specific location',
    search: 'Search',
    distance: 'Distance',
    sortBy: 'Sort by',
    nearest: 'Nearest',
    farthest: 'Farthest',
  },

  // Profile Screen
  profile: {
    title: 'Profile',
    editProfile: 'Edit Profile',
    language: 'Language',
    selectLanguage: 'Select Language',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemTheme: 'System Default',
    notifications: 'Notifications',
    offlineContent: 'Offline Content',
    manageDownloads: 'Manage Downloads',
    about: 'About',
    version: 'Version',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    help: 'Help & Support',
    contactUs: 'Contact Us',
    rateApp: 'Rate App',
    signOut: 'Sign Out',
  },

  // Language Selection
  language: {
    title: 'Select Language',
    subtitle: 'Choose your preferred language',
    current: 'Current',
    english: 'English',
    french: 'French',
    spanish: 'Spanish',
    saved: 'Language saved!',
  },

  // Settings
  settings: {
    title: 'Settings',
    general: 'General',
    language: 'Language',
    theme: 'Theme',
    notifications: 'Notifications',
    location: 'Location Services',
    privacy: 'Privacy',
    data: 'Data & Storage',
    about: 'About',
    version: 'App Version',
    build: 'Build Number',
  },

  // Offline Mode
  offline: {
    title: 'Offline Content',
    subtitle: 'Download content for offline access',
    downloading: 'Downloading...',
    downloaded: 'Downloaded',
    notDownloaded: 'Not Downloaded',
    downloadAll: 'Download All',
    deleteAll: 'Delete All',
    download: 'Download',
    delete: 'Delete',
    size: 'Size',
    lastUpdated: 'Last Updated',
    noContent: 'No offline content available',
    storageFull: 'Storage full. Please free up space.',
    downloadComplete: 'Download complete!',
    downloadError: 'Download failed. Please try again.',
  },

  // Status Messages
  status: {
    loading: 'Loading...',
    success: 'Success!',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    confirm: 'Confirm',
    saved: 'Saved!',
    deleted: 'Deleted!',
    updated: 'Updated!',
    noInternet: 'No internet connection',
    offline: 'You\'re offline',
    online: 'Back online',
    syncing: 'Syncing...',
    syncComplete: 'Sync complete',
    syncError: 'Sync failed',
  },

  // Categories
  categories: {
    all: 'All',
    monuments: 'Monuments',
    food: 'Food',
    history: 'History',
    culture: 'Culture',
  },

  // Errors
  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    server: 'Server error. Please try again later.',
    notFound: 'Content not found.',
    unauthorized: 'Please sign in to continue.',
    permissionDenied: 'Permission denied.',
    locationUnavailable: 'Location services unavailable.',
    cameraUnavailable: 'Camera unavailable.',
    storageFull: 'Storage full.',
    invalidInput: 'Invalid input.',
    required: 'This field is required.',
    email: 'Please enter a valid email.',
    password: 'Password must be at least 8 characters.',
  },

  // Accessibility
  a11y: {
    close: 'Close',
    open: 'Open',
    menu: 'Menu',
    back: 'Go back',
    next: 'Next',
    previous: 'Previous',
    play: 'Play',
    pause: 'Pause',
    favorite: 'Add to favorites',
    unfavorite: 'Remove from favorites',
    share: 'Share',
    download: 'Download',
    delete: 'Delete',
    refresh: 'Refresh',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
  },

  // Time & Dates
  time: {
    now: 'Now',
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    minutesAgo: '{{minutes}} minutes ago',
    hoursAgo: '{{hours}} hours ago',
    daysAgo: '{{days}} days ago',
    weeksAgo: '{{weeks}} weeks ago',
    monthsAgo: '{{months}} months ago',
    yearsAgo: '{{years}} years ago',
  },

  // Ads (for user awareness)
  ads: {
    sponsored: 'Sponsored',
    learnMore: 'Learn More',
    close: 'Close Ad',
  },
}

export default en
```

---

### Step 4: Create French Translations

Create the French translation file.

**File:** `app/i18n/fr.ts`
```typescript
/**
 * French Translations / Traductions Françaises
 */
const fr = {
  // App metadata
  app: {
    name: 'Know Morocco',
    tagline: 'Découvrez le Riche Patrimoine du Maroc',
  },

  // Navigation
  navigation: {
    home: 'Accueil',
    nearby: 'À proximité',
    profile: 'Profil',
    settings: 'Paramètres',
    favorites: 'Favoris',
    back: 'Retour',
    close: 'Fermer',
    done: 'Terminé',
  },

  // Authentication
  auth: {
    title: 'Bienvenue sur Know Morocco',
    subtitle: 'Votre guide culturel personnel',
    signInWithGoogle: 'Se connecter avec Google',
    signingIn: 'Connexion en cours...',
    signOut: 'Se déconnecter',
    signOutConfirm: 'Êtes-vous sûr de vouloir vous déconnecter?',
    welcome: 'Bienvenue!',
    loginRequired: 'Veuillez vous connecter pour continuer',
    loginSuccess: 'Connecté avec succès!',
    loginError: 'Échec de la connexion. Veuillez réessayer.',
  },

  // Home Screen
  home: {
    title: 'Découvrir le Maroc',
    subtitle: 'Faites défiler pour explorer les cartes',
    noCards: 'Plus de cartes à proximité',
    checkNearby: 'Voir le contenu à proximité',
    loading: 'Chargement des cartes...',
    refresh: 'Tirer pour rafraîchir',
    categoryFilter: 'Filtrer par catégorie',
  },

  // Knowledge Cards
  card: {
    monuments: 'Monuments',
    food: 'Nourriture & Restaurants',
    history: 'Histoire',
    culture: 'Culture',
    learnMore: 'En savoir plus',
    playAudio: 'Lire l\'audio',
    pauseAudio: 'Pause audio',
    dismiss: 'Ignorer',
    next: 'Suivant',
    previous: 'Précédent',
    of: 'sur',
    favorite: 'Favori',
    unfavorite: 'Retirer des favoris',
    share: 'Partager',
    distance: 'À {{distance}}m',
  },

  // Nearby Screen
  nearby: {
    title: 'Contenu à proximité',
    subtitle: 'Parcourez les sites culturels autour de vous',
    noLocation: 'Accès à la localisation requis',
    locationDenied: 'L\'accès à la localisation a été refusé. Veuillez l\'activer dans les paramètres.',
    enableLocation: 'Activer la localisation',
    searching: 'Recherche de contenu à proximité...',
    noResults: 'Aucun contenu trouvé à proximité',
    trySearch: 'Essayez de rechercher un lieu spécifique',
    search: 'Rechercher',
    distance: 'Distance',
    sortBy: 'Trier par',
    nearest: 'Plus proche',
    farthest: 'Plus loin',
  },

  // Profile Screen
  profile: {
    title: 'Profil',
    editProfile: 'Modifier le profil',
    language: 'Langue',
    selectLanguage: 'Sélectionner la langue',
    theme: 'Thème',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    systemTheme: 'Système par défaut',
    notifications: 'Notifications',
    offlineContent: 'Contenu hors ligne',
    manageDownloads: 'Gérer les téléchargements',
    about: 'À propos',
    version: 'Version',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    help: 'Aide & Support',
    contactUs: 'Nous contacter',
    rateApp: 'Évaluer l\'application',
    signOut: 'Se déconnecter',
  },

  // Language Selection
  language: {
    title: 'Sélectionner la langue',
    subtitle: 'Choisissez votre langue préférée',
    current: 'Actuel',
    english: 'Anglais',
    french: 'Français',
    spanish: 'Espagnol',
    saved: 'Langue enregistrée!',
  },

  // Settings
  settings: {
    title: 'Paramètres',
    general: 'Général',
    language: 'Langue',
    theme: 'Thème',
    notifications: 'Notifications',
    location: 'Services de localisation',
    privacy: 'Confidentialité',
    data: 'Données & Stockage',
    about: 'À propos',
    version: 'Version de l\'application',
    build: 'Numéro de build',
  },

  // Offline Mode
  offline: {
    title: 'Contenu hors ligne',
    subtitle: 'Téléchargez du contenu pour un accès hors ligne',
    downloading: 'Téléchargement en cours...',
    downloaded: 'Téléchargé',
    notDownloaded: 'Non téléchargé',
    downloadAll: 'Tout télécharger',
    deleteAll: 'Tout supprimer',
    download: 'Télécharger',
    delete: 'Supprimer',
    size: 'Taille',
    lastUpdated: 'Dernière mise à jour',
    noContent: 'Aucun contenu hors ligne disponible',
    storageFull: 'Stockage plein. Veuillez libérer de l\'espace.',
    downloadComplete: 'Téléchargement terminé!',
    downloadError: 'Échec du téléchargement. Veuillez réessayer.',
  },

  // Status Messages
  status: {
    loading: 'Chargement...',
    success: 'Succès!',
    error: 'Erreur',
    retry: 'Réessayer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    saved: 'Enregistré!',
    deleted: 'Supprimé!',
    updated: 'Mis à jour!',
    noInternet: 'Pas de connexion internet',
    offline: 'Vous êtes hors ligne',
    online: 'De nouveau en ligne',
    syncing: 'Synchronisation...',
    syncComplete: 'Synchronisation terminée',
    syncError: 'Échec de la synchronisation',
  },

  // Categories
  categories: {
    all: 'Tous',
    monuments: 'Monuments',
    food: 'Nourriture',
    history: 'Histoire',
    culture: 'Culture',
  },

  // Errors
  errors: {
    generic: 'Une erreur est survenue. Veuillez réessayer.',
    network: 'Erreur réseau. Veuillez vérifier votre connexion.',
    server: 'Erreur serveur. Veuillez réessayer plus tard.',
    notFound: 'Contenu non trouvé.',
    unauthorized: 'Veuillez vous connecter pour continuer.',
    permissionDenied: 'Permission refusée.',
    locationUnavailable: 'Services de localisation indisponibles.',
    cameraUnavailable: 'Caméra indisponible.',
    storageFull: 'Stockage plein.',
    invalidInput: 'Entrée invalide.',
    required: 'Ce champ est obligatoire.',
    email: 'Veuillez entrer une adresse email valide.',
    password: 'Le mot de passe doit contenir au moins 8 caractères.',
  },

  // Accessibility
  a11y: {
    close: 'Fermer',
    open: 'Ouvrir',
    menu: 'Menu',
    back: 'Retourner',
    next: 'Suivant',
    previous: 'Précédent',
    play: 'Lire',
    pause: 'Pause',
    favorite: 'Ajouter aux favoris',
    unfavorite: 'Retirer des favoris',
    share: 'Partager',
    download: 'Télécharger',
    delete: 'Supprimer',
    refresh: 'Rafraîchir',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
  },

  // Time & Dates
  time: {
    now: 'Maintenant',
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    tomorrow: 'Demain',
    minutesAgo: 'Il y a {{minutes}} minutes',
    hoursAgo: 'Il y a {{hours}} heures',
    daysAgo: 'Il y a {{days}} jours',
    weeksAgo: 'Il y a {{weeks}} semaines',
    monthsAgo: 'Il y a {{months}} mois',
    yearsAgo: 'Il y a {{years}} ans',
  },

  // Ads
  ads: {
    sponsored: 'Sponsorisé',
    learnMore: 'En savoir plus',
    close: 'Fermer la publicité',
  },
}

export default fr
```

---

### Step 5: Create Spanish Translations

Create the Spanish translation file.

**File:** `app/i18n/es.ts`
```typescript
/**
 * Spanish Translations / Traducciones al Español
 */
const es = {
  // App metadata
  app: {
    name: 'Know Morocco',
    tagline: 'Descubre el Rico Patrimonio de Marruecos',
  },

  // Navigation
  navigation: {
    home: 'Inicio',
    nearby: 'Cerca',
    profile: 'Perfil',
    settings: 'Configuración',
    favorites: 'Favoritos',
    back: 'Atrás',
    close: 'Cerrar',
    done: 'Hecho',
  },

  // Authentication
  auth: {
    title: 'Bienvenido a Know Morocco',
    subtitle: 'Tu guía cultural personal',
    signInWithGoogle: 'Iniciar sesión con Google',
    signingIn: 'Iniciando sesión...',
    signOut: 'Cerrar sesión',
    signOutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
    welcome: '¡Bienvenido!',
    loginRequired: 'Por favor, inicia sesión para continuar',
    loginSuccess: '¡Sesión iniciada correctamente!',
    loginError: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
  },

  // Home Screen
  home: {
    title: 'Descubrir Marruecos',
    subtitle: 'Desliza para explorar las tarjetas',
    noCards: 'No hay más tarjetas cerca',
    checkNearby: 'Ver contenido cercano',
    loading: 'Cargando tarjetas...',
    refresh: 'Tirar para actualizar',
    categoryFilter: 'Filtrar por categoría',
  },

  // Knowledge Cards
  card: {
    monuments: 'Monumentos',
    food: 'Comida y Restaurantes',
    history: 'Historia',
    culture: 'Cultura',
    learnMore: 'Saber más',
    playAudio: 'Reproducir audio',
    pauseAudio: 'Pausar audio',
    dismiss: 'Descartar',
    next: 'Siguiente',
    previous: 'Anterior',
    of: 'de',
    favorite: 'Favorito',
    unfavorite: 'Quitar de favoritos',
    share: 'Compartir',
    distance: 'A {{distance}}m',
  },

  // Nearby Screen
  nearby: {
    title: 'Contenido cercano',
    subtitle: 'Explora los sitios culturales a tu alrededor',
    noLocation: 'Se requiere acceso a la ubicación',
    locationDenied: 'Se denegó el acceso a la ubicación. Por favor, actívalo en la configuración.',
    enableLocation: 'Activar ubicación',
    searching: 'Buscando contenido cercano...',
    noResults: 'No se encontró contenido cercano',
    trySearch: 'Intenta buscar una ubicación específica',
    search: 'Buscar',
    distance: 'Distancia',
    sortBy: 'Ordenar por',
    nearest: 'Más cercano',
    farthest: 'Más lejano',
  },

  // Profile Screen
  profile: {
    title: 'Perfil',
    editProfile: 'Editar perfil',
    language: 'Idioma',
    selectLanguage: 'Seleccionar idioma',
    theme: 'Tema',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    systemTheme: 'Predeterminado del sistema',
    notifications: 'Notificaciones',
    offlineContent: 'Contenido sin conexión',
    manageDownloads: 'Gestionar descargas',
    about: 'Acerca de',
    version: 'Versión',
    privacyPolicy: 'Política de privacidad',
    termsOfService: 'Términos de servicio',
    help: 'Ayuda y soporte',
    contactUs: 'Contáctanos',
    rateApp: 'Calificar aplicación',
    signOut: 'Cerrar sesión',
  },

  // Language Selection
  language: {
    title: 'Seleccionar idioma',
    subtitle: 'Elige tu idioma preferido',
    current: 'Actual',
    english: 'Inglés',
    french: 'Francés',
    spanish: 'Español',
    saved: '¡Idioma guardado!',
  },

  // Settings
  settings: {
    title: 'Configuración',
    general: 'General',
    language: 'Idioma',
    theme: 'Tema',
    notifications: 'Notificaciones',
    location: 'Servicios de ubicación',
    privacy: 'Privacidad',
    data: 'Datos y almacenamiento',
    about: 'Acerca de',
    version: 'Versión de la aplicación',
    build: 'Número de compilación',
  },

  // Offline Mode
  offline: {
    title: 'Contenido sin conexión',
    subtitle: 'Descarga contenido para acceso sin conexión',
    downloading: 'Descargando...',
    downloaded: 'Descargado',
    notDownloaded: 'No descargado',
    downloadAll: 'Descargar todo',
    deleteAll: 'Eliminar todo',
    download: 'Descargar',
    delete: 'Eliminar',
    size: 'Tamaño',
    lastUpdated: 'Última actualización',
    noContent: 'No hay contenido sin conexión disponible',
    storageFull: 'Almacenamiento lleno. Por favor, libera espacio.',
    downloadComplete: '¡Descarga completada!',
    downloadError: 'Error al descargar. Por favor, inténtalo de nuevo.',
  },

  // Status Messages
  status: {
    loading: 'Cargando...',
    success: '¡Éxito!',
    error: 'Error',
    retry: 'Reintentar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    saved: '¡Guardado!',
    deleted: '¡Eliminado!',
    updated: '¡Actualizado!',
    noInternet: 'Sin conexión a internet',
    offline: 'Estás sin conexión',
    online: 'De nuevo en línea',
    syncing: 'Sincronizando...',
    syncComplete: 'Sincronización completada',
    syncError: 'Error de sincronización',
  },

  // Categories
  categories: {
    all: 'Todos',
    monuments: 'Monumentos',
    food: 'Comida',
    history: 'Historia',
    culture: 'Cultura',
  },

  // Errors
  errors: {
    generic: 'Algo salió mal. Por favor, inténtalo de nuevo.',
    network: 'Error de red. Por favor, verifica tu conexión.',
    server: 'Error del servidor. Por favor, inténtalo más tarde.',
    notFound: 'Contenido no encontrado.',
    unauthorized: 'Por favor, inicia sesión para continuar.',
    permissionDenied: 'Permiso denegado.',
    locationUnavailable: 'Servicios de ubicación no disponibles.',
    cameraUnavailable: 'Cámara no disponible.',
    storageFull: 'Almacenamiento lleno.',
    invalidInput: 'Entrada inválida.',
    required: 'Este campo es obligatorio.',
    email: 'Por favor, introduce una dirección de correo válida.',
    password: 'La contraseña debe tener al menos 8 caracteres.',
  },

  // Accessibility
  a11y: {
    close: 'Cerrar',
    open: 'Abrir',
    menu: 'Menú',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    play: 'Reproducir',
    pause: 'Pausar',
    favorite: 'Añadir a favoritos',
    unfavorite: 'Quitar de favoritos',
    share: 'Compartir',
    download: 'Descargar',
    delete: 'Eliminar',
    refresh: 'Actualizar',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
  },

  // Time & Dates
  time: {
    now: 'Ahora',
    today: 'Hoy',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    minutesAgo: 'Hace {{minutes}} minutos',
    hoursAgo: 'Hace {{hours}} horas',
    daysAgo: 'Hace {{days}} días',
    weeksAgo: 'Hace {{weeks}} semanas',
    monthsAgo: 'Hace {{months}} meses',
    yearsAgo: 'Hace {{years}} años',
  },

  // Ads
  ads: {
    sponsored: 'Patrocinado',
    learnMore: 'Saber más',
    close: 'Cerrar anuncio',
  },
}

export default es
```

---

### Step 6: Create Translation Helper Hook

Create a custom hook for easier translation usage.

**File:** `app/i18n/useTranslation.ts`
```typescript
import { useTranslation as useI18nextTranslation } from 'react-i18next'
import { LanguageCode } from './i18n'

/**
 * Enhanced useTranslation hook with typed translations
 */
export function useTranslation() {
  const { t, i18n, ready } = useI18nextTranslation()

  /**
   * Change the app language
   */
  const changeLanguage = async (lng: LanguageCode) => {
    await i18n.changeLanguage(lng)
  }

  /**
   * Get current language code
   */
  const currentLanguage = i18n.language as LanguageCode

  /**
   * Check if translations are ready
   */
  const isReady = ready

  return {
    t,
    i18n,
    currentLanguage,
    changeLanguage,
    isReady,
  }
}

export default useTranslation
```

---

### Step 7: Create i18n Index File

Export all i18n modules from a single file.

**File:** `app/i18n/index.ts`
```typescript
// i18n configuration
export { default as i18n } from './i18n'

// Types and constants
export type { LanguageCode } from './i18n'
export {
  SUPPORTED_LANGUAGES,
  getLanguageName,
  getLanguageFlag,
  isRTL,
} from './i18n'

// Translations
export { default as enTranslations } from './en'
export { default as frTranslations } from './fr'
export { default as esTranslations } from './es'

// Hooks
export { useTranslation } from './useTranslation'
```

---

### Step 8: Integrate i18n into App

Update the main app file to initialize i18n.

**File:** `app/app.tsx`

Add i18n import at the top of the file:

```typescript
// Import i18n configuration (must be imported before app renders)
import '@/i18n/i18n'
```

---

## Mock Data (If Applicable)

Not applicable - this is an i18n infrastructure feature.

---

## Integration Points

### Connects To

- **Feature 002** - Theme system for styling language selector
- **Feature 007** - MMKV for language preference persistence
- **Feature 036** - Language Selector UI

### Used By

- **Feature 037** - Language Service
- **Feature 038** - Profile Language Sync
- All screens and components that display text

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] App launches without i18n errors
- [ ] Default language is English
- [ ] Language switching works
- [ ] All translations load correctly
- [ ] `t()` function returns translated strings
- [ ] Interpolation works (e.g., `{{distance}}`)
- [ ] Pluralization works if needed
- [ ] Device language is detected on first launch
- [ ] Missing translations fall back to English

---

## Notes

- The i18n setup uses `expo-localization` for device language detection
- Translations are organized by feature/screen for maintainability
- The `t()` function supports nested keys (e.g., `auth.signInWithGoogle`)
- Consider adding Arabic (ar) in the future for RTL support
- Date/time formatting will be handled by `date-fns` with locale support

---

## References

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Expo Localization](https://docs.expo.dev/versions/latest/sdk/localization/)
- [Internationalization Best Practices](https://www.w3.org/International/)
