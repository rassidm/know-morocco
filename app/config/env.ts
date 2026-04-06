import { Platform } from "react-native"

/**
 * Environment configuration interface
 */
export interface EnvConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  admobAppId: string
  admobBannerUnitId: string
  admobInterstitialUnitId: string
  enableLocationServices: boolean
  enableAds: boolean
  enableAnalytics: boolean
  isDev: boolean
}

/**
 * Get environment variable from process.env
 * Expo exposes EXPO_PUBLIC_* prefixed vars in the client bundle
 */
function getEnvVar(key: string): string | undefined {
  return process.env[key]
}

/**
 * Get boolean environment variable
 */
function getBoolEnvVar(key: string, defaultValue: boolean): boolean {
  const value = getEnvVar(key)
  if (value === undefined) return defaultValue
  return value === "true" || value === "1"
}

/**
 * Validate required environment variables
 */
function validateEnvVars() {
  const requiredVars = ["EXPO_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_ANON_KEY"]
  const missingVars = requiredVars.filter((varName) => !getEnvVar(varName))

  if (missingVars.length > 0) {
    console.warn(
      `Missing environment variables: ${missingVars.join(", ")}. ` + "Some features may not work.",
    )
  }
}

// Validate on module load
validateEnvVars()

/**
 * Environment configuration object
 */
export const ENV: EnvConfig = {
  supabaseUrl: getEnvVar("EXPO_PUBLIC_SUPABASE_URL") || "",
  supabaseAnonKey: getEnvVar("EXPO_PUBLIC_SUPABASE_ANON_KEY") || "",
  admobAppId: getEnvVar("EXPO_PUBLIC_ADMOB_APP_ID") || "",
  admobBannerUnitId: getEnvVar("EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID") || "",
  admobInterstitialUnitId: getEnvVar("EXPO_PUBLIC_ADMOB_INTERSTITIAL_UNIT_ID") || "",
  enableLocationServices: getBoolEnvVar("EXPO_PUBLIC_ENABLE_LOCATION_SERVICES", true),
  enableAds: getBoolEnvVar("EXPO_PUBLIC_ENABLE_ADS", true),
  enableAnalytics: getBoolEnvVar("EXPO_PUBLIC_ENABLE_ANALYTICS", false),
  isDev: __DEV__,
}

/**
 * Test AdMob IDs for development
 */
export const TEST_ADMOB_IDS = {
  banner: Platform.select({
    ios: "ca-app-pub-3940256099942544/2934735716",
    android: "ca-app-pub-3940256099942544/6300978111",
  }),
  interstitial: Platform.select({
    ios: "ca-app-pub-3940256099942544/4411468910",
    android: "ca-app-pub-3940256099942544/1033173712",
  }),
}

export default ENV
