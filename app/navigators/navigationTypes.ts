import { ComponentProps } from "react"
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import type { CompositeScreenProps } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

/**
 * Root Stack Parameter List
 * Handles auth flow vs authenticated app flow
 */
export type RootStackParamList = {
  Auth: undefined
  App: undefined
  NotFound: undefined
}

/**
 * Authentication Stack Parameter List
 */
export type AuthStackParamList = {
  Login: undefined
  Welcome: undefined
  OAuthCallback: undefined
}

/**
 * App Tab Navigator Parameter List
 */
export type AppTabParamList = {
  Home: undefined
  Nearby: undefined
  Profile: undefined
}

/**
 * Main App Stack Parameter List (inside tabs + modal screens)
 */
export type AppStackParamList = {
  MainTabs: undefined
  KnowledgeCard: { cardId: string; title?: string }
  LanguageSelect: undefined
  Settings: undefined
  Favorites: undefined
  OfflineContent: undefined
  CardDetail: { cardId: string }
}

/**
 * Type helpers for screens
 */
export type RootScreenProps<S extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  S
>

export type AuthScreenProps<S extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  S
>

export type AppScreenProps<S extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  S
>

export type TabScreenProps<S extends keyof AppTabParamList> = CompositeScreenProps<
  NativeStackScreenProps<AppTabParamList, S>,
  BottomTabScreenProps<AppTabParamList, S>
>

/**
 * Legacy support - keep for existing code
 */
export type AppStackParamListLegacy = {
  Welcome: undefined
  Login: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamListLegacy> = NativeStackScreenProps<
  AppStackParamListLegacy,
  T
>

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamListLegacy>>
> {}

/**
 * Declaration merging for React Navigation
 * @see https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-props
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
