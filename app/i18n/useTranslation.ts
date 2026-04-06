import { useTranslation as useI18nextTranslation } from "react-i18next"

import type { TxKeyPath } from "."

/**
 * Supported language codes
 */
export type LanguageCode = "en" | "fr" | "es"

/**
 * Enhanced useTranslation hook with typed translations and language switching
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
  const currentLanguage = i18n.language.split("-")[0] as LanguageCode

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

export type { TxKeyPath }
