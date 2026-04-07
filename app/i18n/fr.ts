import demoFr from "./demo-fr"
import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "OK !",
    cancel: "Annuler",
    back: "Retour",
    logOut: "Déconnexion",
  },
  welcomeScreen: {
    postscript:
      "psst  — Ce n'est probablement pas à quoi ressemble votre application. (À moins que votre designer ne vous ait donné ces écrans, dans ce cas, mettez la en prod !)",
    readyForLaunch: "Votre application, presque prête pour le lancement !",
    exciting: "(ohh, c'est excitant !)",
    letsGo: "Allons-y !",
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé !",
    friendlySubtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
    traceTitle: "Erreur depuis %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Si vide... si triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },

  errors: {
    invalidEmail: "Adresse e-mail invalide.",
  },
  loginScreen: {
    logIn: "Se connecter",
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en attente. Ou peut-être que vous le ferez ; ce n'est pas de la science spatiale ici.",
    emailFieldLabel: "E-mail",
    passwordFieldLabel: "Mot de passe",
    emailFieldPlaceholder: "Entrez votre adresse e-mail",
    passwordFieldPlaceholder: "Mot de passe super secret ici",
    tapToLogIn: "Appuyez pour vous connecter!",
    hint: "Astuce : vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
  },
  demoNavigator: {
    componentsTab: "Composants",
    debugTab: "Débogage",
    communityTab: "Communauté",
    podcastListTab: "Podcasts",
  },
  demoCommunityScreen: {
    title: "Connectez-vous avec la communauté",
    tagLine:
      "Rejoignez la communauté d'ingénieurs React Native d'Infinite Red et améliorez votre développement d'applications avec nous !",
    joinUsOnSlackTitle: "Rejoignez-nous sur Slack",
    joinUsOnSlack:
      "Vous souhaitez vous connecter avec des ingénieurs React Native du monde entier ? Rejoignez la conversation dans la communauté Slack d'Infinite Red ! Notre communauté en pleine croissance est un espace sûr pour poser des questions, apprendre des autres et développer votre réseau.",
    joinSlackLink: "Rejoindre la communauté Slack",
    makeIgniteEvenBetterTitle: "Rendre Ignite encore meilleur",
    makeIgniteEvenBetter:
      "Vous avez une idée pour rendre Ignite encore meilleur ? Nous sommes heureux de l'entendre ! Nous cherchons toujours des personnes qui veulent nous aider à construire les meilleurs outils React Native. Rejoignez-nous sur GitHub pour nous aider à construire l'avenir d'Ignite.",
    contributeToIgniteLink: "Contribuer à Ignite",
    theLatestInReactNativeTitle: "Les dernières nouvelles de React Native",
    theLatestInReactNative:
      "Nous sommes là pour vous tenir au courant de tout ce que React Native a à offrir.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Conférence Chain React",
    hireUsTitle: "Engagez Infinite Red pour votre prochain projet",
    hireUs:
      "Que ce soit pour gérer un projet complet ou pour former des équipes à notre formation pratique, Infinite Red peut vous aider pour presque tous les projets React Native.",
    hireUsLink: "Envoyez-nous un message",
  },
  demoShowroomScreen: {
    jumpStart: "Composants pour démarrer votre projet !",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via la propriété `tx`",
    demoViaSpecifiedTxProp: "Via la propriété `{{prop}}Tx` spécifiée",
  },
  demoDebugScreen: {
    howTo: "COMMENT FAIRE",
    title: "Débugage",
    tagLine:
      "Félicitations, vous avez un modèle d'application React Native très avancé ici. Profitez de cette base de code !",
    reactotron: "Envoyer à Reactotron",
    reportBugs: "Signaler des bugs",
    demoList: "Liste de démonstration",
    demoPodcastList: "Liste de podcasts de démonstration",
    androidReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, exécutez adb reverse tcp:9090 tcp:9090 à partir de votre terminal, puis rechargez l'application.",
    iosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    macosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    webReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    windowsReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
  },
  demoPodcastListScreen: {
    title: "Épisodes de Radio React Native",
    onlyFavorites: "Afficher uniquement les favoris",
    favoriteButton: "Favori",
    unfavoriteButton: "Non favori",
    accessibility: {
      cardHint:
        "Double-cliquez pour écouter l'épisode. Double-cliquez et maintenez pour {{action}} cet épisode.",
      switch: "Activez pour afficher uniquement les favoris",
      favoriteAction: "Basculer en favori",
      favoriteIcon: "Épisode non favori",
      unfavoriteIcon: "Épisode favori",
      publishLabel: "Publié le {{date}}",
      durationLabel: "Durée : {{hours}} heures {{minutes}} minutes {{seconds}} secondes",
    },
    noFavoritesEmptyState: {
      heading: "C'est un peu vide ici",
      content:
        "Aucun favori n'a été ajouté pour le moment. Appuyez sur le cœur d'un épisode pour l'ajouter à vos favoris !",
    },
  },

  // Know Morocco - App metadata
  app: {
    name: "Know Morocco",
    tagline: "Découvrez le Riche Patrimoine du Maroc",
  },

  // Know Morocco - Navigation
  navigation: {
    home: "Accueil",
    nearby: "À proximité",
    profile: "Profil",
    settings: "Paramètres",
    favorites: "Favoris",
    back: "Retour",
    close: "Fermer",
    done: "Terminé",
  },

  // Know Morocco - Authentication
  auth: {
    title: "Bienvenue sur Know Morocco",
    subtitle: "Votre guide culturel personnel",
    signInWithGoogle: "Se connecter avec Google",
    signingIn: "Connexion en cours...",
    signOut: "Se déconnecter",
    signOutConfirm: "Êtes-vous sûr de vouloir vous déconnecter ?",
    welcome: "Bienvenue !",
    loginRequired: "Veuillez vous connecter pour continuer",
    loginSuccess: "Connecté avec succès !",
    loginError: "Échec de la connexion. Veuillez réessayer.",
    termsAccept:
      "En vous connectant, vous acceptez nos Conditions d'utilisation et Politique de confidentialité",
  },

  // Know Morocco - Home Screen
  home: {
    title: "Découvrir le Maroc",
    subtitle: "Faites défiler pour explorer les cartes",
    noCards: "Plus de cartes à proximité",
    checkNearby: "Voir le contenu à proximité",
    loading: "Chargement des cartes...",
    refresh: "Tirer pour rafraîchir",
    categoryFilter: "Filtrer par catégorie",
  },

  // Know Morocco - Knowledge Cards
  card: {
    monuments: "Monuments",
    food: "Nourriture & Restaurants",
    history: "Histoire",
    culture: "Culture",
    learnMore: "En savoir plus",
    playAudio: "Lire l'audio",
    pauseAudio: "Pause audio",
    dismiss: "Ignorer",
    next: "Suivant",
    previous: "Précédent",
    of: "sur",
    favorite: "Favori",
    unfavorite: "Retirer des favoris",
    share: "Partager",
    distance: "À {{distance}}m",
  },

  // Know Morocco - Nearby Screen
  nearby: {
    title: "Contenu à proximité",
    subtitle: "Parcourez les sites culturels autour de vous",
    noLocation: "Accès à la localisation requis",
    locationDenied:
      "L'accès à la localisation a été refusé. Veuillez l'activer dans les paramètres.",
    enableLocation: "Activer la localisation",
    searching: "Recherche de contenu à proximité...",
    noResults: "Aucun contenu trouvé à proximité",
    trySearch: "Essayez de rechercher un lieu spécifique",
    search: "Rechercher",
    distance: "Distance",
    sortBy: "Trier par",
    nearest: "Plus proche",
    farthest: "Plus loin",
  },

  // Know Morocco - Profile Screen
  profile: {
    title: "Profil",
    editProfile: "Modifier le profil",
    language: "Langue",
    selectLanguage: "Sélectionner la langue",
    theme: "Thème",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    systemTheme: "Système par défaut",
    notifications: "Notifications",
    offlineContent: "Contenu hors ligne",
    manageDownloads: "Gérer les téléchargements",
    about: "À propos",
    version: "Version",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    help: "Aide & Support",
    contactUs: "Nous contacter",
    rateApp: "Évaluer l'application",
    signOut: "Se déconnecter",
  },

  // Know Morocco - Language Selection
  language: {
    title: "Sélectionner la langue",
    subtitle: "Choisissez votre langue préférée",
    current: "Actuel",
    english: "Anglais",
    french: "Français",
    spanish: "Espagnol",
    saved: "Langue enregistrée !",
  },

  // Know Morocco - Settings
  settings: {
    title: "Paramètres",
    general: "Général",
    language: "Langue",
    theme: "Thème",
    notifications: "Notifications",
    location: "Services de localisation",
    privacy: "Confidentialité",
    data: "Données & Stockage",
    about: "À propos",
    version: "Version de l'application",
    build: "Numéro de build",
  },

  // Know Morocco - Offline Mode
  offline: {
    title: "Contenu hors ligne",
    subtitle: "Téléchargez du contenu pour un accès hors ligne",
    downloading: "Téléchargement en cours...",
    downloaded: "Téléchargé",
    notDownloaded: "Non téléchargé",
    downloadAll: "Tout télécharger",
    deleteAll: "Tout supprimer",
    download: "Télécharger",
    delete: "Supprimer",
    size: "Taille",
    lastUpdated: "Dernière mise à jour",
    noContent: "Aucun contenu hors ligne disponible",
    storageFull: "Stockage plein. Veuillez libérer de l'espace.",
    downloadComplete: "Téléchargement terminé !",
    downloadError: "Échec du téléchargement. Veuillez réessayer.",
  },

  // Know Morocco - Status Messages
  status: {
    loading: "Chargement...",
    success: "Succès !",
    error: "Erreur",
    retry: "Réessayer",
    cancel: "Annuler",
    confirm: "Confirmer",
    saved: "Enregistré !",
    deleted: "Supprimé !",
    updated: "Mis à jour !",
    noInternet: "Pas de connexion internet",
    offline: "Vous êtes hors ligne",
    online: "De nouveau en ligne",
    syncing: "Synchronisation...",
    syncComplete: "Synchronisation terminée",
    syncError: "Échec de la synchronisation",
  },

  // Know Morocco - Categories
  categories: {
    all: "Tous",
    monuments: "Monuments",
    food: "Nourriture",
    history: "Histoire",
    culture: "Culture",
  },

  // Know Morocco - Accessibility
  a11y: {
    close: "Fermer",
    open: "Ouvrir",
    menu: "Menu",
    back: "Retourner",
    next: "Suivant",
    previous: "Précédent",
    play: "Lire",
    pause: "Pause",
    favorite: "Ajouter aux favoris",
    unfavorite: "Retirer des favoris",
    share: "Partager",
    download: "Télécharger",
    delete: "Supprimer",
    refresh: "Rafraîchir",
    search: "Rechercher",
    filter: "Filtrer",
    sort: "Trier",
  },

  // Know Morocco - Time & Dates
  time: {
    now: "Maintenant",
    today: "Aujourd'hui",
    yesterday: "Hier",
    tomorrow: "Demain",
    minutesAgo: "Il y a {{minutes}} minutes",
    hoursAgo: "Il y a {{hours}} heures",
    daysAgo: "Il y a {{days}} jours",
    weeksAgo: "Il y a {{weeks}} semaines",
    monthsAgo: "Il y a {{months}} mois",
    yearsAgo: "Il y a {{years}} ans",
  },

  // Know Morocco - Ads
  ads: {
    sponsored: "Sponsorisé",
    learnMore: "En savoir plus",
    close: "Fermer la publicité",
  },

  ...demoFr,
}

export default fr
