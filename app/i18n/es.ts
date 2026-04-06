import demoEs from "./demo-es"
import { Translations } from "./en"

const es: Translations = {
  common: {
    ok: "OK",
    cancel: "Cancelar",
    back: "Volver",
    logOut: "Cerrar sesión",
  },
  welcomeScreen: {
    postscript:
      "psst — Esto probablemente no es cómo se va a ver tu app. (A menos que tu diseñador te haya enviado estas pantallas, y en ese caso, ¡lánzalas en producción!)",
    readyForLaunch: "Tu app, casi lista para su lanzamiento",
    exciting: "(¡ohh, esto es emocionante!)",
    letsGo: "¡Vamos!",
  },
  errorScreen: {
    title: "¡Algo salió mal!",
    friendlySubtitle:
      "Esta es la pantalla que verán tus usuarios en producción cuando haya un error. Vas a querer personalizar este mensaje (que está ubicado en `app/i18n/es.ts`) y probablemente también su diseño (`app/screens/ErrorScreen`). Si quieres eliminarlo completamente, revisa `app/app.tsx` y el componente <ErrorBoundary>.",
    reset: "REINICIA LA APP",
    traceTitle: "Error desde %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Muy vacío... muy triste",
      content:
        "No se han encontrado datos por el momento. Intenta darle clic en el botón para refrescar o recargar la app.",
      button: "Intentemos de nuevo",
    },
  },

  errors: {
    invalidEmail: "Email inválido.",
  },
  loginScreen: {
    logIn: "Iniciar sesión",
    enterDetails:
      "Ingresa tus datos a continuación para desbloquear información ultra secreta. Nunca vas a adivinar lo que te espera al otro lado. O quizás si lo harás; la verdad no hay mucha ciencia alrededor.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Contraseña",
    emailFieldPlaceholder: "Ingresa tu email",
    passwordFieldPlaceholder: "Contraseña super secreta aquí",
    tapToLogIn: "¡Presiona acá para iniciar sesión!",
    hint: "Consejo: puedes usar cualquier email y tu contraseña preferida :)",
  },
  demoNavigator: {
    componentsTab: "Componentes",
    debugTab: "Debug",
    communityTab: "Comunidad",
    podcastListTab: "Podcasts",
  },
  demoCommunityScreen: {
    title: "Conecta con la comunidad",
    tagLine:
      "Únete a la comunidad React Native con los ingenieros de Infinite Red y mejora con nosotros tus habilidades para el desarrollo de apps.",
    joinUsOnSlackTitle: "Únete a nosotros en Slack",
    joinUsOnSlack:
      "¿Quieres conectar con desarrolladores de React Native de todo el mundo? Únete a la conversación en nuestra comunidad de Slack. Nuestra comunidad, que crece día a día, es un espacio seguro para hacer preguntas, aprender de los demás y ampliar tu red.",
    joinSlackLink: "Únete a la comunidad de Slack",
    makeIgniteEvenBetterTitle: "Haz que Ignite sea aún mejor",
    makeIgniteEvenBetter:
      "¿Tienes una idea para hacer que Ignite sea aún mejor? ¡Nos encantaría escucharla! Estamos siempre buscando personas que quieran ayudarnos a construir las mejores herramientas para React Native. Únete a nosotros en GitHub para ayudarnos a construir el futuro de Ignite.",
    contributeToIgniteLink: "Contribuir a Ignite",
    theLatestInReactNativeTitle: "Lo último en el mundo de React Native",
    theLatestInReactNative:
      "Estamos aquí para mantenerte al día con todo lo que React Native tiene para ofrecer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "Newsletter de React Native",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Conferencia Chain React",
    hireUsTitle: "Trabaja con Infinite Red en tu próximo proyecto",
    hireUs:
      "Ya sea para gestionar un proyecto de inicio a fin o educación a equipos a través de nuestros cursos y capacitación práctica, Infinite Red puede ayudarte en casi cualquier proyecto de React Native.",
    hireUsLink: "Envíanos un mensaje",
  },
  demoShowroomScreen: {
    jumpStart: "Componentes para comenzar tu proyecto",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "A través de el atributo `tx`",
    demoViaSpecifiedTxProp: "A través de el atributo específico `{{prop}}Tx`",
  },
  demoDebugScreen: {
    howTo: "CÓMO HACERLO",
    title: "Debug",
    tagLine:
      "Felicidades, aquí tienes una propuesta de arquitectura y base de código avanzada para una app en React Native. ¡Disfrutalos!",
    reactotron: "Enviar a Reactotron",
    reportBugs: "Reportar errores",
    demoList: "Lista demo",
    demoPodcastList: "Lista demo de podcasts",
    androidReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, corre adb reverse tcp:9090 tcp:9090 desde tu terminal, y luego recarga la app.",
    iosReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    macosReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    webReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    windowsReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
  },
  demoPodcastListScreen: {
    title: "Episodios de React Native Radio",
    onlyFavorites: "Mostrar solo favoritos",
    favoriteButton: "Favorito",
    unfavoriteButton: "No favorito",
    accessibility: {
      cardHint:
        "Haz doble clic para escuchar el episodio. Haz doble clic y mantén presionado para {{action}} este episodio.",
      switch: "Activa para mostrar solo favoritos",
      favoriteAction: "Cambiar a favorito",
      favoriteIcon: "Episodio no favorito",
      unfavoriteIcon: "Episodio favorito",
      publishLabel: "Publicado el {{date}}",
      durationLabel: "Duración: {{hours}} horas {{minutes}} minutos {{seconds}} segundos",
    },
    noFavoritesEmptyState: {
      heading: "Esto está un poco vacío",
      content:
        "No se han agregado episodios favoritos todavía. ¡Presiona el corazón dentro de un episodio para agregarlo a tus favoritos!",
    },
  },

  // Know Morocco - App metadata
  app: {
    name: "Know Morocco",
    tagline: "Descubre el Rico Patrimonio de Marruecos",
  },

  // Know Morocco - Navigation
  navigation: {
    home: "Inicio",
    nearby: "Cerca",
    profile: "Perfil",
    settings: "Configuración",
    favorites: "Favoritos",
    back: "Atrás",
    close: "Cerrar",
    done: "Hecho",
  },

  // Know Morocco - Authentication
  auth: {
    title: "Bienvenido a Know Morocco",
    subtitle: "Tu guía cultural personal",
    signInWithGoogle: "Iniciar sesión con Google",
    signingIn: "Iniciando sesión...",
    signOut: "Cerrar sesión",
    signOutConfirm: "¿Estás seguro de que quieres cerrar sesión?",
    welcome: "¡Bienvenido!",
    loginRequired: "Por favor, inicia sesión para continuar",
    loginSuccess: "¡Sesión iniciada correctamente!",
    loginError: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
  },

  // Know Morocco - Home Screen
  home: {
    title: "Descubrir Marruecos",
    subtitle: "Desliza para explorar las tarjetas",
    noCards: "No hay más tarjetas cerca",
    checkNearby: "Ver contenido cercano",
    loading: "Cargando tarjetas...",
    refresh: "Tirar para actualizar",
    categoryFilter: "Filtrar por categoría",
  },

  // Know Morocco - Knowledge Cards
  card: {
    monuments: "Monumentos",
    food: "Comida y Restaurantes",
    history: "Historia",
    culture: "Cultura",
    learnMore: "Saber más",
    playAudio: "Reproducir audio",
    pauseAudio: "Pausar audio",
    dismiss: "Descartar",
    next: "Siguiente",
    previous: "Anterior",
    of: "de",
    favorite: "Favorito",
    unfavorite: "Quitar de favoritos",
    share: "Compartir",
    distance: "A {{distance}}m",
  },

  // Know Morocco - Nearby Screen
  nearby: {
    title: "Contenido cercano",
    subtitle: "Explora los sitios culturales a tu alrededor",
    noLocation: "Se requiere acceso a la ubicación",
    locationDenied: "Se denegó el acceso a la ubicación. Por favor, actívalo en la configuración.",
    enableLocation: "Activar ubicación",
    searching: "Buscando contenido cercano...",
    noResults: "No se encontró contenido cercano",
    trySearch: "Intenta buscar una ubicación específica",
    search: "Buscar",
    distance: "Distancia",
    sortBy: "Ordenar por",
    nearest: "Más cercano",
    farthest: "Más lejano",
  },

  // Know Morocco - Profile Screen
  profile: {
    title: "Perfil",
    editProfile: "Editar perfil",
    language: "Idioma",
    selectLanguage: "Seleccionar idioma",
    theme: "Tema",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    systemTheme: "Predeterminado del sistema",
    notifications: "Notificaciones",
    offlineContent: "Contenido sin conexión",
    manageDownloads: "Gestionar descargas",
    about: "Acerca de",
    version: "Versión",
    privacyPolicy: "Política de privacidad",
    termsOfService: "Términos de servicio",
    help: "Ayuda y soporte",
    contactUs: "Contáctanos",
    rateApp: "Calificar aplicación",
    signOut: "Cerrar sesión",
  },

  // Know Morocco - Language Selection
  language: {
    title: "Seleccionar idioma",
    subtitle: "Elige tu idioma preferido",
    current: "Actual",
    english: "Inglés",
    french: "Francés",
    spanish: "Español",
    saved: "¡Idioma guardado!",
  },

  // Know Morocco - Settings
  settings: {
    title: "Configuración",
    general: "General",
    language: "Idioma",
    theme: "Tema",
    notifications: "Notificaciones",
    location: "Servicios de ubicación",
    privacy: "Privacidad",
    data: "Datos y almacenamiento",
    about: "Acerca de",
    version: "Versión de la aplicación",
    build: "Número de compilación",
  },

  // Know Morocco - Offline Mode
  offline: {
    title: "Contenido sin conexión",
    subtitle: "Descarga contenido para acceso sin conexión",
    downloading: "Descargando...",
    downloaded: "Descargado",
    notDownloaded: "No descargado",
    downloadAll: "Descargar todo",
    deleteAll: "Eliminar todo",
    download: "Descargar",
    delete: "Eliminar",
    size: "Tamaño",
    lastUpdated: "Última actualización",
    noContent: "No hay contenido sin conexión disponible",
    storageFull: "Almacenamiento lleno. Por favor, libera espacio.",
    downloadComplete: "¡Descarga completada!",
    downloadError: "Error al descargar. Por favor, inténtalo de nuevo.",
  },

  // Know Morocco - Status Messages
  status: {
    loading: "Cargando...",
    success: "¡Éxito!",
    error: "Error",
    retry: "Reintentar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    saved: "¡Guardado!",
    deleted: "¡Eliminado!",
    updated: "¡Actualizado!",
    noInternet: "Sin conexión a internet",
    offline: "Estás sin conexión",
    online: "De nuevo en línea",
    syncing: "Sincronizando...",
    syncComplete: "Sincronización completada",
    syncError: "Error de sincronización",
  },

  // Know Morocco - Categories
  categories: {
    all: "Todos",
    monuments: "Monumentos",
    food: "Comida",
    history: "Historia",
    culture: "Cultura",
  },

  // Know Morocco - Accessibility
  a11y: {
    close: "Cerrar",
    open: "Abrir",
    menu: "Menú",
    back: "Volver",
    next: "Siguiente",
    previous: "Anterior",
    play: "Reproducir",
    pause: "Pausar",
    favorite: "Añadir a favoritos",
    unfavorite: "Quitar de favoritos",
    share: "Compartir",
    download: "Descargar",
    delete: "Eliminar",
    refresh: "Actualizar",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
  },

  // Know Morocco - Time & Dates
  time: {
    now: "Ahora",
    today: "Hoy",
    yesterday: "Ayer",
    tomorrow: "Mañana",
    minutesAgo: "Hace {{minutes}} minutos",
    hoursAgo: "Hace {{hours}} horas",
    daysAgo: "Hace {{days}} días",
    weeksAgo: "Hace {{weeks}} semanas",
    monthsAgo: "Hace {{months}} meses",
    yearsAgo: "Hace {{years}} años",
  },

  // Know Morocco - Ads
  ads: {
    sponsored: "Patrocinado",
    learnMore: "Saber más",
    close: "Cerrar anuncio",
  },

  ...demoEs,
}

export default es
