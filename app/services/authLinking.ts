import * as Linking from "expo-linking"

import { handleOAuthCallback } from "./authService"

/**
 * Auth linking prefix
 */
export const authPrefix = "knowmorocco://callback"

/**
 * Subscribe to auth deep links
 */
export function subscribeToAuthLinks(callback: (url: string) => void): () => void {
  const handleUrl = async ({ url }: { url: string }) => {
    if (url.startsWith(authPrefix)) {
      console.log("Auth deep link received:", url)
      callback(url)
    }
  }

  // Subscribe to linking events
  const subscription = Linking.addEventListener("url", handleUrl)

  // Check for initial URL (app opened from cold start)
  Linking.getInitialURL().then((url) => {
    if (url && url.startsWith(authPrefix)) {
      console.log("Initial auth URL:", url)
      callback(url)
    }
  })

  return () => {
    subscription.remove()
  }
}

/**
 * Handle auth callback from deep link
 */
export async function handleAuthDeepLink(url: string) {
  return handleOAuthCallback(url)
}

/**
 * Open auth URL
 */
export async function openAuthUrl(url: string): Promise<void> {
  try {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      console.error("Cannot open URL:", url)
    }
  } catch (error) {
    console.error("Error opening auth URL:", error)
  }
}

export default {
  authPrefix,
  subscribeToAuthLinks,
  openAuthUrl,
  handleAuthDeepLink,
}
