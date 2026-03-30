import { Platform } from "react-native"

import { ENV, TEST_ADMOB_IDS } from "./env"

/**
 * Get the appropriate AdMob app ID
 */
export function getAdMobAppId(): string {
  if (ENV.isDev) {
    return (
      Platform.select({
        ios: TEST_ADMOB_IDS.banner!.split("/")[0],
        android: TEST_ADMOB_IDS.banner!.split("/")[0],
        default: ENV.admobAppId,
      }) || ENV.admobAppId
    )
  }
  return ENV.admobAppId
}

/**
 * Get the appropriate banner ad unit ID
 */
export function getBannerAdUnitId(): string {
  if (ENV.isDev && ENV.enableAds) {
    return (
      Platform.select({
        ios: TEST_ADMOB_IDS.banner!,
        android: TEST_ADMOB_IDS.banner!,
        default: ENV.admobBannerUnitId,
      }) || ENV.admobBannerUnitId
    )
  }
  return ENV.admobBannerUnitId
}

/**
 * Get the appropriate interstitial ad unit ID
 */
export function getInterstitialAdUnitId(): string {
  if (ENV.isDev && ENV.enableAds) {
    return (
      Platform.select({
        ios: TEST_ADMOB_IDS.interstitial!,
        android: TEST_ADMOB_IDS.interstitial!,
        default: ENV.admobInterstitialUnitId,
      }) || ENV.admobInterstitialUnitId
    )
  }
  return ENV.admobInterstitialUnitId
}

/**
 * Check if ads are enabled
 */
export function areAdsEnabled(): boolean {
  return ENV.enableAds && !ENV.isDev
}

/**
 * Check if test ads should be shown
 */
export function shouldShowTestAds(): boolean {
  return ENV.isDev && ENV.enableAds
}

export default {
  getAdMobAppId,
  getBannerAdUnitId,
  getInterstitialAdUnitId,
  areAdsEnabled,
  shouldShowTestAds,
}
