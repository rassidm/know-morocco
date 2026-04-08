import { useState, useCallback } from "react"
import { Audio, AVPlaybackStatus } from "expo-av"

type AudioState = {
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  position: number
  duration: number
}

/**
 * Hook for managing audio playback
 */
export function useAudio() {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    error: null,
    position: 0,
    duration: 0,
  })

  const play = useCallback(async (audioUrl: string) => {
    setState({ isPlaying: false, isLoading: true, error: null, position: 0, duration: 0 })

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true },
        (status: AVPlaybackStatus) => {
          if (status.isLoaded) {
            setState((prev) => ({
              ...prev,
              position: status.positionMillis,
              duration: status.durationMillis ?? 0,
            }))
          }
        },
      )
      setSound(newSound)
      setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }))
    } catch {
      setState({
        isPlaying: false,
        isLoading: false,
        error: "Failed to play audio",
        position: 0,
        duration: 0,
      })
    }
  }, [])

  const pause = useCallback(async () => {
    if (!sound) return
    await sound.pauseAsync()
    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [sound])

  const resume = useCallback(async () => {
    if (!sound) return
    await sound.playAsync()
    setState((prev) => ({ ...prev, isPlaying: true }))
  }, [sound])

  const stop = useCallback(async () => {
    if (!sound) return
    await sound.stopAsync()
    await sound.unloadAsync()
    setSound(null)
    setState({ isPlaying: false, isLoading: false, error: null, position: 0, duration: 0 })
  }, [sound])

  return {
    ...state,
    play,
    pause,
    resume,
    stop,
  }
}
